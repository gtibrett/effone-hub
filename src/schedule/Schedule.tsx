import {GridCellParams, GridColDef} from '@mui/x-data-grid';
import {useEffect, useState} from 'react';
import Caxios from '../api/Caxios';
import {getAPIUrl, mapSchedule} from '../api/Ergast';
import {useAppState} from '../app/AppStateProvider';
import {Race} from '../types/ergast';
import DataTable from '../ui-components/DataTable';
import Link from '../ui-components/Link';
import RaceMap from './RaceMap';

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
	const [{season}]        = useAppState();
	const dataUrl           = getAPIUrl(`/${season}.json`);
	const [races, setRaces] = useState<Race[]>([]);
	
	useEffect(() => {
		Caxios.get(dataUrl)
		      .then(mapSchedule)
		      .then(races => setRaces(races));
	}, [setRaces]);
	
	
	return (
		<>
			<RaceMap season={season} races={races}/>
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
							align: 'center',
							renderCell: ({value}) => (new Date(value)).toLocaleDateString()
						},
						{
							field: 'raceName',
							headerName: 'Race',
							flex: 1,
							renderCell: ({row, value}) => (
								<Link to={`/race/${season}/${row.round}#${row.raceName}`}>{value}</Link>
							)
						},
						{
							field: 'location',
							headerName: 'Location',
							type: 'string',
							flex: .5,
							renderCell: ({row}: GridCellParams<string, Race>) => {
								const locality = row.Circuit?.Location?.locality;
								const country  = row.Circuit?.Location?.country;
								
								return `${locality}, ${country}`;
							}
						}
					] as GridColDef<Race>[]
				}
			/>
		</>
	);
}