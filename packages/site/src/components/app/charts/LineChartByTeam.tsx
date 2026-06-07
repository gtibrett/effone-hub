'use client';

import { type ComponentType, type ReactNode, useMemo } from 'react';
import { Box } from '@mui/material';
import type { LineSeriesType } from '@mui/x-charts';
import {
	ChartsAxisHighlight,
	ChartsClipPath,
	ChartsDataProvider,
	ChartsGrid,
	ChartsLegend,
	ChartsSurface,
	ChartsTooltipContainer,
	ChartsXAxis,
	ChartsYAxis
} from '@mui/x-charts';
import { ChartsOverlay } from '@mui/x-charts/ChartsOverlay';
import { useItemTooltip } from '@mui/x-charts/ChartsTooltip';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';

import { ChartsTooltipBody, useChartsTheme } from '@/components/ui/charts';

import BaseLineChartLayer from './BaseLineChartLayer';
import { mapLineSerieValues, maxValue } from './index';
import type { DataWithTeamInfo, Datum, MutableSerie, MutableSerieDataKey, Serie } from './types';
import useSplitSeriesByTeam from './useSplitLineSeriesByTeam';

// Tooltip component signature kept compatible with the previous nivo
// PointTooltipComponent — the lookup map synthesizes the same {point} shape.
type SynthesizedPoint = {
	point: {
		seriesId: string | number;
		data: Datum & { xFormatted?: string };
	};
};
export type LineChartByTeamTooltipComponent = ComponentType<SynthesizedPoint>;

export type LineChartByTeamProps = {
	xKey: MutableSerieDataKey;
	yKey: MutableSerieDataKey;
	data: DataWithTeamInfo[];
	tooltip: LineChartByTeamTooltipComponent;
	axisBottomFormat?: (value: unknown) => ReactNode;
	invert?: boolean;
	min?: number;
	max?: number;
	noBase?: boolean;
	height?: number;
};

export default function LineChartByTeam({
	xKey,
	yKey,
	data,
	tooltip: TooltipComponent,
	axisBottomFormat,
	invert = false,
	min = 0,
	max = 0,
	noBase = false,
	height
}: LineChartByTeamProps) {
	const splitSeriesByTeam = useSplitSeriesByTeam();
	const { sx, slotProps } = useChartsTheme();

	const built = useMemo(() => {
		const [teamSeries, baseSerie] = splitSeriesByTeam(xKey, data);
		const mappedTeams = teamSeries.map(mapLineSerieValues(xKey, yKey));
		const mappedBase = mapLineSerieValues(xKey, yKey)(baseSerie as Serie);
		const axisMax = Math.max(max, maxValue(baseSerie as MutableSerie, yKey));

		const xData: number[] = (baseSerie.data || [])
			.map(d => Number(d[xKey]))
			.filter(v => Number.isFinite(v));

		const lookup = new Map<string, Array<Datum | undefined>>();
		const series: LineSeriesType[] = mappedTeams.map(s => {
			const entries: Array<Datum | undefined> = new Array(xData.length).fill(undefined);
			const values: Array<number | null> = new Array(xData.length).fill(null);
			s.data?.forEach(d => {
				const xVal = Number((d as { x?: unknown }).x);
				const i = xData.indexOf(xVal);
				if (i !== -1) {
					const yVal = (d as { y?: unknown }).y;
					values[i] = yVal == null || yVal === '' ? null : Number(yVal);
					entries[i] = d as Datum;
				}
			});
			const color = String((s as { color?: string }).color || '');
			lookup.set(String(s.id), entries);
			return {
				type: 'line',
				id: String(s.id),
				label: String(s.id),
				data: values,
				color,
				curve: 'linear',
				showMark: true,
				shape: 'circle',
				connectNulls: false
			};
		});

		return {
			series,
			xData,
			lookup,
			axisMax,
			base: noBase ? null : (mappedBase as Serie)
		};
	}, [splitSeriesByTeam, xKey, yKey, data, max, noBase]);

	function ItemTooltipContent() {
		const tt = useItemTooltip<'line' | 'scatter'>();
		if (!tt) {
			return null;
		}
		const seriesId = String(tt.identifier.seriesId);
		const dataIndex = (tt.identifier as { dataIndex?: number }).dataIndex;
		if (dataIndex == null) {
			return null;
		}
		const entry = built.lookup.get(seriesId)?.[dataIndex];
		if (!entry) {
			return null;
		}
		const x = built.xData[dataIndex];
		const synthesized: SynthesizedPoint = {
			point: {
				seriesId,
				data: {
					...entry,
					xFormatted: axisBottomFormat ? String(axisBottomFormat(x)) : String(x)
				}
			}
		};
		return (
			<ChartsTooltipBody>
				<TooltipComponent {...synthesized} />
			</ChartsTooltipBody>
		);
	}

	if (!built.xData.length) {
		return null;
	}

	return (
		<Box sx={{ width: '100%', height: height ?? '100%', ...sx }}>
			<ChartsDataProvider
				series={built.series}
				height={height}
				xAxis={[
					{
						id: 'x',
						data: built.xData,
						scaleType: 'linear',
						min: built.xData[0],
						max: built.xData[built.xData.length - 1],
						tickInterval: built.xData,
						valueFormatter: (v, ctx) =>
							ctx?.location === 'tick' && axisBottomFormat
								? String(axisBottomFormat(v))
								: String(v)
					}
				]}
				yAxis={[
					{
						id: 'y',
						min: invert ? min : 0,
						max: built.axisMax,
						reverse: invert,
						position: 'right',
						tickInterval: invert ? [min, built.axisMax] : [built.axisMax, min]
					}
				]}
				margin={{ top: 20, left: 28, right: 32, bottom: 40 }}
			>
				<ChartsSurface>
					<ChartsClipPath id="lcbt-clip" />
					<g clipPath="url(#lcbt-clip)">
						<ChartsGrid horizontal vertical={false} />
						{built.base ? <BaseLineChartLayer series={built.base} /> : null}
						<LinePlot />
						<MarkPlot />
						<ChartsAxisHighlight x="line" />
					</g>
					<ChartsXAxis />
					<ChartsYAxis />
					<ChartsOverlay />
				</ChartsSurface>
				<ChartsLegend />
				<ChartsTooltipContainer trigger="item">
					<ItemTooltipContent />
				</ChartsTooltipContainer>
			</ChartsDataProvider>
		</Box>
	);
}
