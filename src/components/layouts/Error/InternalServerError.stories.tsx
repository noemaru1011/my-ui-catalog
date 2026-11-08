import type { Meta, StoryObj } from '@storybook/react-vite';
import { InternalServerError } from './InternalServerError';

const meta = {
    component: InternalServerError,
    args: {
        homeUrl: '/',
    },
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof InternalServerError>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
