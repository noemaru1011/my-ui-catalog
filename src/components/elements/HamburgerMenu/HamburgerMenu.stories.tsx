import type { Meta, StoryObj } from '@storybook/react-vite';
import { HamburgerMenu } from './HamburgerMenu';

const meta = {
	component: HamburgerMenu,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		children: {
			control: false,
		},
	},
	args: {
		children: (
			<nav>
				<ul className="space-y-4">
					<li>ホーム</li>
					<li>ユーザー</li>
					<li>設定</li>
				</ul>
			</nav>
		),
	},
} satisfies Meta<typeof HamburgerMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
