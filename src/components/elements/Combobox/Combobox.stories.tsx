import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Combobox } from './Combobox';
import { OPTIONS_WITH_DISABLED } from '@/components/types/Option.mock';

const meta = {
	component: Combobox,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: '選択肢内のグループ化やマルチセレクトなどは非対応です。',
			},
		},
	},
	argTypes: {
		id: {
			control: false,
		},
		options: {
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
		id: 'combobox',
		label: '言語',
		options: OPTIONS_WITH_DISABLED,
	},
} satisfies Meta<typeof Combobox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const [value, setValue] = useState<string | undefined>(undefined);
		const { t } = useTranslation();

		return (
			<Combobox
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
