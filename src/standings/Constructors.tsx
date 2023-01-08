import {getAPIUrl, mapConstructorsStandings} from '../api/Ergast';
import {useAppState} from '../app/AppStateProvider';
import DataTable from '../ui-components/DataTable';

const sx = {
	border: 0,
	'& > div > .MuiDataGrid-footerContainer': {
		display: 'none'
	}
};

export default function Constructors() {
	const [{season}] = useAppState();
	const dataUrl    = getAPIUrl(`/${season}/constructorStandings.json`);
	
	return (
		<DataTable
			sx={sx}
			dataUrl={dataUrl}
			mapper={mapConstructorsStandings}
			cacheFor={60 * 60 * 8}
			autoHeight
			density="compact"
			pageSize={10}
			columns={
				[
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