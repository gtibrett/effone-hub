import {mapDriversStandings} from '../API';
import DataTable from '../components/DataTable';

type DriversProps = {
	season?: string;
}

export default function Drivers({season = 'current'}: DriversProps) {
	const dataUrl = `http://ergast.com/api/f1/${season}/driverStandings.json`;
	
	return (
		<DataTable
			dataUrl={dataUrl}
			mapper={mapDriversStandings}
			cacheFor={60 * 60 * 8}
			autoHeight
			density="compact"
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
						headerName: 'Driver',
						flex: 1,
						valueGetter: ({row}) => (
							`${row.Driver.givenName} ${row.Driver.familyName}`
						)
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