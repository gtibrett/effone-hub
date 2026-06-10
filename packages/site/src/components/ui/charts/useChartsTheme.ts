import { useMemo } from 'react';
import { useTheme } from '@mui/material';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { chartsGridClasses } from '@mui/x-charts/ChartsGrid';
import { legendClasses } from '@mui/x-charts/ChartsLegend';

import { cssVar } from '@/lib/tokens';

export type ChartsThemeReturn = {
	sx: Record<string, unknown>;
	slotProps: Record<string, unknown>;
	colors: string[];
};

// Returns shared MUI X Charts styling derived from project's cssVar tokens so
// charts pick up the live light/dark flip via the CssVarsProvider attribute
// swap without a React re-render. Replaces useNivoTheme.
export default function useChartsTheme(): ChartsThemeReturn {
	const theme = useTheme();

	return useMemo(
		() => ({
			sx: {
				[`& .${axisClasses.line}`]: {
					stroke: cssVar.divider,
					strokeWidth: 1
				},
				[`& .${axisClasses.tickLabel}`]: {
					fill: cssVar.text.secondary,
					fontSize: theme.typography.caption.fontSize
				},
				[`& .${axisClasses.tick}`]: {
					stroke: cssVar.divider
				},
				[`& .${axisClasses.label}`]: {
					fill: cssVar.text.secondary,
					fontSize: theme.typography.caption.fontSize
				},
				[`& .${chartsGridClasses.line}`]: {
					stroke: cssVar.divider,
					strokeWidth: 1
				},
				[`& .${legendClasses.label}`]: {
					fill: cssVar.text.secondary,
					fontSize: theme.typography.caption.fontSize
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
		[theme]
	);
}
