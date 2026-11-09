import { type ComponentProps, useId } from 'react';
import { useTranslation } from 'react-i18next';
import type { WithoutExternalStyle } from '@/components/types/WithoutExternalStyle';
import { withoutExternalStyle } from '@/components/types/WithoutExternalStyle';
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
	...rawProps
}: InputProps) {
	const props = withoutExternalStyle(rawProps);
	const generatedId = useId();
	const inputId = id ?? generatedId;
	const { t } = useTranslation();

	const sizeClass = {
		sm: 'h-7',
		md: 'h-8',
		lg: 'h-10',
	}[inputSize];

	return (
		<Field data-invalid={!!error}>
			<FieldLabel htmlFor={inputId}>
				{label}
				{required && <span className="text-destructive">*</span>}
				{readOnly && <Badge variant="outline">{t('common.notEditable')}</Badge>}
			</FieldLabel>

			{description && <FieldDescription>{description}</FieldDescription>}

			<BaseInput
				id={inputId}
				aria-invalid={!!error}
				readOnly={readOnly}
				className={cn(sizeClass, readOnly && 'border-dashed')}
				{...props}
			/>

			{error && <FieldError>{error}</FieldError>}
		</Field>
	);
}
