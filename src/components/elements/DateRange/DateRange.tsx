import { useId } from 'react';
import type { DateRange as DateRangeType } from 'react-day-picker';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Badge } from '../../ui/badge';

type DateRangeProps = {
	/** idは指定しなかったら場合、自動採番。 */
	id?: string;
	label: string;
	value?: DateRangeType;
	onChange?: (range: DateRangeType | undefined) => void;
	/** 編集不可の理由などを記載。 */
	description?: string;
	error?: string;
	required?: boolean;
	/** disabledはアクセシビリティの観点で使わない、readonlyも極力使用せず、表示できるか検討する。 */
	readOnly?: boolean;
	inputSize?: 'sm' | 'md' | 'lg';
	numberOfMonths?: number;
};

export function DateRange({
	id,
	label,
	value,
	onChange,
	description,
	error,
	required = false,
	readOnly = false,
	inputSize = 'md',
	numberOfMonths = 2,
}: DateRangeProps) {
	const generatedId = useId();
	const inputId = id ?? generatedId;
	const sizeClass = {
		sm: 'h-7',
		md: 'h-8',
		lg: 'h-10',
	}[inputSize];

	const formatDate = (date: Date | undefined) => {
		return date?.toLocaleDateString('ja-JP');
	};

	const { t } = useTranslation();
	const displayValue = value?.from
		? value.to
			? `${formatDate(value.from)} - ${formatDate(value.to)}`
			: `${formatDate(value.from)} -`
		: undefined;

	return (
		<Field data-invalid={!!error}>
			<FieldLabel htmlFor={inputId}>
				{label}
				{required && <span className="text-destructive">*</span>}
				{readOnly && <Badge variant="outline">{t('common.notEditable')}</Badge>}
			</FieldLabel>

			{description && <FieldDescription>{description}</FieldDescription>}

			<Popover>
				<PopoverTrigger
					render={
						<Button
							id={inputId}
							variant="outline"
							disabled={readOnly}
							aria-invalid={!!error}
							className={cn(
								'w-full justify-start font-normal',
								sizeClass,
								!displayValue && 'text-muted-foreground',
								readOnly && 'border-dashed',
							)}
						>
							{displayValue ?? t('common.dateRangePlaceholder')}
						</Button>
					}
				/>

				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						mode="range"
						selected={value}
						onSelect={onChange}
						defaultMonth={value?.from}
						numberOfMonths={numberOfMonths}
						captionLayout="dropdown"
						startMonth={new Date(1900, 0)}
						endMonth={new Date(2100, 11)}
					/>
				</PopoverContent>
			</Popover>

			{error && <FieldError>{error}</FieldError>}
		</Field>
	);
}
