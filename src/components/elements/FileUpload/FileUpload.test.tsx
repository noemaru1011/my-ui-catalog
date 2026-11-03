import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import {
	ATTACHMENTS_SCHEMA,
	MAX_ATTACHMENT_SIZE_IN_BYTES,
} from '@/components/example/form/schema/formExampleSchema';
import { FileUpload } from './FileUpload';

describe('FileUpload', () => {
	it('フォームスキーマで添付ファイルを検証する', () => {
		const file = new File(['contents'], 'document.pdf', { type: 'application/pdf' });
		const oversizedFile = new File([new Uint8Array(MAX_ATTACHMENT_SIZE_IN_BYTES + 1)], 'large.pdf');

		expect(ATTACHMENTS_SCHEMA.safeParse([]).success).toBe(false);
		expect(ATTACHMENTS_SCHEMA.safeParse([file]).success).toBe(true);
		expect(ATTACHMENTS_SCHEMA.safeParse(Array(6).fill(file)).success).toBe(false);
		expect(ATTACHMENTS_SCHEMA.safeParse([oversizedFile]).success).toBe(false);
	});

	it('選択したファイルを通知し、制御された値を表示する', async () => {
		const user = userEvent.setup();
		const onFilesChange = vi.fn();
		const file = new File(['contents'], 'document.pdf', { type: 'application/pdf' });

		const { rerender } = render(
			<FileUpload label="添付ファイル" value={[]} onFilesChange={onFilesChange} />,
		);

		await user.upload(screen.getByLabelText('添付ファイル'), file);

		expect(onFilesChange).toHaveBeenCalledWith([file]);

		rerender(<FileUpload label="添付ファイル" value={[file]} onFilesChange={onFilesChange} />);

		expect(screen.getByText('document.pdf')).toBeInTheDocument();
	});

	it('フォームから渡されたバリデーションエラーを表示する', () => {
		render(<FileUpload label="添付ファイル" error="ファイルを選択してください。" />);

		expect(screen.getByRole('alert')).toHaveTextContent('ファイルを選択してください。');
		expect(screen.getByLabelText('添付ファイル')).toHaveAttribute('aria-invalid', 'true');
	});

	it('最大サイズを超えるファイルを拒否する', async () => {
		const user = userEvent.setup();
		const onFilesChange = vi.fn();
		const oversizedFile = new File([new Uint8Array(2 * 1024 * 1024)], 'large.pdf');

		render(<FileUpload label="添付ファイル" maxSize={1} onFilesChange={onFilesChange} />);

		await user.upload(screen.getByLabelText('添付ファイル'), oversizedFile);

		expect(screen.getByRole('alert')).toHaveTextContent(
			'large.pdf: ファイルサイズが上限を超えています',
		);
		expect(onFilesChange).toHaveBeenCalledWith([]);
	});
});
