import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('表示', () => {
		it('ラベルとデフォルトのプレースホルダーを表示する', () => {
			render(<DatePicker id="date" label="開始日" />);

			expect(screen.getByText('開始日')).toBeInTheDocument();
			expect(
				screen.getByText('日付を選択', {
					selector: 'button',
				}),
			).toBeInTheDocument();
		});

		it('指定したプレースホルダーを表示する', () => {
			render(<DatePicker id="date" label="開始日" placeholder="日付を入力してください" />);

			expect(
				screen.getByText('日付を入力してください', {
					selector: 'button',
				}),
			).toBeInTheDocument();
		});

		it('value に指定した日付を yyyy/MM/dd 形式で表示する', () => {
			render(<DatePicker id="date" label="開始日" value={new Date(2024, 5, 15)} />);

			expect(
				screen.getByText('2024/06/15', {
					selector: 'button',
				}),
			).toBeInTheDocument();
		});

		it('required が true の場合に必須マークを表示する', () => {
			render(<DatePicker id="date" label="開始日" required />);

			expect(screen.getByText('*')).toBeInTheDocument();
		});

		it('required が false の場合に必須マークを表示しない', () => {
			render(<DatePicker id="date" label="開始日" />);

			expect(screen.queryByText('*')).not.toBeInTheDocument();
		});

		it('description が指定された場合に説明文を表示する', () => {
			render(<DatePicker id="date" label="開始日" description="開始日を選択してください" />);

			expect(screen.getByText('開始日を選択してください')).toBeInTheDocument();
		});

		it('description が未指定の場合に説明文を表示しない', () => {
			render(<DatePicker id="date" label="開始日" />);

			expect(screen.queryByText('開始日を選択してください')).not.toBeInTheDocument();
		});
	});

	describe('エラー状態', () => {
		it('error が指定された場合にエラーメッセージを表示する', () => {
			render(<DatePicker id="date" label="開始日" error="開始日は必須です" />);

			expect(screen.getByText('開始日は必須です')).toBeInTheDocument();
		});

		it('error が指定された場合に aria-invalid を true にする', () => {
			render(<DatePicker id="date" label="開始日" error="開始日は必須です" />);

			expect(screen.getByRole('button', { name: '開始日' })).toHaveAttribute(
				'aria-invalid',
				'true',
			);
		});

		it('error が未指定の場合に aria-invalid を false にする', () => {
			render(<DatePicker id="date" label="開始日" />);

			expect(screen.getByRole('button', { name: '開始日' })).toHaveAttribute(
				'aria-invalid',
				'false',
			);
		});
	});

	describe('readOnly', () => {
		it('readOnly が true の場合に編集不可バッジを表示する', () => {
			render(<DatePicker id="date" label="開始日" readOnly />);

			expect(screen.getByText('編集不可')).toBeInTheDocument();
		});

		it('readOnly が false の場合に編集不可バッジを表示しない', () => {
			render(<DatePicker id="date" label="開始日" />);

			expect(screen.queryByText('編集不可')).not.toBeInTheDocument();
		});

		it('readOnly が true の場合に日付ボタンを無効化する', () => {
			render(<DatePicker id="date" label="開始日" readOnly />);

			expect(screen.getByRole('button', { name: '開始日編集不可' })).toBeDisabled();
		});

		it('readOnly が true の場合にカレンダーを開けない', async () => {
			const user = userEvent.setup();

			render(<DatePicker id="date" label="開始日" readOnly />);

			await user.click(screen.getByRole('button', { name: '開始日編集不可' }));

			expect(screen.queryByRole('grid')).not.toBeInTheDocument();
		});
	});

	describe('サイズ', () => {
		it.each([
			['sm', 'h-7'],
			['md', 'h-8'],
			['lg', 'h-10'],
		] as const)('inputSize が %s の場合に対応するクラスを設定する', (inputSize, expectedClass) => {
			render(<DatePicker id="date" label="開始日" inputSize={inputSize} />);

			expect(screen.getByRole('button', { name: '開始日' })).toHaveClass(expectedClass);
		});
	});

	describe('日付選択', () => {
		it('ボタンをクリックするとカレンダーを表示する', async () => {
			const user = userEvent.setup();

			render(<DatePicker id="date" label="開始日" value={new Date(2024, 5, 15)} />);

			await user.click(screen.getByRole('button', { name: '開始日' }));

			expect(await screen.findByRole('grid')).toBeInTheDocument();
		});

		it('日付を選択すると onChange を選択した Date で呼び出す', async () => {
			const user = userEvent.setup();
			const onChange = vi.fn();
			const selectedDate = new Date(2024, 5, 20);

			render(
				<DatePicker id="date" label="開始日" value={new Date(2024, 5, 15)} onChange={onChange} />,
			);

			await user.click(screen.getByRole('button', { name: '開始日' }));

			const calendar = await screen.findByRole('grid');

			await user.click(
				within(calendar).getByRole('button', {
					name: /June 20/i,
				}),
			);

			await waitFor(() => {
				expect(onChange).toHaveBeenCalledTimes(1);
				expect(onChange.mock.calls[0][0]).toEqual(selectedDate);
			});
		});

		it('onChange が未指定でも日付選択時にエラーにならない', async () => {
			const user = userEvent.setup();

			render(<DatePicker id="date" label="開始日" value={new Date(2024, 5, 15)} />);

			await user.click(screen.getByRole('button', { name: '開始日' }));

			const calendar = await screen.findByRole('grid');

			await expect(
				user.click(
					within(calendar).getByRole('button', {
						name: /June 20/i,
					}),
				),
			).resolves.toBeUndefined();
		});
	});
});
