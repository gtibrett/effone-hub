import {useInvertedTheme} from '@/components/ui';
import {alpha, useTheme} from '@mui/material';
import {BoxPlotDatum} from '@nivo/boxplot/dist/types/types';
import {Theme} from '@nivo/core';

type NivoTheme = Theme & {
	translation: BoxPlotDatum;
}

export default function useNivoTheme(): NivoTheme {
	const theme         = useTheme();
	const invertedTheme = useInvertedTheme();
	
	return {
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
	};
}