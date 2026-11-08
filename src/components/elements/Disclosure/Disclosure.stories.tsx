import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from '../Link/Link';
import { Text } from '../Text/Text';
import { Disclosure } from './Disclosure';

const meta = {
    component: Disclosure,
    tags: ['autodocs'],
    args: {
        triggerText: '詳細を表示',
        defaultOpen: false,
    },
    argTypes: {
        children: {
            control: false,
        },
    },
} satisfies Meta<typeof Disclosure>;

export default meta;

type Story = StoryObj<typeof Disclosure>;

export const Default: Story = {
    render: (args) => (
        <Disclosure {...args}>
            <Text>
                こちらはDisclosureのコンテンツです。詳しくは
                <Link to="#" label="詳細ページ" />
                をご覧ください。
            </Text>
        </Disclosure>
    ),
};

