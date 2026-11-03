import {
	type ColumnFiltersState,
	type PaginationState,
	type SortingState,
	useTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { Input } from '@/components/elements/Input/Input';
import { Text } from '@/components/elements/Text/Text';
import { Cluster } from '@/components/layouts/Cluster/Cluster';
import { Stack } from '@/components/layouts/Stack/Stack';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { type DataTableFeatures, features } from '@/lib/data-table-features';
import { createColumns, type Member } from './columns';

type DataTableProps = {
	data: Member[];
};

export function DataTable({ data }: DataTableProps) {
	const [members, setMembers] = useState(data);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 });
	const [editingId, setEditingId] = useState<number | null>(null);
	const [editDraft, setEditDraft] = useState({ name: '', role: '' });

	const columns = createColumns({
		editingId,
		editDraft,
		onDraftChange: (field, value) => setEditDraft((current) => ({ ...current, [field]: value })),
		onSave: (id) => {
			setMembers((currentMembers) =>
				currentMembers.map((member) =>
					member.id === id ? { ...member, name: editDraft.name, role: editDraft.role } : member,
				),
			);
			setEditingId(null);
		},
		onCancel: () => setEditingId(null),
		onEdit: (member) => {
			setEditingId(member.id);
			setEditDraft({ name: member.name, role: member.role });
		},
		onDelete: (id) =>
			setMembers((currentMembers) => currentMembers.filter((member) => member.id !== id)),
	});

	const table = useTable<DataTableFeatures, Member>({
		features,
		data: members,
		columns,
		state: { sorting, columnFilters, pagination },
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onPaginationChange: setPagination,
	});
	const nameColumn = table.getColumn('name');
	const filteredCount = table.getFilteredRowModel().rows.length;

	return (
		<Stack>
			<Cluster justify="between" align="end">
				<Input
					id="table-example-search"
					label="名前で検索"
					description="名前の一部を入力して絞り込めます。"
					inputSize="sm"
					value={(nameColumn?.getFilterValue() as string) ?? ''}
					onChange={(event) => nameColumn?.setFilterValue(event.target.value)}
				/>
				<Button
					type="button"
					variant="outline"
					onClick={() => {
						setColumnFilters([]);
						setSorting([]);
						table.setPageIndex(0);
					}}
				>
					絞り込み・ソートをリセット
				</Button>
			</Cluster>
			<div className="overflow-hidden rounded-md border">
				<Table>
					<TableCaption>メンバー一覧。列見出しを押すと並び替えできます。</TableCaption>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder ? null : <table.FlexRender header={header} />}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows.length > 0 ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getAllCells().map((cell) => (
										<TableCell key={cell.id}>
											<table.FlexRender cell={cell} />
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									該当するメンバーがいません。
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<Cluster justify="between">
				<Text size="sm" color="muted">
					{filteredCount} 件中{' '}
					{filteredCount === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1}–
					{Math.min((pagination.pageIndex + 1) * pagination.pageSize, filteredCount)} 件を表示
				</Text>
				<Cluster space="sm">
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						前へ
					</Button>
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						次へ
					</Button>
				</Cluster>
			</Cluster>
		</Stack>
	);
}
