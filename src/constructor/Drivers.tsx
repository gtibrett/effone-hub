import {QueryResult} from '@apollo/client/react/types/types';
import {DriverStandingBySeason} from '@gtibrett/effone-hub-graph-api';
import {Link} from '@gtibrett/mui-additions';
import {Alert, Skeleton} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {DriverByLine} from '../driver';
import {ConstructorPageData, DriverByYear} from './types';

type DriversProps = Pick<QueryResult<ConstructorPageData>, 'data' | 'loading'>;

type RowData = {
	year: DriverByYear['year'];
	drivers: DriverByYear['driver'][]
}

const findFinalStandings = (year: number, standings: DriverStandingBySeason[]) => {
	return standings.filter(s => s.year === year)[0];
};

export default function Drivers({data, loading}: DriversProps) {
	if (loading) {
		return <Skeleton variant="rectangular" height={400}/>;
	}
	const years: RowData[] = [];
	
	(data?.team.drivers || []).forEach(dy => {
		let index = years.findIndex(y => y.year === dy.year);
		
		if (index === -1) {
			years.push({
				year:    dy.year,
				drivers: []
			});
			
			index = years.length - 1;
		}
		
		years[index].drivers.push(dy.driver);
	});
	
	if (!years.length) {
		return <Alert variant="outlined" severity="info">Career Data Not Available</Alert>;
	}
	
	return (
		<>
			<DataGrid
				rows={years}
				autoHeight
				density="compact"
				getRowId={(r) => r.year}
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
							renderCell:  ({row}) => <Link href={`/season/${row.year}`}>{row.year}</Link>
						},
						{
							field:      'driver1',
							headerName: 'Driver',
							flex:       1,
							minWidth:   175,
							renderCell: ({row}) => row.drivers[0] ? <DriverByLine id={row.drivers[0].driverId} variant="full"/> : ''
						},
						{
							field:       'wins1',
							headerName:  'Wins',
							type:        'number',
							headerAlign: 'center',
							align:       'center',
							renderCell:  ({row}) => row.drivers[0] ? findFinalStandings(row.year, row.drivers[0].driverStandingsBySeasons)?.wins : ''
						},
						{
							field:       'standing1',
							headerName:  'Standing',
							type:        'number',
							headerAlign: 'center',
							align:       'center',
							renderCell:  ({row}) => row.drivers[0] ? findFinalStandings(row.year, row.drivers[0].driverStandingsBySeasons)?.position : ''
						},
						{
							field:       'points1',
							headerName:  'Points',
							type:        'number',
							headerAlign: 'center',
							align:       'center',
							renderCell:  ({row}) => row.drivers[0] ? findFinalStandings(row.year, row.drivers[0].driverStandingsBySeasons)?.points : ''
						},
						{
							field:      'driver2',
							headerName: 'Driver',
							flex:       1,
							minWidth:   175,
							renderCell: ({row}) => row.drivers[1] ? <DriverByLine id={row.drivers[1].driverId} variant="full"/> : ''
						},
						{
							field:       'wins2',
							headerName:  'Wins',
							type:        'number',
							headerAlign: 'center',
							align:       'center',
							renderCell:  ({row}) => row.drivers[1] ? findFinalStandings(row.year, row.drivers[1].driverStandingsBySeasons)?.wins : ''
						},
						{
							field:       'standing2',
							headerName:  'Standing',
							type:        'number',
							headerAlign: 'center',
							align:       'center',
							renderCell:  ({row}) => row.drivers[1] ? findFinalStandings(row.year, row.drivers[1].driverStandingsBySeasons)?.position : ''
						},
						{
							field:       'points2',
							headerName:  'Points',
							type:        'number',
							headerAlign: 'center',
							align:       'center',
							renderCell:  ({row}) => row.drivers[1] ? findFinalStandings(row.year, row.drivers[1].driverStandingsBySeasons)?.points : ''
						}
					] as GridColDef<RowData>[]
				}
			/>
		</>
	);
}