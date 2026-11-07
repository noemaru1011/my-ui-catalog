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
				<Stack as="nav" aria-label="メインメニュー" >
					<Stack as="ul" space="sm">
						<Stack as="li">
							<DrawerClose
								render={<Button variant="ghost" className="w-full justify-start" />}
							>
								ホーム
							</DrawerClose>
						</Stack>
						<Stack as="li">
							<DrawerClose
								render={<Button variant="ghost" className="w-full justify-start" />}
							>
								ユーザー
							</DrawerClose>
						</Stack>
						<Stack as="li">
							<DrawerClose
								render={<Button variant="ghost" className="w-full justify-start" />}
							>
								設定
							</DrawerClose>
						</Stack>
					</Stack>
				</Stack>
			</>
		),
	},
} satisfies Meta<typeof HamburgerMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
