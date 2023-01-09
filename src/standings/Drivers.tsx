import {Divider} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {useEffect, useState} from 'react';
import Caxios from '../api/Caxios';
import {getAPIUrl, mapDriversStandings} from '../api/Ergast';
import {useAppState} from '../app/AppStateProvider';
import ByLine from '../drivers/ByLine';
import Place from '../race/Place';
import {Responses, Standing} from '../types/ergast';

const sx = {
	border: 0,
	overflow: 'auto',
	maxHeight: 398,
	'& > .MuiDataGrid-main': {
		overflow: 'unset'
	},
	'& > div > .MuiDataGrid-footerContainer': {
		display: 'none'
	}
};

export default function Drivers() {
	const [{season}]                = useAppState();
	const [standings, setStandings] = useState<Standing[]>([]);
	const dataUrl                   = getAPIUrl(`/${season}/driverStandings.json`);
	
	useEffect(() => {
		if (season) {
			Caxios.get<Responses['DriverStandingsByYearResponse']>(dataUrl)
			      .then(mapDriversStandings)
			      .then(data => setStandings(data))
			      .catch(() => setStandings([]));
		}
	}, [season, setStandings]);
	
	if (!standings.length) {
		return null;
	}
	
	const [p1, p2, p3, ...rest] = standings;
	
	return (
		<>
			<Place driverId={p1.Driver?.driverId} points={p1.points}/>
			<Divider/>
			<Place driverId={p2.Driver?.driverId} points={p2.points}/>
			<Divider/>
			<Place driverId={p3.Driver?.driverId} points={p3.points}/>
			<Divider/>
			<DataGrid
				sx={sx}
				rows={rest}
				autoHeight
				density="compact"
				columns={
					[
						{
							field: 'position',
							headerName: '#',
							headerAlign: 'center',
							type: 'number',
							align: 'center',
							width: 16,
							renderCell: ({row}) => row.Driver?.permanentNumber
						},
						{
							field: 'code',
							headerName: 'Driver',
							flex: 1,
							renderCell: ({row}) => <ByLine id={row.Driver?.driverId} avatarProps={{size: 24}} flagProps={{size: 16}}/>
						},
						{
							field: 'points',
							headerName: 'Points',
							type: 'number'
						}
					]
				}
			/>
		</>
	);
}