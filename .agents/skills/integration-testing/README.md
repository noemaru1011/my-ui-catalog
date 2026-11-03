# Integration Testing

This skill covers integration tests for React UI components that use real form logic, validation, and browser interaction.

## When to use

- Reconciled component + hook + schema behavior
- Form submission, validation, and async state flows
- UI behavior that must be tested through the rendered DOM
- Browser-mode tests for Playwright + Vitest

## Test patterns

### 1. Render real form logic

Use the actual `useForm` hook with the real resolver instead of mocking the form layer.

```tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';

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
				onSubmit={handleSubmit(() => {})}
			/>
		);
	}

	return render(<InnerForm />);
}
```

### 2. Assert through accessibility

Prefer accessible queries over implementation details.

```tsx
expect(screen.getByRole('textbox', { name: '氏名' })).toBeInTheDocument();
expect(screen.getByRole('button', { name: '送信' })).toBeInTheDocument();
```

### 3. Exercise real user interactions

Use `userEvent` for click and typing flows.

```tsx
const user = userEvent.setup();
await user.type(screen.getByRole('textbox', { name: '氏名' }), '山田太郎');
await user.click(screen.getByRole('button', { name: '送信' }));
```

### 4. Validate reaction to invalid input

Check the observable user-facing messages.

```tsx
expect(await screen.findByText('氏名を入力してください。')).toBeInTheDocument();
```

## Browser-mode / Playwright guidance

- Use `vitest` browser mode for component tests when the app needs a real browser context.
- Keep one behavior per test.
- Use `userEvent` with `await` for deterministic interactions.
- Prefer `screen.getByRole`, `getByLabelText`, and `findByText`.

## Project-specific rules

- Reuse the real Zod schema and `useForm` wiring.
- Wrap routed components with `MemoryRouter` when the UI contains `Link` or router-based components.
- Do not mock business logic just to make a form test pass.
- Keep tests close to the behavior under test and avoid testing CSS classes.
