import type { Meta, StoryObj } from '@storybook/react-vite';
import { Info } from 'lucide-react';
import { Text } from '@/components/elements/Text/Text';
import { Cluster } from '@/components/layouts/Cluster/Cluster';
import { Stack } from '@/components/layouts/Stack/Stack';
import { Button } from '@/components/ui/button';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

const meta = {
	tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<TooltipProvider delay={300}>
			<Stack space="md">
				<Text>ボタンにマウスを乗せるか、キーボードでフォーカスすると説明が表示されます。</Text>
				<Tooltip>
					<TooltipTrigger render={<Button variant="outline" />}>
						<Info aria-hidden="true" />
						詳細
					</TooltipTrigger>
					<TooltipContent>この操作の詳細を確認できます。</TooltipContent>
				</Tooltip>
			</Stack>
		</TooltipProvider>
	),
};

export const Placements: Story = {
	render: () => (
		<TooltipProvider>
			<Stack space="lg">
				<Text>表示位置を確認できます。</Text>
				<Cluster space="lg" justify="center">
					<Tooltip>
						<TooltipTrigger render={<Button variant="outline" />}>上</TooltipTrigger>
						<TooltipContent side="top">上に表示</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger render={<Button variant="outline" />}>右</TooltipTrigger>
						<TooltipContent side="right">右に表示</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger render={<Button variant="outline" />}>下</TooltipTrigger>
						<TooltipContent side="bottom">下に表示</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger render={<Button variant="outline" />}>左</TooltipTrigger>
						<TooltipContent side="left">左に表示</TooltipContent>
					</Tooltip>
				</Cluster>
			</Stack>
		</TooltipProvider>
	),
};
