import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTranslation } from 'react-i18next';
import { Link } from '../Link/Link';
import { Text } from '../Text/Text';
import { Accordion } from './Accordion';

const meta = {
	component: Accordion,
	tags: ['autodocs'],
	args: {
		defaultValue: ['item-1'],
	},
	argTypes: {
		children: {
			control: false,
		},
		defaultValue: {
			control: false,
		},
	},
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<Omit<typeof meta, 'component'>>;

export const Default: Story = {
	render: (args) => {
		const { t } = useTranslation('example');
		const faqLink = <Link to="#" label={t('story.accordion.faq')} />;
		const faqSuffix = t('story.accordion.faqSuffix');
		return (
			<Accordion {...args}>
				<Accordion.Item value="item-1" trigger={t('story.accordion.resetPassword')}>
					<Text>
						{t('story.accordion.resetPasswordAnswer')} {faqLink} {faqSuffix}
					</Text>
				</Accordion.Item>

				<Accordion.Item value="item-2" trigger={t('story.accordion.changePlan')}>
					<Text>
						{t('story.accordion.changePlanAnswer')} {faqLink} {faqSuffix}
					</Text>
				</Accordion.Item>

				<Accordion.Item
					value="item-3"
					trigger={t('story.accordion.paymentMethods')}
					disabled
				>
					<Text>
						{t('story.accordion.paymentMethodsAnswer')} {faqLink} {faqSuffix}
					</Text>
				</Accordion.Item>
			</Accordion>
		);
	},
};