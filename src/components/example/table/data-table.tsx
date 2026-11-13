import {
	type ColumnFiltersState,
	type PaginationState,
	type SortingState,
	useTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/elements/Input/Input';
import { Text } from '@/components/elements/Text/Text';
import { Cluster } from '@/components/layouts/Cluster/Cluster';
import { Stack } from '@/components/layouts/Stack/Stack';
import { Button } from '@/components/ui/button';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
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
	const { t } = useTranslation();
	const [members, setMembers] = useState(data);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 });
	const [editingId, setEditingId] = useState<number | null>(null);
	const [editDraft, setEditDraft] = useState({ name: '', role: '' });

	useEffect(() => {
		setMembers(data);
	}, [data]);

	const columns = createColumns({
		t,
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
		features: features(),
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
					label={t('example.story.table.search')}
					description={t('example.story.table.searchDescription')}
					inputSize="sm"
					value={(nameColumn?.getFilterValue() as string) ?? ''}
					onChange={(event) => nameColumn?.setFilterValue(event.target.value)}
				/>
				<Button
					type="button"
					variant="secondary"
					onClick={() => {
						setColumnFilters([]);
						setSorting([]);
						table.setPageIndex(0);
					}}
				>
					{t('example.story.table.reset')}
				</Button>
			</Cluster>
			<div className="overflow-hidden rounded-md border">
				<Table>
					<TableCaption>{t('example.story.table.caption')}</TableCaption>
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
									{t('example.story.table.noMembers')}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<Cluster justify="between">
				<Text as="span" color="muted">
					{t('example.story.table.showing', {
						start: filteredCount === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1,
						end: Math.min((pagination.pageIndex + 1) * pagination.pageSize, filteredCount),
						count: filteredCount,
					})}
				</Text>

				<Pagination>
					<PaginationContent>
						{table.getCanPreviousPage() && (
							<PaginationItem>
								<PaginationPrevious
									href="#"
									text={t('example.story.table.previous')}
									aria-label={t('example.story.table.previous')}
									onClick={(e) => {
										e.preventDefault();
										table.previousPage();
									}}
								/>
							</PaginationItem>
						)}

						<PaginationItem>
							<Text as="span">
								{table.getPageCount() === 0
									? '0/0'
									: `${pagination.pageIndex + 1}/${table.getPageCount()}`}
							</Text>
						</PaginationItem>

						{table.getCanNextPage() && (
							<PaginationItem>
								<PaginationNext
									href="#"
									text={t('example.story.table.next')}
									aria-label={t('example.story.table.next')}
									onClick={(e) => {
										e.preventDefault();
										table.nextPage();
									}}
								/>
							</PaginationItem>
						)}
					</PaginationContent>
				</Pagination>
			</Cluster>
		</Stack>
	);
}
