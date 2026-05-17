import {DriverByLine} from '@/components/app';
import {getTimeStringFromDate} from '@/helpers';
import {useGetTeamColor} from '@/hooks';
import {gql} from '@apollo/client';
import {useQuery} from '@apollo/client/react';
import {Driver, PitStop, Race} from '@/gql/graphql';
import {Alert, AlertDescription} from '@/components/ui/shadcn/alert';
import {DataTable, Skeleton} from '@/components/ui';

import type {ColumnDef} from '@tanstack/react-table';
import {useCallback} from 'react';
import PitStopsChart from './PitStopsChart';

const pitStopsQuery = gql`
	#graphql
	query pitStopsBySeasonRound($season: Int!, $round: Int!) {
		race: raceByYearAndRound(year: $season, round: $round) {
			pitStops {
				nodes {
					id
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
							id
							primaryHex
						}
					}
				}
			}
		}
	}
`;

type PitStopsProps = {
	season: Race['year'];
	round: Race['round'];
}

export type PitStopTableRow = {
	driverId: Driver['id'];
	code: Driver['abbreviation'];
	color: string;
	stops: PitStop[];
}

const useMapTableData = () => {
	const getTeamColor = useGetTeamColor();

	return useCallback((pitStops: PitStop[]) => {
		const tableData: PitStopTableRow[] = [];

		pitStops.forEach((p) => {
			if (!p.driver) {
				return;
			}
			let index = tableData.findIndex((driver) => driver.driverId === p.driver?.id);
			if (index === -1) {
				const primaryHex = p.team?.colors?.primaryHex;
				tableData.push({
					driverId: p.driver.id,
					code:     p.driver.abbreviation,
					color:    getTeamColor(primaryHex ? {primaryHex, secondaryHex: null} : undefined, 'primaryHex', false),
					stops:    []
				});
				index = tableData.length - 1;
			}

			tableData[index].stops.push({
				...p,
				stop: tableData[index].stops.length + 1
			});
		});

		return {tableData, maxStops: Math.max(0, ...tableData.map((d) => d.stops.length))};
	}, [getTeamColor]);
};

export default function PitStops({season, round}: PitStopsProps) {
	const {loading, data} = useQuery<{ race: { pitStops: { nodes: PitStop[] } } }>(pitStopsQuery, {variables: {season, round}});
	const mapTableData    = useMapTableData();

	if (loading) {
		return <Skeleton variant="rectangular" className="h-[400px]"/>;
	}

	const nodes = data?.race?.pitStops?.nodes ?? [];
	if (!nodes.length) {
		return <Alert><AlertDescription>Pit Stop Data Not Available</AlertDescription></Alert>;
	}

	const {tableData, maxStops} = mapTableData(nodes);

	const numCell = (v: unknown) => <div className="text-center">{v as any}</div>;
	const numHeader = (label: string) => () => <div className="text-center w-full">{label}</div>;

	const columns: ColumnDef<PitStopTableRow, any>[] = [
		{
			id:     'Driver',
			header: 'Driver',
			cell:   ({row}) => <DriverByLine id={row.original.driverId}/>
		},
		{
			id:         'stop',
			header:     numHeader('Stops'),
			accessorFn: (row) => row.stops.length,
			cell:       ({getValue}) => numCell(getValue())
		},
		...(new Array(maxStops)).fill(null).map((_v, i): ColumnDef<PitStopTableRow, any> => ({
			id:         `stop-${i}`,
			header:     numHeader(`Stop ${i + 1}`),
			accessorFn: (row) => {
				const stopTime = row.stops.find((r) => r.stop === i + 1)?.timeMillis;
				if (stopTime) {
					return getTimeStringFromDate(new Date(stopTime));
				}
				return '--';
			},
			cell:       ({getValue}) => numCell(getValue())
		}))
	];

	return (
		<>
			<PitStopsChart maxStops={maxStops} pitStops={tableData}/>
			<DataTable<PitStopTableRow>
				rows={tableData}
				columns={columns}
				getRowId={(row: PitStopTableRow) => row.driverId || ''}
				autoHeight
				density="compact"
			/>
		</>
	);
}
