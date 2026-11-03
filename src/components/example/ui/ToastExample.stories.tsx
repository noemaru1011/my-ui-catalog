import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';
import { Cluster } from '@/components/layouts/Cluster/Cluster';
import { Stack } from '@/components/layouts/Stack/Stack';
import { Text } from '@/components/elements/Text/Text';

const meta = {
	title: 'Example/ui/toast',
	tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Stack space="md">
			<Text>ボタンを押すと、それぞれの種類の toast が表示されます。</Text>
			<Cluster>
				<Button
					onClick={() =>
						toast.add({
							title: '保存しました',
							description: '変更内容を保存しました。',
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
							title: 'お知らせ',
							description: '新しい更新があります。',
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
							title: 'ご確認ください',
							description: '入力内容に注意してください。',
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
							title: 'エラーが発生しました',
							description: 'もう一度お試しください。',
							type: 'error',
						})
					}
				>
					Error
				</Button>
			</Cluster>
		</Stack>
	),
};
