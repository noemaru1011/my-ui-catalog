
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTranslation } from 'react-i18next';
import { Input } from '../../elements/Input/Input';
import { Container } from './Container';
import { Stack } from '../Stack/Stack';

const meta = {
	component: Container,
	tags: ['autodocs'],
	args: {
		width: 'md',
	},
	argTypes: {
		children: {
			control: false,
		},
	},
	parameters: {
		layout: 'fullscreen',
	},
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const { t } = useTranslation('example');

		return (
			<Container {...args}>
				<Input
					id="default"
					label={t('story.layout.input')}
					placeholder={t('story.layout.inputPlaceholder')}
				/>
			</Container>
		);
	},
};

export const Widths: Story = {
	render: () => (
		<Stack>
			<Container width="xs">
				<Input id="xs" label="xs (320px)" placeholder="max-w-xs" />
			</Container>

			<Container width="sm">
				<Input id="sm" label="sm (384px)" placeholder="max-w-sm" />
			</Container>

			<Container width="md">
				<Input id="md" label="md (448px)" placeholder="max-w-md" />
			</Container>

			<Container width="lg">
				<Input id="lg" label="lg (512px)" placeholder="max-w-lg" />
			</Container>

			<Container width="xl">
				<Input id="xl" label="xl (576px)" placeholder="max-w-xl" />
			</Container>

			<Container width="2xl">
				<Input id="2xl" label="2xl (672px)" placeholder="max-w-2xl" />
			</Container>

			<Container width="3xl">
				<Input id="3xl" label="3xl (768px)" placeholder="max-w-3xl" />
			</Container>

			<Container width="4xl">
				<Input id="4xl" label="4xl (896px)" placeholder="max-w-4xl" />
			</Container>

			<Container width="5xl">
				<Input id="5xl" label="5xl (1024px)" placeholder="max-w-5xl" />
			</Container>

			<Container width="6xl">
				<Input id="6xl" label="6xl (1152px)" placeholder="max-w-6xl" />
			</Container>

			<Container width="7xl">
				<Input id="7xl" label="7xl (1280px)" placeholder="max-w-7xl" />
			</Container>

			<Container width="full">
				<Input id="full" label="full (100%)" placeholder="w-full" />
			</Container>
		</Stack>
	),
};
