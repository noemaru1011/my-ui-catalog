---
name: react-hook-form-layered-architecture
description: Guidelines for building React form features using Zod schemas, React Hook Form, custom hooks, UI components, and pages. Enforces separation of business logic and presentation, type-safe schema integration from the root @my-app/schemas package, and correct register vs Controller usage.
---

# React Hook Form Feature Architecture

## Goal

Build maintainable, type-safe React form features by separating responsibilities into four layers:

1. **Schema**: Zod validation schemas and inferred TypeScript types. Shared application schemas are defined in the root `@my-app/schemas` package.
2. **Custom Hook**: Form state management, schema resolution, submission handlers, API calls, side effects, and feature-specific state.
3. **Component**: UI rendering, form fields, validation messages, and user interactions. Components receive required state and callbacks through props.
4. **Page**: Routing entry point that composes the feature hook and UI components.

Use Custom Hooks instead of dedicated Container components when a component exists only to manage state and pass props to a presentation component.

Container / Presentation is not prohibited, but it is not the default architecture for new features.

---

## Directory & Naming Conventions

Organize feature-specific code under its feature directory.

Example:

```text
features/
└── auth/
    ├── login/
    │   ├── hooks/
    │   │   └── useLogin.ts
    │   ├── components/
    │   │   └── LoginForm.tsx
    │   └── pages/
    │       └── LoginPage.tsx
    └── register/
        ├── hooks/
        │   └── useRegister.ts
        ├── components/
        │   └── RegisterForm.tsx
        └── pages/
            └── RegisterPage.tsx
```

For a simple feature, a smaller structure is acceptable. Do not create directories or files solely to satisfy a fixed folder template.

### Naming rules

- Custom Hooks: `use[FeatureName].ts`, such as `useLogin.ts`.
- UI components: use descriptive names such as `LoginForm.tsx`, `RegisterForm.tsx`, or `InventoryView.tsx`.
- Pages: `[FeatureName]Page.tsx`, such as `LoginPage.tsx`.
- Shared schema packages: import schemas and input types from `@my-app/schemas`.
- Avoid introducing `Container` components when their only responsibility is calling a hook and forwarding its return values to a UI component.

Use named exports or default exports consistently with the surrounding project conventions.

---

## Schema Import Rules

The root `@my-app/schemas` package is the canonical source for application schemas and their exported TypeScript types.

Always import schemas and types from this package when they are available there.

Correct:

```tsx
import type { SignInInput } from '@my-app/schemas';
import { signInSchema } from '@my-app/schemas';
```

Incorrect:

```tsx
import { signInSchema } from '../schema/signInSchema';
```

Do not duplicate a schema or redefine an existing exported input type inside a feature directory.

Feature-specific defaults, option arrays, or presentation-only constants may be defined locally when appropriate. Shared validation rules and inferred types should remain in the root schema package.

Do not assume every form needs its own schema directory.

---

## Layer Responsibilities

### 1. Schema layer

Schemas and inferred types are maintained in the root `@my-app/schemas` package.

Responsibilities:

- Define Zod validation rules.
- Export schemas and inferred TypeScript types.
- Share validation rules between the frontend and other application layers where appropriate.
- Avoid React, JSX, UI components, and React Hook Form dependencies.

Example:

```tsx
import { z } from 'zod';

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  rememberMe: z.boolean(),
});

export type SignInInput = z.infer<typeof signInSchema>;
```

This is an illustrative schema example. Follow the project's existing Zod version and validation conventions.

### 2. Custom Hook layer

The Custom Hook manages form state and feature behavior.

Responsibilities:

- Initialize `useForm`.
- Connect the schema using `zodResolver`.
- Define default form values.
- Implement submit handlers.
- Call APIs and mutations.
- Handle loading and submission state.
- Perform side effects such as toast notifications and navigation when appropriate.
- Manage feature-specific state that belongs to the workflow.
- Return only the values and callbacks required by the UI.

Example:

```tsx
import { zodResolver } from '@hookform/resolvers/zod';
import type { SignInInput } from '@my-app/schemas';
import { signInSchema } from '@my-app/schemas';
import { useForm } from 'react-hook-form';

export function useLogin() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (values: SignInInput): Promise<void> => {
    // Execute the login workflow.
  };

  return {
    register,
    control,
    errors,
    isSubmitting,
    onSubmit: handleSubmit(onSubmit),
  };
}
```

The example omits application-specific authentication and error handling.

Do not put JSX or presentation markup inside a Custom Hook.

Do not create a separate hook for every function or state variable. Split hooks when responsibilities become independently meaningful, reusable, or difficult to maintain.

### 3. Component layer

Components render the UI and expose interactions through props.

Responsibilities:

- Render form fields and layout.
- Display validation errors.
- Use the supplied submission handler.
- Render loading and disabled states.
- Connect fields to React Hook Form using `register` or `Controller`, according to the UI component's API.
- Avoid performing API requests or containing feature-level business workflows.

Components should not initialize their own form state when that state is intended to be managed by the feature hook.

Example:

```tsx
import type { SignInInput } from '@my-app/schemas';
import type { ComponentProps } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Input } from '@/components/elements/Input/Input';
import { Button } from '@/components/ui/button';

type Props = {
  register: UseFormRegister<SignInInput>;
  errors: FieldErrors<SignInInput>;
  isSubmitting: boolean;
  onSubmit: ComponentProps<'form'>['onSubmit'];
};

export function LoginForm({
  register,
  errors,
  isSubmitting,
  onSubmit,
}: Props) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <Input
        id="email"
        label="Email"
        type="email"
        {...register('email')}
        readOnly={isSubmitting}
        error={errors.email?.message}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  );
}
```

