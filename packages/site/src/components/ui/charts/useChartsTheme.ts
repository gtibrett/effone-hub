import { useMemo } from 'react';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { chartsGridClasses } from '@mui/x-charts/ChartsGrid';
import { legendClasses } from '@mui/x-charts/ChartsLegend';

import { cssVar } from '@/lib/tokens';

export type ChartsThemeReturn = {
	sx: Record<string, unknown>;
	slotProps: Record<string, unknown>;
	colors: string[];
};

// MUI X default bottom-axis height (25) leaves 25 - tickSize(6) - gap(3) = 16px
// for tick labels; Titillium at 12px measures 18px tall, so shortenLabels
// ellipsizes every label to ''. Every bottom axis must set an explicit height.
export const BOTTOM_AXIS_HEIGHT = 28;
// Axis title shares the same box: tick space = height - (labelHeight + 4) -
// tickSize(6) - gap(3). Title measures ~21.5px in Titillium, so ≥52.5 keeps
// the 18px tick-label row; 56 adds headroom.
export const BOTTOM_AXIS_HEIGHT_WITH_LABEL = 56;

// Returns shared MUI X Charts styling derived from project's cssVar tokens so
// charts pick up the live light/dark flip via the CssVarsProvider attribute
// swap without a React re-render. Replaces useNivoTheme.
export default function useChartsTheme(): ChartsThemeReturn {
	return useMemo(
		() => ({
			sx: {
				[`& .${axisClasses.line}`]: {
					stroke: cssVar.divider,
					strokeWidth: 1
				},
				[`& .${axisClasses.tickLabel}`]: {
					fill: cssVar.text.secondary,
					font: 'var(--mui-font-caption)'
				},
				[`& .${axisClasses.tick}`]: {
					stroke: cssVar.divider
				},
				[`& .${axisClasses.label}`]: {
					fill: cssVar.text.secondary,
					font: 'var(--mui-font-caption)'
				},
				[`& .${chartsGridClasses.line}`]: {
					stroke: cssVar.divider,
					strokeWidth: 1
				},
				[`& .${legendClasses.label}`]: {
					fill: cssVar.text.secondary,
					font: 'var(--mui-font-caption)'
				}
			},
			slotProps: {
				tooltip: { trigger: 'item' as const }
			},
			colors: [
				cssVar.primary.main,
				cssVar.secondary.main,
				cssVar.success,
				cssVar.warning,
				cssVar.info,
				cssVar.error
			]
		}),
		[]
	);
}
