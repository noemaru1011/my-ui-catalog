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

export function Accordion({ children, defaultValue, multiple = false }: AccordionProps) {
	return (
		<BaseAccordion multiple={multiple} defaultValue={defaultValue} className="max-w-lg">
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
