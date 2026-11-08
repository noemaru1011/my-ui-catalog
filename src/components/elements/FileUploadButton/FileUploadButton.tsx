import { Paperclip, X } from 'lucide-react';
import type { FocusEventHandler, Ref } from 'react';
import { useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '@/components/elements/Text/Text';
import { Cluster } from '@/components/layouts/Cluster/Cluster';
import { Stack } from '@/components/layouts/Stack/Stack';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError } from '@/components/ui/field';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type FileUploadButtonProps = {
	id?: string;
	name: string;
	label?: string;
	description?: string;
	required?: boolean;
	accept?: string;
	multiple?: boolean;
	maxFiles: number;
	/** 単位はMiB（1 MiB = 1024 * 1024 bytes） */
	maxSize: number;
	disabled?: boolean;
	value?: File[];
	error?: string;
	onFilesChange?: (files: File[]) => void;
	onError?: (error: string) => void;
	onBlur?: FocusEventHandler<HTMLInputElement>;
	inputRef?: Ref<HTMLInputElement>;
};

export function FileUploadButton({
	id,
	name,
	label,
	description,
	required = false,
	accept,
	multiple = true,
	maxFiles,
	maxSize,
	disabled = false,
	value,
	error,
	onFilesChange,
	onError,
	onBlur,
	inputRef,
}: FileUploadButtonProps) {
	const { t } = useTranslation();
	const internalInputRef = useRef<HTMLInputElement>(null);
	const generatedId = useId();
	const inputId = id ?? generatedId;
	const [uncontrolledFiles, setUncontrolledFiles] = useState<File[]>([]);
	const files = value ?? uncontrolledFiles;
	const buttonLabel = label ?? t('common.file.attach');
	const descriptionId = `${inputId}-description`;
	const errorId = `${inputId}-error`;
	const describedBy = [description && descriptionId, error && errorId].filter(Boolean).join(' ');

	const updateFiles = (nextFiles: File[]) => {
		if (value === undefined) setUncontrolledFiles(nextFiles);
		onFilesChange?.(nextFiles);
	};

	const isAcceptedFile = (file: File) => {
		if (!accept) return true;

		const acceptedTypes = accept
			.split(',')
			.map((type) => type.trim().toLowerCase())
			.filter(Boolean);
		const fileType = file.type.toLowerCase();
		const fileName = file.name.toLowerCase();

		return acceptedTypes.some((type) => {
			if (type.endsWith('/*')) return fileType.startsWith(type.slice(0, -1));
			if (type.includes('/')) return fileType === type;
			if (type.startsWith('.')) return fileName.endsWith(type);
			return false;
		});
	};

	const addFiles = (selectedFiles: FileList | File[]) => {
		onError?.('');

		const incoming = Array.from(selectedFiles);
		for (const file of incoming) {
			if (!isAcceptedFile(file)) {
				onError?.(`${file.name}: ${t('common.file.invalidType')}`);
				return;
			}

			if (file.size > maxSize * 1024 * 1024) {
				onError?.(`${file.name}: ${t('common.file.sizeExceeded')}`);
				return;
			}
		}

		const merged = multiple ? [...files, ...incoming] : incoming.slice(0, 1);
		const unique = merged.filter(
			(file, index, self) =>
				index ===
				self.findIndex(
					(candidate) =>
						candidate.name === file.name &&
						candidate.size === file.size &&
						candidate.lastModified === file.lastModified,
				),
		);

		if (unique.length > maxFiles) {
			updateFiles(unique.slice(0, maxFiles));
			onError?.(t('common.file.maxFilesExceeded', { count: maxFiles }));
			return;
		}

		updateFiles(unique);
	};

	const removeFile = (index: number) => {
		updateFiles(files.filter((_, fileIndex) => fileIndex !== index));
		onError?.('');
	};
	const truncateFileName = (fileName: string) => {
		return fileName.length > 10 ? `${fileName.slice(0, 10)}...` : fileName;
	};

	return (
		<Field data-invalid={!!error}>
			<Stack space="sm">
				<Cluster space="sm">
					<Button
						type="button"
						variant="outline"
						size="sm"
						disabled={disabled}
						aria-invalid={!!error}
						aria-describedby={describedBy || undefined}
						onClick={() => internalInputRef.current?.click()}
					>
						<Paperclip aria-hidden="true" />
						{buttonLabel}
						{required && (
							<span className="text-destructive" aria-hidden="true">
								*
							</span>
						)}
					</Button>

					<input
						ref={(element) => {
							internalInputRef.current = element;
							if (typeof inputRef === 'function') inputRef(element);
							else if (inputRef) inputRef.current = element;
						}}
						id={inputId}
						name={name}
						type="file"
						accept={accept}
						multiple={multiple}
						disabled={disabled}
						aria-label={buttonLabel}
						className="sr-only"
						onBlur={onBlur}
						onChange={(event) => {
							if (event.target.files) addFiles(event.target.files);
							event.target.value = '';
						}}
					/>

					<Text color="muted" as="small">
						{t('common.file.limits', { maxFiles, maxSize })}
					</Text>
				</Cluster>

				{description && <FieldDescription id={descriptionId}>{description}</FieldDescription>}

				{error && <FieldError id={errorId}>{error}</FieldError>}

				{files.length > 0 && (
					<Cluster space="sm">
						{files.map((file, index) => (
							<Cluster key={`${file.name}-${file.size}-${file.lastModified}`} space="sm">
								<Tooltip>
									<TooltipTrigger>
										<Text weight="bold">{truncateFileName(file.name)}</Text>
									</TooltipTrigger>
									<TooltipContent className="max-w-xs break-all whitespace-normal">
										{file.name}
									</TooltipContent>
								</Tooltip>
								<Button
									type="button"
									variant="ghost"
									size="icon-xs"
									disabled={disabled}
									aria-label={`${file.name} ${t('common.file.remove')}`}
									onClick={() => removeFile(index)}
								>
									<X aria-hidden="true" />
								</Button>
							</Cluster>
						))}
					</Cluster>
				)}
			</Stack>
		</Field>
	);
}