This is a minimal illustration. Use the project's actual UI components and design-system conventions.

### 4. Page layer

The Page connects the Custom Hook to the UI component.

Responsibilities:

- Call the feature hook.
- Compose the page's UI.
- Pass the hook's returned values to the appropriate components.
- Handle page-level composition when multiple components are involved.

Example:

```tsx
import { LoginForm } from '../components/LoginForm';
import { useLogin } from '../hooks/useLogin';

export default function LoginPage() {
  const login = useLogin();

  return <LoginForm {...login} />;
}
```

Do not introduce a Container component merely to perform this connection.

When a page is small and has no meaningful reason to separate the UI, combining the page and form component is acceptable. Preserve separation when it improves readability, reuse, or testing.

---

## UI Component Integration Guidelines

When integrating UI components with React Hook Form, follow these rules.

### 1. Components using `register`

Use direct prop spreading when a component supports the standard input ref, event handlers, and value behavior required by React Hook Form.

Typical examples:

- `Input`
- `PasswordInput`
- `Textarea`

Example:

```tsx
<Input
  id="email"
  label="Email"
  {...register('email')}
  error={errors.email?.message}
/>
```

Verify the actual component API before using `register`. A component's name alone does not guarantee compatibility.

### 2. Components using `Controller`

Use `Controller` for controlled UI components whose APIs do not directly support React Hook Form's registration contract.

Typical examples in this project may include:

- `Select`
- `Combobox`
- `ComboboxMultiple`
- `DatePicker`
- `DateRange`
- `Checkbox`
- `Radio`

Example:

```tsx
<Controller
  name="category"
  control={control}
  render={({ field, fieldState }) => (
    <Select
      id={field.name}
      label="Category"
      value={field.value}
      onChange={field.onChange}
      options={CATEGORY_OPTIONS}
      error={fieldState.error?.message}
    />
  )}
/>
```

Adapt `value`, `onChange`, `onBlur`, and `ref` to the actual component contract. Do not assume that every component uses the same value type.

For example, if a checkbox component uses an array of selected values but the schema expects a boolean, explicitly convert between the UI value and the form value.

Do not use `Controller` unnecessarily for components that correctly support `register`.

---

## Form Submission and Side Effects

### Submission

Apply `handleSubmit` to the submit handler before exposing it to the component.

```tsx
return {
  onSubmit: handleSubmit(onSubmit),
};
```

The component should pass the returned handler directly to the form's `onSubmit`.

### API errors

- Handle expected API errors explicitly.
- Provide user-facing messages through the project's established notification system.
- Handle unexpected exceptions without assuming every thrown value is an `Error`.
- Avoid duplicating error-handling logic when a shared application utility already exists.

### Navigation

Navigation may be handled inside the feature hook when it is part of the feature workflow, such as navigating to the home page after a successful login.

Use page-level orchestration when the destination depends on broader routing context or when the behavior should be controlled by the page.

### Loading states

Use React Hook Form's `isSubmitting` for form submission state when appropriate.

Use query and mutation state from the data layer for asynchronous operations managed by those tools.

Do not introduce redundant state if an existing state source already represents the same operation. Additional state is acceptable when it represents a genuinely different workflow state.

---

## Complex Features

Not every feature should be forced into a single hook and a single UI component.

For complex features, split responsibilities by meaningful behavior.

Example:

```text
features/
└── inventory/
    ├── hooks/
    │   ├── useInventory.ts
    │   └── useInventoryDrafts.ts
    ├── components/
    │   ├── InventoryView.tsx
    │   ├── InventoryForm.tsx
    │   ├── InventoryDataTable.tsx
    │   └── DeleteInventoryDialog.tsx
    └── pages/
        └── InventoryPage.tsx
```

Use this level of separation only when justified by complexity.

A feature hook may coordinate queries, mutations, form state, and several related UI actions. Extract a specialized hook when a distinct responsibility becomes independently understandable or reusable.

Keep query definitions, mutation definitions, domain types, and table column definitions in their established modules rather than automatically moving all of them into the form hook.

---

## Architectural Checklist

Before completing a form feature, verify the following:

- [ ] Shared schemas and inferred input types are imported from `@my-app/schemas`.
- [ ] Existing shared schemas are not duplicated in feature directories.
- [ ] `useForm` uses the appropriate schema through `zodResolver`.
- [ ] Default values match the form's expected types and schema.
- [ ] Native-compatible inputs use `register`.
- [ ] Controlled UI components use `Controller` when required by their APIs.
- [ ] API calls, submission workflows, and feature side effects live in the Custom Hook or an appropriate service layer.
- [ ] UI components render state and invoke callbacks rather than implementing feature business logic.
- [ ] The Page composes the hook and UI without an unnecessary Container component.
- [ ] Loading, validation, API errors, and submission behavior are handled.
- [ ] Existing project naming, import aliases, and component conventions are followed.
- [ ] Abstractions and file splits are introduced only when they improve maintainability.

---

## Migration Guidance

When migrating an existing Container / Presentation feature:

1. Move form initialization and business logic into a feature-specific Custom Hook.
2. Preserve existing validation, API calls, error handling, and user-visible behavior.
3. Rename or adapt the Presentation component to a descriptive component name, such as `LoginForm` or `InventoryView`.
4. Create or update the Page to call the hook and pass its return values to the UI.
5. Update route imports and tests.
6. Remove obsolete Container and Presentation files only after all references and tests have been migrated.
7. Verify the existing query and mutation behavior before removing explicit refetches or changing state management.

Do not combine an architectural migration with unrelated behavioral changes unless those changes are intentional and verified.
