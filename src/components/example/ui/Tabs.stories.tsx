
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';
import { Heading } from '@/components/elements/Heading/Heading';
import { Text } from '@/components/elements/Text/Text';
import { Stack } from '@/components/layouts/Stack/Stack';

const meta = {
    tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Tabs
            defaultValue="overview"
            className="flex w-full flex-col gap-2"
        >
            <TabsList>
                <TabsTrigger value="overview">概要</TabsTrigger>
                <TabsTrigger value="specification">仕様</TabsTrigger>
                <TabsTrigger value="review">レビュー</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
                <Heading type="subBlockTitle">概要</Heading>
                <Text>このサービスの概要を確認できます。</Text>
            </TabsContent>

            <TabsContent value="specification">
                <Heading type="subBlockTitle">仕様</Heading>
                <Text>サービスの詳細な仕様を確認できます。</Text>
            </TabsContent>

            <TabsContent value="review">
                <Heading type="subBlockTitle">レビュー</Heading>
                <Text>サービスに関するレビューを確認できます。</Text>
            </TabsContent>
        </Tabs>
    ),
};

export const Vertical: Story = {
    render: () => (
        <Tabs
            defaultValue="overview"
            orientation="vertical"
            className="flex w-full gap-4"
        >
            <TabsList className="h-auto flex-col">
                <TabsTrigger value="overview">
                    概要
                </TabsTrigger>
                <TabsTrigger value="specification">
                    仕様
                </TabsTrigger>
                <TabsTrigger value="review">
                    レビュー
                </TabsTrigger>
            </TabsList>

            <Stack>
                <TabsContent value="overview">
                    <Heading type="subBlockTitle">概要</Heading>
                    <Text>このサービスの概要を確認できます。</Text>
                </TabsContent>

                <TabsContent value="specification">
                    <Heading type="subBlockTitle">仕様</Heading>
                    <Text>サービスの詳細な仕様を確認できます。</Text>
                </TabsContent>

                <TabsContent value="review">
                    <Heading type="subBlockTitle">レビュー</Heading>
                    <Text>サービスに関するレビューを確認できます。</Text>
                </TabsContent>
            </Stack>
        </Tabs>
    ),
};
