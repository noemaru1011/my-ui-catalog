import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { OPTIONS, OPTIONS_WITH_DISABLED } from '@/components/types/Option.mock';
import { ComboboxMultiple } from './ComboboxMultiple';

const DEFAULT_PROPS = {
	id: 'roles',
	label: '権限',
	options: OPTIONS,
};

function renderCombobox(props: Partial<React.ComponentProps<typeof ComboboxMultiple>> = {}) {
	return render(<ComboboxMultiple {...DEFAULT_PROPS} {...props} />);
}

describe('ComboboxMultiple', () => {
	describe('表示', () => {
		it('ラベルとデフォルトのプレースホルダーを表示する', () => {
			renderCombobox();

			expect(screen.getByText('権限')).toBeInTheDocument();
			expect(screen.getByRole('combobox', { name: '権限' })).toHaveAttribute(
				'placeholder',
				'選択してください',
			);
		});

		it('指定したプレースホルダーを表示する', () => {
			renderCombobox({ placeholder: '言語を選択' });

			expect(screen.getByRole('combobox', { name: '権限' })).toHaveAttribute(
				'placeholder',
				'言語を選択',
			);
		});

		it('必須の場合に必須マークを表示する', () => {
			const { container } = renderCombobox({ required: true });

			expect(screen.getByText('権限')).toBeInTheDocument();
			expect(container.querySelector('.text-destructive')).toBeInTheDocument();
		});

		it('必須でない場合は必須マークを表示しない', () => {
			const { container } = renderCombobox();

			expect(container.querySelector('.text-destructive')).not.toBeInTheDocument();
		});

		it('説明文を表示する', () => {
			renderCombobox({
				description: '複数の言語を選択できます。',
			});

			expect(screen.getByText('複数の言語を選択できます。')).toBeInTheDocument();
		});

		it('説明文が未指定の場合は表示しない', () => {
			renderCombobox();

			expect(screen.queryByText('複数の言語を選択できます。')).not.toBeInTheDocument();
		});

		it('エラーを表示し、Fieldをエラー状態にする', () => {
			renderCombobox({ error: '言語を選択してください。' });

			expect(screen.getByText('言語を選択してください。')).toBeInTheDocument();

			expect(screen.getByRole('combobox', { name: '権限' })).toHaveAttribute(
				'aria-invalid',
				'true',
			);

			expect(
				screen.getByText('言語を選択してください。').closest('[data-invalid]'),
			).toHaveAttribute('data-invalid', 'true');
		});

		it('エラーが未指定の場合は入力をエラー状態にしない', () => {
			renderCombobox();

			expect(screen.getByRole('combobox', { name: '権限' })).toHaveAttribute(
				'aria-invalid',
				'false',
			);
		});

		it('disabledの場合は「編集不可」を表示する', () => {
			renderCombobox({ disabled: true });

			expect(screen.getByText('編集不可')).toBeInTheDocument();
		});

		it('disabledでない場合は「編集不可」を表示しない', () => {
			renderCombobox();

			expect(screen.queryByText('編集不可')).not.toBeInTheDocument();
		});
	});

	describe('選択済みの値', () => {
		it('valueに対応する選択済み項目を表示する', () => {
			renderCombobox({ value: ['typescript', 'python'] });

			expect(screen.getByText('TypeScript')).toBeInTheDocument();
			expect(screen.getByText('Python')).toBeInTheDocument();
		});

		it('valueが空配列の場合は選択済み項目を表示しない', () => {
			renderCombobox({ value: [] });

			expect(screen.queryByText('TypeScript')).not.toBeInTheDocument();
			expect(screen.queryByText('JavaScript')).not.toBeInTheDocument();
			expect(screen.queryByText('Python')).not.toBeInTheDocument();
		});

		it('valueが未指定の場合は空配列として扱う', () => {
			renderCombobox();

			expect(screen.getByRole('combobox', { name: '権限' })).toHaveAttribute(
				'placeholder',
				'選択してください',
			);
		});

		it('optionsに存在しないvalueは選択済み項目として表示しない', () => {
			renderCombobox({ value: ['unknown'] });

			expect(screen.queryByText('unknown')).not.toBeInTheDocument();
		});

		it('選択済みの値がある場合はプレースホルダーを表示しない', () => {
			renderCombobox({ value: ['typescript'] });

			expect(screen.getByRole('combobox', { name: '権限' })).not.toHaveAttribute(
				'placeholder',
				'選択してください',
			);
		});
	});

	describe('選択操作', () => {
		it('項目を選択するとonChangeにvalueの配列を渡す', async () => {
			const user = userEvent.setup();
			const onChange = vi.fn();

			renderCombobox({ onChange });

			await user.click(screen.getByRole('combobox', { name: '権限' }));

			await user.click(await screen.findByRole('option', { name: 'TypeScript' }));

			expect(onChange).toHaveBeenCalledWith(['typescript']);
		});

		it('既存の選択値に項目を追加すると全選択値を渡す', async () => {
			const user = userEvent.setup();
			const onChange = vi.fn();

			renderCombobox({
				value: ['typescript'],
				onChange,
			});

			await user.click(screen.getByRole('combobox', { name: '権限' }));

			await user.click(await screen.findByRole('option', { name: 'JavaScript' }));

			expect(onChange).toHaveBeenCalledWith(['typescript', 'javascript']);
		});

		it('onChangeが未指定でも項目を選択できる', async () => {
			const user = userEvent.setup();

			renderCombobox();

			await user.click(screen.getByRole('combobox', { name: '権限' }));

			await user.click(await screen.findByRole('option', { name: 'TypeScript' }));

			expect(screen.getByRole('combobox')).toBeInTheDocument();
		});

		it('disabledの項目は選択できずonChangeを呼び出さない', async () => {
			const user = userEvent.setup();
			const onChange = vi.fn();

			renderCombobox({
				options: OPTIONS_WITH_DISABLED,
				onChange,
			});

			await user.click(screen.getByRole('combobox', { name: '権限' }));

			const disabledOption = await screen.findByRole('option', {
				name: 'Rust',
			});

			expect(disabledOption).toHaveAttribute('aria-disabled', 'true');

			await user.click(disabledOption);

			expect(onChange).not.toHaveBeenCalled();
		});
	});

	describe('検索と候補表示', () => {
		it('入力に応じて候補を絞り込める', async () => {
			const user = userEvent.setup();

			renderCombobox();

			await user.type(screen.getByRole('combobox', { name: '権限' }), 'TypeScript');

			expect(await screen.findByRole('option', { name: 'TypeScript' })).toBeInTheDocument();

			expect(screen.queryByRole('option', { name: 'JavaScript' })).not.toBeInTheDocument();
		});

		it('該当する候補がない場合は空状態のメッセージを表示する', async () => {
			const user = userEvent.setup();

			renderCombobox();

			await user.type(screen.getByRole('combobox', { name: '権限' }), '存在しない言語');

			expect(await screen.findByText('該当する項目がありません。')).toBeInTheDocument();
		});

		it('候補を開くとoptionsの項目を表示する', async () => {
			const user = userEvent.setup();

			renderCombobox();

			await user.click(screen.getByRole('combobox', { name: '権限' }));

			const listbox = await screen.findByRole('listbox');

			expect(within(listbox).getByRole('option', { name: 'TypeScript' })).toBeInTheDocument();

			expect(within(listbox).getByRole('option', { name: 'JavaScript' })).toBeInTheDocument();

			expect(within(listbox).getByRole('option', { name: 'Python' })).toBeInTheDocument();
		});
	});

	describe('disabled状態', () => {
		it('disabledの場合は入力を無効化する', () => {
			renderCombobox({ disabled: true });

			expect(screen.getByRole('combobox', { name: '権限編集不可' })).toBeDisabled();
		});

		it('disabledの場合は候補を開けずonChangeも呼び出さない', async () => {
			const user = userEvent.setup();
			const onChange = vi.fn();

			renderCombobox({ disabled: true, onChange });

			const input = screen.getByRole('combobox', {
				name: '権限編集不可',
			});

			await user.click(input);

			expect(input).toBeDisabled();
			expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
			expect(onChange).not.toHaveBeenCalled();
		});
	});

	describe('controlled component', () => {
		it('onChangeの呼び出しだけではvalueの表示は変わらない', async () => {
			const user = userEvent.setup();
			const onChange = vi.fn();

			const { rerender } = renderCombobox({
				value: [],
				onChange,
			});

			await user.click(screen.getByRole('combobox', { name: '権限' }));

			await user.click(await screen.findByRole('option', { name: 'TypeScript' }));

			expect(onChange).toHaveBeenCalledWith(['typescript']);

			// 候補リスト内には表示されていても、選択済みチップには追加されない。
			expect(document.querySelector('[data-slot="combobox-chip"]')).not.toBeInTheDocument();

			rerender(<ComboboxMultiple {...DEFAULT_PROPS} value={['typescript']} onChange={onChange} />);

			expect(document.querySelector('[data-slot="combobox-chip"]')).toHaveTextContent('TypeScript');
		});
	});
});
