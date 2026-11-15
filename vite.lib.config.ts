import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
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

		rollupOptions: {
			external: ['react', 'react-dom', 'react/jsx-runtime'],
		},

		outDir: 'dist',
		emptyOutDir: true,
	},
});
