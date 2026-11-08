import type { ReactNode } from 'react';
import { Text } from '@/components/elements/Text/Text';
import { Stack } from '@/components/layouts/Stack/Stack';
import { cn } from '@/lib/utils';

type DescriptionListProps = {
	children: ReactNode;
	className?: string;
};

type DescriptionListItemProps = {
	term: ReactNode;
	children: ReactNode;
	className?: string;
};

export function DescriptionList({ children, className }: DescriptionListProps) {
	return (
		<Stack space="none">
			<dl className={cn('flex flex-col gap-4', className)}>{children}</dl>
		</Stack>
	);
}

export function DescriptionListItem({ term, children, className }: DescriptionListItemProps) {
	return (
		<div className={cn('grid grid-cols-1 gap-1', className)}>
			<dt>
				<Text as="strong" weight="bold">
					{term}
				</Text>
			</dt>

			<dd>
				<Text as="p">{children}</Text>
			</dd>
		</div>
	);
}
