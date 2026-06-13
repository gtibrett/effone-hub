import type { ReactElement, ReactNode } from 'react';
import { Table, TableBody, type TableProps } from '@mui/material';

import PropertiesTableRow, { type PropertiesTableRowProps } from './PropertiesTableRow';

type PropertiesTableProps = TableProps & {
	data?: Map<string, ReactNode>;
	children?: ReactElement<PropertiesTableRowProps>[] | ReactElement<PropertiesTableRowProps>;
};
export default function PropertiesTable({
	children,
	data,
	size = 'small',
	...tableProps
}: PropertiesTableProps) {
	return (
		<Table size={size} {...tableProps}>
			<TableBody>
				{children}
				{Array.from(data?.entries() || []).map(([key, value]) => (
					<PropertiesTableRow key={key} header={key}>
						{value}
					</PropertiesTableRow>
				))}
			</TableBody>
		</Table>
	);
}
