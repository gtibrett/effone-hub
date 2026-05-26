import {usePerformanceData} from '@/components/page/driver';
import {useNivoTheme} from '@/components/ui/nivo';
import type {SimpleApolloResult} from '@/app/lib/apollo-types';
import {useComponentDimensionsWithRef} from '@gtibrett/mui-additions';
import {Paper, useTheme} from '@mui/material';
import {ResponsiveRadar} from '@nivo/radar';
import {CircuitDialogData} from './types';

type CircuitPerformanceProps = SimpleApolloResult<CircuitDialogData>;

export default function CircuitPerformance({data, loading}: CircuitPerformanceProps) {
	const theme                      = useTheme();
	const nivoTheme                  = useNivoTheme();
	const {ref, dimensions: {width}} = useComponentDimensionsWithRef();
	const rawResults                 = data?.circuit.races?.nodes?.flatMap(r => r.results);
	const circuitResults             = rawResults?.filter(Boolean).map(r => ({
		positionOrder: r.positionDisplayOrder ?? undefined,
		positionText:  r.positionText ?? undefined
	})) as any;
	const performanceData            = usePerformanceData(circuitResults);

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

	const color = theme.palette.primary.main;

	return (
		<Paper variant="outlined" ref={ref} className="p-0" style={{height: width, width}}>
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
			/>
		</Paper>
	);
}
