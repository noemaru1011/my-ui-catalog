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
	type FormValues,
	GENDER_OPTIONS,
	INTEREST_OPTIONS,
	USER_OPTIONS,
} from '../schema/formExampleSchema';

type Props = {
	register: UseFormRegister<FormValues>;
	control: Control<FormValues>;
	errors: FieldErrors<FormValues>;
	onSubmit: React.FormEventHandler<HTMLFormElement>;
};

export default function FormExamplePresentation({ register, control, errors, onSubmit }: Props) {
	return (
		<Center maxWidth="xl">
			<Stack space="lg">
				<Heading type="sectionTitle">フォーム例</Heading>

				<form onSubmit={onSubmit}>
					<Stack space="lg">
						<Cluster space="lg" align="start">
							<Container width="lg">
								<Input
									id="name"
									label="氏名"
									required
									{...register('name')}
									error={errors.name?.message}
								/>
							</Container>

							<Container width="lg">
								<PasswordInput
									id="password"
									label="パスワード"
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
											label="カテゴリ"
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
											label="ユーザー"
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
											label="ユーザー（複数）"
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
											label="日付"
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
											label="期間"
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
											label="興味のある分野"
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
											label="性別"
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
									label="利用規約への同意"
									options={[
										{
											value: 'agreement',
											label: '利用規約に同意する',
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
								label="説明"
								required
								{...register('description')}
								error={errors.description?.message}
							/>
						</Container>

						<Cluster justify="between" align="center">
							<Link to="/#" label="戻る" />
							<Button type="submit">送信</Button>
						</Cluster>
					</Stack>
				</form>
			</Stack>
		</Center>
	);
}
