import {Box} from '@mui/material';
import {ResponsiveLine, Serie as LineSerie} from '@nivo/line';
import {NivoTooltip, useNivoTheme} from '../../ui-components';
import {HistoryProps} from '../History';
import HistoryTooltip from './HistoryTooltip';
import useHistoryChartData, {getChartDataByAttribute, useHistoryChartColors} from './useHistoryChartData';

export default function WinsChart({data, loading}: HistoryProps) {
	const nivoTheme        = useNivoTheme();
	const historyChartData = useHistoryChartData(data);
	const chartColors      = useHistoryChartColors(historyChartData);
	
	if (!historyChartData || !data || loading) {
		return null;
	}
	
	const {minYear, maxYear, maxWins} = historyChartData;
	const series: LineSerie[]         = getChartDataByAttribute('wins', historyChartData);
	
	return (
		<Box sx={{height: 128, width: '100%'}} aria-hidden>
			<ResponsiveLine
				theme={nivoTheme}
				data={series}
				colors={chartColors}
				yScale={{
					type: 'linear',
					min:  0,
					max:  maxWins
				}}
				xScale={{
					type: 'linear',
					min:  minYear,
					max:  maxYear
				}}
				axisLeft={{
					legend:       'Wins',
					legendOffset: -14,
					tickSize:     0,
					tickValues: []
				}}
				axisRight={{
					tickSize:     0,
					tickValues: [0, maxWins]
				}}
				axisTop={null}
				axisBottom={null}
				enableGridX={false}
				gridYValues={6}
				margin={{top: 25, left: 20, right: 28, bottom: 36}}
				useMesh={true}
				crosshairType="x"
				legends={[
					{
						anchor:        'bottom',
						direction:     'row',
						justify:       false,
						translateX:    0,
						translateY:    32,
						itemsSpacing:  0,
						itemDirection: 'left-to-right',
						itemWidth:     100,
						itemHeight:    20,
						itemOpacity:   0.75,
						symbolSize:    10,
						symbolShape:   'circle'
					}
				]}
				tooltip={NivoTooltip(HistoryTooltip)}
			/>
		</Box>
	);
}