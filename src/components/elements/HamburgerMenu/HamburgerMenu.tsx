import { Menu } from 'lucide-react';
import type { ReactNode } from 'react';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '../../ui/button';

type HamburgerMenuProps = {
	children: ReactNode;
};

export function HamburgerMenu({ children }: HamburgerMenuProps) {
	return (
		<Drawer swipeDirection="left">
			<DrawerTrigger
				render={
					<Button type="button" variant="ghost" aria-label="メニューを開く">
						<Menu />
					</Button>
				}
			></DrawerTrigger>

			<DrawerContent>{children}</DrawerContent>
		</Drawer>
	);
}
