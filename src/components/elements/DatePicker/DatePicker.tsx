import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Badge } from '../../ui/badge';

type DatePickerProps = {
	id: string;
	label: string;
	value?: Date;
	onChange?: (date: Date | undefined) => void;
	description?: string;
	error?: string;
	required?: boolean;
	/** 値が確定している場合など、日付の変更を禁止する */
	readOnly?: boolean;
	placeholder?: string;
	inputSize?: 'sm' | 'md' | 'lg';
};

export function DatePicker({
	id,
	label,
	value,
	onChange,
	description,
	error,
	required = false,
	readOnly = false,
	placeholder = '日付を選択',
	inputSize = 'md',
}: DatePickerProps) {
	const sizeClass = {
		sm: 'h-7',
		md: 'h-8',
		lg: 'h-10',
	}[inputSize];

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
								!value && 'text-muted-foreground',
								readOnly && 'border-dashed',
							)}
						>
							{value ? format(value, 'yyyy/MM/dd') : placeholder}
						</Button>
					}
				/>

				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						mode="single"
						selected={value}
						onSelect={onChange}
						defaultMonth={value}
						captionLayout="dropdown"
					/>
				</PopoverContent>
			</Popover>

			{error && <FieldError>{error}</FieldError>}
		</Field>
	);
}
