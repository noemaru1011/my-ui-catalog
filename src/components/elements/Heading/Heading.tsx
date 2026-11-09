import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type HeadingProps = {
	children: ReactNode;
	type?: 'sectionTitle' | 'blockTitle' | 'subBlockTitle' | 'subSubBlockTitle';
};

const HEADING_STYLES = {
	sectionTitle: {
		tag: 'h1',
		className: 'text-3xl font-bold tracking-tight',
	},
	blockTitle: {
		tag: 'h2',
		className: 'text-2xl font-bold tracking-tight',
	},
	subBlockTitle: {
		tag: 'h3',
		className: 'text-xl font-semibold tracking-tight',
	},
	subSubBlockTitle: {
		tag: 'h4',
		className: 'text-lg font-semibold tracking-tight',
	},
} as const;

/** デザインの一貫性の観点からも見出しもコンポーネントにする。 */
export function Heading({ children, type = 'sectionTitle' }: HeadingProps) {
	const { tag, className: headingClassName } = HEADING_STYLES[type];

	// biome-ignore lint/style/useNamingConvention: Reactの動的タグ名はPascalCaseが必要
	const Tag = tag;

	return (
		<Tag className={cn('flex gap-2', headingClassName)}>
			<span>{children}</span>
		</Tag>
	);
}
