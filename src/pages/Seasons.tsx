import {ForDrivers, Responses, SeasonStanding} from '@gtibrett/effone-hub-api';
import {Card, Skeleton} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useEffect, useState} from 'react';
import Caxios from '../api/Caxios';
import {getAPIUrl, mapPastSeasons} from '../api/Ergast';
import ByLine from '../drivers/ByLine';
import {Link, Page, usePageTitle} from '../ui-components';

type SeasonsTableProps = {
	seasons: SeasonStanding<ForDrivers>[];
}

const SeasonsTable = ({seasons}: SeasonsTableProps) => (
	<DataGrid
		rows={seasons}
		autoHeight
		density="compact"
		getRowId={r => r.season}
		columns={
			[
				{
					field:      'season',
					headerName: 'Season',
					flex:       1,
					renderCell: ({row}) => <Link to={`/season/${row.season}`}>{row.season}</Link>
				},
				{
					field:      'winner',
					headerName: 'Winner',
					flex:       1,
					renderCell: ({row}) => row.DriverStandings?.[0]?.Driver?.driverId && <ByLine id={row.DriverStandings[0].Driver.driverId}/>
				},
				{
					field:       'points',
					headerName:  'Points',
					flex:        .25,
					type:        'number',
					headerAlign: 'right',
					align:       'right',
					renderCell:  ({row}) => row.DriverStandings?.[0]?.points
				},
				{
					field:       'wins',
					headerName:  'Wins',
					flex:        .25,
					type:        'number',
					headerAlign: 'right',
					align:       'right',
					renderCell:  ({row}) => row.DriverStandings?.[0]?.wins
				}
			] as GridColDef<SeasonStanding<ForDrivers>>[]
		}
		initialState={{
			sorting: {
				sortModel: [{field: 'season', sort: 'desc'}]
			}
		}}
	/>
);

export default function Seasons() {
	usePageTitle('Past Seasons');
	
	const [seasons, setSeasons] = useState<SeasonStanding<ForDrivers>[] | undefined>();
	
	useEffect(() => {
		Caxios.get<Responses.DriversStandingsResponse>(getAPIUrl(`/driverStandings/1.json`), {params: {limit: 2000}})
		      .then(mapPastSeasons)
		      .then(r => {
			      console.log(r);
			      return r;
		      })
		      .then(results => setSeasons(results))
		      .catch((err) => {
			      console.log(err);
			      setSeasons([]);
		      });
	}, []);
	
	return (
		<Page title="Circuits">
			<Card>
				{
					!seasons
					? <Skeleton variant="rectangular" height={400}/>
					: <SeasonsTable seasons={seasons}/>
				}
			</Card>
		</Page>
	);
}