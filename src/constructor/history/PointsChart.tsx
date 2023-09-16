import {Box} from '@mui/material';
import {ResponsiveLine, Serie as LineSerie} from '@nivo/line';
import {NivoTooltip, useNivoTheme} from '../../ui-components';
import {HistoryProps} from '../History';
import HistoryTooltip from './HistoryTooltip';
import useHistoryChartData, {getChartDataByAttribute, useHistoryChartColors} from './useHistoryChartData';

export default function PointsChart({data, loading}: HistoryProps) {
	const nivoTheme        = useNivoTheme();
	const historyChartData = useHistoryChartData(data);
	const chartColors      = useHistoryChartColors(historyChartData);
	
	if (!historyChartData || !data || loading) {
		return null;
	}
	
	const {minYear, maxYear, maxPoints} = historyChartData;
	const series: LineSerie[]           = getChartDataByAttribute('points', historyChartData);
	
	return (
		<Box sx={{height: 100, width: '100%'}} aria-hidden>
			<ResponsiveLine
				theme={nivoTheme}
				data={series}
				colors={chartColors}
				yScale={{
					type: 'linear',
					min:  0,
					max:  maxPoints
				}}
				xScale={{
					type: 'linear',
					min:  minYear,
					max:  maxYear
				}}
				axisLeft={{
					legend:       'Points',
					legendOffset: -14,
					tickSize:     0,
					tickValues: []
				}}
				axisRight={{
					tickSize:     0,
					tickValues: [0, maxPoints]
				}}
				axisTop={null}
				axisBottom={null}
				enableGridX={false}
				gridYValues={6}
				margin={{top: 25, left: 20, right: 28, bottom: 8}}
				useMesh={true}
				crosshairType="x"
				tooltip={NivoTooltip(HistoryTooltip)}
			/>
		</Box>
	);
}