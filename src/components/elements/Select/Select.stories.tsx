import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';
import { OPTIONS_WITH_DISABLED } from '@/components/types/Option.mock';
import { useState } from 'react';

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
	args: {
		id: 'select',
		label: '言語',
		options: OPTIONS_WITH_DISABLED,
	},
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const [value, setValue] = useState('');

		return <Select {...args} value={value} onChange={setValue} />;
	},
};
