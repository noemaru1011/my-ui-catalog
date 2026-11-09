import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTranslation } from 'react-i18next';
import { Heading } from './Heading';

const meta = {
	component: Heading,
	tags: ['autodocs'],
	args: {
		children: '見出し',
		type: 'sectionTitle',
	},

} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const { t } = useTranslation();
		return (
			<Heading
				{...args}
				{...(args.children === '見出し' && {
					children: t('example.story.labels.heading'),
				})}
			/>
		);
	},
};
