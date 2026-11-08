import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { FileUploadButton } from './FileUploadButton';

describe('FileUploadButton', () => {
	it('ボタンを押して選択したファイルを通知する', async () => {
		const user = userEvent.setup();
		const onFilesChange = vi.fn();
		const file = new File(['contents'], 'document.pdf', { type: 'application/pdf' });

		render(
			<FileUploadButton
				name="attachments"
				maxFiles={2}
				maxSize={1}
				onFilesChange={onFilesChange}
			/>,
		);

		await user.click(screen.getByRole('button', { name: 'ファイルを添付' }));
		await user.upload(screen.getByLabelText('ファイルを添付'), file);

		expect(onFilesChange).toHaveBeenCalledWith([file]);
		expect(screen.getByRole('button', { name: 'document.pdf 削除' })).toBeInTheDocument();
	});

	it('制御された値を表示し、削除を通知する', async () => {
		const user = userEvent.setup();
		const onFilesChange = vi.fn();
		const file = new File(['contents'], 'document.pdf');

		render(
			<FileUploadButton
				name="attachments"
				maxFiles={2}
				maxSize={1}
				value={[file]}
				onFilesChange={onFilesChange}
			/>,
		);

		await user.click(screen.getByRole('button', { name: 'document.pdf 削除' }));

		expect(onFilesChange).toHaveBeenCalledWith([]);
	});

	it('上限を超えるファイルは拒否し、エラーを親に通知する', async () => {
		const user = userEvent.setup();
		const onFilesChange = vi.fn();
		const onError = vi.fn();
		const oversizedFile = new File([new Uint8Array(1024 * 1024 + 1)], 'large.pdf');

		render(
			<FileUploadButton
				name="attachments"
				maxFiles={2}
				maxSize={1}
				onFilesChange={onFilesChange}
				onError={onError}
			/>,
		);

		await user.upload(screen.getByLabelText('ファイルを添付'), oversizedFile);

		expect(onError).toHaveBeenLastCalledWith('large.pdf: ファイルサイズが上限を超えています');
		expect(onFilesChange).not.toHaveBeenCalled();
		expect(screen.queryByRole('alert')).not.toBeInTheDocument();
	});

	it('disabled の場合はファイルを選択できない', async () => {
		const user = userEvent.setup();
		const onFilesChange = vi.fn();
		const file = new File(['contents'], 'document.pdf');

		render(
			<FileUploadButton
				name="attachments"
				maxFiles={2}
				maxSize={1}
				disabled
				onFilesChange={onFilesChange}
			/>,
		);

		expect(screen.getByRole('button', { name: 'ファイルを添付' })).toBeDisabled();
		await user.upload(screen.getByLabelText('ファイルを添付'), file);

		expect(onFilesChange).not.toHaveBeenCalled();
	});
});
