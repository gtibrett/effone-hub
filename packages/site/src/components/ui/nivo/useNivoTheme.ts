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

// cssVar.X (not theme.palette.X) so Nivo SVG attrs flip at paint — theme.palette would freeze to default scheme.
export default function useNivoTheme(): NivoTheme {
	const theme         = useTheme();
	const invertedTheme = useInvertedTheme();

	// Load-bearing useMemo: identity churn re-mounts Nivo tooltip every parent render.
	return useMemo(() => ({
		background:  alpha(cssVar.background.default, .25),
		text:        {
			color:      cssVar.text.primary,
			fontSize:   theme.typography.caption.fontSize,
			fontFamily: "var(--font-titillium), sans-serif"
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
				// CSS contrast-color: getContrastText would call decomposeColor on oklch (unsupported).
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
