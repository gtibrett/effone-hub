import { Alert, Grid, Skeleton, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { ConstructorByLine, DriverByLine } from '@/components/app';
import { SprintRaceResult } from '@/gql/graphql';
import { getPositionTextOutcome, toPoints } from '@/helpers';

import PositionChange from './PositionChange';

export default function SprintResults({ results }: { results: SprintRaceResult[] }) {
	if (!results) {
		return <Skeleton variant="rectangular" height={400} />;
	}

	if (!results.length) {
		return (
			<Alert variant="outlined" severity="info">
				Race Data Not Available
			</Alert>
		);
	}

	return (
		<DataGrid
			rows={results}
			autoHeight
			density="compact"
			getRowId={r => r.driverId || r.positionDisplayOrder}
			initialState={{
				sorting: {
					sortModel: [{ field: 'positionDisplayOrder', sort: 'asc' }]
				}
			}}
			columns={[
				{
					field: 'positionDisplayOrder',
					headerName: 'P',
					width: 60,
					headerAlign: 'center',
					align: 'center',
					type: 'number'
				},
				{
					field: 'change',
					renderHeader: () => (
						<Typography className="sr-only">Position Changes</Typography>
					),
					renderCell: ({ row }) => <PositionChange {...row} />,
					valueGetter: (value, row) => {
						const { gridPositionNumber, positionNumber } = row;
						if (!gridPositionNumber || !positionNumber) {
							return 0;
						}

						return Number(gridPositionNumber) - Number(positionNumber);
					},
					width: 60,
					headerAlign: 'center',
					align: 'center'
				},
				{
					field: 'Driver',
					headerName: 'Driver',
					flex: 1,
					renderCell: ({ row }) =>
						row.driverId ? <DriverByLine id={row.driverId} /> : '',
					minWidth: 200
				},
				{
					field: 'Constructor',
					headerName: 'Constructor',
					flex: 1,
					renderCell: ({ row }) =>
						row.teamId ? <ConstructorByLine id={row.teamId} /> : '',
					minWidth: 150
				},
				{
					field: 'points',
					headerName: 'Points',
					type: 'number',
					headerAlign: 'center',
					align: 'center',
					valueGetter: value => toPoints(value)
				},
				{
					field: 'time',
					headerName: 'Time',
					sortable: false,
					headerAlign: 'left',
					align: 'left',
					flex: 0.5,
					renderCell: ({ row }) => {
						const time = row.time;
						return (
							<Grid
								container
								spacing={1}
								className="items-center justify-between flex-nowrap"
							>
								<Grid>
									{time
										? time
										: getPositionTextOutcome(
												row.positionText,
												row.reasonRetired
											)}
								</Grid>
							</Grid>
						);
					},
					minWidth: 110
				}
			]}
		/>
	);
}
