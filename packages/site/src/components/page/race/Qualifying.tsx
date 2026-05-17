import {ConstructorByLine, DriverByLine} from '@/components/app';
import {gql} from '@apollo/client';
import {useQuery} from '@apollo/client/react';
import {QualifyingResult, Race} from '@/gql/graphql';
import {Alert, AlertDescription} from '@/components/ui/shadcn/alert';
import {DataTable, Skeleton} from '@/components/ui';

import type {ColumnDef} from '@tanstack/react-table';

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
		return <Skeleton variant="rectangular" className="h-[400px]"/>;
	}

	const rows = (data?.race?.qualifyingResults?.nodes ?? []).filter((r): r is QualifyingResult => r != null);

	if (!rows.length) {
		return <Alert><AlertDescription>Qualifying Data Not Available</AlertDescription></Alert>;
	}

	const numCell = (v: unknown) => <div className="text-center">{v as any}</div>;
	const numHeader = (label: string) => () => <div className="text-center w-full">{label}</div>;

	const columns: ColumnDef<QualifyingResult, any>[] = [
		{
			accessorKey: 'positionNumber',
			header:      numHeader('P'),
			size:        60,
			cell:        ({getValue}) => numCell(getValue())
		},
		{
			id:     'Driver',
			header: 'Driver',
			cell:   ({row}) => row.original.driverId ? <DriverByLine id={row.original.driverId}/> : ''
		},
		{
			id:     'Constructor',
			header: 'Constructor',
			cell:   ({row}) => row.original.teamId ? <ConstructorByLine id={row.original.teamId}/> : ''
		},
		{
			accessorKey: 'q1',
			header:      numHeader('Q1'),
			cell:        ({getValue}) => numCell(getValue())
		},
		{
			accessorKey: 'q2',
			header:      numHeader('Q2'),
			cell:        ({getValue}) => numCell(getValue())
		},
		{
			accessorKey: 'q3',
			header:      numHeader('Q3'),
			cell:        ({getValue}) => numCell(getValue())
		}
	];

	return (
		<DataTable<QualifyingResult>
			rows={rows}
			columns={columns}
			autoHeight
			density="compact"
			getRowId={(r: QualifyingResult) => `${r.driverId ?? 'x'}-${r.positionNumber ?? 0}`}
			initialState={{
				sorting: {
					sortModel: [{field: 'positionNumber', sort: 'asc'}]
				}
			}}
		/>
	);
}
