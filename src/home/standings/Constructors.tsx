import {QueryResult} from '@apollo/client/react/types/types';
import {Alert, Skeleton} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import ByLine from '../../constructors/ByLine';
import {HomePageData, TeamStandingData} from '../types';

type ConstructorsProps = Pick<QueryResult<HomePageData>, 'data' | 'loading'>

export default function Constructors({loading, data}: ConstructorsProps) {
	const standings = data?.teamStandings || [];
	
	if (loading) {
		return <Skeleton variant="rectangular" height={400}/>;
	}
	
	if (!standings.length) {
		return <Alert variant="outlined" severity="info">Constructor Standings Data Not Available</Alert>;
	}
	
	return (
		<DataGrid
			rows={standings}
			getRowId={r => r.teamId}
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
						field:      'teamId',
						headerName: 'Constructor',
						flex:       1,
						renderCell: ({row}) => <ByLine id={row.teamId} variant="link"/>
					},
					{
						field:      'points',
						headerName: 'Points',
						type:       'number'
					}
				] as GridColDef<TeamStandingData>[]
			}
		/>
	);
}