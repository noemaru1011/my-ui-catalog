import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { OPTIONS, OPTIONS_WITH_DISABLED } from '@/components/types/Option.mock';
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

		expect(screen.getByPlaceholderText('選択してください')).toBeInTheDocument();
	});

	it('指定された value に対応する選択肢を表示する', () => {
		render(<Combobox {...defaultProps} value="typescript" />);

		expect(screen.getByRole('combobox', { name: '言語' })).toHaveValue('TypeScript');
	});

	it('value が未指定の場合は未選択状態になる', () => {
		render(<Combobox {...defaultProps} />);

		expect(screen.getByRole('combobox', { name: '言語' })).toHaveValue('');
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
		expect(screen.getByRole('combobox', { name: /言語/ })).toBeDisabled();
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
