import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTranslation } from 'react-i18next';
import { Link } from './Link';

const meta = {
	component: Link,
	tags: ['autodocs'],
	args: {
		to: '/users',
		label: 'ユーザー一覧',
		size: 'md',
	},
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const { t } = useTranslation();
		return (
			<Link
				{...args}
				label={
					args.label === 'ユーザー一覧'
						? t('example.story.labels.userList')
						: args.label
				}
			/>
		);
	},
};
