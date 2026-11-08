import type { TFunction } from 'i18next';
import { z } from 'zod';
import i18n from '@/i18n';

export const MAX_ATTACHMENT_COUNT = 2;
export const MAX_ATTACHMENT_SIZE_IN_BYTES = 1 * 1024 * 1024;

export function createAttachmentsSchema(t: TFunction) {
	return z
		.array(z.file().max(MAX_ATTACHMENT_SIZE_IN_BYTES, t('example.story.form.errorAttachmentSize')))
		.min(1, t('example.story.form.errorAttachmentRequired'))
		.max(
			MAX_ATTACHMENT_COUNT,
			t('example.story.form.errorAttachmentCount', { count: MAX_ATTACHMENT_COUNT }),
		);
}

export const ATTACHMENTS_SCHEMA = createAttachmentsSchema(i18n.t);

export function createFormSchema(t: TFunction) {
	const attachmentsSchema = createAttachmentsSchema(t);
	return z.object({
		name: z.string().min(1, t('example.story.form.errorName')),
		password: z.string().min(8, t('example.story.form.errorPassword')),
		category: z.string().min(1, t('example.story.form.errorCategory')),
		user: z.string().min(1, t('example.story.form.errorUser')),
		users: z.array(z.string()).min(1, t('example.story.form.errorUsers')),
		agreement: z.array(z.string()).min(1, t('example.story.form.errorAgreement')),
		interests: z.array(z.string()).min(1, t('example.story.form.errorInterests')),
		gender: z.string().min(1, t('example.story.form.errorGender')),
		date: z.date({
			message: t('example.story.form.errorDate'),
		}),
		dateRange: z
			.object({
				from: z.date(),
				to: z.date().optional(),
			})
			.optional()
			.refine((value) => value?.from && value?.to, {
				message: t('example.story.form.errorPeriod'),
			}),
		description: z.string().min(1, t('example.story.form.errorDescription')),
		attachments: attachmentsSchema,
		buttonAttachments: attachmentsSchema,
	});
}

export const FORM_SCHEMA = createFormSchema(i18n.t);

export type FormValues = z.infer<typeof FORM_SCHEMA>;

export function createFormOptions(t: TFunction) {
	return {
		category: [
			{ value: 'engineering', label: t('example.story.form.categoryEngineering') },
			{ value: 'design', label: t('example.story.form.categoryDesign') },
			{ value: 'sales', label: t('example.story.form.categorySales') },
		],
		users: [
			{ value: 'tanaka', label: t('example.story.form.userTanaka') },
			{ value: 'sato', label: t('example.story.form.userSato') },
			{ value: 'suzuki', label: t('example.story.form.userSuzuki') },
			{ value: 'takahashi', label: t('example.story.form.userTakahashi') },
		],
		interests: [
			{ value: 'programming', label: t('example.story.form.interestProgramming') },
			{ value: 'design', label: t('example.story.form.interestDesign') },
			{ value: 'reading', label: t('example.story.form.interestReading') },
		],
		gender: [
			{ value: 'male', label: t('example.story.form.genderMale') },
			{ value: 'female', label: t('example.story.form.genderFemale') },
			{ value: 'other', label: t('example.story.form.genderOther') },
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
