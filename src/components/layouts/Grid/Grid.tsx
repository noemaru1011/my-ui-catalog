import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type GridProps = {
	children: ReactNode;
	columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
	space?: 'none' | 'sm' | 'md' | 'lg';
	//** レスポンシブ対応用にclassNameを受け取れるようにする。 */
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

const SPACE_CLASSES = {
	none: 'gap-0',
	sm: 'gap-2',
	md: 'gap-4',
	lg: 'gap-6',
} as const;

export function Grid({ children, columns = 12, space = 'md', className }: GridProps) {
	return (
		<div className={cn('grid', COLUMN_CLASSES[columns], SPACE_CLASSES[space], className)}>
			{children}
		</div>
	);
}
