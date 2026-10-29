import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DatePicker } from './DatePicker';

const meta = {
	component: DatePicker,
	tags: ['autodocs'],
	argTypes: {
		value: {
			control: false,
		},
	},
	args: {
		id: 'date',
		label: '日付',
	},
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const [date, setDate] = useState<Date>();

		return <DatePicker {...args} value={date} onChange={setDate} />;
	},
};
