import type { ReactElement, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type GridItemProps = {
	children: ReactNode;
	span?: GridColumns;
	className?: string;
};

type GridProps = {
	/** GridItemPropsのみ有効です。 */
	children:
		| ReactElement<GridItemProps, typeof GridItem>
		| ReactElement<GridItemProps, typeof GridItem>[];
	columns?: GridColumns;
	space?: 'none' | 'sm' | 'md' | 'lg';
	className?: string;
};

const COLUMN_CLASSES = {
	1: 'grid-cols-1',
	2: 'grid-cols-2',
	3: 'grid-cols-3',
	4: 'grid-cols-4',
	5: 'grid-cols-5',
	6: 'grid-cols-6',
	7: 'grid-cols-7',
	8: 'grid-cols-8',
	9: 'grid-cols-9',
	10: 'grid-cols-10',
	11: 'grid-cols-11',
	12: 'grid-cols-12',
} as const;

const SPAN_CLASSES = {
	1: 'col-span-1',
	2: 'col-span-2',
	3: 'col-span-3',
	4: 'col-span-4',
	5: 'col-span-5',
	6: 'col-span-6',
	7: 'col-span-7',
	8: 'col-span-8',
	9: 'col-span-9',
	10: 'col-span-10',
	11: 'col-span-11',
	12: 'col-span-12',
} as const;

const SPACE_CLASSES = {
	none: 'gap-0',
	sm: 'gap-2',
	md: 'gap-4',
	lg: 'gap-6',
} as const;

function GridItem({ children, span = 12, className }: GridItemProps) {
	return <div className={cn(SPAN_CLASSES[span], className)}>{children}</div>;
}

export function Grid({ children, columns = 12, space = 'md', className }: GridProps) {
	return (
		<div className={cn('grid', COLUMN_CLASSES[columns], SPACE_CLASSES[space], className)}>
			{children}
		</div>
	);
}

Grid.Item = GridItem;
