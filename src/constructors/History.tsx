import {Alert, Skeleton} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {ForConstructors, SeasonStanding} from '@gtibrett/effone-hub-api';
import {useEffect, useState} from 'react';
import Caxios from '../api/Caxios';
import {getAPIUrl, mapConstructorHistory} from '../api/Ergast';
//import CareerChart from './CareerChart';
import {ConstructorId} from './ConstructorProvider';
import HistoryChart from './HistoryChart';

type HistoryProps = {
	constructorId?: ConstructorId;
}

export default function History({constructorId}: HistoryProps) {
	const [standings, setStandings] = useState<SeasonStanding<ForConstructors>[] | undefined>();
	
	useEffect(() => {
		if (!standings) {
			const dataUrl = getAPIUrl(`/constructors/${constructorId}/constructorStandings.json`);
			Caxios.get(dataUrl)
			      .then(mapConstructorHistory)
			      .then(data => {
				      setStandings(data);
			      })
			      .catch(() => setStandings([]));
		}
	}, [standings, constructorId]);
	
	if (!standings) {
		return <Skeleton variant="rectangular" height={400}/>;
	}
	
	if (!standings.length) {
		return <Alert variant="outlined" severity="info">Career Data Not Available</Alert>;
	}
	
	return (
		<>
			<HistoryChart seasons={standings}/>
			<DataGrid
				rows={standings}
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
								return Number(row.ConstructorStandings?.[0].position);
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
								return Number(row.ConstructorStandings?.[0].points);
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
								return Number(row.ConstructorStandings?.[0].wins);
							},
							flex: 1
						}
					
					] as GridColDef<SeasonStanding<ForConstructors>>[]
				}
			/>
		</>
	);
}