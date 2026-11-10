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
				fieldLabel="ファイル添付"
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
				fieldLabel="ファイル添付"
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

	it('disabled の場合はファイルを選択できない', async () => {
		const user = userEvent.setup();
		const onFilesChange = vi.fn();
		const file = new File(['contents'], 'document.pdf');

		render(
			<FileUploadButton
				fieldLabel="ファイル添付"
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

	it('accept を input に設定する', () => {
		render(
			<FileUploadButton
				fieldLabel="ファイル添付"
				name="attachments"
				accept=".pdf, image/*"
				maxFiles={2}
				maxSize={1}
			/>,
		);

		expect(screen.getByLabelText('ファイルを添付')).toHaveAttribute('accept', '.pdf, image/*');
	});

	it('複数選択を無効にして必須マークと説明を表示する', async () => {
		const user = userEvent.setup();
		const onFilesChange = vi.fn();
		const first = new File(['first'], 'first.txt');
		const second = new File(['second'], 'second.txt');

		render(
			<FileUploadButton
				fieldLabel="ファイル添付"
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

	it('上限を超えた選択を切り詰める', async () => {
		const user = userEvent.setup();
		const onFilesChange = vi.fn();
		const first = new File(['first'], 'first.txt');
		const second = new File(['second'], 'second.txt');

		render(
			<FileUploadButton
				fieldLabel="ファイル添付"
				name="attachments"
				maxFiles={1}
				maxSize={1}
				onFilesChange={onFilesChange}
			/>,
		);

		const input = screen.getByLabelText('ファイルを添付');

		await user.upload(input, [first, second]);

		expect(onFilesChange).toHaveBeenLastCalledWith([first]);
	});

	it('重複ファイルを一つにまとめる', async () => {
		const user = userEvent.setup();
		const onFilesChange = vi.fn();
		const first = new File(['first'], 'first.txt', { lastModified: 1000 });

		render(
			<FileUploadButton
				fieldLabel="ファイル添付"
				name="attachments"
				maxFiles={3}
				maxSize={1}
				onFilesChange={onFilesChange}
			/>,
		);

		const input = screen.getByLabelText('ファイルを添付');

		await user.upload(input, first);
		await user.upload(input, first);

		expect(onFilesChange).toHaveBeenLastCalledWith([first]);
		expect(screen.getAllByRole('button', { name: 'first.txt 削除' })).toHaveLength(1);
	});

	it('長いファイル名を省略して表示し、削除で選択状態を更新する', async () => {
		const user = userEvent.setup();
		const onFilesChange = vi.fn();
		const file = new File(['content'], 'a-very-long-document.pdf');

		render(
			<FileUploadButton
				fieldLabel="ファイル添付"
				name="attachments"
				value={[file]}
				maxFiles={2}
				maxSize={1}
				error="添付ファイルを確認してください"
				onFilesChange={onFilesChange}
			/>,
		);

		expect(screen.getByRole('alert')).toHaveTextContent('添付ファイルを確認してください');
		expect(screen.getByText('a-very-lon...')).toBeInTheDocument();

		await user.click(screen.getByRole('button', { name: 'a-very-long-document.pdf 削除' }));

		expect(onFilesChange).toHaveBeenCalledWith([]);
	});

	it('入力 ref と blur を通知し、未指定値でも選択ファイルを管理する', async () => {
		const user = userEvent.setup();
		const onBlur = vi.fn();
		const inputRef = vi.fn();
		const file = new File(['content'], 'document.pdf');

		render(
			<FileUploadButton
				fieldLabel="ファイル添付"
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

		render(
			<FileUploadButton
				fieldLabel="ファイル添付"
				name="attachments"
				maxFiles={2}
				maxSize={1}
				inputRef={inputRef}
			/>,
		);

		expect(inputRef.current).toBe(screen.getByLabelText('ファイルを添付'));
	});

	it('選択ファイルがない change イベントでは更新しない', () => {
		const onFilesChange = vi.fn();

		render(
			<FileUploadButton
				fieldLabel="ファイル添付"
				name="attachments"
				maxFiles={2}
				maxSize={1}
				onFilesChange={onFilesChange}
			/>,
		);

		const input = screen.getByLabelText('ファイルを添付');

		Object.defineProperty(input, 'files', {
			configurable: true,
			value: null,
		});

		fireEvent.change(input);

		expect(onFilesChange).not.toHaveBeenCalled();
	});
});
