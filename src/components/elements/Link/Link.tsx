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

/** SPAなので、aタグは使わない。また、デフォルトとvisitedで色を指定済み。*/
export function Link({ to, label, size = 'md' }: LinkProps) {
	return (
		<RouterLink to={to} className={cn(SIZE_CLASS[size])}>
			<span>{label}</span>
		</RouterLink>
	);
}
