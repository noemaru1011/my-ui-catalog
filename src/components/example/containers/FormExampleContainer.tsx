import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import FormExamplePresentation from '../presentations/FormExamplePresentation';
import { DEFAULT_FORM_VALUES, FORM_SCHEMA, type FormValues } from '../schema/formExampleSchema';

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
