import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Radio } from './Radio';
import { OPTIONS_WITH_DISABLED } from '@/components/types/Option.mock';

const meta = {
	component: Radio,
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
		label: '言語',
		options: OPTIONS_WITH_DISABLED,
		value: '',
		onChange: () => { },
	},
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const [value, setValue] = useState('');
		const { t } = useTranslation();

		return (
			<Radio
				{...args}
				label={
					args.label === '言語'
						? t('example.story.labels.language')
						: args.label
				}
				value={value}
				onChange={setValue}
			/>
		);
	},
};
