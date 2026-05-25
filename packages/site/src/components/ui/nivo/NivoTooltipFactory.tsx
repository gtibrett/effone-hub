import {Box, ThemeProvider} from '@mui/material';
import {FC, ReactNode, useCallback} from 'react';
import {getCssContrast, SUPPORTS_CONTRAST_COLOR} from '@/lib/useContrastText';
import {useInvertedTheme} from '../Theme';
import useNivoTheme from './useNivoTheme';

export default function NivoTooltipFactory(Component: FC<any>): FC<any> {
	const nivoTheme = useNivoTheme();
	const theme     = useInvertedTheme();

	return useCallback((props: any) => {
		// invertedTheme is a flat (non-cssVars) MUI theme — palette values
		// are concrete strings, so MUI's getContrastText works directly.
		// Layer the CSS-only contrast-color() upgrade for capable browsers.
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
				color:                     theme.palette.getContrastText(theme.palette.background.paper),
				[SUPPORTS_CONTRAST_COLOR]: {color: getCssContrast(theme.palette.background.paper)}
			}
		};

		const content = Component({...props, theme: nivoTheme}) as ReactNode;

		return content ? <Box sx={sx}><ThemeProvider theme={theme}>{content}</ThemeProvider></Box> : null;
		
	}, [Component, nivoTheme, theme]);
}