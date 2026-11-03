import type { Meta, StoryObj } from '@storybook/react-vite';
import FormExamplePage from './pages/FormExamplePage';


const meta = {
	title: 'Example/FormExample',
	component: FormExamplePage,
	tags: ['autodocs'],
} satisfies Meta<typeof FormExamplePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};