import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta = {
	component: Input,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	args: {
		id: 'input',
		label: '名前',
	},
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
