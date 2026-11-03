import type { ComponentProps } from 'react';
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
import { Badge } from '../../ui/badge';

type SelectProps = WithoutExternalStyle<
	ComponentProps<typeof BaseSelect>,
	'disabled' | 'value' | 'onValueChange'
> & {
	id: string;
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
	placeholder = '選択してください',
	inputSize = 'md',
	...rawProps
}: SelectProps) {
	const props = withoutExternalStyle(rawProps);

	const triggerSizes = {
		sm: 'sm',
		md: 'default',
		lg: 'lg',
	} as const;
	const triggerSize = triggerSizes[inputSize];

	return (
		<Field data-invalid={!!error}>
			<FieldLabel htmlFor={id}>
				{label}
				{required && <span className="text-destructive">*</span>}
				{disabled && <Badge variant="secondary">編集不可</Badge>}
			</FieldLabel>

			{description && <FieldDescription>{description}</FieldDescription>}

			<BaseSelect
				value={value}
				onValueChange={(value) => onChange?.(typeof value === 'string' ? value : '')}
				disabled={disabled}
				{...props}
			>
				<SelectTrigger id={id} aria-invalid={!!error} size={triggerSize} className="w-full">
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
