import {gql, useQuery} from '@apollo/client';
import {useGetTeamColor} from '@effonehub/constructor';
import {DriverByLine} from '@effonehub/driver';
import {getTimeStringFromDate} from '@effonehub/helpers';
import {Driver, PitStop, Race, TeamColor} from '@gtibrett/effone-hub-graph-api';
import {Alert, Skeleton} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useCallback} from 'react';
import PitStopsChart from './PitStopsChart';

const pitStopsQuery = gql`
	#graphql
	query pitStopsBySeasonRound($season: Int!, $round: Int!) {
		race: raceByYearAndRound(year: $season, round: $round) {
			pitStops {
				lap
				time
				duration
				milliseconds
				driver {
					driverId
					code

					currentTeam {
						team {
							colors {
								primary
							}
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
	driverId: Driver['driverId'];
	code: Driver['code'];
	color: TeamColor['primary'];
	stops: PitStop[];
}

const useMapTableData = () => {
	const getTeamColor = useGetTeamColor();
	
	return useCallback((pitStops: PitStop[]) => {
		const tableData: PitStopTableRow[] = [];
		
		pitStops.forEach(p => {
			if (!p.driver) {
				return;
			}
			let index = tableData.findIndex(driver => driver.driverId === p.driver?.driverId);
			if (index === -1) {
				tableData.push({
					driverId: p.driver.driverId,
					code:     p.driver.code,
					color:    getTeamColor(p.driver.currentTeam?.team?.colors, 'primary', false),
					stops:    []
				});
				index = tableData.length - 1;
			}
			
			tableData[index].stops.push({
				...p,
				stop: tableData[index].stops.length + 1
			});
		});
		
		return {tableData, maxStops: Math.max(0, ...tableData.map(d => d.stops.length))};
	}, [getTeamColor]);
};

export default function PitStops({season, round}: PitStopsProps) {
	const {loading, data} = useQuery<{ race: Pick<Race, 'pitStops'> }>(pitStopsQuery, {variables: {season, round}});
	const mapTableData    = useMapTableData();
	
	if (loading) {
		return <Skeleton variant="rectangular" height={400}/>;
	}
	
	if (!data?.race.pitStops.length) {
		return <Alert variant="outlined" severity="info">Pit Stop Data Not Available</Alert>;
	}
	
	const {tableData, maxStops} = mapTableData(data.race.pitStops);
	
	const columns: GridColDef<PitStopTableRow>[] = [
		{
			field:      'Driver',
			headerName: 'Driver',
			flex:       1,
			renderCell: ({row}) => <DriverByLine id={row.driverId}/>,
			minWidth:   200
		},
		{
			field:       'stop',
			headerName:  'Stops',
			flex:        .5,
			headerAlign: 'center',
			align:       'center',
			type:        'number',
			valueGetter: (value, row) => row.stops.length
		},
		...(new Array(maxStops)).fill(null).map((v, i) => {
			return {
				field:       `stop-${i}`,
				headerName:  `Stop ${i + 1}`,
				flex:        .5,
				headerAlign: 'center',
				align:       'center',
				type:        'number',
				valueGetter: (value, row) => {
					const stopTime = row.stops.find(r => r.stop === i + 1)?.milliseconds;
					
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
			<PitStopsChart maxStops={maxStops} pitStops={tableData}/>
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