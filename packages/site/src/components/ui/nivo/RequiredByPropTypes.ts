import { GeoMapProps } from '@nivo/geo';
import { DefaultSeries, LineSvgProps } from '@nivo/line';

import { noop } from '@/helpers';

// PropTypes vs TS mismatches
type RequiredByPropTypesType = {
	GeoMap: Partial<GeoMapProps>;
	// typed with DefaultSeries so the literal checks; each spread site casts to its own Series
	Line: Partial<LineSvgProps<DefaultSeries>>;
};

const RequiredByPropTypes: RequiredByPropTypesType = {
	GeoMap: {
		projectionRotation: [0, 0, 0],
		role: 'image',
		// @ts-ignore
		layers: ['features'],
		onMouseLeave: noop,
		onMouseMove: noop,
		onMouseEnter: noop,
		isInteractive: true,
		graticuleLineColor: 'transparent',
		graticuleLineWidth: 0,
		enableGraticule: false
	},
	Line: {
		layers: [
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
		],
		curve: 'linear',
		areaBaselineValue: 0,
		enableArea: false,
		areaOpacity: 0.2,
		areaBlendMode: 'normal',
		enablePoints: true,
		pointColor: { from: 'color' },
		pointBorderWidth: 0,
		pointBorderColor: { theme: 'background' },
		enablePointLabel: false,
		pointLabel: 'yFormatted',

		enableGridY: true,
		xScale: { type: 'point' },

		defs: [],
		fill: [],
		legends: [],
		isInteractive: true,
		debugMesh: false,
		useMesh: false,
		enableSlices: false,
		debugSlices: false,
		tooltip: () => null,
		sliceTooltip: () => null,
		enableCrosshair: true,
		crosshairType: 'bottom-left',
		role: 'img'
	}
};

export default RequiredByPropTypes;
