import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cluster } from './Cluster';
import { Container } from '../Container/Container';

const meta = {
	component: Cluster,
	tags: ['autodocs'],
	args: {
		space: 'md',
		justify: 'start',
		align: 'center',
	},
	argTypes: {
		space: {
			control: 'radio',
			options: ['sm', 'md', 'lg'],
		},
		justify: {
			control: 'radio',
			options: ['start', 'center', 'end', 'between'],
		},
		align: {
			control: 'radio',
			options: ['start', 'center', 'end', 'stretch'],
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
		className={`flex min-w-20 items-center justify-center rounded-md border border-blue-300 bg-blue-50 px-6 py-2 text-base font-medium text-blue-900 ${className}`}
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
						<Item title="大" className="py-6" />
					</Cluster>
				</CardContent>
			</Card>
		</Container>
	),
};