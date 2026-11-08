import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';
import { Cluster } from '@/components/layouts/Cluster/Cluster';
import { Stack } from '@/components/layouts/Stack/Stack';
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
			<Stack space="md">
				<Text>{t('example.story.toast.instructions')}</Text>
				<Cluster>
				<Button
					onClick={() =>
						toast.add({
							title: t('example.story.toast.saved'),
							description: t('example.story.toast.savedDescription'),
							type: 'success',
						})
					}
				>
					Success
				</Button>
				<Button
					variant="secondary"
					onClick={() =>
						toast.add({
							title: t('example.story.toast.notice'),
							description: t('example.story.toast.noticeDescription'),
							type: 'info',
						})
					}
				>
					Info
				</Button>
				<Button
					variant="outline"
					onClick={() =>
						toast.add({
							title: t('example.story.toast.check'),
							description: t('example.story.toast.checkDescription'),
							type: 'warning',
						})
					}
				>
					Warning
				</Button>
				<Button
					variant="destructive"
					onClick={() =>
						toast.add({
							title: t('example.story.toast.error'),
							description: t('example.story.toast.errorDescription'),
							type: 'error',
						})
					}
				>
					Error
				</Button>
				</Cluster>
			</Stack>
		);
	},
};
