import type { ComponentProps } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

type LinkProps = {
	to: ComponentProps<typeof RouterLink>['to'];
	label?: string;
	size?: 'md' | 'lg';
};

const SIZE_CLASS = {
	md: 'text-base',
	lg: 'text-lg',
} as const;

export function Link({ to, label, size = 'md' }: LinkProps) {
	return (
		<RouterLink to={to} className={cn('inline-flex items-center', SIZE_CLASS[size])}>
			<span>{label}</span>
		</RouterLink>
	);
}
