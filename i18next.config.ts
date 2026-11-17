import { defineConfig } from 'i18next-cli';

export default defineConfig({
	locales: ['en', 'ja'],

	extract: {
		// biome-ignore lint/style/useNamingConvention: i18nextの設定仕様に合わせる
		defaultNS: 'common',

		// 解析対象
		input: ['src/**/*.{ts,tsx,js,jsx}'],

		// 翻訳ファイルの場所
		output: 'src/i18n/locales/{{language}}/{{namespace}}.json',
	},
});
