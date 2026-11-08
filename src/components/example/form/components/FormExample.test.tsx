import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { useExampleForm } from '../hooks/useForm';
import FormExamplePage from '../pages/FormPage';

describe('useExampleForm', () => {
	it('初期値でフォームの必須項目が未入力の状態である', () => {
		const { result } = renderHook(() => useExampleForm(), {
			wrapper: ({ children }) => (
				<QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
			),
		});

		expect(result.current.errors.name).toBeUndefined();
		expect(result.current.errors.password).toBeUndefined();
	});

	it('空のフォーム送信で必須バリデーションが発生する', async () => {
		const { result } = renderHook(() => useExampleForm(), {
			wrapper: ({ children }) => (
				<QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
			),
		});

		await act(async () => {
			await result.current.onSubmit({
				preventDefault: () => {},
			} as React.SubmitEvent<HTMLFormElement>);
		});

		expect(result.current.errors.name?.message).toBe('氏名を入力してください。');
		expect(result.current.errors.password?.message).toBe(
			'パスワードは8文字以上で入力してください。',
		);
		expect(result.current.errors.category?.message).toBe('カテゴリを選択してください。');
		expect(result.current.errors.user?.message).toBe('ユーザーを選択してください。');
		expect(result.current.errors.users?.message).toBe('ユーザーを1人以上選択してください。');
		expect(result.current.errors.agreement?.message).toBe('利用規約への同意が必要です。');
		expect(result.current.errors.interests?.message).toBe(
			'興味のある分野を1つ以上選択してください。',
		);
		expect(result.current.errors.gender?.message).toBe('性別を選択してください。');
		expect(result.current.errors.date?.message).toBe('日付を選択してください。');
		expect(result.current.errors.dateRange?.message).toBe('期間を選択してください。');
		expect(result.current.errors.description?.message).toBe('説明を入力してください。');
		expect(result.current.errors.attachments?.message).toBe('ファイルを選択してください。');
		expect(result.current.errors.buttonAttachments?.message).toBe('ファイルを選択してください。');
	});

	it('D&D版とボタン版の添付欄を表示し、両方の必須エラーを表示する', async () => {
		const user = userEvent.setup();

		render(
			<QueryClientProvider client={new QueryClient()}>
				<MemoryRouter>
					<FormExamplePage />
				</MemoryRouter>
			</QueryClientProvider>,
		);

		expect(screen.getByLabelText('添付ファイル（ドラッグ＆ドロップ）')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: '添付ファイル（ボタン）' })).toBeInTheDocument();

		await user.click(screen.getByRole('button', { name: '送信' }));

		expect(screen.getAllByText('ファイルを選択してください。', { exact: true })).toHaveLength(2);
	});
});
