import {ConstructorByLine} from '@effonehub/constructor';
import SeasonDialog from '@effonehub/driver/season/dialog/SeasonDialog';
import {Driver} from '@gtibrett/effone-hub-graph-api';
import {Link, useComponentDimensionsWithRef} from '@gtibrett/mui-additions';
import {Alert, Grid, Skeleton} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {useState} from 'react';
import Stats from '../stats';
import CareerChart from './CareerChart';
import useCareerData from './useCareerData';

type CareerProps = Pick<Driver, 'driverId'>

export default function Career({driverId}: CareerProps) {
	const {data, loading}                          = useCareerData(driverId);
	const careerStandings                          = data?.driver.standings;
	const racesByYear: { [key: number]: number }   = {};
	const {ref, node, dimensions: {width, height}} = useComponentDimensionsWithRef();
	const [active, setActive]                      = useState<number | undefined>();
	
	if (loading || !careerStandings) {
		return <Skeleton variant="rectangular" height={400}/>;
	}
	
	if (!careerStandings.length) {
		return <Alert variant="outlined" severity="info">Career Data Not Available</Alert>;
	}
	
	data?.driver.results.forEach(r => r.race?.year && (racesByYear[r.race?.year] = (racesByYear[r.race?.year] || 0) + 1));
	
	console.log(ref, node, width, height);
	return (
		<>
			<Grid container spacing={2} alignItems="center" justifyContent="space-around">
				<Stats driverId={driverId}/>
				<Grid item xs={12}/>
				<Grid item xs={12}>
					<CareerChart driverId={driverId} size={200}/>
				</Grid>
				<Grid item xs={12}>
					<SeasonDialog season={active} driverId={driverId} onClose={() => setActive(undefined)}/>
					<DataGrid
						rows={careerStandings}
						autoHeight
						density="compact"
						getRowId={(r) => r.year || ''}
						initialState={{
							sorting: {
								sortModel: [{field: 'year', sort: 'desc'}]
							}
						}}
						columns={
							[
								{
									field:       'year',
									headerName:  'Season',
									headerAlign: 'center',
									align:       'center',
									width:       100,
									renderCell:  ({row}) => <Link href="#" color="secondary" onClick={() => setActive(row.year)}>{row.year}</Link>
								},
								{
									field:       'races',
									headerName:  'Races',
									type:        'number',
									headerAlign: 'center',
									align:       'center',
									flex:        1,
									minWidth:    100
								},
								{
									field:       'position',
									headerName:  'Position',
									type:        'number',
									headerAlign: 'center',
									align:       'center',
									flex:        1,
									minWidth:    100
								},
								{
									field:       'points',
									headerName:  'Points',
									type:        'number',
									headerAlign: 'center',
									align:       'center',
									flex:        1,
									minWidth:    100
								},
								{
									field:       'wins',
									headerName:  'Wins',
									type:        'number',
									headerAlign: 'center',
									align:       'center',
									flex:        1,
									minWidth:    100
								},
								{
									field:      'team',
									headerName: 'Constructor',
									filterable: false,
									renderCell: ({row}) => (
										<ConstructorByLine id={row.driverTeamByDriverIdAndYear.team.teamId} variant="link"/>
									),
									flex:       1,
									minWidth:   150
								}
							
							]
						}
					/>
				</Grid>
			</Grid>
		</>
	);
}