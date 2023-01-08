import {getAPIUrl, mapQualifying} from '../api/Ergast';
import ByLine from '../drivers/ByLine';
import DataTable from '../ui-components/DataTable';

const sx = {
	border: 0,
	'& > div > .MuiDataGrid-footerContainer': {
		display: 'none'
	}
};

type QualifyingProps = {
	season: string;
	round: string;
}

export default function Qualifying({season, round}: QualifyingProps) {
	const dataUrl = getAPIUrl(`/${season}/${round}/qualifying.json`);
	
	return (
		<DataTable
			sx={sx}
			dataUrl={dataUrl}
			mapper={mapQualifying}
			autoHeight
			density="compact"
			columns={
				[
					{
						field: 'position',
						headerName: 'P'
					},
					{
						field: 'Driver',
						headerName: 'Driver',
						flex: 1,
						renderCell: ({row}) => row.Driver ? <ByLine id={row.Driver.driverId}/> : ''
					},
					{
						field: 'Constructor',
						headerName: 'Constructor',
						flex: 1,
						valueGetter: ({row}) => row.Constructor?.name
					},
					{
						field: 'Q1',
						headerName: 'Q1',
						type: 'string'
					},
					{
						field: 'Q2',
						headerName: 'Q2',
						type: 'string'
					},
					{
						field: 'Q3',
						headerName: 'Q3',
						type: 'string'
					}
				]
			}
		/>
	);
}