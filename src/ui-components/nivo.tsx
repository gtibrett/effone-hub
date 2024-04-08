import {alpha, Box, ThemeProvider, useTheme} from '@mui/material';
import {blueGrey} from '@mui/material/colors';
import {BoxPlotDatum} from '@nivo/boxplot/dist/types/types';
import {Theme} from '@nivo/core';
import {FC, useCallback} from 'react';
import {useDarkMode, useInvertedTheme} from './Theme';
import useGetAccessibleColor from './useGetAccessibleColor';

const blueGreys = new Map<number, string>();
Object.entries(blueGrey).forEach(([key, color]) => {
	const numberKey = Number(key);
	if (!Number.isNaN(numberKey)) {
		blueGreys.set(numberKey, color);
	}
});

type NivoTheme = Theme & {
	translation: BoxPlotDatum;
}

export const useNivoTheme = (): NivoTheme => {
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
			//move this to wrapper: {} when it becomes available
			// @ts-ignore
			backdropFilter: 'blur(4px)',
			
			padding:        0,
			borderRadius:   invertedTheme.spacing(.5),
			overflow:       'hidden',
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
};

export const NivoTooltipFactory = (Component: FC<any>): FC<any> => {
	const nivoTheme = useNivoTheme();
	const theme     = useInvertedTheme();
	
	return useCallback((props: any) => {
		const sx = {
			...nivoTheme.tooltip?.container,
			minWidth:     200,
			borderRadius: theme.spacing(.5),
			position:     'relative',
			overflow:     'hidden',
			p:            0,
			opacity:      .9,
			
			'& .MuiCard-root': {
				border: 0
			},
			
			'& .MuiTypography-root': {
				color: theme.palette.getContrastText(theme.palette.background.paper)
			}
		};
		
		const content = Component({...props, theme: nivoTheme});
		
		return content && <Box sx={sx}><ThemeProvider theme={theme}>{content}</ThemeProvider></Box>;
		
	}, [Component, nivoTheme, theme]);
};

export function useGetAccessibleChartColors() {
	const darkMode           = useDarkMode();
	const getAccessibleColor = useGetAccessibleColor();
	
	return (color: string, force: boolean = false) => {
		const a11yColor = getAccessibleColor(color, force);
		
		return darkMode
		       ? [a11yColor, ...(new Array(4)).fill(100).map((v, i) => blueGreys.get(2 * v * (i + 1)) || '')]
		       : [a11yColor, ...(new Array(4)).fill(100).map((v, i) => blueGreys.get(900 - (2 * v * (i + 1))) || '')];
	};
}