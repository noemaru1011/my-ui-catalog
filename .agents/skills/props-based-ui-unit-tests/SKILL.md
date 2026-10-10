---
name: props-based-ui-unit-tests
description: Create, review, and debug unit tests for props-driven UI components, especially React components using Vitest and React Testing Library. Use for form controls and general UI components to test prop-based rendering, user interactions, callbacks, conditional content, accessibility, validation, disabled states, fixtures, and edge cases.
---

# Props-Based UI Unit Tests

## Goal

Create reliable unit tests for UI components whose rendering and behavior depend on props. This guidance applies to React components, including form controls, buttons, dialogs, tabs, accordions, cards, menus, and other interactive or presentational components.

Verify observable behavior and public contracts rather than implementation details.

## Workflow

### 1. Inspect the component first

- Read the component implementation, prop types, related child components, and relevant fixtures or mocks.
- Identify required and optional props, default values, conditional rendering, state ownership, and callback signatures.
- Determine whether the component is controlled, uncontrolled, or a mixture.
- Inspect mock data before writing expectations. Never infer fixture contents from a variable name alone.

### 2. Follow repository conventions

- Reuse the existing test runner, testing utilities, setup files, aliases, and naming style.
- In a Vitest + React Testing Library project, common imports are:

  ```tsx
  import { render, screen } from '@testing-library/react';
  import userEvent from '@testing-library/user-event';
  import { describe, expect, it, vi } from 'vitest';
  ```

- Use `userEvent.setup()` for realistic user interactions.
- Use `vi.fn()` for callback spies when using Vitest.
- Do not add dependencies or change project configuration unless required and explicitly permitted.

### 3. Build a behavior-oriented test plan

Select relevant cases; do not mechanically apply every category to every component.

- **Default rendering:** expected text, labels, icons, and key child elements.
- **Prop-driven rendering:** variants, sizes, class/state attributes, content, and conditional sections.
- **Controlled values:** values supplied through props are reflected in the UI.
- **User interactions:** clicking, typing, selecting, submitting, opening, closing, toggling, keyboard actions, and other supported events.
- **Callbacks:** the correct callback is invoked with the expected arguments and call count.
- **Conditional content:** descriptions, helper text, errors, empty states, loading states, and optional regions.
- **Accessibility:** roles, accessible names, labels, keyboard behavior, ARIA attributes, and focus behavior where relevant.
- **Disabled and read-only behavior:** blocked controls or actions cannot trigger behavior that should be prevented.
- **Boundary and edge cases:** empty arrays, missing optional props, long text, unusual values, repeated actions, and relevant invalid inputs.
- **Composition:** child content, slots, nested components, and interaction between related props.
- **Error behavior:** error states and recovery behavior when these are part of the public contract.

### 4. Keep tests isolated and readable

- Give each test one clear behavior to verify.
- Create fresh callback mocks and user-event instances for each test.
- Render the smallest useful component setup for the scenario.
- Use descriptive test names that explain the expected behavior.
- Avoid duplicating nearly identical tests when a small parameterized test would be clearer.
- Do not assert incidental DOM structure unless that structure is part of the contract.

### 5. Test controlled components correctly

- Pass the intended value through props.
- Trigger the user action.
- Assert the callback payload.
- Remember that invoking a callback does not automatically update a controlled component's prop value. If testing the resulting rendered state, rerender with the updated prop or use a stateful test harness.

## Queries and assertions

- Prefer accessible queries, especially `getByRole` with an accessible name for interactive elements:

  ```tsx
  screen.getByRole('button', { name: 'Save' });
  screen.getByRole('textbox', { name: 'Email' });
  screen.getByText('Saved successfully');
  ```

- Use `queryBy...` when asserting that something is absent.
- Use `findBy...` when an element appears asynchronously.
- Use `toBeInTheDocument()` for presence and `not.toBeInTheDocument()` for absence.
- For checkable controls, use `toBeChecked()` when supported by the rendered element and matchers.
- For native disabled controls, use `toBeDisabled()`.
- For custom UI primitives, inspect the rendered DOM and test the actual accessibility contract; this may mean asserting `aria-disabled="true"` rather than using `toBeDisabled()`.
- Assert callback arguments with `toHaveBeenCalledWith(...)`; assert call counts when the number of calls matters.
- Avoid selectors tied to styling classes unless no stable user-facing or semantic selector exists.

## Custom UI primitives and ARIA behavior

Some UI libraries render custom elements with roles such as `checkbox`, `switch`, or `button` instead of native controls. Match assertions to the actual DOM and accessibility contract.

```tsx
const control = screen.getByRole('checkbox', {
  name: 'Notifications',
});

expect(control).toHaveAttribute('aria-disabled', 'true');
```

Do not blindly use `toBeDisabled()` for every custom role element. Conversely, do not replace native-control assertions with ARIA checks without inspecting the implementation and rendered output.

Accessible names may include text beyond the visible field label, such as required indicators, status badges, or descriptive content associated with the control. When a role query fails, inspect the error output and rendered DOM before changing the query. Match the query to the actual accessible name and intended public contract; use a suitable regular expression only when partial matching is appropriate.

