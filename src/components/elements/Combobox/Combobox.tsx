import type { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';
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
	/** idは指定しなかったら場合、自動採番。 */
	id?: string;
	label: string;
	options: Option[];
	value?: string;
	onChange?: (value: string) => void;
	/** 編集不可の理由などを記載。 */
	description?: string;
	error?: string;
	required?: boolean;
	/** 極力使用せず、表示できるか検討する。 */
	disabled?: boolean;
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
	inputSize = 'md',
	...rawProps
}: ComboboxProps) {
	const props = withoutExternalStyle(rawProps);
	const generatedId = useId();
	const inputId = id ?? generatedId;
	const { t } = useTranslation();

	const sizeClass = {
		sm: 'h-7',
		md: 'h-8',
		lg: 'h-10',
	}[inputSize];

	const selectedOption = options.find((option) => option.value === value) ?? null;
	return (
		<Field data-invalid={!!error}>
			<FieldLabel htmlFor={inputId}>
				{label}
				{required && <span className="text-destructive">*</span>}
				{disabled && <Badge variant="outline">{t('common.notEditable')}</Badge>}
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
					id={inputId}
					placeholder={t('common.selectPlaceholder')}
					aria-invalid={!!error}
					disabled={disabled}
					showClear
					className={cn(sizeClass, disabled && 'border-dashed')}
				/>

				<ComboboxContent>
					<ComboboxEmpty> {t('common.noItemsFound')}</ComboboxEmpty>

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
