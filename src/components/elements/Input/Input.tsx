import type { ComponentProps } from 'react';
import type { WithoutExternalStyle } from '@/components/types/WithoutExternalStyle';
import { withoutExternalStyle } from '@/components/types/WithoutExternalStyle';
import { Badge } from '@/components/ui/badge';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Input as BaseInput } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type InputProps = WithoutExternalStyle<ComponentProps<typeof BaseInput>, 'type' | 'disabled'> & {
	id: string;
	label: string;
	type?: 'text' | 'email' | 'number' | 'tel' | 'url' | 'search';
	/** 編集不可の理由や文字数制限などを記載 */
	description?: string;
	error?: string;
	required?: boolean;
	/** 値が確定している時や、コピペする可能性がある場合(disabledは使わない) */
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

			<BaseInput
				id={id}
				aria-invalid={!!error}
				readOnly={readOnly}
				className={cn(sizeClass, readOnly && 'border-dashed')}
				{...props}
			/>

			{error && <FieldError>{error}</FieldError>}
		</Field>
	);
}
