# React Hook Form Field Integration

Choose `register` or `Controller` based on the actual field component API, not
its visual appearance.

## Native-compatible inputs: `register`

Use `register` when the component forwards the expected input ref, events, and
value contract.

```tsx
<Input id="name" label="氏名" {...register('name')} error={errors.name?.message} />;
```

In this project, inspect the underlying UI component when verifying whether a
wrapper supports React Hook Form's registration contract.

## Controlled fields: `Controller`

Use `Controller` when a field is controlled and exposes its own value and
change-handler API:

```tsx
<Controller
	name="category"
	control={control}
	render={({ field, fieldState }) => (
		<Select
			id={field.name}
			label="カテゴリ"
			value={field.value}
			onChange={field.onChange}
			options={CATEGORY_OPTIONS}
			error={fieldState.error?.message}
		/>
	)}
/>;
```

Map the field's `value`, `onChange`, `onBlur`, and `ref` as supported by that
component. Check whether its callback supplies a scalar, array, `Date`, range,
or another shape. For example, a file input may need `onFilesChange` rather
than a generic `onChange`.

## Keep UI values and schema values aligned

The UI control's value shape must match the form type and schema. If they
differ, convert explicitly at the field boundary and verify both directions:

1. Form value renders as the correct UI selection.
2. User interaction converts back to the expected form value.
3. Validation displays the corresponding field error.

Do not pass incompatible types through casts to silence a mismatch.
