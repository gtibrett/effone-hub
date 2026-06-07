import type { LineSeriesType } from '@mui/x-charts';
import { useXScale, useYScale } from '@mui/x-charts/hooks';

type EndLineLabelsProps = {
	series: LineSeriesType[];
	xData: number[];
	xPadding?: number;
	fontSize?: number;
	onLabelHoverChange?: (seriesId: string | null) => void;
	onLabelClick?: (seriesId: string) => void;
};

// Composition-mode layer: draws each line series' label at the y of its
// last non-null data point, just past the rightmost x tick. Replaces the
// MUI X vertical legend on standings / lap-by-lap charts so the labels
// track the line endpoints in current-rank order.
export default function EndLineLabels({
	series,
	xData,
	xPadding = 32,
	fontSize = 11,
	onLabelHoverChange,
	onLabelClick
}: EndLineLabelsProps) {
	const xScale = useXScale<'point'>();
	const yScale = useYScale<'linear'>();
	if (!xScale || !yScale || !xData.length) {
		return null;
	}
	const lastX = xData[xData.length - 1];
	const xPos = xScale(lastX);
	if (xPos == null) {
		return null;
	}
	const interactive = Boolean(onLabelHoverChange || onLabelClick);
	return (
		<g>
			{series.map(s => {
				if (!s.data) {
					return null;
				}
				let lastValue: number | null = null;
				for (let i = s.data.length - 1; i >= 0; i--) {
					const v = s.data[i];
					if (typeof v === 'number') {
						lastValue = v;
						break;
					}
				}
				if (lastValue == null) {
					return null;
				}
				const y = yScale(lastValue);
				if (y == null) {
					return null;
				}
				const label = typeof s.label === 'function' ? s.label('legend') : s.label;
				const id = String(s.id);
				return (
					<text
						key={id}
						x={Number(xPos) + xPadding}
						y={Number(y)}
						fill={(s.color as string) || 'currentColor'}
						fontSize={fontSize}
						dominantBaseline="middle"
						textAnchor="start"
						style={interactive ? { cursor: 'pointer' } : undefined}
						onMouseEnter={onLabelHoverChange ? () => onLabelHoverChange(id) : undefined}
						onMouseLeave={
							onLabelHoverChange ? () => onLabelHoverChange(null) : undefined
						}
						onClick={onLabelClick ? () => onLabelClick(id) : undefined}
					>
						{label ?? ''}
					</text>
				);
			})}
		</g>
	);
}
