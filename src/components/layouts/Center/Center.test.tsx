import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Center } from './Center';

describe('Center', () => {
	it('子要素を表示する', () => {
		render(
			<Center>
				<p>コンテンツ</p>
			</Center>,
		);

		expect(screen.getByText('コンテンツ')).toBeInTheDocument();
	});

	it('デフォルトで lg の最大幅を適用する', () => {
		render(
			<Center>
				<p>コンテンツ</p>
			</Center>,
		);

		expect(screen.getByText('コンテンツ').parentElement).toHaveClass(
			'mx-auto',
			'w-full',
			'max-w-screen-lg',
		);
	});

	it.each([
		['sm', 'max-w-screen-sm'],
		['md', 'max-w-screen-md'],
		['lg', 'max-w-screen-lg'],
		['xl', 'max-w-screen-xl'],
		['full', 'max-w-full'],
	] as const)('maxWidth="%s" の場合、対応するクラスを適用する', (maxWidth, expectedClass) => {
		render(
			<Center maxWidth={maxWidth}>
				<p>コンテンツ</p>
			</Center>,
		);

		expect(screen.getByText('コンテンツ').parentElement).toHaveClass(expectedClass);
	});

	it('複数の子要素を表示する', () => {
		render(
			<Center>
				<p>コンテンツ1</p>
				<p>コンテンツ2</p>
			</Center>,
		);

		expect(screen.getByText('コンテンツ1')).toBeInTheDocument();
		expect(screen.getByText('コンテンツ2')).toBeInTheDocument();
	});
});
