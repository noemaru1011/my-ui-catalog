import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { expect, userEvent, within } from 'storybook/test';
import { Button } from '@/components/ui/button';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const meta = {
	tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		const [open, setOpen] = useState(false);
		const { t } = useTranslation();

		return (
			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogTrigger render={<Button variant="destructive" />}>
					{t('example.story.alertDialog.deleteAction')}
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							{t('example.story.alertDialog.confirmDelete')}
						</AlertDialogTitle>
						<AlertDialogDescription>
							{t('example.story.alertDialog.irreversible')}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>{t('example.story.alertDialog.cancel')}</AlertDialogCancel>
						<AlertDialogAction variant="destructive" onClick={() => setOpen(false)}>
							{t('example.story.table.delete')}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button', { name: '削除する' }));

		const dialog = within(document.body).getByRole('alertdialog');
		await expect(dialog).toBeInTheDocument();
		await userEvent.click(within(dialog).getByRole('button', { name: 'キャンセル' }));
		await expect(dialog).toHaveAttribute('data-closed');

		await userEvent.click(canvas.getByRole('button', { name: '削除する' }));
		const reopenedDialog = within(document.body).getByRole('alertdialog');
		await userEvent.click(within(reopenedDialog).getByRole('button', { name: '削除' }));
		await expect(reopenedDialog).toHaveAttribute('data-closed');
	},
};
