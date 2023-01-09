import {Typography} from '@mui/material';
import {visuallyHidden} from '@mui/utils';
import {GridCellParams, GridColDef} from '@mui/x-data-grid';
import {useEffect, useState} from 'react';
import Caxios from '../api/Caxios';
import {getAPIUrl, mapSchedule} from '../api/Ergast';
import {useAppState} from '../app/AppStateProvider';
import {getPositionTextOutcome} from '../helpers';
import PositionChange from '../race/PositionChange';
import {Race} from '../types/ergast';
import DataTable from '../ui-components/DataTable';
import Link from '../ui-components/Link';
import {DriverId} from './DriverProvider';
import SeasonChart from './SeasonChart';

const sx = {
	border: 0,
	overflow: 'auto',
	'& > .MuiDataGrid-main': {
		overflow: 'unset'
	},
	'& > div > .MuiDataGrid-footerContainer': {
		display: 'none'
	}
};

type SeasonProps = {
	driverId: DriverId;
}

export default function Season({driverId}: SeasonProps) {
	const [{season}]        = useAppState();
	const dataUrl           = getAPIUrl(`/${season}/drivers/${driverId}/results.json`);
	const [races, setRaces] = useState<Race[]>([]);
	
	useEffect(() => {
		Caxios.get(dataUrl)
		      .then(mapSchedule)
		      .then(races => setRaces(races));
	}, [setRaces]);
	
	return (
		<>
			<SeasonChart races={races}/>
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
							field: 'qualifying',
							headerName: 'Start',
							type: 'number',
							headerAlign: 'center',
							align: 'center',
							valueGetter: ({row}: GridCellParams<string, Race>) => {
								return Number(row.Results?.[0].grid);
							}
						},
						{
							field: 'result',
							headerName: 'Finish',
							type: 'number',
							headerAlign: 'center',
							align: 'center',
							valueGetter: ({row}: GridCellParams<string, Race>) => {
								return Number(row.Results?.[0].position);
							}
						},
						{
							field: 'change',
							renderHeader: () => <Typography sx={visuallyHidden}>Position Changes</Typography>,
							renderCell: ({row}) => {
								const {grid, position} = row.Results?.[0] || {};
								return <PositionChange grid={grid} position={position}/>;
							},
							valueGetter: ({row}) => {
								const {grid, position} = row.Results?.[0] || {};
								if (!grid || !position) {
									return 0;
								}
								
								return Number(grid) - Number(position);
							},
							width: 60,
							headerAlign: 'center',
							align: 'center'
						},
						{
							field: 'points',
							headerName: 'Points',
							type: 'number',
							headerAlign: 'center',
							align: 'center',
							valueGetter: ({row}: GridCellParams<string, Race>) => {
								return Number(row.Results?.[0].points);
							}
						},
						{
							field: 'time',
							headerName: 'Time',
							sortable: false,
							headerAlign: 'left',
							align: 'left',
							flex: .5,
							valueGetter: ({row}: GridCellParams<string, Race>) => {
								const time = row.Results?.[0].Time?.time;
								return time ? time : getPositionTextOutcome(row.Results?.[0].positionText, row.Results?.[0].status);
							}
						}
					] as GridColDef<Race>[]
				}
			/>
		</>
	);
}