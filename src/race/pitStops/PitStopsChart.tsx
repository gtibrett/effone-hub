import {Box, Skeleton} from '@mui/material';
import {ResponsiveBar} from '@nivo/bar';
import {getColorByConstructorId} from '../../constructors';
import ByLine from '../../drivers/ByLine';
import {DriverId} from '../../drivers/DriverProvider';
import {Result} from '../../types/ergast';
import {getDateFromTimeString} from '../lapTimes/helpers';
import {PitStopTableRow} from './PitStops';
import PitStopTooltip from './PitStopTooltip';

type PitStopsChartProps = {
	pitStops: PitStopTableRow[] | undefined;
	maxStops: number;
	results: Result[];
}

export type PitStopSerie = {
	driverId: string;
	[stop: string]: number | string;
}

const getColorByDriverId = (driverId: DriverId, results: Result[]) => {
	const result = results.find(r => r.Driver?.driverId === driverId);
	if (driverId && result) {
		return getColorByConstructorId(result.Constructor?.constructorId);
	}
	
	return '#000';
};


export default function PitStopsChart({maxStops, pitStops, results}: PitStopsChartProps) {
	if (!pitStops) {
		return <Skeleton variant="rectangular" height={400}/>;
	}
	
	if (!pitStops.length) {
		return null;
	}
	
	const baseTime = Date.UTC(2022, 0, 1, 0, 0, 0, 0);
	const keys: string[]       = (new Array(maxStops).fill(null).map((v, i) => String(i + 1)));
	const data: PitStopSerie[] = pitStops.map(p => {
		const stop: PitStopSerie = {
			driverId: p.driverId || '',
			color: getColorByDriverId(String(p.driverId || ''), results)
		};
		
		p.stops.forEach(s => {
			stop[String(s.stop)]              = s.duration.length ? getDateFromTimeString(s.duration) - baseTime : 0;
			stop[`${String(s.stop)}-display`] = s.duration;
		});
		
		return stop;
	});
	
	console.log(keys, data);
	
	return (
		<Box height={150} aria-hidden marginBottom={2}>
			<ResponsiveBar
				indexBy="driverId"
				keys={keys}
				data={data}
				// groupMode="grouped"
				colors={({indexValue}) => {
					return getColorByDriverId(String(indexValue || ''), results);
				}}
				enableLabel={false}
				// enableGridX={false}
				enableGridY={false}
				padding={.1}
				innerPadding={1.5}
				tooltip={PitStopTooltip}
				margin={{bottom: 40}}
				axisBottom={{
					tickSize: 0,
					tickPadding: 5,
					tickRotation: 0,
					format: (v => {
						return <ByLine variant="code" id={v}/>;
					})
				}}
			/>
		</Box>
	);
}