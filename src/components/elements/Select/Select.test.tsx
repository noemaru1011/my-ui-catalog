import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { OPTIONS, OPTIONS_WITH_DISABLED } from '@/components/types/Option.mock';
import { Select } from './Select';

describe('Select', () => {
	it('id を省略した場合は自動生成した id をラベルに関連付ける', () => {
		render(<Select label="言語" options={OPTIONS} />);

		expect(screen.getByRole('combobox', { name: '言語' })).toHaveAttribute('id');
	});

	it('ラベルとデフォルトのプレースホルダーを表示する', () => {
		render(<Select id="language" label="言語" options={OPTIONS} />);

		expect(screen.getByText('言語')).toBeInTheDocument();
		expect(screen.getByRole('combobox', { name: '言語' })).toHaveTextContent('選択してください');
	});

	describe('inputSize', () => {
		it('未指定時は md の高さを適用する', () => {
			render(<Select id="language" label="言語" options={OPTIONS} />);

			expect(screen.getByRole('combobox')).toHaveAttribute('data-size', 'default');
		});

		it.each([
			['sm', 'sm'],
			['md', 'default'],
			['lg', 'lg'],
		] as const)('inputSize="%s" の場合、対応する高さを設定する', (inputSize, size) => {
			render(<Select id="language" label="言語" options={OPTIONS} inputSize={inputSize} />);

			expect(screen.getByRole('combobox')).toHaveAttribute('data-size', size);
		});
	});

	it('value に対応する label を表示する', () => {
		render(<Select id="language" label="言語" options={OPTIONS} value="typescript" />);

		expect(screen.getByRole('combobox')).toHaveTextContent('TypeScript');
	});

	it('description が指定された場合に説明文を表示する', () => {
		render(
			<Select
				id="language"
				label="言語"
				options={OPTIONS}
				description="使用する言語を選択してください"
			/>,
		);

		expect(screen.getByText('使用する言語を選択してください')).toBeInTheDocument();
	});

	it('description が未指定の場合は説明文を表示しない', () => {
		render(<Select id="language" label="言語" options={OPTIONS} />);

		expect(screen.queryByText('使用する言語を選択してください')).not.toBeInTheDocument();
	});

	it('required が true の場合に必須マークを表示する', () => {
		const { container } = render(<Select id="language" label="言語" options={OPTIONS} required />);

		const label = screen.getByText('言語');
		const requiredMark = container.querySelector<HTMLElement>('span.text-destructive');

		expect(label.parentElement).toContainElement(requiredMark);
		expect(requiredMark).toHaveTextContent('*');
	});

	it('required が未指定の場合は必須マークを表示しない', () => {
		const { container } = render(<Select id="language" label="言語" options={OPTIONS} />);

		expect(container.querySelector('span.text-destructive')).toBeNull();
	});

	it('error が指定された場合にエラーと aria-invalid を表示する', () => {
		render(<Select id="language" label="言語" options={OPTIONS} error="言語を選択してください" />);

		expect(screen.getByText('言語を選択してください')).toBeInTheDocument();
		expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
	});

	it('error が未指定の場合はエラーを表示せず aria-invalid を false にする', () => {
		render(<Select id="language" label="言語" options={OPTIONS} />);

		expect(screen.queryByText('言語を選択してください')).not.toBeInTheDocument();
		expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'false');
	});

	it('disabled が true の場合に編集不可の表示と無効状態を設定する', () => {
		render(<Select id="language" label="言語" options={OPTIONS} disabled />);

		expect(screen.getByText('編集不可')).toBeInTheDocument();

		const trigger = screen.getByRole('combobox');
		expect(trigger).toBeDisabled();
		expect(trigger).toHaveClass(
			'border-dashed',
			'disabled:bg-transparent',
			'dark:disabled:bg-transparent',
		);
	});

	it('disabled が未指定の場合は編集不可の表示を行わない', () => {
		render(<Select id="language" label="言語" options={OPTIONS} />);

		expect(screen.queryByText('編集不可')).not.toBeInTheDocument();
		expect(screen.getByRole('combobox')).toBeEnabled();
	});

	it('クリックするとラベルと選択肢を表示する', async () => {
		const user = userEvent.setup();

		render(<Select id="language" label="言語" options={OPTIONS} />);

		await user.click(screen.getByRole('combobox'));

		const listbox = await screen.findByRole('listbox');

		expect(
			await screen.findByText('言語', { selector: '[data-slot="select-label"]' }),
		).toBeInTheDocument();

		expect(await within(listbox).findByRole('option', { name: 'TypeScript' })).toBeInTheDocument();
		expect(await within(listbox).findByRole('option', { name: 'JavaScript' })).toBeInTheDocument();
		expect(await within(listbox).findByRole('option', { name: 'Python' })).toBeInTheDocument();
	});

	it('選択肢を選ぶと onChange に選択した value を渡す', async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();

		render(<Select id="language" label="言語" options={OPTIONS} onChange={onChange} />);

		await user.click(screen.getByRole('combobox'));
		await user.click(await screen.findByRole('option', { name: 'TypeScript' }));

		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange).toHaveBeenCalledWith('typescript');
	});

	it('onChange が未指定でも選択操作でエラーにならない', async () => {
		const user = userEvent.setup();

		render(<Select id="language" label="言語" options={OPTIONS} />);

		await user.click(screen.getByRole('combobox'));
		await user.click(await screen.findByRole('option', { name: 'JavaScript' }));

		expect(screen.getByRole('combobox')).toBeInTheDocument();
	});

	it('選択肢の disabled が true の場合はその選択肢を無効にする', async () => {
		const user = userEvent.setup();

		render(<Select id="language" label="言語" options={OPTIONS_WITH_DISABLED} />);

		await user.click(screen.getByRole('combobox'));

		expect(
			await screen.findByRole('option', {
				name: 'Rust(非活性は非推奨です。用いる場合は、理由などを記載してください。)',
			}),
		).toHaveAttribute('aria-disabled', 'true');
	});

	it('disabled の選択肢を選んでも onChange を呼び出さない', async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();

		render(
			<Select id="language" label="言語" options={OPTIONS_WITH_DISABLED} onChange={onChange} />,
		);

		await user.click(screen.getByRole('combobox'));

		const disabledOption = await screen.findByRole('option', {
			name: 'Rust(非活性は非推奨です。用いる場合は、理由などを記載してください。)',
		});

		expect(disabledOption).toHaveAttribute('aria-disabled', 'true');

		await user.click(disabledOption);

		expect(onChange).not.toHaveBeenCalled();
	});

	it('disabled の場合はクリックしても選択肢を開かない', async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();

		render(<Select id="language" label="言語" options={OPTIONS} disabled onChange={onChange} />);

		await user.click(screen.getByRole('combobox'));

		expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
		expect(onChange).not.toHaveBeenCalled();
	});

	it('親から value が更新された場合は対応する label に表示を更新する', () => {
		const { rerender } = render(
			<Select id="language" label="言語" options={OPTIONS} value="typescript" />,
		);

		expect(screen.getByRole('combobox')).toHaveTextContent('TypeScript');

		rerender(<Select id="language" label="言語" options={OPTIONS} value="python" />);

		expect(screen.getByRole('combobox')).toHaveTextContent('Python');
	});
});
