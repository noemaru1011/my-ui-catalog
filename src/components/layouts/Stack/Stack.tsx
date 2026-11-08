import type { ComponentProps, ElementType } from 'react';
import { cn } from '@/lib/utils';

type StackProps<T extends ElementType = 'div'> = {
	as?: T;
	space?: 'none' | 'sm' | 'md' | 'lg';
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
			className={cn('flex w-full flex-col', {
				'gap-0': space === 'none',
				'gap-2': space === 'sm',
				'gap-4': space === 'md',
				'gap-6': space === 'lg',
			})}
		/>
	);
}
