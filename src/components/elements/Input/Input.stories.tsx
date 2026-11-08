import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTranslation } from 'react-i18next';
import { Input } from './Input';

const meta = {
	component: Input,
	tags: ['autodocs'],
	args: {
		id: 'input',
		label: '名前',
	},
	argTypes: {
		id: {
			control: false,
		},
		inputSize: {
			control: 'inline-radio',
			options: ['sm', 'md', 'lg'],
		}
	}
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const { t } = useTranslation();
		return (
			<Input
				{...args}
				label={args.label === '名前' ? t('example.story.labels.name') : args.label}
			/>
		);
	},
};
