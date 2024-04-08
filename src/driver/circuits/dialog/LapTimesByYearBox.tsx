import {QueryResult} from '@apollo/client/react/types/types';
import LapTimesByYearTooltip from '@effonehub/driver/circuits/dialog/LapTimesByYearTooltip';
import useGetTeamColorsByYear from '@effonehub/driver/circuits/dialog/useGetTeamColorsByYear';
import {getTimeStringFromDate} from '@effonehub/helpers';
import {NivoTooltipFactory, useNivoTheme} from '@effonehub/ui-components';
import {Alert, alpha, Card, Skeleton} from '@mui/material';
import {ResponsiveBoxPlot} from '@nivo/boxplot';
import {useMapLapTimeDataToSwarmChart} from './mapLapTimeDataToSwarmChart';
import {CircuitDialogData} from './types';

type LapTimesChartProps = Pick<QueryResult<CircuitDialogData>, 'data' | 'loading'>;

export default function LapTimesByYearBox({data}: LapTimesChartProps) {
	const nivoTheme                = useNivoTheme();
	const colorsByYear             = useGetTeamColorsByYear()(data?.driver.teamsByYear || []);
	const mapLapTimeDataToBoxChart = useMapLapTimeDataToSwarmChart();
	const getColorConfig           = ({group}: any) => colorsByYear[group];
	
	if (!data) {
		return <Skeleton variant="rectangular" height={400}/>;
	}
	
	const chartData = mapLapTimeDataToBoxChart(data);
	
	if (!chartData.length) {
		return <Alert variant="outlined" severity="info">Lap Time Data Not Available</Alert>;
	}
	
	return (
		<Card variant="outlined" sx={{height: '60vh', width: '100%'}} aria-hidden>
			<ResponsiveBoxPlot
				theme={nivoTheme}
				data={chartData}
				colors={({group}: any) => alpha(colorsByYear[group], .25)}
				groupBy="year"
				value="milliseconds"
				margin={{top: 16, right: 16, bottom: 40, left: 72}}
				axisTop={null}
				axisRight={null}
				axisBottom={{
					tickSize:     0,
					tickPadding:  10,
					tickRotation: 0
				}}
				axisLeft={{
					tickSize:     0,
					tickPadding:  10,
					tickRotation: 0,
					format:       (value: number) => {
						return getTimeStringFromDate(new Date(value));
					}
				}}
				borderWidth={1}
				borderColor={getColorConfig}
				medianWidth={3}
				medianColor={getColorConfig}
				whiskerWidth={1}
				whiskerEndSize={0.5}
				whiskerColor={getColorConfig}
				motionConfig="stiff"
				tooltip={NivoTooltipFactory(LapTimesByYearTooltip)}
			/>
		</Card>
	);
}