import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Disclosure } from './Disclosure';

describe('Disclosure', () => {
	it('初期状態とクリックでコンテンツの表示を切り替える', async () => {
		const user = userEvent.setup();

		render(
			<Disclosure triggerText="詳細を表示">
				<span>詳細コンテンツ</span>
			</Disclosure>,
		);

		const trigger = screen.getByRole('button', { name: '詳細を表示' });
		expect(trigger).toHaveAttribute('aria-expanded', 'false');
		expect(screen.queryByText('詳細コンテンツ')).not.toBeInTheDocument();

		await user.click(trigger);
		expect(trigger).toHaveAttribute('aria-expanded', 'true');
		expect(screen.getByText('詳細コンテンツ')).toBeInTheDocument();

		await user.click(trigger);
		expect(trigger).toHaveAttribute('aria-expanded', 'false');
		expect(screen.queryByText('詳細コンテンツ')).not.toBeInTheDocument();
	});

	it('defaultOpen が true の場合は最初からコンテンツを表示する', () => {
		render(
			<Disclosure triggerText="詳細を表示" defaultOpen>
				<span>詳細コンテンツ</span>
			</Disclosure>,
		);

		expect(screen.getByRole('button', { name: '詳細を表示' })).toHaveAttribute(
			'aria-expanded',
			'true',
		);
		expect(screen.getByText('詳細コンテンツ')).toBeInTheDocument();
	});
});
