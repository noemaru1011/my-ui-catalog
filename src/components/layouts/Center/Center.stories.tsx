import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTranslation } from 'react-i18next';
import { Center } from './Center';
import { Heading } from '@/components/elements/Heading/Heading';

const meta = {
	component: Center,
	tags: ['autodocs'],
	argTypes: {
		children: {
			control: false,
		},
	},
	parameters: {
		layout: 'fullscreen',
	},
} satisfies Meta<typeof Center>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: null,
	},
	render: (args) => {
		const { t } = useTranslation('example');
		return (
			<Center {...args}>
				<Heading type="blockTitle">
					{t('story.layout.contentArea')}
				</Heading>
			</Center>
		);
	},
};

export const MinHeight: Story = {
	args: {
		children: null,
		minHeight: true
	},
	render: (args) => {
		const { t } = useTranslation('example');
		return (
			<Center {...args}>
				<Heading type="blockTitle">
					{t('story.layout.contentArea')}
				</Heading>
			</Center>
		);
	},
};