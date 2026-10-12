import type { Meta, StoryObj } from '@storybook/react-vite';
import { Center } from './Center';
import { Container } from '@/components/layouts/Container/Container';
import { Heading } from '@/components/elements/Heading/Heading';
import { Text } from '@/components/elements/Text/Text';

const meta = {
	component: Center,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'コンテンツを水平方向の中央に配置するコンポーネントです。用途はコンテンツの最大幅と中央寄せ',
			},
		},
	},
	args: {
		maxWidth: 'lg',
	},
	argTypes: {
		children: {
			control: false,
		},
	},
} satisfies Meta<typeof Center>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: (
			<div className="min-h-64 border-2 border-dashed border-blue-500 bg-blue-50 p-6">
				<Heading type="blockTitle">
					コンテンツ領域
				</Heading>
				<Text>
					maxWidth: lg
				</Text>
				<Text>
					この領域は画面の中央に配置され、最大幅は lg に制限されます。
				</Text>
			</div>
		),
	},
	render: (args) => (
		<Container width="full">
			<div className="min-h-screen bg-gray-100 px-4 py-8">
				<Center {...args} />
			</div>
		</Container>
	),
};