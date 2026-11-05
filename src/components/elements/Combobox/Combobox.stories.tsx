import type { Meta, StoryObj } from '@storybook/react-vite';
import { Combobox } from './Combobox';
import { useState } from 'react';
import { OPTIONS_WITH_DISABLED } from '@/components/types/Option.mock';

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
		options: OPTIONS_WITH_DISABLED,
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
