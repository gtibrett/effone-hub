import '@/polyfills';
import { useSuspenseQuery } from '@apollo/client/react';
import { faSquareFull } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataGrid } from '@mui/x-data-grid';

import { ConstructorByLine } from '@/components/app';
import {
	type ConstructorsListFilters,
	ConstructorsQuery,
	useConstructorsList
} from '@/components/page/constructor/index';
import type { RaceResult } from '@/gql/graphql';
import { useGetTeamColor } from '@/hooks';

import type { TeamWithSeasons } from './useConstructorsList';

type ConstructorsTableProps = {
	filters: ConstructorsListFilters;
};

export default function ConstructorsList({ filters }: ConstructorsTableProps) {
	const {
		data: { teams }
	} = useSuspenseQuery<{ teams: TeamWithSeasons[] }>(ConstructorsQuery);
	const filteredTeams = useConstructorsList(teams, filters);
	const getTeamColor = useGetTeamColor();

	return (
		<DataGrid
			rows={filteredTeams}
			autoHeight
			density="compact"
			getRowId={r => r.id}
			columns={[
				{
					field: 'color',
					headerName: '',
					width: 24,
					renderCell: ({ row }) => (
						<FontAwesomeIcon
							icon={faSquareFull}
							color={getTeamColor(row.colors, 'primaryHex')}
						/>
					),
					sortable: false
				},
				{
					field: 'name',
					headerName: 'Constructor',
					flex: 1,
					renderCell: ({ row }) => <ConstructorByLine team={row} variant="link" />
				},
				{
					field: 'seasons',
					headerName: 'Seasons',
					flex: 0.25,
					type: 'number',
					valueGetter: (_, row) =>
						(row.seasons ?? []).map((s: { year: number }) => s.year).distinct().length
				},
				{
					field: 'races',
					headerName: 'Races',
					flex: 0.25,
					type: 'number',
					valueGetter: (_, row) =>
						row.raceResults
							.filter((r): r is RaceResult => r != null)
							.map(r => `${r.raceId}-${r.driverId}`)
							.distinct().length
				},
				// {
				// 	field:       'championships',
				// 	headerName:  'Championships',
				// 	flex:        .25,
				// 	type:        'number',
				// 	valueGetter: (value, row) => row.driverStandingsBySeasons.filter(r=>Number(r.position) === 1).length
				// },
				{
					field: 'wins',
					headerName: 'Wins',
					flex: 0.25,
					type: 'number',
					valueGetter: (_value, row) =>
						row.raceResults
							.filter((r): r is RaceResult => r != null)
							.filter(
								(r: { positionNumber?: number | null }) =>
									Number(r.positionNumber) === 1
							).length
				},
				{
					field: 'podiums',
					headerName: 'Podiums',
					flex: 0.25,
					type: 'number',
					valueGetter: (_value, row) =>
						row.raceResults
							.filter((r): r is RaceResult => r != null)
							.filter(
								(r: { positionNumber?: number | null }) =>
									Number(r.positionNumber) <= 3
							).length
				}
			]}
			initialState={{
				sorting: {
					sortModel: [{ field: 'name', sort: 'asc' }]
				}
			}}
		/>
	);
}
