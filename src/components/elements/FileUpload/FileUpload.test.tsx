import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import {
	ATTACHMENTS_SCHEMA,
	MAX_ATTACHMENT_SIZE_IN_BYTES,
} from '@/components/example/form/schema/formSchema';
import { FileUpload } from './FileUpload';

describe('FileUpload', () => {
	it('フォームスキーマで添付ファイルを検証する', () => {
		const file = new File(['contents'], 'document.pdf', { type: 'application/pdf' });
		const maximumSizedFile = new File(
			[new Uint8Array(MAX_ATTACHMENT_SIZE_IN_BYTES)],
			'maximum.pdf',
		);
		const oversizedFile = new File([new Uint8Array(MAX_ATTACHMENT_SIZE_IN_BYTES + 1)], 'large.pdf');

		expect(ATTACHMENTS_SCHEMA.safeParse([]).success).toBe(false);
		expect(ATTACHMENTS_SCHEMA.safeParse([file]).success).toBe(true);
		expect(ATTACHMENTS_SCHEMA.safeParse([maximumSizedFile]).success).toBe(true);
		expect(ATTACHMENTS_SCHEMA.safeParse(Array(6).fill(file)).success).toBe(false);
		expect(ATTACHMENTS_SCHEMA.safeParse([oversizedFile]).success).toBe(false);
	});

	it('選択したファイルを通知し、制御された値を表示する', async () => {
		const user = userEvent.setup();
		const onFilesChange = vi.fn();
		const file = new File(['contents'], 'document.pdf', { type: 'application/pdf' });

		const { rerender } = render(
			<FileUpload
				id="attachments"
				name="attachments"
				label="添付ファイル"
				maxFiles={2}
				maxSize={1}
				value={[]}
				onFilesChange={onFilesChange}
			/>,
		);

		await user.upload(screen.getByLabelText('添付ファイル'), file);

		expect(onFilesChange).toHaveBeenCalledWith([file]);

		rerender(
			<FileUpload
				id="attachments"
				name="attachments"
				label="添付ファイル"
				maxFiles={2}
				maxSize={1}
				value={[file]}
				onFilesChange={onFilesChange}
			/>,
		);

		expect(screen.getByRole('button', { name: 'document.pdf 削除' })).toBeInTheDocument();
	});

	it('id を省略した場合は自動生成した id をラベルに関連付ける', () => {
		render(<FileUpload name="attachments" label="添付ファイル" maxFiles={2} maxSize={1} />);

		const input = screen.getByLabelText('添付ファイル');

		expect(input).toHaveAttribute('id');
		expect(input).toHaveAttribute('name', 'attachments');
	});

	it('フォームから渡されたバリデーションエラーを表示する', () => {
		render(
			<FileUpload
				id="attachments"
				name="attachments"
				label="添付ファイル"
				maxFiles={2}
				maxSize={1}
				error="ファイルを選択してください。"
			/>,
		);

		expect(screen.getByRole('alert')).toHaveTextContent('ファイルを選択してください。');
		expect(screen.getByLabelText('添付ファイル')).toHaveAttribute('aria-invalid', 'true');
		expect(screen.getByLabelText('添付ファイル').parentElement).toHaveClass(
			'border-destructive',
			'shadow-none',
			'ring-0',
		);
	});

	it('description が指定された場合に説明文を表示して入力に関連付ける', () => {
		render(
			<FileUpload
				id="attachments"
				name="attachments"
				label="添付ファイル"
				description="PDFまたは画像を添付してください"
				maxFiles={2}
				maxSize={1}
				error="ファイルを選択してください。"
			/>,
		);

		expect(screen.getByText('PDFまたは画像を添付してください')).toBeInTheDocument();
		const descriptionId = screen.getByText('PDFまたは画像を添付してください').id;
		const errorId = screen.getByRole('alert').id;
		expect(screen.getByLabelText('添付ファイル')).toHaveAttribute(
			'aria-describedby',
			`${descriptionId} ${errorId}`,
		);
	});

	it('disabled の場合は編集不可バッジを表示してファイル選択を無効にする', async () => {
		const user = userEvent.setup();
		const onFilesChange = vi.fn();
		const file = new File(['contents'], 'document.pdf', { type: 'application/pdf' });

		render(
			<FileUpload
				id="attachments"
				name="attachments"
				label="添付ファイル"
				maxFiles={2}
				maxSize={1}
				disabled
				onFilesChange={onFilesChange}
			/>,
		);

		expect(screen.getByText('編集不可')).toBeInTheDocument();
		expect(screen.getByLabelText('添付ファイル')).toBeDisabled();

		await user.upload(screen.getByLabelText('添付ファイル'), file);

		expect(onFilesChange).not.toHaveBeenCalled();
	});

	it('最大サイズを超えるファイルを拒否する', async () => {
		const user = userEvent.setup();
		const onFilesChange = vi.fn();
		const onError = vi.fn();
		const maximumSizedFile = new File([new Uint8Array(1024 * 1024)], 'maximum.pdf');
		const oversizedFile = new File([new Uint8Array(2 * 1024 * 1024)], 'large.pdf');

		render(
			<FileUpload
				id="attachments"
				name="attachments"
				label="添付ファイル"
				maxFiles={2}
				maxSize={1}
				onFilesChange={onFilesChange}
				onError={onError}
			/>,
		);

		await user.upload(screen.getByLabelText('添付ファイル'), maximumSizedFile);

		expect(onFilesChange).toHaveBeenCalledWith([maximumSizedFile]);

		await user.upload(screen.getByLabelText('添付ファイル'), oversizedFile);

		expect(onError).toHaveBeenLastCalledWith('large.pdf: ファイルサイズが上限を超えています');
		expect(screen.queryByRole('alert')).not.toBeInTheDocument();
		expect(onFilesChange).toHaveBeenCalledTimes(1);
	});

	it('拡張子と MIME タイプで許可されたファイルを選択できる', async () => {
		const user = userEvent.setup();
		const onFilesChange = vi.fn();
		const pdf = new File(['pdf'], 'report.PDF', { type: 'application/pdf' });
		const image = new File(['image'], 'photo.png', { type: 'image/png' });
		const text = new File(['text'], 'notes.txt', { type: 'text/plain' });

		const { rerender } = render(
			<FileUpload
				name="attachments"
				label="添付ファイル"
				accept=".pdf,image/*"
				maxFiles={3}
				maxSize={1}
				onFilesChange={onFilesChange}
			/>,
		);

		await user.upload(screen.getByLabelText('添付ファイル'), [pdf, image]);
		expect(onFilesChange).toHaveBeenLastCalledWith([pdf, image]);

		rerender(
			<FileUpload
				name="attachments"
				label="添付ファイル"
				accept="text/plain"
				value={[]}
				maxFiles={3}
				maxSize={1}
				onFilesChange={onFilesChange}
			/>,
		);
		await user.upload(screen.getByLabelText('添付ファイル'), text);
		expect(onFilesChange).toHaveBeenLastCalledWith([text]);
	});

	it('不正な形式を拒否し、空の accept 指定は形式を制限しない', () => {
		const onFilesChange = vi.fn();
		const onError = vi.fn();
		const file = new File(['contents'], 'document.txt', { type: 'text/plain' });

		const { rerender } = render(
			<FileUpload
				name="attachments"
				label="添付ファイル"
				accept=".pdf"
				maxFiles={2}
				maxSize={1}
				onFilesChange={onFilesChange}
				onError={onError}
			/>,
		);
		fireEvent.change(screen.getByLabelText('添付ファイル'), { target: { files: [file] } });
		expect(onError).toHaveBeenLastCalledWith('document.txt: 許可されていないファイル形式です');
		expect(onFilesChange).not.toHaveBeenCalled();

		rerender(
			<FileUpload
				name="attachments"
				label="添付ファイル"
				accept=" , "
				maxFiles={2}
				maxSize={1}
				onFilesChange={onFilesChange}
				onError={onError}
			/>,
		);
		fireEvent.change(screen.getByLabelText('添付ファイル'), { target: { files: [file] } });
		expect(onFilesChange).toHaveBeenCalledWith([file]);
	});

	it('認識できない形式指定を拒否する', () => {
		const onFilesChange = vi.fn();
		const onError = vi.fn();
		const file = new File(['contents'], 'document.pdf', { type: 'application/pdf' });

		render(
			<FileUpload
				name="attachments"
				label="添付ファイル"
				accept="application"
				maxFiles={2}
				maxSize={1}
				onFilesChange={onFilesChange}
				onError={onError}
			/>,
		);
		fireEvent.change(screen.getByLabelText('添付ファイル'), { target: { files: [file] } });

		expect(onError).toHaveBeenLastCalledWith('document.pdf: 許可されていないファイル形式です');
		expect(onFilesChange).not.toHaveBeenCalled();
	});

	it('ファイル数を制限し、重複ファイルを追加しない', async () => {
		const user = userEvent.setup();
		const onFilesChange = vi.fn();
		const onError = vi.fn();
		const first = new File(['one'], 'first.txt');
		const second = new File(['two'], 'second.txt');

		const { rerender } = render(
			<FileUpload
				name="attachments"
				label="添付ファイル"
				maxFiles={1}
				maxSize={1}
				onFilesChange={onFilesChange}
				onError={onError}
			/>,
		);
		await user.upload(screen.getByLabelText('添付ファイル'), [first, second]);
		expect(onFilesChange).toHaveBeenLastCalledWith([first]);
		expect(onError).toHaveBeenLastCalledWith('ファイルは最大1件までです');

		onFilesChange.mockClear();
		rerender(
			<FileUpload
				name="attachments"
				label="添付ファイル"
				value={[first]}
				maxFiles={2}
				maxSize={1}
				onFilesChange={onFilesChange}
			/>,
		);
		await user.upload(screen.getByLabelText('添付ファイル'), first);
		expect(onFilesChange).toHaveBeenCalledWith([first]);
	});

	it('ファイルをドロップして表示し、削除ボタンで取り除く', async () => {
		const onFilesChange = vi.fn();
		const file = new File(['image'], 'a-very-long-image.png', { type: 'image/png' });

		render(
			<FileUpload
				name="attachments"
				label="添付ファイル"
				maxFiles={2}
				maxSize={2}
				onFilesChange={onFilesChange}
			/>,
		);

		const dropZone = screen.getByText('ファイルをドラッグ＆ドロップ').closest('[data-slot="card"]');
		expect(dropZone).not.toBeNull();
		fireEvent.dragOver(dropZone as HTMLElement);
		expect(dropZone).toHaveClass('border-primary');
		fireEvent.dragLeave(dropZone as HTMLElement);
		expect(dropZone).toHaveClass('border-muted');

		const dropEvent = new Event('drop', { bubbles: true, cancelable: true });
		Object.defineProperty(dropEvent, 'dataTransfer', { value: { files: [file] } });
		fireEvent(dropZone as HTMLElement, dropEvent);
		expect(onFilesChange).toHaveBeenCalledWith([file]);
		expect(screen.getByText('a-very-lon...')).toBeInTheDocument();
		expect(screen.getByText('0.0 KB')).toBeInTheDocument();

		fireEvent.click(screen.getByRole('button', { name: 'a-very-long-image.png 削除' }));
		expect(onFilesChange).toHaveBeenLastCalledWith([]);
	});

	it('単一選択では一件だけを保持し、メガバイト単位のサイズを表示する', async () => {
		const user = userEvent.setup();
		const onFilesChange = vi.fn();
		const first = new File([new Uint8Array(1024 * 1024)], 'first.pdf', {
			type: 'application/pdf',
		});
		const second = new File(['second'], 'second.zip', { type: 'application/zip' });

		render(
			<FileUpload
				name="attachments"
				label="添付ファイル"
				multiple={false}
				maxFiles={2}
				maxSize={2}
				onFilesChange={onFilesChange}
			/>,
		);

		await user.upload(screen.getByLabelText('添付ファイル'), [first, second]);
		expect(onFilesChange).toHaveBeenCalledWith([first]);
		expect(screen.getByText('1.00 MB')).toBeInTheDocument();
		expect(screen.queryByRole('button', { name: 'second.zip 削除' })).not.toBeInTheDocument();
	});

	it('未指定のラベルと object ref を使い、種類の異なるファイルを表示する', () => {
		const inputRef = createRef<HTMLInputElement>();
		const files = [
			new File(['archive'], 'zip.zip', { type: 'application/zip' }),
			new File(['data'], 'binary.bin', { type: 'application/octet-stream' }),
			new File(['text'], 'readme.txt', { type: 'text/plain' }),
		];

		render(
			<FileUpload name="attachments" value={files} maxFiles={3} maxSize={1} inputRef={inputRef} />,
		);

		expect(inputRef.current).toBe(screen.getByLabelText('クリックしてファイルを選択'));
		for (const file of files) {
			expect(screen.getByText(file.name)).toBeInTheDocument();
		}
	});

	it('disabled の場合はドラッグ操作で選択状態を変更しない', () => {
		const onFilesChange = vi.fn();
		render(
			<FileUpload
				name="attachments"
				label="添付ファイル"
				disabled
				maxFiles={2}
				maxSize={1}
				onFilesChange={onFilesChange}
			/>,
		);

		const dropZone = screen.getByText('ファイルをドラッグ＆ドロップ').closest('[data-slot="card"]');
		expect(dropZone).not.toBeNull();
		fireEvent.dragOver(dropZone as HTMLElement);
		expect(dropZone).not.toHaveClass('border-primary');
		const inputClick = vi.spyOn(screen.getByLabelText('添付ファイル'), 'click');
		fireEvent.click(dropZone as HTMLElement);
		expect(inputClick).not.toHaveBeenCalled();

		const dropEvent = new Event('drop', { bubbles: true, cancelable: true });
		Object.defineProperty(dropEvent, 'dataTransfer', {
			value: { files: [new File(['contents'], 'document.pdf')] },
		});
		fireEvent(dropZone as HTMLElement, dropEvent);

		expect(onFilesChange).not.toHaveBeenCalled();
	});

	it('ドロップ領域のクリックを入力に転送し、ファイルなしの変更を無視する', () => {
		const onFilesChange = vi.fn();
		render(
			<FileUpload
				name="attachments"
				label="添付ファイル"
				maxFiles={2}
				maxSize={1}
				onFilesChange={onFilesChange}
			/>,
		);

		const input = screen.getByLabelText('添付ファイル');
		const click = vi.spyOn(input, 'click').mockImplementation(() => {});
		const dropZone = screen.getByText('ファイルをドラッグ＆ドロップ').closest('[data-slot="card"]');
		expect(dropZone).not.toBeNull();
		fireEvent.click(dropZone as HTMLElement);
		expect(click).toHaveBeenCalledOnce();

		Object.defineProperty(input, 'files', { configurable: true, value: null });
		fireEvent.change(input);
		expect(onFilesChange).not.toHaveBeenCalled();
	});
});
