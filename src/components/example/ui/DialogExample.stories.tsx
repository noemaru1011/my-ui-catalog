import type { Meta, StoryObj } from '@storybook/react-vite';
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
	title: 'Example/ui/dialog',
	tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger render={<Button />}>詳細を表示</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>ダイアログのタイトル</DialogTitle>
					<DialogDescription>
						ダイアログを使って、補足情報や操作を表示できます。
					</DialogDescription>
				</DialogHeader>
				<Text>ここにダイアログの内容を表示します。</Text>
				<DialogFooter showCloseButton />
			</DialogContent>
		</Dialog>
	),
};
