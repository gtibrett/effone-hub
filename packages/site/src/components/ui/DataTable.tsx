'use client';

import {Skeleton} from '@/components/ui/shadcn/skeleton';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/shadcn/table';
import {cn} from '@/lib/utils';
import {faSort, faSortDown, faSortUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type PaginationState,
	type Row,
	type SortingState,
	useReactTable
} from '@tanstack/react-table';
import {useMemo, useState} from 'react';

/**
 * MUI DataGrid-style initial sort entry.
 * Mirrors what consumers were passing in `initialState.sorting.sortModel`.
 */
export type DataTableSortEntry = {
	field: string;
	sort: 'asc' | 'desc';
};

export type DataTableInitialState = {
	sorting?: {
		sortModel?: DataTableSortEntry[];
	};
};

export type DataTableDensity = 'compact' | 'standard' | 'comfortable';

export type DataTableProps<T> = {
	rows: T[];
	columns: ColumnDef<T, any>[];
	/** id getter equivalent to MUI DataGrid `getRowId` */
	getRowId?: (row: T) => string | number;
	/** Visual only — no virtualization, included for API compatibility */
	autoHeight?: boolean;
	density?: DataTableDensity;
	initialState?: DataTableInitialState;
	hideFooter?: boolean;
	loading?: boolean;
	/** Approximate row height in px — used to size skeleton rows when loading */
	rowHeight?: number;
	/** Default page size when pagination is shown */
	pageSize?: number;
	/** Optional className for the outer wrapper */
	className?: string;
	/** Optional ARIA label for the underlying table */
	ariaLabel?: string;
};

function densityToPaddingClass(density: DataTableDensity | undefined): {head: string; cell: string} {
	switch (density) {
		case 'compact':
			return {head: 'h-8 px-2 py-1 text-xs', cell: 'px-2 py-1 text-xs'};
		case 'comfortable':
			return {head: 'h-12 px-3 py-3', cell: 'px-3 py-3'};
		case 'standard':
		default:
			return {head: 'h-10 px-2 py-2', cell: 'px-2 py-2'};
	}
}

/**
 * Translate MUI-style sort entries to TanStack format.
 * Accepts a `field` that matches either the column `id` or `accessorKey`.
 */
function sortModelToTanstack(entries: DataTableSortEntry[] | undefined): SortingState {
	if (!entries?.length) return [];
	return entries.map(({field, sort}) => ({id: field, desc: sort === 'desc'}));
}

/**
 * Light wrapper around TanStack Table v8 rendered via shadcn `Table` primitives.
 *
 * Surface intentionally mirrors the most-used `@mui/x-data-grid` props so consumers
 * can swap with minimal churn. Notable differences:
 *  - `columns` is `ColumnDef<T>[]` from TanStack (use `accessorKey`/`header`/`cell`).
 *  - Pagination is always client-side, defaults to 10 rows/page, hidden when `hideFooter`.
 *  - Sorting is enabled per-column by default (set `enableSorting: false` to disable).
 */
export default function DataTable<T>({
	rows,
	columns,
	getRowId,
	autoHeight: _autoHeight,
	density,
	initialState,
	hideFooter,
	loading,
	rowHeight = 36,
	pageSize = 10,
	className,
	ariaLabel
}: DataTableProps<T>) {
	const [sorting, setSorting] = useState<SortingState>(() =>
		sortModelToTanstack(initialState?.sorting?.sortModel)
	);
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize
	});

	const paddings = useMemo(() => densityToPaddingClass(density), [density]);

	const table = useReactTable<T>({
		data: rows,
		columns,
		state: {sorting, pagination},
		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: hideFooter ? undefined : getPaginationRowModel(),
		getRowId: getRowId ? (row) => String(getRowId(row)) : undefined,
		manualPagination: false,
		autoResetPageIndex: false
	});

	const visibleRows: Row<T>[] = hideFooter ? table.getSortedRowModel().rows : table.getRowModel().rows;
	const columnCount = table.getAllLeafColumns().length;

	return (
		<div className={cn('w-full', className)}>
			<Table aria-label={ariaLabel}>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								const canSort = header.column.getCanSort();
								const sortState = header.column.getIsSorted();
								const headerContent = header.isPlaceholder
									? null
									: flexRender(header.column.columnDef.header, header.getContext());
								return (
									<TableHead
										key={header.id}
										style={header.getSize() && header.getSize() !== 150 ? {width: header.getSize()} : undefined}
										className={cn(paddings.head, canSort && 'cursor-pointer select-none')}
										onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
										aria-sort={
											sortState === 'asc'
												? 'ascending'
												: sortState === 'desc'
													? 'descending'
													: canSort
														? 'none'
														: undefined
										}
									>
										<span className="inline-flex items-center gap-1">
											{headerContent}
											{canSort && (
												<FontAwesomeIcon
													icon={sortState === 'asc' ? faSortUp : sortState === 'desc' ? faSortDown : faSort}
													className={cn('text-xs', sortState ? 'opacity-100' : 'opacity-40')}
												/>
											)}
										</span>
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{loading
						? Array.from({length: Math.min(pageSize, 5)}).map((_, i) => (
								<TableRow key={`skeleton-${i}`}>
									{Array.from({length: columnCount}).map((__, j) => (
										<TableCell key={`skeleton-${i}-${j}`} className={paddings.cell} style={{height: rowHeight}}>
											<Skeleton className="h-4 w-full"/>
										</TableCell>
									))}
								</TableRow>
							))
						: visibleRows.length === 0
							? (
								<TableRow>
									<TableCell colSpan={columnCount} className={cn(paddings.cell, 'text-center text-muted-foreground')}>
										No rows
									</TableCell>
								</TableRow>
							)
							: visibleRows.map((row) => (
									<TableRow key={row.id} data-state={row.getIsSelected() ? 'selected' : undefined}>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id} className={paddings.cell} style={{height: rowHeight}}>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</TableCell>
										))}
									</TableRow>
								))}
				</TableBody>
			</Table>
			{!hideFooter && rows.length > pageSize && (
				<div className="flex items-center justify-between gap-2 px-2 py-2 text-xs text-muted-foreground border-t">
					<span>
						Page {table.getState().pagination.pageIndex + 1} of {Math.max(1, table.getPageCount())}
					</span>
					<span className="inline-flex gap-1">
						<button
							type="button"
							className="px-2 py-1 rounded border disabled:opacity-50"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							Previous
						</button>
						<button
							type="button"
							className="px-2 py-1 rounded border disabled:opacity-50"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							Next
						</button>
					</span>
				</div>
			)}
		</div>
	);
}
