# Layout Composition

Use the project's layout components as small structural building blocks. First
decide which behavior the parent needs, then compose only those components.

## Choosing and composing components

| Need                                      | Component   |
| ----------------------------------------- | ----------- |
| Center a page section and cap its width   | `Center`    |
| Lay out items horizontally, with wrapping | `Cluster`   |
| Cap a child region's width                | `Container` |
| Lay out sections vertically               | `Stack`     |

For example, center a page, stack its title and form, then constrain the form:

```tsx
<Center maxWidth="xl">
	<Stack as="main" space="lg">
		<Heading type="sectionTitle">プロフィール</Heading>
		<Container width="2xl">
			<ProfileForm />
		</Container>
	</Stack>
</Center>;
```

Use `Cluster` for a toolbar or action row:

```tsx
<Cluster space="md" justify="between" align="center">
	<Heading type="blockTitle">メンバー</Heading>
	<Button>追加</Button>
</Cluster>;
```

## Project API details

- `Center.maxWidth` supports `sm`, `md`, `lg`, `xl`, and `full`.
- `Container.width` supports `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, and `full`.
- `Center` centers its child but does not add padding.
- `Container` constrains width but does not center itself.
- `Cluster` and `Stack` support `xs`, `sm`, `md`, `lg`, and `xl` spacing.
- `Stack` renders a `div` by default and supports an `as` prop for semantic
  elements. It intentionally does not accept a `className` prop.

Inspect the component's TypeScript props before using a value or assuming a
behavior not listed here.
