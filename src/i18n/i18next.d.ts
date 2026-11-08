import 'i18next';
import en from './locales/en/translation.json';

// 存在しないキーを書かないため
declare module 'i18next' {
	interface CustomTypeOptions {
		// biome-ignore lint/style/useNamingConvention: i18nextの設定仕様に合わせるため
		defaultNS: 'translation';
		resources: {
			translation: typeof en;
		};
	}
}
