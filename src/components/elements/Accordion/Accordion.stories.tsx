import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from '../Link/Link';
import { Text } from '../Text/Text';
import { Accordion } from './Accordion';

const meta = {
	component: Accordion,
	tags: ['autodocs'],
	args: {
		defaultValue: ['item-1'],
	},
	argTypes: {
		children: {
			control: false,
		},
		defaultValue: {
			control: false,
		},
	},
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<Omit<typeof meta, 'component'>>;

export const Default: Story = {
	render: (args) => (
		<Accordion {...args}>
			<Accordion.Item
				value="item-1"
				trigger="パスワードをリセットするには？"
			>
				<Text>ログイン画面からパスワードをリセットできます。</Text>
				<Link to="#" label="質問一覧に戻る" />
			</Accordion.Item>

			<Accordion.Item
				value="item-2"
				trigger="契約プランを変更できますか？"
			>
				<Text>アカウント設定からいつでも契約プランを変更できます。</Text>
				<Link to="#" label="質問一覧に戻る" />
			</Accordion.Item>

			<Accordion.Item
				value="item-3"
				trigger="利用できる支払い方法は？"
				disabled
			>
				<Text>クレジットカード、銀行振込などをご利用いただけます。</Text>
				<Link to="#" label="質問一覧に戻る" />
			</Accordion.Item>
		</Accordion>
	),
};