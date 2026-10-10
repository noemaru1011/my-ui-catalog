import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Accordion } from './Accordion';

function renderAccordion(props: { defaultValue?: string[]; multiple?: boolean } = {}) {
	return render(
		<Accordion {...props}>
			<Accordion.Item value="a" trigger="項目A">
				内容A
			</Accordion.Item>
			<Accordion.Item value="b" trigger="項目B">
				内容B
			</Accordion.Item>
		</Accordion>,
	);
}
describe('Accordion', () => {
	it('初期状態ではすべて閉じている', () => {
		renderAccordion();

		expect(screen.getByRole('button', { name: '項目A' })).toHaveAttribute('aria-expanded', 'false');

		expect(screen.getByRole('button', { name: '項目B' })).toHaveAttribute('aria-expanded', 'false');
	});

	it('defaultValue で指定した項目を開く', () => {
		renderAccordion({ defaultValue: ['a'] });

		expect(screen.getByRole('button', { name: '項目A' })).toHaveAttribute('aria-expanded', 'true');
	});

	it('クリックで項目を開閉する', async () => {
		const user = userEvent.setup();
		renderAccordion();

		const trigger = screen.getByRole('button', {
			name: '項目A',
		});

		await user.click(trigger);
		expect(trigger).toHaveAttribute('aria-expanded', 'true');

		await user.click(trigger);
		expect(trigger).toHaveAttribute('aria-expanded', 'false');
	});

	it('multiple=false では同時に1項目だけ開く', async () => {
		const user = userEvent.setup();
		renderAccordion({ multiple: false });

		const triggerA = screen.getByRole('button', {
			name: '項目A',
		});
		const triggerB = screen.getByRole('button', {
			name: '項目B',
		});

		await user.click(triggerA);
		await user.click(triggerB);

		expect(triggerA).toHaveAttribute('aria-expanded', 'false');
		expect(triggerB).toHaveAttribute('aria-expanded', 'true');
	});

	it('multiple=true では複数項目を開ける', async () => {
		const user = userEvent.setup();
		renderAccordion({ multiple: true });

		const triggerA = screen.getByRole('button', {
			name: '項目A',
		});
		const triggerB = screen.getByRole('button', {
			name: '項目B',
		});

		await user.click(triggerA);
		await user.click(triggerB);

		expect(triggerA).toHaveAttribute('aria-expanded', 'true');
		expect(triggerB).toHaveAttribute('aria-expanded', 'true');
	});

	it('disabled の項目は開けない', async () => {
		const user = userEvent.setup();

		render(
			<Accordion>
				<Accordion.Item value="a" trigger="項目A" disabled>
					内容A
				</Accordion.Item>
			</Accordion>,
		);

		const trigger = screen.getByRole('button', {
			name: '項目A',
		});

		expect(trigger).toHaveAttribute('aria-disabled', 'true');

		await user.click(trigger);

		expect(trigger).toHaveAttribute('aria-expanded', 'false');
	});
});
