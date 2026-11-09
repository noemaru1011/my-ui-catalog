import { Button } from '@base-ui/react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { type ComponentProps, useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
	/** idは指定しなかったら場合、自動採番。 */
	id?: string;
	label: string;
	/** 編集不可の理由や文字数制限などを記載。 */
	description?: string;
	error?: string;
	required?: boolean;
	/** disabledはアクセシビリティの観点で使わない、readonlyも極力使用せず、表示できるか検討する。 */
	readOnly?: boolean;
	inputSize?: 'sm' | 'md' | 'lg';
};

/** Inputタグ type=Password の専用コンポーネント、アイコンを押すことで type=text に切り替えができる。(確認が目的)*/
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
	const generatedId = useId();
	const inputId = id ?? generatedId;
	const { t } = useTranslation();

	const [visible, setVisible] = useState(false);

	const sizeClass = {
		sm: 'h-7 text-base',
		md: 'h-8 text-base',
		lg: 'h-10 text-base',
	}[inputSize];

	return (
		<Field data-invalid={!!error}>
			<FieldLabel htmlFor={inputId}>
				{label}
				{required && <span className="text-destructive">*</span>}
				{readOnly && <Badge variant="outline">{t('common.notEditable')}</Badge>}
			</FieldLabel>

			{description && <FieldDescription>{description}</FieldDescription>}

			<InputGroup className={cn(sizeClass, readOnly && 'border-dashed')}>
				<InputGroupInput
					id={inputId}
					type={visible ? 'text' : 'password'}
					aria-invalid={!!error}
					readOnly={readOnly}
					{...props}
				/>

				<InputGroupAddon align="inline-end">
					<Button
						//タブを押してもスキップ
						tabIndex={-1}
						type="button"
						onClick={() => setVisible((prev) => !prev)}
						disabled={readOnly}
						aria-label={visible ? t('common.hidePassword') : t('common.showPassword')}
					>
						{visible ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
					</Button>
				</InputGroupAddon>
			</InputGroup>

			{error && <FieldError>{error}</FieldError>}
		</Field>
	);
}
