import type { Meta, StoryObj } from '@storybook/react-vite';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Cluster } from '@/components/layouts/Cluster/Cluster';
import { Stack } from '@/components/layouts/Stack/Stack';
import { Text } from '@/components/elements/Text/Text';

const meta = {
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'],
		},
		size: {
			control: 'select',
			options: ['default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'],
		},
	},
	args: {
		children: 'Button',
		variant: 'default',
		size: 'default',
	},
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
	args: {
		loading: true,
		children: '保存中',
	},
};

export const Variants: Story = {
	render: () => (
		<Cluster>
			<Button variant="default">Default</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="destructive">Destructive</Button>
			<Button variant="link">Link</Button>
		</Cluster>
	),
};

export const Sizes: Story = {
	render: () => (
		<Stack space="lg">
			<Stack space="sm">
				<Text weight="bold">Text buttons</Text>
				<Cluster>
					<Button size="xs">Extra small</Button>
					<Button size="sm">Small</Button>
					<Button size="default">Default</Button>
					<Button size="lg">Large</Button>
				</Cluster>
			</Stack>
			<Stack space="sm">
				<Text weight="bold">Icon buttons</Text>
				<Cluster>
					<Button size="icon-xs" aria-label="Search">
						<Search />
					</Button>
					<Button size="icon-sm" aria-label="Search">
						<Search />
					</Button>
					<Button size="icon" aria-label="Search">
						<Search />
					</Button>
					<Button size="icon-lg" aria-label="Search">
						<Search />
					</Button>
				</Cluster>
			</Stack>
		</Stack>
	),
};
