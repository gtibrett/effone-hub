import {ConstructorByLine, DriverByLine} from '@/components/app';
import {getPositionTextOutcome} from '@/helpers';
import {faSquare} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Race, RaceResult} from '@/gql/graphql';
import {Alert, Grid, Skeleton, Tooltip, Typography} from '@mui/material';
import {purple} from '@mui/material/colors';
import {visuallyHidden} from '@mui/utils';
import {DataGrid} from '@mui/x-data-grid';
import Podium from './Podium';
import PositionChange from './PositionChange';

export default function Results({results}: { results: Race['raceResults'] }) {
	const nodes = results?.nodes;

	if (!nodes) {
		return <Skeleton variant="rectangular" height={400}/>;
	}

	if (!nodes.length) {
		return <Alert variant="outlined" severity="info">Race Data Not Available</Alert>;
	}

	const rows = (nodes as Array<RaceResult | null>).filter((r): r is RaceResult => r != null).map((row: RaceResult) => ({
		...row,
		id: row.positionDisplayOrder
	}));
	
	return (
        <>
            <Grid container spacing={2} justifyContent="space-evenly" sx={{mb: 2}}>
				<Podium results={(nodes as Array<RaceResult | null>).filter((r): r is RaceResult => r != null)}/>
			</Grid>
            <DataGrid
				rows={rows}
				autoHeight
				density="compact"
				getRowId={r => r.driverId || 0}
				initialState={{
					sorting: {
						sortModel: [{field: 'positionDisplayOrder', sort: 'asc'}]
					}
				}}
				columns={
					[
						{
							field:       'positionDisplayOrder',
							headerName:  'P',
							width:       60,
							headerAlign: 'center',
							align:       'center',
							type:        'number'
						},
						{
							field:        'change',
							renderHeader: () => <Typography sx={visuallyHidden}>Position Changes</Typography>,
							renderCell:   ({row}) => (
								<PositionChange {...row}/>
							),
							valueGetter:  (value, row) => {
								const {gridPositionNumber, positionDisplayOrder} = row;
								if (!gridPositionNumber || !positionDisplayOrder) {
									return 0;
								}

								return Number(gridPositionNumber) - Number(positionDisplayOrder);
							},
							width:        60,
							headerAlign:  'center',
							align:        'center'
						},
						{
							field:      'Driver',
							headerName: 'Driver',
							flex:       1,
							renderCell: ({row}) => row.driverId ? <DriverByLine id={row.driverId}/> : '',
							minWidth:   200
						},
						{
							field:      'Constructor',
							headerName: 'Constructor',
							flex:       1,
							renderCell: ({row}) => row.teamId ? <ConstructorByLine id={row.teamId}/> : '',
							minWidth:   150
						},
						{
							field:       'points',
							headerName:  'Points',
							type:        'number',
							headerAlign: 'center',
							align:       'center'
						},
						{
							field:       'time',
							headerName:  'Time',
							sortable:    false,
							headerAlign: 'left',
							align:       'left',
							flex:        .5,
							renderCell:  ({row}) => {
								const time = row.time;
								return (
                                    <Grid container alignItems="center" justifyContent="space-between" flexWrap="nowrap" spacing={1}>
                                        <Grid>{time ? time : getPositionTextOutcome(row.positionText, row.reasonRetired)}</Grid>
                                        {row.fastestLap && (
											<Grid>
												<Tooltip title="Fastest Lap">
													<FontAwesomeIcon icon={faSquare} color={purple[400]}/>
												</Tooltip>
											</Grid>
										)}
                                    </Grid>
                                );
							},
							minWidth:    110
						}
					]
				}
			/>
        </>
    );
}