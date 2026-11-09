import { createElement, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type TextTag = 'p' | 'span' | 'strong' | 'em' | 'b' | 'i' | 'code' | 'small' | 'mark' | 'time';

type TextProps = {
	children: ReactNode;
	as?: TextTag;
	size?: 'md' | 'lg';
	weight?: 'normal' | 'bold';
	color?: 'default' | 'muted';
};

const SIZE_STYLES = {
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

/** デザインの一貫性の観点からテキストもコンポーネントにする。 */
export function Text({
	children,
	as = 'p',
	size = 'md',
	weight = 'normal',
	color = 'default',
}: TextProps) {
	return createElement(
		as,
		{
			className: cn(SIZE_STYLES[size], WEIGHT_STYLES[weight], COLOR_STYLES[color]),
		},
		children,
	);
}
