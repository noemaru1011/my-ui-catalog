import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { ThemeSwitch } from './ThemeSwitch';

describe('ThemeSwitch', () => {
	beforeEach(() => {
		localStorage.clear();
		document.documentElement.classList.remove('light', 'dark');
	});

	afterEach(() => {
		cleanup();
		localStorage.clear();
		document.documentElement.classList.remove('light', 'dark');
	});

	const renderThemeToggle = (defaultTheme: 'light' | 'dark' | 'system' = 'light') => {
		return render(
			<ThemeProvider defaultTheme={defaultTheme}>
				<ThemeSwitch />
			</ThemeProvider>,
		);
	};

	it('ライトモードの場合、ライトモードと表示されること', () => {
		renderThemeToggle('light');

		expect(screen.getByText('ライトモード')).toBeInTheDocument();

		expect(screen.getByRole('switch', { name: 'ダークモード切り替え' })).not.toBeChecked();
	});

	it('ダークモードの場合、ダークモードと表示されること', () => {
		renderThemeToggle('dark');

		expect(screen.getByText('ダークモード')).toBeInTheDocument();

		expect(screen.getByRole('switch', { name: 'ダークモード切り替え' })).toBeChecked();
	});

	it('スイッチをONにするとダークモードに切り替わること', async () => {
		const user = userEvent.setup();

		renderThemeToggle('light');

		const toggle = screen.getByRole('switch', {
			name: 'ダークモード切り替え',
		});

		await user.click(toggle);

		expect(toggle).toBeChecked();
		expect(screen.getByText('ダークモード')).toBeInTheDocument();

		await waitFor(() => {
			expect(document.documentElement).toHaveClass('dark');
		});

		expect(localStorage.getItem('vite-ui-theme')).toBe('dark');
	});

	it('スイッチをOFFにするとライトモードに切り替わること', async () => {
		const user = userEvent.setup();

		renderThemeToggle('dark');

		const toggle = screen.getByRole('switch', {
			name: 'ダークモード切り替え',
		});

		await user.click(toggle);

		expect(toggle).not.toBeChecked();
		expect(screen.getByText('ライトモード')).toBeInTheDocument();

		await waitFor(() => {
			expect(document.documentElement).toHaveClass('light');
		});

		expect(localStorage.getItem('vite-ui-theme')).toBe('light');
	});
});
