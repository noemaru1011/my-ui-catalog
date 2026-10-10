import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
	describe('デフォルト表示', () => {
		it('ラベルと入力フィールドを表示する', () => {
			render(<Input id="username" label="ユーザー名" />);

			expect(screen.getByRole('textbox', { name: 'ユーザー名' })).toBeInTheDocument();
		});

		it('デフォルトのサイズクラス h-8 を適用する', () => {
			render(<Input id="username" label="ユーザー名" />);

			expect(screen.getByRole('textbox', { name: 'ユーザー名' })).toHaveClass('h-8');
		});

		it('必須マークを表示しない', () => {
			render(<Input id="username" label="ユーザー名" />);

			expect(screen.queryByText('*')).not.toBeInTheDocument();
		});

		it('説明文を表示しない', () => {
			render(<Input id="username" label="ユーザー名" />);

			expect(screen.queryByText('入力してください')).not.toBeInTheDocument();
		});

		it('エラーメッセージを表示せず aria-invalid を false にする', () => {
			render(<Input id="username" label="ユーザー名" />);

			expect(screen.getByRole('textbox', { name: 'ユーザー名' })).toHaveAttribute(
				'aria-invalid',
				'false',
			);

			expect(screen.queryByText('入力エラー')).not.toBeInTheDocument();
		});

		it('編集不可バッジを表示しない', () => {
			render(<Input id="username" label="ユーザー名" />);

			expect(screen.queryByText('編集不可')).not.toBeInTheDocument();
		});
	});

	describe('type', () => {
		it.each([
			['text', 'textbox'],
			['email', 'textbox'],
			['number', 'spinbutton'],
			['tel', 'textbox'],
			['url', 'textbox'],
			['search', 'searchbox'],
		] as const)('type="%s" の入力フィールドを表示する', (type, role) => {
			render(<Input id="contact" label="連絡先" type={type} />);

			const input = screen.getByRole(role, {
				name: '連絡先',
			});

			expect(input).toHaveAttribute('type', type);
		});

		it('type を指定しない場合、テキスト入力として動作する', () => {
			render(<Input id="username" label="ユーザー名" />);

			expect(screen.getByRole('textbox', { name: 'ユーザー名' })).toBeInTheDocument();
		});
	});

	describe('inputSize', () => {
		it.each([
			['sm', 'h-7'],
			['md', 'h-8'],
			['lg', 'h-10'],
		] as const)('inputSize="%s" の場合、%s を適用する', (inputSize, expectedClass) => {
			render(<Input id="username" label="ユーザー名" inputSize={inputSize} />);

			expect(screen.getByRole('textbox', { name: 'ユーザー名' })).toHaveClass(expectedClass);
		});
	});

	describe('required', () => {
		it('required が true の場合、必須マークを表示する', () => {
			render(<Input id="username" label="ユーザー名" required />);

			expect(screen.getByText('*')).toBeInTheDocument();
		});

		it('required が false の場合、必須マークを表示しない', () => {
			render(<Input id="username" label="ユーザー名" required={false} />);

			expect(screen.queryByText('*')).not.toBeInTheDocument();
		});
	});

	describe('description', () => {
		it('description が指定された場合、説明文を表示する', () => {
			render(
				<Input
					id="email"
					label="メールアドレス"
					description="有効なメールアドレスを入力してください"
				/>,
			);

			expect(screen.getByText('有効なメールアドレスを入力してください')).toBeInTheDocument();
		});

		it('空文字の description は表示しない', () => {
			render(<Input id="email" label="メールアドレス" description="" />);

			expect(screen.queryByText('有効なメールアドレスを入力してください')).not.toBeInTheDocument();
		});
	});

	describe('error', () => {
		it('error が指定された場合、エラーメッセージを表示する', () => {
			render(
				<Input id="email" label="メールアドレス" error="メールアドレスの形式が正しくありません" />,
			);

			expect(screen.getByText('メールアドレスの形式が正しくありません')).toBeInTheDocument();
		});

		it('error が指定された場合、aria-invalid を true にする', () => {
			render(<Input id="email" label="メールアドレス" error="入力エラー" />);

			expect(screen.getByRole('textbox', { name: 'メールアドレス' })).toHaveAttribute(
				'aria-invalid',
				'true',
			);
		});

		it('error が空文字の場合、エラー状態にしない', () => {
			render(<Input id="email" label="メールアドレス" error="" />);

			expect(screen.getByRole('textbox', { name: 'メールアドレス' })).toHaveAttribute(
				'aria-invalid',
				'false',
			);

			expect(screen.queryByText('入力エラー')).not.toBeInTheDocument();
		});
	});

	describe('readOnly', () => {
		it('readOnly が true の場合、編集不可バッジを表示する', () => {
			render(<Input id="username" label="ユーザー名" readOnly />);

			expect(screen.getByText('編集不可')).toBeInTheDocument();
		});

		it('readOnly が true の場合、入力フィールドを読み取り専用にする', () => {
			render(<Input id="username" label="ユーザー名" readOnly />);

			expect(screen.getByRole('textbox', { name: /ユーザー名/ })).toHaveAttribute('readonly');
		});

		it('readOnly が true の場合、border-dashed を適用する', () => {
			render(<Input id="username" label="ユーザー名" readOnly />);

			expect(screen.getByRole('textbox', { name: /ユーザー名/ })).toHaveClass('border-dashed');
		});

		it('readOnly が true の場合、入力値を変更できない', async () => {
			const user = userEvent.setup();

			render(<Input id="username" label="ユーザー名" defaultValue="変更不可" readOnly />);

			const input = screen.getByRole('textbox', {
				name: /ユーザー名/,
			});

			await user.click(input);
			await user.keyboard('追加');

			expect(input).toHaveValue('変更不可');
		});

		it('readOnly が false の場合、編集不可バッジを表示しない', () => {
			render(<Input id="username" label="ユーザー名" readOnly={false} />);

			expect(screen.queryByText('編集不可')).not.toBeInTheDocument();
		});
	});

	describe('入力値とコールバック', () => {
		it('defaultValue で初期値を設定できる', () => {
			render(<Input id="username" label="ユーザー名" defaultValue="test-user" />);

			expect(screen.getByRole('textbox', { name: 'ユーザー名' })).toHaveValue('test-user');
		});

		it('ユーザーが入力した値を表示する', async () => {
			const user = userEvent.setup();

			render(<Input id="username" label="ユーザー名" />);

			const input = screen.getByRole('textbox', {
				name: 'ユーザー名',
			});

			await user.type(input, 'test-user');

			expect(input).toHaveValue('test-user');
		});

		it('入力時に onChange を呼び出す', async () => {
			const user = userEvent.setup();
			const onChange = vi.fn();

			render(<Input id="username" label="ユーザー名" onChange={onChange} />);

			await user.type(screen.getByRole('textbox', { name: 'ユーザー名' }), 'a');

			expect(onChange).toHaveBeenCalled();
			expect(onChange.mock.calls[0][0].target.value).toBe('a');
		});

		it('controlled component の value を表示する', () => {
			render(
				<Input id="username" label="ユーザー名" value="controlled-value" onChange={vi.fn()} />,
			);

			expect(screen.getByRole('textbox', { name: 'ユーザー名' })).toHaveValue('controlled-value');
		});

		it('親から value が更新されると表示値も更新する', () => {
			const onChange = vi.fn();

			const { rerender } = render(
				<Input id="username" label="ユーザー名" value="before" onChange={onChange} />,
			);

			const input = screen.getByRole('textbox', {
				name: 'ユーザー名',
			});

			expect(input).toHaveValue('before');

			rerender(<Input id="username" label="ユーザー名" value="after" onChange={onChange} />);

			expect(input).toHaveValue('after');
		});
	});

	describe('props の組み合わせ', () => {
		it('required、description、error を同時に表示する', () => {
			render(
				<Input
					id="email"
					label="メールアドレス"
					required
					description="会社のメールアドレスを入力してください"
					error="メールアドレスが不正です"
				/>,
			);

			expect(screen.getByText('*')).toBeInTheDocument();

			expect(screen.getByText('会社のメールアドレスを入力してください')).toBeInTheDocument();

			expect(screen.getByText('メールアドレスが不正です')).toBeInTheDocument();

			expect(
				screen.getByRole('textbox', {
					name: /メールアドレス/,
				}),
			).toHaveAttribute('aria-invalid', 'true');
		});

		it('readOnly と description を同時に指定できる', () => {
			render(
				<Input
					id="username"
					label="ユーザー名"
					description="確定済みのユーザー名です"
					defaultValue="test-user"
					readOnly
				/>,
			);

			expect(screen.getByText('確定済みのユーザー名です')).toBeInTheDocument();

			expect(screen.getByText('編集不可')).toBeInTheDocument();

			expect(screen.getByRole('textbox', { name: /ユーザー名/ })).toHaveValue('test-user');
		});

		it('number 型でも初期値を設定できる', () => {
			render(<Input id="age" label="年齢" type="number" defaultValue={20} />);

			expect(screen.getByRole('spinbutton', { name: '年齢' })).toHaveValue(20);
		});
	});
});
