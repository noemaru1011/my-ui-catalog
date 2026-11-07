import type { ComponentProps } from 'react';
import { type ReactNode, useId } from 'react';
import { Cluster } from '@/components/layouts/Cluster/Cluster';
import { Label } from '@/components/ui/label';
import { Switch as BaseSwitch } from '@/components/ui/switch';

type SwitchProps = Omit<ComponentProps<typeof BaseSwitch>, 'id' | 'aria-label'> & {
	'aria-label': string;
	label?: ReactNode;
	labelPosition?: 'left' | 'right';
	id?: string;
};

export function Switch({
	id,
	label,
	labelPosition = 'left',
	'aria-label': ariaLabel,
	...switchProps
}: SwitchProps) {
	const generatedId = useId();
	const switchId = id ?? generatedId;

	const switchElement = <BaseSwitch {...switchProps} id={switchId} aria-label={ariaLabel} />;

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
