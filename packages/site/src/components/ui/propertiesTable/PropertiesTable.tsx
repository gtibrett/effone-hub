import {ReactElement, ReactNode} from 'react';
import {Table, TableBody} from '@/components/ui/shadcn/table';
import PropertiesTableRow, {PropertiesTableRowProps} from './PropertiesTableRow';

type PropertiesTableProps = {
	data?:     Map<string, ReactNode>;
	children?: ReactElement<PropertiesTableRowProps>[] | ReactElement<PropertiesTableRowProps>;
	className?: string;
}
export default function PropertiesTable({children, data, className}: PropertiesTableProps) {
	return (
		<Table className={className}>
			<TableBody>
				{children}
				{
					Array.from(data?.entries() || []).map(([key, value]) => (
						<PropertiesTableRow key={key} header={key}>{value}</PropertiesTableRow>
					))
				}
			</TableBody>
		</Table>
	);
}
