import {Responses, Standing} from '@gtibrett/effone-hub-api';
import {Alert, Skeleton} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useEffect, useState} from 'react';
import Caxios from '../api/Caxios';
import {getAPIUrl, mapConstructorsStandings} from '../api/Ergast';
import ByLine from '../constructors/ByLine';

export default function Constructors({season}: { season: number }) {
	const [data, setData] = useState<Standing[] | undefined>();
	
	useEffect(() => {
		const dataUrl = getAPIUrl(`/${season}/constructorStandings.json`);
		Caxios.get<Responses.ConstructorStandingsResponse>(dataUrl)
		      .then(mapConstructorsStandings)
		      .then((results) => setData(results));
	}, [season]);
	
	if (!data) {
		return <Skeleton variant="rectangular" height={400}/>;
	}
	
	if (!data.length) {
		return <Alert variant="outlined" severity="info">Constructor Standings Data Not Available</Alert>;
	}
	
	return (
		<DataGrid
			rows={data}
			getRowId={r => r.Constructor?.constructorId || ''}
			autoHeight
			density="compact"
			pageSize={10}
			initialState={{
				sorting: {
					sortModel: [{field: 'points', sort: 'desc'}]
				}
			}}
			columns={
				[
					{
						field:      'code',
						headerName: 'Constructor',
						flex:       1,
						renderCell: ({row}) => <ByLine id={row.Constructor?.constructorId} variant="link"/>
					},
					{
						field:      'points',
						headerName: 'Points',
						type:       'number'
					}
				] as GridColDef<Standing>[]
			}
		/>
	);
}