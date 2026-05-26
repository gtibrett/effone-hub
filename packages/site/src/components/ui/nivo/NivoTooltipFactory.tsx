import {Box, ThemeProvider} from '@mui/material';
import {FC, ReactNode, useCallback} from 'react';
import {useInvertedTheme} from '../Theme';
import useNivoTheme from './useNivoTheme';

export default function NivoTooltipFactory(Component: FC<any>): FC<any> {
	const nivoTheme = useNivoTheme();
	const theme     = useInvertedTheme();

	return useCallback((props: any) => {
		const style = {
			...nivoTheme.tooltip?.container,
			['--tooltip-fg' as string]: `contrast-color(${theme.palette.background.paper} vs white, black)`
		};

		const content = Component({...props, theme: nivoTheme}) as ReactNode;

		return content
			? <Box
				className="min-w-[200px] rounded-sm relative overflow-hidden p-0 opacity-90 [&_.MuiCard-root]:border-0 [&_.MuiTypography-root]:text-(--tooltip-fg)"
				style={style}
			><ThemeProvider theme={theme}>{content}</ThemeProvider></Box>
			: null;

	}, [Component, nivoTheme, theme]);
}