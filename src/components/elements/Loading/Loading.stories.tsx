import type { Meta, StoryObj } from '@storybook/react-vite';
import { Loading } from './Loading';

const meta = {
    component: Loading,
    tags: ['autodocs'],
} satisfies Meta<typeof Loading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithMessage: Story = {
    args: {
        message: 'データ読み込み中...',
    },
};


export const Default: Story = {
    args: {
        message: undefined,
    },
    render: () => {

        return <Loading message={undefined} />;
    },
};
