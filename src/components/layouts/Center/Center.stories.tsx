import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTranslation } from 'react-i18next';
import { Center } from './Center';
import { Container } from '@/components/layouts/Container/Container';
import { Heading } from '@/components/elements/Heading/Heading';
import { Text } from '@/components/elements/Text/Text';

const meta = {
	component: Center,
	tags: ['autodocs'],
	argTypes: {
		children: {
			control: false,
		},
		maxWidth: {
			control: {
				type: 'select',
				options: ['sm', 'md', 'lg', 'xl', 'full'],
			},
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
		maxWidth: 'lg',
		children: null,
	},
	render: (args) => {
		const { t } = useTranslation();
		return (
			<Container width="full">
				<Center {...args}>
					<div className="min-h-64 border-2 border-dashed border-blue-500 p-6">
						<Heading type="blockTitle">
							{t('example.story.layout.contentArea')}
						</Heading>
						<Text>maxWidth: {args.maxWidth}</Text>
						<Text>
							{t('example.story.layout.centerDescription', {
								maxWidth: args.maxWidth,
							})}
						</Text>
					</div>
				</Center>
			</Container>
		);
	},
};