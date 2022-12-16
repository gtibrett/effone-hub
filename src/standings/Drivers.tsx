import {mapDriversStandings} from '../API';
import DataTable from '../components/DataTable';
import ByLine from '../drivers/ByLine';

type DriversProps = {
	season?: string;
}

const sx = {
	border: 0,
	'& > div > .MuiDataGrid-footerContainer': {
		display: 'none'
	}
};

export default function Drivers({season = 'current'}: DriversProps) {
	const dataUrl = `http://ergast.com/api/f1/${season}/driverStandings.json`;
	
	return (
		<DataTable
			sx={sx}
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
						align: 'center',
						width: 16,
						renderCell: ({row}) => row.Driver.permanentNumber
					},
					{
						field: 'code',
						headerName: 'Driver',
						flex: 1,
						renderCell: ({row}) => <ByLine driver={row.Driver}/>
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