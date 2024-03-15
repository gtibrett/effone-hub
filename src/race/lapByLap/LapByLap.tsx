import {Box, Skeleton} from '@mui/material';
import {ResponsiveBump} from '@nivo/bump';
import {NivoTooltip, useNivoTheme} from '@ui-components';
import {DriverId} from '../../driver';
import LapByLapTooltip from './LapByLapTooltip';
import useLapByLapChartData, {useLapByLapData} from './useLapByLapChartData';

export type LapByLapProps = {
	season: number;
	round: number;
}

type LapChartDatum = {
	x: number;
	y: number | null;
}

export type LapChartSeries = {
	id: number;
	color?: string;
	driverId: DriverId;
	name: string;
	position: number;
	data: LapChartDatum[];
}

const getTicks = (laps: number) => {
	const ticks = [1];
	for (let i = 1; i < laps; i++) {
		if (i % 10 === 0) {
			ticks.push(i);
		}
	}
	
	return [...ticks, laps];
};

function LapByLap({season, round}: LapByLapProps) {
	const nivoTheme            = useNivoTheme();
	const lapByLapData         = useLapByLapData(season, round);
	const data                 = useLapByLapChartData(lapByLapData);
	const {loading, totalLaps} = lapByLapData;
	const height               = data.length * 20;
	
	let content = <Skeleton variant="rectangular" sx={{width: '100%'}} height="100%"/>;
	if (!loading && lapByLapData.data?.length) {
		content = (
			<ResponsiveBump
				theme={nivoTheme}
				data={data.map(s => ({...s, id: String(s.id)}))}
				colors={({color}) => color || 'transparent'}
				lineWidth={4}
				activeLineWidth={6}
				inactiveLineWidth={3}
				inactiveOpacity={.25}
				pointSize={0}
				activePointSize={0}
				inactivePointSize={0}
				pointBorderWidth={0}
				activePointBorderWidth={0}
				startLabel={false}
				endLabel={({name}) => name}
				endLabelPadding={32}
				enableGridX={true}
				enableGridY={false}
				axisTop={null}
				axisRight={{
					tickSize:     2,
					tickPadding:  8,
					tickRotation: 0
				}}
				axisBottom={{
					tickSize:     0,
					tickPadding:  5,
					tickRotation: 0,
					tickValues:   getTicks(totalLaps || 0)
				}}
				axisLeft={null}
				margin={{top: 0, right: 120, bottom: 24, left: 24}}
				tooltip={NivoTooltip(LapByLapTooltip)}
			/>
		);
	}
	
	return (
		<Box sx={{height, width: '100%'}} aria-hidden>
			{content}
		</Box>
	);
}

export default LapByLap;