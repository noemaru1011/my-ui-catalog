import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
		id: {
			control: false,
		},
		value: {
			control: false,
		},
		inputSize: {
			control: 'inline-radio',
			options: ['sm', 'md', 'lg'],
		}
	},
} satisfies Meta<typeof DateRange>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const [dateRange, setDateRange] = useState<DateRangeType>();
		const { t } = useTranslation();

		return (
			<DateRange
				{...args}
				label={args.label === '期間' ? t('example.story.labels.period') : args.label}
				value={dateRange}
				onChange={setDateRange}
			/>
		);
	},
};
