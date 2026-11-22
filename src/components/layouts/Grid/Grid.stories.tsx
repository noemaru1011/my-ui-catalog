
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTranslation } from 'react-i18next';
import { Grid } from './Grid';
import { Text } from '@/components/elements/Text/Text';

const meta = {
    component: Grid,
    tags: ['autodocs'],
    args: {
        columns: 12,
        space: 'md',
    },
    argTypes: {
        columns: {
            control: 'select',
            options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        },
        space: {
            control: 'inline-radio',
            options: ['none', 'sm', 'md', 'lg'],
        },
        children: {
            control: false,
        },
    },
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: null,
    },
    render: (args) => {
        const { t } = useTranslation('example');

        return (
            <div className="p-4">
                <Grid {...args}>
                    {Array.from({ length: 12 }, (_, index) => (
                        <div
                            className="rounded-md border p-4"
                            key={index}
                        >
                            <Text>
                                {t('story.layout.content', {
                                    count: index + 1,
                                })}
                            </Text>
                        </div>
                    ))}
                </Grid>
            </div>
        );
    },
};