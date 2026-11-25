import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { PasswordInput } from './PasswordInput';

describe('PasswordInput', () => {
	it('id を省略した場合は自動生成した id をラベルに関連付ける', () => {
		render(<PasswordInput label="パスワード" />);

		expect(screen.getByLabelText('パスワード')).toHaveAttribute('id');
	});

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

		const inputGroup = document.querySelector('[data-slot="input-group"]');
		expect(inputGroup).toHaveClass('border-dashed', 'dark:has-disabled:bg-transparent');
		expect(inputGroup).not.toHaveClass('has-disabled:bg-input/50');
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

	describe('クリア', () => {
		it('入力値がある場合にクリアボタンを表示する', () => {
			render(<PasswordInput id="password" label="パスワード" defaultValue="secret123" />);

			expect(screen.getByRole('button', { name: '入力をクリア' })).toBeInTheDocument();
		});

		it('入力値がない場合にクリアボタンを表示しない', () => {
			render(<PasswordInput id="password" label="パスワード" />);

			expect(screen.queryByRole('button', { name: '入力をクリア' })).not.toBeInTheDocument();
		});

		it('クリア時に onChange を呼び出す', async () => {
			const user = userEvent.setup();
			const onChange = vi.fn();

			render(
				<PasswordInput
					id="password"
					label="パスワード"
					defaultValue="secret123"
					onChange={onChange}
				/>,
			);

			await user.click(screen.getByRole('button', { name: '入力をクリア' }));

			expect(onChange).toHaveBeenCalled();
			expect(onChange.mock.calls.at(-1)?.[0].target.value).toBe('');
		});

		it('controlled component の入力値をクリアすると onChange に空文字を渡す', async () => {
			const user = userEvent.setup();
			const onChange = vi.fn((event: { target: HTMLInputElement }) => event.target.value);

			render(
				<PasswordInput id="password" label="パスワード" value="secret123" onChange={onChange} />,
			);

			await user.click(screen.getByRole('button', { name: '入力をクリア' }));

			expect(onChange).toHaveBeenCalled();
			expect(onChange.mock.results.at(-1)?.value).toBe('');
		});

		it('入力値をクリアできる', async () => {
			const user = userEvent.setup();

			render(<PasswordInput label="パスワード" defaultValue="password123" />);

			const input = screen.getByLabelText('パスワード');
			expect(input).toHaveValue('password123');

			await user.click(screen.getByRole('button', { name: '入力をクリア' }));

			expect(input).toHaveValue('');
			expect(screen.queryByRole('button', { name: '入力をクリア' })).not.toBeInTheDocument();
		});

		it('クリアボタンをクリックすると入力値を空にする', async () => {
			const user = userEvent.setup();

			render(<PasswordInput id="password" label="パスワード" defaultValue="password123" />);

			const input = screen.getByLabelText('パスワード');

			expect(input).toHaveValue('password123');

			await user.click(screen.getByRole('button', { name: '入力をクリア' }));

			expect(input).toHaveValue('');
			expect(screen.queryByRole('button', { name: '入力をクリア' })).not.toBeInTheDocument();
		});

		it('readOnly が true の場合にクリアボタンを表示しない', () => {
			render(<PasswordInput id="password" label="パスワード" defaultValue="secret123" readOnly />);

			expect(screen.queryByRole('button', { name: '入力をクリア' })).not.toBeInTheDocument();
		});

		it('入力欄がDOMから取得できない場合はクリア処理を終了する', async () => {
			const user = userEvent.setup();

			render(<PasswordInput id="password" label="パスワード" defaultValue="secret123" />);

			screen.getByLabelText('パスワード').remove();

			await user.click(screen.getByRole('button', { name: '入力をクリア' }));

			expect(screen.getByRole('button', { name: '入力をクリア' })).toBeInTheDocument();
		});
	});
});
