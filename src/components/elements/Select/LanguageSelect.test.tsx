import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { LanguageSelect } from './LanguageSelect';

describe('LanguageSelect', () => {
	it.each([
		['日本語', 'ja'],
		['English', 'en'],
	] as const)('選択した %s の言語コードを通知する', async (optionLabel, language) => {
		const user = userEvent.setup();
		const onChange = vi.fn();

		render(<LanguageSelect onChange={onChange} />);
		await user.click(screen.getByRole('combobox', { name: '表示言語' }));
		await user.click(await screen.findByRole('option', { name: optionLabel }));

		expect(onChange).toHaveBeenCalledWith(language);
	});

	it('onChange が未指定でも選択できる', async () => {
		const user = userEvent.setup();

		render(<LanguageSelect />);
		await user.click(screen.getByRole('combobox', { name: '表示言語' }));
		await user.click(await screen.findByRole('option', { name: 'English' }));

		expect(screen.getByRole('combobox', { name: '表示言語' })).toBeInTheDocument();
	});
});
