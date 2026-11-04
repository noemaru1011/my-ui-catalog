import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

type ClusterProps = PropsWithChildren<{
	/**
	 * 子要素間の間隔
	 * @default 'md'
	 */
	space?: 'sm' | 'md' | 'lg';
	/**
	 * 水平方向の配置
	 * @default 'start'
	 */
	justify?: 'start' | 'center' | 'end' | 'between';
	/**
	 * 垂直方向の配置
	 * @default 'center'
	 */
	align?: 'start' | 'center' | 'end' | 'stretch';
}>;

/** 子要素を横方向に並べるレイアウトコンポーネントです。space は要素間の間隔、justify は水平方向の配置、align は垂直方向の配置を制御します。子要素が収まらない場合は自動的に折り返します。 */
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
					'gap-2': space === 'sm',
					'gap-6': space === 'md',
					'gap-16': space === 'lg',
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
