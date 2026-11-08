import type { Meta, StoryObj } from '@storybook/react-vite';
import { Forbidden } from './Forbidden';

const meta = {
    component: Forbidden,
    args: {
        homeUrl: '/',
    },
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof Forbidden>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
