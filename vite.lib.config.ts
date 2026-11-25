import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, esmExternalRequirePlugin } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),

		esmExternalRequirePlugin({
			external: [
				'react',
				'react-dom',
				'react/jsx-runtime',
				'i18next',
				'react-i18next',
				'react-router',
				'react-router-dom',
				'use-sync-external-store',
				'use-sync-external-store/shim',
				'use-sync-external-store/shim/with-selector',
			],
		}),

		dts({
			tsconfigPath: './tsconfig.app.json',
			include: ['src/**/*.ts', 'src/**/*.tsx'],
			exclude: [
				'src/**/*.stories.tsx',
				'src/**/*.test.ts',
				'src/**/*.test.tsx',
				'src/test/**',
				'src/components/example/**',
				'src/**/*.mock.ts',
				'src/**/*.mock.tsx',
			],
		}),
	],

	resolve: {
		alias: {
			'@': path.resolve(import.meta.dirname, './src'),
		},
		dedupe: ['react', 'react-dom'],
	},

	build: {
		lib: {
			entry: path.resolve(import.meta.dirname, 'src/index.ts'),
			formats: ['es'],
			fileName: 'index',
			cssFileName: 'style',
		},

		rolldownOptions: {
			external: [
				// esmExternalRequirePlugin 側に移したため、ここには重複指定しない
			],
		},

		outDir: 'dist',
		emptyOutDir: true,
	},
});
