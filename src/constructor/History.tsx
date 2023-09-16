import {QueryResult} from '@apollo/client/react/types/types';
import {Alert, Skeleton} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Team} from '@gtibrett/effone-hub-graph-api';
import PointsChart from './history/PointsChart';
import PositionsChart from './history/PositionsChart';
import WinsChart from './history/WinsChart';
import {ConstructorPageData, TeamStandingData} from './types';

export type HistoryProps = Pick<QueryResult<ConstructorPageData>, 'data' | 'loading'>;

export default function History({data, loading}: HistoryProps) {
	if (loading) {
		return <Skeleton variant="rectangular" height={400}/>;
	}
	const standings = data?.team.standings.map(s => ({...s, name: data?.team.name})) || [];
	
	data?.team.teamHistories.forEach(({antecedentTeam, startYear, endYear}) => {
		antecedentTeam.standings.forEach(s => standings.push({...s, name: antecedentTeam.name}));
	});
	
	if (!standings.length) {
		return <Alert variant="outlined" severity="info">Career Data Not Available</Alert>;
	}
	
	return (
		<>
			<PositionsChart data={data} loading={loading}/>
			<PointsChart data={data} loading={loading}/>
			<WinsChart data={data} loading={loading}/>
			<DataGrid
				rows={standings}
				autoHeight
				density="compact"
				getRowId={(r) => `${r.year}-${r.name}` || ''}
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
							flex:        .5
						},
						{
							field:      'name',
							headerName: 'Name',
							flex:       1
						},
						{
							field:       'position',
							headerName:  'Position',
							type:        'number',
							headerAlign: 'center',
							align:       'center',
							flex:        .5
						},
						{
							field:       'points',
							headerName:  'Points',
							type:        'number',
							headerAlign: 'center',
							align:       'center',
							flex:        .5
						},
						{
							field:       'wins',
							headerName:  'Wins',
							type:        'number',
							headerAlign: 'center',
							align:       'center',
							flex:        .5
						}
					
					] as GridColDef<TeamStandingData & { name: Team['name'] }>[]
				}
			/>
		</>
	);
}