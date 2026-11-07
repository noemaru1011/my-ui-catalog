import type { Meta, StoryObj } from '@storybook/react-vite';
import ThemeSwitch from './ThemeSwitch';

const meta = {
	component: ThemeSwitch,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof ThemeSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};