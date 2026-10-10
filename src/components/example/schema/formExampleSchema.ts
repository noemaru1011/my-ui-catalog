import { z } from 'zod';

export const FORM_SCHEMA = z.object({
	name: z.string().min(1, '氏名を入力してください。'),
	password: z.string().min(8, 'パスワードは8文字以上で入力してください。'),
	category: z.string().min(1, 'カテゴリを選択してください。'),
	user: z.string().min(1, 'ユーザーを選択してください。'),
	users: z.array(z.string()).min(1, 'ユーザーを1人以上選択してください。'),
	agreement: z.array(z.string()).min(1, '利用規約への同意が必要です。'),
	interests: z.array(z.string()).min(1, '興味のある分野を1つ以上選択してください。'),
	gender: z.string().min(1, '性別を選択してください。'),
	date: z.date({
		message: '日付を選択してください。',
	}),
	dateRange: z
		.object({
			from: z.date(),
			to: z.date().optional(),
		})
		.optional()
		.refine((value) => value?.from && value?.to, {
			message: '期間を選択してください。',
		}),
	description: z.string().min(1, '説明を入力してください。'),
});

export type FormValues = z.infer<typeof FORM_SCHEMA>;

export const CATEGORY_OPTIONS = [
	{ value: 'engineering', label: 'エンジニアリング' },
	{ value: 'design', label: 'デザイン' },
	{ value: 'sales', label: '営業' },
];

export const USER_OPTIONS = [
	{ value: 'tanaka', label: '田中太郎' },
	{ value: 'sato', label: '佐藤花子' },
	{ value: 'suzuki', label: '鈴木一郎' },
	{ value: 'takahashi', label: '高橋美咲' },
];

export const INTEREST_OPTIONS = [
	{ value: 'programming', label: 'プログラミング' },
	{ value: 'design', label: 'デザイン' },
	{ value: 'reading', label: '読書' },
];

export const GENDER_OPTIONS = [
	{ value: 'male', label: '男性' },
	{ value: 'female', label: '女性' },
	{ value: 'other', label: 'その他' },
];

export const DEFAULT_FORM_VALUES: FormValues = {
	name: '',
	password: '',
	category: '',
	user: '',
	users: [],
	agreement: [],
	interests: [],
	gender: '',
	date: undefined as unknown as Date,
	dateRange: undefined,
	description: '',
};
