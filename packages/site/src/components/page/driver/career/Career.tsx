import {ConstructorByLine} from '@/components/app';
import { useComponentDimensionsWithRef} from '@gtibrett/mui-additions';
import {Alert, Grid, Link, Skeleton} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {useState} from 'react';
import SeasonDialog from '../season/SeasonDialog';
import Stats from '../stats';
import CareerChart from './CareerChart';
import useCareerData from './useCareerData';

type CareerProps = { driverId: string }

export default function Career({driverId}: CareerProps) {
	const {data, loading}                          = useCareerData(driverId);
	const careerStandings                          = data?.driver.standings?.nodes;
	const racesByYear: { [key: number]: number }   = {};
	const [active, setActive]                      = useState<number | undefined>();

	if (loading || !careerStandings) {
		return <Skeleton variant="rectangular" height={400}/>;
	}

	if (!careerStandings.length) {
		return <Alert variant="outlined" severity="info">Career Data Not Available</Alert>;
	}

	data?.driver.raceResults?.nodes?.forEach(r => r.race?.year && (racesByYear[r.race?.year] = (racesByYear[r.race?.year] || 0) + 1));
	
	return (
        <>
            <Grid
                container
                spacing={2}
                className="items-center justify-around">
				<Stats driverId={driverId}/>
				<Grid size={12} />
				<Grid size={12}>
					<CareerChart driverId={driverId} size={200}/>
				</Grid>
				<Grid size={12}>
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
									field:       'positionNumber',
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
									field:      'team',
									headerName: 'Constructor',
									filterable: false,
									renderCell: ({row}) => (
										<ConstructorByLine id={row.team?.id} variant="link"/>
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