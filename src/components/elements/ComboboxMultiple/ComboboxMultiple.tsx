import type { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { useId } from 'react';
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
import { cn } from '@/lib/utils';
import { Badge } from '../../ui/badge';

type ComboboxMultipleProps = WithoutExternalStyle<
	ComboboxPrimitive.Root.Props<Option, true>,
	'items' | 'multiple' | 'disabled' | 'value' | 'onValueChange' | 'onChange'
> & {
	id?: string;
	label: string;
	options: Option[];
	value?: string[];
	onChange?: (value: string[]) => void;
	description?: string;
	error?: string;
	required?: boolean;
	disabled?: boolean;
	placeholder?: string;
	inputSize?: 'sm' | 'md' | 'lg';
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
	inputSize = 'md',
	...rawProps
}: ComboboxMultipleProps) {
	const props = withoutExternalStyle(rawProps);
	const generatedId = useId();
	const inputId = id ?? generatedId;

	const sizeClass = {
		sm: 'min-h-7',
		md: 'min-h-8',
		lg: 'min-h-10',
	}[inputSize];

	const anchor = useComboboxAnchor();
	const selectedOptions = value
		.map((selectedValue) => options.find((option) => option.value === selectedValue))
		.filter((option): option is Option => option !== undefined);

	return (
		<Field data-invalid={!!error}>
			<FieldLabel htmlFor={inputId}>
				{label}
				{required && <span className="text-destructive">*</span>}
				{disabled && <Badge variant="outline">編集不可</Badge>}
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
				<ComboboxChips
					ref={anchor}
					data-disabled={disabled}
					className={cn(
						'w-full',
						sizeClass,
						disabled &&
							'border-dashed data-[disabled=true]:bg-transparent dark:data-[disabled=true]:bg-transparent',
					)}
				>
					<ComboboxValue>
						{(values) => (
							<>
								{values.map((option: Option) => (
									<ComboboxChip key={option.value}>{option.label}</ComboboxChip>
								))}
								<ComboboxChipsInput
									id={inputId}
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
