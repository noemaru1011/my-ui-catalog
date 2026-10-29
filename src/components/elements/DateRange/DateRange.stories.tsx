import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import type { DateRange as DateRangeType } from 'react-day-picker';
import { DateRange } from './DateRange';

const meta = {
	component: DateRange,
	tags: ['autodocs'],
	args: {
		id: 'date-range',
		label: '期間',
	},
	argTypes: {
		value: {
			control: false,
		},
	},
} satisfies Meta<typeof DateRange>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const [dateRange, setDateRange] = useState<DateRangeType>();

		return <DateRange {...args} value={dateRange} onChange={setDateRange} />;
	},
};
