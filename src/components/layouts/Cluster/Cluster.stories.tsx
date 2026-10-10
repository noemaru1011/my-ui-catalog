import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '@/components/ui/badge';
import { Cluster } from './Cluster';

const meta = {
	component: Cluster,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'要素を横方向に並べるコンポーネントです。`space` で子要素間の間隔、`justify` で水平方向の配置、`align` で垂直方向の配置を指定できます。',
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

export const Default: Story = {
	render: (args) => (
		<Cluster {...args}> <div className="rounded-md border p-3">1行目</div> <div className="rounded-md border p-3"> <p>1行目</p> <p>2行目</p> <p>3行目</p> </div> </Cluster>
	),
};

export const Wrapping: Story = {
	render: (args) => (<div className="w-64 border p-4">
		<Cluster {...args}>
			{Array.from({ length: 8 }, (_, index) => (<Badge key={index} variant="secondary">
				タグ {index + 1} </Badge>
			))} </Cluster> </div>
	),
};
