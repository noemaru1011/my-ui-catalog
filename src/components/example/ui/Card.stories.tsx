import type { Meta, StoryObj } from '@storybook/react-vite';
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
	return (
		<Container width="xl">
			<Card size={size}>
				<CardHeader>
					<CardTitle>プロジェクト設定</CardTitle>
					<CardDescription>プロジェクトの基本情報を管理します。</CardDescription>
					<CardAction>
						<Badge variant="secondary">公開中</Badge>
					</CardAction>
				</CardHeader>
				<CardContent>
					<Stack space="sm">
						<Text>プロジェクトの名前や公開状態をここから確認できます。</Text>
						<Text color="muted">最終更新: 2026年11月4日</Text>
					</Stack>
				</CardContent>
				<CardFooter>
					<Cluster space="sm" justify="end">
						<Button variant="outline">キャンセル</Button>
						<Button>変更を保存</Button>
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
	render: () => (
		<Container width="xl">
			<Card>
				<CardHeader>
					<CardTitle>お知らせ</CardTitle>
				</CardHeader>
				<CardContent>
					<Text>カードのヘッダーとコンテンツだけを使ったシンプルな表示です。</Text>
				</CardContent>
			</Card>
		</Container>
	),
};
