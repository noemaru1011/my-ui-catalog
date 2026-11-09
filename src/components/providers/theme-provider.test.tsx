import { act, render, renderHook, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ThemeProvider, useTheme } from './theme-provider';

function ThemeProbe() {
	const { theme, resolvedTheme, setTheme } = useTheme();

	return (
		<button type="button" onClick={() => setTheme('light')}>
			{theme}:{resolvedTheme}
		</button>
	);
}

describe('ThemeProvider', () => {
	afterEach(() => {
		localStorage.clear();
		document.documentElement.classList.remove('light', 'dark');
		vi.restoreAllMocks();
	});

	it('Provider 外から使うとエラーを投げる', () => {
		expect(() => renderHook(() => useTheme())).toThrow(
			'useTheme must be used within a ThemeProvider',
		);
	});

	it('保存済みテーマを defaultTheme より優先する', async () => {
		localStorage.setItem('custom-theme', 'dark');

		render(
			<ThemeProvider defaultTheme="light" storageKey="custom-theme">
				<ThemeProbe />
			</ThemeProvider>,
		);

		await waitFor(() => {
			expect(document.documentElement).toHaveClass('dark');
		});
		expect(screen.getByRole('button')).toHaveTextContent('dark:dark');
	});

	it('システムテーマの変更に追従し、購読を解除する', async () => {
		let prefersDark = true;
		let listener: ((event: MediaQueryListEvent) => void) | undefined;
		const removeEventListener = vi.fn();
		const mediaQuery = {
			get matches() {
				return prefersDark;
			},
			addEventListener: vi.fn((_type: string, callback: (event: MediaQueryListEvent) => void) => {
				listener = callback;
			}),
			removeEventListener,
		} as unknown as MediaQueryList;
		vi.spyOn(window, 'matchMedia').mockReturnValue(mediaQuery);

		const { unmount } = render(
			<ThemeProvider defaultTheme="system">
				<ThemeProbe />
			</ThemeProvider>,
		);

		await waitFor(() => {
			expect(document.documentElement).toHaveClass('dark');
		});
		expect(screen.getByRole('button')).toHaveTextContent('system:dark');

		prefersDark = false;
		act(() => listener?.({ matches: false } as MediaQueryListEvent));
		await waitFor(() => {
			expect(document.documentElement).toHaveClass('light');
		});
		expect(screen.getByRole('button')).toHaveTextContent('system:light');

		unmount();
		expect(removeEventListener).toHaveBeenCalledWith('change', listener);
	});
});
