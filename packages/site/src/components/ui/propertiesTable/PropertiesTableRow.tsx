import type { PropsWithChildren } from 'react';
import { TableCell, type TableCellProps, TableRow, type TableRowProps } from '@mui/material';

export type PropertiesTableRowProps = TableRowProps &
	PropsWithChildren<{
		header: string;
		align?: TableCellProps['align'];
	}>;

export default function PropertiesTableRow({
	header,
	children,
	align = 'left',
	...rowProps
}: PropertiesTableRowProps) {
	return (
		<TableRow {...rowProps}>
			<TableCell variant="head" scope="row">
				{header}
			</TableCell>
			<TableCell variant="body" align={align}>
				{children}
			</TableCell>
		</TableRow>
	);
}
