# React form integration testing

Use the real hook + schema integration whenever a component depends on `react-hook-form` and a Zod schema.

## Recommended structure

```tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';

function renderExampleForm() {
	function InnerForm() {
		const form = useForm({
			resolver: zodResolver(FORM_SCHEMA),
			defaultValues: DEFAULT_FORM_VALUES,
		});

		return <FormExample {...form} />;
	}

	return render(<InnerForm />);
}
```

## Assertions

- Verify input labels via `getByRole`/`getByLabelText`.
- Use `await screen.findByText()` for validation messages after submit.
- Use `userEvent` instead of direct DOM events.

## Browser-mode notes

- Browser tests can run with Vitest Playwright and should remain close to actual user behavior.
- The test should fail when validation messages are missing or the submit flow is blocked.
