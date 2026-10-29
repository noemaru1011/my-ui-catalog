import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const meta = {
	component: Select,
	tags: ['autodocs'],
	argTypes: {
		value: {
			control: false,
		},
		options: {
			control: false,
		},
	},
	parameters: {
		docs: {
			description: {
				component: '選択肢内のグループ化などは非対応です。',
			},
		},
	},
	args: {
		id: 'select',
		label: 'フレームワーク',
		options: [
			{ value: 'next', label: 'Next.js' },
			{ value: 'sveltekit', label: 'SvelteKit' },
			{ value: 'nuxt', label: 'Nuxt', disabled: true },
		],
	},
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
