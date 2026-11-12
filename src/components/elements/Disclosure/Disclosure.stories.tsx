import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useTranslation } from 'react-i18next';
import { Link } from '../Link/Link';
import { Text } from '../Text/Text';
import { Disclosure } from './Disclosure';

const meta = {
	component: Disclosure,
	tags: ['autodocs'],
	args: {
		triggerText: '詳細を表示',
		defaultOpen: false,
	},
	argTypes: {
		children: {
			control: false,
		},
	},
} satisfies Meta<typeof Disclosure>;

export default meta;

type Story = StoryObj<typeof Disclosure>;

export const Default: Story = {
	render: (args) => {
		const { t } = useTranslation();
		return (
			<Disclosure
				{...args}
				triggerText={
					args.triggerText === '詳細を表示'
						? t('example.story.disclosure.showDetails')
						: args.triggerText
				}
			>
				<Text>
					{t('example.story.disclosure.content')}{' '}
					<Link to="#" label={t('example.story.disclosure.detailsPage')} />
					{t('example.story.accordion.faqSuffix')}
				</Text>
			</Disclosure>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const trigger = canvas.getByRole('button');

		// 初期状態：閉じている
		await expect(trigger).toHaveAttribute('aria-expanded', 'false');

		// 開く
		await userEvent.click(trigger);
		await expect(trigger).toHaveAttribute('aria-expanded', 'true');

		// 閉じる
		await userEvent.click(trigger);
		await expect(trigger).toHaveAttribute('aria-expanded', 'false');
	},
};
