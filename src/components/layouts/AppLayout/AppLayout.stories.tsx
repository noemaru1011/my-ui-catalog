import type { Meta, StoryObj } from '@storybook/react';
import { AppLayout } from './AppLayout';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/elements/Heading/Heading';
import { Cluster } from '../Cluster/Cluster';
import { Center } from '../Center/Center';
import { Page as TablePage } from '@/components/example/table/page';

const meta = {
    component: AppLayout,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        header: {
            control: false
        },
        main: {
            control: false
        }
    },
    tags: ['autodocs'],
} satisfies Meta<typeof AppLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        header: (
            <>
                <Heading type="subBlockTitle">ヘッダー見出し</Heading>
                <Cluster justify="end">
                    <Button type="button">ログアウト(例)</Button>
                </Cluster>
            </>
        ),
        main: (
            <Center>
                <TablePage />
            </Center>
        ),
    },
};
