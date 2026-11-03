# Accessible Queries and Interactions

Test a component through the same controls and information available to a
user. Prefer roles and accessible names over selectors tied to component
implementation or styling.

```tsx
const user = userEvent.setup();
const saveButton = screen.getByRole('button', { name: '保存' });

await user.click(saveButton);

expect(await screen.findByRole('alert')).toHaveTextContent('保存しました');
```

## Query selection

- Use `getByRole` for buttons, inputs, checkboxes, radio buttons, and other
  accessible controls.
- Use `getByLabelText` when a field's label is its clearest public identifier.
- Use `getByText` for non-interactive visible content.
- Use `queryBy...` to assert absence and `findBy...` for asynchronously rendered
  content.
- Scope queries with `within(...)` when repeated labels or nested groups make a
  query ambiguous.

When a query fails, inspect the Testing Library output and rendered DOM before
changing the query. Required markers, badges, descriptions, or nested groups
may affect the accessible name or role.

## Custom controls

UI primitives may expose ARIA roles rather than native HTML controls. Match the
assertion to the actual DOM and accessibility contract:

```tsx
const checkbox = screen.getByRole('checkbox', { name: '通知を受け取る' });
expect(checkbox).toHaveAttribute('aria-disabled', 'true');
```

Use `toBeDisabled()` for native disabled controls. For custom controls, inspect
whether disabled state is exposed through `aria-disabled`, `data-disabled`, or
another documented public behavior.

## Controlled components

For a controlled component, invoking `onChange` does not update the prop by
itself. Assert the callback payload, or use a stateful wrapper / `rerender` to
verify that the parent-provided value changes the displayed state.

```tsx
const onChange = vi.fn();
render(<Choice value="first" onChange={onChange} />);

await user.click(screen.getByRole('radio', { name: 'Second' }));

expect(onChange).toHaveBeenCalledWith('second');
```

Read callback types and inspect received arguments before asserting exact call
arguments; some third-party callbacks include additional metadata.

## Project fixtures

For components using `Option`, prefer the shared fixtures:

```tsx
import { OPTIONS, OPTIONS_WITH_DISABLED } from '@/components/types/Option.mock';
```

`OPTIONS` contains TypeScript, JavaScript, and Python. `OPTIONS_WITH_DISABLED`
adds a disabled Rust option. Check the fixture source if expectations depend on
its values.
