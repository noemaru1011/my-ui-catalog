
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Check, Info, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Cluster } from '@/components/layouts/Cluster/Cluster';
import { Stack } from '@/components/layouts/Stack/Stack';
import { Text } from '@/components/elements/Text/Text';

const meta = {
    component: Badge,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: [
                'default',
                'secondary',
                'destructive',
                'outline',
                'ghost',
                'link',
            ],
        },
    },
    args: {
        children: 'Badge',
        variant: 'default',
    },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;


export const Variants: Story = {
    render: () => (
        <Cluster>
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="ghost">Ghost</Badge>
            <Badge variant="link">Link</Badge>
        </Cluster>
    ),
};

export const WithIcon: Story = {
    render: () => (
        <Cluster>
            <Badge>
                <Check />
                Success
            </Badge>
            <Badge variant="secondary">
                <Info />
                Information
            </Badge>
            <Badge variant="destructive">
                <X />
                Error
            </Badge>
        </Cluster>
    ),
};

export const Status: Story = {
    render: () => (
        <Stack space="md">
            <Stack space="sm">
                <Text weight="bold">Status</Text>
                <Cluster>
                    <Badge variant="default">Active</Badge>
                    <Badge variant="secondary">Pending</Badge>
                    <Badge variant="destructive">Failed</Badge>
                    <Badge variant="outline">Inactive</Badge>
                </Cluster>
            </Stack>
            <Stack space="sm">
                <Text weight="bold">Categories</Text>
                <Cluster>
                    <Badge variant="secondary">Design</Badge>
                    <Badge variant="secondary">Development</Badge>
                    <Badge variant="secondary">Marketing</Badge>
                </Cluster>
            </Stack>
        </Stack>
    ),
};

export const AsLink: Story = {
    render: () => (
        <Cluster>
            <Badge render={<a href="#default" />}>
                Default Link
            </Badge>
            <Badge variant="outline" render={<a href="#outline" />}>
                Outline Link
            </Badge>
            <Badge variant="link" render={<a href="#link" />}>
                Link Variant
            </Badge>
        </Cluster>
    ),
};