If a role query matches multiple elements, make it more specific with an accessible name, scope it using `within(...)`, or select the intended semantic element. Do not assume a generic role is unique.

## Fixtures, mocks, and test data

### Locate existing mock data first

- Search for existing mock or fixture files before creating test data.
- Reuse the project's existing import aliases and path conventions.
- Confirm the actual path and exports before importing a fixture.
- Inspect the fixture's actual values before writing expectations.

### General mock-data rules

- Reuse an existing fixture when it matches the scenario.
- Keep test data small and focused on the behavior being tested.
- Use explicit fixtures for special cases, such as disabled items, empty results, loading states, or unusual values.
- Avoid modifying shared fixtures or utility types just to make an incorrect test pass.
- If no suitable mock exists, define a minimal local fixture or create a shared mock in a location consistent with repository conventions.
- Keep shared fixtures reusable; avoid adding test-specific data unless it has broader value.

## Project-specific fixture: `Option.mock`

For tests of components that use `Option` values, check and reuse the existing fixture before defining local options.

The project fixture is available from:

```tsx
import { OPTIONS, OPTIONS_WITH_DISABLED } from '@/components/types/Option.mock';
```

Its source data is:

```tsx
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
        label: 'Rust',
        disabled: true,
    },
];
```

Fixture expectations:

- `OPTIONS` contains TypeScript (`typescript`), JavaScript (`javascript`), and Python (`python`), all enabled.
- `OPTIONS_WITH_DISABLED` contains the same three options plus Rust (`rust`), which has `disabled: true`.
- Prefer these shared fixtures over recreating equivalent local arrays. Use `OPTIONS_WITH_DISABLED` for tests of disabled options.
- Base assertions on these exact labels and values; do not infer fixture contents from the variable names alone.

## Testing interactions

- Prefer `userEvent` for interactions a user could perform.
- Await asynchronous user actions:

  ```tsx
  const user = userEvent.setup();
  await user.click(screen.getByRole('button', { name: 'Save' }));
  ```

- Test keyboard interactions when they are part of the component's expected accessible behavior.
- Verify that blocked interactions do not invoke callbacks.
- For forms, test valid submission and relevant invalid or prevented submission paths.
- Avoid testing internal handler functions directly when a user-visible interaction can verify the behavior.

## Debugging failing tests

1. Read the complete failure output.
2. Inspect the rendered DOM or use Testing Library's debug output if necessary.
3. Verify the expectation against the component API, implementation, and fixture data.
4. Check whether the query matches zero, one, or multiple elements.
5. Check whether the rendered element is native or a custom ARIA widget.
6. Verify asynchronous behavior and whether interactions are awaited.
7. Verify controlled props and callback payloads.
8. Correct the test if its expectation is wrong; change production code only if the component's behavior is wrong.
9. Respect explicit user constraints about files that must not be changed.
10. Do not claim tests pass unless they were actually run and the result was observed.

## Example: prop-driven interactive component

Adapt names and expected values to the actual component:

```tsx
it('calls onChange with the updated value after user interaction', async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();

  render(<ExampleComponent value="before" onChange={onChange} />);

  await user.click(screen.getByRole('button', { name: 'Change value' }));

  expect(onChange).toHaveBeenCalledWith('after');
});
```

For a component whose visible state is controlled by props, do not assume that invoking `onChange` changes the rendered value. The parent is responsible for passing the new prop value back.

## Response expectations

When asked to create or fix tests:

- Inspect the actual component and fixtures before producing code.
- Provide the complete relevant test file when the user asks for the whole file.
- Explain important changes concisely.
- Preserve repository naming, language, import conventions, and public APIs.
- Do not modify shared utility/type files when the task can be solved in the test, especially if the user has prohibited those edits.
- If tests were not executed, state that they have not been verified by running them.

## Additional debugging rules: accessible names and callback signatures

- When a role query fails, read the complete Testing Library error and inspect the rendered DOM before changing the query. The accessible name may include text beyond the visible field label, including status badges such as “編集不可”. Match the query to the actual accessible name and intended public contract.
- When testing custom UI primitives, inspect their rendered DOM and actual accessibility behavior. A native disabled button may still be found with `toBeDisabled()` even when its accessible name includes a label and a status badge.
- For callback assertions, inspect the callback signature and the actual received arguments. Some library callbacks pass a value plus metadata, an element, or an event. If the public contract only promises the first argument, assert that argument explicitly, for example `expect(onChange.mock.calls[0][0]).toEqual(expectedValue)`. Do not weaken an exact-argument assertion unless the implementation/API confirms that additional arguments are permitted; if the public contract promises exactly one argument, keep the exact-argument assertion and fix the implementation if needed.
- When a controlled component invokes `onChange`, do not assume its rendered value changes unless the parent passes the updated prop back. Use `rerender` or a stateful test harness when testing the resulting controlled state.
- Preserve all existing guidance when updating this skill. Add or amend sections without silently dropping fixture details, debugging steps, repository constraints, examples, or response expectations.

## Existing nested group note

A fieldset and nested groups can result in multiple group-like elements. If the intended target is the outer fieldset, target it explicitly or use a stable, specific accessible query rather than assuming a generic `group` role is unique.
