import type { Meta, StoryObj } from '@storybook/react-vite';
import { Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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
	render: () => {
		const { t } = useTranslation();
		return (
			<TooltipProvider delay={300}>
				<Stack space="md">
					<Text>{t('example.story.tooltip.instructions')}</Text>
					<Tooltip>
						<TooltipTrigger render={<Button variant="outline" />}>
							<Info aria-hidden="true" />
							{t('example.story.tooltip.details')}
						</TooltipTrigger>
						<TooltipContent>{t('example.story.tooltip.detailsDescription')}</TooltipContent>
					</Tooltip>
				</Stack>
			</TooltipProvider>
		);
	},
};

export const Placements: Story = {
	render: () => {
		const { t } = useTranslation();
		return (
			<TooltipProvider>
				<Stack space="lg">
					<Text>{t('example.story.tooltip.placementInstructions')}</Text>
					<Cluster space="lg" justify="center">
						<Tooltip>
							<TooltipTrigger render={<Button variant="outline" />}>
								{t('example.story.tooltip.top')}
							</TooltipTrigger>
							<TooltipContent side="top">{t('example.story.tooltip.shownTop')}</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger render={<Button variant="outline" />}>
								{t('example.story.tooltip.right')}
							</TooltipTrigger>
							<TooltipContent side="right">{t('example.story.tooltip.shownRight')}</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger render={<Button variant="outline" />}>
								{t('example.story.tooltip.bottom')}
							</TooltipTrigger>
							<TooltipContent side="bottom">{t('example.story.tooltip.shownBottom')}</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger render={<Button variant="outline" />}>
								{t('example.story.tooltip.left')}
							</TooltipTrigger>
							<TooltipContent side="left">{t('example.story.tooltip.shownLeft')}</TooltipContent>
						</Tooltip>
					</Cluster>
				</Stack>
			</TooltipProvider>
		);
	},
};
