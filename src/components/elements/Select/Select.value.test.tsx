// biome-ignore-all lint/style/useNamingConvention: Mocked export names preserve the module API.
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Select } from './Select';

vi.mock('@/components/ui/select', () => ({
	Select: ({
		children,
		onValueChange,
	}: {
		children: React.ReactNode;
		onValueChange: (value: string | null) => void;
	}) => (
		<div>
			<button type="button" onClick={() => onValueChange(null)}>
				Clear selection
			</button>
			{children}
		</div>
	),
	SelectContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
	SelectGroup: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
	SelectItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
	SelectLabel: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
	SelectTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
	SelectValue: ({ placeholder }: { placeholder: string }) => <span>{placeholder}</span>,
}));

describe('Select の値変換', () => {
	it('空の選択値を空文字列として通知する', () => {
		const onChange = vi.fn();
		render(<Select label="言語" options={[]} onChange={onChange} />);

		fireEvent.click(screen.getByRole('button', { name: 'Clear selection' }));

		expect(onChange).toHaveBeenCalledWith('');
	});
});
