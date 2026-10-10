import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Text } from './Text';

describe('Text', () => {
	describe('デフォルト props', () => {
		it('デフォルトのスタイルを適用して描画する', () => {
			render(<Text>Hello World</Text>);

			const element = screen.getByText('Hello World');

			expect(element.tagName).toBe('P');
			expect(element).toHaveClass('text-base', 'font-normal', 'text-foreground');
		});
	});

	describe('size', () => {
		it.each([
			['sm', 'text-sm'],
			['md', 'text-base'],
			['lg', 'text-lg'],
		] as const)('size="%s" の場合、%s を適用する', (size, expectedClass) => {
			render(<Text size={size}>Sample text</Text>);

			expect(screen.getByText('Sample text')).toHaveClass(expectedClass);
		});
	});

	describe('weight', () => {
		it.each([
			['normal', 'font-normal'],
			['bold', 'font-bold'],
		] as const)('weight="%s" の場合、%s を適用する', (weight, expectedClass) => {
			render(<Text weight={weight}>Sample text</Text>);

			expect(screen.getByText('Sample text')).toHaveClass(expectedClass);
		});
	});

	describe('color', () => {
		it.each([
			['default', 'text-foreground'],
			['muted', 'text-muted-foreground'],
		] as const)('color="%s" の場合、%s を適用する', (color, expectedClass) => {
			render(<Text color={color}>Sample text</Text>);

			expect(screen.getByText('Sample text')).toHaveClass(expectedClass);
		});
	});

	describe('children', () => {
		it('テキストの子要素を描画する', () => {
			render(<Text>テスト用テキスト</Text>);

			expect(screen.getByText('テスト用テキスト')).toBeInTheDocument();
		});

		it('React 要素の子要素を描画する', () => {
			render(
				<Text>
					<span>ネストされたテキスト</span>
				</Text>,
			);

			expect(screen.getByText('ネストされたテキスト')).toBeInTheDocument();
		});

		it('複数の子要素を描画する', () => {
			render(
				<Text>
					<span>First</span>
					<span>Second</span>
				</Text>,
			);

			expect(screen.getByText('First')).toBeInTheDocument();
			expect(screen.getByText('Second')).toBeInTheDocument();
		});
	});

	describe('props の組み合わせ', () => {
		it('指定されたすべてのスタイルを適用する', () => {
			render(
				<Text size="lg" weight="bold" color="muted">
					Styled text
				</Text>,
			);

			expect(screen.getByText('Styled text')).toHaveClass(
				'text-lg',
				'font-bold',
				'text-muted-foreground',
			);
		});

		it('一部の props のみ指定した場合、残りはデフォルト値を使用する', () => {
			render(
				<Text size="sm" color="muted">
					Partial props
				</Text>,
			);

			expect(screen.getByText('Partial props')).toHaveClass(
				'text-sm',
				'font-normal',
				'text-muted-foreground',
			);
		});
	});
});
