import {NivoTooltipFactory, useNivoTheme} from '@effonehub/ui-components';
import {AxisProps} from '@nivo/axes';
import {Datum, Layer, LineProps, PointTooltip, ResponsiveLine, Serie} from '@nivo/line';
import BaseLineChartLayer from './BaseLineChartLayer';
import {mapLineSerieValues, maxValue} from './index';
import {DataWithTeamInfo, MutableSerie, MutableSerieDataKey} from './types';
import useSplitSeriesByTeam from './useSplitLineSeriesByTeam';

const useBaseProps = (tooltip: PointTooltip, baseLayer: Layer | undefined): Omit<LineProps, 'data'> => {
	const nivoTheme = useNivoTheme();
	
	const layers: Layer[] = [
		'grid',
		'markers',
		'axes',
		'areas',
		'crosshair',
		'lines',
		'points',
		'slices',
		'mesh',
		'legends'
	];
	
	if (baseLayer) {
		layers.splice(5, 0, baseLayer);
	}
	
	return {
		theme:       nivoTheme,
		colors:      (serie) => {
			return serie.color;
		},
		axisLeft:    null,
		axisTop:     null,
		enableGridX: false,
		enableGridY: false,
		lineWidth:   4,
		pointSize:   12,
		// @ts-ignore
		useMesh:       true,
		margin:        {top: 20, left: 28, right: 32, bottom: 40},
		tooltip:       NivoTooltipFactory(tooltip),
		crosshairType: 'x',
		layers
	};
};

export type LineChartByTeamProps = {
	xKey: MutableSerieDataKey;
	yKey: MutableSerieDataKey;
	data: DataWithTeamInfo[];
	tooltip: PointTooltip;
	axisBottomFormat?: AxisProps['format'];
	invert?: boolean;
	min?: number;
	max?: number;
	noBase?: boolean;
}

export default function LineChartByTeam({xKey, yKey, data, tooltip, axisBottomFormat, invert = false, min = 0, max = 0, noBase = false}: LineChartByTeamProps) {
	const splitSeriesByTeam       = useSplitSeriesByTeam();
	const [teamSeries, baseSerie] = splitSeriesByTeam(xKey, data);
	const baseProps               = useBaseProps(tooltip, !noBase ? BaseLineChartLayer(mapLineSerieValues(xKey, yKey)(baseSerie as Serie)) : undefined);
	const axisMax                 = Math.max(max, maxValue(baseSerie as MutableSerie, yKey));
	
	return (
		<ResponsiveLine
			{...baseProps}
			
			data={[
				...teamSeries.map(mapLineSerieValues(xKey, yKey))
			]}
			
			axisRight={{
				tickSize:     0,
				tickRotation: 0,
				tickValues:   invert ? [min, axisMax] : [axisMax, min]
			}}
			
			axisBottom={{
				tickSize:    0,
				tickPadding: 10,
				tickValues:  baseSerie.data.map((r: Datum) => r[xKey]),
				format:      axisBottomFormat
			}}
			
			yScale={{
				type: 'linear',
				min:  invert ? axisMax : min,
				max:  invert ? min : axisMax
			}}
		/>
	);
}