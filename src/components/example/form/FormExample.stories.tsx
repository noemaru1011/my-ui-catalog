import type { Meta, StoryObj } from '@storybook/react-vite';
import FormExamplePage from './pages/FormExamplePage';

const meta = {
	component: FormExamplePage,
	tags: ['autodocs'],
} satisfies Meta<typeof FormExamplePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};