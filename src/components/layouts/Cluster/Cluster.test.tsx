import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Cluster } from './Cluster';

describe('Cluster', () => {
	it('子要素を表示する', () => {
		render(
			<Cluster>
				{' '}
				<p>項目1</p> <p>項目2</p>{' '}
			</Cluster>,
		);

		expect(screen.getByText('項目1')).toBeInTheDocument();
		expect(screen.getByText('項目2')).toBeInTheDocument();
	});

	it('デフォルトのクラスを適用する', () => {
		const { container } = render(<Cluster>コンテンツ</Cluster>);
		const cluster = container.firstChild as HTMLElement;

		expect(cluster).toHaveClass('flex', 'flex-wrap', 'gap-4', 'justify-start', 'items-center');
	});

	it.each([
		['xs', 'gap-1'],
		['sm', 'gap-2'],
		['md', 'gap-4'],
		['lg', 'gap-6'],
		['xl', 'gap-8'],
	] as const)('space="%s" の場合、%s を適用する', (space, expectedClass) => {
		const { container } = render(<Cluster space={space}>コンテンツ</Cluster>);

		expect(container.firstChild).toHaveClass(expectedClass);
	});

	it.each([
		['start', 'justify-start'],
		['center', 'justify-center'],
		['end', 'justify-end'],
		['between', 'justify-between'],
	] as const)('justify="%s" の場合、%s を適用する', (justify, expectedClass) => {
		const { container } = render(<Cluster justify={justify}>コンテンツ</Cluster>);

		expect(container.firstChild).toHaveClass(expectedClass);
	});

	it.each([
		['start', 'items-start'],
		['center', 'items-center'],
		['end', 'items-end'],
		['stretch', 'items-stretch'],
	] as const)('align="%s" の場合、%s を適用する', (align, expectedClass) => {
		const { container } = render(<Cluster align={align}>コンテンツ</Cluster>);

		expect(container.firstChild).toHaveClass(expectedClass);
	});
});
