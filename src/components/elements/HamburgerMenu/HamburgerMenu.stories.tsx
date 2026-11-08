import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTranslation } from 'react-i18next';
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
		children: null,
	},
} satisfies Meta<typeof HamburgerMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		const { t } = useTranslation();
		return (
			<HamburgerMenu>
				<DrawerHeader>
					<DrawerTitle>{t('example.story.hamburger.menu')}</DrawerTitle>
					<DrawerDescription>{t('example.story.hamburger.selectPage')}</DrawerDescription>
				</DrawerHeader>
				<Stack as="nav" aria-label={t('example.story.hamburger.mainMenu')}>
					<Stack as="ul" space="sm">
						{(['home', 'user', 'settings'] as const).map((page) => (
							<Stack as="li" key={page}>
								<DrawerClose
									render={<Button variant="ghost" className="w-full justify-start" />}
								>
									{t(`example.story.hamburger.${page}`)}
								</DrawerClose>
							</Stack>
						))}
					</Stack>
				</Stack>
			</HamburgerMenu>
		);
	},
};
