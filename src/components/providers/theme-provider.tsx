import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};

type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

const INITIAL_STATE: ThemeProviderState = {
	theme: 'system',
	setTheme: () => null,
};

const THEME_PROVIDER_CONTEXT = createContext<ThemeProviderState>(INITIAL_STATE);

export function ThemeProvider({
	children,
	defaultTheme = 'system',
	storageKey = 'vite-ui-theme',
	...props
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(
		() => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
	);

	useEffect(() => {
		const root = window.document.documentElement;

		root.classList.remove('light', 'dark');

		if (theme === 'system') {
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light';

			root.classList.add(systemTheme);
			return;
		}

		root.classList.add(theme);
	}, [theme]);

	const value = {
		theme,
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

// biome-ignore lint/style/useNamingConvention: React hooks must use camelCase
export const useTheme = () => {
	const context = useContext(THEME_PROVIDER_CONTEXT);

	if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');

	return context;
};
