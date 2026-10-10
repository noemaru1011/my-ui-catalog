import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { Center } from '../../layouts/Center/Center';
import { Link } from '../Link/Link';
import { Text } from '../Text/Text';
import { Accordion } from './Accordion';

const meta = {
	component: Accordion,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'アコーディオンは、単に表示領域をコンパクトにすることだけを目的として使用しない。ユーザーが必要に応じて詳細情報を展開できるような用途で使用。',
			},
		},
	},
	decorators: [
		(Story) => (
			<MemoryRouter>
				<Center maxWidth="xl">
					<Story />
				</Center>
			</MemoryRouter>
		),
	],
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<Omit<typeof meta, 'component'>>;

export const Default: Story = {
	render: () => (
		<Accordion defaultValue={["item-1"]}>
			<Accordion.Item value="item-1" trigger="パスワードをリセットするには？">
				<Text size="sm">ログイン画面からパスワードをリセットできます。</Text>
				<Link to="#" label="質問一覧に戻る" size="sm" />
			</Accordion.Item>

			<Accordion.Item value="item-2" trigger="契約プランを変更できますか？">
				<Text size="sm">アカウント設定からいつでも契約プランを変更できます。</Text>
				<Link to="#" label="質問一覧に戻る" size="sm" />
			</Accordion.Item>

			<Accordion.Item value="item-3" trigger="利用できる支払い方法は？" disabled>
				<Text size="sm">クレジットカード、銀行振込などをご利用いただけます。</Text>
				<Link to="#" label="質問一覧に戻る" size="sm" />
			</Accordion.Item>
		</Accordion>
	),
};
