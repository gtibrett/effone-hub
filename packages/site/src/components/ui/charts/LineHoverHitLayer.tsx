'use client';

import { type PointerEvent as ReactPointerEvent, useRef } from 'react';
import { useDrawingArea, useXScale, useYScale } from '@mui/x-charts/hooks';

import { pickNearestIndex, pickNearestSeries, type SeriesCandidate } from './pickNearestSeries';

export type LineHoverInfo = {
	seriesId: string;
	dataIndex: number;
	// Container-relative pixels (SVG fills the container), for placing the tooltip.
	left: number;
	top: number;
} | null;

type LineHoverSeries = {
	id: string;
	data: (number | null)[];
};

type LineHoverHitLayerProps = {
	series: LineHoverSeries[];
	// Domain x values, one per data index (the chart's xAxis data). Used to map
	// each index to a pixel x via the live scale.
	xValues: number[];
	// Only fire when the nearest line is within this many pixels in y.
	yMaxRadius?: number;
	onHover: (info: LineHoverInfo) => void;
};

// Transparent SVG rect over the plot area. Rendered as a child of the
// self-contained <LineChart> so it sits inside the chart's provider/SVG and can
// read the live x/y scales — giving exact, drift-free proximity math. Solves the
// "2px line is impossible to hover" problem: the whole plot is the hit target,
// and we resolve the nearest series by cursor distance ourselves.
export default function LineHoverHitLayer({
	series,
	xValues,
	yMaxRadius,
	onHover
}: LineHoverHitLayerProps) {
	const xScale = useXScale<'point'>();
	const yScale = useYScale<'linear'>();
	const area = useDrawingArea();
	const rectRef = useRef<SVGRectElement>(null);

	const handleMove = (e: ReactPointerEvent<SVGRectElement>) => {
		const svg = rectRef.current?.ownerSVGElement;
		if (!svg) {
			return;
		}
		const rect = svg.getBoundingClientRect();
		const cursorX = e.clientX - rect.left;
		const cursorY = e.clientY - rect.top;

		const xPositions = xValues.map(v => xScale(v) ?? NaN);
		const dataIndex = pickNearestIndex(xPositions, cursorX);
		if (dataIndex < 0) {
			onHover(null);
			return;
		}

		const candidates: SeriesCandidate[] = [];
		for (const s of series) {
			const v = s.data[dataIndex];
			if (v == null) {
				continue;
			}
			candidates.push({ seriesId: s.id, valuePx: yScale(v) });
		}

		const seriesId = pickNearestSeries(candidates, cursorY, yMaxRadius);
		if (!seriesId) {
			onHover(null);
			return;
		}
		onHover({ seriesId, dataIndex, left: cursorX, top: cursorY });
	};

	return (
		<rect
			ref={rectRef}
			x={area.left}
			y={area.top}
			width={area.width}
			height={area.height}
			fill="transparent"
			pointerEvents="all"
			onPointerMove={handleMove}
			onPointerLeave={() => onHover(null)}
		/>
	);
}
