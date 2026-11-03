import { File, FileArchive, FileImage, FileText, X } from 'lucide-react';
import type { FocusEventHandler, Ref } from 'react';
import { useCallback, useId, useRef, useState } from 'react';
import { Text } from '@/components/elements/Text/Text';
import { Cluster } from '@/components/layouts/Cluster/Cluster';
import { Container } from '@/components/layouts/Container/Container';
import { Stack } from '@/components/layouts/Stack/Stack';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { cn } from '@/lib/utils';

type FileUploadProps = {
	id?: string;
	name?: string;
	label?: string;
	required?: boolean;
	accept?: string;
	multiple?: boolean;
	maxFiles?: number;
	maxSize?: number; // MB
	disabled?: boolean;
	value?: File[];
	error?: string;
	onFilesChange?: (files: File[]) => void;
	onBlur?: FocusEventHandler<HTMLInputElement>;
	inputRef?: Ref<HTMLInputElement>;
};

export function FileUpload({
	id,
	name,
	label,
	required = false,
	accept,
	multiple = true,
	maxFiles = 5,
	maxSize = 10,
	disabled = false,
	value,
	error,
	onFilesChange,
	onBlur,
	inputRef,
}: FileUploadProps) {
	const internalInputRef = useRef<HTMLInputElement>(null);
	const generatedId = useId();
	const inputId = id ?? generatedId;
	const [uncontrolledFiles, setUncontrolledFiles] = useState<File[]>([]);
	const [dragging, setDragging] = useState(false);
	const [validationError, setValidationError] = useState('');
	const files = value ?? uncontrolledFiles;
	const displayedError = validationError || error;

	const updateFiles = useCallback(
		(nextFiles: File[]) => {
			if (value === undefined) setUncontrolledFiles(nextFiles);
			onFilesChange?.(nextFiles);
		},
		[onFilesChange, value],
	);

	const addFiles = (selectedFiles: FileList | File[]) => {
		setValidationError('');

		const incoming = Array.from(selectedFiles);

		const validFiles = incoming.filter((file) => {
			if (file.size > maxSize * 1024 * 1024) {
				setValidationError(`${file.name}: ファイルサイズが上限を超えています`);
				return false;
			}
			return true;
		});

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
			setValidationError(`ファイルは最大${maxFiles}件までです`);
			updateFiles(unique.slice(0, maxFiles));
			return;
		}

		updateFiles(unique);
	};

	const removeFile = (index: number) => {
		updateFiles(files.filter((_, i) => i !== index));
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragging(false);

		if (disabled) return;
		addFiles(e.dataTransfer.files);
	};

	const getFileIcon = (file: File) => {
		if (file.type.startsWith('image/')) return FileImage;
		if (file.type.startsWith('text/') || file.type === 'application/pdf') return FileText;
		if (file.type.includes('zip')) return FileArchive;
		return File;
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
				</FieldLabel>
			)}

			<Stack space="md">
				<Card
					className={cn(
						'border-2 p-8 text-center transition-colors',
						dragging ? 'border-primary bg-primary/5' : 'border-muted',
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
						<Stack space="xs">
							<Text weight="bold">ファイルをドラッグ＆ドロップ</Text>
							<Text size="sm" color="muted">
								またはクリックしてファイルを選択
							</Text>
						</Stack>

						<Text size="sm" color="muted">
							最大 {maxFiles} 件 / {maxSize} MB
							{accept && ` / ${accept}`}
						</Text>
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
						aria-label={label ?? 'ファイルを選択'}
						aria-invalid={!!displayedError}
						aria-describedby={displayedError ? `${inputId}-error` : undefined}
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
							<Text weight="bold">選択したファイル</Text>
							<Text size="sm" color="muted">
								{files.length} / {maxFiles}
							</Text>
						</Cluster>

						{files.map((file, index) => {
							// biome-ignore lint/style/useNamingConvention: React component names use PascalCase
							const Icon = getFileIcon(file);

							return (
								<Container key={`${file.name}-${file.size}-${file.lastModified}`} width="full">
									<Cluster space="sm" align="center" justify="between">
										<Icon className="text-muted-foreground h-5 w-5 shrink-0" />
										<Stack space="xs">
											<Text size="sm" weight="bold">
												{file.name}
											</Text>
											<Text size="sm" color="muted">
												{formatSize(file.size)}
											</Text>
										</Stack>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											disabled={disabled}
											onClick={(e) => {
												e.stopPropagation();
												removeFile(index);
											}}
											aria-label={`${file.name}を削除`}
										>
											<X className="h-4 w-4" />
										</Button>
									</Cluster>
								</Container>
							);
						})}
					</Stack>
				)}
			</Stack>
		</Field>
	);
}
