import { AxisProps } from '@nivo/axes';
import {
	LineSeries,
	LineSvgLayer,
	LineSvgProps,
	PointTooltipComponent,
	ResponsiveLine
} from '@nivo/line';

import { NivoTooltipFactory, RequiredByPropTypes, useNivoTheme } from '@/components/ui/nivo';

import BaseLineChartLayer from './BaseLineChartLayer';
import { mapLineSerieValues, maxValue } from './index';
import { DataWithTeamInfo, Datum, MutableSerie, MutableSerieDataKey, Serie } from './types';
import useSplitSeriesByTeam from './useSplitLineSeriesByTeam';

// nivo line types are generic now; team series carries the `color` the `colors` accessor reads
type TeamLineSeries = LineSeries & { color: string };

const useBaseProps = (
	tooltip: PointTooltipComponent<LineSeries>,
	baseLayer: LineSvgLayer<TeamLineSeries> | undefined
): Omit<LineSvgProps<TeamLineSeries>, 'data' | 'width' | 'height'> => {
	const nivoTheme = useNivoTheme();

	const layers: LineSvgLayer<TeamLineSeries>[] = [
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
		theme: nivoTheme,
		colors: serie => serie.color,
		axisLeft: null,
		axisTop: null,
		enableGridX: false,
		enableGridY: false,
		lineWidth: 4,
		pointSize: 12,
		pointColor: d => d.series.color,
		useMesh: true,
		margin: { top: 20, left: 28, right: 32, bottom: 40 },
		tooltip: NivoTooltipFactory(tooltip),
		crosshairType: 'x',
		layers
	};
};

export type LineChartByTeamProps = {
	xKey: MutableSerieDataKey;
	yKey: MutableSerieDataKey;
	data: DataWithTeamInfo[];
	tooltip: PointTooltipComponent<LineSeries>;
	axisBottomFormat?: AxisProps['format'];
	invert?: boolean;
	min?: number;
	max?: number;
	noBase?: boolean;
};

export default function LineChartByTeam({
	xKey,
	yKey,
	data,
	tooltip,
	axisBottomFormat,
	invert = false,
	min = 0,
	max = 0,
	noBase = false
}: LineChartByTeamProps) {
	const splitSeriesByTeam = useSplitSeriesByTeam();
	const [teamSeries, baseSerie] = splitSeriesByTeam(xKey, data);
	const baseProps = useBaseProps(
		tooltip,
		!noBase
			? (BaseLineChartLayer(
					mapLineSerieValues(xKey, yKey)(baseSerie as Serie)
				) as unknown as LineSvgLayer<TeamLineSeries>)
			: undefined
	);
	const axisMax = Math.max(max, maxValue(baseSerie as MutableSerie, yKey));

	return (
		<ResponsiveLine
			{...(RequiredByPropTypes.Line as Partial<LineSvgProps<TeamLineSeries>>)}
			{...baseProps}
			data={
				[...teamSeries.map(mapLineSerieValues(xKey, yKey))] as unknown as TeamLineSeries[]
			}
			axisRight={{
				tickSize: 0,
				tickRotation: 0,
				tickValues: invert ? [min, axisMax] : [axisMax, min]
			}}
			axisBottom={{
				tickSize: 0,
				tickPadding: 10,
				tickValues: baseSerie.data.map((r: Datum) => r[xKey]),
				format: axisBottomFormat
			}}
			yScale={{
				type: 'linear',
				min: invert ? axisMax : min,
				max: invert ? min : axisMax
			}}
		/>
	);
}
