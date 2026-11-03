import type { ComponentProps, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

type LinkProps = {
	to: ComponentProps<typeof RouterLink>['to'];
	label?: string;
	prefix?: ReactNode;
	suffix?: ReactNode;
	size?: 'sm' | 'md' | 'lg';
};

const SIZE_CLASS = {
	sm: 'text-sm [&_svg]:size-3',
	md: 'text-base [&_svg]:size-4',
	lg: 'text-lg [&_svg]:size-5',
} as const;

export function Link({ to, label, prefix, suffix, size = 'md' }: LinkProps) {
	return (
		<RouterLink to={to} className={cn('inline-flex items-center text-blue-600', SIZE_CLASS[size])}>
			{prefix && <span className="underline">{prefix}</span>}
			<span className="underline">{label}</span>
			{suffix && <span className="underline">{suffix}</span>}
		</RouterLink>
	);
}
