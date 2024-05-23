import {TableCell, TableCellProps, TableRow, TableRowProps} from '@mui/material';
import {PropsWithChildren} from 'react';

export type PropertiesTableRowProps = TableRowProps & PropsWithChildren<{
	header: string;
	align?: TableCellProps['align']
}>

export default function PropertiesTableRow({header, children, align = 'left', ...rowProps}: PropertiesTableRowProps) {
	return (
		<TableRow {...rowProps}>
			<TableCell variant="head" scope="row">{header}</TableCell>
			<TableCell variant="body" align={align}>{children}</TableCell>
		</TableRow>
	);
}