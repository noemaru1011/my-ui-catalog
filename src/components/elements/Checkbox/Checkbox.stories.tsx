import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox } from './Checkbox';
import { OPTIONS_WITH_DISABLED } from '@/components/types/Option.mock';

const meta = {
	component: Checkbox,
	tags: ['autodocs'],
	argTypes: {
		options: {
			control: false,
		},
		value: {
			control: false,
		},
	},
	args: {
		label: '表示項目',
		options: OPTIONS_WITH_DISABLED,
		value: [],
		onChange: () => { },
	},
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const [value, setValue] = useState<string[]>([]);
		const { t } = useTranslation();

		return (
			<Checkbox
				{...args}
				label={
					args.label === '表示項目'
						? t('example.story.labels.framework')
						: args.label
				}
				value={value}
				onChange={setValue}
			/>
		);
	},
};
