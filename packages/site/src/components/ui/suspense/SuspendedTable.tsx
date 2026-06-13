import type { ReactNode } from 'react';
import { Box, Grid, Skeleton } from '@mui/material';

type SuspendedTableProps = {
	rows?: number;
	cols?: number;
	rowSkeleton?: ReactNode;
};
const SuspendedTable = ({ rows = 10, cols = 1, rowSkeleton }: SuspendedTableProps) => {
	const fakeData: string[] = new Array(rows * (rowSkeleton ? 1 : cols)).fill('');

	return (
		<Box className="p-2">
			<Grid container spacing={2} columns={rowSkeleton ? 1 : cols}>
				{fakeData.map((_, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length contentless skeleton placeholders, never reordered — no stable id exists
					<Grid key={i} size={1}>
						{rowSkeleton || <Skeleton variant="text" height="1.5em" />}
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default SuspendedTable;
