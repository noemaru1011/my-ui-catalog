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
			</List>
		);
	},
};

export const None: Story = {
    args: {
        variant: 'none',
    },
	render: (args) => {
		const { t } = useTranslation();
		return (
			<List {...args}>
				{(['identityDocument', 'application', 'photo'] as const).map((key) => (
					<ListItem key={key}>
						<Text>{t(`example.story.list.${key}`)}</Text>
					</ListItem>
				))}
			</List>
		);
	},
};

export const Number: Story = {
    args: {
        variant: 'number',
    },
	render: (args) => {
		const { t } = useTranslation();
		return (
			<List {...args}>
				{(['fillForm', 'submitDocuments', 'checkResult'] as const).map((key) => (
					<ListItem key={key}>{t(`example.story.list.${key}`)}</ListItem>
				))}
			</List>
		);
	},
};