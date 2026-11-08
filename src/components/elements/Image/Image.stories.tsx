
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTranslation } from 'react-i18next';
import { Image } from './Image';

const meta = {
    component: Image,
    tags: ['autodocs'],
    args: {
        src: 'https://placehold.co/600x400',
        alt: 'サンプル画像',
        description: '画像の説明文です。',
        width: '400px',
    },
} satisfies Meta<typeof Image>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const { t } = useTranslation();
		return (
			<Image
				{...args}
				alt={args.alt === 'サンプル画像' ? t('example.story.image.sample') : args.alt}
				description={
					args.description === '画像の説明文です。'
						? t('example.story.image.description')
						: args.description
				}
			/>
		);
	},
};
