import { line } from 'd3-shape';
import { useXScale, useYScale } from '@mui/x-charts/hooks';

import { cssVar } from '@/lib/tokens';

import type { Serie } from './types';

type Pt = { x: number; y: number };

type BaseLineChartLayerProps = { series: Serie };

// Composition-mode layer for MUI X Charts: draws the supplied baseline series
// as a single grey reference path on top of the team-coloured lines.
export default function BaseLineChartLayer({ series }: BaseLineChartLayerProps) {
	const xScale = useXScale<'linear'>();
	const yScale = useYScale<'linear'>();

	if (!xScale || !yScale) {
		return null;
	}

	const points: Pt[] = (series.data || [])
		.map(d => ({ x: Number((d as { x?: unknown }).x), y: Number((d as { y?: unknown }).y) }))
		.filter(p => Number.isFinite(p.x) && Number.isFinite(p.y));

	if (points.length === 0) {
		return null;
	}

	const gen = line<Pt>()
		.x(d => xScale(d.x) as number)
		.y(d => yScale(d.y) as number);

	return (
		<path
			d={gen(points) || undefined}
			stroke={cssVar.divider}
			fill="transparent"
			strokeWidth={2}
		/>
	);
}
