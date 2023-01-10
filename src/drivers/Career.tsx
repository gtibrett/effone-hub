import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useEffect, useState} from 'react';
import Caxios from '../api/Caxios';
import {getAPIUrl, mapDriverCareer} from '../api/Ergast';
import ByLine from '../constructors/ByLine';
import {SeasonStanding} from '../types/ergast';
import CareerChart from './CareerChart';
import {DriverId} from './DriverProvider';

const sx = {
	border: 0,
	overflow: 'auto',
	'& > .MuiDataGrid-main': {
		overflow: 'unset'
	},
	'& > div > .MuiDataGrid-footerContainer': {
		display: 'none'
	}
};

type CareerProps = {
	driverId: DriverId;
}

export default function Career({driverId}: CareerProps) {
	const [seasonStandings, setSeasonStandings] = useState<SeasonStanding[]>([]);
	
	useEffect(() => {
		if (!seasonStandings.length) {
			const dataUrl = getAPIUrl(`/drivers/${driverId}/driverStandings.json`);
			Caxios.get(dataUrl)
			      .then(mapDriverCareer)
			      .then(data => {
				      if (data.length) {
					      setSeasonStandings(data);
				      }
			      });
		}
	}, [seasonStandings, driverId]);
	
	return (
		<>
			<CareerChart seasons={seasonStandings}/>
			<DataGrid
				sx={sx}
				rows={seasonStandings}
				autoHeight
				density="compact"
				getRowId={(r) => r.season || ''}
				columns={
					[
						{
							field: 'season',
							headerName: 'Season',
							headerAlign: 'center',
							type: 'number',
							align: 'center',
							flex: 1
						},
						{
							field: 'position',
							headerName: 'Position',
							type: 'number',
							headerAlign: 'center',
							align: 'center',
							valueGetter: ({row}) => {
								return Number(row.DriverStandings?.[0].position);
							},
							flex: 1
						},
						{
							field: 'points',
							headerName: 'Points',
							type: 'number',
							headerAlign: 'center',
							align: 'center',
							valueGetter: ({row}) => {
								return Number(row.DriverStandings?.[0].points);
							},
							flex: 1
						},
						{
							field: 'wins',
							headerName: 'Wins',
							type: 'number',
							headerAlign: 'center',
							align: 'center',
							valueGetter: ({row}) => {
								return Number(row.DriverStandings?.[0].wins);
							},
							flex: 1
						},
						{
							field: 'team',
							headerName: 'Constructor',
							filterable: false,
							renderCell: ({row}) => {
								return <ByLine id={row.DriverStandings?.[0].Constructors?.[0].constructorId} variant="link"/>;
							},
							flex: 1
						}
					
					] as GridColDef<SeasonStanding>[]
				}
			/>
		</>
	);
}