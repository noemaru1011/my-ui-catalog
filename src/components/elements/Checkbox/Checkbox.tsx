import { type ComponentProps, useId } from 'react';
import { useTranslation } from 'react-i18next';
import type { Option } from '@/components/types/Option';
import type { WithoutExternalStyle } from '@/components/types/WithoutExternalStyle';
import { withoutExternalStyle } from '@/components/types/WithoutExternalStyle';
import { Badge } from '@/components/ui/badge';
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
	/** 編集不可の理由などを記載。 */
	description?: string;
	error?: string;
	required?: boolean;
	/** disabledはアクセシビリティの観点で使わない、readonlyも極力使用せず、表示できるか検討する。 */
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
	const { t } = useTranslation();
	const generatedId = useId();

	const handleChange = (optionValue: string, checked: boolean) => {
		if (checked) {
			onChange([...value, optionValue]);
		} else {
			onChange(value.filter((item) => item !== optionValue));
		}
	};

	return (
		<FieldSet data-invalid={!!error} className="gap-2">
			<FieldLegend variant="label" className={error ? 'text-destructive mb-0' : 'mb-0'}>
				{label}
				{required && <span className="text-destructive">*</span>}
				{disabled && <Badge variant="outline">{t('common.notEditable')}</Badge>}
			</FieldLegend>

			{description && <FieldDescription>{description}</FieldDescription>}

			<FieldGroup className="mt-2 gap-4">
				{options.map((option, index) => {
					const id = `${generatedId}-${index}`;

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
