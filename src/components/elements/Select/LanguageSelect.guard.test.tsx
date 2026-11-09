// biome-ignore-all lint/style/useNamingConvention: Mocked export names preserve the module API.
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LanguageSelect } from './LanguageSelect';

vi.mock('@/components/elements/Select/Select', () => ({
	Select: ({
		label,
		options,
		onChange,
	}: {
		label: string;
		options: { value: string; label: string }[];
		onChange?: (value: string) => void;
	}) => (
		<div>
			<span>{label}</span>
			{options.map((option) => (
				<button key={option.value} type="button" onClick={() => onChange?.(option.value)}>
					{option.label}
				</button>
			))}
			<button type="button" onClick={() => onChange?.('fr')}>
				Unsupported
			</button>
		</div>
	),
}));

describe('LanguageSelect の値検証', () => {
	it('対応していない言語コードは通知しない', () => {
		const onChange = vi.fn();
		render(<LanguageSelect onChange={onChange} />);

		fireEvent.click(screen.getByRole('button', { name: 'Unsupported' }));

		expect(onChange).not.toHaveBeenCalled();
	});
});
