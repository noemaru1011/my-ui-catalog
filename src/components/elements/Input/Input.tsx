import { X } from 'lucide-react';
import { type ComponentProps, useEffect, useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { WithoutExternalStyle } from '@/components/types/WithoutExternalStyle';
import { withoutExternalStyle } from '@/components/types/WithoutExternalStyle';
import { Button } from '@/components/ui';
import { Badge } from '@/components/ui/badge';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Input as BaseInput } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type InputProps = WithoutExternalStyle<ComponentProps<typeof BaseInput>, 'type' | 'disabled'> & {
	/** idは指定しなかったら場合、自動採番。 */
	id?: string;
	label: string;
	type?: 'text' | 'email' | 'number' | 'tel' | 'url' | 'search';
	/** 編集不可の理由や文字数制限などを記載。 */
	description?: string;
	error?: string;
	required?: boolean;
	/** disabledはアクセシビリティの観点で使わない、readonlyも極力使用せず、表示できるか検討する。 */
	readOnly?: boolean;
	inputSize?: 'sm' | 'md' | 'lg';
};

export function Input({
	id,
	label,
	description,
	error,
	required = false,
	readOnly = false,
	inputSize = 'md',
	onChange,
	value,
	defaultValue,
	...rawProps
}: InputProps) {
	const props = withoutExternalStyle(rawProps);
	const generatedId = useId();
	const inputId = id ?? generatedId;
	const { t } = useTranslation();
	const inputRef = useRef<HTMLInputElement>(null);

	const [inputValue, setInputValue] = useState(String(value ?? defaultValue ?? ''));

	useEffect(() => {
		if (value !== undefined) {
			setInputValue(String(value ?? ''));
		}
	}, [value]);

	const sizeClass = {
		sm: 'h-7',
		md: 'h-8',
		lg: 'h-10',
	}[inputSize];

	const handleChange: ComponentProps<typeof BaseInput>['onChange'] = (event) => {
		setInputValue(event.target.value);
		onChange?.(event);
	};

	/** 入力値をクリアする。 */
	const handleClear = () => {
		const input = inputRef.current;

		if (!input) return;

		setInputValue('');

		const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;

		setter?.call(input, '');

		input.dispatchEvent(new Event('input', { bubbles: true }));
	};

	return (
		<Field data-invalid={!!error}>
			<FieldLabel htmlFor={inputId}>
				{label}
				{required && <span className="text-destructive">*</span>}
				{readOnly && <Badge variant="outline">{t('notEditable')}</Badge>}
			</FieldLabel>

			{description && <FieldDescription>{description}</FieldDescription>}

			<div className="relative">
				<BaseInput
					ref={inputRef}
					id={inputId}
					aria-invalid={!!error}
					readOnly={readOnly}
					value={value}
					defaultValue={value === undefined ? defaultValue : undefined}
					onChange={handleChange}
					className={cn(sizeClass, readOnly && 'border-dashed', inputValue && !readOnly && 'pr-9')}
					{...props}
				/>

				{inputValue && !readOnly && (
					<Button
						variant="ghost"
						tabIndex={-1}
						type="button"
						size="icon"
						onClick={handleClear}
						className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2"
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
