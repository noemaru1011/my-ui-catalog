import { defineConfig, devices } from 'playwright/test';

export default defineConfig({
	testDir: './e2e',
	reporter: 'list',
	expect: {
		timeout: 15_000,
	},
	use: {
		// biome-ignore lint/style/useNamingConvention: Playwright requires this option name.
		baseURL: 'http://127.0.0.1:6006',
		trace: 'retain-on-failure',
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
	webServer: {
		command: 'npm run storybook -- --ci --no-open',
		url: 'http://127.0.0.1:6006/iframe.html',
		reuseExistingServer: !process.env.CI,
		timeout: 120_000,
	},
});
