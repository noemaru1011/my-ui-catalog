import type { Preview } from '@storybook/react-vite';
import '../src/index.css';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../src/components/providers/theme-provider';
import { Toaster } from '@/components/ui/toast';
import i18n from '../src/i18n';
import '../src/i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

const preview: Preview = {
	decorators: [
		(Story) => {
			const queryClient = createTestQueryClient();

			return (
				<QueryClientProvider client={queryClient}>
					<MemoryRouter>
						<ThemeProvider>
							<Story />
							<Toaster />
						</ThemeProvider>
					</MemoryRouter>
				</QueryClientProvider>
			);
		},
	],

	beforeEach: async () => {
		await i18n.changeLanguage('ja');
	},

	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		a11y: {
			test: 'error',
		},
		options: {
			storySort: {
				method: 'alphabetical',
			},
		},
	},
};

export default preview;