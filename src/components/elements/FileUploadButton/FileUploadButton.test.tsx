import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
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

	it('拡張子とワイルドカード形式のファイルを受け付ける', async () => {
		const user = userEvent.setup();
		const onFilesChange = vi.fn();
		const pdf = new File(['pdf'], 'report.PDF', { type: 'application/pdf' });
		const image = new File(['image'], 'photo.png', { type: 'image/png' });

		render(
			<FileUploadButton
				name="attachments"
				accept=".pdf, image/*"
				maxFiles={2}
				maxSize={1}
				onFilesChange={onFilesChange}
			/>,
		);
		await user.upload(screen.getByLabelText('ファイルを添付'), [pdf, image]);

		expect(onFilesChange).toHaveBeenCalledWith([pdf, image]);
	});

	it('MIME タイプで許可し、形式指定のない MIME トークンは拒否する', async () => {
		const user = userEvent.setup();
		const onFilesChange = vi.fn();
		const onError = vi.fn();
		const file = new File(['text'], 'notes.txt', { type: 'text/plain' });
		const { rerender } = render(
			<FileUploadButton
				name="attachments"
				accept="text/plain"
				maxFiles={2}
				maxSize={1}
				onFilesChange={onFilesChange}
				onError={onError}
			/>,
		);

		await user.upload(screen.getByLabelText('ファイルを添付'), file);
		expect(onFilesChange).toHaveBeenCalledWith([file]);

		rerender(
			<FileUploadButton
				name="attachments"
				accept="application"
				maxFiles={2}
				maxSize={1}
				onFilesChange={onFilesChange}
				onError={onError}
			/>,
		);
		fireEvent.change(screen.getByLabelText('ファイルを添付'), { target: { files: [file] } });

		expect(onError).toHaveBeenLastCalledWith('notes.txt: 許可されていないファイル形式です');
	});

	it('許可されていない形式を拒否する', () => {
		const onFilesChange = vi.fn();
		const onError = vi.fn();
		const file = new File(['text'], 'notes.txt', { type: 'text/plain' });

		render(
			<FileUploadButton
				name="attachments"
				accept=".pdf"
				maxFiles={2}
				maxSize={1}
				onFilesChange={onFilesChange}
				onError={onError}
			/>,
		);
		fireEvent.change(screen.getByLabelText('ファイルを添付'), { target: { files: [file] } });

		expect(onError).toHaveBeenLastCalledWith('notes.txt: 許可されていないファイル形式です');
		expect(onFilesChange).not.toHaveBeenCalled();
	});

	it('複数選択を無効にして必須マークと説明を表示する', async () => {
		const user = userEvent.setup();
		const onFilesChange = vi.fn();
		const first = new File(['first'], 'first.txt');
		const second = new File(['second'], 'second.txt');

		render(
			<FileUploadButton
				name="attachments"
				label="添付書類"
				description="添付書類を選択してください"
				required
				multiple={false}
				maxFiles={2}
				maxSize={1}
				onFilesChange={onFilesChange}
			/>,
		);

		const input = screen.getByLabelText('添付書類');
		expect(input).not.toHaveAttribute('multiple');
		expect(screen.getByText('添付書類を選択してください')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: '添付書類' })).toBeInTheDocument();
		expect(screen.getByText('*')).toBeInTheDocument();

		await user.upload(input, [first, second]);
		expect(onFilesChange).toHaveBeenCalledWith([first]);
	});

	it('上限を超えた選択を切り詰め、重複ファイルを一つにまとめる', async () => {
		const user = userEvent.setup();
		const onFilesChange = vi.fn();
		const onError = vi.fn();
		const first = new File(['first'], 'first.txt');
		const second = new File(['second'], 'second.txt');

		render(
			<FileUploadButton
				name="attachments"
				maxFiles={1}
				maxSize={1}
				onFilesChange={onFilesChange}
				onError={onError}
			/>,
		);
		const input = screen.getByLabelText('ファイルを添付');
		await user.upload(input, [first, second]);

		expect(onFilesChange).toHaveBeenLastCalledWith([first]);
		expect(onError).toHaveBeenLastCalledWith('ファイルは最大1件までです');

		onFilesChange.mockClear();
		await user.upload(input, first);
		expect(onFilesChange).toHaveBeenLastCalledWith([first]);
	});

	it('長いファイル名を省略して表示し、削除で選択状態を更新する', async () => {
		const user = userEvent.setup();
		const onFilesChange = vi.fn();
		const onError = vi.fn();
		const file = new File(['content'], 'a-very-long-document.pdf');

		render(
			<FileUploadButton
				name="attachments"
				value={[file]}
				maxFiles={2}
				maxSize={1}
				error="添付ファイルを確認してください"
				onFilesChange={onFilesChange}
				onError={onError}
			/>,
		);

		expect(screen.getByRole('alert')).toHaveTextContent('添付ファイルを確認してください');
		expect(screen.getByText('a-very-lon...')).toBeInTheDocument();

		await user.click(screen.getByRole('button', { name: 'a-very-long-document.pdf 削除' }));

		expect(onFilesChange).toHaveBeenCalledWith([]);
		expect(onError).toHaveBeenCalledWith('');
	});

	it('入力 ref と blur を通知し、未指定値でも選択ファイルを管理する', async () => {
		const user = userEvent.setup();
		const onBlur = vi.fn();
		const inputRef = vi.fn();
		const file = new File(['content'], 'document.pdf');

		render(
			<FileUploadButton
				name="attachments"
				maxFiles={2}
				maxSize={1}
				onBlur={onBlur}
				inputRef={inputRef}
			/>,
		);
		const input = screen.getByLabelText('ファイルを添付');
		expect(inputRef).toHaveBeenLastCalledWith(input);

		await user.upload(input, file);
		await user.tab();

		expect(screen.getByRole('button', { name: 'document.pdf 削除' })).toBeInTheDocument();
		expect(onBlur).toHaveBeenCalled();
	});

	it('object ref に file input を設定する', () => {
		const inputRef = createRef<HTMLInputElement>();

		render(<FileUploadButton name="attachments" maxFiles={2} maxSize={1} inputRef={inputRef} />);

		expect(inputRef.current).toBe(screen.getByLabelText('ファイルを添付'));
	});

	it('選択ファイルがない change イベントでは更新しない', () => {
		const onFilesChange = vi.fn();
		render(
			<FileUploadButton
				name="attachments"
				maxFiles={2}
				maxSize={1}
				onFilesChange={onFilesChange}
			/>,
		);

		const input = screen.getByLabelText('ファイルを添付');
		Object.defineProperty(input, 'files', { configurable: true, value: null });
		fireEvent.change(input);

		expect(onFilesChange).not.toHaveBeenCalled();
	});
});
