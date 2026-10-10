import type { ComponentProps, ElementType } from 'react';
import { cn } from '@/lib/utils';

type StackProps<T extends ElementType = 'div'> = {
	as?: T;
	space?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
} & Omit<ComponentProps<T>, 'space' | 'as' | 'className'>;

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
				'gap-1': space === 'xs',
				'gap-2': space === 'sm',
				'gap-4': space === 'md',
				'gap-6': space === 'lg',
				'gap-8': space === 'xl',
			})}
		/>
	);
}
