import { type ComponentProps, type ReactNode, useId } from 'react';
import { Cluster } from '@/components/layouts/Cluster/Cluster';
import type { WithoutExternalStyle } from '@/components/types/WithoutExternalStyle';
import { withoutExternalStyle } from '@/components/types/WithoutExternalStyle';
import { Label } from '@/components/ui/label';
import { Switch as BaseSwitch } from '@/components/ui/switch';

type SwitchProps = WithoutExternalStyle<
	ComponentProps<typeof BaseSwitch>,
	'id' | 'aria-label' | 'disabled'
> & {
	/** idを指定しない場合は自動採番。 */
	id?: string;
	label?: ReactNode;
	/** アクセシビリティの観点から必ず指定する。 */
	'aria-label': string;
	labelPosition?: 'left' | 'right';
	/** 極力使用せず、表示できるか検討する。 */
	disabled?: boolean;
};

export function Switch({
	id,
	label,
	labelPosition = 'left',
	'aria-label': ariaLabel,
	disabled = false,
	...rawProps
}: SwitchProps) {
	const props = withoutExternalStyle(rawProps);
	const generatedId = useId();
	const switchId = id ?? generatedId;

	const switchElement = (
		<BaseSwitch {...props} id={switchId} aria-label={ariaLabel} disabled={disabled} />
	);

	if (!label) {
		return switchElement;
	}

	const labelElement = <Label htmlFor={switchId}>{label}</Label>;

	return (
		<Cluster space="sm" align="center">
			{labelPosition === 'left' ? (
				<>
					{labelElement}
					{switchElement}
				</>
			) : (
				<>
					{switchElement}
					{labelElement}
				</>
			)}
		</Cluster>
	);
}
