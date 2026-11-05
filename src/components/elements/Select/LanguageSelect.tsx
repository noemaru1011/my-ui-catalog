import type { ComponentProps } from 'react';
import { Select } from '@/components/elements/Select/Select';
import type { Option } from '@/components/types/Option';

export type Language = 'ja' | 'en';

type Props = Omit<ComponentProps<typeof Select>, 'options' | 'value' | 'onChange'> & {
	value?: Language;
	onChange?: (value: Language) => void;
};

const DEFAULT_LANGUAGES: Option[] = [
	{
		value: 'ja',
		label: '日本語',
	},
	{
		value: 'en',
		label: 'English',
	},
];

export function LanguageSelect(props: Props) {
	return (
		<Select
			{...props}
			options={DEFAULT_LANGUAGES}
			onChange={(value) => {
				if (value === 'ja' || value === 'en') {
					props.onChange?.(value);
				}
			}}
		/>
	);
}
