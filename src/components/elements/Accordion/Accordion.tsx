import type { ReactNode } from 'react';
import {
	AccordionContent,
	AccordionTrigger,
	Accordion as BaseAccordion,
	AccordionItem as BaseAccordionItem,
} from '@/components/ui/accordion';

type AccordionProps = {
	children: ReactNode;
	defaultValue?: string[];
	multiple?: boolean;
};

type AccordionItemProps = {
	value: string;
	trigger: string;
	children: ReactNode;
	disabled?: boolean;
};

/** アコーディオンは、単に表示領域をコンパクトにすることだけを目的として使用しない。
 * ユーザーが必要に応じて詳細情報を展開できるような用途で使用。 */
export function Accordion({ children, defaultValue, multiple = false }: AccordionProps) {
	return (
		<BaseAccordion multiple={multiple} defaultValue={defaultValue}>
			{children}
		</BaseAccordion>
	);
}

Accordion.Item = function AccordionItem({
	value,
	trigger,
	children,
	disabled,
}: AccordionItemProps) {
	return (
		<BaseAccordionItem value={value} disabled={disabled}>
			<AccordionTrigger>{trigger}</AccordionTrigger>
			<AccordionContent>{children}</AccordionContent>
		</BaseAccordionItem>
	);
};
