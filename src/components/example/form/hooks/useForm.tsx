import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from '@/components/ui/toast';
import { createFormSchema, DEFAULT_FORM_VALUES, type FormValues } from '../schema/formSchema';

export function useExampleForm() {
	const { t, i18n } = useTranslation();
	const previousLanguage = useRef(i18n.language);

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		trigger,
		reset,
	} = useForm<FormValues>({
		resolver: zodResolver(createFormSchema(t)),
		defaultValues: DEFAULT_FORM_VALUES,
	});

	//言語切り替え時にフォームのバリデーションを再実行する副作用
	useEffect(() => {
		if (previousLanguage.current === i18n.language) {
			return;
		}

		previousLanguage.current = i18n.language;

		if (Object.keys(errors).length > 0) {
			void trigger();
		}
	}, [errors, i18n.language, trigger]);

	const { mutate, isPending } = useMutation({
		mutationFn: async () => {
			await new Promise((resolve) => setTimeout(resolve, 3000));
		},
		onSuccess: () => {
			toast.add({
				title: t('example.story.form.saved'),
				description: t('example.story.form.savedDescription'),
				type: 'success',
			});
			reset();
		},
		onError: () => {
			toast.add({
				title: t('example.story.form.error'),
				description: t('example.story.form.errorDescriptionToast'),
				type: 'error',
			});
		},
	});

	const onSubmit = handleSubmit(() => {
		mutate();
	});

	return {
		register,
		control,
		errors,
		onSubmit,
		isPending,
	};
}
