---

name: integration-testing
description: Use when creating or debugging React integration tests that exercise real hooks, schemas, components, and user interactions together. Covers React Hook Form, Zod validation, Vitest browser mode with Playwright, and end-to-end behavior checks.
---

# Integration Testing

## Goal

Verify that related parts of a feature work together through observable
behavior. Integration tests should exercise the real UI, form state, validation
schema, and user actions rather than mocking the feature's core logic.

Use this skill when:

- Testing a form component together with its React Hook Form hook and Zod
  schema.
- Testing validation, submission, async states, or interactions across
  multiple UI controls.
- Testing behavior in a real browser with the project's Vitest + Playwright
  browser mode.

For isolated tests of a single props-driven component, use the
`props-based-ui-unit-tests` skill instead.

## Project Test Setup

- The project uses Vitest with two projects configured in `vite.config.ts`:
  `components` and `storybook`.
- The `components` project runs `src/**/*.test.{ts,tsx}` in Chromium using
  Vitest browser mode and Playwright.
- Tests use React Testing Library, `@testing-library/user-event`, and the
  shared setup in `src/test/setup.ts`.
- Run an integration test with:

  ```sh
  npm run test:components -- src/components/example/form/components/FormExample.test.tsx
  ```

- Do not assume a standalone `@playwright/test` suite or app server is
  configured. Use the existing Vitest Playwright setup unless the project
  configuration is intentionally changed.
- The current form example is under
  `src/components/example/form/`: its schema and inferred values are local to
  the example, its hook owns `useForm`, and its component renders the fields.
  The existing `FormExample.test.tsx` verifies the hook's validation state;
  add component-level integration coverage when the user-visible workflow is
  the subject of the test.

## Workflow

### 1. Trace the feature path

Before writing a test, inspect the page, UI component, custom hook, schema,
and relevant control components. Determine how a user action travels through
the UI to form state, validation, and submission. For the existing form
example, use `FORM_SCHEMA` and `FormValues` from
`src/components/example/form/schema/formExampleSchema.ts`; do not import a
nonexistent shared schemas package.

Test a user-visible behavior across the appropriate layers. Do not duplicate
unit tests for every control or test private implementation details.

### 2. Render real application logic

Use the real feature hook and schema/resolver. Do not mock `useForm`, the
resolver, or component callbacks when the purpose is to verify their
integration.

For a presentation component that receives form props, a small harness can
create the form state:

```tsx
function renderForm() {
	function InnerForm() {
		const {
			register,
			control,
			handleSubmit,
			formState: { errors },
		} = useForm({
			resolver: zodResolver(FORM_SCHEMA),
			defaultValues: DEFAULT_FORM_VALUES,
		});

		return (
			<FormExample
				register={register}
				control={control}
				errors={errors}
				onSubmit={handleSubmit(onSubmit)}
			/>
		);
	}

	return render(<InnerForm />);
}
```

Prefer rendering the real feature page when it can be mounted in the test
environment. Use a harness only to supply providers or observe a specific
submission outcome.

### 3. Wrap required providers

Provide the minimum required application context, such as `MemoryRouter` for
router links or theme/query providers when the tested path requires them.
Prefer real lightweight providers over mocking router or form internals.

### 4. Drive the UI as a user

Use accessible Testing Library queries and awaited `userEvent` interactions:

```tsx
const user = userEvent.setup();

await user.type(screen.getByRole('textbox', { name: '氏名' }), '山田太郎');
await user.click(screen.getByRole('button', { name: '送信' }));
```

Prefer `getByRole`, `getByLabelText`, and `findBy...` queries over CSS selectors
or implementation-specific DOM traversal. Use `findBy...` when UI updates
asynchronously.

### 5. Assert end-to-end behavior at the feature boundary

Cover representative workflows, as appropriate:

- Initial values and rendered fields.
- Invalid submission and user-visible validation messages.
- Correcting invalid values clears or updates errors.
- Valid submission reaches the submit handler with the expected values.
- Async success, failure, loading, and disabled states where the feature
  implements them.

Keep tests focused. Avoid repeating exhaustive component-level prop coverage
already handled by unit tests.

## Form-Specific Guidance

- Reuse the feature's real schema, default values, and custom hook.
- Use `register` for inputs that support its ref/event/value contract and
  `Controller` for controlled fields, following the actual component APIs.
- Confirm each controlled widget's value shape and callback signature. Values
  may be strings, arrays, dates, ranges, or files.
- Verify that validation errors are presented through the rendered UI, not
  only by inspecting the hook's internal error object.
- For a valid-submission test, observe the submitted values with a test-owned
  spy or callback, without replacing the validation/resolver path.
- Do not use unsafe casts to make the harness compile. Match the schema's
  inferred type and actual submit event contract.

## Playwright Browser Mode

- Use the project's configured Vitest browser mode for real-browser component
  integration tests.
- Keep browser interactions deterministic and await each `userEvent` action.
- Use Playwright-specific APIs only through a supported API in the installed
  Vitest/browser setup; do not assume a global `page` fixture or an
  `@playwright/test` runner is configured.
- Use a separate standalone Playwright E2E setup only when the application
  entry point, server lifecycle, configuration, and scripts are intentionally
  established for it.

## Common Pitfalls

- Rendering a routed component without `MemoryRouter` when it contains a
  router `Link`.
- Passing the full `useForm()` return object to a component expecting only
  `register`, `control`, `errors`, and `onSubmit`.
- Testing only the schema or hook when the requirement is UI integration.
- Mocking the logic whose integration is under test.
- Assuming a controlled field updates itself after `onChange`; the form
  controller or parent must feed the new value back.
- Using a query that does not match the actual accessible name or custom
  control role. Inspect the rendered DOM before weakening or changing an
  assertion.
- Claiming a test is E2E merely because it uses Playwright. Vitest browser-mode
  tests exercise UI in a real browser but are distinct from a standalone
  Playwright test suite that launches the complete application.

## References

- [React form integration patterns](./references/react-form-integration-testing.md)
