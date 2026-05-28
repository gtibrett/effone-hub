import { useCallback } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { Alert, Skeleton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { DriverByLine } from '@/components/app';
import { Driver, PitStop, Race } from '@/gql/graphql';
import { getTimeStringFromDate } from '@/helpers';
import { useGetTeamColor } from '@/hooks';

import PitStopsChart from './PitStopsChart';

const pitStopsQuery = gql`
	#graphql
	query pitStopsBySeasonRound($season: Int!, $round: Int!) {
		race: raceByYearAndRound(year: $season, round: $round) {
			id
			pitStops {
				id
				lap
				stop
				time
				timeMillis
				driverId
				driver {
					id
					rowId
					abbreviation
				}
				team {
					id
					rowId
					colors {
						id
						primaryHex
					}
				}
			}
		}
	}
`;

type PitStopsProps = {
	season: Race['year'];
	round: Race['round'];
};

export type PitStopTableRow = {
	driverId: Driver['id'];
	code: Driver['abbreviation'];
	color: string;
	stops: PitStop[];
};

const useMapTableData = () => {
	const getTeamColor = useGetTeamColor();

	return useCallback(
		(pitStops: PitStop[]) => {
			const tableData: PitStopTableRow[] = [];

			pitStops.forEach(p => {
				if (!p.driver) {
					return;
				}
				let index = tableData.findIndex(driver => driver.driverId === p.driver?.rowId);
				if (index === -1) {
					const primaryHex = p.team?.colors?.primaryHex;
					tableData.push({
						driverId: p.driver.rowId,
						code: p.driver.abbreviation,
						color: getTeamColor(
							primaryHex ? { primaryHex, secondaryHex: null } : undefined,
							'primaryHex'
						),
						stops: []
					});
					index = tableData.length - 1;
				}

				tableData[index].stops.push({
					...p,
					stop: tableData[index].stops.length + 1
				});
			});

			return { tableData, maxStops: Math.max(0, ...tableData.map(d => d.stops.length)) };
		},
		[getTeamColor]
	);
};

export default function PitStops({ season, round }: PitStopsProps) {
	const { loading, data } = useQuery<{ race: { pitStops: PitStop[] } }>(pitStopsQuery, {
		variables: { season, round }
	});
	const mapTableData = useMapTableData();

	if (loading) {
		return <Skeleton variant="rectangular" height={400} />;
	}

	const nodes = data?.race?.pitStops ?? [];
	if (!nodes.length) {
		return (
			<Alert variant="outlined" severity="info">
				Pit Stop Data Not Available
			</Alert>
		);
	}

	const { tableData, maxStops } = mapTableData(nodes);

	const columns: GridColDef<PitStopTableRow>[] = [
		{
			field: 'Driver',
			headerName: 'Driver',
			flex: 1,
			renderCell: ({ row }) => <DriverByLine id={row.driverId} />,
			minWidth: 200
		},
		{
			field: 'stop',
			headerName: 'Stops',
			flex: 0.5,
			headerAlign: 'center',
			align: 'center',
			type: 'number',
			valueGetter: (value, row) => row.stops.length
		},
		...new Array(maxStops).fill(null).map((v, i) => {
			return {
				field: `stop-${i}`,
				headerName: `Stop ${i + 1}`,
				flex: 0.5,
				headerAlign: 'center',
				align: 'center',
				type: 'number',
				valueGetter: (value, row) => {
					const stopTime = row.stops.find(r => r.stop === i + 1)?.timeMillis;

					if (stopTime) {
						return getTimeStringFromDate(new Date(stopTime));
					}

					return '--';
				}
			} as GridColDef<PitStopTableRow>;
		})
	];

	return (
		<>
			<PitStopsChart maxStops={maxStops} pitStops={tableData} />
			<DataGrid
				rows={tableData}
				getRowId={row => row.driverId || ''}
				autoHeight
				density="compact"
				columns={columns}
			/>
		</>
	);
}
