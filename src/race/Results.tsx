import {faArrowDown, faArrowUp, faSquare} from '@fortawesome/pro-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Typography} from '@mui/material';
import {green, purple, red} from '@mui/material/colors';
import {visuallyHidden} from '@mui/utils';
import {DataGrid} from '@mui/x-data-grid';
import ByLine from '../drivers/ByLine';
import ConstructorByLine from '../constructors/ByLine';
import {Race, Result} from '../types/ergast';
import PositionChange from './PositionChange';

const sx = {
	border: 0,
	'& > div > .MuiDataGrid-footerContainer': {
		display: 'none'
	}
};

export default function Results({results}: { results: Race['Results'] }) {
	if (!results) {
		return null;
	}
	
	const rows = results.map(row => ({
		...row,
		id: row.position
	}));
	
	return (
		<DataGrid
			sx={sx}
			rows={rows}
			autoHeight
			density="compact"
			columns={
				[
					{
						field: 'position',
						headerName: 'P',
						width: 60,
						headerAlign: 'center',
						align: 'center',
						type: 'number'
					},
					{
						field: 'change',
						renderHeader: () => <Typography sx={visuallyHidden}>Position Changes</Typography>,
						renderCell: ({row}) => (
							<PositionChange {...row}/>
						),
						valueGetter: ({row}) => {
							const {grid, position} = row;
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
						field: 'Driver',
						headerName: 'Driver',
						flex: 1,
						renderCell: ({row}) => row.Driver ? <ByLine id={row.Driver.driverId}/> : ''
					},
					{
						field: 'Constructor',
						headerName: 'Constructor',
						flex: 1,
						renderCell: ({row}) => row.Constructor ? <ConstructorByLine id={row.Constructor.constructorId}/> : ''
					},
					{
						field: 'points',
						headerName: 'Points',
						type: 'number',
						headerAlign: 'center',
						align: 'center'
					},
					{
						field: 'fastest',
						renderHeader: () => <Typography sx={visuallyHidden}>Fastest Lap</Typography>,
						headerAlign: 'center',
						align: 'center',
						renderCell: ({row}) => row.FastestLap?.rank === '1' ? <FontAwesomeIcon icon={faSquare} color={purple[400]} title="Fastest Lap"/> : '',
						valueGetter: ({row}) => row.FastestLap?.rank === '1' ? 'A' : 'Z'
					}
				]
			}
		/>
	);
}