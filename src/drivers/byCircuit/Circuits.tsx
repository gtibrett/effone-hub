import {Alert, Link, Skeleton} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useEffect, useState} from 'react';
import Caxios from '../../api/Caxios';
import {getAPIUrl, mapCircuits, mapRaces} from '../../api/Ergast';
import {useAppState} from '../../app/AppStateProvider';
import CircuitMap from '../../circuits/CircuitMap';
import {getTimeStringFromDate} from '../../race/lapTimes/helpers';
import {Circuit, Driver, Race} from '../../types/ergast';
import {DriverId, useDriver} from '../DriverProvider';
import CircuitDialog from './CircuitDialog';


type TracksProps = {
	driverId: DriverId;
};

export type CircuitWithRaces = Circuit & {
	races: Race[];
	averagePosition?: number;
	averageTime?: number;
}

const getCircuitResults = (driverId: DriverId, circuit: Circuit): Promise<CircuitWithRaces> => {
	const dataUrl = getAPIUrl(`/drivers/${driverId}/circuits/${circuit.circuitId}/results.json`);
	
	return Caxios.get(dataUrl)
	             .then(mapRaces)
	             .then(races => ({
		             ...circuit,
		             races
	             }))
	             .catch(() => ({
		             ...circuit,
		             races: []
	             }));
};

export default function Circuits({driverId}: TracksProps) {
	const driver                  = useDriver(driverId);
	const [{season}]              = useAppState();
	const [circuits, setCircuits] = useState<CircuitWithRaces[] | undefined>();
	const [active, setActive]     = useState<CircuitWithRaces | undefined>();
	
	useEffect(() => {
		const dataUrl = getAPIUrl(`/drivers/${driverId}/circuits.json`);
		
		Caxios.get(dataUrl)
		      .then(mapCircuits)
		      .then(circuits => {
			      Promise.all(circuits.map(circuit => getCircuitResults(driverId, circuit)))
			             .then((circuitsWithRaces) => {
				             return circuitsWithRaces.map((circuit) => {
					             const racePositions: number[] = [];
					             const raceTimes: number[]     = [];
					
					             circuit.races.forEach(race => {
						             if (race.Results?.[0].position) {
							             racePositions.push(Number(race.Results?.[0].position));
						             }
						
						             try {
							             const time = Number(race.Results?.[0].Time?.millis);
							
							             if (time) {
								             raceTimes.push(time);
							             }
						             }
						             catch (e) {
							             // time could not be calculated
						             }
					             });
					
					             return {
						             ...circuit,
						             averagePosition: !racePositions.length ? undefined : Math.round(racePositions.reduce((a, v) => a + v, 0) / racePositions.length),
						             averageTime: !raceTimes.length ? undefined : raceTimes.reduce((a, v) => a + v, 0) / raceTimes.length
					             };
				             });
			             })
			             .then(circuitsWithRacesAndTimes => setCircuits(circuitsWithRacesAndTimes));
			      return circuits;
		      })
		      .catch(() => setCircuits([]));
	}, [season, driverId]);
	
	if (!circuits) {
		return <Skeleton variant="rectangular" height={400}/>;
	}
	
	if (!circuits.length) {
		return <Alert variant="outlined" severity="info">Circuit Data Not Available</Alert>;
	}
	
	return (
		<>
			<CircuitMap circuits={circuits}/>
			<CircuitDialog driver={driver as Driver} circuit={active} onClose={() => setActive(undefined)}/>
			<DataGrid
				sx={{mt: 2}}
				rows={circuits}
				autoHeight
				density="compact"
				getRowId={(row) => row.circuitId || ''}
				columns={
					[
						{
							field: 'circuitName',
							headerName: 'Race',
							flex: 1,
							minWidth: 250,
							renderCell: ({row}) => <Link color="secondary" onClick={() => setActive(row)}>{row.circuitName}</Link>
						},
						{
							field: 'races',
							headerName: 'Races',
							type: 'number',
							headerAlign: 'center',
							align: 'center',
							flex: 1,
							valueGetter: ({row}) => row.races.length
						},
						{
							field: 'wins',
							headerName: 'Wins',
							type: 'number',
							headerAlign: 'center',
							align: 'center',
							flex: 1,
							valueGetter: ({row}) => row.races.filter(r => Number(r.Results?.[0].position) === 1).length
						},
						{
							field: 'averagePosition',
							headerName: 'Avg. Finish',
							type: 'number',
							headerAlign: 'center',
							align: 'center',
							flex: 1
						},
						{
							field: 'averageTime',
							headerName: 'Avg. Time',
							type: 'number',
							headerAlign: 'center',
							align: 'center',
							flex: 1,
							renderCell: ({value}) => {
								if (!value) {
									return '--';
								}
								return getTimeStringFromDate(new Date(value));
							}
						}
					] as GridColDef<CircuitWithRaces>[]
				}
			/>
		</>
	);
}