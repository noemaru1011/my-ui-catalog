import type { ReactNode } from 'react';

type ContainerProps = {
	children?: ReactNode;
	width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
};

const WIDTH_CLASS = {
	xs: 'w-full max-w-xs',
	sm: 'w-full max-w-sm',
	md: 'w-full max-w-md',
	lg: 'w-full max-w-lg',
	xl: 'w-full max-w-xl',
	'2xl': 'w-full max-w-2xl',
	'3xl': 'w-full max-w-3xl',
	'4xl': 'w-full max-w-4xl',
	'5xl': 'w-full max-w-5xl',
	'6xl': 'w-full max-w-6xl',
	'7xl': 'w-full max-w-7xl',
	full: 'w-full',
} as const;

/** コンテンツの最大幅を制限するレイアウトコンポーネントです。 */
export function Container({ children, width = 'full' }: ContainerProps) {
	return <div className={WIDTH_CLASS[width]}>{children}</div>;
}
