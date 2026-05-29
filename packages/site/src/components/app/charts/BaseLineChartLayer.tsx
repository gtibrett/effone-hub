import { line } from 'd3-shape';
import { Datum } from '@nivo/line';
import { AnyScale } from '@nivo/scales';

import { cssVar } from '@/lib/tokens';

type CareerChartLineLayerProps = {
	xScale: AnyScale;
	yScale: AnyScale;
};

export default function BaseLineChartLayer(series: any) {
	const stroke = cssVar.divider;

	return function LineLayer({ xScale, yScale }: CareerChartLineLayerProps) {
		const lineGenerator = line()
			.x((d: Datum) => {
				return xScale(Number(d.x));
			})
			.y((d: Datum) => {
				return yScale(Number(d.y));
			});

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
