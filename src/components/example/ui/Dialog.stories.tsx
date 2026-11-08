import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Text } from '@/components/elements/Text/Text';

const meta = {
	tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		const { t } = useTranslation();
		return (
			<Dialog>
				<DialogTrigger render={<Button />}>
					{t('example.story.dialog.showDetails')}
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{t('example.story.dialog.title')}</DialogTitle>
						<DialogDescription>{t('example.story.dialog.description')}</DialogDescription>
					</DialogHeader>
					<Text>{t('example.story.dialog.content')}</Text>
					<DialogFooter showCloseButton />
				</DialogContent>
			</Dialog>
		);
	},
};
