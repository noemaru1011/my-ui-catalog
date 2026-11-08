import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../Text/Text';
import { List, ListItem } from './List';

const meta = {
    component: List,
    tags: ['autodocs'],
    args: {
        variant: 'disc',
    },
    argTypes: {
        children: {
            control: false,
        },
    },
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<Omit<typeof meta, 'component'>>;

export const Default: Story = {
    render: (args) => (
        <List {...args}>
            <ListItem>
                <Text>本人確認書類</Text>
            </ListItem>

            <ListItem>
                <Text>申請書</Text>
            </ListItem>

            <ListItem>
                <Text>証明写真</Text>
            </ListItem>
        </List>
    ),
};

export const None: Story = {
    args: {
        variant: 'none',
    },
    render: (args) => (
        <List {...args}>
            <ListItem>
                <Text>本人確認書類</Text>
            </ListItem>

            <ListItem>
                <Text>申請書</Text>
            </ListItem>

            <ListItem>
                <Text>証明写真</Text>
            </ListItem>
        </List>
    ),
};

export const Number: Story = {
    args: {
        variant: 'number',
    },
    render: (args) => (
        <List {...args}>
            <ListItem>申請フォームを入力する</ListItem>
            <ListItem>必要書類を提出する</ListItem>
            <ListItem>審査結果を確認する</ListItem>
        </List>
    ),
};