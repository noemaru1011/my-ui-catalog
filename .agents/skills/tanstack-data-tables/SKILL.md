---

name: tanstack-data-tables
description: Use when creating, refactoring, or debugging data tables in this React project with TanStack Table v9. Covers feature registration, column definitions, sorting, filtering, pagination, row actions, and the project's table file structure.
---

# TanStack Data Tables

## Goal

Build flexible, type-safe data tables with TanStack Table v9 and the project's
existing table and UI components. Keep table-specific behavior close to the
feature while sharing only configuration that is genuinely reusable.

Use this skill when:

- Creating or refactoring a TanStack-powered data table.
- Adding column sorting, filtering, pagination, selection, or row actions.
- Debugging row models, column definitions, or table state.
- Deciding where table feature configuration and table UI should live.

## Project Structure

Follow the shadcn data-table separation, adapted to this Vite application:

```text
src/components/example/<table-name>/
├── columns.tsx
├── data-table.tsx
├── page.tsx
└── <FeatureName>.stories.tsx

src/lib/data-table-features.ts
```

- `columns.tsx` defines the row type and column definitions. Keep cell UI and
  row-action rendering here; pass callbacks and edit state in through typed
  options rather than coupling columns to the data table's internal state.
- `data-table.tsx` owns TanStack state, constructs the table, and renders
  filters, the table, empty states, and pagination.
- `page.tsx` supplies the example data and composes the data table. Keep data
  loading or feature-specific data preparation at this boundary.
- `*.stories.tsx` registers the page/component with Storybook.
- `src/lib/data-table-features.ts` owns shared TanStack feature registration.
  Keep this configuration in `lib` rather than an individual example folder
  when it is intended for use by multiple tables.
- The current example is `src/components/example/table/`; its story is
  `TableExample.stories.tsx`, and the shared feature configuration is
  `src/lib/data-table-features.ts`.

For a one-off table whose features are not shared, keep its feature
configuration local rather than expanding the shared library without need.

## Workflow

### 1. Inspect the Installed API and Existing Patterns

- Check `package.json` and the lockfile for the installed TanStack Table major
  version. This project uses `@tanstack/react-table` v9.
- Inspect the project's `Table` components and current feature configuration
  before using APIs from external examples.
- Do not copy v8 APIs such as `getCoreRowModel`, `flexRender`, or
  `useReactTable` into v9 code without confirming that the installed API
  supports them.
- Use the project's `useTable`, `table.FlexRender`, and `tableFeatures`
  patterns where appropriate.

### 2. Register Only the Required Features

- Add the feature plugins and row models needed by the table in
  `src/lib/data-table-features.ts`.
- Register filter and sort functions referenced by columns. A column's
  `filterFn` or sorting behavior must correspond to a function registered in
  the feature configuration when that feature requires registration.
- Extend the shared setup only when multiple tables should use the behavior.
- Keep the feature type derived from the configured features:

  ```ts
  export type DataTableFeatures = typeof features;
  ```

- Pass the same feature type to the column helper and `useTable` so column
  definitions and table APIs stay aligned.

### 3. Define Typed Columns

- Define a row type that represents the actual table data.
- Build columns with `createColumnHelper<DataTableFeatures, RowType>()`.
- Use accessor columns for row data and display columns for controls that do
  not represent a data field.
- Keep action columns out of sorting unless sorting has meaningful behavior
  for those controls.
- Pass event handlers, draft values, and editing identifiers to column
  definitions using explicit option types.
- Use the project's existing `Button`, `Input`, `Cluster`, and other UI
  components rather than introducing one-off controls.

### 4. Control State and Render the Table

- Store enabled sorting, filtering, and pagination state in React state and
  provide both the `state` and matching `on...Change` handlers to the table.
- Read row models and capability methods from the TanStack table instance
  instead of reimplementing the transformations.
- Render header groups and cells with `table.FlexRender`.
- Render a clear empty state when the current row model has no rows.
- Derive visible counts from the filtered row model; account for an empty
  result when calculating displayed row ranges.
- If changing a filter can leave the user on an invalid page, reset the page
  index as part of the filter update. In the current example, the explicit
  reset button returns to the first page; changing the name filter does not
  currently reset pagination.
- Keep the semantic table markup (`TableHeader`, `TableBody`, `TableRow`,
  `TableHead`, `TableCell`, and `TableCaption`) and accessible control names.

### 5. Verify the Example

- Run the focused Biome check for changed table files:

  ```sh
  npx biome check <changed-table-files>
  ```

- Type-check the application:

  ```sh
  npx tsc --noEmit -p tsconfig.app.json
  ```

- If the table is exposed through Storybook, build Storybook to verify story
  discovery and rendering:

  ```sh
  npm run build-storybook
  ```

- Add or update tests for user-visible behavior when the table behavior
  changes; cover sorting, filtering, pagination, and row actions as applicable.

## Common Pitfalls

- Mixing examples for TanStack Table v8 and v9. Confirm the installed
  version's APIs before changing table construction or rendering.
- Adding a column filter or custom sorting behavior without registering the
  required filter/sort function in the feature configuration.
- Keeping feature configuration inside a table example when it is shared, or
  adding a one-off behavior to shared `lib` configuration prematurely.
- Duplicating filtering, sorting, or pagination manually instead of reading
  the configured TanStack row models.
- Using filtered-row counts for ranges without handling the zero-result case.
- Coupling column definitions to local state through closures. Pass explicit,
  typed options so columns can be reused and reasoned about independently.
- Omitting empty states, accessible labels, or disabled states for pagination
  controls.

## References

- [Project table architecture and implementation checklist](./references/table-architecture.md)
- [shadcn Data Table guide](https://ui.shadcn.com/docs/components/base/data-table)
