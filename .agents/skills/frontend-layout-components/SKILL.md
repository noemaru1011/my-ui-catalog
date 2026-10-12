---
name: frontend-layout-components
description: Use this skill when creating, modifying, or refactoring React layouts with the project's Center, Cluster, Container, and Stack components. Covers component selection, width constraints, horizontal and vertical layouts, spacing, alignment, wrapping, semantic HTML, and reusable layout composition with Tailwind CSS.
---

# Frontend Layout Components

## Goal

Build consistent, maintainable, and reusable frontend layouts using the project's existing layout components.

Prefer `Center`, `Cluster`, `Container`, and `Stack` over manually implementing common layout patterns with raw `div` elements and Tailwind CSS utility classes.

## Component Structure

```text
layouts/
├── Center/
│   └── Center.tsx
├── Cluster/
│   └── Cluster.tsx
├── Container/
│   └── Container.tsx
└── Stack/
    └── Stack.tsx
```

## Workflow

### 1. Inspect Existing Components

- Read the component implementation and TypeScript prop definitions before using or modifying a layout component.
- Check supported values, default props, rendered elements, and applied CSS classes.
- Reuse existing components whenever their APIs satisfy the layout requirement.
- Do not assume unsupported props or behaviors exist.
- Preserve existing public APIs unless a change is necessary.

### 2. Choose the Appropriate Component

| Requirement | Component |
|---|---|
| Center content horizontally and constrain its maximum width | `Center` |
| Arrange children horizontally with wrapping and configurable spacing | `Cluster` |
| Constrain content width without automatic centering | `Container` |
| Arrange children vertically with configurable spacing | `Stack` |

Combine components when a layout requires multiple behaviors.

### 3. Use Existing Spacing Options

`Cluster` and `Stack` support the following `space` values:

| Value | Tailwind CSS | Default spacing |
|---|---|---|
| `xs` | `gap-1` | 4px |
| `sm` | `gap-2` | 8px |
| `md` | `gap-4` | 16px |
| `lg` | `gap-6` | 24px |
| `xl` | `gap-8` | 32px |

Use the predefined spacing options instead of arbitrary gap classes when they satisfy the requirement.

### 4. Compose Layouts

Prefer composition over duplicating layout logic.

```tsx
<Center maxWidth="xl">
  <Stack space="lg">
    <Cluster justify="between" align="center">
      <h1>Users</h1>
      <Button>Add user</Button>
    </Cluster>

    <Container width="full">
      <UserList />
    </Container>
  </Stack>
</Center>
```

Each component should retain its intended responsibility:

- `Center` centers the overall content and constrains its maximum width.
- `Stack` arranges sections vertically.
- `Cluster` arranges the heading and action horizontally.
- `Container` controls the width of the content region.

## Component Reference

### Center

**Purpose:** Center content horizontally and constrain its maximum width.

#### Props

| Prop | Type | Default |
|---|---|---|
| `children` | `ReactNode` | Required |
| `maxWidth` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'lg'` |

#### Width mapping

| Value | Tailwind CSS |
|---|---|
| `sm` | `max-w-screen-sm` |
| `md` | `max-w-screen-md` |
| `lg` | `max-w-screen-lg` |
| `xl` | `max-w-screen-xl` |
| `full` | `max-w-full` |

The component applies `mx-auto w-full` and does not add internal padding.

#### Usage

```tsx
import { Center } from '@/layouts/Center/Center';

<Center maxWidth="lg">
  <main>Page content</main>
</Center>
```

Use `Center` for page content and sections that need horizontal centering with a maximum width.

### Cluster

**Purpose:** Arrange children horizontally with wrapping, spacing, and alignment.

#### Props

| Prop | Type | Default |
|---|---|---|
| `children` | `PropsWithChildren` | Optional |
| `space` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| `justify` | `'start' \| 'center' \| 'end' \| 'between'` | `'start'` |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'center'` |

The component applies `flex flex-wrap`.

#### Justification mapping

| Value | Tailwind CSS |
|---|---|
| `start` | `justify-start` |
| `center` | `justify-center` |
| `end` | `justify-end` |
| `between` | `justify-between` |

#### Alignment mapping

| Value | Tailwind CSS |
|---|---|
| `start` | `items-start` |
| `center` | `items-center` |
| `end` | `items-end` |
| `stretch` | `items-stretch` |

#### Usage

```tsx
import { Cluster } from '@/layouts/Cluster/Cluster';

<Cluster space="sm" justify="end" align="center">
  <Button variant="secondary">Cancel</Button>
  <Button>Save</Button>
</Cluster>
```

Use `Cluster` for button groups, tags, filters, toolbars, and other horizontal arrangements that may wrap onto multiple lines.

### Container

**Purpose:** Constrain the width of a content region.

#### Props

| Prop | Type | Default |
|---|---|---|
| `children` | `ReactNode` | Optional |
| `width` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| 'full'` | `'full'` |

#### Width mapping

| Value | Tailwind CSS |
|---|---|
| `sm` | `w-full max-w-64` |
| `md` | `w-full max-w-72` |
| `lg` | `w-full max-w-80` |
| `xl` | `w-full max-w-96` |
| `2xl` | `w-full max-w-2xl` |
| `3xl` | `w-full max-w-3xl` |
| `full` | `w-full` |

The component does not automatically center itself or add internal padding.

#### Usage

```tsx
import { Container } from '@/layouts/Container/Container';

<Container width="2xl">
  <Form />
