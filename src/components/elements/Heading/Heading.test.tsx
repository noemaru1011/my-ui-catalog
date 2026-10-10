import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Heading } from './Heading';

describe('Heading', () => {
	it('デフォルトでh1として表示する', () => {
		render(<Heading>ページタイトル</Heading>);

		expect(screen.getByRole('heading', { level: 1, name: 'ページタイトル' })).toBeInTheDocument();
	});

	it.each([
		['sectionTitle', 1],
		['blockTitle', 2],
		['subBlockTitle', 3],
		['subSubBlockTitle', 4],
	] as const)('type="%s" の場合、h%dとして表示する', (type, level) => {
		render(<Heading type={type}>タイトル</Heading>);

		expect(screen.getByRole('heading', { level, name: 'タイトル' })).toBeInTheDocument();
	});

	it('prefixとsuffixを表示する', () => {
		render(
			<Heading prefix={<span>prefix</span>} suffix={<span>suffix</span>}>
				タイトル
			</Heading>,
		);

		const heading = screen.getByRole('heading', {
			level: 1,
			name: 'prefixタイトルsuffix',
		});

		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent('prefix');
		expect(heading).toHaveTextContent('タイトル');
		expect(heading).toHaveTextContent('suffix');
	});

	it('childrenにReact要素を指定できる', () => {
		render(
			<Heading>
				<strong>重要な</strong>タイトル
			</Heading>,
		);

		expect(screen.getByText('重要な').tagName).toBe('STRONG');
		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('重要なタイトル');
	});
});
