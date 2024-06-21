import {Box, ThemeProvider} from '@mui/material';
import {FC, useCallback} from 'react';
import {useInvertedTheme} from '../Theme';
import useNivoTheme from './useNivoTheme';

export default function NivoTooltipFactory(Component: FC<any>): FC<any> {
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
}