</Container>
```

Use `Container` for forms, cards, sidebars, and content regions that need a width constraint.

When horizontal centering is also required, compose it with `Center`.

```tsx
<Center maxWidth="lg">
  <Container width="2xl">
    <Form />
  </Container>
</Center>
```

Do not confuse `Container.width` with `Center.maxWidth`; they use different Tailwind CSS classes and width scales.

### Stack

**Purpose:** Arrange children vertically with consistent spacing.

#### Props

| Prop | Type | Default |
|---|---|---|
| `as` | `ElementType` | `'div'` |
| `space` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| Other props | `ComponentProps<T>` excluding `space`, `as`, and `className` | Element-dependent |

The component applies `flex flex-col`.

The `className` prop is explicitly excluded from its public API. Do not pass `className` to `Stack`.

#### Usage

```tsx
import { Stack } from '@/layouts/Stack/Stack';

<Stack space="md">
  <h2>Account settings</h2>
  <p>Manage your account information.</p>
  <Button>Save changes</Button>
</Stack>
```

Use the `as` prop when a semantic HTML element or another compatible component is required.

```tsx
<Stack as="section" space="lg" aria-label="Account settings">
  <h2>Account settings</h2>
  <p>Manage your account information.</p>
</Stack>
```

Use `Stack` for forms, vertically arranged content, card sections, and page sections.

Follow the actual TypeScript API when passing props to the rendered element.

## Implementation Rules

### Prefer Existing Layout Components

- Reuse existing layout components whenever their APIs satisfy the requirement.
- Avoid duplicating centering, width constraints, wrapping, or spacing logic.
- Do not create new layout components for patterns that existing components already support.
- Extend an existing API or introduce a new component only when the current APIs cannot adequately express the requirement.

### Keep Responsibilities Separate

- `Center`: Horizontal centering and maximum width.
- `Cluster`: Horizontal arrangement, wrapping, spacing, and alignment.
- `Container`: Content width constraints.
- `Stack`: Vertical arrangement and spacing.

Combine components instead of assigning unrelated responsibilities to a single component.

### Respect Public APIs

- Follow the actual TypeScript prop definitions.
- Use only supported enum values.
- Preserve existing default behavior.
- Do not pass `className` to `Stack`.
- Do not assume `Center` or `Container` provides internal padding.
- Do not assume `Container` automatically centers its content.
- Do not introduce undocumented props.

### Maintain Type Safety

- Preserve existing prop types.
- Keep polymorphic component usage compatible with the rendered element's supported props.
- Avoid unsafe type assertions that bypass TypeScript errors.
- Consider backward compatibility when changing component APIs.

### Preserve Semantic HTML

- Use appropriate semantic HTML elements.
- Use `Stack`'s `as` prop when a semantic element is needed.
- Preserve accessibility attributes and meaningful document structure.
- Avoid unnecessary wrapper elements.

### Avoid Unnecessary Utility Classes

Before adding layout-related Tailwind CSS classes directly to an element:

1. Check whether an existing layout component provides the required behavior.
2. Check whether its props support the required spacing, alignment, or width.
3. Combine existing layout components when appropriate.
4. Use custom utility classes only when the existing APIs cannot express the requirement clearly.

Do not force a layout into an existing component if doing so makes the implementation less readable or changes its intended behavior.

### Keep Layout Components Reusable

- Keep layout components focused on structural behavior.
- Do not embed application-specific business logic in layout components.
- Keep data fetching and interaction logic in appropriate application components.
- Prefer readable composition over complex conditional class expressions.

## Common Mistakes

### Using Center When Only a Width Constraint Is Needed

Use `Container` when content needs a width constraint without automatic centering.

### Using Container When Centering Is Required

`Container` does not apply `mx-auto`. Use `Center` when horizontal centering is required.

### Using Cluster for Vertical Layouts

Use `Stack` when children should be arranged vertically.

### Using Arbitrary Spacing Values

Prefer the existing `space` options before introducing custom gap classes or modifying component APIs.

### Passing Unsupported Props

Do not pass `className` to `Stack` or assume that every layout component exposes the same props.

Inspect the implementation before using or extending a prop.

### Duplicating Existing Layout Logic

Do not manually recreate a layout pattern when an existing component already provides the required behavior.

## Quick Reference

```tsx
// Center content and constrain its maximum width
<Center maxWidth="lg">
  {children}
</Center>

// Arrange children horizontally with wrapping
<Cluster space="md" justify="start" align="center">
  {children}
</Cluster>

// Constrain content width without automatic centering
<Container width="2xl">
  {children}
</Container>

// Arrange children vertically with consistent spacing
<Stack space="md">
  {children}
</Stack>
```

## Decision Process

When implementing or refactoring a layout:

1. Identify the required layout behavior.
2. Select the appropriate existing layout component.
3. Combine components when multiple layout behaviors are required.
4. Use custom Tailwind CSS classes only when existing APIs cannot express the requirement.
5. Extend an existing component or introduce a reusable component when the same unsupported pattern is needed in multiple places.
6. Preserve type safety, semantic HTML, accessibility, and project conventions.

## Response Expectations

When implementing or refactoring layouts:

- Prefer existing layout components and their public APIs.
- Base implementation decisions on actual component definitions.
- Keep changes focused on the requested layout.
- Explain significant layout decisions when useful.
- Avoid unrelated refactoring.
- Do not claim that code was tested unless tests were actually executed.
- If existing components cannot satisfy the requirement, explain the limitation and propose the smallest appropriate extension or alternative.