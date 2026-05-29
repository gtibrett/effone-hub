import { Alert, Link, Skeleton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import type { SimpleApolloResult } from '@/app/lib/apollo-types';
import { ChartSwitcher, ChartSwitcherChart } from '@/components/app';

import { ConstructorPageData } from '../types';
import HistoryChart from './HistoryChart';

export type HistoryProps = SimpleApolloResult<ConstructorPageData>;

export default function History({ data, loading }: HistoryProps) {
	if (loading) {
		return <Skeleton variant="rectangular" height={400} />;
	}
	const standings = data?.team?.standings.map(s => ({ ...s, name: data?.team.name })) || [];

	data?.team.antecedents.forEach(({ antecedentTeam, startYear, endYear }) => {
		antecedentTeam.standings
			.filter(s => s.year && s.year >= (startYear ?? 0) && (!endYear || s.year <= endYear))
			.forEach(s => standings.push({ ...s, name: antecedentTeam.name }));
	});

	if (!standings.length) {
		return (
			<Alert variant="outlined" severity="info">
				Career Data Not Available
			</Alert>
		);
	}

	const charts: ChartSwitcherChart[] = [
		{
			id: 'position',
			label: 'Position',
			chart: (
				<HistoryChart
					data={data}
					loading={loading}
					dataKey="positionNumber"
					dataMaxKey="maxPosition"
					invert
					min={1}
					max={20}
				/>
			)
		},
		{
			id: 'points',
			label: 'Points',
			chart: (
				<HistoryChart
					data={data}
					loading={loading}
					dataKey="points"
					dataMaxKey="maxPoints"
				/>
			)
		}
	];

	return (
		<>
			<ChartSwitcher title="Constructor Timeline" size={250} charts={charts} />

			<DataGrid
				rows={standings}
				autoHeight
				density="compact"
				getRowId={r => `${r.year}-${r.name}-${r.engineManufacturerId ?? ''}`}
				initialState={{
					sorting: {
						sortModel: [{ field: 'year', sort: 'desc' }]
					}
				}}
				columns={[
					{
						field: 'year',
						headerName: 'Season',
						headerAlign: 'center',
						align: 'center',
						width: 100,
						renderCell: ({ row }) => (
							<Link href={`/seasons/${row.year}`}>{row.year}</Link>
						)
					},
					{
						field: 'name',
						headerName: 'Name',
						flex: 1
					},
					{
						field: 'positionNumber',
						headerName: 'Position',
						type: 'number',
						headerAlign: 'center',
						align: 'center',
						flex: 0.5
					},
					{
						field: 'points',
						headerName: 'Points',
						type: 'number',
						headerAlign: 'center',
						align: 'center',
						flex: 0.5
					}
				]}
			/>
		</>
	);
}
