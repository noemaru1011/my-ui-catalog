import { Paperclip, X } from 'lucide-react';
import type { FocusEventHandler, Ref } from 'react';
import { useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '@/components/elements/Text/Text';
import { Cluster } from '@/components/layouts/Cluster/Cluster';
import { Stack } from '@/components/layouts/Stack/Stack';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type FileUploadButtonProps = {
	/** idは指定しなかった場合、自動採番。 */
	id?: string;
	name: string;
	/** ボタン上部に表示するラベル。 */
	fieldLabel: string;
	/** ボタン内部に表示するラベル。 */
	label?: string;
	description?: string;
	/** 必須項目かどうか。 */
	required?: boolean;
	accept?: string;
	multiple?: boolean;
	maxFiles: number;
	/** 単位はMiB（1 MiB = 1024 * 1024 bytes） */
	maxSize: number;
	/** 極力使用せず、表示できるか検討する。 */
	disabled?: boolean;
	value?: File[];
	error?: string;
	onFilesChange?: (files: File[]) => void;
	onBlur?: FocusEventHandler<HTMLInputElement>;
	inputRef?: Ref<HTMLInputElement>;
};

/**
 * D&Dができないファイル添付コンポーネントであり、領域が小さいことで、
 * ユーザーが次の項目を見逃さない（視線に入りやすくする）ようにすることを目的としています。
 */
export function FileUploadButton({
	id,
	name,
	fieldLabel,
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
		if (value === undefined) {
			setUncontrolledFiles(nextFiles);
		}

		onFilesChange?.(nextFiles);
	};

	const addFiles = (selectedFiles: FileList | File[]) => {
		const incoming = Array.from(selectedFiles);

		const merged = multiple ? [...files, ...incoming] : incoming.slice(0, 1);

		// 同一ファイルの重複を除外する
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

		// ファイル数の上限で切り詰める
		updateFiles(unique.slice(0, maxFiles));
	};

	const removeFile = (index: number) => {
		updateFiles(files.filter((_, fileIndex) => fileIndex !== index));
	};

	const truncateFileName = (fileName: string) => {
		return fileName.length > 10 ? `${fileName.slice(0, 10)}...` : fileName;
	};

	return (
		<Field data-invalid={!!error}>
			<Stack space="sm">
				{fieldLabel && (
					<FieldLabel id={inputId}>
						{fieldLabel}
						{required && (
							<span className="text-destructive" aria-hidden="true">
								{' '}
								*
							</span>
						)}
						{disabled && <Badge variant="outline">{t('common.notEditable')}</Badge>}
					</FieldLabel>
				)}

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
					</Button>

					<input
						ref={(element) => {
							internalInputRef.current = element;

							if (typeof inputRef === 'function') {
								inputRef(element);
							} else if (inputRef) {
								inputRef.current = element;
							}
						}}
						id={inputId}
						name={name}
						type="file"
						accept={accept}
						multiple={multiple}
						disabled={disabled}
						required={required}
						aria-label={buttonLabel}
						aria-invalid={!!error}
						aria-describedby={describedBy || undefined}
						className="sr-only"
						onBlur={onBlur}
						onChange={(event) => {
							if (event.target.files) {
								addFiles(event.target.files);
							}

							// 同じファイルを再選択できるようにする
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
