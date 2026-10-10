import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta = {
	component: Textarea,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	args: {
		id: 'textarea',
		label: '名前',
	},
	decorators: [
		(Story) => (
			<div className="w-[200px]">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
