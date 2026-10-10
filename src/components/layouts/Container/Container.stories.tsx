import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '../../elements/Input/Input';
import { Container } from './Container';

const meta = {
	component: Container,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'コンテンツの幅を制限するレイアウトコンポーネントです。',
			},
		},
	},
	args: {
		width: 'md',
	},
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => (
		<Container {...args}>
			<Input id="default" label="入力項目" placeholder="入力してください" />
		</Container>
	),
};

export const Widths: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<Container width="sm">
				<Input id="sm" label="sm" placeholder="w-64" />
			</Container>

			<Container width="md">
				<Input id="md" label="md" placeholder="w-72" />
			</Container>

			<Container width="lg">
				<Input id="lg" label="lg" placeholder="w-80" />
			</Container>

			<Container width="xl">
				<Input id="xl" label="xl" placeholder="w-96" />
			</Container>

			<Container width="full">
				<Input id="full" label="full" placeholder="w-full" />
			</Container>
		</div>
	),
};
