import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Radio } from './Radio';

const meta = {
	component: Radio,
	tags: ['autodocs'],
	argTypes: {
		value: {
			control: false,
		},
		options: {
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
		value: '',
		onChange: () => { },
	},
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const [value, setValue] = useState('');

		return <Radio {...args} value={value} onChange={setValue} />;
	},
};
