import {QueryResult} from '@apollo/client/react/types/types';
import {Link} from '@gtibrett/mui-additions';
import {Alert, Skeleton, Typography} from '@mui/material';
import {visuallyHidden} from '@mui/utils';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useAppState} from '../../app/AppStateProvider';
import {Race, Result} from '@gtibrett/effone-hub-graph-api';
import {getPositionTextOutcome, getTimeStringFromDate} from '../../helpers';
import PositionChange from '../../race/PositionChange';
import {DriverPageData} from '../types';
import SeasonChart from './SeasonChart';

const findResult = (results: Result[], race: Race) => results.find(result => result.raceId === race.raceId);

type SeasonProps = Pick<QueryResult<DriverPageData>, 'data' | 'loading'>;

export default function Season({data, loading}: SeasonProps) {
	const [{currentSeason}] = useAppState();
	
	if (loading || !data?.races) {
		return <Skeleton variant="rectangular" height={400}/>;
	}
	
	if (!data.races.length) {
		return <Alert variant="outlined" severity="info">Season Data Not Available</Alert>;
	}
	
	const {races} = data;
	
	return (
		<>
			<SeasonChart data={data} loading={loading}/>
			<DataGrid
				rows={races}
				autoHeight
				density="compact"
				getRowId={(row) => row.round || ''}
				initialState={{
					sorting: {
						sortModel: [{field: 'date', sort: 'asc'}]
					}
				}}
				columns={
					[
						{
							field:       'date',
							headerName:  'Date',
							headerAlign: 'center',
							type:        'date',
							align:       'center',
							valueGetter: ({value}) => (new Date(value)),
							renderCell:  ({value}) => value.toLocaleDateString(),
							minWidth:    100
						},
						{
							field:      'name',
							headerName: 'Race',
							flex:       1,
							renderCell: ({row, value}) => (
								<Link to={`/${currentSeason}/${row.round}#${row.name}`}>{value}</Link>
							),
							minWidth:   200
						},
						{
							field:       'grid',
							headerName:  'Start',
							type:        'number',
							headerAlign: 'center',
							align:       'center',
							valueGetter: ({row}) => {
								return findResult(data?.driver.results, row)?.grid;
							}
						},
						{
							field:       'result',
							headerName:  'Finish',
							type:        'number',
							headerAlign: 'center',
							align:       'center',
							valueGetter: ({row}) => {
								return findResult(data?.driver.results, row)?.positionOrder;
							}
						},
						{
							field:        'change',
							renderHeader: () => <Typography sx={visuallyHidden}>Position Changes</Typography>,
							renderCell:   ({row}) => {
								const result = findResult(data?.driver.results, row);
								if (result) {
									const {grid, positionOrder} = result;
									return <PositionChange grid={grid} position={positionOrder}/>;
								}
								return '';
							},
							valueGetter:  ({row}) => {
								const {grid, positionOrder} = findResult(data?.driver.results, row) || {};
								if (!grid || !positionOrder) {
									return 0;
								}
								
								return grid - positionOrder;
							},
							width:        60,
							headerAlign:  'center',
							align:        'center'
						},
						{
							field:       'points',
							headerName:  'Points',
							type:        'number',
							headerAlign: 'center',
							align:       'center',
							valueGetter: ({row}) => {
								return findResult(data?.driver.results, row)?.points;
							}
						},
						{
							field:       'time',
							headerName:  'Time',
							sortable:    false,
							headerAlign: 'left',
							align:       'left',
							flex:        .5,
							valueGetter: ({row}) => {
								const result = findResult(data?.driver.results, row);
								if (result) {
									const time = result.milliseconds;
									return time ? getTimeStringFromDate(new Date(time)) : getPositionTextOutcome(result.positionText, result.status.status);
								}
								return '';
							}
						}
					] as GridColDef<Race>[]
				}
			/>
		</>
	);
}