import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cluster } from './Cluster';
import { Container } from '../Container/Container';

const meta = {
	component: Cluster,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'子要素を横方向に並べるレイアウトコンポーネントです。space は要素間の間隔、justify は水平方向の配置、align は垂直方向の配置を制御します。子要素が収まらない場合は自動的に折り返します。',
			},
		},
	},
	args: {
		space: 'md',
		justify: 'start',
		align: 'center',
	},
	argTypes: {
		space: {
			control: 'select',
			options: ['xs', 'sm', 'md', 'lg', 'xl'],
			description: '子要素間の間隔',
		},
		justify: {
			control: 'select',
			options: ['start', 'center', 'end', 'between'],
			description: '水平方向の配置',
		},
		align: {
			control: 'select',
			options: ['start', 'center', 'end', 'stretch'],
			description: '垂直方向の配置',
		},
	},
} satisfies Meta<typeof Cluster>;

export default meta;

type Story = StoryObj<typeof meta>;

const Item = ({
	title,
	className = '',
}: {
	title: string;
	className?: string;
}) => (
	<div
		className={`flex min-w-20 items-center justify-center rounded-md border border-blue-300 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-900 ${className}`}
	>
		{title}
	</div>
);
export const Default: Story = {
	args: {
		space: 'sm',
		justify: 'start',
		align: 'center',
	},
	render: (args) => (
		<Container width="full">
			<Card>
				<CardHeader>
					<CardTitle>space・justify・align を Controls から変更して、子要素の配置や間隔を確認できます。</CardTitle>
				</CardHeader>
				<CardContent>
					<Cluster {...args}>
						<Item title="小" />
						<Item title="中" className="py-6" />
						<Item title="大" className="py-8" />
					</Cluster>
				</CardContent>
			</Card>
		</Container>
	),
};