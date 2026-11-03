import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from './Link';

const meta = {
	component: Link,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	args: {
		to: '/users',
		label: 'ユーザー一覧',
		size: 'md',
	},
	argTypes: {
		size: {
			control: 'radio',
			options: ['sm', 'md', 'lg'],
		},
	},
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
