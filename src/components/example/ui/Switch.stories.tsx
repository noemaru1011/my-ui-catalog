
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from '@/components/ui/switch';

const meta = {
    component: Switch,
    tags: ['autodocs'],
    argTypes: {
        defaultChecked: {
            control: false,
        },
        size: {
            control: 'select',
            options: ['default', 'sm'],
        },
    },
    args: {
        size: 'default',
        defaultChecked: false,
        'aria-label': 'Switch',
    },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
