
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileUpload } from './FileUpload';

const meta = {
    component: FileUpload,
    tags: ['autodocs'],
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
    render: () => (
        <FileUpload
            accept=".pdf,.png,.jpg,.xlsx"
            multiple
            maxFiles={5}
            maxSize={10}
            onFilesChange={(files) => {
                console.log('Selected files:', files);
            }}
        />
    ),
};
