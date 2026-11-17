import type { TFunction } from 'i18next';
import { z } from 'zod';
import i18n from '@/i18n';

export const MAX_ATTACHMENT_COUNT = 2;
export const MAX_ATTACHMENT_SIZE_IN_BYTES = 1 * 1024 * 1024;

export function createAttachmentsSchema(t: TFunction<'example'>) {
	return z
		.array(z.file().max(MAX_ATTACHMENT_SIZE_IN_BYTES, t('story.form.errorAttachmentSize')))
		.min(1, t('story.form.errorAttachmentRequired'))
		.max(
			MAX_ATTACHMENT_COUNT,
			t('story.form.errorAttachmentCount', { count: MAX_ATTACHMENT_COUNT }),
		);
}

const T_EXAMPLE = i18n.getFixedT(null, 'example');

export const ATTACHMENTS_SCHEMA = createAttachmentsSchema(T_EXAMPLE);

export function createFormSchema(t: TFunction<'example'>) {
	const attachmentsSchema = createAttachmentsSchema(t);
	return z.object({
		name: z.string().min(1, t('story.form.errorName')),
		password: z.string().min(8, t('story.form.errorPassword')),
		category: z.string().min(1, t('story.form.errorCategory')),
		user: z.string().min(1, t('story.form.errorUser')),
		users: z.array(z.string()).min(1, t('story.form.errorUsers')),
		agreement: z.array(z.string()).min(1, t('story.form.errorAgreement')),
		interests: z.array(z.string()).min(1, t('story.form.errorInterests')),
		gender: z.string().min(1, t('story.form.errorGender')),
		date: z.date({
			message: t('story.form.errorDate'),
		}),
		dateRange: z
			.object({
				from: z.date(),
				to: z.date().optional(),
			})
			.optional()
			.refine((value) => value?.from && value?.to, {
				message: t('story.form.errorPeriod'),
			}),
		description: z.string().min(1, t('story.form.errorDescription')),
		attachments: attachmentsSchema,
		buttonAttachments: attachmentsSchema,
	});
}

export const FORM_SCHEMA = createFormSchema(T_EXAMPLE);

export type FormValues = z.infer<typeof FORM_SCHEMA>;

export function createFormOptions(t: TFunction<'example'>) {
	return {
		category: [
			{ value: 'engineering', label: t('story.form.categoryEngineering') },
			{ value: 'design', label: t('story.form.categoryDesign') },
			{ value: 'sales', label: t('story.form.categorySales') },
		],
		users: [
			{ value: 'tanaka', label: t('story.form.userTanaka') },
			{ value: 'sato', label: t('story.form.userSato') },
			{ value: 'suzuki', label: t('story.form.userSuzuki') },
			{ value: 'takahashi', label: t('story.form.userTakahashi') },
		],
		interests: [
			{ value: 'programming', label: t('story.form.interestProgramming') },
			{ value: 'design', label: t('story.form.interestDesign') },
			{ value: 'reading', label: t('story.form.interestReading') },
		],
		gender: [
			{ value: 'male', label: t('story.form.genderMale') },
			{ value: 'female', label: t('story.form.genderFemale') },
			{ value: 'other', label: t('story.form.genderOther') },
		],
	};
}

export const DEFAULT_FORM_VALUES = {
	name: '',
	password: '',
	category: '',
	user: '',
	users: [],
	agreement: [],
	interests: [],
	gender: '',
	dateRange: undefined,
	description: '',
	attachments: [],
	buttonAttachments: [],
} satisfies Partial<FormValues>;
