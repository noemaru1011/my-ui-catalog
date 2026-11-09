
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTranslation } from 'react-i18next';
import { expect, userEvent, within } from 'storybook/test';
import { FileUpload } from './FileUpload';

const meta = {
    component: FileUpload,
    tags: ['autodocs'],
    argTypes: {
        id: {
            control: false,
        },
        name: {
            control: false,
        },
        value: {
            control: false,
        },
        onFilesChange: {
            control: false,
        },
        onBlur: {
            control: false,
        },
        inputRef: {
            control: false,
        },
    },
} satisfies Meta<typeof FileUpload>;

export default meta;

type Story = StoryObj<Omit<typeof meta, 'component'>>;

export const Default: Story = {
	render: (args) => {
		const { t } = useTranslation();
		return (
			<FileUpload
				id="file-upload"
				name="file-upload"
				accept=".pdf,.png,.jpg,.xlsx"
				multiple
				maxFiles={3}
				maxSize={1}
				onFilesChange={(files) => {
					console.log('Selected files:', files);
				}}
				{...args}
				label={t('example.story.labels.file')}
			/>
		);
	},
	play: async ({ canvasElement }) => {
			const canvas = within(canvasElement);
			const input = canvas.getByLabelText('ファイル');
			const pdf = new File(['PDF'], 'report.pdf', { type: 'application/pdf' });
			const image = new File(['image'], 'photo.png', { type: 'image/png' });
			const spreadsheet = new File(['data'], 'budget.xlsx');

			await userEvent.upload(input, [pdf, image, spreadsheet]);
			await expect(canvas.getByText('report.pdf')).toBeInTheDocument();

			await userEvent.upload(input, pdf);
			await userEvent.upload(input, new File(['text'], 'notes.txt', { type: 'text/plain' }));
			await userEvent.upload(
				input,
				new File(['x'.repeat(1024 * 1024 + 1)], 'large.pdf', { type: 'application/pdf' }),
			);
			await userEvent.upload(input, new File(['extra'], 'extra.jpg', { type: 'image/jpeg' }));

			await userEvent.click(canvas.getByRole('button', { name: 'report.pdf 削除' }));
			await expect(canvas.queryByText('report.pdf')).not.toBeInTheDocument();
	},
};
