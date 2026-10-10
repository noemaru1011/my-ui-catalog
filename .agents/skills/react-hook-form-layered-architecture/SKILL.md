---
name: react-hook-form-layered-architecture
description: Rules and guidelines for creating React form modules by separating responsibilities into schema, Container, presentation, and page layers. Enforces React Hook Form with Zod validation, strict component integration standards (register vs Controller), and isolated component layers.
---

# Schema-Container-Presentation-Page Form Architecture

## Goal

Provide a clean, maintainable, and type-safe architecture for React form features by isolating concerns into four distinct layers:

1. **Schema**: Zod validation schemas, inferred TypeScript types, option arrays, and initial default values.
2. **Container**: Form state management (`useForm`), schema resolution (`zodResolver`), submit handlers, and side effects.
3. **Presentation**: Pure UI rendering, receiving form control props, and placing UI elements.
4. **Page**: Routing entrypoint that mounts the Container component.

---

## Directory & Naming Conventions

Organize files for a feature named `[FeatureName]` in a dedicated folder:

```text
[FeatureName]/
├── schema/
│   └── [featureName]Schema.ts
├── containers/
│   └── [FeatureName]Container.tsx
├── presentations/
│   └── [FeatureName]Presentation.tsx
└── pages/
    └── [FeatureName]Page.tsx
```

> **Naming Rule for Containers:**  
> Always suffix Container components with `Container` (e.g., `FormExampleContainer.tsx`) to avoid naming collisions with layout components like `@/components/layouts/Container/Container`.

---

## UI Component Integration Guidelines

When integrating UI components with React Hook Form inside the Presentation layer, strictly adhere to the following mapping rules:

### 1. Components using `register` (Native Input Wrappers)

Use direct prop spreading `{...register('fieldName')}` for components that accept standard input ref and event handlers:

- `<Input />`
- `<PasswordInput />`
- `<Textarea />`

### 2. Components using `<Controller />` (Controlled UI Primitives)

Wrap with React Hook Form's `<Controller />` for custom UI components that handle value state via custom callbacks (`onChange`, `value`):

- `<Select />`
- `<Combobox />`
- `<ComboboxMultiple />`
- `<DatePicker />`
- `<DateRange />`
- `<Checkbox />`
- `<Radio />`

---

## Layer Definitions & Implementation Examples

### 1. Schema Layer (`schema/[featureName]Schema.ts`)

Pure TypeScript/Zod definitions. **Must not import any UI elements or React hooks.**

```typescript
import { z } from 'zod';

export const FORM_SCHEMA = z.object({
  name: z.string().min(1, 'Name is required.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
  category: z.string().min(1, 'Please select a category.'),
  user: z.string().min(1, 'Please select a user.'),
  users: z.array(z.string()).min(1, 'Select at least one user.'),
  date: z.date({ message: 'Date is required.' }),
  dateRange: z
    .object({
      from: z.date(),
      to: z.date().optional(),
    })
    .optional()
    .refine((val) => val?.from && val?.to, { message: 'Date range is required.' }),
  interests: z.array(z.string()).min(1, 'Select at least one interest.'),
  gender: z.string().min(1, 'Gender selection is required.'),
  agreement: z.array(z.string()).min(1, 'You must accept the terms.'),
  description: z.string().min(1, 'Description is required.'),
});

export type FormValues = z.infer<typeof FORM_SCHEMA>;

export const CATEGORY_OPTIONS = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'design', label: 'Design' },
];

export const USER_OPTIONS = [
  { value: 'tanaka', label: 'Tanaka Taro' },
  { value: 'sato', label: 'Sato Hanako' },
];

export const INTEREST_OPTIONS = [
  { value: 'programming', label: 'Programming' },
  { value: 'design', label: 'Design' },
];

export const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

export const DEFAULT_FORM_VALUES: FormValues = {
  name: '',
  password: '',
  category: '',
  user: '',
  users: [],
  agreement: [],
  interests: [],
  gender: '',
  date: undefined as unknown as Date,
  dateRange: undefined,
  description: '',
};
```

---

### 2. Container Layer (`containers/[FeatureName]Container.tsx`)

Handles form state initialization, schema binding, and submission handlers. Passes form control props down to Presentation.

```tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import FormExamplePresentation from '../presentations/FormExamplePresentation';
import {
  DEFAULT_FORM_VALUES,
  FORM_SCHEMA,
  type FormValues,
} from '../schema/formExampleSchema';

export default function FormExampleContainer() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(FORM_SCHEMA),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <FormExamplePresentation
      register={register}
      control={control}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}
```

---

### 3. Presentation Layer (`presentations/[FeatureName]Presentation.tsx`)

Renders layout and UI components based on props. Does not manage form state or execute business logic.

