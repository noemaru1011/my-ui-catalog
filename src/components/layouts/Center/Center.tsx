import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type CenterProps = {
	children: ReactNode;
	maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
};

export function Center({ children, maxWidth = 'lg' }: CenterProps) {
	return (
		<div
			className={cn('mx-auto w-full', {
				'max-w-screen-sm': maxWidth === 'sm',
				'max-w-screen-md': maxWidth === 'md',
				'max-w-screen-lg': maxWidth === 'lg',
				'max-w-screen-xl': maxWidth === 'xl',
				'max-w-full': maxWidth === 'full',
			})}
		>
			{children}
		</div>
	);
}
