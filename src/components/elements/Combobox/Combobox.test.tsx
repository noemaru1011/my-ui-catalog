import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { OPTIONS, OPTIONS_WITH_DISABLED } from '@/components/types/Option.mock';
import i18n from '@/i18n';
import { Combobox } from './Combobox';

describe('Combobox', () => {
	const defaultProps = {
		id: 'language',
		label: '言語',
		options: OPTIONS,
	};

	it('ラベルとプレースホルダーを表示する', () => {
		render(<Combobox {...defaultProps} />);

		expect(screen.getByRole('combobox', { name: '言語' })).toBeInTheDocument();

		expect(screen.getByPlaceholderText(i18n.t('common.selectPlaceholder'))).toBeInTheDocument();
	});

	it('id を省略した場合は自動生成した id をラベルに関連付ける', () => {
		render(<Combobox label="言語" options={OPTIONS} />);

		expect(screen.getByRole('combobox', { name: '言語' })).toHaveAttribute('id');
	});

	it('指定された value に対応する選択肢を表示する', () => {
		render(<Combobox {...defaultProps} value="typescript" />);

		expect(screen.getByRole('combobox', { name: '言語' })).toHaveValue('TypeScript');
	});

	it('value が未指定の場合は未選択状態になる', () => {
		render(<Combobox {...defaultProps} />);

		expect(screen.getByRole('combobox', { name: '言語' })).toHaveValue('');
	});

	describe('inputSize', () => {
		it('未指定時は md の高さを適用する', () => {
			render(<Combobox {...defaultProps} />);

			expect(
				screen.getByRole('combobox', { name: '言語' }).closest('[data-slot="input-group"]'),
			).toHaveClass('h-8');
		});

		it.each([
			['sm', 'h-7'],
			['md', 'h-8'],
			['lg', 'h-10'],
		] as const)('inputSize="%s" の場合、入力枠に %s を適用する', (inputSize, expectedClass) => {
			render(<Combobox {...defaultProps} inputSize={inputSize} />);

			expect(
				screen.getByRole('combobox', { name: '言語' }).closest('[data-slot="input-group"]'),
			).toHaveClass(expectedClass);
		});
	});

	it('選択肢を選ぶと onChange に value を渡す', async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();

		render(<Combobox {...defaultProps} onChange={onChange} />);

		await user.click(screen.getByRole('combobox', { name: '言語' }));

		await user.click(await screen.findByRole('option', { name: 'JavaScript' }));

		expect(onChange).toHaveBeenCalledOnce();
		expect(onChange).toHaveBeenCalledWith('javascript');
	});

	it('description が指定された場合に説明文を表示する', () => {
		render(<Combobox {...defaultProps} description="使用する言語を選択してください" />);

		expect(screen.getByText('使用する言語を選択してください')).toBeInTheDocument();
	});

	it('description が未指定の場合は説明文を表示しない', () => {
		render(<Combobox {...defaultProps} />);

		expect(screen.queryByText('使用する言語を選択してください')).not.toBeInTheDocument();
	});

	it('error が指定された場合にエラーと aria-invalid を設定する', () => {
		render(<Combobox {...defaultProps} error="言語を選択してください" />);

		expect(screen.getByText('言語を選択してください')).toBeInTheDocument();

		expect(screen.getByRole('combobox', { name: '言語' })).toHaveAttribute('aria-invalid', 'true');
	});

	it('error が未指定の場合は aria-invalid を false にする', () => {
		render(<Combobox {...defaultProps} />);

		expect(screen.getByRole('combobox', { name: '言語' })).toHaveAttribute('aria-invalid', 'false');
	});

	it('required が true の場合に必須マークを表示する', () => {
		render(<Combobox {...defaultProps} required />);

		const label = screen.getByText('言語').closest('label');

		expect(label).not.toBeNull();

		expect(within(label as HTMLElement).getByText('*')).toBeInTheDocument();
	});

	it('disabled が true の場合は編集不可と表示し入力を無効化する', () => {
		render(<Combobox {...defaultProps} disabled />);

		expect(screen.getByText('編集不可')).toBeInTheDocument();
		const input = screen.getByRole('combobox', { name: /言語/ });
		expect(input).toBeDisabled();

		const inputGroup = input.closest('[data-slot="input-group"]');
		expect(inputGroup).toHaveClass('border-dashed', 'dark:has-disabled:bg-transparent');
		expect(inputGroup).not.toHaveClass('has-disabled:bg-input/50');
	});

	it('disabled が true の場合は選択用の入力操作ができない', async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();

		render(<Combobox {...defaultProps} disabled onChange={onChange} />);

		const input = screen.getByRole('combobox', {
			name: /言語/,
		});
		expect(input).toBeDisabled();

		await user.click(input);

		expect(onChange).not.toHaveBeenCalled();
	});

	it('disabled な選択肢は選択できない', async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();

		render(<Combobox {...defaultProps} options={OPTIONS_WITH_DISABLED} onChange={onChange} />);

		await user.click(screen.getByRole('combobox', { name: '言語' }));

		const rust = await screen.findByRole('option', {
			name: 'Rust',
		});

		expect(rust).toHaveAttribute('aria-disabled', 'true');

		await user.click(rust);

		expect(onChange).not.toHaveBeenCalled();
	});

	it('候補が空の場合に該当項目なしのメッセージを表示する', async () => {
		const user = userEvent.setup();

		render(<Combobox {...defaultProps} options={[]} />);

		await user.click(screen.getByRole('combobox', { name: '言語' }));

		expect(await screen.findByText('該当する項目がありません。')).toBeInTheDocument();
	});

	it('onChange が未指定でも選択操作で例外が発生しない', async () => {
		const user = userEvent.setup();

		render(<Combobox {...defaultProps} />);

		await user.click(screen.getByRole('combobox', { name: '言語' }));

		await user.click(await screen.findByRole('option', { name: 'Python' }));

		expect(screen.getByRole('combobox', { name: '言語' })).toBeInTheDocument();
	});
});
