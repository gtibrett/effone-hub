import {usePerformanceData} from '@/components/page/driver';
import {useNivoTheme} from '@/components/ui/nivo';
import {useGetAccessibleColor} from '@/hooks';
import {QueryResult} from '@apollo/client/react/types/types';
import {useComponentDimensionsWithRef} from '@gtibrett/mui-additions';
import {Paper, useTheme} from '@mui/material';
import {ResponsiveRadar} from '@nivo/radar';
import {CircuitDialogData} from './types';

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
			value:  performanceData.DNFs
		}
	];
	
	const color = getAccessibleColor(theme.palette.primary.main);
	
	return (
		<Paper variant="outlined" ref={ref} sx={{height: width, width, p: 0}}>
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