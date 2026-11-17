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
	render: () => {
		const { t } = useTranslation('example');
		return (
			<DescriptionList>
				<DescriptionListItem term={t('story.descriptionList.name')}>
					<Text>{t('story.descriptionList.person')}</Text>
				</DescriptionListItem>

				<DescriptionListItem term={t('story.descriptionList.email')}>
					<Text>example@com</Text>
				</DescriptionListItem>

				<DescriptionListItem term={t('story.descriptionList.address')}>
					<Text>{t('story.descriptionList.location')}</Text>
				</DescriptionListItem>
			</DescriptionList>
		);
	},
};
