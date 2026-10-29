import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Checkbox } from './Checkbox';

const meta = {
	component: Checkbox,
	tags: ['autodocs'],
	argTypes: {
		options: {
			control: false,
		},
		value: {
			control: false,
		},
	},
	args: {
		label: '表示項目',
		options: [
			{ value: 'hard-disks', label: 'ハードディスク' },
			{ value: 'external-disks', label: '外付けディスク' },
			{ value: 'cds-dvds', label: 'CD・DVD' },
			{ value: 'connected-servers', label: '接続中のサーバー' },
		],
		value: [],
		onChange: () => { },
	},
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const [value, setValue] = useState<string[]>([]);

		return <Checkbox {...args} value={value} onChange={setValue} />;
	},
};
