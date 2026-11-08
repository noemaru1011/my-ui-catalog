import type { ReactNode } from 'react';
import { Text } from '@/components/elements/Text/Text';
import { Stack } from '@/components/layouts/Stack/Stack';
import { cn } from '@/lib/utils';

type ListVariant = 'disc' | 'none' | 'number';

type ListProps = {
	children: ReactNode;
	variant?: ListVariant;
	className?: string;
};

type ListItemProps = {
	children: ReactNode;
	className?: string;
};

const LIST_STYLES: Record<ListVariant, string> = {
	disc: 'list-disc pl-6',
	none: 'list-none pl-0',
	number: 'list-none pl-0 [counter-reset:list-counter]',
};

export function List({ children, variant = 'disc', className }: ListProps) {
	return (
		<Stack space="sm">
			<ul
				className={cn(
					LIST_STYLES[variant],
					'flex flex-col gap-2',
					variant === 'number' && '[&>li]:[counter-increment:list-counter]',
					variant === 'number' && '[&>li_.list-number]:block',
					className,
				)}
			>
				{children}
			</ul>
		</Stack>
	);
}

export function ListItem({ children, className }: ListItemProps) {
	return (
		<li className={cn('min-w-0', className)}>
			<div className="flex items-start gap-2">
				<span className="list-number hidden">
					<Text as="span" weight="normal">
						<span className="before:content-[counter(list-counter,decimal-leading-zero)]" />
					</Text>
				</span>

				<div className="min-w-0 flex-1">{children}</div>
			</div>
		</li>
	);
}
