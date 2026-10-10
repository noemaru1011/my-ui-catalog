import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';

import FormExamplePage from './pages/FormExamplePage';
import formExampleSource from './pages/FormExamplePage.tsx?raw';

const meta = {
	title: 'Pages/FormExamplePage',
	component: FormExamplePage,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		),
	],
	parameters: {
		docs: {
			source: {
				code: formExampleSource,
			},
		},
	},
} satisfies Meta<typeof FormExamplePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};