import type { Meta, StoryObj } from '@storybook/react-vite';
import { PasswordInput } from './PasswordInput';

const meta = {
	component: PasswordInput,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	args: {
		id: 'password',
		label: 'パスワード',
	},
} satisfies Meta<typeof PasswordInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
