import {ConstructorByLine} from '@effonehub/constructor';
import SeasonDialog from '@effonehub/driver/season/dialog/SeasonDialog';
import {Driver} from '@gtibrett/effone-hub-graph-api';
import {Link, useComponentDimensionsWithRef} from '@gtibrett/mui-additions';
import {Alert, Grid, Hidden, Skeleton} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {useState} from 'react';
import Stats from '../stats';
import CareerChart from './CareerChart';
import CareerPerformanceBurst from './CareerPerformanceBurst';
import useCareerData from './useCareerData';

type CareerProps = Pick<Driver, 'driverId'>

export default function Career({driverId}: CareerProps) {
	const {data, loading}            = useCareerData(driverId);
	const careerStandings            = data?.driver.standings;
	const {ref, dimensions: {width}} = useComponentDimensionsWithRef();
	const [active, setActive]        = useState<number | undefined>();
	
	if (loading || !careerStandings) {
		return <Skeleton variant="rectangular" height={400}/>;
	}
	
	if (!careerStandings.length) {
		return <Alert variant="outlined" severity="info">Career Data Not Available</Alert>;
	}
	
	
	return (
		<>
			<Grid container spacing={2} alignItems="center" justifyContent="space-around">
				<Stats driverId={driverId}/>
				<Grid item xs={12}/>
				<Grid item xs={12} md={6} lg={9}>
					<CareerChart driverId={driverId} size={width || 200}/>
				</Grid>
				<Hidden mdDown><Grid item md={6} lg={3} ref={ref}><CareerPerformanceBurst driverId={driverId} size={width}/></Grid></Hidden>
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