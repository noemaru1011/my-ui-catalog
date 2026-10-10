import type { Option } from './Option';

export const OPTIONS: Option[] = [
	{
		value: 'typescript',
		label: 'TypeScript',
	},
	{
		value: 'javascript',
		label: 'JavaScript',
	},
	{
		value: 'python',
		label: 'Python',
	},
];

export const OPTIONS_WITH_DISABLED: Option[] = [
	...OPTIONS,
	{
		value: 'rust',
		label: 'Rust',
		disabled: true,
	},
];
