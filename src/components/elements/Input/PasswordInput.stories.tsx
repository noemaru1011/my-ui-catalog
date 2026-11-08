import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTranslation } from 'react-i18next';
import { PasswordInput } from './PasswordInput';

const meta = {
	component: PasswordInput,
	tags: ['autodocs'],
	args: {
		id: 'password',
		label: 'パスワード',
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
