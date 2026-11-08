import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
});
