// biome-ignore-all lint/style/useNamingConvention: Mocked export names preserve the module API.
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { OPTIONS } from '@/components/types/Option.mock';
import { Combobox } from './Combobox';

vi.mock('@/components/ui/combobox', async (importOriginal) => {
	const actual = await importOriginal<typeof import('@/components/ui/combobox')>();
	return {
		...actual,
		Combobox: ({
			children,
			onValueChange,
		}: {
			children: React.ReactNode;
			onValueChange: (value: null) => void;
		}) => (
			<div>
				<button type="button" onClick={() => onValueChange(null)}>
					Clear selection
				</button>
				{children}
			</div>
		),
		ComboboxInput: (props: React.ComponentProps<'input'> & { showClear?: boolean }) => (
			<input {...props} />
		),
		ComboboxContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
		ComboboxEmpty: () => null,
		ComboboxItem: () => null,
		ComboboxList: () => null,
	};
});

describe('Combobox の値変換', () => {
	it('選択値が null の場合は空文字列を通知する', () => {
		const onChange = vi.fn();
		render(<Combobox label="言語" options={OPTIONS} onChange={onChange} />);

		fireEvent.click(screen.getByRole('button', { name: 'Clear selection' }));

		expect(onChange).toHaveBeenCalledWith('');
	});
});
