import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Blockquote } from './Blockquote';

describe('Blockquote', () => {
	it('子要素が正しく表示されること', () => {
		render(<Blockquote>引用テキスト</Blockquote>);

		expect(screen.getByText('引用テキスト')).toBeInTheDocument();
	});

	it('複数の子要素が正しく表示されること', () => {
		render(
			<Blockquote>
				<p>引用テキスト1</p>
				<p>引用テキスト2</p>
			</Blockquote>,
		);

		expect(screen.getByText('引用テキスト1')).toBeInTheDocument();
		expect(screen.getByText('引用テキスト2')).toBeInTheDocument();
	});

	it('blockquote要素が正しく描画されること', () => {
		const { container } = render(<Blockquote>引用テキスト</Blockquote>);

		const blockquote = container.querySelector('blockquote');

		expect(blockquote).toBeInTheDocument();
		expect(blockquote).toHaveTextContent('引用テキスト');
	});

	it('縦向きのSeparatorが描画されること', () => {
		const { container } = render(<Blockquote>引用テキスト</Blockquote>);

		const separator = container.querySelector('[data-orientation="vertical"]');

		expect(separator).toBeInTheDocument();
	});

	it('子要素がコンテンツ領域内に配置されること', () => {
		render(<Blockquote>引用テキスト</Blockquote>);

		const content = screen.getByText('引用テキスト');

		expect(content).toHaveClass('min-w-0', 'flex-1', 'py-2');
	});

	it('子要素がnullの場合でも正常に描画されること', () => {
		const { container } = render(<Blockquote>{null}</Blockquote>);

		expect(container.querySelector('blockquote')).toBeInTheDocument();
	});
});
