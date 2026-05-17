import {decomposeColor, getContrastRatio, recomposeColor} from '@/lib/color';
import {useCssTokens} from '@/lib/cssTokens';
import useDarkMode from '@/lib/useDarkMode';
import {lighten, darken} from '@/lib/color';
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
	const tokens = useCssTokens();
	const dark   = useDarkMode();

	return useCallback((color: string, force: boolean = false) => {
		if (color) {
			return force ? color : fixContrast(color, tokens.card);
		}

		// No color supplied: pick a primary derivative tuned for the surface.
		const fallback = dark ? lighten(tokens.primary, .3) : darken(tokens.primary, .3);
		return fixContrast(fallback, tokens.card);
	}, [tokens.card, tokens.primary, dark]);
}
