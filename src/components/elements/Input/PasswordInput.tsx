import { Button } from '@base-ui/react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { type ComponentProps, useState } from 'react';
import type { WithoutExternalStyle } from '@/components/types/WithoutExternalStyle';
import { withoutExternalStyle } from '@/components/types/WithoutExternalStyle';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { cn } from '@/lib/utils';
import { Badge } from '../../ui/badge';

type PasswordInputProps = WithoutExternalStyle<
	ComponentProps<typeof InputGroupInput>,
	'type' | 'disabled'
> & {
	id: string;
	label: string;
	description?: string;
	error?: string;
	required?: boolean;
	readOnly?: boolean;
	inputSize?: 'sm' | 'md' | 'lg';
};

export function PasswordInput({
	id,
	label,
	description,
	error,
	required = false,
	readOnly = false,
	inputSize = 'md',
	...rawProps
}: PasswordInputProps) {
	const props = withoutExternalStyle(rawProps);

	const [visible, setVisible] = useState(false);

	const sizeClass = {
		sm: 'h-7 text-sm',
		md: 'h-8 text-sm',
		lg: 'h-10 text-base',
	}[inputSize];

	return (
		<Field data-invalid={!!error}>
			<FieldLabel htmlFor={id}>
				{label}
				{required && <span className="text-destructive">*</span>}
				{readOnly && <Badge variant="secondary">編集不可</Badge>}
			</FieldLabel>

			{description && <FieldDescription>{description}</FieldDescription>}

			<InputGroup className={cn(sizeClass, readOnly && 'border-dashed')}>
				<InputGroupInput
					id={id}
					type={visible ? 'text' : 'password'}
					aria-invalid={!!error}
					readOnly={readOnly}
					{...props}
				/>

				<InputGroupAddon align="inline-end">
					<Button
						tabIndex={-1}
						type="button"
						onClick={() => setVisible((prev) => !prev)}
						disabled={readOnly}
						aria-label={visible ? 'パスワードを隠す' : 'パスワードを表示'}
					>
						{visible ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
					</Button>
				</InputGroupAddon>
			</InputGroup>

			{error && <FieldError>{error}</FieldError>}
		</Field>
	);
}
