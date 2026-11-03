import type { Meta, StoryObj } from '@storybook/react-vite';
import { Loading } from './Loading';

const meta = {
    component: Loading,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'データ生成中や読み込み中の表示に使用します。',
            },
        },
    },
} satisfies Meta<typeof Loading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        message: '読み込み中',
    },
};

