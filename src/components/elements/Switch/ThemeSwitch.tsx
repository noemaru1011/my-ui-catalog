import { Switch } from '@/components/elements/Switch/Switch';
import { useTheme } from '@/components/providers/theme-provider';

export default function ThemeSwitch() {
	const { resolvedTheme, setTheme } = useTheme();

	const isDark = resolvedTheme === 'dark';

	return (
		<Switch
			id="theme-switch"
			aria-label="ダークモード切り替え"
			label={isDark ? 'ダークモード' : 'ライトモード'}
			labelPosition="left"
			checked={isDark}
			onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
		/>
	);
}
