import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page } from './page';

const meta = {
	component: Page,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
