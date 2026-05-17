import {useInvertedTheme} from '@/components/ui';
import {alpha} from '@/lib/color';
import {useTheme} from '@mui/material';
import {BoxPlotDatum} from '@nivo/boxplot/dist/types/types';
import {Theme} from '@nivo/core';
import {useMemo} from 'react';

type NivoTheme = Theme & {
	translation: BoxPlotDatum;
}

export default function useNivoTheme(): NivoTheme {
	const theme         = useTheme();
	const invertedTheme = useInvertedTheme();

	// useMemo is load-bearing: the returned object is passed to <ResponsiveBar
	// theme={...}/> and is also a dep of NivoTooltipFactory's useCallback.
	// Without memoization, a fresh object identity per render flows into Nivo's
	// internal memoization and re-mounts the tooltip on every parent render
	// (e.g. on hover, when bar charts emit state updates).
	return useMemo(() => ({
		background:  alpha(theme.palette.background.default, .25),
		text:        {
			color:      theme.palette.text.primary,
			fontSize:   theme.typography.caption.fontSize,
			fontFamily: "'Titillium Web', sans-serif"
		},
		translation: {},
		axis:        {
			domain: {
				line: {
					stroke:      theme.palette.divider,
					strokeWidth: 1
				}
			},
			legend: {
				text: {
					fontSize: theme.typography.caption.fontSize,
					fill:     theme.palette.text.secondary
				}
			},
			ticks:  {
				line: {
					stroke:      theme.palette.divider,
					strokeWidth: 1
				},
				text: {
					fontSize: theme.typography.caption.fontSize,
					fill:     theme.palette.text.secondary
				}
			}
		},
		grid:        {
			line: {
				stroke:      theme.palette.divider,
				strokeWidth: 1
			}
		},
		legends:     {
			title: {
				text: {
					fontSize: theme.typography.caption.fontSize,
					fill:     theme.palette.text.secondary
				}
			},
			text:  {
				fontSize: theme.typography.caption.fontSize,
				fill:     theme.palette.text.secondary
			},
			ticks: {
				line: {},
				text: {
					fontSize: theme.typography.caption.fontSize,
					fill:     theme.palette.text.secondary
				}
			}
		},
		annotations: {
			text:    {
				fontSize:       theme.typography.caption.fontSize,
				fill:           theme.palette.text.secondary,
				outlineWidth:   2,
				outlineColor:   theme.palette.background.paper,
				outlineOpacity: 1
			},
			link:    {
				stroke:         theme.palette.text.primary,
				strokeWidth:    1,
				outlineWidth:   2,
				outlineColor:   theme.palette.background.paper,
				outlineOpacity: 1
			},
			outline: {
				stroke:         theme.palette.text.primary,
				strokeWidth:    2,
				outlineWidth:   2,
				outlineColor:   theme.palette.background.paper,
				outlineOpacity: 1
			},
			symbol:  {
				fill:           theme.palette.text.primary,
				outlineWidth:   2,
				outlineColor:   theme.palette.background.paper,
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
				color:      invertedTheme.palette.getContrastText(invertedTheme.palette.background.paper),
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