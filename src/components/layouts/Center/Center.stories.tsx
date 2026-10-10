import type { Meta, StoryObj } from '@storybook/react-vite';
import { Center } from './Center';

const meta = {
	component: Center,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'要素を中央に配置するコンポーネントです。`maxWidth` プロパティでコンテンツの最大幅を指定できます。',
			},
		},
	},
	args: {
		maxWidth: 'lg',
	},
	argTypes: {
		maxWidth: {
			control: 'select',
			options: ['sm', 'md', 'lg', 'xl', 'full'],
			description: 'コンテンツの最大幅',
		},
		children: {
			control: false,
		},
	},
} satisfies Meta<typeof Center>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: <div>コンテンツ</div>,
	},
	render: (args) => <Center {...args} />,
};
