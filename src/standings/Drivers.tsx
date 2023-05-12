import {Responses, Standing} from '@gtibrett/effone-hub-api';
import {Box, Divider, Grid} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {useEffect, useState} from 'react';
import Caxios from '../api/Caxios';
import {getAPIUrl, mapDriversStandings} from '../api/Ergast';
import {useAppState} from '../app/AppStateProvider';
import ByLine from '../drivers/ByLine';
import Place from '../race/Place';

const sx = {
	'& > .MuiDataGrid-main': {
		overflowX: 'hidden'
	},
	'& > div > .MuiDataGrid-footerContainer': {
		display: 'none'
	}
};

export default function Drivers({season}: {season: number}) {
	const [standings, setStandings] = useState<Standing[]>([]);
	
	useEffect(() => {
		if (season) {
			const dataUrl = getAPIUrl(`/${season}/driverStandings.json`);
			Caxios.get<Responses.DriversStandingsResponse>(dataUrl)
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
		<Grid container spacing={2} alignItems="stretch">
			<Grid item xs={12} lg={5}>
				<Place driverId={p1.Driver?.driverId} place={1} points={p1.points} asterisk={season === 2021}/>
				<Divider/>
				<Place driverId={p2.Driver?.driverId} place={2} points={p2.points}/>
				<Divider/>
				<Place driverId={p3.Driver?.driverId} place={3} points={p3.points}/>
			</Grid>
			<Grid item xs={12} lg={7}>
				<Box sx={{
					height: {
						xs: 300,
						lg: 'calc(100% - 8px)'
					},
					pr: {
						xs: 0,
						lg: 4
					}
				}}>
					<DataGrid
						sx={sx}
						rows={rest}
						density="compact"
						getRowId={r => r.Driver?.driverId || ''}
						initialState={{
							sorting: {
								sortModel: [{field: 'position', sort: 'asc'}]
							}
						}}
						columns={
							[
								{
									field: 'position',
									headerName: 'P',
									headerAlign: 'center',
									type: 'number',
									align: 'center',
									width: 16
								},
								{
									field: 'code',
									headerName: 'Driver',
									flex: 1,
									renderCell: ({row}) => <ByLine id={row.Driver?.driverId} avatarProps={{size: 24}} flagProps={{size: 16}}/>,
									minWidth: 200
								},
								{
									field: 'points',
									headerName: 'Points',
									type: 'number'
								}
							]
						}
					/>
				</Box>
			</Grid>
		</Grid>
	);
}