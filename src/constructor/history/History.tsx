import {QueryResult} from '@apollo/client/react/types/types';
import {ChartSwitcher, ChartSwitcherChart} from '@effonehub/components/charts';
import HistoryChart from '@effonehub/constructor/history/HistoryChart';
import {Link} from '@gtibrett/mui-additions';
import {Alert, Skeleton} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {ConstructorPageData} from '../types';

export type HistoryProps = Pick<QueryResult<ConstructorPageData>, 'data' | 'loading'>;

export default function History({data, loading}: HistoryProps) {
	if (loading) {
		return <Skeleton variant="rectangular" height={400}/>;
	}
	const standings = data?.team.standings.map(s => ({...s, name: data?.team.name})) || [];
	
	data?.team.teamHistories.forEach(({antecedentTeam, startYear, endYear}) => {
		antecedentTeam.standings
		              .filter(s => s.year && s.year >= startYear && (!endYear || s.year <= endYear))
		              .forEach(s => standings.push({...s, name: antecedentTeam.name}));
	});
	
	if (!standings.length) {
		return <Alert variant="outlined" severity="info">Career Data Not Available</Alert>;
	}
	
	const charts: ChartSwitcherChart[] = [
		{
			id:    'position',
			label: 'Position',
			chart: <HistoryChart data={data} loading={loading} dataKey="position" dataMaxKey="maxPosition" invert min={1} max={20}/>
		},
		{
			id:    'points',
			label: 'Points',
			chart: <HistoryChart data={data} loading={loading} dataKey="points" dataMaxKey="maxPoints"/>
		},
		{
			id:    'wins',
			label: 'Wins',
			chart: <HistoryChart data={data} loading={loading} dataKey="wins" dataMaxKey="maxWins"/>
		}
	];
	
	return (
		<>
			<ChartSwitcher title="Constructor Timeline" size={250} charts={charts}/>
			
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
							width:       100,
							renderCell:  ({row}) => <Link href={`/season/${row.year}`}>{row.year}</Link>
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
					
					]
				}
			/>
		</>
	);
}