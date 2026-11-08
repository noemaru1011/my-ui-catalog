
import type { Meta, StoryObj } from '@storybook/react-vite';
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
    render: (args) => (
        <FileUpload
            id="file-upload"
            name="file-upload"
            accept=".pdf,.png,.jpg,.xlsx"
            label='ファイル'
            multiple
            maxFiles={3}
            maxSize={1}
            onFilesChange={(files) => {
                console.log('Selected files:', files);
            }}
            {...args}
        />
    ),
};
