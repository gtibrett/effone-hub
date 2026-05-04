import {ConstructorByLine, DriverByLine} from '@/components/app';
import {gql, useQuery} from '@apollo/client';
import {QualifyingResult, Race} from '@/gql/graphql';
import {Alert, Skeleton} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';

const QualifyingQuery = gql`
	query qualifyingQuery($season: Int!, $round: Int!) {
		race: raceByYearAndRound(year: $season, round: $round) {
			qualifyingResults {
				nodes {
					id
					driverId
					teamId
					positionNumber
					q1
					q2
					q3
				}
			}
		}
	}
`;

type QualifyingProps = {
	season: number;
	round: number;
}

export default function Qualifying({season, round}: QualifyingProps) {
	const {data, loading} = useQuery<{ race: Pick<Race, 'qualifyingResults'> }>(QualifyingQuery, {variables: {season, round}});

	if (loading) {
		return <Skeleton variant="rectangular" height={400}/>;
	}

	const rows = (data?.race?.qualifyingResults?.nodes ?? []).filter((r): r is QualifyingResult => r != null);

	if (!rows.length) {
		return <Alert variant="outlined" severity="info">Qualifying Data Not Available</Alert>;
	}

	return (
		<DataGrid
			rows={rows}
			autoHeight
			density="compact"
			getRowId={r => `${r.driverId ?? 'x'}-${r.positionNumber ?? 0}`}
			initialState={{
				sorting: {
					sortModel: [{field: 'positionNumber', sort: 'asc'}]
				}
			}}
			columns={
				[
					{
						field:       'positionNumber',
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
						renderCell: ({row}) => row.teamId ? <ConstructorByLine id={row.teamId}/> : '',
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