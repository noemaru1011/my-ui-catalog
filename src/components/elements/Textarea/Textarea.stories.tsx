import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta = {
	component: Textarea,
	tags: ['autodocs'],
	args: {
		id: 'textarea',
		label: '名前',
	},
	argTypes: {
		id: {
			control: false,
		}
	}
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
