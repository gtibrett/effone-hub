import { Grid, Skeleton, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { ConstructorByLine, DriverByLine } from '@/components/app';
import { getPositionTextOutcome, toPoints } from '@/helpers';
import type { CircuitDataProps } from '@/hooks/data';

import PositionChange from '../race/PositionChange';
import NextRaceCountdown from '../raceWeekend/NextRaceCountdown';
import type { NextRace } from '../raceWeekend/useNextRaceData';

export default function Season({ data, loading }: CircuitDataProps) {
	if (loading) {
		return <Skeleton variant="rectangular" height={400} />;
	}

	if (!data) {
		return null;
	}

	if (data.circuit.season.length) {
		if (!data.circuit.season[0].raceResults.length) {
			return (
				<>
					<Typography variant="h5">Countdown</Typography>
					<NextRaceCountdown
						variant="main"
						race={data.circuit.season[0] as unknown as NextRace}
					/>
				</>
			);
		}
	}

	const results = data.circuit.season[0].raceResults.filter(Boolean) as NonNullable<
		(typeof data.circuit.season)[0]['raceResults'][number]
	>[];

	return (
		<DataGrid
			rows={results}
			autoHeight
			density="compact"
			getRowId={r => r.driverId || ''}
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
					renderCell: ({ row }) => (
						<PositionChange
							gridPositionNumber={Number(row.gridPositionNumber)}
							positionDisplayOrder={Number(row.positionDisplayOrder)}
						/>
					),
					valueGetter: (_value, row) => {
						const { gridPositionNumber, positionDisplayOrder } = row;
						if (!gridPositionNumber || !positionDisplayOrder) {
							return 0;
						}

						return Number(gridPositionNumber) - Number(positionDisplayOrder);
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
						row.team?.id ? <ConstructorByLine id={row.team.id} /> : '',
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
					field: 'reasonRetired',
					headerName: 'Status',
					sortable: false,
					headerAlign: 'left',
					align: 'left',
					flex: 0.5,
					renderCell: ({ row }) => {
						return (
							<Grid
								container
								spacing={1}
								className="items-center justify-between flex-nowrap"
							>
								<Grid>
									{row.reasonRetired
										? row.reasonRetired
										: getPositionTextOutcome(
												String(row.positionDisplayOrder),
												undefined
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
