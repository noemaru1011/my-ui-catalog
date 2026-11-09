import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTranslation } from 'react-i18next';
import { PasswordInput } from './PasswordInput';

const meta = {
	component: PasswordInput,
	tags: ['autodocs'],
	args: {
		label: 'パスワード',
		description: '英大文字・英小文字・数字をすべて含み、10文字以上で入力してください。'
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
} satisfies Meta<typeof PasswordInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const { t } = useTranslation();
		return (
			<PasswordInput
				{...args}
				label={
					args.label === 'パスワード'
						? t('example.story.labels.password')
						: args.label
				}
			/>
		);
	},
};
