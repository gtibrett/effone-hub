import {mapConstructorsStandings} from '../API';
import DataTable from '../components/DataTable';

type DriversProps = {
	season?: string;
}

export default function Constructors({season = 'current'}: DriversProps) {
	const dataUrl = `http://ergast.com/api/f1/${season}/constructorStandings.json`;
	
	return (
		<DataTable
			dataUrl={dataUrl}
			mapper={mapConstructorsStandings}
			cacheFor={60 * 60 * 8}
			autoHeight
			density="compact"
			pageSize={10}
			columns={
				[
					{
						field: 'position',
						headerName: '#',
						headerAlign: 'center',
						type: 'number',
						align: 'center'
					},
					{
						field: 'code',
						headerName: 'Constructor',
						flex: 1,
						valueGetter: ({row}) => row.Constructor.name
					},
					{
						field: 'points',
						headerName: 'Points',
						type: 'number'
					}
				]
			}
		/>
	);
}