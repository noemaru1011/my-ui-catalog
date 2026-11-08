import type { Preview } from '@storybook/react-vite';
import '../src/index.css';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../src/components/providers/theme-provider';
import { Toaster } from '@/components/ui/toast';
import { AppLayout } from '@/components/layouts/AppLayout/AppLayout';
import { Heading } from '@/components/elements/Heading/Heading';
import '../src/i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				// Storybook上でエラー時に何度もリトライして表示が遅くなるのを防ぐ
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
							<AppLayout
								header={
									<div className="border-b px-6 py-4">
										<Heading type="sectionTitle">
											My Application
										</Heading>
									</div>
								}
								main={
									<div className="flex min-h-[calc(100vh-65px)] justify-center p-4">
										<Story />
									</div>
								}
							/>
							<Toaster />
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
