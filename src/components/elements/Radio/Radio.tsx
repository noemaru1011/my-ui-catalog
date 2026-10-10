import type { ComponentProps } from 'react';
import type { Option } from '@/components/types/Option';
import type { WithoutExternalStyle } from '@/components/types/WithoutExternalStyle';
import { withoutExternalStyle } from '@/components/types/WithoutExternalStyle';
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type RadioProps = WithoutExternalStyle<
	ComponentProps<typeof RadioGroup>,
	'disabled' | 'value' | 'onValueChange' | 'onChange'
> & {
	label: string;
	options: Option[];
	value?: string;
	onChange?: (value: string) => void;
	description?: string;
	error?: string;
	required?: boolean;
	disabled?: boolean;
};

export function Radio({
	label,
	options,
	value,
	onChange,
	description,
	error,
	required = false,
	disabled = false,
	...rawProps
}: RadioProps) {
	const props = withoutExternalStyle(rawProps);

	return (
		<FieldSet data-invalid={!!error}>
			<FieldLegend variant="label">
				{label}
				{required && <span className="text-destructive">*</span>}
			</FieldLegend>

			{description && <FieldDescription>{description}</FieldDescription>}

			<RadioGroup
				value={value}
				onValueChange={onChange}
				disabled={disabled}
				aria-invalid={!!error}
				{...props}
			>
				<FieldGroup className="gap-3">
					{options.map((option) => {
						const id = `${label}-${option.value}`;

						return (
							<Field key={option.value} orientation="horizontal" data-invalid={!!error}>
								<RadioGroupItem
									id={id}
									value={option.value}
									disabled={option.disabled}
									aria-invalid={!!error}
								/>
								<FieldLabel htmlFor={id} className="font-normal">
									{option.label}
								</FieldLabel>
							</Field>
						);
					})}
				</FieldGroup>
			</RadioGroup>

			{error && <FieldError>{error}</FieldError>}
		</FieldSet>
	);
}
