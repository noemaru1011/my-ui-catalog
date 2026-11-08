import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileUploadButton } from './FileUploadButton';

const meta = {
	component: FileUploadButton,
	tags: ['autodocs'],
	argTypes: {
		id: { control: false },
		name: { control: false },
		value: { control: false },
		onFilesChange: { control: false },
		onError: { control: false },
		onBlur: { control: false },
		inputRef: { control: false },
	},
} satisfies Meta<typeof FileUploadButton>;

export default meta;

type Story = StoryObj<Omit<typeof meta, 'component'>>;

export const Default: Story = {
	render: (args) => (
		<FileUploadButton
			name="attachments"
			accept=".pdf,.png,.jpg"
			maxFiles={3}
			maxSize={1}
			{...args}
		/>
	),
};
