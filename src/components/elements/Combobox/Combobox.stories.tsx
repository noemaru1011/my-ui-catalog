import type { Meta, StoryObj } from '@storybook/react-vite';
import { Combobox } from './Combobox';

const meta = {
	component: Combobox,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: '選択肢内のグループ化やマルチセレクトなどは非対応です。',
			},
		},
	},
	argTypes: {
		options: {
			control: false,
		},
		value: {
			control: false,
		},
	},
	args: {
		id: 'combobox',
		label: 'フレームワーク',
		options: [
			{ value: 'next', label: 'Next.js' },
			{ value: 'sveltekit', label: 'SvelteKit' },
			{ value: 'nuxt', label: 'Nuxt', disabled: true },
		],
	},
} satisfies Meta<typeof Combobox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
