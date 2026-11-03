import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Image } from './Image';

describe('Image', () => {
	it('画像と代替テキストを表示する', () => {
		render(<Image src="/sample.png" alt="サンプル画像" />);

		const image = screen.getByRole('img', { name: 'サンプル画像' });

		expect(image).toHaveAttribute('src', '/sample.png');
		expect(image).toHaveAttribute('alt', 'サンプル画像');
		expect(image).toHaveClass('block', 'h-auto', 'w-full');
	});

	it('descriptionがあるとfigcaptionを表示する', () => {
		render(<Image src="/sample.png" alt="サンプル画像" description="画像の説明文です。" />);

		expect(screen.getByText('画像の説明文です。')).toBeInTheDocument();
		expect(screen.getByText('画像の説明文です。').tagName).toBe('FIGCAPTION');
	});

	it('toが指定されたら画像をLinkで囲む', () => {
		render(
			<MemoryRouter>
				<Image src="/sample.png" alt="サンプル画像" to="/detail" />
			</MemoryRouter>,
		);

		const link = screen.getByRole('link', { name: 'サンプル画像' });

		expect(link).toHaveAttribute('href', '/detail');
		expect(link.querySelector('img')).toHaveAttribute('src', '/sample.png');
	});

	it('widthがfigureに適用される', () => {
		render(<Image src="/sample.png" alt="サンプル画像" width="320px" />);

		const figure = screen.getByRole('img', { name: 'サンプル画像' }).closest('figure');

		expect(figure).toHaveStyle({ width: '320px' });
	});
});
