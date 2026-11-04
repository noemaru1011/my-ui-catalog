import type { ComponentProps, ElementType } from 'react';
import { cn } from '@/lib/utils';

type StackProps<T extends ElementType = 'div'> = {
	as?: T;
	space?: 'sm' | 'md' | 'lg';
} & Omit<ComponentProps<T>, 'space' | 'as' | 'className'>;

/** 要素を縦方向に並べるコンポーネントです。`space` プロパティで子要素間の間隔を指定できます。`as` プロパティで HTML タグを変更できます。 */
export function Stack<T extends ElementType = 'div'>({
	as,
	space = 'md',
	...props
}: StackProps<T>) {
	// biome-ignore lint/style/useNamingConvention: Reactの動的タグ名はPascalCaseが必要
	const Component = as || 'div';

	const safeProps = { ...props } as Omit<typeof props, 'className'>;

	return (
		<Component
			{...safeProps}
			className={cn('flex flex-col', {
				'gap-2': space === 'sm',
				'gap-6': space === 'md',
				'gap-16': space === 'lg',
			})}
		/>
	);
}
