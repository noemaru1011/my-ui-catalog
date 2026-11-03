import { Cluster } from '@/components/layouts/Cluster/Cluster';
import { useTheme } from '@/components/providers/theme-provider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	const isDark = theme === 'dark';

	return (
		<Cluster space="sm">
			<Label htmlFor="theme-switch">{isDark ? 'ダークモード' : 'ライトモード'}</Label>

			<Switch
				id="theme-switch"
				checked={isDark}
				onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
				aria-label="ダークモード切り替え"
			/>
		</Cluster>
	);
}
