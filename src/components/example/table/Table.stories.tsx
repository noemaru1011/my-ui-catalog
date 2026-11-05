import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page } from './page';

const meta = {
	component: Page,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'検索・ソート・ページ送りと、行の編集・削除ができるテーブルの例です。データはStory内のモックで、保存されません。',
			},
		},
	},
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
