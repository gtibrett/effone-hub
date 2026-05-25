import {useDarkMode} from '@/components/ui';
import {getContrastRatio, recomposeColor, useTheme} from '@mui/material';
import {decomposeColor} from '@mui/system/colorManipulator';
import {blueGrey} from '@mui/material/colors';
import {useCallback} from 'react';

const isBlackOrWhite = (color: string) => {
	const {values: [r, g, b]} = decomposeColor(color);
	return (r + g + b === 0 || r + g + b === 254 * 3);
};

const shiftColor = (color: string, mode: 'lighten' | 'darken') => {
	const colorObject = decomposeColor(color);
	const [r, g, b]   = colorObject.values;
	
	const shiftChannel = (value: number) => {
		return value + 4 * (mode === 'lighten' ? 1 : -1);
	};
	
	colorObject.values = [shiftChannel(r), shiftChannel(g), shiftChannel(b)];
	
	return recomposeColor(colorObject);
};

const calculateLuminance = (color: string) => {
	const {values}           = decomposeColor(color);
	const [red, green, blue] = values.map(value => {
		value = value / 255;
		
		if (value < 0.03928) {
			value = value / 12.92;
		} else {
			value = (value + .055) / 1.055;
			value = Math.pow(value, 2.4);
		}
		
		return value;
	});
	
	return (red * .2126) + (green * .7152) + (blue * .0722);
};

const fixContrast = (foreground: string, background: string, threshold: number = 3) => {
	const contrastRatio = getContrastRatio(foreground, background);
	
	if (contrastRatio >= threshold) {
		return foreground;
	} else {
		const backLuminance = calculateLuminance(background);
		const fixMode       = backLuminance <= .5 ? 'lighten' : 'darken';
		
		let foreFixed = foreground;
		do {
			foreFixed = shiftColor(foreFixed, fixMode);
		} while (!isBlackOrWhite(foreFixed) && getContrastRatio(foreFixed, background) < threshold);
		
		return foreFixed;
	}
};

export default function useGetAccessibleColor() {
	const theme    = useTheme();
	const darkMode = useDarkMode();
	// JS color math requires a concrete hex — under cssVars `theme.palette.X`
	// freezes to the default (light) scheme, so pick the right hex by mode.
	const backgroundPaper = darkMode ? blueGrey[900] : '#fff';

	return useCallback((color: string, force: boolean = false) => {
		if (color) {
			return force ? color : fixContrast(color, backgroundPaper);
		}

		return fixContrast(darkMode ? theme.palette.primary.light : theme.palette.primary.dark, backgroundPaper);
	}, [theme, darkMode, backgroundPaper]);
}