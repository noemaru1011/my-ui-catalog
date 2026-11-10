import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import i18n from '@/i18n';
import type { Member } from './columns';
import { DataTable } from './data-table';

const MEMBERS: Member[] = [
	{ id: 1, name: '山田 太郎', role: 'デザイナー', team: 'プロダクト' },
	{ id: 2, name: '佐藤 花子', role: 'エンジニア', team: '開発' },
	{ id: 3, name: '鈴木 次郎', role: 'マネージャー', team: 'プロダクト' },
	{ id: 4, name: '高橋 美咲', role: 'エンジニア', team: '開発' },
	{ id: 5, name: '田中 健', role: 'サポート', team: 'サポート' },
	{ id: 6, name: '伊藤 葵', role: 'デザイナー', team: 'プロダクト' },
	{ id: 7, name: '渡辺 翔', role: 'エンジニア', team: '開発' },
];

type TableTranslationKey =
	| 'name'
	| 'ascending'
	| 'descending'
	| 'role'
	| 'edit'
	| 'cancel'
	| 'save'
	| 'search'
	| 'noMembers'
	| 'reset'
	| 'next'
	| 'previous'
	| 'delete';

const TRANSLATION = (key: TableTranslationKey) => i18n.t(`example.story.table.${key}`);

describe('DataTable', () => {
	it('名前と役割で昇順・降順の並べ替えを行う', async () => {
		const user = userEvent.setup();

		render(<DataTable data={MEMBERS} />);

		const firstRowName = () => screen.getAllByRole('row')[1].textContent;
		const nameHeader = () => screen.getByRole('button', { name: new RegExp(TRANSLATION('name')) });
		const initialName = firstRowName();
		await user.click(nameHeader());
		const ascendingName = firstRowName();
		expect(ascendingName).not.toBe(initialName);
		expect(nameHeader().querySelector('svg')?.getAttribute('aria-label')).toBe(
			TRANSLATION('ascending'),
		);
		await user.click(nameHeader());
		expect(nameHeader().querySelector('svg')?.getAttribute('aria-label')).toBe(
			TRANSLATION('descending'),
		);

		const roleHeader = () => screen.getByRole('button', { name: new RegExp(TRANSLATION('role')) });
		await user.click(roleHeader());
		expect(roleHeader().querySelector('svg')?.getAttribute('aria-label')).toBe(
			TRANSLATION('ascending'),
		);
		await user.click(roleHeader());
		expect(roleHeader().querySelector('svg')?.getAttribute('aria-label')).toBe(
			TRANSLATION('descending'),
		);
	});

	it('メンバーを編集して保存またはキャンセルする', async () => {
		const user = userEvent.setup();
		render(<DataTable data={MEMBERS} />);

		const firstRow = screen.getByRole('row', { name: /山田 太郎/ });
		await user.click(within(firstRow).getByRole('button', { name: TRANSLATION('edit') }));
		const nameInput = screen.getByRole('textbox', { name: TRANSLATION('name') });
		fireEvent.change(nameInput, { target: { value: 'Updated Member' } });
		fireEvent.change(screen.getByRole('textbox', { name: TRANSLATION('role') }), {
			target: { value: 'Lead' },
		});
		expect(screen.getByRole('textbox', { name: TRANSLATION('name') })).toHaveValue(
			'Updated Member',
		);
		await user.click(screen.getByRole('button', { name: TRANSLATION('cancel') }));
		expect(screen.getByRole('row', { name: /山田 太郎/ })).toBeInTheDocument();

		const rowToSave = screen.getByRole('row', { name: /山田 太郎/ });
		await user.click(within(rowToSave).getByRole('button', { name: TRANSLATION('edit') }));
		const savedNameInput = screen.getByRole('textbox', { name: TRANSLATION('name') });
		fireEvent.change(savedNameInput, { target: { value: 'Updated Member' } });
		expect(screen.getByRole('textbox', { name: TRANSLATION('name') })).toHaveValue(
			'Updated Member',
		);
		await user.click(screen.getByRole('button', { name: TRANSLATION('save') }));

		expect(screen.getByRole('row', { name: /Updated Member/ })).toBeInTheDocument();
	});

	it('名前で絞り込み、リセットとページ移動を行う', async () => {
		const user = userEvent.setup();
		render(<DataTable data={MEMBERS} />);

		const search = screen.getByRole('textbox', { name: TRANSLATION('search') });
		await user.type(search, '存在しない名前');
		expect(screen.getByText(TRANSLATION('noMembers'))).toBeInTheDocument();
		expect(
			screen.getAllByText(
				i18n.t('example.story.table.showing', {
					start: 0,
					end: 0,
					count: 0,
				}),
			).length,
		).toBeGreaterThan(0);

		await user.click(screen.getByRole('button', { name: TRANSLATION('reset') }));
		expect(screen.getByRole('row', { name: /山田 太郎/ })).toBeInTheDocument();

		await user.click(screen.getByRole('button', { name: TRANSLATION('next') }));
		expect(screen.getByRole('row', { name: /伊藤 葵/ })).toBeInTheDocument();
		await user.click(screen.getByRole('button', { name: TRANSLATION('previous') }));
		expect(screen.getByRole('row', { name: /山田 太郎/ })).toBeInTheDocument();
	});

	it('メンバーの削除と空データへの更新を表示する', async () => {
		const user = userEvent.setup();
		const { rerender } = render(<DataTable data={MEMBERS} />);

		const firstRow = screen.getByRole('row', { name: /山田 太郎/ });
		await user.click(within(firstRow).getByRole('button', { name: TRANSLATION('delete') }));
		expect(screen.queryByRole('row', { name: /山田 太郎/ })).not.toBeInTheDocument();

		rerender(<DataTable data={[]} />);
		expect(await screen.findByText(TRANSLATION('noMembers'))).toBeInTheDocument();
		expect(screen.getByText('0/0')).toBeInTheDocument();
		expect(screen.queryByRole('button', { name: TRANSLATION('next') })).not.toBeInTheDocument();
	});
});
