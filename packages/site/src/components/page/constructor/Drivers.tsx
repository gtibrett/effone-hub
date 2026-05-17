import {Link} from '@/components/ui';
import {DriverByLine} from '@/components/app';
import type {SimpleApolloResult} from '@/app/lib/apollo-types';
import {SeasonDriverStanding} from '@/gql/graphql';
import {Alert, Skeleton} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {ConstructorPageData, DriverByYear} from './types';

type DriversProps = SimpleApolloResult<ConstructorPageData>;

type RowData = {
	year: DriverByYear['year'];
	drivers: DriverByYear['driver'][]
}

const findFinalStandings = (year: number, standings: SeasonDriverStanding[]) => {
	return standings.filter(s => s.year === year)[0];
};

export default function Drivers({data, loading}: DriversProps) {
	if (loading) {
		return <Skeleton variant="rectangular" height={400}/>;
	}
	const years: RowData[] = [];
	
	(data?.team.drivers.nodes || []).forEach(dy => {
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
							renderCell:  ({row}) => <Link href={`/seasons/${row.year}`}>{row.year}</Link>
						},
						{
							field:      'driver1',
							headerName: 'Driver',
							flex:       1,
							minWidth:   175,
							renderCell: ({row}) => row.drivers[0] ? <DriverByLine id={row.drivers[0].id} variant="full"/> : ''
						},
						{
							field:       'standing1',
							headerName:  'Standing',
							type:        'number',
							headerAlign: 'center',
							align:       'center',
							renderCell:  ({row}) => row.drivers[0] ? findFinalStandings(row.year, row.drivers[0].seasonDriverStandings?.nodes?.filter((s): s is SeasonDriverStanding => s != null))?.positionNumber : ''
						},

						{
							field:       'points1',
							headerName:  'Points',
							type:        'number',
							headerAlign: 'center',
							align:       'center',
							renderCell:  ({row}) => row.drivers[0] ? findFinalStandings(row.year, row.drivers[0].seasonDriverStandings?.nodes?.filter((s): s is SeasonDriverStanding => s != null))?.points : ''
						},
						{
							field:      'driver2',
							headerName: 'Driver',
							flex:       1,
							minWidth:   175,
							renderCell: ({row}) => row.drivers[1] ? <DriverByLine id={row.drivers[1].id} variant="full"/> : ''
						},
						{
							field:       'standing2',
							headerName:  'Standing',
							type:        'number',
							headerAlign: 'center',
							align:       'center',
							renderCell:  ({row}) => row.drivers[1] ? findFinalStandings(row.year, row.drivers[1].seasonDriverStandings?.nodes?.filter((s): s is SeasonDriverStanding => s != null))?.positionNumber : ''
						},
						{
							field:       'points2',
							headerName:  'Points',
							type:        'number',
							headerAlign: 'center',
							align:       'center',
							renderCell:  ({row}) => row.drivers[1] ? findFinalStandings(row.year, row.drivers[1].seasonDriverStandings?.nodes?.filter((s): s is SeasonDriverStanding => s != null))?.points : ''
						}
					]
				}
			/>
		</>
	);
}