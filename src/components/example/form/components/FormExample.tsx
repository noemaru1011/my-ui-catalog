import type {
	Control,
	FieldErrors,
	UseFormClearErrors,
	UseFormRegister,
	UseFormSetError,
} from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Checkbox } from '@/components/elements/Checkbox/Checkbox';
import { Combobox } from '@/components/elements/Combobox/Combobox';
import { ComboboxMultiple } from '@/components/elements/ComboboxMultiple/ComboboxMultiple';
import { DatePicker } from '@/components/elements/DatePicker/DatePicker';
import { DateRange } from '@/components/elements/DateRange/DateRange';
import { FileUpload } from '@/components/elements/FileUpload/FileUpload';
import { FileUploadButton } from '@/components/elements/FileUploadButton/FileUploadButton';
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
	createFormOptions,
	type FormValues,
	MAX_ATTACHMENT_COUNT,
	MAX_ATTACHMENT_SIZE_IN_BYTES,
} from '../schema/formSchema';

type Props = {
	register: UseFormRegister<FormValues>;
	control: Control<FormValues>;
	errors: FieldErrors<FormValues>;
	setError: UseFormSetError<FormValues>;
	clearErrors: UseFormClearErrors<FormValues>;
	onSubmit: React.SubmitEventHandler<HTMLFormElement>;
	isPending: boolean;
};
export function FormExample({ register, control, errors, onSubmit, isPending }: Props) {
	const { t } = useTranslation();
	const options = createFormOptions(t);

	return (
		<Center maxWidth="xl">
			<Stack space="lg">
				<Heading type="sectionTitle">{t('example.story.form.title')}</Heading>

				<Stack space="lg" as="form" noValidate onSubmit={onSubmit}>
					<Cluster space="lg" align="start">
						<Container width="lg">
							<Input
								id="name"
								label={t('example.story.form.name')}
								required
								{...register('name')}
								error={errors.name?.message}
							/>
						</Container>

						<Container width="lg">
							<PasswordInput
								id="password"
								label={t('example.story.form.password')}
								required
								{...register('password')}
								error={errors.password?.message}
							/>
						</Container>

						<Container width="lg">
							<Controller
								name="category"
								control={control}
								render={({ field, fieldState }) => (
									<Select
										id={field.name}
										label={t('example.story.form.category')}
										value={field.value}
										required
										onChange={field.onChange}
										options={options.category}
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
										label={t('example.story.form.user')}
										value={field.value}
										required
										onChange={field.onChange}
										options={options.users}
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
										label={t('example.story.form.users')}
										value={field.value}
										required
										onChange={field.onChange}
										options={options.users}
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
										label={t('example.story.form.date')}
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
										label={t('example.story.form.period')}
										required
										value={field.value}
										onChange={field.onChange}
										error={fieldState.error?.message}
									/>
								)}
							/>
						</Container>
					</Cluster>

					<Cluster space="lg" align="start">
						<Container width="lg">
							<Controller
								name="interests"
								control={control}
								render={({ field, fieldState }) => (
									<Checkbox
										required
										label={t('example.story.form.interests')}
										options={options.interests}
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
										required
										label={t('example.story.form.gender')}
										options={options.gender}
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
								required
								label={t('example.story.form.agreement')}
								options={[
									{
										value: 'agreement',
										label: t('example.story.form.agreeTerms'),
									},
								]}
								value={field.value}
								onChange={field.onChange}
								error={fieldState.error?.message}
							/>
						)}
					/>

					<Container width="3xl">
						<Textarea
							id="description"
							label={t('example.story.form.description')}
							required
							{...register('description')}
							error={errors.description?.message}
						/>
					</Container>

					<Container width="xl">
						<Controller
							name="attachments"
							control={control}
							render={({ field, fieldState }) => (
								<FileUpload
									id={field.name}
									name={field.name}
									label={t('example.story.form.attachmentsDrop')}
									required
									value={field.value}
									onFilesChange={field.onChange}
									onBlur={field.onBlur}
									inputRef={field.ref}
									maxFiles={MAX_ATTACHMENT_COUNT}
									maxSize={MAX_ATTACHMENT_SIZE_IN_BYTES / (1024 * 1024)}
									error={fieldState.error?.message}
								/>
							)}
						/>
					</Container>

					<Container width="xl">
						<Controller
							name="buttonAttachments"
							control={control}
							render={({ field, fieldState }) => (
								<FileUploadButton
									fieldLabel="ファイル添付"
									id={field.name}
									name={field.name}
									label={t('example.story.form.attachmentsButton')}
									required
									value={field.value}
									onFilesChange={field.onChange}
									onBlur={field.onBlur}
									inputRef={field.ref}
									maxFiles={MAX_ATTACHMENT_COUNT}
									maxSize={MAX_ATTACHMENT_SIZE_IN_BYTES / (1024 * 1024)}
									error={fieldState.error?.message}
								/>
							)}
						/>
					</Container>

					<Cluster justify="between" align="center">
						<Link to="/#" label={t('common.back')} />
						<Button type="submit" loading={isPending}>
							{t('example.story.form.submit')}
						</Button>
					</Cluster>
				</Stack>
			</Stack>
		</Center>
	);
}
