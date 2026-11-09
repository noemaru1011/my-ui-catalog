import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { expect, userEvent, within } from 'storybook/test';
import { DatePicker } from './DatePicker';

const meta = {
	component: DatePicker,
	tags: ['autodocs'],
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
		const { t } = useTranslation();

		return (
			<DatePicker
				{...args}
				label={args.label === '日付' ? t('example.story.labels.date') : args.label}
				value={date}
				onChange={setDate}
			/>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button', { name: '日付' }));

		const calendar = document.body.querySelector('[data-slot="calendar"]');
		await expect(calendar).toBeInTheDocument();

		const dateButton = calendar?.querySelector<HTMLButtonElement>('[data-day]');
		if (!dateButton) throw new Error('Calendar did not render any day buttons');
		await userEvent.click(dateButton);
	},
};
