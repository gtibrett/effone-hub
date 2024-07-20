import {Box, Grid, Skeleton} from '@mui/material';
import {ReactNode} from 'react';

type SuspendedTableProps = {
	rows?: number
	cols?: number
	rowSkeleton?: ReactNode
}
const SuspendedTable = ({rows = 10, cols = 1, rowSkeleton}: SuspendedTableProps) => {
	const fakeData: string[] = (new Array(rows * (!!rowSkeleton ? 1 : cols))).fill('');
	
	return (
		<Box sx={{p: 1}}>
			<Grid container spacing={2} columns={!!rowSkeleton ? 1 : cols}>
				{fakeData.map((_, i) => <Grid item xs={1} key={i}>
					{rowSkeleton || <Skeleton variant="text" height="1.5em"/>}
				</Grid>)}
			</Grid>
		</Box>
	);
};

export default SuspendedTable;