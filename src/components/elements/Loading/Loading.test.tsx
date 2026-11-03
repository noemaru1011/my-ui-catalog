import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Loading } from './Loading';

describe('Loading', () => {
	it('デフォルトのメッセージが表示されること', () => {
		render(<Loading />);

		expect(screen.getByText('読み込み中')).toBeInTheDocument();
	});

	it('指定したメッセージが表示されること', () => {
		render(<Loading message="データを取得しています" />);

		expect(screen.getByText('データを取得しています')).toBeInTheDocument();
	});

	it('statusロールが設定されていること', () => {
		render(<Loading />);

		expect(screen.getByRole('status')).toBeInTheDocument();
	});

	it('aria-live属性がpoliteに設定されていること', () => {
		render(<Loading />);

		expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
	});

	it('aria-atomic属性がtrueに設定されていること', () => {
		render(<Loading />);

		expect(screen.getByRole('status')).toHaveAttribute('aria-atomic', 'true');
	});

	it('aria-busy属性がtrueに設定されていること', () => {
		render(<Loading />);

		expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true');
	});

	it('Spinnerが描画されていること', () => {
		const { container } = render(<Loading />);

		const spinner = container.querySelector('[aria-hidden="true"]');

		expect(spinner).toBeInTheDocument();
	});

	it('Spinnerがスクリーンリーダーの読み上げ対象外であること', () => {
		const { container } = render(<Loading />);

		const spinner = container.querySelector('[aria-hidden="true"]');

		expect(spinner).toHaveAttribute('aria-hidden', 'true');
	});

	it('空文字のメッセージが指定された場合に空文字が表示されること', () => {
		render(<Loading message="" />);

		expect(screen.getByRole('status')).toBeInTheDocument();
		expect(screen.queryByText('読み込み中')).not.toBeInTheDocument();
	});
});
