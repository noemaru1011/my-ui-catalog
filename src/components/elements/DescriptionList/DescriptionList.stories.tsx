import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTranslation } from 'react-i18next';
import { Text } from '../Text/Text';
import {
    DescriptionList,
    DescriptionListItem,
} from './DescriptionList';

const meta = {
    component: DescriptionList,
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: false,
        },
    },
} satisfies Meta<typeof DescriptionList>;

export default meta;

type Story = StoryObj<Omit<typeof meta, 'component'>>;

export const Default: Story = {
	render: (args) => {
		const { t } = useTranslation();
		return (
			<DescriptionList {...args}>
				<DescriptionListItem term={t('example.story.descriptionList.name')}>
					<Text>{t('example.story.descriptionList.person')}</Text>
				</DescriptionListItem>

				<DescriptionListItem term={t('example.story.descriptionList.email')}>
					<Text>example@example.com</Text>
				</DescriptionListItem>

				<DescriptionListItem term={t('example.story.descriptionList.address')}>
					<Text>{t('example.story.descriptionList.location')}</Text>
				</DescriptionListItem>
			</DescriptionList>
		);
	},
};
