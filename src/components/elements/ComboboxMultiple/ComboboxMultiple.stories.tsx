import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ComboboxMultiple } from './ComboboxMultiple';

const meta = {
	component: ComboboxMultiple,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'複数の選択肢を選択できるコンボボックスです。選択肢内のグループ化には対応していません。',
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
		id: 'combobox-multiple',
		label: 'フレームワーク',
		options: [
			{ value: 'next', label: 'Next.js' },
			{ value: 'sveltekit', label: 'SvelteKit' },
			{ value: 'nuxt', label: 'Nuxt', disabled: true },
			{ value: 'remix', label: 'Remix' },
			{ value: 'astro', label: 'Astro' },
		],
	},
} satisfies Meta<typeof ComboboxMultiple>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const [value, setValue] = useState<string[]>([]);

		return <ComboboxMultiple {...args} value={value} onChange={setValue} />;
	},
};
