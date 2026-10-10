import { describe, expect, it } from 'vitest';

import { withoutExternalStyle } from './WithoutExternalStyle';

describe('withoutExternalStyle', () => {
	it('className と style を除外する', () => {
		const props = {
			id: 'test-checkbox',
			title: 'テスト',
			className: 'custom-class',
			style: { color: 'red' },
		};

		const result = withoutExternalStyle(
			props as unknown as {
				id: string;
				title: string;
				className?: never;
				style?: never;
			},
		);

		expect(result).toEqual({
			id: 'test-checkbox',
			title: 'テスト',
		});

		expect(result).not.toHaveProperty('className');
		expect(result).not.toHaveProperty('style');
	});

	it('className と style がない場合も他の props を保持する', () => {
		const props = {
			id: 'test-checkbox',
			title: 'テスト',
		};

		const result = withoutExternalStyle(
			props as {
				id: string;
				title: string;
				className?: never;
				style?: never;
			},
		);

		expect(result).toEqual({
			id: 'test-checkbox',
			title: 'テスト',
		});
	});
});
