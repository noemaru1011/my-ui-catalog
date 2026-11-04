import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from './Stack';

const meta = {
	component: Stack,
	tags: ['autodocs'],
	args: {
		space: 'md',
		as: 'div',
	},
	argTypes: {
		as: {
			control: 'select',
			options: ['div', 'section', 'form', 'article', 'aside', 'main', 'nav', 'ul'],
		},
		children: {
			control: false,
		},
	},
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => (
		<div className="w-80">
			<Stack {...args}>
				<div className="rounded-md border p-4">コンテンツ 1</div>
				<div className="rounded-md border p-4">コンテンツ 2</div>
				<div className="rounded-md border p-4">コンテンツ 3</div>
			</Stack>
		</div>
	),
};
