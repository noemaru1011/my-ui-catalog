import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cluster } from './Cluster';
import { Container } from '../Container/Container';

const meta = {
	component: Cluster,
	tags: ['autodocs'],
	argTypes: {
		space: {
			control: 'inline-radio',
			options: ['sm', 'md', 'lg'],
		},
		justify: {
			control: 'inline-radio',
			options: ['start', 'center', 'end', 'between'],
		},
		align: {
			control: 'inline-radio',
			options: ['start', 'center', 'end', 'stretch'],
		},
	},
	parameters: {
		layout: 'fullscreen',
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
		className={`flex min-w-20 items-center justify-center rounded-md border border-blue-300 bg-blue-50 px-4 py-3 text-base font-medium text-blue-900 ${className}`}
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
	render: (args) => {
		const { t } = useTranslation();
		return (
			<Container width="full">
				<Card>
					<CardHeader>
						<CardTitle>{t('example.story.layout.clusterDescription')}</CardTitle>
					</CardHeader>
					<CardContent>
						<Cluster {...args}>
							<Item title={t('example.story.layout.small')} />
							<Item title={t('example.story.layout.medium')} className="py-6" />
							<Item title={t('example.story.layout.large')} className="py-8" />
						</Cluster>
					</CardContent>
				</Card>
			</Container>
		);
	},
};