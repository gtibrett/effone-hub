import {Alert, Skeleton} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useEffect, useMemo, useState} from 'react';
import Caxios from '../../api/Caxios';
import {getAPIUrl, mapPitStops} from '../../api/Ergast';
import ByLine from '../../drivers/ByLine';
import {DriverId} from '../../drivers/DriverProvider';
import {PitStop, Race, Responses, Result} from '../../types/ergast';
import PitStopsChart from './PitStopsChart';

type PitStopsProps = {
	season: string;
	round: Race['round'];
	results: Result[];
}

export type PitStopTableRow = {
	driverId: DriverId;
	stops: PitStop[];
}

const useTableData = (pitStops: PitStop[]) => {
	return useMemo(() => {
		const maxStops = Math.max(0, ...pitStops.map(p => Number(p.stop)));
		
		const data: PitStopTableRow[] = [];
		pitStops.forEach(p => {
			let index = data.findIndex(driver => driver.driverId === p.driverId);
			if (index === -1) {
				data.push({
					driverId: p.driverId,
					stops: []
				});
				index = data.length - 1;
			}
			
			data[index].stops.push(p);
		});
		
		return {data, maxStops};
	}, [pitStops]);
};

export default function PitStops({season, round, results}: PitStopsProps) {
	const [pitStops, setPitStops] = useState<PitStop[] | undefined>();
	const {data, maxStops}        = useTableData(pitStops || []);
	
	useEffect(() => {
		Caxios.get<Responses['ResultsByYearResponse']>(getAPIUrl(`/${season}/${round}/pitstops.json`), {params: {limit: 2000}})
		      .then(mapPitStops)
		      .then(data => {
			      setPitStops(data);
		      });
	}, [season, round]);
	
	if (!pitStops) {
		return <Skeleton variant="rectangular" height={400}/>;
	}
	
	if (!pitStops.length) {
		return <Alert variant="outlined" severity="info">Pit Stop Data Not Available</Alert>;
	}
	
	const columns: GridColDef<PitStopTableRow>[] = [
		{
			field: 'Driver',
			headerName: 'Driver',
			flex: 1,
			renderCell: ({row}) => <ByLine id={row.driverId}/>,
			minWidth: 200
		},
		{
			field: 'stop',
			headerName: 'Stops',
			flex: .5,
			headerAlign: 'center',
			align: 'center',
			type: 'number',
			valueGetter: ({row}) => row.stops.length
		},
		...(new Array(maxStops)).fill(null).map((v, i) => {
			return {
				field: `stop-${i}`,
				headerName: `Stop ${i+1}`,
				flex: .5,
				headerAlign: 'center',
				align: 'center',
				type: 'number',
				valueGetter: ({row}) => row.stops.find(r=>Number(r.stop) === i+1)?.duration || ''
			} as GridColDef<PitStopTableRow>;
		})
	];
	
	return (
		<>
			<PitStopsChart maxStops={maxStops} pitStops={data} results={results}/>
			<DataGrid
				pageSize={100}
				rows={data}
				getRowId={row => row.driverId || ''}
				autoHeight
				density="compact"
				columns={columns}
			/>
		</>
	);
}