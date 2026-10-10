import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

type ClusterProps = PropsWithChildren<{
	space?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	justify?: 'start' | 'center' | 'end' | 'between';
	align?: 'start' | 'center' | 'end' | 'stretch';
}>;

export function Cluster({
	space = 'md',
	justify = 'start',
	align = 'center',
	children,
}: ClusterProps) {
	return (
		<div
			className={cn(
				'flex flex-wrap',
				{
					'gap-1': space === 'xs',
					'gap-2': space === 'sm',
					'gap-4': space === 'md',
					'gap-6': space === 'lg',
					'gap-8': space === 'xl',
				},
				{
					'justify-start': justify === 'start',
					'justify-center': justify === 'center',
					'justify-end': justify === 'end',
					'justify-between': justify === 'between',
				},
				{
					'items-start': align === 'start',
					'items-center': align === 'center',
					'items-end': align === 'end',
					'items-stretch': align === 'stretch',
				},
			)}
		>
			{children}
		</div>
	);
}
