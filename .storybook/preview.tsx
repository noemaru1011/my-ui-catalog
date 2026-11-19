import type { Preview } from '@storybook/react-vite';
import '../src/index.css';
import i18n from '../src/i18n';

import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '../src/components/providers/theme-provider';
import { Toaster } from '../src/components/ui/toast';
import { TooltipProvider } from '../src/components/ui/tooltip';

const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

const preview: Preview = {
	beforeAll: async () => {
		await i18n.changeLanguage('ja');
	},
	decorators: [
		(Story) => {
			const queryClient = createTestQueryClient();

			return (
				<QueryClientProvider client={queryClient}>
					<MemoryRouter>
						<ThemeProvider>
							<TooltipProvider delay={100}>
								<Story />
								<Toaster />
							</TooltipProvider>
						</ThemeProvider>
					</MemoryRouter>
				</QueryClientProvider>
			);
		},
	],

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