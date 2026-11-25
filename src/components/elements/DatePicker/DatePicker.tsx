import { format } from 'date-fns';
import { X } from 'lucide-react';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Badge } from '../../ui/badge';

type DatePickerProps = {
	/** idは指定しなかったら場合、自動採番。 */
	id?: string;
	label: string;
	value?: Date;
	onChange?: (date: Date | undefined) => void;
	/** 編集不可の理由などを記載。 */
	description?: string;
	error?: string;
	required?: boolean;
	/** disabledはアクセシビリティの観点で使わない、readonlyも極力使用せず、表示できるか検討する。 */
	readOnly?: boolean;
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
	inputSize = 'md',
}: DatePickerProps) {
	const generatedId = useId();
	const inputId = id ?? generatedId;
	const sizeClass = {
		sm: 'h-7',
		md: 'h-8',
		lg: 'h-10',
	}[inputSize];
	const { t } = useTranslation();

	return (
		<Field data-invalid={!!error}>
			<FieldLabel htmlFor={inputId}>
				{label}
				{required && <span className="text-destructive">*</span>}
				{readOnly && <Badge variant="outline">{t('notEditable')}</Badge>}
			</FieldLabel>

			{description && <FieldDescription>{description}</FieldDescription>}

			<div className="relative">
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
									!value && 'text-muted-foreground',
									value && !readOnly && 'pr-9',
									readOnly && 'border-dashed',
								)}
							>
								{value ? format(value, 'yyyy/MM/dd') : t('datePickerPlaceholder')}
							</Button>
						}
					/>

					<PopoverContent aria-label={label} className="w-auto p-0" align="start">
						<Calendar
							mode="single"
							selected={value}
							onSelect={onChange}
							defaultMonth={value}
							captionLayout="dropdown"
							startMonth={new Date(1900, 0)}
							endMonth={new Date(2100, 11)}
						/>
					</PopoverContent>
				</Popover>

				{value && !readOnly && (
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className="text-muted-foreground hover:text-foreground absolute top-1/2 right-1 size-6 -translate-y-1/2"
						onClick={() => onChange?.(undefined)}
						aria-label={t('clearInput')}
					>
						<X size={4} />
					</Button>
				)}
			</div>

			{error && <FieldError>{error}</FieldError>}
		</Field>
	);
}
