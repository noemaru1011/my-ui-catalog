import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTranslation } from 'react-i18next';
import { Text } from '../Text/Text';
import { List, ListItem } from './List';

const meta = {
	component: List,
	tags: ['autodocs'],
	args: {
		variant: 'disc',
	},
	argTypes: {
		children: {
			control: false,
		},
	},
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<Omit<typeof meta, 'component'>>;

export const Default: Story = {
	render: (args) => {
		const { t } = useTranslation();

		return (
			<List {...args}>
				{(['identityDocument', 'application', 'photo'] as const).map((key) => (
					<ListItem key={key}>
						<Text>{t(`example.story.list.${key}`)}</Text>
					</ListItem>
				))}
				<div>通常のReact Element</div>
				{'テキストノード'}
				{null}
				{false}
			</List>
		);
	},
};


export const Nested: Story = {
	render: (args) => {
		const { t } = useTranslation();

		return (
			<List {...args}>
				<ListItem>
					<Text>{t('example.story.list.identityDocument')}</Text>
				</ListItem>

				<ListItem>
					<Text>{t('example.story.list.application')}</Text>
					<List variant="number">
						<ListItem>
							<Text>申請書</Text>
						</ListItem>
						<ListItem>
							<Text>本人確認書類</Text>
						</ListItem>
					</List>
				</ListItem>

				<ListItem>
					<Text>{t('example.story.list.photo')}</Text>
					<List variant="number">
						<ListItem>
							<Text>顔写真</Text>
						</ListItem>
						<ListItem>
							<Text>証明写真</Text>
						</ListItem>
					</List>
				</ListItem>
			</List>
		);
	},
};