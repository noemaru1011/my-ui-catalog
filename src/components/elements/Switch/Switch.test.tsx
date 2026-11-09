import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Switch } from './Switch';

describe('Switch', () => {
	it('label がない場合はラベルなしのスイッチを表示する', () => {
		render(<Switch aria-label="通知切り替え" />);

		expect(screen.getByRole('switch', { name: '通知切り替え' })).toBeInTheDocument();
		expect(screen.queryByText('通知')).not.toBeInTheDocument();
	});

	it('ラベルを左側に表示する', () => {
		render(<Switch id="notifications" aria-label="通知切り替え" label="通知" />);

		const label = screen.getByText('通知');
		const toggle = screen.getByRole('switch', { name: '通知切り替え' });
		expect(label).toHaveAttribute('for', 'notifications');
		expect(label.compareDocumentPosition(toggle) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
	});

	it('ラベルを右側に表示する', () => {
		render(
			<Switch id="notifications" aria-label="通知切り替え" label="通知" labelPosition="right" />,
		);

		const label = screen.getByText('通知');
		const toggle = screen.getByRole('switch', { name: '通知切り替え' });
		expect(label).toHaveAttribute('for', 'notifications');
		expect(toggle.compareDocumentPosition(label) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
	});
});
