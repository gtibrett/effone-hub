import {useInvertedTheme} from '@/components/ui';
import {alpha} from '@/components/ui/colors';
import {cssVar} from '@/lib/tokens';
import {useTheme} from '@mui/material';
import {BoxPlotDatum} from '@nivo/boxplot/dist/types/types';
import {Theme} from '@nivo/core';
import {useMemo} from 'react';

type NivoTheme = Theme & {
	translation: BoxPlotDatum;
}

// Use `cssVar.X` (Tailwind CSS var strings) so Nivo SVG fill/stroke attrs
// flip with the OS color scheme at paint time, no React work. Reading
// `theme.palette.X` would give a concrete light-scheme hex (frozen).
export default function useNivoTheme(): NivoTheme {
	const theme         = useTheme();
	const invertedTheme = useInvertedTheme();

	// useMemo is load-bearing: the returned object is passed to <ResponsiveBar
	// theme={...}/> and is also a dep of NivoTooltipFactory's useCallback.
	// Without memoization, a fresh object identity per render flows into Nivo's
	// internal memoization and re-mounts the tooltip on every parent render.
	return useMemo(() => ({
		background:  alpha(cssVar.background.default, .25),
		text:        {
			color:      cssVar.text.primary,
			fontSize:   theme.typography.caption.fontSize,
			fontFamily: "'Titillium Web', sans-serif"
		},
		translation: {},
		axis:        {
			domain: {line: {stroke: cssVar.divider, strokeWidth: 1}},
			legend: {
				text: {
					fontSize: theme.typography.caption.fontSize,
					fill:     cssVar.text.secondary
				}
			},
			ticks:  {
				line: {stroke: cssVar.divider, strokeWidth: 1},
				text: {
					fontSize: theme.typography.caption.fontSize,
					fill:     cssVar.text.secondary
				}
			}
		},
		grid:        {line: {stroke: cssVar.divider, strokeWidth: 1}},
		legends:     {
			title: {
				text: {
					fontSize: theme.typography.caption.fontSize,
					fill:     cssVar.text.secondary
				}
			},
			text:  {
				fontSize: theme.typography.caption.fontSize,
				fill:     cssVar.text.secondary
			},
			ticks: {
				line: {},
				text: {
					fontSize: theme.typography.caption.fontSize,
					fill:     cssVar.text.secondary
				}
			}
		},
		annotations: {
			text:    {
				fontSize:       theme.typography.caption.fontSize,
				fill:           cssVar.text.secondary,
				outlineWidth:   2,
				outlineColor:   cssVar.background.paper,
				outlineOpacity: 1
			},
			link:    {
				stroke:         cssVar.text.primary,
				strokeWidth:    1,
				outlineWidth:   2,
				outlineColor:   cssVar.background.paper,
				outlineOpacity: 1
			},
			outline: {
				stroke:         cssVar.text.primary,
				strokeWidth:    2,
				outlineWidth:   2,
				outlineColor:   cssVar.background.paper,
				outlineOpacity: 1
			},
			symbol:  {
				fill:           cssVar.text.primary,
				outlineWidth:   2,
				outlineColor:   cssVar.background.paper,
				outlineOpacity: 1
			}
		},

		tooltip: {
			wrapper: {
				backdropFilter: 'blur(4px)',
				padding:        0,
				borderRadius:   invertedTheme.spacing(.5),
				overflow:       'hidden'
			},

			container:      {
				background: invertedTheme.palette.background.paper,
				// `palette.getContrastText` would call MUI's decomposeColor on
				// the oklch background — unsupported. Defer the contrast pick
				// to CSS instead.
				color:      `contrast-color(${invertedTheme.palette.background.paper} vs white, black)`,
				fontSize:   invertedTheme.typography.caption.fontSize
			},
			basic:          {},
			chip:           {},
			table:          {},
			tableCell:      {},
			tableCellValue: {}
		}
	}), [theme, invertedTheme]);
}
