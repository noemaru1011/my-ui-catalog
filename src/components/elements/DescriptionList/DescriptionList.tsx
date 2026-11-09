import type { ReactNode } from 'react';
import { Text } from '@/components/elements/Text/Text';
import { Stack } from '@/components/layouts/Stack/Stack';
import { cn } from '@/lib/utils';

type DescriptionListProps = {
	children: ReactNode;
};

type DescriptionListItemProps = {
	term: ReactNode;
	children: ReactNode;
};

/** 「説明したいこと」と「その説明文」のペアを1つの項目として数え、それが複数連なるようなコンテンツの時に使用します。 */
export function DescriptionList({ children }: DescriptionListProps) {
	return (
		<Stack space="none">
			<dl className={cn('flex flex-col gap-4')}>{children}</dl>
		</Stack>
	);
}

export function DescriptionListItem({ term, children }: DescriptionListItemProps) {
	return (
		<div className={cn('grid grid-cols-1 gap-1')}>
			<dt>
				<Text as="strong" weight="bold">
					{term}
				</Text>
			</dt>

			<dd>
				<Text as="p">{children}</Text>
			</dd>
		</div>
	);
}
