import {useCssTokens} from '@/lib/cssTokens';
import {Datum} from '@nivo/line';
import {AnyScale} from '@nivo/scales';
import {line} from 'd3-shape';

type CareerChartLineLayerProps = {
	xScale: AnyScale,
	yScale: AnyScale,
}

export default function BaseLineChartLayer(series: any) {
	const tokens = useCssTokens();

	return function LineLayer({xScale, yScale}: CareerChartLineLayerProps) {
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
					stroke={tokens.border}
					fill="transparent"
					strokeWidth={2}
				/>
			</>
		);
	};
}
