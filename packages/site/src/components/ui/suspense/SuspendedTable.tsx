import {Skeleton} from '@mui/material';
import {ReactNode} from 'react';

type SuspendedTableProps = {
	rows?: number
	cols?: number
	rowSkeleton?: ReactNode
}
const SuspendedTable = ({rows = 10, cols = 1, rowSkeleton}: SuspendedTableProps) => {
	const totalCols          = !!rowSkeleton ? 1 : cols;
	const fakeData: string[] = (new Array(rows * totalCols)).fill('');

	return (
		<div className="p-2">
			<div className="grid gap-4" style={{gridTemplateColumns: `repeat(${totalCols}, minmax(0, 1fr))`}}>
				{fakeData.map((_, i) => <div key={i}>
					{rowSkeleton || <Skeleton variant="text" height="1.5em"/>}
				</div>)}
			</div>
		</div>
	);
};

export default SuspendedTable;
