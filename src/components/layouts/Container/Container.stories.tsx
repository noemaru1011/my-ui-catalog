import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '../../elements/Input/Input';
import { Container } from './Container';
import { Stack } from '../Stack/Stack';

const meta = {
	component: Container,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: 'コンテンツの幅を制限するレイアウトコンポーネントです。用途はページの外枠、余白、全体のレイアウト',
			},
		},
	},
	args: {
		width: 'md',
	},
	argTypes: {
		children: {
			control: false,
		},
	}

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
		<Stack>
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

			<Container width="2xl">
				<Input id="2xl" label="2xl" placeholder="w-112" />
			</Container>

			<Container width="3xl">
				<Input id="3xl" label="3xl" placeholder="w-128" />
			</Container>

			<Container width="full">
				<Input id="full" label="full" placeholder="w-full" />
			</Container>
		</Stack>
	),
};
