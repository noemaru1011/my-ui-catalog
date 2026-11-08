import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTranslation } from 'react-i18next';
import { Text } from './Text';

const meta = {
	component: Text,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	args: {
		children: 'これはテキストです。',
	},
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const { t } = useTranslation();
		return (
			<Text
				{...args}
				{...(args.children === 'これはテキストです。' && {
					children: t('example.story.text'),
				})}
			/>
		);
	},
};
