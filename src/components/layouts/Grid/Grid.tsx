import type { ReactElement, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';

type ResponsiveValue<T> = {
	default?: T;
	sm?: T;
	md?: T;
	lg?: T;
	xl?: T;
};

type ResponsiveClasses<T extends GridColumns> = Record<Breakpoint, Record<T, string>>;

type GridItemProps = {
	children: ReactNode;
	span?: GridColumns | ResponsiveValue<GridColumns>;
};

type GridProps = {
	/** GridItemPropsのみ有効です。 */
	children:
		| ReactElement<GridItemProps, typeof GridItem>
		| ReactElement<GridItemProps, typeof GridItem>[];
	columns?: GridColumns | ResponsiveValue<GridColumns>;
	space?: 'none' | 'sm' | 'md' | 'lg';
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

const RESPONSIVE_COLUMN_CLASSES: ResponsiveClasses<GridColumns> = {
	sm: {
		1: 'sm:grid-cols-1',
		2: 'sm:grid-cols-2',
		3: 'sm:grid-cols-3',
		4: 'sm:grid-cols-4',
		5: 'sm:grid-cols-5',
		6: 'sm:grid-cols-6',
		7: 'sm:grid-cols-7',
		8: 'sm:grid-cols-8',
		9: 'sm:grid-cols-9',
		10: 'sm:grid-cols-10',
		11: 'sm:grid-cols-11',
		12: 'sm:grid-cols-12',
	},
	md: {
		1: 'md:grid-cols-1',
		2: 'md:grid-cols-2',
		3: 'md:grid-cols-3',
		4: 'md:grid-cols-4',
		5: 'md:grid-cols-5',
		6: 'md:grid-cols-6',
		7: 'md:grid-cols-7',
		8: 'md:grid-cols-8',
		9: 'md:grid-cols-9',
		10: 'md:grid-cols-10',
		11: 'md:grid-cols-11',
		12: 'md:grid-cols-12',
	},
	lg: {
		1: 'lg:grid-cols-1',
		2: 'lg:grid-cols-2',
		3: 'lg:grid-cols-3',
		4: 'lg:grid-cols-4',
		5: 'lg:grid-cols-5',
		6: 'lg:grid-cols-6',
		7: 'lg:grid-cols-7',
		8: 'lg:grid-cols-8',
		9: 'lg:grid-cols-9',
		10: 'lg:grid-cols-10',
		11: 'lg:grid-cols-11',
		12: 'lg:grid-cols-12',
	},
	xl: {
		1: 'xl:grid-cols-1',
		2: 'xl:grid-cols-2',
		3: 'xl:grid-cols-3',
		4: 'xl:grid-cols-4',
		5: 'xl:grid-cols-5',
		6: 'xl:grid-cols-6',
		7: 'xl:grid-cols-7',
		8: 'xl:grid-cols-8',
		9: 'xl:grid-cols-9',
		10: 'xl:grid-cols-10',
		11: 'xl:grid-cols-11',
		12: 'xl:grid-cols-12',
	},
};

const RESPONSIVE_SPAN_CLASSES: ResponsiveClasses<GridColumns> = {
	sm: {
		1: 'sm:col-span-1',
		2: 'sm:col-span-2',
		3: 'sm:col-span-3',
		4: 'sm:col-span-4',
		5: 'sm:col-span-5',
		6: 'sm:col-span-6',
		7: 'sm:col-span-7',
		8: 'sm:col-span-8',
		9: 'sm:col-span-9',
		10: 'sm:col-span-10',
		11: 'sm:col-span-11',
		12: 'sm:col-span-12',
	},
	md: {
		1: 'md:col-span-1',
		2: 'md:col-span-2',
		3: 'md:col-span-3',
		4: 'md:col-span-4',
		5: 'md:col-span-5',
		6: 'md:col-span-6',
		7: 'md:col-span-7',
		8: 'md:col-span-8',
		9: 'md:col-span-9',
		10: 'md:col-span-10',
		11: 'md:col-span-11',
		12: 'md:col-span-12',
	},
	lg: {
		1: 'lg:col-span-1',
		2: 'lg:col-span-2',
		3: 'lg:col-span-3',
		4: 'lg:col-span-4',
		5: 'lg:col-span-5',
		6: 'lg:col-span-6',
		7: 'lg:col-span-7',
		8: 'lg:col-span-8',
		9: 'lg:col-span-9',
		10: 'lg:col-span-10',
		11: 'lg:col-span-11',
		12: 'lg:col-span-12',
	},
	xl: {
		1: 'xl:col-span-1',
		2: 'xl:col-span-2',
		3: 'xl:col-span-3',
		4: 'xl:col-span-4',
		5: 'xl:col-span-5',
		6: 'xl:col-span-6',
		7: 'xl:col-span-7',
		8: 'xl:col-span-8',
		9: 'xl:col-span-9',
		10: 'xl:col-span-10',
		11: 'xl:col-span-11',
		12: 'xl:col-span-12',
	},
};

const SPACE_CLASSES = {
	none: 'gap-0',
	sm: 'gap-2',
	md: 'gap-4',
	lg: 'gap-6',
} as const;

/**
 * レスポンシブ指定をTailwind CSSのクラス名に変換します。
 */
function getResponsiveClasses(
	value: GridColumns | ResponsiveValue<GridColumns>,
	classes: typeof COLUMN_CLASSES | typeof SPAN_CLASSES,
	responsiveClasses: ResponsiveClasses<GridColumns>,
): string[] {
	if (typeof value === 'number') {
		return [classes[value]];
	}

	return Object.entries(value).flatMap(([breakpoint, size]) => {
		if (breakpoint === 'default') {
			return [classes[size as GridColumns]];
		}

		return [responsiveClasses[breakpoint as Breakpoint][size as GridColumns]];
	});
}

function GridItem({ children, span = 12 }: GridItemProps) {
	return (
		<div className={cn(getResponsiveClasses(span, SPAN_CLASSES, RESPONSIVE_SPAN_CLASSES))}>
			{children}
		</div>
	);
}

export function Grid({ children, columns = 12, space = 'md' }: GridProps) {
	return (
		<div
			className={cn(
				'grid',
				getResponsiveClasses(columns, COLUMN_CLASSES, RESPONSIVE_COLUMN_CLASSES),
				SPACE_CLASSES[space],
			)}
		>
			{children}
		</div>
	);
}

Grid.Item = GridItem;
