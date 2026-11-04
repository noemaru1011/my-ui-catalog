import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/ui/button';
import {
	DrawerClose,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from '@/components/ui/drawer';
import { Stack } from '@/components/layouts/Stack/Stack';
import { HamburgerMenu } from './HamburgerMenu';

const meta = {
	component: HamburgerMenu,
	tags: ['autodocs'],
	argTypes: {
		children: {
			control: false,
		},
	},
	args: {
		children: (
			<>
				<DrawerHeader>
					<DrawerTitle>メニュー</DrawerTitle>
					<DrawerDescription>ページを選択してください。</DrawerDescription>
				</DrawerHeader>
				<nav aria-label="メインメニュー" className="p-4">
					<Stack as="ul" space="sm">
						<li>
							<DrawerClose
								render={<Button variant="ghost" className="w-full justify-start" />}
							>
								ホーム
							</DrawerClose>
						</li>
						<li>
							<DrawerClose
								render={<Button variant="ghost" className="w-full justify-start" />}
							>
								ユーザー
							</DrawerClose>
						</li>
						<li>
							<DrawerClose
								render={<Button variant="ghost" className="w-full justify-start" />}
							>
								設定
							</DrawerClose>
						</li>
					</Stack>
				</nav>
			</>
		),
	},
} satisfies Meta<typeof HamburgerMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
