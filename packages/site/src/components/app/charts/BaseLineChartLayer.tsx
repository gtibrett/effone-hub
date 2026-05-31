import { line } from 'd3-shape';
import { LineSeries } from '@nivo/line';
import { AnyScale } from '@nivo/scales';

import { cssVar } from '@/lib/tokens';

type LineDatum = LineSeries['data'][number];

type CareerChartLineLayerProps = {
	xScale: AnyScale;
	yScale: AnyScale;
};

export default function BaseLineChartLayer(series: LineSeries) {
	const stroke = cssVar.divider;

	return function LineLayer({ xScale, yScale }: CareerChartLineLayerProps) {
		const lineGenerator = line<LineDatum>()
			.x(d => xScale(Number(d.x)))
			.y(d => yScale(Number(d.y)));

		return (
			<>
				<path
					d={lineGenerator(series.data) || undefined}
					stroke={stroke}
					fill="transparent"
					strokeWidth={2}
				/>
			</>
		);
	};
}
