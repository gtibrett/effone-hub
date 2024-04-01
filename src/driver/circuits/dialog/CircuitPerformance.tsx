import {QueryResult} from '@apollo/client/react/types/types';
import {useGetAccessibleColor, useNivoTheme} from '@effonehub/ui-components';
import {Result} from '@gtibrett/effone-hub-graph-api';
import {useComponentDimensionsWithRef} from '@gtibrett/mui-additions';
import {Paper, useTheme} from '@mui/material';
import {ResponsiveRadar} from '@nivo/radar';
import {CircuitDialogData} from './types';

type Stats = {
	wins: number;
	podiums: number;
	inPoints: number;
	appearances: number;
	dnfs: number;
}

const usePerformanceData = (circuitResults: Result[] = []): Stats | undefined => {
	if (!circuitResults.length) {
		return undefined;
	}
	
	return {
		wins:        circuitResults.filter(r => r.positionOrder === 1).length,
		podiums:     circuitResults.filter(r => r.positionOrder <= 3).length,
		inPoints:    circuitResults.filter(r => r.positionOrder <= 10).length,
		dnfs:        circuitResults.filter(r => r.position === null).length,
		appearances: circuitResults.length
	};
};

type CircuitPerformanceProps = Pick<QueryResult<CircuitDialogData>, 'data' | 'loading'>;

export default function CircuitPerformance({data, loading}: CircuitPerformanceProps) {
	const theme                      = useTheme();
	const nivoTheme                  = useNivoTheme();
	const {ref, dimensions: {width}} = useComponentDimensionsWithRef();
	const circuitResults             = data?.circuit.races.flatMap(r => r.results);
	const performanceData            = usePerformanceData(circuitResults);
	const getAccessibleColor         = useGetAccessibleColor();
	
	if (!performanceData || loading) {
		return null;
	}
	
	const chartData = [
		{
			'stat':  'Wins',
			'value': performanceData.wins
		},
		{
			'stat':  'Podiums',
			'value': performanceData.podiums
		},
		{
			'stat':  'In Points',
			'value': performanceData.inPoints
		},
		{
			'stat': 'DNFs',
			value:  performanceData.dnfs
		}
	];
	
	const color = getAccessibleColor(theme.palette.primary.main);
	
	return (
		<Paper variant="outlined" ref={ref} sx={{height: width, p: 0}}>
			<ResponsiveRadar
				theme={nivoTheme}
				data={chartData}
				keys={['value']}
				maxValue={performanceData.appearances}
				indexBy="stat"
				valueFormat=">-,.2"
				margin={{top: 10, right: 60, bottom: 10, left: 60}}
				borderColor={{from: 'color'}}
				borderWidth={1}
				dotSize={6}
				dotColor={{from: 'color'}}
				gridLevels={3}
				gridLabelOffset={8}
				colors={[color]}
				blendMode="normal"
				fillOpacity={.5}
				animate={false}
			/>
		</Paper>
	);
}