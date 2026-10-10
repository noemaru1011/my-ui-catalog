import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Center } from '../../layouts/Center/Center';
import { Checkbox } from './Checkbox';

const meta = {
	component: Checkbox,
	tags: ['autodocs'],
	decorators: [
		(Story: React.ComponentType) => (
			<Center>
				<Story />
			</Center>
		),
	],
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
