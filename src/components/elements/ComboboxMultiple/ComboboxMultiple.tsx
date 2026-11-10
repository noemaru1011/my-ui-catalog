import type { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';
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
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

import { Badge } from '../../ui/badge';

type ComboboxMultipleProps = WithoutExternalStyle<
	ComboboxPrimitive.Root.Props<Option, true>,
	'items' | 'multiple' | 'disabled' | 'value' | 'onValueChange' | 'onChange'
> & {
	/** idは指定しなかったら場合、自動採番。 */
	id?: string;
	label: string;
	options: Option[];
	value?: string[];
	onChange?: (value: string[]) => void;
	/** 編集不可の理由などを記載。 */
	description?: string;
	error?: string;
	required?: boolean;
	/** 極力使用せず、表示できるか検討する。 */
	disabled?: boolean;
	inputSize?: 'sm' | 'md' | 'lg';
};

const MAX_VISIBLE_CHIPS = 2;

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
	inputSize = 'md',
	...rawProps
}: ComboboxMultipleProps) {
	const props = withoutExternalStyle(rawProps);
	const generatedId = useId();
	const inputId = id ?? generatedId;
	const { t } = useTranslation();

	const sizeClass = {
		sm: 'h-7 min-h-7',
		md: 'h-8 min-h-8',
		lg: 'h-10 min-h-10',
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
				{disabled && <Badge variant="outline">{t('common.notEditable')}</Badge>}
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
						'w-full flex-nowrap overflow-hidden',
						sizeClass,
						disabled &&
							'border-dashed data-[disabled=true]:bg-transparent dark:data-[disabled=true]:bg-transparent',
					)}
				>
					<ComboboxValue>
						{(values) => {
							const visibleValues = values.slice(0, MAX_VISIBLE_CHIPS);
							const hiddenCount = values.length - MAX_VISIBLE_CHIPS;

							return (
								<>
									{visibleValues.map((option: Option) => (
										<ComboboxChip key={option.value} className="max-w-32 truncate">
											{option.label}
										</ComboboxChip>
									))}
									{hiddenCount > 0 && (
										<Tooltip>
											<TooltipTrigger
												render={
													<Badge
														variant="secondary"
														className="shrink-0 cursor-default whitespace-nowrap"
													/>
												}
											>
												+{hiddenCount}件
											</TooltipTrigger>

											<TooltipContent>
												<div className="flex max-w-xs flex-wrap gap-1">
													{values.slice(MAX_VISIBLE_CHIPS).map((option: Option) => (
														<Badge key={option.value} variant="secondary">
															{option.label}
														</Badge>
													))}
												</div>
											</TooltipContent>
										</Tooltip>
									)}

									<ComboboxChipsInput
										id={inputId}
										aria-invalid={!!error}
										placeholder={values.length === 0 ? t('common.selectPlaceholder') : undefined}
										className="min-w-8 flex-1"
									/>
								</>
							);
						}}
					</ComboboxValue>
				</ComboboxChips>

				<ComboboxContent anchor={anchor}>
					<ComboboxEmpty>{t('common.noItemsFound')}</ComboboxEmpty>

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
