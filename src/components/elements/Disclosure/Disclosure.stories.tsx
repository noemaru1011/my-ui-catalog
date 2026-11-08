import type { Meta, StoryObj } from '@storybook/react-vite';
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
					{t('example.story.disclosure.content')} {' '}
					<Link to="#" label={t('example.story.disclosure.detailsPage')} />
					{t('example.story.accordion.faqSuffix')}
				</Text>
			</Disclosure>
		);
	},
};
