import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ComboboxMultiple } from './ComboboxMultiple';
import { OPTIONS_WITH_DISABLED } from '@/components/types/Option.mock';

const meta = {
	component: ComboboxMultiple,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'複数の選択肢を選択できるコンボボックスです。選択肢内のグループ化には対応していません。',
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
		id: 'combobox-multiple',
		label: 'フレームワーク',
		options: OPTIONS_WITH_DISABLED,
	},
} satisfies Meta<typeof ComboboxMultiple>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const [value, setValue] = useState<string[]>([]);
		const { t } = useTranslation();

		return (
			<ComboboxMultiple
				{...args}
				label={
					args.label === 'フレームワーク'
						? t('example.story.labels.framework')
						: args.label
				}
				value={value}
				onChange={setValue}
			/>
		);
	},
};