```tsx
import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { Checkbox } from '@/components/elements/Checkbox/Checkbox';
import { Combobox } from '@/components/elements/Combobox/Combobox';
import { ComboboxMultiple } from '@/components/elements/ComboboxMultiple/ComboboxMultiple';
import { DatePicker } from '@/components/elements/DatePicker/DatePicker';
import { DateRange } from '@/components/elements/DateRange/DateRange';
import { Heading } from '@/components/elements/Heading/Heading';
import { Input } from '@/components/elements/Input/Input';
import { PasswordInput } from '@/components/elements/Input/PasswordInput';
import { Link } from '@/components/elements/Link/Link';
import { Radio } from '@/components/elements/Radio/Radio';
import { Select } from '@/components/elements/Select/Select';
import { Textarea } from '@/components/elements/Textarea/Textarea';
import { Center } from '@/components/layouts/Center/Center';
import { Cluster } from '@/components/layouts/Cluster/Cluster';
import { Container } from '@/components/layouts/Container/Container';
import { Stack } from '@/components/layouts/Stack/Stack';
import { Button } from '@/components/ui/button';

import {
  CATEGORY_OPTIONS,
  GENDER_OPTIONS,
  INTEREST_OPTIONS,
  USER_OPTIONS,
  type FormValues,
} from '../schema/formExampleSchema';

type Props = {
  register: UseFormRegister<FormValues>;
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

export default function FormExamplePresentation({
  register,
  control,
  errors,
  onSubmit,
}: Props) {
  return (
    <Center maxWidth="xl">
      <Stack space="lg">
        <Heading type="sectionTitle">Form Example</Heading>

        <form onSubmit={onSubmit}>
          <Stack space="lg">
            <Cluster space="lg" align="start">
              {/* Registered components */}
              <Container width="lg">
                <Input
                  id="name"
                  label="Name"
                  required
                  {...register('name')}
                  error={errors.name?.message}
                />
              </Container>

              <Container width="lg">
                <PasswordInput
                  id="password"
                  label="Password"
                  required
                  {...register('password')}
                  error={errors.password?.message}
                />
              </Container>

              {/* Controlled components */}
              <Container width="lg">
                <Controller
                  name="category"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Select
                      id={field.name}
                      label="Category"
                      value={field.value}
                      required
                      onChange={field.onChange}
                      options={CATEGORY_OPTIONS}
                      error={fieldState.error?.message}
                    />
                  )}
                />
              </Container>

              <Container width="lg">
                <Controller
                  name="user"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Combobox
                      id={field.name}
                      label="User"
                      value={field.value}
                      required
                      onChange={field.onChange}
                      options={USER_OPTIONS}
                      error={fieldState.error?.message}
                    />
                  )}
                />
              </Container>

              <Container width="lg">
                <Controller
                  name="users"
                  control={control}
                  render={({ field, fieldState }) => (
                    <ComboboxMultiple
                      id={field.name}
                      label="Users (Multiple)"
                      value={field.value}
                      required
                      onChange={field.onChange}
                      options={USER_OPTIONS}
                      error={fieldState.error?.message}
                    />
                  )}
                />
              </Container>

              <Container width="lg">
                <Controller
                  name="date"
                  control={control}
                  render={({ field, fieldState }) => (
                    <DatePicker
                      id={field.name}
                      label="Date"
                      value={field.value}
                      required
                      onChange={field.onChange}
                      error={fieldState.error?.message}
                    />
                  )}
                />
              </Container>

              <Container width="lg">
                <Controller
                  name="dateRange"
                  control={control}
                  render={({ field, fieldState }) => (
                    <DateRange
                      id={field.name}
                      label="Date Range"
                      value={field.value}
                      onChange={field.onChange}
                      error={fieldState.error?.message}
                    />
                  )}
                />
              </Container>
            </Cluster>

            <Cluster space="xl" align="start">
              <Container width="lg">
                <Controller
                  name="interests"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Checkbox
                      label="Interests"
                      options={INTEREST_OPTIONS}
                      value={field.value}
                      onChange={field.onChange}
                      error={fieldState.error?.message}
                    />
                  )}
                />
              </Container>

              <Container width="lg">
                <Controller
                  name="gender"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Radio
                      label="Gender"
                      options={GENDER_OPTIONS}
                      value={field.value}
                      onChange={field.onChange}
                      error={fieldState.error?.message}
                    />
                  )}
                />
              </Container>
            </Cluster>

            <Controller
              name="agreement"
              control={control}
              render={({ field, fieldState }) => (
                <Checkbox
                  label="Terms Agreement"
                  options={[{ value: 'agreement', label: 'I agree to the terms' }]}
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />

            <Container width="3xl">
              <Textarea
                id="description"
                label="Description"
                required
                {...register('description')}
                error={errors.description?.message}
              />
            </Container>

            <Cluster justify="between" align="center">
              <Link to="/#" label="Back" />
              <Button type="submit">Submit</Button>
            </Cluster>
          </Stack>
        </form>
      </Stack>
    </Center>
  );
}
```

---

### 4. Page Layer (`pages/[FeatureName]Page.tsx`)

Routing entrypoint that mounts the Container component.

```tsx
import FormExampleContainer from '../containers/FormExampleContainer';

export default function FormExamplePage() {
  return <FormExampleContainer />;
}
```

---

## Architectural Checklist

- [ ] **Schema Isolation:** The schema file contains no React, JSX, or UI library dependencies.
- [ ] **Component Binding Rules:** `Input`, `PasswordInput`, and `Textarea` use `register`. `Select`, `Combobox`, `ComboboxMultiple`, `DatePicker`, `DateRange`, `Checkbox`, and `Radio` use `<Controller />`.
- [ ] **Container Naming:** Containers are explicitly named `[FeatureName]Container.tsx` to prevent collisions with layout elements.
- [ ] **Pure Presentation:** `useForm` is never initialized inside Presentation components.
