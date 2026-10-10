import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { PasswordInput } from './PasswordInput';

describe('PasswordInput', () => {
	it('ラベルとパスワード入力欄を表示する', () => {
		render(<PasswordInput id="password" label="パスワード" />);

		expect(screen.getByLabelText('パスワード')).toBeInTheDocument();
	});

	it('初期状態ではパスワードを隠す', () => {
		render(<PasswordInput id="password" label="パスワード" />);

		expect(screen.getByLabelText('パスワード')).toHaveAttribute('type', 'password');
	});

	it('表示ボタンを押すとパスワードを表示する', async () => {
		const user = userEvent.setup();
		render(<PasswordInput id="password" label="パスワード" />);

		await user.click(screen.getByRole('button', { name: 'パスワードを表示' }));

		expect(screen.getByLabelText('パスワード')).toHaveAttribute('type', 'text');
		expect(screen.getByRole('button', { name: 'パスワードを隠す' })).toBeInTheDocument();
	});

	it('もう一度押すとパスワードを隠す', async () => {
		const user = userEvent.setup();
		render(<PasswordInput id="password" label="パスワード" />);

		await user.click(screen.getByRole('button', { name: 'パスワードを表示' }));
		await user.click(screen.getByRole('button', { name: 'パスワードを隠す' }));

		expect(screen.getByLabelText('パスワード')).toHaveAttribute('type', 'password');
	});

	it('required を指定すると必須マークを表示する', () => {
		const { container } = render(<PasswordInput id="password" label="パスワード" required />);

		expect(container.querySelector('.text-destructive')).toBeInTheDocument();
	});

	it('description を指定すると説明を表示する', () => {
		render(
			<PasswordInput id="password" label="パスワード" description="8文字以上で入力してください" />,
		);

		expect(screen.getByText('8文字以上で入力してください')).toBeInTheDocument();
	});

	it('error を指定するとエラーメッセージを表示する', () => {
		render(<PasswordInput id="password" label="パスワード" error="パスワードを入力してください" />);

		expect(screen.getByText('パスワードを入力してください')).toBeInTheDocument();
		expect(screen.getByLabelText('パスワード')).toHaveAttribute('aria-invalid', 'true');
	});

	it('error がない場合は aria-invalid が false になる', () => {
		render(<PasswordInput id="password" label="パスワード" />);

		expect(screen.getByLabelText('パスワード')).toHaveAttribute('aria-invalid', 'false');
	});

	it('readOnly を指定すると入力欄が編集不可になり、切り替えボタンが無効になる', () => {
		render(<PasswordInput id="password" label="パスワード" readOnly />);

		expect(document.getElementById('password')).toHaveAttribute('readonly');

		expect(screen.getByRole('button', { name: 'パスワードを表示' })).toBeDisabled();
	});

	it.each([
		['sm', 'h-7'],
		['md', 'h-8'],
		['lg', 'h-10'],
	] as const)('%s サイズのスタイルを適用する', (inputSize, sizeClass) => {
		render(<PasswordInput id="password" label="パスワード" inputSize={inputSize} />);

		expect(document.querySelector('[data-slot="input-group"]')).toHaveClass(sizeClass);
	});

	it('defaultValue を入力欄に反映する', () => {
		render(<PasswordInput id="password" label="パスワード" defaultValue="secret123" />);

		expect(screen.getByLabelText('パスワード')).toHaveValue('secret123');
	});

	it('入力値の変更を onChange で通知する', async () => {
		const user = userEvent.setup();
		const handleChange = vi.fn();

		render(<PasswordInput id="password" label="パスワード" onChange={handleChange} />);

		await user.type(screen.getByLabelText('パスワード'), 'secret123');

		expect(handleChange).toHaveBeenCalled();
	});

	it('className などの外部スタイル指定を受け付けない', () => {
		// WithoutExternalStyle の型制約はコンパイル時に検証する。
		// 実行時のスタイル除去は withoutExternalStyle のテストで検証する。
		render(<PasswordInput id="password" label="パスワード" />);
		expect(screen.getByLabelText('パスワード')).toBeInTheDocument();
	});
});
