import { useTranslation } from 'react-i18next';
import { Switch } from '@/components/elements/Switch/Switch';
import { useTheme } from '@/components/providers/theme-provider';

export function ThemeSwitch() {
	const { resolvedTheme, setTheme } = useTheme();
	const { t } = useTranslation();

	const isDark = resolvedTheme === 'dark';

	return (
		<Switch
			id="theme-switch"
			aria-label={t('darkModeToggle')}
			label={t(isDark ? 'darkMode' : 'lightMode')}
			labelPosition="left"
			checked={isDark}
			onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
		/>
	);
}
