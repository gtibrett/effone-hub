import {ConstructorByLine, DriverByLine} from '@/components/app';
import {gql, useQuery} from '@apollo/client';
import {Race} from '@/gql/graphql';
import {Alert, Skeleton} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';

const QualifyingQuery = gql`
	query qualifyingQuery($season: Int!, $round: Int!) {
		race: raceByYearAndRound(year: $season, round: $round) {
			qualifyings {
				driverId
				driver {
					teamsByYear (condition: {year: $season}) {
						teamId
					}
				}
				position
				q1
				q2
				q3
			}
		}
	}
`;

type QualifyingProps = {
	season: number;
	round: number;
}

export default function Qualifying({season, round}: QualifyingProps) {
	const {data, loading} = useQuery<{ race: Pick<Race, 'qualifyings'> }>(QualifyingQuery, {variables: {season, round}});
	
	if (loading) {
		return <Skeleton variant="rectangular" height={400}/>;
	}
	
	if (!data?.race.qualifyings.length) {
		return <Alert variant="outlined" severity="info">Qualifying Data Not Available</Alert>;
	}
	
	return (
		<DataGrid
			rows={data.race.qualifyings}
			autoHeight
			density="compact"
			getRowId={r => r.driverId || 0}
			initialState={{
				sorting: {
					sortModel: [{field: 'position', sort: 'asc'}]
				}
			}}
			columns={
				[
					{
						field:       'position',
						headerName:  'P',
						width:       60,
						headerAlign: 'center',
						align:       'center',
						type:        'number'
					},
					{
						field:      'Driver',
						headerName: 'Driver',
						flex:       1,
						renderCell: ({row}) => row.driverId ? <DriverByLine id={row.driverId}/> : '',
						minWidth:   200
					},
					{
						field:      'Constructor',
						headerName: 'Constructor',
						flex:       1,
						renderCell: ({row}) => row.driver?.teamsByYear[0].teamId ? <ConstructorByLine id={row.driver.teamsByYear[0].teamId}/> : '',
						minWidth:   150
					},
					{
						field:       'q1',
						headerName:  'Q1',
						headerAlign: 'center',
						align:       'center',
						type:        'string'
					},
					{
						field:       'q2',
						headerName:  'Q2',
						headerAlign: 'center',
						align:       'center',
						type:        'string'
					},
					{
						field:       'q3',
						headerName:  'Q3',
						headerAlign: 'center',
						align:       'center',
						type:        'string'
					}
				]
			}
		/>
	);
}