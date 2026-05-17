import {DriverByLine} from '@/components/app';
import type {SimpleApolloResult} from '@/app/lib/apollo-types';
import {SeasonDriverStanding} from '@/gql/graphql';
import {Alert, AlertDescription} from '@/components/ui/shadcn/alert';
import {DataTable, Link, Skeleton} from '@/components/ui';

import type {ColumnDef} from '@tanstack/react-table';
import {ConstructorPageData, DriverByYear} from './types';

type DriversProps = SimpleApolloResult<ConstructorPageData>;

type RowData = {
	year: DriverByYear['year'];
	drivers: DriverByYear['driver'][]
}

const findFinalStandings = (year: number, standings: SeasonDriverStanding[]) => {
	return standings.filter((s) => s.year === year)[0];
};

export default function Drivers({data, loading}: DriversProps) {
	if (loading) {
		return <Skeleton variant="rectangular" className="h-[400px]"/>;
	}
	const years: RowData[] = [];

	(data?.team.drivers.nodes || []).forEach((dy) => {
		let index = years.findIndex((y) => y.year === dy.year);

		if (index === -1) {
			years.push({
				year:    dy.year,
				drivers: []
			});

			index = years.length - 1;
		}

		years[index].drivers.push(dy.driver);
	});

	if (!years.length) {
		return <Alert><AlertDescription>Career Data Not Available</AlertDescription></Alert>;
	}

	const numCell = (v: unknown) => <div className="text-center">{v as any}</div>;
	const numHeader = (label: string) => () => <div className="text-center w-full">{label}</div>;

	const columns: ColumnDef<RowData, any>[] = [
		{
			accessorKey: 'year',
			header:      numHeader('Season'),
			size:        100,
			cell:        ({row}) => <div className="text-center"><Link href={`/seasons/${row.original.year}`}>{row.original.year}</Link></div>
		},
		{
			id:     'driver1',
			header: 'Driver',
			cell:   ({row}) => row.original.drivers[0] ? <DriverByLine id={row.original.drivers[0].id} variant="full"/> : ''
		},
		{
			id:     'standing1',
			header: numHeader('Standing'),
			cell:   ({row}) => numCell(row.original.drivers[0] ? findFinalStandings(row.original.year, row.original.drivers[0].seasonDriverStandings?.nodes?.filter((s: any): s is SeasonDriverStanding => s != null))?.positionNumber : '')
		},
		{
			id:     'points1',
			header: numHeader('Points'),
			cell:   ({row}) => numCell(row.original.drivers[0] ? findFinalStandings(row.original.year, row.original.drivers[0].seasonDriverStandings?.nodes?.filter((s: any): s is SeasonDriverStanding => s != null))?.points : '')
		},
		{
			id:     'driver2',
			header: 'Driver',
			cell:   ({row}) => row.original.drivers[1] ? <DriverByLine id={row.original.drivers[1].id} variant="full"/> : ''
		},
		{
			id:     'standing2',
			header: numHeader('Standing'),
			cell:   ({row}) => numCell(row.original.drivers[1] ? findFinalStandings(row.original.year, row.original.drivers[1].seasonDriverStandings?.nodes?.filter((s: any): s is SeasonDriverStanding => s != null))?.positionNumber : '')
		},
		{
			id:     'points2',
			header: numHeader('Points'),
			cell:   ({row}) => numCell(row.original.drivers[1] ? findFinalStandings(row.original.year, row.original.drivers[1].seasonDriverStandings?.nodes?.filter((s: any): s is SeasonDriverStanding => s != null))?.points : '')
		}
	];

	return (
		<DataTable<RowData>
			rows={years}
			columns={columns}
			autoHeight
			density="compact"
			getRowId={(r: RowData) => r.year}
			initialState={{
				sorting: {
					sortModel: [{field: 'year', sort: 'desc'}]
				}
			}}
		/>
	);
}
