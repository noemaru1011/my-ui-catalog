import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { HamburgerMenu } from './HamburgerMenu';

describe('HamburgerMenu', () => {
	it('メニューを開くボタンを表示する', () => {
		render(<HamburgerMenu>メニュー項目</HamburgerMenu>);

		expect(screen.getByRole('button', { name: 'メニューを開く' })).toBeInTheDocument();
	});

	it('ボタンをクリックすると子要素を表示する', async () => {
		const user = userEvent.setup();

		render(<HamburgerMenu>メニュー項目</HamburgerMenu>);

		expect(screen.queryByText('メニュー項目')).not.toBeInTheDocument();

		await user.click(screen.getByRole('button', { name: 'メニューを開く' }));

		expect(await screen.findByText('メニュー項目')).toBeInTheDocument();
	});

	it('複数の子要素を表示する', async () => {
		const user = userEvent.setup();

		render(
			<HamburgerMenu>
				<nav>
					<a href="/home">ホーム</a>
					<a href="/settings">設定</a>
				</nav>
			</HamburgerMenu>,
		);

		await user.click(screen.getByRole('button', { name: 'メニューを開く' }));

		expect(await screen.findByRole('link', { name: 'ホーム' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: '設定' })).toBeInTheDocument();
	});
});
