import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import i18n from '@/i18n';
import type { FormValues } from '../schema/formSchema';
import { useExampleForm } from './useForm';

type MutationOptions = {
	mutationFn: (values: FormValues) => Promise<void>;
	onSuccess: () => void;
	onError: () => void;
};

const MOCKS = vi.hoisted(() => ({
	errors: {} as Record<string, unknown>,
	mutationOptions: undefined as MutationOptions | undefined,
	mutate: vi.fn(),
	reset: vi.fn(),
	setError: vi.fn(),
	clearErrors: vi.fn(),
	trigger: vi.fn(),
	toastAdd: vi.fn(),
}));

vi.mock('react-hook-form', async (importOriginal) => {
	const actual = await importOriginal<typeof import('react-hook-form')>();
	return {
		...actual,
		useForm: () => ({
			register: vi.fn(),
			control: {},
			handleSubmit:
				(onValid: (values: FormValues) => void) => (event: { preventDefault?: () => void }) => {
					event.preventDefault?.();
					onValid({
						name: 'Test',
						password: 'password123',
						category: 'engineering',
						user: 'tanaka',
						users: ['tanaka'],
						agreement: ['agreement'],
						interests: ['programming'],
						gender: 'other',
						date: new Date('2026-01-01T00:00:00.000Z'),
						dateRange: {
							from: new Date('2026-01-01T00:00:00.000Z'),
							to: new Date('2026-01-02T00:00:00.000Z'),
						},
						description: 'Description',
						attachments: [new File(['file'], 'document.pdf')],
						buttonAttachments: [new File(['file'], 'document.pdf')],
					});
				},
			setError: MOCKS.setError,
			clearErrors: MOCKS.clearErrors,
			formState: { errors: MOCKS.errors },
			trigger: MOCKS.trigger,
			reset: MOCKS.reset,
		}),
	};
});

vi.mock('@tanstack/react-query', () => ({
	useMutation: (options: MutationOptions) => {
		MOCKS.mutationOptions = options;
		return { mutate: MOCKS.mutate, isPending: false };
	},
}));

vi.mock('@/components/ui/toast', () => ({
	toast: { add: MOCKS.toastAdd },
}));

function SubmitForm() {
	const { onSubmit } = useExampleForm();

	return (
		<form onSubmit={onSubmit}>
			<button type="submit">送信</button>
		</form>
	);
}

describe('useExampleForm', () => {
	afterEach(() => {
		vi.restoreAllMocks();
		vi.clearAllMocks();
		vi.useRealTimers();
	});

	it('有効な送信を mutation に渡し、成功・失敗の通知を処理する', async () => {
		const user = userEvent.setup();
		const log = vi.spyOn(console, 'log').mockImplementation(() => {});
		render(<SubmitForm />);
		const formValues = {
			name: 'Test',
			password: 'password123',
			category: 'engineering',
			user: 'tanaka',
			users: ['tanaka'],
			agreement: ['agreement'],
			interests: ['programming'],
			gender: 'other',
			date: new Date('2026-01-01T00:00:00.000Z'),
			dateRange: {
				from: new Date('2026-01-01T00:00:00.000Z'),
				to: new Date('2026-01-02T00:00:00.000Z'),
			},
			description: 'Description',
			attachments: [new File(['file'], 'document.pdf')],
			buttonAttachments: [new File(['file'], 'document.pdf')],
		} satisfies FormValues;

		await user.click(screen.getByRole('button', { name: '送信' }));
		expect(MOCKS.mutate).toHaveBeenCalledOnce();

		vi.useFakeTimers();
		const mutation = MOCKS.mutationOptions;
		expect(mutation).toBeDefined();
		const pending = mutation?.mutationFn(formValues);
		await vi.advanceTimersByTimeAsync(3000);
		await pending;
		expect(log).toHaveBeenCalledWith('送信データ:', formValues);

		act(() => mutation?.onSuccess());
		expect(MOCKS.toastAdd).toHaveBeenCalledWith(expect.objectContaining({ type: 'success' }));
		expect(MOCKS.reset).toHaveBeenCalledOnce();

		act(() => mutation?.onError());
		expect(MOCKS.toastAdd).toHaveBeenLastCalledWith(expect.objectContaining({ type: 'error' }));
	});

	it('公開されたエラー操作をフォームから利用できる', () => {
		const { result } = renderHook(() => useExampleForm());

		result.current.setError('name', { type: 'manual', message: 'Required' });
		result.current.clearErrors('name');

		expect(MOCKS.setError).toHaveBeenCalledWith('name', {
			type: 'manual',
			message: 'Required',
		});
		expect(MOCKS.clearErrors).toHaveBeenCalledWith('name');
	});

	it('言語を変更してもエラーがなければ再検証しない', async () => {
		await i18n.changeLanguage('ja');
		renderHook(() => useExampleForm());

		try {
			await act(async () => {
				await i18n.changeLanguage('en');
			});
			expect(MOCKS.trigger).not.toHaveBeenCalled();
		} finally {
			await i18n.changeLanguage('ja');
		}
	});
});
