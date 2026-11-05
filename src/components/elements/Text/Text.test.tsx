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

	describe('as', () => {
		it.each([
			['span', 'SPAN'],
			['strong', 'STRONG'],
			['em', 'EM'],
			['b', 'B'],
			['i', 'I'],
			['code', 'CODE'],
			['small', 'SMALL'],
			['mark', 'MARK'],
			['time', 'TIME'],
		] as const)('as="%s" の場合、%s 要素として描画する', (as, expectedTag) => {
			render(<Text as={as}>Sample text</Text>);

			expect(screen.getByText('Sample text').tagName).toBe(expectedTag);
		});
	});

	describe('size', () => {
		it.each([
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

		it('Text コンポーネントを入れ子にして描画する', () => {
			render(
				<Text>
					通常のテキスト
					<Text as="strong">
						太字テキスト
						<Text as="code">コード</Text>
					</Text>
				</Text>,
			);

			const strong = screen.getByText(/太字テキスト/);
			const code = screen.getByText('コード');

			expect(strong.tagName).toBe('STRONG');
			expect(code.tagName).toBe('CODE');
			expect(strong).toContainElement(code);
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

		it('size を省略した場合、デフォルトサイズを適用する', () => {
			render(<Text color="muted">Partial props</Text>);

			expect(screen.getByText('Partial props')).toHaveClass(
				'text-base',
				'font-normal',
				'text-muted-foreground',
			);
		});

		it('as とスタイル props を組み合わせて適用する', () => {
			render(
				<Text as="span" size="lg" weight="bold" color="muted">
					Styled span
				</Text>,
			);

			const element = screen.getByText('Styled span');

			expect(element.tagName).toBe('SPAN');
			expect(element).toHaveClass('text-lg', 'font-bold', 'text-muted-foreground');
		});
	});
});
