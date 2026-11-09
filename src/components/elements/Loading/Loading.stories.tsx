import type { Meta, StoryObj } from '@storybook/react-vite';
import { Loading } from './Loading';
import { useTranslation } from 'react-i18next';

const meta = {
    component: Loading,
    tags: ['autodocs'],
    args: {
        message: '読み込み中...',
    }
} satisfies Meta<typeof Loading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => {
        const { t } = useTranslation();
        return (
            <Loading
                {...args}
                message={
                    args.message === '読み込み中...'
                        ? t('example.story.labels.loading')
                        : args.message
                }
            />
        );
    },
};

