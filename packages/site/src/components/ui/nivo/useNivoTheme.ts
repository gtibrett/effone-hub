import {alpha, getContrastText} from '@/lib/color';
import {useCssTokens} from '@/lib/cssTokens';
import {BoxPlotDatum} from '@nivo/boxplot/dist/types/types';
import {Theme} from '@nivo/core';
import {useMemo} from 'react';

type NivoTheme = Theme & {
	translation: BoxPlotDatum;
}

// Caption-sized text in Nivo charts. Was sourced from MUI's typography.caption.fontSize
// (0.75rem); we hardcode the same value to avoid pulling in a runtime typography object.
const CAPTION_FONT_SIZE = '0.75rem';

export default function useNivoTheme(): NivoTheme {
	const tokens = useCssTokens();

	// useMemo is load-bearing: the returned object is passed to <ResponsiveBar
	// theme={...}/> and is also a dep of NivoTooltipFactory's useCallback.
	// Without memoization, a fresh object identity per render flows into Nivo's
	// internal memoization and re-mounts the tooltip on every parent render
	// (e.g. on hover, when bar charts emit state updates).
	return useMemo(() => ({
		background:  alpha(tokens.background, .25),
		text:        {
			color:      tokens.foreground,
			fontSize:   CAPTION_FONT_SIZE,
			fontFamily: "'Titillium Web', sans-serif"
		},
		translation: {},
		axis:        {
			domain: {
				line: {
					stroke:      tokens.border,
					strokeWidth: 1
				}
			},
			legend: {
				text: {
					fontSize: CAPTION_FONT_SIZE,
					fill:     tokens.mutedForeground
				}
			},
			ticks:  {
				line: {
					stroke:      tokens.border,
					strokeWidth: 1
				},
				text: {
					fontSize: CAPTION_FONT_SIZE,
					fill:     tokens.mutedForeground
				}
			}
		},
		grid:        {
			line: {
				stroke:      tokens.border,
				strokeWidth: 1
			}
		},
		legends:     {
			title: {
				text: {
					fontSize: CAPTION_FONT_SIZE,
					fill:     tokens.mutedForeground
				}
			},
			text:  {
				fontSize: CAPTION_FONT_SIZE,
				fill:     tokens.mutedForeground
			},
			ticks: {
				line: {},
				text: {
					fontSize: CAPTION_FONT_SIZE,
					fill:     tokens.mutedForeground
				}
			}
		},
		annotations: {
			text:    {
				fontSize:       CAPTION_FONT_SIZE,
				fill:           tokens.mutedForeground,
				outlineWidth:   2,
				outlineColor:   tokens.card,
				outlineOpacity: 1
			},
			link:    {
				stroke:         tokens.foreground,
				strokeWidth:    1,
				outlineWidth:   2,
				outlineColor:   tokens.card,
				outlineOpacity: 1
			},
			outline: {
				stroke:         tokens.foreground,
				strokeWidth:    2,
				outlineWidth:   2,
				outlineColor:   tokens.card,
				outlineOpacity: 1
			},
			symbol:  {
				fill:           tokens.foreground,
				outlineWidth:   2,
				outlineColor:   tokens.card,
				outlineOpacity: 1
			}
		},


		tooltip: {
			wrapper: {
				backdropFilter: 'blur(4px)',
				padding:        0,
				borderRadius:   '4px',
				overflow:       'hidden'
			},

			container:      {
				background: tokens.popover,
				color:      tokens.popoverForeground || getContrastText(tokens.popover),
				fontSize:   CAPTION_FONT_SIZE
			},
			basic:          {},
			chip:           {},
			table:          {},
			tableCell:      {},
			tableCellValue: {}
		}
	}), [tokens]);
}
