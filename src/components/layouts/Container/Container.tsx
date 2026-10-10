import type { ReactNode } from 'react';

type ContainerProps = {
	children?: ReactNode;

	width?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
};

const WIDTH_CLASS = {
	sm: 'w-64',
	md: 'w-72',
	lg: 'w-80',
	xl: 'w-96',
	'2xl': 'w-2xl',
	'3xl': 'w-3xl',
	full: 'w-full',
};

export function Container({ children, width = 'full' }: ContainerProps) {
	return <div className={WIDTH_CLASS[width]}>{children}</div>;
}
