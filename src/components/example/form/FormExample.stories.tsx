import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import FormExamplePage from './pages/FormExamplePage';


const meta = {
	title: 'Example/FormExample',
	component: FormExamplePage,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		),
	],
} satisfies Meta<typeof FormExamplePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};