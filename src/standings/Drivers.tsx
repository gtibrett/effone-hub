import {getAPIUrl, mapDriversStandings} from '../api/Ergast';
import {useAppState} from '../app/AppStateProvider';
import ByLine from '../drivers/ByLine';
import DataTable from '../ui-components/DataTable';

const sx = {
	border: 0,
	overflow: 'auto',
	maxHeight: 398,
	'& > .MuiDataGrid-main': {
		overflow: 'unset'
	},
	'& > div > .MuiDataGrid-footerContainer': {
		display: 'none'
	}
};

export default function Drivers() {
	const [{season}] = useAppState();
	const dataUrl    = getAPIUrl(`/${season}/driverStandings.json`);
	
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
						renderCell: ({row}) => <ByLine id={row.Driver.driverId} avatarProps={{size: 24}} flagProps={{size: 16}}/>
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