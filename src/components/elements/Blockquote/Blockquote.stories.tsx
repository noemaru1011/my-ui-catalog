
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../Text/Text';
import { Blockquote } from './Blockquote';

const meta = {
    component: Blockquote,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    '引用ブロックは、他の文献や資料などから引用した文章を示すために使用する。引用元の文章と通常の文章を視覚的に区別する。',
            },
        },
    },
} satisfies Meta<typeof Blockquote>;

export default meta;

type Story = StoryObj<Omit<typeof meta, 'component'>>;

export const Default: Story = {
    render: () => (
        <Blockquote>
            <Text size="sm">
                これは、引用ブロックの例です。引用ブロックは、他の文献や資料などから引用した文章を示すために使用されます。引用元の文章と通常の文章を視覚的に区別することができます。
            </Text>
        </Blockquote>
    ),
};
