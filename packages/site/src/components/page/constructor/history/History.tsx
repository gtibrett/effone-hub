import {ChartSwitcher, ChartSwitcherChart} from '@/components/app';
import type {SimpleApolloResult} from '@/app/lib/apollo-types';
import {Alert, AlertDescription} from '@/components/ui/shadcn/alert';
import {DataTable, Link} from '@/components/ui';
import {Skeleton} from '@mui/material';
import type {ColumnDef} from '@tanstack/react-table';
import {ConstructorPageData} from '../types';
import HistoryChart from './HistoryChart';

export type HistoryProps = SimpleApolloResult<ConstructorPageData>;

export default function History({data, loading}: HistoryProps) {
	if (loading) {
		return <Skeleton variant="rectangular" height={400}/>;
	}
	const standings = data?.team?.standings.nodes.map((s) => ({...s, name: data?.team.name})) || [];

	data?.team.antecedents.nodes.forEach(({antecedentTeam, startYear, endYear}) => {
		antecedentTeam.standings
		              .filter((s) => s.year && s.year >= (startYear ?? 0) && (!endYear || s.year <= endYear))
		              .forEach((s) => standings.push({...s, name: antecedentTeam.name}));
	});

	if (!standings.length) {
		return <Alert><AlertDescription>Career Data Not Available</AlertDescription></Alert>;
	}

	type Row = (typeof standings)[number];
	const numCell = (v: unknown) => <div className="text-center">{v as any}</div>;
	const numHeader = (label: string) => () => <div className="text-center w-full">{label}</div>;

	const charts: ChartSwitcherChart[] = [
		{
			id:    'position',
			label: 'Position',
			chart: <HistoryChart data={data} loading={loading} dataKey="positionNumber" dataMaxKey="maxPosition" invert min={1} max={20}/>
		},
		{
			id:    'points',
			label: 'Points',
			chart: <HistoryChart data={data} loading={loading} dataKey="points" dataMaxKey="maxPoints"/>
		}
	];

	const columns: ColumnDef<Row, any>[] = [
		{
			accessorKey: 'year',
			header:      numHeader('Season'),
			size:        100,
			cell:        ({row}) => <div className="text-center"><Link href={`/seasons/${row.original.year}`}>{row.original.year}</Link></div>
		},
		{
			accessorKey: 'name',
			header:      'Name'
		},
		{
			accessorKey: 'positionNumber',
			header:      numHeader('Position'),
			cell:        ({getValue}) => numCell(getValue())
		},
		{
			accessorKey: 'points',
			header:      numHeader('Points'),
			cell:        ({getValue}) => numCell(getValue())
		}
	];

	return (
		<>
			<ChartSwitcher title="Constructor Timeline" size={250} charts={charts}/>
			<DataTable<Row>
				rows={standings}
				columns={columns}
				autoHeight
				density="compact"
				getRowId={(r: Row) => `${r.year}-${r.name}` || ''}
				initialState={{
					sorting: {
						sortModel: [{field: 'year', sort: 'desc'}]
					}
				}}
			/>
		</>
	);
}
