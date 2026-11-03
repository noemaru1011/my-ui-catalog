import { createColumnHelper } from '@tanstack/react-table';
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
					名前
					{column.getIsSorted() === 'asc' ? (
						<ArrowUp aria-label="昇順" />
					) : column.getIsSorted() === 'desc' ? (
						<ArrowDown aria-label="降順" />
					) : (
						<ArrowUpDown aria-label="ソート可能" />
					)}
				</Button>
			),
			filterFn: 'includesString',
			cell: ({ row }) =>
				editingId === row.original.id ? (
					<Input
						id={`member-${row.original.id}-name`}
						label=""
						aria-label="名前"
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
					役割
					{column.getIsSorted() === 'asc' ? (
						<ArrowUp aria-label="昇順" />
					) : column.getIsSorted() === 'desc' ? (
						<ArrowDown aria-label="降順" />
					) : (
						<ArrowUpDown aria-label="ソート可能" />
					)}
				</Button>
			),
			cell: ({ row }) =>
				editingId === row.original.id ? (
					<Input
						id={`member-${row.original.id}-role`}
						label=""
						aria-label="役割"
						inputSize="sm"
						value={editDraft.role}
						onChange={(event) => onDraftChange('role', event.target.value)}
					/>
				) : (
					row.original.role
				),
		}),
		COLUMN_HELPER.accessor('team', {
			header: 'チーム',
		}),
		COLUMN_HELPER.display({
			id: 'actions',
			header: 'アクション',
			enableSorting: false,
			cell: ({ row }) =>
				editingId === row.original.id ? (
					<Cluster space="xs">
						<Button type="button" size="sm" onClick={() => onSave(row.original.id)}>
							保存
						</Button>
						<Button type="button" size="sm" variant="outline" onClick={onCancel}>
							キャンセル
						</Button>
					</Cluster>
				) : (
					<Cluster space="xs">
						<Button type="button" size="sm" variant="outline" onClick={() => onEdit(row.original)}>
							編集
						</Button>
						<Button
							type="button"
							size="sm"
							variant="destructive"
							onClick={() => onDelete(row.original.id)}
						>
							削除
						</Button>
					</Cluster>
				),
		}),
	]);
}
