import { createColumnHelper } from '@tanstack/react-table';
import type { TFunction } from 'i18next';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/elements/Input/Input';
import { Cluster } from '@/components/layouts/Cluster/Cluster';
import { Button } from '@/components/ui/button';
import type { DataTableFeatures } from '@/lib/data-table-features';

export type Member = {
	id: number;
	name: string;
	role: string;
	team: string;
};

type ColumnOptions = {
	t: TFunction;
	editingId: number | null;
	editDraft: Pick<Member, 'name' | 'role'>;
	onDraftChange: (field: 'name' | 'role', value: string) => void;
	onSave: (id: number) => void;
	onCancel: () => void;
	onEdit: (member: Member) => void;
	onDelete: (id: number) => void;
};

const COLUMN_HELPER = createColumnHelper<DataTableFeatures, Member>();

export function createColumns({
	t,
	editingId,
	editDraft,
	onDraftChange,
	onSave,
	onCancel,
	onEdit,
	onDelete,
}: ColumnOptions) {
	return COLUMN_HELPER.columns([
		COLUMN_HELPER.accessor('id', {
			header: 'ID',
			cell: ({ row }) => row.original.id,
		}),
		COLUMN_HELPER.accessor('name', {
			header: ({ column }) => (
				<Button
					type="button"
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					{t('example.story.table.name')}
					{column.getIsSorted() === 'asc' ? (
						<ArrowUp aria-label={t('example.story.table.ascending')} />
					) : column.getIsSorted() === 'desc' ? (
						<ArrowDown aria-label={t('example.story.table.descending')} />
					) : (
						<ArrowUpDown aria-label={t('example.story.table.sortable')} />
					)}
				</Button>
			),
			filterFn: 'includesString',
			cell: ({ row }) =>
				editingId === row.original.id ? (
					<Input
						id={`member-${row.original.id}-name`}
						label=""
						aria-label={t('example.story.table.name')}
						inputSize="sm"
						value={editDraft.name}
						onChange={(event) => onDraftChange('name', event.target.value)}
					/>
				) : (
					row.original.name
				),
		}),
		COLUMN_HELPER.accessor('role', {
			header: ({ column }) => (
				<Button
					type="button"
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					{t('example.story.table.role')}
					{column.getIsSorted() === 'asc' ? (
						<ArrowUp aria-label={t('example.story.table.ascending')} />
					) : column.getIsSorted() === 'desc' ? (
						<ArrowDown aria-label={t('example.story.table.descending')} />
					) : (
						<ArrowUpDown aria-label={t('example.story.table.sortable')} />
					)}
				</Button>
			),
			cell: ({ row }) =>
				editingId === row.original.id ? (
					<Input
						id={`member-${row.original.id}-role`}
						label=""
						aria-label={t('example.story.table.role')}
						inputSize="sm"
						value={editDraft.role}
						onChange={(event) => onDraftChange('role', event.target.value)}
					/>
				) : (
					row.original.role
				),
		}),
		COLUMN_HELPER.accessor('team', {
			header: t('example.story.table.team'),
		}),
		COLUMN_HELPER.display({
			id: 'actions',
			header: t('example.story.table.actions'),
			enableSorting: false,
			cell: ({ row }) =>
				editingId === row.original.id ? (
					<Cluster space="sm">
						<Button type="button" size="sm" onClick={() => onSave(row.original.id)}>
							{t('example.story.table.save')}
						</Button>
						<Button type="button" size="sm" variant="outline" onClick={onCancel}>
							{t('example.story.table.cancel')}
						</Button>
					</Cluster>
				) : (
					<Cluster space="sm">
						<Button type="button" size="sm" variant="outline" onClick={() => onEdit(row.original)}>
							{t('example.story.table.edit')}
						</Button>
						<Button
							type="button"
							size="sm"
							variant="destructive"
							onClick={() => onDelete(row.original.id)}
						>
							{t('example.story.table.delete')}
						</Button>
					</Cluster>
				),
		}),
	]);
}
