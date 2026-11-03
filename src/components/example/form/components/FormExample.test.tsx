import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useExampleForm } from '../hooks/useExampleForm';

describe('useExampleForm', () => {
	it('初期値でフォームの必須項目が未入力の状態である', () => {
		const { result } = renderHook(() => useExampleForm());

		expect(result.current.errors.name).toBeUndefined();
		expect(result.current.errors.password).toBeUndefined();
	});

	it('空のフォーム送信で必須バリデーションが発生する', async () => {
		const { result } = renderHook(() => useExampleForm());

		await act(async () => {
			await result.current.handleSubmit(() => {})({
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
	});
});
