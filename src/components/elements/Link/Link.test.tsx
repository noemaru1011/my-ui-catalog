import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Link } from './Link';

describe('Link', () => {
	it('labelを表示し、指定した遷移先を設定する', () => {
		render(
			<MemoryRouter>
				<Link to="/about" label="会社概要" />
			</MemoryRouter>,
		);

		const link = screen.getByRole('link', { name: '会社概要' });

		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', '/about');
	});

	it('sizeのデフォルト値はmd', () => {
		render(
			<MemoryRouter>
				<Link to="/" label="ホーム" />
			</MemoryRouter>,
		);

		expect(screen.getByRole('link', { name: 'ホーム' })).toHaveClass('text-base');
	});

	it.each([
		['sm', 'text-sm'],
		['md', 'text-base'],
		['lg', 'text-lg'],
	] as const)('size="%s" のスタイルを適用する', (size, className) => {
		render(
			<MemoryRouter>
				<Link to="/" label="ホーム" size={size} />
			</MemoryRouter>,
		);

		expect(screen.getByRole('link', { name: 'ホーム' })).toHaveClass(className);
	});

	it('prefixとsuffixを表示する', () => {
		render(
			<MemoryRouter>
				<Link to="/settings" label="設定" prefix={<span>前</span>} suffix={<span>後</span>} />
			</MemoryRouter>,
		);

		expect(screen.getByRole('link', { name: '前設定後' })).toBeInTheDocument();
		expect(screen.getByText('前')).toBeInTheDocument();
		expect(screen.getByText('後')).toBeInTheDocument();
	});
});
