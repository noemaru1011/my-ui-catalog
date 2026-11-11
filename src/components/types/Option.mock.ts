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
		label: 'Rust(非活性は非推奨です。用いる場合は、理由などを記載してください。)',
		disabled: true,
	},
];
