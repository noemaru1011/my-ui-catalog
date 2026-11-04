# Table Architecture

Use this structure for a table example:

```text
src/components/example/<table-name>/
├── columns.tsx
├── data-table.tsx
├── page.tsx
└── <FeatureName>.stories.tsx

src/lib/data-table-features.ts
```

## Responsibilities

### `columns.tsx`

- Export the row type used by the table.
- Define accessor columns and display-only columns with
  `createColumnHelper<Features, RowType>()`.
- Keep action and editable cell UI in the column definitions.
- Receive event handlers and edit state through a typed options object.
- Avoid importing the page or data-table component.

### `src/lib/data-table-features.ts`

- Register reusable TanStack v9 feature plugins, row models, and named filter
  or sort functions.
- Export the `features` object and derive the table feature type from it.
- Keep example-specific configuration local if there is no real shared use.

### `data-table.tsx`

- Accept typed row data through props.
- Own controlled sorting, filtering, pagination, and editing state.
- Create the column definitions with explicit callbacks and state values.
- Construct the table with the registered features and controlled state.
- Render table headers and cells with `table.FlexRender`.
- Present empty results, result counts, and pagination controls.

### `page.tsx`

- Provide the sample data for the example.
- Render the data table with that data.
- Keep backend-specific fetching out of presentational column definitions.

### Storybook story

- Register the page or table component as a Storybook story.
- Keep the story focused on rendering and documentation metadata rather than
  duplicating table behavior.
- In the current example, the story is named `TableExample.stories.tsx`.

## State and Row Models

Provide controlled state and its matching callbacks for every interactive
feature enabled by the table:

```tsx
const table = useTable<Features, RowType>({
	features,
	data,
	columns,
	state: { sorting, columnFilters, pagination },
	onSortingChange: setSorting,
	onColumnFiltersChange: setColumnFilters,
	onPaginationChange: setPagination,
});
```

Use the configured row models to display rows and counts. Use the filtered
model for total matching records, and the table row model for rows visible on
the current page. For a displayed range, show `0` when the filtered count is
zero and reset the page index when filters are cleared or changed as needed.
The current example resets the page when its reset button is used, but not
when the name filter changes; add that behavior if filtering can otherwise
leave the current page out of range.

## User-Visible Checks

When table interactions change, verify the relevant behavior through the UI:

- Column headers sort in both directions and expose their sort state.
- Filters reduce rows and can be cleared.
- Pagination changes visible rows and disables unavailable directions.
- Edit and cancel preserve or discard the draft as expected.
- Save updates the displayed row and delete removes the selected row.
- No matching rows produce an understandable empty state.

Use the project's components and accessible labels when querying controls in
tests. Avoid assertions on TanStack's internal state when the rendered
behavior can be tested directly.
