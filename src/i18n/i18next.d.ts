import 'i18next';

import type common from './locales/ja/common.json';
import type error from './locales/ja/error.json';
import type example from './locales/ja/example.json';

// 存在しない翻訳キーを書かないためにグローバルで型を定義する。
declare module 'i18next' {
	interface CustomTypeOptions {
		// biome-ignore lint/style/useNamingConvention: i18nextの設定仕様に合わせるため
		defaultNS: 'common';

		resources: {
			common: typeof common;
			error: typeof error;
			example: typeof example;
		};
	}
}
