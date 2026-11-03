
import type { Meta, StoryObj } from '@storybook/react-vite';
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

export const Default: Story = {};

export const WithLink: Story = {
    args: {
        to: '/detail',
    },
};
