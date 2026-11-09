import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DataTable } from './data-table';

const MOCKS = vi.hoisted(() => ({
	flexRender: vi.fn(() => 'Rendered header'),
}));

vi.mock('@tanstack/react-table', async (importOriginal) => {
	const actual = await importOriginal<typeof import('@tanstack/react-table')>();
	return {
		...actual,
		useTable: () => ({
			getColumn: () => ({
				getFilterValue: () => undefined,
				setFilterValue: vi.fn(),
			}),
			getFilteredRowModel: () => ({ rows: [] }),
			getHeaderGroups: () => [
				{
					id: 'header-group',
					headers: [
						{ id: 'placeholder', isPlaceholder: true },
						{ id: 'name', isPlaceholder: false },
					],
				},
			],
			// biome-ignore lint/style/useNamingConvention: TanStack Table API property.
			FlexRender: MOCKS.flexRender,
			getRowModel: () => ({ rows: [] }),
			getCanPreviousPage: () => false,
			getCanNextPage: () => false,
			getPageCount: () => 1,
			setPageIndex: vi.fn(),
			previousPage: vi.fn(),
			nextPage: vi.fn(),
		}),
	};
});

describe('DataTable の見出し描画', () => {
	it('placeholder 見出しは省略し、通常の見出しだけを描画する', () => {
		render(<DataTable data={[]} />);

		expect(screen.getByText('Rendered header')).toBeInTheDocument();
		expect(MOCKS.flexRender).toHaveBeenCalledOnce();
	});
});
