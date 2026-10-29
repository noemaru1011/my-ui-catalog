import {
	createColumnHelper,
	type ColumnFiltersState,
	type PaginationState,
	type SortingState,
	useTable,
} from '@tanstack/react-table';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
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
import { type DataTableFeatures, features } from '@/lib/api/data-table-features';

type Member = {
	id: number;
	name: string;
	role: string;
	team: string;
};

const initialMembers: Member[] = [
	{ id: 1, name: '山田 太郎', role: 'デザイナー', team: 'プロダクト' },
	{ id: 2, name: '佐藤 花子', role: 'エンジニア', team: '開発' },
	{ id: 3, name: '鈴木 次郎', role: 'プロダクトマネージャー', team: 'プロダクト' },
	{ id: 4, name: '高橋 美咲', role: 'エンジニア', team: '開発' },
	{ id: 5, name: '田中 健', role: 'カスタマーサクセス', team: 'サポート' },
	{ id: 6, name: '伊藤 葵', role: 'デザイナー', team: 'プロダクト' },
	{ id: 7, name: '渡辺 翔', role: 'エンジニア', team: '開発' },
];

const columnHelper = createColumnHelper<DataTableFeatures, Member>();

function TableExample() {
	const [members, setMembers] = useState(initialMembers);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 });
	const [editingId, setEditingId] = useState<number | null>(null);
	const [editDraft, setEditDraft] = useState({ name: '', role: '' });

	const columns = columnHelper.columns([
		columnHelper.accessor('id', {
			header: 'ID',
			cell: ({ row }) => row.original.id,
		}),
		columnHelper.accessor('name', {
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
						onChange={(event) => setEditDraft({ ...editDraft, name: event.target.value })}
					/>
				) : (
					row.original.name
				),
		}),
		columnHelper.accessor('role', {
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
						onChange={(event) => setEditDraft({ ...editDraft, role: event.target.value })}
					/>
				) : (
					row.original.role
				),
		}),
		columnHelper.accessor('team', {
			header: 'チーム',
		}),
		columnHelper.display({
			id: 'actions',
			header: 'アクション',
			enableSorting: false,
			cell: ({ row }) =>
				editingId === row.original.id ? (
					<Cluster space="xs">
						<Button
							type="button"
							size="sm"
							onClick={() => {
								setMembers((currentMembers) =>
									currentMembers.map((member) =>
										member.id === row.original.id
											? { ...member, name: editDraft.name, role: editDraft.role }
											: member,
									),
								);
								setEditingId(null);
							}}
						>
							保存
						</Button>
						<Button type="button" size="sm" variant="outline" onClick={() => setEditingId(null)}>
							キャンセル
						</Button>
					</Cluster>
				) : (
					<Cluster space="xs">
						<Button
							type="button"
							size="sm"
							variant="outline"
							onClick={() => {
								setEditingId(row.original.id);
								setEditDraft({ name: row.original.name, role: row.original.role });
							}}
						>
							編集
						</Button>
						<Button
							type="button"
							size="sm"
							variant="destructive"
							onClick={() =>
								setMembers((currentMembers) =>
									currentMembers.filter((member) => member.id !== row.original.id),
								)
							}
						>
							削除
						</Button>
					</Cluster>
				),
		}),
	]);

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
					{filteredCount} 件中 {filteredCount === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1}–
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

const meta = {
	title: 'Example/TableExample',
	component: TableExample,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'検索・ソート・ページ送りと、行の編集・削除ができるテーブルの例です。データはStory内のモックで、保存されません。',
			},
		},
	},
} satisfies Meta<typeof TableExample>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
