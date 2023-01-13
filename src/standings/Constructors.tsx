import {Alert, Skeleton} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useEffect, useState} from 'react';
import Caxios from '../api/Caxios';
import {getAPIUrl, mapConstructorsStandings} from '../api/Ergast';
import {useAppState} from '../app/AppStateProvider';
import ByLine from '../constructors/ByLine';
import {Responses, Standing} from '../types/ergast';

const sx = {
	border: 0,
	'& > div > .MuiDataGrid-footerContainer': {
		display: 'none'
	}
};

export default function Constructors() {
	const [{season}]      = useAppState();
	const [data, setData] = useState<Standing[] | undefined>();
	
	useEffect(() => {
		if (!data) {
			const dataUrl = getAPIUrl(`/${season}/constructorStandings.json`);
			Caxios.get<Responses['ConstructorStandingsByYearResponse']>(dataUrl)
			      .then(mapConstructorsStandings)
			      .then((results) => setData(results));
		}
	});
	
	if (!data) {
		return <Skeleton variant="rectangular" height={400}/>;
	}
	
	if (!data.length) {
		return <Alert variant="outlined" severity="info">Constructor Standings Data Not Available</Alert>;
	}
	
	return (
		<DataGrid
			sx={sx}
			rows={data}
			autoHeight
			density="compact"
			pageSize={10}
			columns={
				[
					{
						field: 'code',
						headerName: 'Constructor',
						flex: 1,
						renderCell: ({row}) => <ByLine id={row.Constructor?.constructorId} variant="link"/>
					},
					{
						field: 'points',
						headerName: 'Points',
						type: 'number'
					}
				] as GridColDef<Standing>[]
			}
		/>
	);
}