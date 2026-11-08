import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Cluster } from '@/components/layouts/Cluster/Cluster';
import { Container } from '@/components/layouts/Container/Container';
import { Stack } from '@/components/layouts/Stack/Stack';
import { Text } from '@/components/elements/Text/Text';

const meta = {
	component: Card,
	tags: ['autodocs'],
	args: {
		size: 'default',
	},
	argTypes: {
		size: {
			control: 'radio',
			options: ['default', 'sm'],
		},
		children: {
			control: false,
		},
		className: {
			control: false,
		},
	},
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

function CardPreview({ size = 'default' }: { size?: 'default' | 'sm' }) {
	const { t } = useTranslation();
	return (
		<Container width="xl">
			<Card size={size}>
				<CardHeader>
					<CardTitle>{t('example.story.card.projectSettings')}</CardTitle>
					<CardDescription>{t('example.story.card.projectDescription')}</CardDescription>
					<CardAction>
						<Badge variant="secondary">{t('example.story.card.published')}</Badge>
					</CardAction>
				</CardHeader>
				<CardContent>
					<Stack space="sm">
						<Text>{t('example.story.card.projectDetails')}</Text>
						<Text color="muted">{t('example.story.card.lastUpdated')}</Text>
					</Stack>
				</CardContent>
				<CardFooter>
					<Cluster space="sm" justify="end">
						<Button variant="outline">{t('example.story.card.cancel')}</Button>
						<Button>{t('example.story.card.save')}</Button>
					</Cluster>
				</CardFooter>
			</Card>
		</Container>
	);
}

export const Default: Story = {
	render: ({ size }) => <CardPreview size={size} />,
};

export const Small: Story = {
	args: {
		size: 'sm',
	},
	render: ({ size }) => <CardPreview size={size} />,
};

export const ContentOnly: Story = {
	render: () => {
		const { t } = useTranslation();
		return (
			<Container width="xl">
				<Card>
					<CardHeader>
						<CardTitle>{t('example.story.card.announcements')}</CardTitle>
					</CardHeader>
					<CardContent>
						<Text>{t('example.story.card.contentOnly')}</Text>
					</CardContent>
				</Card>
			</Container>
		);
	},
};
