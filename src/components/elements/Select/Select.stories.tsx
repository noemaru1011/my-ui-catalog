import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTranslation } from 'react-i18next';
import { Select } from './Select';
import { OPTIONS_WITH_DISABLED } from '@/components/types/Option.mock';
import { useState } from 'react';

const meta = {
	component: Select,
	tags: ['autodocs'],
	argTypes: {
		id: {
			control: false,
		},
		value: {
			control: false,
		},
		options: {
			control: false,
		},
		inputSize: {
			control: {
				type: 'inline-radio',
				options: ['sm', 'md', 'lg'],
			},
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
		const { t } = useTranslation();

		return (
			<Select
				{...args}
				label={args.label === '言語' ? t('example.story.labels.language') : args.label}
				value={value}
				onChange={setValue}
			/>
		);
	},
};
