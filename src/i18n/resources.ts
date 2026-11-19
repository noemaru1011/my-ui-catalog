import enCommon from './locales/en/common.json';
import enError from './locales/en/error.json';
import enExample from './locales/en/example.json';

import jaCommon from './locales/ja/common.json';
import jaError from './locales/ja/error.json';
import jaExample from './locales/ja/example.json';

// biome-ignore lint/style/useNamingConvention: i18nextのリソース設定名として使用するため
export const resources = {
	ja: {
		common: jaCommon,
		error: jaError,
		example: jaExample,
	},
	en: {
		common: enCommon,
		error: enError,
		example: enExample,
	},
} as const;
