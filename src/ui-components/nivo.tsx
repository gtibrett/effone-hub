import {alpha, Box, ThemeProvider, useTheme} from '@mui/material';
import {blueGrey} from '@mui/material/colors';
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

export const useNivoTheme = () => {
	const theme           = useTheme();
	const invertedTheme   = useInvertedTheme();
	const captionFontSize = 11;
	
	return {
		'background':  'transparent',
		'textColor':   theme.palette.text.primary,
		'fontSize':    captionFontSize,
		'fontFamily':  "'Titillium Web', sans-serif",
		'axis':        {
			'domain': {
				'line': {
					'stroke':      theme.palette.divider,
					'strokeWidth': 1
				}
			},
			'legend': {
				'text': {
					'fontSize': captionFontSize,
					'fill':     theme.palette.text.secondary
				}
			},
			'ticks':  {
				'line': {
					'stroke':      theme.palette.divider,
					'strokeWidth': 1
				},
				'text': {
					'fontSize': captionFontSize,
					'fill':     theme.palette.text.secondary
				}
			}
		},
		'grid':        {
			'line': {
				'stroke':      theme.palette.divider,
				'strokeWidth': 1
			}
		},
		'legends':     {
			'title': {
				'text': {
					'fontSize': captionFontSize,
					'fill':     theme.palette.text.secondary
				}
			},
			'text':  {
				'fontSize': captionFontSize,
				'fill':     theme.palette.text.secondary
			},
			'ticks': {
				'line': {},
				'text': {
					'fontSize': captionFontSize,
					'fill':     theme.palette.text.secondary
				}
			}
		},
		'annotations': {
			'text':    {
				'fontSize':       captionFontSize,
				'fill':           theme.palette.text.secondary,
				'outlineWidth':   2,
				'outlineColor':   theme.palette.background.paper,
				'outlineOpacity': 1
			},
			'link':    {
				'stroke':         theme.palette.text.primary,
				'strokeWidth':    1,
				'outlineWidth':   2,
				'outlineColor':   theme.palette.background.paper,
				'outlineOpacity': 1
			},
			'outline': {
				'stroke':         theme.palette.text.primary,
				'strokeWidth':    2,
				'outlineWidth':   2,
				'outlineColor':   theme.palette.background.paper,
				'outlineOpacity': 1
			},
			'symbol':  {
				'fill':           theme.palette.text.primary,
				'outlineWidth':   2,
				'outlineColor':   theme.palette.background.paper,
				'outlineOpacity': 1
			}
		},
		
		'tooltip': {
			'container':      {
				'background': invertedTheme.palette.background.paper,
				'color':      invertedTheme.palette.getContrastText(invertedTheme.palette.background.paper),
				'fontSize':   captionFontSize
			},
			'basic':          {},
			'chip':           {},
			'table':          {},
			'tableCell':      {},
			'tableCellValue': {}
		}
	};
};

export const NivoTooltip = (Component: FC<any>): FC<any> => {
	const theme = useInvertedTheme();
	return useCallback((props: any) => {
		const sx = {
			minWidth:     200,
			py:           1,
			px:           2,
			borderRadius: 1,
			background:   alpha(theme.palette.background.paper, .9),
			color:        theme.palette.getContrastText(theme.palette.background.paper),
			
			'& .MuiTypography-root': {
				color: theme.palette.getContrastText(theme.palette.background.paper)
			}
		};
		
		return <Box sx={sx}><ThemeProvider theme={theme}>{Component(props)}</ThemeProvider></Box>;
	}, [Component, theme]);
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