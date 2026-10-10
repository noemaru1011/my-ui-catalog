import type { Combobox as ComboboxPrimitive } from '@base-ui/react';
import type { Option } from '@/components/types/Option';
import type { WithoutExternalStyle } from '@/components/types/WithoutExternalStyle';
import { withoutExternalStyle } from '@/components/types/WithoutExternalStyle';
import {
	Combobox as BaseCombobox,
	ComboboxChip,
	ComboboxChips,
	ComboboxChipsInput,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxItem,
	ComboboxList,
	ComboboxValue,
	useComboboxAnchor,
} from '@/components/ui/combobox';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Badge } from '../../ui/badge';

type ComboboxMultipleProps = WithoutExternalStyle<
	ComboboxPrimitive.Root.Props<Option, true>,
	'items' | 'multiple' | 'disabled' | 'value' | 'onValueChange' | 'onChange'
> & {
	id: string;
	label: string;
	options: Option[];
	value?: string[];
	onChange?: (value: string[]) => void;
	description?: string;
	error?: string;
	required?: boolean;
	disabled?: boolean;
	placeholder?: string;
};

export function ComboboxMultiple({
	id,
	label,
	options,
	value = [],
	onChange,
	description,
	error,
	required = false,
	disabled = false,
	placeholder = '選択してください',
	...rawProps
}: ComboboxMultipleProps) {
	const props = withoutExternalStyle(rawProps);

	const anchor = useComboboxAnchor();
	const selectedOptions = value
		.map((selectedValue) => options.find((option) => option.value === selectedValue))
		.filter((option): option is Option => option !== undefined);

	return (
		<Field data-invalid={!!error}>
			<FieldLabel htmlFor={id}>
				{label}
				{required && <span className="text-destructive">*</span>}
				{disabled && <Badge variant="secondary">編集不可</Badge>}
			</FieldLabel>

			{description && <FieldDescription>{description}</FieldDescription>}

			<BaseCombobox<Option, true>
				{...props}
				multiple
				items={options}
				value={selectedOptions}
				onValueChange={(selected) => onChange?.(selected.map((option) => option.value))}
				disabled={disabled}
				autoHighlight
				itemToStringValue={(option) => option.label}
			>
				<ComboboxChips ref={anchor} className="w-full">
					<ComboboxValue>
						{(values) => (
							<>
								{values.map((option: Option) => (
									<ComboboxChip key={option.value}>{option.label}</ComboboxChip>
								))}
								<ComboboxChipsInput
									id={id}
									aria-invalid={!!error}
									placeholder={values.length === 0 ? placeholder : undefined}
								/>
							</>
						)}
					</ComboboxValue>
				</ComboboxChips>

				<ComboboxContent anchor={anchor}>
					<ComboboxEmpty>該当する項目がありません。</ComboboxEmpty>

					<ComboboxList>
						{(option) => (
							<ComboboxItem key={option.value} value={option} disabled={option.disabled}>
								{option.label}
							</ComboboxItem>
						)}
					</ComboboxList>
				</ComboboxContent>
			</BaseCombobox>

			{error && <FieldError>{error}</FieldError>}
		</Field>
	);
}
