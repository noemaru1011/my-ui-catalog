import type { DateRange as DateRangeType } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Badge } from '../../ui/badge';

type DateRangeProps = {
	id: string;
	label: string;
	value?: DateRangeType;
	onChange?: (range: DateRangeType | undefined) => void;
	description?: string;
	error?: string;
	required?: boolean;
	/** 値が確定している場合など、日付の変更を禁止する */
	readOnly?: boolean;
	placeholder?: string;
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
	placeholder = '期間を選択',
	inputSize = 'md',
	numberOfMonths = 2,
}: DateRangeProps) {
	const sizeClass = {
		sm: 'h-7',
		md: 'h-8',
		lg: 'h-10',
	}[inputSize];

	const formatDate = (date: Date | undefined) => {
		return date?.toLocaleDateString('ja-JP');
	};

	const displayValue = value?.from
		? value.to
			? `${formatDate(value.from)} - ${formatDate(value.to)}`
			: `${formatDate(value.from)} -`
		: undefined;

	return (
		<Field data-invalid={!!error}>
			<FieldLabel htmlFor={id}>
				{label}
				{required && <span className="text-destructive">*</span>}
				{readOnly && <Badge variant="secondary">編集不可</Badge>}
			</FieldLabel>

			{description && <FieldDescription>{description}</FieldDescription>}

			<Popover>
				<PopoverTrigger
					render={
						<Button
							id={id}
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
							{displayValue ?? placeholder}
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
					/>
				</PopoverContent>
			</Popover>

			{error && <FieldError>{error}</FieldError>}
		</Field>
	);
}
