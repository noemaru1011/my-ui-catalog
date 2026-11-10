
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { FileUploadButton } from './FileUploadButton';

const meta = {
	component: FileUploadButton,
	tags: ['autodocs'],
	argTypes: {
		id: { control: false },
		name: { control: false },
		value: { control: false },
		onFilesChange: { control: false },
		onBlur: { control: false },
		inputRef: { control: false },
	},
} satisfies Meta<typeof FileUploadButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		fieldLabel: "ファイルを添付",
		name: 'attachments',
		accept: '.pdf,.png,.jpg',
		maxFiles: 3,
		maxSize: 1,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByLabelText('ファイルを添付');

		await userEvent.upload(
			input,
			new File(['PDF'], 'report.pdf', { type: 'application/pdf' }),
		);

		await expect(canvas.getByText('report.pdf')).toBeInTheDocument();

		await userEvent.click(
			canvas.getByRole('button', { name: 'report.pdf 削除' }),
		);

		await expect(canvas.queryByText('report.pdf')).not.toBeInTheDocument();
	},
};
