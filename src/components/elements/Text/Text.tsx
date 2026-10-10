import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type TextProps = {
	children: ReactNode;
	size?: 'sm' | 'md' | 'lg';
	weight?: 'normal' | 'bold';
	color?: 'default' | 'muted';
};

const SIZE_STYLES = {
	sm: 'text-sm',
	md: 'text-base',
	lg: 'text-lg',
} as const;

const WEIGHT_STYLES = {
	normal: 'font-normal',
	bold: 'font-bold',
} as const;

const COLOR_STYLES = {
	default: 'text-foreground',
	muted: 'text-muted-foreground',
} as const;

export function Text({ children, size = 'md', weight = 'normal', color = 'default' }: TextProps) {
	return (
		<p className={cn(SIZE_STYLES[size], WEIGHT_STYLES[weight], COLOR_STYLES[color])}>{children}</p>
	);
}
