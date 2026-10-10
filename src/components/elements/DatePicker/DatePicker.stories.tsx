import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Center } from '../../layouts/Center/Center';
import { DatePicker } from './DatePicker';

const meta = {
	component: DatePicker,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		value: {
			control: false,
		},
	},
	args: {
		id: 'date',
		label: '日付',
	},
	decorators: [
		(Story) => (
			<Center maxWidth="md">
				<Story />
			</Center>
		),
	],
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const [date, setDate] = useState<Date>();

		return <DatePicker {...args} value={date} onChange={setDate} />;
	},
};
