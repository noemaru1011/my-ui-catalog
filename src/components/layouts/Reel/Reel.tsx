import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

type ReelProps = PropsWithChildren<{
	/**
	 * 子要素間の間隔
	 * @default 'md'
	 */
	space?: 'none' | 'sm' | 'md' | 'lg';
}>;

/**
 * 子要素を横一列に並べ、横方向にスクロールできるレイアウトコンポーネントです。
 * gap は子要素間の間隔を制御します。
 */
export function Reel({ space = 'md', children }: ReelProps) {
	const { t } = useTranslation();

	return (
		<section
			aria-label={t('horizontalScrollArea')}
			// biome-ignore lint/a11y/noNoninteractiveTabindex: Enable keyboard scrolling
			tabIndex={0}
			className={cn(
				'flex w-full flex-nowrap gap-0 overflow-x-auto',
				'[&>*]:shrink-0',
				'[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
				{
					'gap-0': space === 'none',
					'gap-2': space === 'sm',
					'gap-4': space === 'md',
					'gap-6': space === 'lg',
				},
			)}
		>
			{children}
		</section>
	);
}
