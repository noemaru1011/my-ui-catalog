import 'i18next';
import type en from './locales/en/translation.json';

// 存在しないキーを書かないためにグローバルで型を定義する。
declare module 'i18next' {
	interface CustomTypeOptions {
		// biome-ignore lint/style/useNamingConvention: i18nextの設定仕様に合わせるため
		defaultNS: 'translation';
		resources: {
			translation: typeof en;
		};
	}
}
