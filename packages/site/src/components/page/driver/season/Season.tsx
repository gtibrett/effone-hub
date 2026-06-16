'use client';

import { Alert, Grid, Link, Skeleton, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import type { DriverCareerData } from '@/app/lib/cached-data';
import { useAppState } from '@/components/app';
import { PositionChange } from '@/components/page/race';
import type { Race } from '@/gql/graphql';
import { getPositionTextOutcome, getTimeStringFromDate, toPoints } from '@/helpers';

import SeasonChart from './SeasonChart';

type SeasonTeamInfo =
	| {
			id?: string | null;
			colors?: { primaryHex?: string | null } | null;
	  }
	| null
	| undefined;

type SeasonProps = {
	season: number;
	driverId: string;
	races: Race[];
	careerData: DriverCareerData['driver'] | null | undefined;
	currentSeasonTeam: SeasonTeamInfo;
};

export default function Season({
	season,
	driverId,
	races,
	careerData,
	currentSeasonTeam
}: SeasonProps) {
	const [{ currentSeason }] = useAppState();

	if (!races) {
		return <Skeleton variant="rectangular" height={400} />;
	}

	if (!races.length) {
		return (
			<Alert variant="outlined" severity="info">
				Season Data Not Available
			</Alert>
		);
	}

	return (
		<Grid container spacing={2}>
			<Grid size={12}>
				<SeasonChart
					season={season}
					driverId={driverId}
					races={races}
					loading={false}
					careerData={careerData}
					currentSeasonTeam={currentSeasonTeam}
				/>
			</Grid>
			<Grid size={12}>
				<DataGrid
					rows={races}
					autoHeight
					density="compact"
					getRowId={row => row.rowId || ''}
					initialState={{
						sorting: {
							sortModel: [{ field: 'date', sort: 'asc' }]
						}
					}}
					columns={[
						{
							field: 'date',
							headerName: 'Date',
							headerAlign: 'center',
							type: 'date',
							align: 'center',
							valueGetter: value => new Date(value),
							renderCell: ({ value }) => value.toLocaleDateString(),
							minWidth: 100
						},
						{
							field: 'officialName',
							headerName: 'Race',
							flex: 1,
							renderCell: ({ row, value }) => (
								<Link href={`/${currentSeason}/${row.round}#${row.officialName}`}>
									{value}
								</Link>
							),
							minWidth: 200
						},
						{
							field: 'grid',
							headerName: 'Start',
							type: 'number',
							headerAlign: 'center',
							align: 'center',
							valueGetter: (_value, row) =>
								row.raceResults?.[0]?.gridPositionNumber || '--'
						},
						{
							field: 'result',
							headerName: 'Finish',
							type: 'number',
							headerAlign: 'center',
							align: 'center',
							valueGetter: (_value, row) =>
								row.raceResults?.[0]?.positionDisplayOrder || '--'
						},
						{
							field: 'change',
							renderHeader: () => (
								<Typography className="sr-only">Position Changes</Typography>
							),
							renderCell: ({ row }) => {
								const result = row.raceResults?.[0];
								if (result) {
									const { gridPositionNumber, positionDisplayOrder } = result;
									return (
										<PositionChange
											gridPositionNumber={gridPositionNumber}
											positionDisplayOrder={positionDisplayOrder}
										/>
									);
								}
								return '--';
							},
							valueGetter: (_value, row) => {
								const result = row.raceResults?.[0];
								if (result) {
									const { gridPositionNumber, positionDisplayOrder } = result;
									if (gridPositionNumber && positionDisplayOrder) {
										return gridPositionNumber - positionDisplayOrder;
									}
								}

								return 'unknown';
							},
							width: 60,
							headerAlign: 'center',
							align: 'center'
						},
						{
							field: 'points',
							headerName: 'Points',
							type: 'number',
							headerAlign: 'center',
							align: 'center',
							valueGetter: (_value, row) => toPoints(row.raceResults?.[0]?.points)
						},
						{
							field: 'time',
							headerName: 'Time',
							sortable: false,
							headerAlign: 'left',
							align: 'left',
							flex: 0.5,
							valueGetter: (_value, row) => {
								const result = row.raceResults?.[0];
								if (result) {
									const time = result.timeMillis;
									return time
										? getTimeStringFromDate(new Date(time))
										: getPositionTextOutcome(
												result.positionText,
												result.reasonRetired
											);
								}
								return '--';
							}
						}
					]}
				/>
			</Grid>
		</Grid>
	);
}
