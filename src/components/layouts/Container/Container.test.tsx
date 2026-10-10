import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Container } from './Container';

describe('Container', () => {
	it('デフォルトで w-full を適用する', () => {
		const { container } = render(<Container>コンテンツ</Container>);

		expect(container.firstChild).toHaveClass('w-full');
	});

	it.each([
		['sm', 'w-64'],
		['md', 'w-72'],
		['lg', 'w-80'],
		['xl', 'w-96'],
		['2xl', 'w-2xl'],
		['3xl', 'w-3xl'],
		['full', 'w-full'],
	] as const)('width="%s" のとき %s を適用する', (width, expectedClass) => {
		const { container } = render(<Container width={width}>コンテンツ</Container>);

		expect(container.firstChild).toHaveClass(expectedClass);
	});

	it('子要素を表示する', () => {
		render(<Container>テストコンテンツ</Container>);

		expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
	});

	it('子要素がなくても表示できる', () => {
		const { container } = render(<Container />);

		expect(container.firstChild).toBeInTheDocument();
		expect(container.firstChild).toHaveClass('w-full');
	});
});
