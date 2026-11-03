import type { Meta, StoryObj } from '@storybook/react-vite';
import { Combobox } from './Combobox';
import { useState } from 'react';

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
			{ value: 'remix', label: 'Remix' },
			{ value: 'astro', label: 'Astro' },
			{ value: 'angular', label: 'Angular' },
		],
	},
} satisfies Meta<typeof Combobox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const [value, setValue] = useState<string | undefined>(undefined);

		return <Combobox {...args} value={value} onChange={setValue} />;
	},
};
