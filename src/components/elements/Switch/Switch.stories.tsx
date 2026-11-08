
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Switch } from './Switch';

const meta = {
    component: Switch,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        id: {
            control: false,
        },
        labelPosition: {
            control: 'inline-radio',
            options: ['left', 'right'],
        },
        size: {
            control: 'inline-radio',
            options: ['default', 'sm'],
        },
        checked: {
            control: 'boolean',
        },
        disabled: {
            control: 'boolean',
        },
    },
    args: {
        'aria-label': 'スイッチ切り替え',
        label: '通知設定',
        labelPosition: 'left',
        size: 'default',
        disabled: false,
    },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

