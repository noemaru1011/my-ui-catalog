import { render } from '@testing-library/react';
import { createElement } from 'react';
import { describe, expect, it } from 'vitest';
import { List } from './List';

describe('List', () => {
	it('ListItem以外の子要素を渡すとエラーになる', () => {
		const invalidChild = createElement('div', null, 'Invalid');

		expect(() => render(createElement(List, null, [invalidChild] as never))).toThrow(
			'List children must be ListItem components.',
		);
	});

	it('ReactElementではない子要素を渡すとエラーになる', () => {
		expect(() => render(createElement(List, null, ['invalid'] as never))).toThrow(
			'List children must be ListItem components.',
		);
	});
});
