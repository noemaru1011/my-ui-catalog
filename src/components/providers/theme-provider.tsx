import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';
type ResolvedTheme = 'dark' | 'light';

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};

type ThemeProviderState = {
	theme: Theme;
	resolvedTheme: ResolvedTheme;
	setTheme: (theme: Theme) => void;
};

const THEME_PROVIDER_CONTEXT = createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({
	children,
	defaultTheme = 'system',
	storageKey = 'vite-ui-theme',
	...props
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(
		() => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
	);

	const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');

	useEffect(() => {
		const root = window.document.documentElement;

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		const applyTheme = () => {
			const systemTheme = mediaQuery.matches ? 'dark' : 'light';
			const activeTheme = theme === 'system' ? systemTheme : theme;

			root.classList.remove('light', 'dark');
			root.classList.add(activeTheme);

			setResolvedTheme(activeTheme);
		};

		applyTheme();

		// システムテーマの変更にも追従
		mediaQuery.addEventListener('change', applyTheme);

		return () => {
			mediaQuery.removeEventListener('change', applyTheme);
		};
	}, [theme]);

	const value = {
		theme,
		resolvedTheme,
		setTheme: (theme: Theme) => {
			localStorage.setItem(storageKey, theme);
			setTheme(theme);
		},
	};

	return (
		<THEME_PROVIDER_CONTEXT.Provider {...props} value={value}>
			{children}
		</THEME_PROVIDER_CONTEXT.Provider>
	);
}

export function useTheme() {
	const context = useContext(THEME_PROVIDER_CONTEXT);

	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}

	return context;
}
