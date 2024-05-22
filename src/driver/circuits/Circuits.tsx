import {getTimeStringFromDate} from '@effonehub/helpers';
import {Driver} from '@gtibrett/effone-hub-graph-api';
import {Alert, Card, Grid, Link} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {useState} from 'react';
import RaceMap from '../../maps/RaceMap';
import useMapCircuitsToMapPoints from '../../maps/useMapCircuitsToMapPoints';
import CircuitDialog from './dialog/CircuitDialog';
import useCircuitData, {CircuitWithResults} from './useCircuitData';

type CircuitsProps = Pick<Driver, 'driverId'>

export default function Circuits({driverId}: CircuitsProps) {
	const {data, loading}        = useCircuitData(driverId);
	const mapCircuitsToMapPoints = useMapCircuitsToMapPoints();
	const [active, setActive]    = useState<CircuitWithResults['circuitId'] | undefined>();
	
	if (!data?.length) {
		return <Alert variant="outlined" severity="info">Circuit Data Not Available</Alert>;
	}
	
	const {points, onClick} = mapCircuitsToMapPoints(data || []);
	
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Card>
					<RaceMap points={points} onClick={onClick} height={250}/>
				</Card>
			</Grid>
			<Grid item xs={12}>
				<CircuitDialog driverId={driverId} circuitId={active} onClose={() => setActive(undefined)}/>
				<DataGrid
					sx={{mt: 2}}
					rows={data}
					loading={loading}
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
								valueGetter: (value, row) => row.results.length
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
						]
					}
				/>
			</Grid>
		</Grid>
	);
}