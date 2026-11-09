import type { ReactNode } from 'react';
import { Children, isValidElement } from 'react';
import { Text } from '@/components/elements/Text/Text';
import { Stack } from '@/components/layouts/Stack/Stack';
import { cn } from '@/lib/utils';

type ListVariant = 'disc' | 'none' | 'number';

type ListProps = {
	children: ReactNode;
	/** variant=number の際は、番号をテキストとして出力する */
	variant?: ListVariant;
};

const LIST_STYLES: Record<ListVariant, string> = {
	disc: 'list-disc pl-6',
	none: 'list-none pl-0',
	number: 'list-none pl-0',
};

export function List({ children, variant = 'disc' }: ListProps) {
	return (
		<Stack space="sm">
			<ul className={cn(LIST_STYLES[variant], 'flex flex-col gap-2')}>
				{Children.map(children, (child, index) => {
					if (!isValidElement<ListItemProps>(child)) {
						if (child == null || typeof child === 'boolean') {
							return null;
						}

						return <ListItem>{child}</ListItem>;
					}

					return (
						<ListItem {...child.props} number={variant === 'number' ? index + 1 : undefined} />
					);
				})}
			</ul>
		</Stack>
	);
}

type ListItemProps = {
	children: ReactNode;
	number?: number;
};

export function ListItem({ children, number }: ListItemProps) {
	return (
		<li className="min-w-0">
			<div className="flex items-start gap-2">
				{number !== undefined && (
					<Text as="span" weight="normal">
						{number}.
					</Text>
				)}
				<div className="min-w-0 flex-1">{children}</div>
			</div>
		</li>
	);
}
