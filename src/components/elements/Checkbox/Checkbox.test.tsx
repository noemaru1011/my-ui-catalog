import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { OPTIONS, OPTIONS_WITH_DISABLED } from '@/components/types/Option.mock';

import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
	it('label と options が表示される', () => {
		render(<Checkbox label="使用言語" options={OPTIONS} value={[]} onChange={vi.fn()} />);

		expect(screen.getByText('使用言語')).toBeInTheDocument();
		expect(screen.getByRole('checkbox', { name: 'TypeScript' })).toBeInTheDocument();
		expect(screen.getByRole('checkbox', { name: 'JavaScript' })).toBeInTheDocument();
		expect(screen.getByRole('checkbox', { name: 'Python' })).toBeInTheDocument();
	});

	it('label に空白が含まれていても選択肢の accessible name が保たれる', () => {
		render(
			<Checkbox
				label="Areas of interest"
				options={[{ label: 'Programming', value: 'programming' }]}
				value={[]}
				onChange={vi.fn()}
			/>,
		);

		expect(screen.getByRole('checkbox', { name: 'Programming' })).toBeInTheDocument();
	});

	it('value に含まれる選択肢がチェック済みになる', () => {
		render(
			<Checkbox
				label="使用言語"
				options={OPTIONS}
				value={['typescript', 'python']}
				onChange={vi.fn()}
			/>,
		);

		expect(screen.getByRole('checkbox', { name: 'TypeScript' })).toBeChecked();
		expect(screen.getByRole('checkbox', { name: 'JavaScript' })).not.toBeChecked();
		expect(screen.getByRole('checkbox', { name: 'Python' })).toBeChecked();
	});

	it('未選択の項目を選択すると onChange に追加後の配列を渡す', async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();

		render(
			<Checkbox label="使用言語" options={OPTIONS} value={['typescript']} onChange={onChange} />,
		);

		await user.click(screen.getByRole('checkbox', { name: 'JavaScript' }));

		expect(onChange).toHaveBeenCalledWith(['typescript', 'javascript']);
	});

	it('選択済みの項目を解除すると onChange に除外後の配列を渡す', async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();

		render(
			<Checkbox
				label="使用言語"
				options={OPTIONS}
				value={['typescript', 'javascript']}
				onChange={onChange}
			/>,
		);

		await user.click(screen.getByRole('checkbox', { name: 'JavaScript' }));

		expect(onChange).toHaveBeenCalledWith(['typescript']);
	});

	it('description が指定された場合に表示する', () => {
		render(
			<Checkbox
				label="使用言語"
				options={OPTIONS}
				value={[]}
				onChange={vi.fn()}
				description="使用する言語を選択してください"
			/>,
		);

		expect(screen.getByText('使用する言語を選択してください')).toBeInTheDocument();
		expect(document.querySelector('fieldset')).toHaveClass('gap-2');
	});

	it('error が指定された場合にエラーを表示する', () => {
		render(
			<Checkbox
				label="使用言語"
				options={OPTIONS}
				value={[]}
				onChange={vi.fn()}
				error="1つ以上選択してください"
			/>,
		);

		expect(screen.getByText('1つ以上選択してください')).toBeInTheDocument();

		expect(document.querySelector('fieldset')).toHaveAttribute('data-invalid', 'true');
		expect(screen.getByText('使用言語', { selector: 'legend' })).toHaveClass(
			'text-destructive',
			'mb-0',
		);
		expect(document.querySelector('fieldset')).toHaveClass('gap-2');

		for (const option of OPTIONS) {
			expect(screen.getByRole('checkbox', { name: option.label })).toHaveAttribute(
				'aria-invalid',
				'true',
			);
		}
	});

	it('error が未指定の場合、legend を通常の文字色で表示する', () => {
		render(<Checkbox label="使用言語" options={OPTIONS} value={[]} onChange={vi.fn()} />);

		expect(screen.getByText('使用言語', { selector: 'legend' })).not.toHaveClass(
			'text-destructive',
		);
	});

	it('required が true の場合に必須マークを表示する', () => {
		render(<Checkbox label="使用言語" options={OPTIONS} value={[]} onChange={vi.fn()} required />);

		expect(screen.getByText('*')).toBeInTheDocument();
	});

	it('disabled が true の場合はすべての項目を無効にする', () => {
		render(<Checkbox label="使用言語" options={OPTIONS} value={[]} onChange={vi.fn()} disabled />);

		expect(screen.getByText('編集不可')).toBeInTheDocument();

		for (const option of OPTIONS) {
			expect(screen.getByRole('checkbox', { name: option.label })).toHaveAttribute(
				'aria-disabled',
				'true',
			);
		}
	});

	it('option.disabled が true の項目だけを無効にする', () => {
		render(
			<Checkbox label="使用言語" options={OPTIONS_WITH_DISABLED} value={[]} onChange={vi.fn()} />,
		);

		expect(screen.getByRole('checkbox', { name: 'TypeScript' })).not.toHaveAttribute(
			'aria-disabled',
			'true',
		);

		expect(screen.getByRole('checkbox', { name: 'Rust' })).toHaveAttribute('aria-disabled', 'true');
		expect(screen.queryByText('編集不可')).not.toBeInTheDocument();
	});

	it('disabled の項目をクリックしても onChange は呼ばれない', async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();

		render(
			<Checkbox
				label="使用言語"
				options={[
					{
						label: 'TypeScript',
						value: 'typescript',
						disabled: true,
					},
				]}
				value={[]}
				onChange={onChange}
			/>,
		);

		await user.click(screen.getByRole('checkbox', { name: 'TypeScript' }));

		expect(onChange).not.toHaveBeenCalled();
	});
});
