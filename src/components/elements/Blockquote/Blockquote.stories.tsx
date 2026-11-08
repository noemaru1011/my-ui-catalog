
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTranslation } from 'react-i18next';
import { Text } from '../Text/Text';
import { Blockquote } from './Blockquote';

const meta = {
    component: Blockquote,
    tags: ['autodocs'],
} satisfies Meta<typeof Blockquote>;

export default meta;

type Story = StoryObj<Omit<typeof meta, 'component'>>;

export const Default: Story = {
	render: () => {
		const { t } = useTranslation();
		return (
			<Blockquote>
				<Text>{t('example.story.blockQuote')}</Text>
			</Blockquote>
		);
	},
};
