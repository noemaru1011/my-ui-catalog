import { type ComponentProps, useId } from 'react';
import { useTranslation } from 'react-i18next';
import type { Option } from '@/components/types/Option';
import type { WithoutExternalStyle } from '@/components/types/WithoutExternalStyle';
import { withoutExternalStyle } from '@/components/types/WithoutExternalStyle';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import {
	Select as BaseSelect,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Badge } from '../../ui/badge';

type SelectProps = WithoutExternalStyle<
	ComponentProps<typeof BaseSelect>,
	'disabled' | 'value' | 'onValueChange'
> & {
	id?: string;
	label: string;
	options: Option[];
	value?: string;
	onChange?: (value: string) => void;
	description?: string;
	error?: string;
	required?: boolean;
	disabled?: boolean;
	placeholder?: string;
	inputSize?: 'sm' | 'md' | 'lg';
};

export function Select({
	id,
	label,
	options,
	value,
	onChange,
	description,
	error,
	required = false,
	disabled = false,
	placeholder,
	inputSize = 'md',
	...rawProps
}: SelectProps) {
	const props = withoutExternalStyle(rawProps);
	const generatedId = useId();
	const triggerId = id ?? generatedId;
	const { t } = useTranslation();
	placeholder = placeholder ?? t('common.selectPlaceholder');

	const triggerSizes = {
		sm: 'sm',
		md: 'default',
		lg: 'lg',
	} as const;
	const triggerSize = triggerSizes[inputSize];

	const items = options.map((option) => ({
		value: option.value,
		label: option.label,
	}));

	return (
		<Field data-invalid={!!error}>
			<FieldLabel htmlFor={triggerId}>
				{label}
				{required && <span className="text-destructive">*</span>}
				{disabled && <Badge variant="outline">{t('common.notEditable')}</Badge>}
			</FieldLabel>

			{description && <FieldDescription>{description}</FieldDescription>}

			<BaseSelect
				{...props}
				items={items}
				value={value ?? null}
				onValueChange={(value) => onChange?.(typeof value === 'string' ? value : '')}
				disabled={disabled}
			>
				<SelectTrigger
					id={triggerId}
					aria-invalid={!!error}
					size={triggerSize}
					className={cn(
						'w-full',
						disabled && 'border-dashed disabled:bg-transparent dark:disabled:bg-transparent',
					)}
				>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>

				<SelectContent>
					<SelectGroup>
						<SelectLabel>{label}</SelectLabel>
						{options.map((option) => (
							<SelectItem key={option.value} value={option.value} disabled={option.disabled}>
								{option.label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</BaseSelect>

			{error && <FieldError>{error}</FieldError>}
		</Field>
	);
}
