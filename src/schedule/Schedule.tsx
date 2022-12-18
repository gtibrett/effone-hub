import {mapSchedule} from '../API';
import {useAppState} from '../app/AppStateProvider';
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

export default function Schedule() {
	const [{season}] = useAppState();
	const dataUrl    = `http://ergast.com/api/f1/${season}.json`;
	
	return (
		<DataTable
			sx={sx}
			dataUrl={dataUrl}
			mapper={mapSchedule}
			// cacheFor={60 * 60 * 8}
			autoHeight
			density="compact"
			getRowId={(row) => row.round}
			columns={
				[
					{
						field: 'date',
						headerName: 'Date',
						headerAlign: 'center',
						type: 'date',
						align: 'center'
					},
					{
						field: 'raceName',
						headerName: 'Race',
						flex: 1
					}
				]
			}
		/>
	);
}