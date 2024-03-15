import {QueryResult} from '@apollo/client/react/types/types';
import {Alert, alpha, Box, darken, lighten, Skeleton, useTheme} from '@mui/material';
import {ResponsiveBoxPlot} from '@nivo/boxplot';
import {useGetAccessibleColor, useNivoTheme} from '@ui-components';
import {getTimeStringFromDate} from '../../../helpers';
import {mapLapTimeDataToBoxChart} from './mapLapTimeDataToSwarmChart';
import {CircuitDialogData} from './types';

type LapTimesChartProps = Pick<QueryResult<CircuitDialogData>, 'data' | 'loading'>;

const factor = .3;

const useTweakColor = () => {
	const getAccessibleColor = useGetAccessibleColor();
	const theme              = useTheme();
	
	return (color: string) => {
		const a11yColor = getAccessibleColor(color);
		return (theme.palette.mode === 'light') ? darken(a11yColor, factor) : lighten(a11yColor, factor);
	};
};

export default function LapTimesByYearBox({data}: LapTimesChartProps) {
	const theme      = useTheme();
	const nivoTheme  = useNivoTheme();
	const tweakColor = useTweakColor();
	
	const colorConfig = ({group}: any) => colorsByYear[group];
	
	if (!data) {
		return <Skeleton variant="rectangular" height={400}/>;
	}
	
	const chartData = mapLapTimeDataToBoxChart(data);
	
	if (!chartData.length) {
		return <Alert variant="outlined" severity="info">Lap Time Data Not Available</Alert>;
	}
	
	const colorsByYear: { [year: number]: string } = data.driver.teamsByYear
	                                                     .map(({year, team: {colors}}) => ({year, color: colors.primary || theme.palette.primary.main}))
	                                                     .reduce((colors, {year, color}) => ({...colors, [year]: tweakColor(color)}), {});
	
	
	return (
		<Box sx={{height: '60vh', width: '100%'}} aria-hidden>
			<ResponsiveBoxPlot
				theme={nivoTheme}
				data={chartData}
				colors={({group}: any) => alpha(colorsByYear[group], .25)}
				groupBy="year"
				value="milliseconds"
				margin={{top: 10, right: 10, bottom: 80, left: 60}}
				axisTop={null}
				axisRight={null}
				axisBottom={{
					tickSize:     10,
					tickPadding:  5,
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
				borderColor={colorConfig}
				medianWidth={3}
				medianColor={colorConfig}
				whiskerWidth={1}
				whiskerEndSize={0.5}
				whiskerColor={colorConfig}
				motionConfig="stiff"
			/>
		</Box>
	);
}