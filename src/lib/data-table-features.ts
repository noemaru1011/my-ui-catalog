import {
	columnFilteringFeature,
	createFilteredRowModel,
	createPaginatedRowModel,
	createSortedRowModel,
	filterFn_includesString,
	rowPaginationFeature,
	rowSortingFeature,
	sortFn_alphanumeric,
	sortFn_text,
	tableFeatures,
} from '@tanstack/react-table';

export function features() {
	return tableFeatures({
		columnFilteringFeature,
		rowPaginationFeature,
		rowSortingFeature,
		filteredRowModel: createFilteredRowModel(),
		paginatedRowModel: createPaginatedRowModel(),
		sortedRowModel: createSortedRowModel(),
		filterFns: {
			includesString: filterFn_includesString,
		},
		sortFns: {
			alphanumeric: sortFn_alphanumeric,
			text: sortFn_text,
		},
	});
}

export type DataTableFeatures = ReturnType<typeof features>;
