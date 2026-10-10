import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Textarea } from './Textarea';

describe('Textarea', () => {
	describe('デフォルト表示', () => {
		it('ラベルとテキストエリアを表示する', () => {
			render(<Textarea id="comment" label="コメント" />);

			expect(screen.getByRole('textbox', { name: 'コメント' })).toBeInTheDocument();
		});

		it('description が未指定の場合、説明文を表示しない', () => {
			render(<Textarea id="comment" label="コメント" />);

			expect(screen.queryByText('説明文')).not.toBeInTheDocument();
		});

		it('error が未指定の場合、エラーメッセージを表示しない', () => {
			render(<Textarea id="comment" label="コメント" />);

			expect(screen.queryByText('入力エラー')).not.toBeInTheDocument();

			expect(screen.getByRole('textbox', { name: 'コメント' })).toHaveAttribute(
				'aria-invalid',
				'false',
			);
		});

		it('required が未指定の場合、必須マークを表示しない', () => {
			render(<Textarea id="comment" label="コメント" />);

			expect(screen.getByRole('textbox', { name: 'コメント' })).toBeInTheDocument();

			expect(screen.queryByText('*')).not.toBeInTheDocument();
		});

		it('readOnly が未指定の場合、編集不可バッジを表示しない', () => {
			render(<Textarea id="comment" label="コメント" />);

			expect(screen.queryByText('編集不可')).not.toBeInTheDocument();

			expect(screen.getByRole('textbox', { name: 'コメント' })).not.toHaveAttribute('readonly');
		});
	});

	describe('required', () => {
		it('required が true の場合、必須マークを表示する', () => {
			render(<Textarea id="comment" label="コメント" required />);

			expect(screen.getByText('*')).toBeInTheDocument();
		});

		it('required が false の場合、必須マークを表示しない', () => {
			render(<Textarea id="comment" label="コメント" required={false} />);

			expect(screen.queryByText('*')).not.toBeInTheDocument();
		});
	});

	describe('description', () => {
		it('description が指定された場合、説明文を表示する', () => {
			render(
				<Textarea id="comment" label="コメント" description="200文字以内で入力してください" />,
			);

			expect(screen.getByText('200文字以内で入力してください')).toBeInTheDocument();
		});
	});

	describe('error', () => {
		it('error が指定された場合、エラーメッセージを表示する', () => {
			render(<Textarea id="comment" label="コメント" error="コメントを入力してください" />);

			expect(screen.getByText('コメントを入力してください')).toBeInTheDocument();
		});

		it('error が指定された場合、aria-invalid を true にする', () => {
			render(<Textarea id="comment" label="コメント" error="入力エラー" />);

			expect(screen.getByRole('textbox', { name: /コメント/ })).toHaveAttribute(
				'aria-invalid',
				'true',
			);
		});

		it('error が未指定の場合、aria-invalid を false にする', () => {
			render(<Textarea id="comment" label="コメント" />);

			expect(screen.getByRole('textbox', { name: 'コメント' })).toHaveAttribute(
				'aria-invalid',
				'false',
			);
		});

		it('error が空文字の場合、エラーメッセージを表示しない', () => {
			render(<Textarea id="comment" label="コメント" error="" />);

			expect(screen.getByRole('textbox', { name: 'コメント' })).toHaveAttribute(
				'aria-invalid',
				'false',
			);

			expect(screen.queryByText('入力エラー')).not.toBeInTheDocument();
		});
	});

	describe('readOnly', () => {
		it('readOnly が true の場合、編集不可バッジを表示する', () => {
			render(<Textarea id="comment" label="コメント" readOnly />);

			expect(screen.getByText('編集不可')).toBeInTheDocument();
		});

		it('readOnly が true の場合、テキストエリアを読み取り専用にする', () => {
			render(<Textarea id="comment" label="コメント" readOnly />);

			expect(screen.getByRole('textbox', { name: /コメント/ })).toHaveAttribute('readonly');
		});

		it('readOnly が true の場合、入力値を変更できない', async () => {
			const user = userEvent.setup();

			render(
				<Textarea id="comment" label="コメント" defaultValue="変更できないテキスト" readOnly />,
			);

			const textarea = screen.getByRole('textbox', {
				name: /コメント/,
			});

			await user.click(textarea);
			await user.keyboard('追加テキスト');

			expect(textarea).toHaveValue('変更できないテキスト');
		});

		it('readOnly が false の場合、編集不可バッジを表示しない', () => {
			render(<Textarea id="comment" label="コメント" readOnly={false} />);

			expect(screen.queryByText('編集不可')).not.toBeInTheDocument();
		});
	});

	describe('入力値', () => {
		it('defaultValue で初期値を設定できる', () => {
			render(<Textarea id="comment" label="コメント" defaultValue="初期コメント" />);

			expect(screen.getByRole('textbox', { name: 'コメント' })).toHaveValue('初期コメント');
		});

		it('ユーザーの入力を受け付ける', async () => {
			const user = userEvent.setup();

			render(<Textarea id="comment" label="コメント" />);

			const textarea = screen.getByRole('textbox', {
				name: 'コメント',
			});

			await user.type(textarea, 'テストコメント');

			expect(textarea).toHaveValue('テストコメント');
		});

		it('onChange に入力イベントを通知する', async () => {
			const user = userEvent.setup();
			const onChange = vi.fn();

			render(<Textarea id="comment" label="コメント" onChange={onChange} />);

			await user.type(screen.getByRole('textbox', { name: 'コメント' }), 'A');

			expect(onChange).toHaveBeenCalled();
			expect(onChange.mock.calls[0][0].target.value).toBe('A');
		});

		it('controlled component の value を表示する', () => {
			render(<Textarea id="comment" label="コメント" value="確定済みの値" onChange={vi.fn()} />);

			expect(screen.getByRole('textbox', { name: 'コメント' })).toHaveValue('確定済みの値');
		});

		it('controlled component は親から value が更新されるまで表示値を維持する', async () => {
			const user = userEvent.setup();
			const onChange = vi.fn();

			const { rerender } = render(
				<Textarea id="comment" label="コメント" value="変更前" onChange={onChange} />,
			);

			const textarea = screen.getByRole('textbox', {
				name: 'コメント',
			});

			await user.type(textarea, 'A');

			expect(onChange).toHaveBeenCalled();
			expect(textarea).toHaveValue('変更前');

			rerender(<Textarea id="comment" label="コメント" value="変更後" onChange={onChange} />);

			expect(textarea).toHaveValue('変更後');
		});
	});

	describe('props の組み合わせ', () => {
		it('required、description、error を同時に表示する', () => {
			render(
				<Textarea
					id="comment"
					label="コメント"
					required
					description="入力してください"
					error="入力内容に誤りがあります"
				/>,
			);

			expect(screen.getByText('*')).toBeInTheDocument();
			expect(screen.getByText('入力してください')).toBeInTheDocument();
			expect(screen.getByText('入力内容に誤りがあります')).toBeInTheDocument();

			expect(screen.getByRole('textbox', { name: /コメント/ })).toHaveAttribute(
				'aria-invalid',
				'true',
			);
		});

		it('readOnly と description を同時に指定する', () => {
			render(
				<Textarea
					id="comment"
					label="コメント"
					description="この内容は確定しています"
					readOnly
					defaultValue="確定済み"
				/>,
			);

			expect(screen.getByText('この内容は確定しています')).toBeInTheDocument();

			expect(screen.getByText('編集不可')).toBeInTheDocument();

			expect(screen.getByRole('textbox', { name: /コメント/ })).toHaveValue('確定済み');
		});
	});
});
