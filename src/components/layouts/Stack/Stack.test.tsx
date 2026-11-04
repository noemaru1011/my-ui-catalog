import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Stack } from './Stack';

describe('Stack', () => {
	it('デフォルトで div と flex flex-col gap-4 を適用する', () => {
		const { container } = render(<Stack>コンテンツ</Stack>);

		expect(container.firstChild).toHaveProperty('tagName', 'DIV');
		expect(container.firstChild).toHaveClass('flex', 'flex-col', 'gap-4');
	});

	it.each([
		['xs', 'gap-1'],
		['sm', 'gap-2'],
		['md', 'gap-4'],
		['lg', 'gap-6'],
		['xl', 'gap-8'],
	] as const)('space="%s" のとき %s を適用する', (space, expectedClass) => {
		const { container } = render(<Stack space={space} />);

		expect(container.firstChild).toHaveClass(expectedClass);
	});

	it('as で指定した要素を描画する', () => {
		render(<Stack as="section">セクション</Stack>);

		expect(screen.getByText('セクション').tagName).toBe('SECTION');
	});

	it('標準の props を受け渡す', () => {
		render(
			<Stack id="stack" data-testid="stack" role="list">
				コンテンツ
			</Stack>,
		);

		const element = screen.getByTestId('stack');

		expect(element).toHaveAttribute('id', 'stack');
		expect(element).toHaveAttribute('role', 'list');
	});

	it('子要素を表示する', () => {
		render(<Stack>テストコンテンツ</Stack>);

		expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
	});

	it('className を追加できない', () => {
		const { container } = render(
			<Stack {...({ className: 'custom-class' } as object)}>コンテンツ</Stack>,
		);

		expect(container.firstChild).toHaveClass('flex', 'flex-col', 'gap-4');
		expect(container.firstChild).not.toHaveClass('custom-class');
	});
});
