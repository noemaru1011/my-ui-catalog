import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlertCircle, CircleCheck, X } from 'lucide-react';
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
	render: () => (
		<Stack space="md">
			<Alert>
				<CircleCheck aria-hidden="true" />
				<AlertTitle>変更を保存しました</AlertTitle>
				<AlertDescription>
					<Text color="muted">プロジェクト設定が正常に更新されました。</Text>
				</AlertDescription>
			</Alert>
			<Alert variant="destructive">
				<AlertCircle aria-hidden="true" />
				<AlertTitle>エラーが発生しました</AlertTitle>
				<AlertDescription>
					<Text color="muted">保存できませんでした。時間をおいてもう一度お試しください。</Text>
				</AlertDescription>
				<AlertAction>
					<Button variant="ghost" size="icon-xs" aria-label="通知を閉じる">
						<X aria-hidden="true" />
					</Button>
				</AlertAction>
			</Alert>
		</Stack>
	),
};

export const Destructive: Story = {
	args: {
		variant: 'destructive',
	},
	render: (args) => (
		<Alert {...args}>
			<AlertCircle aria-hidden="true" />
			<AlertTitle>エラーが発生しました</AlertTitle>
			<AlertDescription>
				<Text color="muted">保存できませんでした。時間をおいてもう一度お試しください。</Text>
			</AlertDescription>
		</Alert>
	),
};
