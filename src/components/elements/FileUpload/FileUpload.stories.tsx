
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileUpload } from './FileUpload';

const meta = {
    component: FileUpload,
    tags: ['autodocs'],
    argTypes: {
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
    parameters: {
        docs: {
            description: {
                component:
                    'ファイルアップロードは、ファイルのドラッグ＆ドロップまたはファイル選択によってファイルを追加するために使用。ファイル形式、ファイルサイズ、ファイル数の制限を指定できる。',
            },
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
            maxFiles={5}
            maxSize={10}
            onFilesChange={(files) => {
                console.log('Selected files:', files);
            }}
            {...args}
        />
    ),
};
