import type { Combobox as ComboboxPrimitive } from '@base-ui/react';
import type { Option } from '@/components/types/Option';
import type { WithoutExternalStyle } from '@/components/types/WithoutExternalStyle';
import { withoutExternalStyle } from '@/components/types/WithoutExternalStyle';
import {
	Combobox as BaseCombobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from '@/components/ui/combobox';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { cn } from '@/lib/utils';
import { Badge } from '../../ui/badge';

type ComboboxProps = WithoutExternalStyle<
	ComboboxPrimitive.Root.Props<Option>,
	'items' | 'disabled' | 'value' | 'onValueChange' | 'onChange'
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
export function Combobox({
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
}: ComboboxProps) {
	const props = withoutExternalStyle(rawProps);

	const sizeClass = {
		sm: 'h-7',
		md: 'h-8',
		lg: 'h-10',
	}[inputSize];

	const selectedOption = options.find((option) => option.value === value) ?? null;

	return (
		<Field data-invalid={!!error}>
			<FieldLabel htmlFor={id}>
				{label}
				{required && <span className="text-destructive">*</span>}
				{disabled && <Badge variant="secondary">編集不可</Badge>}
			</FieldLabel>

			{description && <FieldDescription>{description}</FieldDescription>}

			<BaseCombobox<Option>
				value={selectedOption}
				onValueChange={(option) => {
					onChange?.(option?.value ?? '');
				}}
				items={options}
				disabled={disabled}
				itemToStringValue={(option) => option.label}
				{...props}
			>
				<ComboboxInput
					id={id}
					placeholder={placeholder}
					aria-invalid={!!error}
					disabled={disabled}
					showClear
					className={cn(sizeClass, disabled && 'border-dashed')}
				/>

				<ComboboxContent>
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
