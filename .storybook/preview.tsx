import type { Preview } from '@storybook/react-vite';
import '../src/index.css';
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from '../src/components/providers/theme-provider';
import { Toaster } from "@/components/ui/toast"

const preview: Preview = {
	decorators: [
		(Story) => (
			<MemoryRouter>
				<ThemeProvider>
					<Story />
					<Toaster />
				</ThemeProvider>
			</MemoryRouter>
		),
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