import {QueryResult} from '@apollo/client/react/types/types';
import {Alert, Grid, Link, Skeleton} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useState} from 'react';
import {DriverId} from '../../drivers/DriverProvider';
import {getTimeStringFromDate} from '../../helpers';
import RaceMap from '../../maps/RaceMap';
import useMapCircuitsToMapPoints from '../../maps/useMapCircuitsToMapPoints';
import {DriverPageData} from '../types';
import CircuitDialog from './dialog/CircuitDialog';
import useMapDriverDataToCircuitResults, {CircuitWithResults} from './useMapDriverDataToCircuitResults';

type CircuitsProps = Pick<QueryResult<DriverPageData>, 'data' | 'loading'> & { driverId: DriverId };

export default function Circuits({data, loading, driverId}: CircuitsProps) {
	const circuitData            = useMapDriverDataToCircuitResults(data);
	const mapCircuitsToMapPoints = useMapCircuitsToMapPoints();
	const [active, setActive]    = useState<CircuitWithResults['circuitId'] | undefined>();
	
	if (!circuitData || loading) {
		return <Skeleton variant="rectangular" height={400}/>;
	}
	
	if (!circuitData.length) {
		return <Alert variant="outlined" severity="info">Circuit Data Not Available</Alert>;
	}
	
	const {points, onClick} = mapCircuitsToMapPoints(circuitData);
	
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}><RaceMap points={points} onClick={onClick}/></Grid>
			<Grid item xs={12}>
				<CircuitDialog driverId={driverId} circuitId={active} onClose={() => setActive(undefined)}/>
				<DataGrid
					sx={{mt: 2}}
					rows={circuitData}
					autoHeight
					density="compact"
					getRowId={(row) => row.circuitId || ''}
					initialState={{
						sorting: {
							sortModel: [{field: 'name', sort: 'asc'}]
						}
					}}
					columns={
						[
							{
								field:      'name',
								headerName: 'Circuit',
								flex:       1,
								minWidth:   250,
								renderCell: ({row}) => <Link href="#" color="secondary" onClick={() => setActive(row.circuitId)}>{row.name}</Link>
							},
							{
								field:       'races',
								headerName:  'Races',
								type:        'number',
								headerAlign: 'center',
								align:       'center',
								flex:        1,
								valueGetter: ({row}) => row.results.length
							},
							{
								field:       'wins',
								headerName:  'Wins',
								type:        'number',
								headerAlign: 'center',
								align:       'center',
								flex:        1
							},
							{
								field:       'averagePosition',
								headerName:  'Avg. Finish',
								type:        'number',
								headerAlign: 'center',
								align:       'center',
								flex:        1
							},
							{
								field:       'averageTime',
								headerName:  'Avg. Time',
								type:        'number',
								headerAlign: 'center',
								align:       'center',
								flex:        1,
								renderCell:  ({value}) => {
									if (!value) {
										return '--';
									}
									return getTimeStringFromDate(new Date(value));
								}
							}
						] as GridColDef<CircuitWithResults>[]
					}
				/>
			</Grid>
		</Grid>
	);
}