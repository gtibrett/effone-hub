import {useDarkMode} from '@/components/ui';
import {tokens} from '@/lib/tokens';
import {getContrastRatio, recomposeColor} from '@mui/material';
import {decomposeColor} from '@mui/system/colorManipulator';
import {useCallback, useMemo} from 'react';

/**
 * Resolves a CSS-var palette reference like `var(--color-primary-light)` to
 * its concrete hex/rgb for the active scheme. Returns the input untouched
 * if it isn't a recognized var() reference, so literal hex inputs (team
 * colors, etc.) pass through.
 *
 * Required because JS color math (decomposeColor, getContrastRatio) can't
 * operate on CSS var strings — it needs the resolved bytes.
 */
const VAR_RE      = /^var\(--color-([a-z-]+)\)/i;
const PATH_LOOKUP: Record<string, (t: any) => string | undefined> = {
	'primary':            (t) => t.primary.main,
	'primary-light':      (t) => t.primary.light,
	'primary-dark':       (t) => t.primary.dark,
	'primary-contrast':   (t) => t.primary.contrastText,
	'secondary':          (t) => t.secondary.main,
	'secondary-light':    (t) => t.secondary.light,
	'secondary-dark':     (t) => t.secondary.dark,
	'secondary-contrast': (t) => t.secondary.contrastText,
	'background':         (t) => t.background.default,
	'background-paper':   (t) => t.background.paper,
	'text-primary':       (t) => t.text.primary,
	'text-secondary':     (t) => t.text.secondary,
	'text-disabled':      (t) => t.text.disabled,
	'divider':            (t) => t.divider
};

const resolveColorString = (color: string, scheme: any): string => {
	const match = color.match(VAR_RE);
	if (!match) return color;

	const resolver = PATH_LOOKUP[match[1].toLowerCase()];
	const resolved = resolver?.(scheme);
	return resolved ?? color;
};

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
	const darkMode = useDarkMode();
	// Pick the active scheme's concrete tokens — Tailwind CSS vars can't be
	// read by JS without getComputedStyle (which fails on the server).
	const scheme   = useMemo(() => (darkMode ? tokens.dark : tokens.light), [darkMode]);

	return useCallback((color: string, force: boolean = false) => {
		if (color) {
			const resolved = resolveColorString(color, scheme);
			return force ? resolved : fixContrast(resolved, scheme.background.paper);
		}

		const fallback = darkMode ? scheme.primary.light : scheme.primary.dark;
		return fixContrast(resolveColorString(fallback, scheme), scheme.background.paper);
	}, [scheme, darkMode]);
}
