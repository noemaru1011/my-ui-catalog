import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlertCircle, CircleCheck, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Text } from '@/components/elements/Text/Text';
import { Stack } from '@/components/layouts/Stack/Stack';
import {
	Alert,
	AlertAction,
	AlertDescription,
	AlertTitle,
} from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const meta = {
	component: Alert,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'radio',
			options: ['default', 'destructive'],
		},
		children: {
			control: false,
		},
		className: {
			control: false,
		},
	},
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		const { t } = useTranslation();
		return (
			<Stack space="md">
				<Alert>
					<CircleCheck aria-hidden="true" />
					<AlertTitle>{t('example.story.alert.saved')}</AlertTitle>
					<AlertDescription>
						<Text color="muted">{t('example.story.alert.savedDescription')}</Text>
					</AlertDescription>
				</Alert>
				<Alert variant="destructive">
					<AlertCircle aria-hidden="true" />
					<AlertTitle>{t('example.story.alert.error')}</AlertTitle>
					<AlertDescription>
						<Text color="muted">{t('example.story.alert.errorDescription')}</Text>
					</AlertDescription>
					<AlertAction>
						<Button variant="ghost" size="icon-xs" aria-label={t('example.story.alert.close')}>
							<X aria-hidden="true" />
						</Button>
					</AlertAction>
				</Alert>
			</Stack>
		);
	},
};

export const Destructive: Story = {
	args: {
		variant: 'destructive',
	},
	render: (args) => {
		const { t } = useTranslation();
		return (
			<Alert {...args}>
				<AlertCircle aria-hidden="true" />
				<AlertTitle>{t('example.story.alert.error')}</AlertTitle>
				<AlertDescription>
					<Text color="muted">{t('example.story.alert.errorDescription')}</Text>
				</AlertDescription>
			</Alert>
		);
	},
};
