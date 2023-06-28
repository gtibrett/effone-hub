import {faSquare} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Circuit, Race, Responses, Result} from '@gtibrett/effone-hub-api';
import {Alert, Grid, Skeleton, Tooltip, Typography} from '@mui/material';
import {purple} from '@mui/material/colors';
import {visuallyHidden} from '@mui/utils';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useEffect, useState} from 'react';
import Caxios from '../api/Caxios';
import {getAPIUrl, mapRace, mapSchedule} from '../api/Ergast';
import {useAppState} from '../app/AppStateProvider';
import ConstructorByLine from '../constructors/ByLine';
import ByLine from '../drivers/ByLine';
import {getPositionTextOutcome} from '../helpers';
import PositionChange from '../race/PositionChange';
import NextRaceCountdown from '../schedule/NextRaceCountdown';

export default function Season({circuitId}: { circuitId: Circuit['circuitId'] }) {
	const [{season}]            = useAppState();
	const [results, setResults] = useState<Result[] | undefined>();
	const [race, setRace]       = useState<Race | undefined>();
	
	useEffect(() => {
		Caxios.get<Responses.ResultsResponse>(getAPIUrl(`/${season}/circuits/${circuitId}/results.json`), {params: {limit: 2000}})
		      .then(mapRace)
		      .then(data => {
			      setResults(data?.Results);
		      })
		      .catch(() => setResults([]));
	}, [season, circuitId]);
	
	useEffect(() => {
		Caxios.get<Responses.RacesResponse>(getAPIUrl(`/${season}/circuits/${circuitId}/races.json`), {params: {limit: 2000}})
		      .then(mapSchedule)
		      .then(data => {
			      setRace(data[0]);
		      });
	}, [season, circuitId]);
	
	if (!results) {
		return <Skeleton variant="rectangular" height={400}/>;
	}
	
	if (!results.length) {
		if (race) {
			return <>
				<Typography variant="h5">Countdown</Typography>
				<NextRaceCountdown race={race}/>
			</>;
		}
		
		return <Alert variant="outlined" severity="info">Race Data Not Available</Alert>;
	}
	
	const rows = results.map(row => ({
		...row,
		id: row.position
	}));
	
	return (
		<DataGrid
			rows={rows}
			autoHeight
			density="compact"
			getRowId={r => r.Driver.driverId}
			initialState={{
				sorting: {
					sortModel: [{field: 'position', sort: 'asc'}]
				}
			}}
			columns={
				[
					{
						field:       'position',
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
						valueGetter:  ({row}) => {
							const {grid, position} = row;
							if (!grid || !position) {
								return 0;
							}
							
							return Number(grid) - Number(position);
						},
						width:        60,
						headerAlign:  'center',
						align:        'center'
					},
					{
						field:      'Driver',
						headerName: 'Driver',
						flex:       1,
						renderCell: ({row}) => row.Driver ? <ByLine id={row.Driver.driverId}/> : '',
						minWidth:   200
					},
					{
						field:      'Constructor',
						headerName: 'Constructor',
						flex:       1,
						renderCell: ({row}) => row.Constructor ? <ConstructorByLine id={row.Constructor.constructorId}/> : '',
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
							const time = row.Time?.time;
							return (
								<Grid container alignItems="center" justifyContent="space-between" flexWrap="nowrap" spacing={1}>
									{row.FastestLap?.rank === '1' && (
										<Grid item>
											<Tooltip title="Fastest Lap">
												<FontAwesomeIcon icon={faSquare} color={purple[400]}/>
											</Tooltip>
										</Grid>
									)}
									<Grid item>{time ? time : getPositionTextOutcome(row.positionText, row.status)}</Grid>
								</Grid>
							);
						},
						minWidth:    110
					}
				] as GridColDef<Result>[]
			}
		/>
	);
}