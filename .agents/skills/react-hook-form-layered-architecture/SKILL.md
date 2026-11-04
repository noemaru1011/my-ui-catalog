---

name: react-hook-form-layered-architecture
description: 'Create or update React Hook Form examples in this React and TypeScript project. Use for Zod schemas, form hooks, controlled fields, validation, and separating form logic from UI.'
---

# React Hook Form Example Architecture

## Goal

Follow the form example already used in this repository. Keep validation and
form-state wiring separate from the rendered field layout, while avoiding
extra layers that the small catalog examples do not need.

The reference implementation is under `src/components/example/form/`:

```text
form/
├── schema/formExampleSchema.ts
├── hooks/useExampleForm.tsx
├── components/FormExample.tsx
├── pages/FormExamplePage.tsx
└── FormExample.stories.tsx
```

## Responsibilities

### Schema and types

- Keep this example's Zod schema, inferred form type, default values, option
  lists, and attachment limits together in
  `schema/formExampleSchema.ts`.
- Derive the form type from the schema with `z.infer`; do not maintain a
  duplicate handwritten type.
- Use Zod 4 APIs and the existing Japanese validation messages.
- This repository has no shared `@my-app/schemas` package. Do not introduce
  imports from that package or move this catalog example's schema into an
  invented shared package.
- Keep constraints consistent across the schema and UI. The current attachment
  schema requires at least one file, allows at most five, and limits each file
  to 10 MiB.

### Form hook

`useExampleForm` owns `useForm`, connects `FORM_SCHEMA` through `zodResolver`,
uses `DEFAULT_FORM_VALUES`, and returns only `register`, `control`, `errors`,
and the `handleSubmit`-wrapped `onSubmit` callback required by the UI.

- Keep form state and submit wiring in the hook.
- Preserve the inferred `FormValues` type from the schema.
- Avoid duplicating derived state or adding API, mutation, routing, or
  notification layers: the current catalog example is local and its submit
  handler logs the submitted values.
- Add submission/loading/error behavior only when the example's implementation
  actually needs it.

### Form component

`FormExample` receives typed form props and renders fields, errors, layout,
and the submit button. It does not initialize its own form state.

- Use `register` for the native-compatible `Input`, `PasswordInput`, and
  `Textarea` fields, after confirming the component forwards the expected
  input props.
- Use `Controller` for controls with their own value/change APIs: `Select`,
  `Combobox`, `ComboboxMultiple`, `Checkbox`, `Radio`, `DatePicker`,
  `DateRange`, and `FileUpload`.
- Map the actual value and callback contract for each control. For example,
  the file control uses `onFilesChange`, `onBlur`, and `inputRef`.
- Render validation messages through the field components' `error` prop.
- Use existing `Heading`, `Link`, `Button`, and layout components rather than
  introducing one-off markup or styling.

### Page and Storybook

`FormExamplePage` calls `useExampleForm` and passes its result to
`FormExample`. Keep this thin composition unless the page gains additional
responsibilities. The story registers the page from
`FormExample.stories.tsx`.

Do not add a separate Container component whose only job is forwarding the
hook's values.

## Workflow

1. Inspect the current schema, hook, UI component, and control APIs before
   changing the form.
2. Update the schema and inferred type first when field values or validation
   rules change.
3. Keep default values compatible with the schema and controlled components.
   The existing defaults are intentionally partial because some fields do not
   have a default value.
4. Wire native-compatible fields with `register` and controlled fields with
   `Controller`, matching their real callback and value shapes.
5. Keep presentation and layout in `FormExample`; keep form setup and submit
   handling in `useExampleForm`.
6. Update the Storybook story and relevant tests when the visible behavior
   changes.

## Testing

- The form hook test is
  `src/components/example/form/components/FormExample.test.tsx`; it verifies
  default validation state and the messages produced by an empty submission.
- For behavior spanning actual fields and the hook, render `FormExample` with
  real form state and schema and drive it with Testing Library
  `userEvent`. Do not mock out the resolver or field under test.
- Use the `integration-testing` skill for browser-mode integration test
  patterns and `props-based-ui-unit-tests` for isolated control tests.

Run the focused component test with:

```sh
npm run test:components -- src/components/example/form/components/FormExample.test.tsx
```

## Common Pitfalls

- Importing schemas from a package that is not present in this repository.
- Copying generic authentication architecture into the catalog's local form
  example.
- Using `register` for a component whose API is controlled, or using
  `Controller` without adapting its actual callback arguments.
- Assuming a controlled component updates its rendered value without the form
  state passing the new value back.
- Letting the file upload UI limits differ from the schema limits.
- Putting API calls or presentation JSX inside the schema module.
- Adding files or abstraction layers just to conform to a generic folder
  template.

## References

- [Choosing and wiring React Hook Form field adapters](./references/field-integration.md)
