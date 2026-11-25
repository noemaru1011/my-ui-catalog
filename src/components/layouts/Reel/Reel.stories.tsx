
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Container } from '../Container/Container';
import { Reel } from './Reel';

const meta = {
    component: Reel,
    tags: ['autodocs'],
    argTypes: {
        space: {
            control: 'inline-radio',
            options: ['none', 'sm', 'md', 'lg'],
        },
    },
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof Reel>;

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
        className={`flex h-40 w-64 shrink-0 items-center justify-center rounded-md border border-blue-300 bg-blue-50 px-4 text-base font-medium text-blue-900 ${className}`}
    >
        {title}
    </div>
);

export const Default: Story = {
    args: {
        space: 'md',
    },
    render: (args) => {
        const { t } = useTranslation('example');
        return (
            <Container width="full">
                <Card>
                    <CardHeader />
                    <CardContent>
                        <Reel {...args}>
                            <Item title={t('story.layout.small')} />
                            <Item title={t('story.layout.medium')} />
                            <Item title={t('story.layout.large')} />
                            <Item title={t('story.layout.small')} />
                            <Item title={t('story.layout.medium')} />
                        </Reel>
                    </CardContent>
                </Card>
            </Container>
        );
    },
};
