import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import type { DateRange as DateRangeType } from 'react-day-picker';
import { Center } from '../../layouts/Center/Center';
import { DateRange } from './DateRange';

const meta = {
	component: DateRange,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	args: {
		id: 'date-range',
		label: '期間',
	},
	decorators: [
		(Story) => (
			<Center maxWidth="md">
				<Story />
			</Center>
		),
	],
} satisfies Meta<typeof DateRange>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const [dateRange, setDateRange] = useState<DateRangeType>();

		return <DateRange {...args} value={dateRange} onChange={setDateRange} />;
	},
};
