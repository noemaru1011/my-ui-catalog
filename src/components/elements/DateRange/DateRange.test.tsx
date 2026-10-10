import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { DateRange as DateRangeType } from 'react-day-picker';
import { describe, expect, it, vi } from 'vitest';

import { DateRange } from './DateRange';

vi.mock('@/components/ui/calendar', () => ({
	// biome-ignore lint/style/useNamingConvention: Must match the named export.
	Calendar: ({
		onSelect: handleSelect,
		numberOfMonths,
	}: {
		onSelect?: (range: DateRangeType | undefined) => void;
		numberOfMonths?: number;
	}) => (
		<div data-testid="calendar" data-months={numberOfMonths}>
			<button
				type="button"
				onClick={() =>
					handleSelect?.({
						from: new Date(2026, 9, 10),
						to: new Date(2026, 9, 15),
					})
				}
			>
				テスト用の日付範囲を選択
			</button>
		</div>
	),
}));

describe('DateRange', () => {
	it('ラベルとデフォルトのプレースホルダーを表示する', () => {
		render(<DateRange id="period" label="対象期間" />);

		expect(screen.getByText('対象期間')).toBeInTheDocument();
		expect(screen.getByText('期間を選択', { selector: 'button' })).toBeInTheDocument();
	});

	it('placeholder を指定すると指定した文言を表示する', () => {
		render(<DateRange id="period" label="対象期間" placeholder="開始日と終了日を選択" />);

		expect(screen.getByText('開始日と終了日を選択', { selector: 'button' })).toBeInTheDocument();
	});

	it('required が true の場合に必須マークを表示する', () => {
		render(<DateRange id="period" label="対象期間" required />);

		expect(screen.getByText('*')).toBeInTheDocument();
	});

	it('description が指定された場合に説明文を表示する', () => {
		render(
			<DateRange id="period" label="対象期間" description="対象となる期間を選択してください" />,
		);

		expect(screen.getByText('対象となる期間を選択してください')).toBeInTheDocument();
	});

	it('error が指定された場合にエラーメッセージと aria-invalid を設定する', () => {
		render(<DateRange id="period" label="対象期間" error="期間を指定してください" />);

		expect(screen.getByText('期間を指定してください')).toBeInTheDocument();

		expect(screen.getByRole('button', { name: '対象期間' })).toHaveAttribute(
			'aria-invalid',
			'true',
		);
	});

	it('value.from のみ指定された場合は開始日の後にハイフンを表示する', () => {
		render(<DateRange id="period" label="対象期間" value={{ from: new Date(2026, 9, 10) }} />);

		expect(screen.getByText(/2026\/10\/10\s*-/, { selector: 'button' })).toBeInTheDocument();
	});

	it('開始日と終了日が指定された場合は両方の日付を表示する', () => {
		render(
			<DateRange
				id="period"
				label="対象期間"
				value={{
					from: new Date(2026, 9, 10),
					to: new Date(2026, 9, 15),
				}}
			/>,
		);

		expect(
			screen.getByText(/2026\/10\/10\s*-\s*2026\/10\/15/, { selector: 'button' }),
		).toBeInTheDocument();
	});

	it('readOnly が true の場合は編集不可バッジを表示してボタンを無効化する', () => {
		render(<DateRange id="period" label="対象期間" readOnly />);

		expect(screen.getByText('編集不可')).toBeInTheDocument();

		expect(screen.getByRole('button', { name: /対象期間/ })).toBeDisabled();
	});

	it('inputSize に sm、md、lg を指定できる', () => {
		const { rerender } = render(<DateRange id="period" label="対象期間" inputSize="sm" />);

		expect(screen.getByRole('button', { name: '対象期間' })).toHaveClass('h-7');

		rerender(<DateRange id="period" label="対象期間" inputSize="md" />);

		expect(screen.getByRole('button', { name: '対象期間' })).toHaveClass('h-8');

		rerender(<DateRange id="period" label="対象期間" inputSize="lg" />);

		expect(screen.getByRole('button', { name: '対象期間' })).toHaveClass('h-10');
	});

	it('指定した numberOfMonths を Calendar に渡す', async () => {
		const user = userEvent.setup();

		render(<DateRange id="period" label="対象期間" numberOfMonths={1} />);

		await user.click(screen.getByRole('button', { name: '対象期間' }));

		expect(screen.getByTestId('calendar')).toHaveAttribute('data-months', '1');
	});

	it('日付選択時に onChange を選択範囲とともに呼び出す', async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();

		const expectedRange: DateRangeType = {
			from: new Date(2026, 9, 10),
			to: new Date(2026, 9, 15),
		};

		render(<DateRange id="period" label="対象期間" onChange={onChange} />);

		await user.click(screen.getByRole('button', { name: '対象期間' }));

		await user.click(
			screen.getByRole('button', {
				name: 'テスト用の日付範囲を選択',
			}),
		);

		await waitFor(() => {
			expect(onChange).toHaveBeenCalledTimes(1);
			expect(onChange).toHaveBeenCalledWith(expectedRange);
		});
	});

	it('value と onChange が未指定でもレンダリングできる', () => {
		render(<DateRange id="period" label="対象期間" />);

		expect(screen.getByRole('button', { name: '対象期間' })).toBeInTheDocument();
	});
});
