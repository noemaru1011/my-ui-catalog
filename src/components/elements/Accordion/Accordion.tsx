import type { ReactElement, ReactNode } from 'react';
import {
	AccordionContent,
	AccordionTrigger,
	Accordion as BaseAccordion,
	AccordionItem as BaseAccordionItem,
} from '@/components/ui/accordion';

type AccordionItemProps = {
	value: string;
	trigger: string;
	children: ReactNode;
	disabled?: boolean;
};

type AccordionProps = {
	/** AccordionItemPropsのみ有効です。 */
	children:
		| ReactElement<AccordionItemProps, typeof AccordionItem>
		| ReactElement<AccordionItemProps, typeof AccordionItem>[];
	defaultValue?: string[];
	multiple?: boolean;
};

/** アコーディオンは、単に表示領域をコンパクトにすることだけを目的として使用しない。
 * ユーザーが必要に応じて詳細情報を展開できるような用途で使用。 */
function AccordionItem({ value, trigger, children, disabled }: AccordionItemProps) {
	return (
		<BaseAccordionItem value={value} disabled={disabled}>
			<AccordionTrigger>{trigger}</AccordionTrigger>
			<AccordionContent>{children}</AccordionContent>
		</BaseAccordionItem>
	);
}

export function Accordion({ children, defaultValue, multiple = false }: AccordionProps) {
	return (
		<BaseAccordion multiple={multiple} defaultValue={defaultValue}>
			{children}
		</BaseAccordion>
	);
}

Accordion.Item = AccordionItem;
