import type { ReactNode } from 'react';

type ContainerProps = {
	children?: ReactNode;

	width?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
};

const WIDTH_CLASS = {
	sm: 'w-full max-w-64',
	md: 'w-full max-w-72',
	lg: 'w-full max-w-80',
	xl: 'w-full max-w-96',
	'2xl': 'w-full max-w-2xl',
	'3xl': 'w-full max-w-3xl',
	full: 'w-full',
};

export function Container({ children, width = 'full' }: ContainerProps) {
	return <div className={WIDTH_CLASS[width]}>{children}</div>;
}
