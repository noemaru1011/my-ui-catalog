import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { OPTIONS, OPTIONS_WITH_DISABLED } from '@/components/types/Option.mock';
import i18n from '@/i18n';
import { Radio } from './Radio';

describe('Radio', () => {
	it('ラベルと選択肢を表示する', () => {
		render(<Radio label="言語" options={OPTIONS} />);

		expect(screen.getByText('言語')).toBeInTheDocument();
		expect(screen.getByRole('radio', { name: 'TypeScript' })).toBeInTheDocument();
		expect(screen.getByRole('radio', { name: 'JavaScript' })).toBeInTheDocument();
		expect(screen.getByRole('radio', { name: 'Python' })).toBeInTheDocument();
	});

	it('valueで指定した選択肢を選択状態にする', () => {
		render(<Radio label="言語" options={OPTIONS} value="typescript" />);

		expect(screen.getByRole('radio', { name: 'TypeScript' })).toBeChecked();
		expect(screen.getByRole('radio', { name: 'JavaScript' })).not.toBeChecked();
	});

	it('選択肢を変更するとonChangeを呼び出す', async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();

		render(<Radio label="言語" options={OPTIONS} onChange={onChange} />);

		await user.click(screen.getByRole('radio', { name: 'JavaScript' }));

		expect(onChange).toHaveBeenCalled();
		expect(onChange.mock.calls[0][0]).toBe('javascript');
	});

	it('requiredがtrueの場合、必須マークを表示する', () => {
		render(<Radio label="言語" options={OPTIONS} required />);

		expect(screen.getByText('*')).toBeInTheDocument();
	});

	it('descriptionとerrorを表示する', () => {
		render(
			<Radio
				label="言語"
				options={OPTIONS}
				description="使用する言語を選択してください"
				error="言語を選択してください"
			/>,
		);

		expect(screen.getByText('使用する言語を選択してください')).toBeInTheDocument();
		expect(screen.getByText('言語を選択してください')).toBeInTheDocument();
		expect(screen.getByText('言語', { selector: 'legend' })).toHaveClass(
			'text-destructive',
			'mb-0',
		);
		expect(document.querySelector('fieldset')).toHaveClass(
			'gap-2',
			'has-[>[data-slot=radio-group]]:gap-2',
		);
		// エラー状態がグループに反映されることを確認
		expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-invalid', 'true');
	});

	it('errorがない場合、legendを通常の文字色で表示する', () => {
		render(<Radio label="言語" options={OPTIONS} />);

		expect(screen.getByText('言語', { selector: 'legend' })).not.toHaveClass('text-destructive');
	});

	it('disabledがtrueの場合、すべての選択肢を無効にする', () => {
		render(<Radio label="言語" options={OPTIONS} disabled />);

		expect(screen.getByText(i18n.t('common.disabled'))).toBeInTheDocument();

		expect(screen.getByRole('radio', { name: 'TypeScript' })).toHaveAttribute(
			'aria-disabled',
			'true',
		);
		expect(screen.getByRole('radio', { name: 'JavaScript' })).toHaveAttribute(
			'aria-disabled',
			'true',
		);
		expect(screen.getByRole('radio', { name: 'Python' })).toHaveAttribute('aria-disabled', 'true');
	});

	it('disabledが設定された選択肢だけを無効にする', () => {
		render(<Radio label="言語" options={OPTIONS_WITH_DISABLED} />);

		expect(screen.queryByText('編集不可')).not.toBeInTheDocument();

		expect(screen.getByRole('radio', { name: 'Rust' })).toHaveAttribute('aria-disabled', 'true');
		expect(screen.getByRole('radio', { name: 'TypeScript' })).not.toHaveAttribute(
			'aria-disabled',
			'true',
		);
	});
});
