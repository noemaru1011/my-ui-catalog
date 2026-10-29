import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { DEFAULT_FORM_VALUES, FORM_SCHEMA, type FormValues } from '../schema/formExampleSchema';

export function useExampleForm() {
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

	return {
		register,
		control,
		handleSubmit,
		errors,
		onSubmit: handleSubmit(onSubmit),
	};
}
