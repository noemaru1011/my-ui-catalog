import type { ComponentProps, ElementType } from 'react';
import { cn } from '@/lib/utils';

type StackProps<T extends ElementType = 'div'> = {
	as?: T;
	space?: 'none' | 'sm' | 'md' | 'lg';
} & Omit<ComponentProps<T>, 'space' | 'as' | 'className' | 'style'>;

/** 要素を縦方向に並べるコンポーネントです。`space` プロパティで子要素間の間隔を指定できます。`as` プロパティで HTML タグを変更できます。 */
export function Stack<T extends ElementType = 'div'>({
	as,
	space = 'md',
	...props
}: StackProps<T>) {
	// biome-ignore lint/style/useNamingConvention: Reactの動的タグ名はPascalCaseが必要
	const Component = as || 'div';

	const gapClass = (() => {
		switch (space) {
			case 'none':
				return 'gap-0';
			case 'sm':
				return 'gap-2';
			case 'md':
				return 'gap-4';
			case 'lg':
				return 'gap-6';
		}
	})();

	return <Component {...props} className={cn('flex w-full flex-col', gapClass)} />;
}
