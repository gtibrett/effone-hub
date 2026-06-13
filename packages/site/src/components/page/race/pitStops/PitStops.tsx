import { useCallback } from 'react';
import { gql } from '@apollo/client';
import { Alert } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

import type { RacePitStopResult } from '@/app/lib/cached-data';
import { DriverByLine } from '@/components/app';
import type { Driver, PitStop } from '@/gql/graphql';
import { getTimeStringFromDate } from '@/helpers';
import { useGetTeamColor } from '@/hooks';

import PitStopsChart from './PitStopsChart';

// Exported so cached-data.ts can reuse the same document for SSR prefetch.
export const pitStopsQuery = gql`
	#graphql
	query pitStopsBySeasonRound($season: Int!, $round: Int!) {
		race: raceByYearAndRound(year: $season, round: $round) {
			year
			round
			pitStops {
				raceId
				lap
				stop
				time
				timeMillis
				driverId
				driver {
					id
					abbreviation
				}
				team {
					id
					colors {
						teamId
						primaryHex
					}
				}
			}
		}
	}
`;

type PitStopsProps = {
	nodes: RacePitStopResult[];
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
		(pitStops: RacePitStopResult[]) => {
			const tableData: PitStopTableRow[] = [];

			pitStops.forEach(p => {
				if (!p.driver) {
					return;
				}
				let index = tableData.findIndex(driver => driver.driverId === p.driver?.id);
				if (index === -1) {
					const primaryHex = p.team?.colors?.primaryHex;
					tableData.push({
						driverId: p.driver.id,
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
				} as PitStop);
			});

			return { tableData, maxStops: Math.max(0, ...tableData.map(d => d.stops.length)) };
		},
		[getTeamColor]
	);
};

export default function PitStops({ nodes }: PitStopsProps) {
	const mapTableData = useMapTableData();

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
			valueGetter: (_value, row) => row.stops.length
		},
		...new Array(maxStops).fill(null).map((_v, i) => {
			return {
				field: `stop-${i}`,
				headerName: `Stop ${i + 1}`,
				flex: 0.5,
				headerAlign: 'center',
				align: 'center',
				type: 'number',
				valueGetter: (_value, row) => {
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
