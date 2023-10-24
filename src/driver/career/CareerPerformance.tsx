import {QueryResult} from '@apollo/client/react/types/types';
import {Paper} from '@mui/material';
import {blueGrey, deepPurple, green, red} from '@mui/material/colors';
import {ResponsivePie} from '@nivo/pie';
import {useDarkMode, useNivoTheme} from '../../ui-components';
import {DriverPageData} from '../types';

type Stats = {
	wins: number;
	podiums: number;
	inPoints: number;
	dnfs: number;
	appearances: number;
}

const usePerformanceData = (data?: DriverPageData): Stats | undefined => {
	const careerResults = data?.driver.results;
	
	if (!careerResults) {
		return undefined;
	}
	
	return {
		wins:        careerResults.filter(r => r.positionOrder === 1).length,
		podiums:     careerResults.filter(r => r.positionOrder <= 3).length,
		inPoints:    careerResults.filter(r => r.positionOrder <= 10).length,
		dnfs:        careerResults.filter(r => r.positionText !== String(r.positionOrder)).length,
		appearances: careerResults.length
	};
};

type CareerPerformanceProps = Pick<QueryResult<DriverPageData>, 'data' | 'loading'>;

export default function CareerPerformance({data}: CareerPerformanceProps) {
	const nivoTheme       = useNivoTheme();
	const summaryData     = usePerformanceData(data);
	const prefersDarkMode = useDarkMode();
	
	if (!summaryData) {
		return null;
	}
	
	const chartData = [
		{
			'id':    'wins',
			'label': `Wins: ${summaryData.wins}`,
			'value': summaryData.wins
		},
		{
			'id':    'podiums',
			'label': `Podiums: ${summaryData.podiums}`,
			'value': summaryData.podiums - summaryData.wins
		},
		{
			'id':    'inPoints',
			'label': `In Points: ${summaryData.inPoints}`,
			'value': summaryData.inPoints - summaryData.podiums
		},
		{
			'id':    'appearances',
			'label': `Appearances: ${summaryData.appearances}`,
			'value': summaryData.appearances - summaryData.inPoints - summaryData.dnfs
		},
		{
			'id':    'dnfs',
			'label': `DNFs: ${summaryData.dnfs}`,
			'value': summaryData.dnfs
		}
	];
	
	return (
		<Paper variant="outlined" sx={{height: 132, p: 1}} aria-hidden>
			<ResponsivePie
				enableArcLinkLabels={false}
				enableArcLabels={false}
				theme={nivoTheme}
				data={chartData}
				colors={[
					deepPurple[prefersDarkMode ? 200 : 600],
					green[prefersDarkMode ? 200 : 600],
					blueGrey[prefersDarkMode ? 200 : 600],
					blueGrey[prefersDarkMode ? 100 : 300],
					red[prefersDarkMode ? 200 : 600]
				]}
				innerRadius={.1}
				padAngle={3}
				cornerRadius={3}
				margin={{top: 0, right: 110, bottom: 0, left: 0}}
				legends={[
					{
						anchor:        'right',
						direction:     'column',
						justify:       false,
						translateX:    40,
						translateY:    0,
						itemsSpacing:  0,
						itemWidth:     50,
						itemHeight:    18,
						itemDirection: 'left-to-right',
						symbolSize:    10,
						symbolShape:   'circle'
					}
				]}
			/>
		</Paper>
	);
}