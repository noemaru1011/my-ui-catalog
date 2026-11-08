import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../Text/Text';
import {
    DescriptionList,
    DescriptionListItem,
} from './DescriptionList';

const meta = {
    component: DescriptionList,
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: false,
        },
    },
} satisfies Meta<typeof DescriptionList>;

export default meta;

type Story = StoryObj<Omit<typeof meta, 'component'>>;

export const Default: Story = {
    render: (args) => (
        <DescriptionList {...args}>
            <DescriptionListItem term="氏名">
                <Text>山田 太郎</Text>
            </DescriptionListItem>

            <DescriptionListItem term="メールアドレス">
                <Text>example@example.com</Text>
            </DescriptionListItem>

            <DescriptionListItem term="住所">
                <Text>東京都千代田区霞が関</Text>
            </DescriptionListItem>
        </DescriptionList>
    ),
};
