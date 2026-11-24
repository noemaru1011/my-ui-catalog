import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTranslation } from 'react-i18next';
import { Image } from '@/components/elements/Image/Image';
import { Heading } from '@/components/elements/Heading/Heading';
import { Text } from '@/components/elements/Text/Text';
import { Center } from '@/components/layouts/Center/Center';
import { Stack } from '@/components/layouts/Stack/Stack';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';

const slides = [
	{
		src: 'https://placehold.co/800x450?text=Mountain',
		textKey: 'mountains',
	},
	{
		src: 'https://placehold.co/800x450?text=Ocean',
		textKey: 'ocean',
	},
	{
		src: 'https://placehold.co/800x450?text=Forest',
		textKey: 'forest',
	},
] as const;

const meta = {
	tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		const { t } = useTranslation('example');
		return (
			<Center>
				<Stack space="md">
					<Heading type="blockTitle">{t('story.carousel.gallery')}</Heading>
					<Text color="muted">{t('story.carousel.instructions')}</Text>
					<Carousel opts={{ loop: true }} aria-label={t('story.carousel.gallery')}>
						<CarouselContent>
							{slides.map((slide) => {
								const description = t(`story.carousel.${slide.textKey}`);
								return (
									<CarouselItem key={slide.src}>
										<Image
											src={slide.src}
											alt={description}
											description={description}
										/>
									</CarouselItem>
								);
							})}
						</CarouselContent>
						<CarouselPrevious aria-label={t('story.carousel.previous')} />
						<CarouselNext aria-label={t('story.carousel.next')} />
					</Carousel>
				</Stack>
			</Center>
		);
	},
};
