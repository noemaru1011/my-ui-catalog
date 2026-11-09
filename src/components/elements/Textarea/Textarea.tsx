import { type ComponentProps, useId } from 'react';
import { useTranslation } from 'react-i18next';
import type { WithoutExternalStyle } from '@/components/types/WithoutExternalStyle';
import { withoutExternalStyle } from '@/components/types/WithoutExternalStyle';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Textarea as BaseTextarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Badge } from '../../ui/badge';

type TextareaProps = WithoutExternalStyle<ComponentProps<typeof BaseTextarea>, 'disabled'> & {
	/** idは指定しなかったら場合、自動採番。 */
	id?: string;
	label: string;
	/** 編集不可の理由や文字数制限などを記載。 */
	description?: string;
	error?: string;
	required?: boolean;
	/** disabledはアクセシビリティの観点で使わない、readonlyも極力使用せず、表示できるか検討する。 */
	readOnly?: boolean;
};

export function Textarea({
	id,
	label,
	description,
	error,
	required = false,
	readOnly = false,
	...rawProps
}: TextareaProps) {
	const props = withoutExternalStyle(rawProps);
	const generatedId = useId();
	const textareaId = id ?? generatedId;
	const { t } = useTranslation();

	return (
		<Field data-invalid={!!error}>
			<FieldLabel htmlFor={textareaId}>
				{label}
				{required && <span className="text-destructive">*</span>}
				{readOnly && <Badge variant="outline">{t('common.notEditable')}</Badge>}
			</FieldLabel>

			{description && <FieldDescription>{description}</FieldDescription>}

			<BaseTextarea
				id={textareaId}
				aria-invalid={!!error}
				readOnly={readOnly}
				className={cn(readOnly && 'border-dashed')}
				{...props}
			/>

			{error && <FieldError>{error}</FieldError>}
		</Field>
	);
}
