import type { Meta, StoryObj } from '@storybook/react-vite';
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
		alt: '山並みの風景',
		description: '山並みの風景',
	},
	{
		src: 'https://placehold.co/800x450?text=Ocean',
		alt: '海辺の風景',
		description: '海辺の風景',
	},
	{
		src: 'https://placehold.co/800x450?text=Forest',
		alt: '森の風景',
		description: '森の風景',
	},
];

const meta = {
	title: 'Example/ui/carousel',
	tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Center maxWidth="md">
			<Stack space="md">
				<Heading type="blockTitle">風景ギャラリー</Heading>
				<Text color="muted">矢印ボタンで画像を切り替えられます。</Text>
				<Carousel opts={{ loop: true }} aria-label="風景ギャラリー">
					<CarouselContent>
						{slides.map((slide) => (
							<CarouselItem key={slide.src}>
								<Image
									src={slide.src}
									alt={slide.alt}
									description={slide.description}
								/>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious aria-label="前の画像" />
					<CarouselNext aria-label="次の画像" />
				</Carousel>
			</Stack>
		</Center>
	),
};
