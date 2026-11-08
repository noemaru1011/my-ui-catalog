import { File, FileArchive, FileImage, FileText, X } from 'lucide-react';
import type { FocusEventHandler, Ref } from 'react';
import { useCallback, useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '@/components/elements/Text/Text';
import { Cluster } from '@/components/layouts/Cluster/Cluster';
import { Container } from '@/components/layouts/Container/Container';
import { Stack } from '@/components/layouts/Stack/Stack';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type FileUploadProps = {
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

export function FileUpload({
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
}: FileUploadProps) {
	const { t } = useTranslation();
	const internalInputRef = useRef<HTMLInputElement>(null);
	const generatedId = useId();
	const inputId = id ?? generatedId;

	const [uncontrolledFiles, setUncontrolledFiles] = useState<File[]>([]);
	const [dragging, setDragging] = useState(false);

	const files = value ?? uncontrolledFiles;
	const displayedError = error;

	const describedBy = [
		description && `${inputId}-description`,
		displayedError && `${inputId}-error`,
	]
		.filter(Boolean)
		.join(' ');

	const updateFiles = useCallback(
		(nextFiles: File[]) => {
			if (value === undefined) {
				setUncontrolledFiles(nextFiles);
			}
			onFilesChange?.(nextFiles);
		},
		[onFilesChange, value],
	);

	/**
	 * accept に指定されたファイル形式かどうかを判定する。
	 */
	const isAcceptedFile = (file: File): boolean => {
		if (!accept) return true;

		const acceptedTypes = accept
			.split(',')
			.map((type) => type.trim().toLowerCase())
			.filter(Boolean);

		if (acceptedTypes.length === 0) return true;

		const fileType = file.type.toLowerCase();
		const fileName = file.name.toLowerCase();

		return acceptedTypes.some((type) => {
			if (type.endsWith('/*')) {
				return fileType.startsWith(type.slice(0, -1));
			}

			if (type.includes('/')) {
				return fileType === type;
			}

			if (type.startsWith('.')) {
				return fileName.endsWith(type);
			}

			return false;
		});
	};

	const addFiles = (selectedFiles: FileList | File[]) => {
		onError?.('');

		const incoming = Array.from(selectedFiles);
		const validFiles: File[] = [];

		for (const file of incoming) {
			if (!isAcceptedFile(file)) {
				onError?.(`${file.name}: ${t('common.file.invalidType')}`);
				return;
			}

			if (file.size > maxSize * 1024 * 1024) {
				onError?.(`${file.name}: ${t('common.file.sizeExceeded')}`);
				return;
			}

			validFiles.push(file);
		}

		const merged = multiple ? [...files, ...validFiles] : validFiles.slice(0, 1);

		const unique = merged.filter(
			(file, index, self) =>
				index ===
				self.findIndex(
					(f) =>
						f.name === file.name && f.size === file.size && f.lastModified === file.lastModified,
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
		updateFiles(files.filter((_, i) => i !== index));
		onError?.('');
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragging(false);

		if (disabled) return;

		addFiles(e.dataTransfer.files);
	};

	const getFileIcon = (file: File) => {
		if (file.type.startsWith('image/')) return FileImage;
		if (file.type.startsWith('text/') || file.type === 'application/pdf') {
			return FileText;
		}
		if (file.type.includes('zip')) return FileArchive;
		return File;
	};

	const truncateFileName = (fileName: string) => {
		return fileName.length > 10 ? `${fileName.slice(0, 10)}...` : fileName;
	};
	const formatSize = (size: number) => {
		return size < 1024 * 1024
			? `${(size / 1024).toFixed(1)} KB`
			: `${(size / 1024 / 1024).toFixed(2)} MB`;
	};

	return (
		<Field data-invalid={!!displayedError}>
			{label && (
				<FieldLabel htmlFor={inputId}>
					{label}
					{required && <span className="text-destructive">*</span>}
					{disabled && <Badge variant="outline">{t('common.notEditable')}</Badge>}
				</FieldLabel>
			)}

			{description && (
				<FieldDescription id={`${inputId}-description`}>{description}</FieldDescription>
			)}

			<Stack space="md">
				<Card
					className={cn(
						'border-2 p-8 text-center shadow-none ring-0 transition-colors',
						displayedError
							? 'border-destructive'
							: dragging
								? 'border-primary bg-primary/5'
								: 'border-muted',
						disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
					)}
					onDragOver={(e) => {
						e.preventDefault();
						if (!disabled) setDragging(true);
					}}
					onDragLeave={() => setDragging(false)}
					onDrop={handleDrop}
					onClick={() => {
						if (!disabled) internalInputRef.current?.click();
					}}
				>
					<Stack space="sm">
						<Stack space="sm">
							<Text weight="bold">{t('common.file.dragAndDrop')}</Text>
							<Text color="muted">{t('common.file.clickToSelect')}</Text>
						</Stack>

						<Text color="muted">{t('common.file.limits', { maxFiles, maxSize })}</Text>

						{accept && <Text color="muted">{t('common.file.acceptedTypes', { accept })}</Text>}
					</Stack>

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
						aria-label={label ?? t('common.file.clickToSelect')}
						aria-invalid={!!displayedError}
						aria-describedby={describedBy || undefined}
						className="sr-only"
						onBlur={onBlur}
						onChange={(e) => {
							if (e.target.files) addFiles(e.target.files);
							e.target.value = '';
						}}
					/>
				</Card>

				{displayedError && <FieldError id={`${inputId}-error`}>{displayedError}</FieldError>}

				{files.length > 0 && (
					<Stack space="sm">
						<Cluster justify="between">
							<Text weight="bold">{t('common.file.selectedFiles')}</Text>
							<Text color="muted">
								{files.length} / {maxFiles}
							</Text>
						</Cluster>

						{files.map((file, index) => {
							// biome-ignore lint/style/useNamingConvention: React component names use PascalCase
							const Icon = getFileIcon(file);

							return (
								<Container key={`${file.name}-${file.size}-${file.lastModified}`} width="full">
									<div className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-3 rounded-md border p-3">
										{/* ファイルアイコン */}
										<Icon className="text-muted-foreground h-5 w-5 shrink-0" />

										{/* ファイル名 */}
										<Tooltip>
											<TooltipTrigger>
												<Text weight="bold">{truncateFileName(file.name)}</Text>
											</TooltipTrigger>
											<TooltipContent className="max-w-xs break-all whitespace-normal">
												{file.name}
											</TooltipContent>
										</Tooltip>

										{/* ファイルサイズ */}
										<Text color="muted">{formatSize(file.size)}</Text>

										{/* 削除ボタン */}
										<Button
											type="button"
											variant="ghost"
											size="icon"
											className="shrink-0"
											disabled={disabled}
											onClick={(e) => {
												e.stopPropagation();
												removeFile(index);
											}}
											aria-label={`${file.name} ${t('common.file.remove')}`}
										>
											<X className="h-4 w-4" />
										</Button>
									</div>
								</Container>
							);
						})}
					</Stack>
				)}
			</Stack>
		</Field>
	);
}
