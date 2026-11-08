import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/toast';
import { DEFAULT_FORM_VALUES, FORM_SCHEMA, type FormValues } from '../schema/formSchema';

export function useExampleForm() {
	const {
		register,
		control,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors },
		reset,
	} = useForm<FormValues>({
		resolver: zodResolver(FORM_SCHEMA),
		defaultValues: DEFAULT_FORM_VALUES,
	});

	// TanStack Query の Mutation
	const { mutate, isPending } = useMutation({
		mutationFn: async (values: FormValues) => {
			console.log('送信データ:', values);
			await new Promise((resolve) => setTimeout(resolve, 3000));
		},
		onSuccess: () => {
			toast.add({
				title: '保存しました',
				description: '変更内容を保存しました。',
				type: 'success',
			});
			console.log('送信成功');
			reset();
		},
		onError: () => {
			toast.add({
				title: 'エラーが発生しました',
				description: 'もう一度お試しください。',
				type: 'error',
			});
		},
	});

	// React Hook Form の handleSubmit と連携
	const onSubmit = handleSubmit((values) => {
		mutate(values);
	});

	return {
		register,
		control,
		errors,
		onSubmit,
		isPending,
		setError,
		clearErrors,
	};
}
