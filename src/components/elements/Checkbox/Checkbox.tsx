import type { ComponentProps } from 'react';
import type { Option } from '@/components/types/Option';
import type { WithoutExternalStyle } from '@/components/types/WithoutExternalStyle';
import { withoutExternalStyle } from '@/components/types/WithoutExternalStyle';
import { Checkbox as BaseCheckbox } from '@/components/ui/checkbox';
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from '@/components/ui/field';

type CheckboxProps = WithoutExternalStyle<
	ComponentProps<typeof BaseCheckbox>,
	'value' | 'checked' | 'onCheckedChange' | 'disabled'
> & {
	label: string;
	options: Option[];
	value: string[];
	onChange: (value: string[]) => void;
	description?: string;
	error?: string;
	required?: boolean;
	disabled?: boolean;
};

export function Checkbox({
	label,
	options,
	value,
	onChange,
	description,
	error,
	required = false,
	disabled = false,
	...rawProps
}: CheckboxProps) {
	const props = withoutExternalStyle(rawProps);

	const handleChange = (optionValue: string, checked: boolean) => {
		if (checked) {
			onChange([...value, optionValue]);
		} else {
			onChange(value.filter((item) => item !== optionValue));
		}
	};

	return (
		<FieldSet data-invalid={!!error}>
			<FieldLegend variant="label">
				{label}
				{required && <span className="text-destructive">*</span>}
			</FieldLegend>

			{description && <FieldDescription>{description}</FieldDescription>}

			<FieldGroup className="gap-3">
				{options.map((option) => {
					const id = `${label}-${option.value}`;

					return (
						<Field key={option.value} orientation="horizontal" data-invalid={!!error}>
							<BaseCheckbox
								{...props}
								id={id}
								checked={value.includes(option.value)}
								onCheckedChange={(checked) => handleChange(option.value, checked === true)}
								disabled={disabled || option.disabled}
								aria-invalid={!!error}
							/>
							<FieldLabel htmlFor={id} className="font-normal">
								{option.label}
							</FieldLabel>
						</Field>
					);
				})}
			</FieldGroup>

			{error && <FieldError>{error}</FieldError>}
		</FieldSet>
	);
}
