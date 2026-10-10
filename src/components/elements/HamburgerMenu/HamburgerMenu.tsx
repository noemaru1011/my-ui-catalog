import { Menu } from 'lucide-react';
import type { ReactNode } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '../../ui/button';

type HamburgerMenuProps = {
	children: ReactNode;
};

export function HamburgerMenu({ children }: HamburgerMenuProps) {
	return (
		<Sheet>
			<SheetTrigger
				render={
					<Button type="button" variant="ghost" aria-label="メニューを開く">
						<Menu />
					</Button>
				}
			></SheetTrigger>

			<SheetContent side="left">{children}</SheetContent>
		</Sheet>
	);
}
