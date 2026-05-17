import '@/polyfills';
import {ConstructorByLine} from '@/components/app';
import {ConstructorsListFilters, ConstructorsQuery, useConstructorsList} from '@/components/page/constructor/index';
import {useGetTeamColor} from '@/hooks';
import {useSuspenseQuery} from '@apollo/client/react';
import {faSquareFull} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {DataTable} from '@/components/ui';
import {RaceResult} from '@/gql/graphql';
import type {ColumnDef} from '@tanstack/react-table';
import {TeamWithSeasons} from './useConstructorsList';

type ConstructorsTableProps = {
	filters: ConstructorsListFilters;
}

export default function ConstructorsList({filters}: ConstructorsTableProps) {
	const {data: {teams}} = useSuspenseQuery<{ teams: { nodes: TeamWithSeasons[] } }>(ConstructorsQuery);
	const filteredTeams   = useConstructorsList(teams.nodes, filters);
	const getTeamColor    = useGetTeamColor();

	const numCell = (v: unknown) => <div className="text-right">{v as any}</div>;
	const numHeader = (label: string) => () => <div className="text-right w-full">{label}</div>;

	const columns: ColumnDef<TeamWithSeasons, any>[] = [
		{
			id:            'color',
			header:        '',
			size:          24,
			enableSorting: false,
			cell:          ({row}) => <FontAwesomeIcon icon={faSquareFull} color={getTeamColor(row.original.colors, 'primaryHex', false)}/>
		},
		{
			accessorKey: 'name',
			header:      'Constructor',
			cell:        ({row}) => <ConstructorByLine team={row.original} variant="link"/>
		},
		{
			id:         'seasons',
			header:     numHeader('Seasons'),
			accessorFn: (row) => (row.seasons?.nodes ?? []).map((s: { year: number }) => s.year).distinct().length,
			cell:       ({getValue}) => numCell(getValue())
		},
		{
			id:         'races',
			header:     numHeader('Races'),
			accessorFn: (row) => row.raceResults?.nodes.filter((r: any): r is RaceResult => r != null).map((r: any) => `${r.raceId}-${r.driverId}`).distinct().length,
			cell:       ({getValue}) => numCell(getValue())
		},
		{
			id:         'wins',
			header:     numHeader('Wins'),
			accessorFn: (row) => row.raceResults?.nodes.filter((r: any): r is RaceResult => r != null).filter((r: { positionNumber?: number | null }) => Number(r.positionNumber) === 1).length,
			cell:       ({getValue}) => numCell(getValue())
		},
		{
			id:         'podiums',
			header:     numHeader('Podiums'),
			accessorFn: (row) => row.raceResults?.nodes.filter((r: any): r is RaceResult => r != null).filter((r: { positionNumber?: number | null }) => Number(r.positionNumber) <= 3).length,
			cell:       ({getValue}) => numCell(getValue())
		}
	];

	return (
		<DataTable<TeamWithSeasons>
			rows={filteredTeams}
			columns={columns}
			autoHeight
			density="compact"
			getRowId={(r: TeamWithSeasons) => r.id}
			initialState={{
				sorting: {
					sortModel: [{field: 'name', sort: 'asc'}]
				}
			}}
		/>
	);
}
