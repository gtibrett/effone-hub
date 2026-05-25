export function alpha(color: string, percentage: number) {
	return `color-mix(in srgb, ${color}, transparent ${percentage * 100}%)`;
}

// CSS-native lighten/darken via color-mix in oklch space. Works on any
// CSS color (oklch, var(--...), hex, rgb, etc.) — unlike MUI's
// lighten/darken which only parse named color formats.
export function lighten(color: string, percentage: number) {
	return `color-mix(in oklch, ${color}, white ${percentage * 100}%)`;
}

export function darken(color: string, percentage: number) {
	return `color-mix(in oklch, ${color}, black ${percentage * 100}%)`;
}

// OKLCH wide-gamut palette. Perceptually uniform — equal lightness deltas
// look equally bright across hues, unlike sRGB hex. Browser support is
// universal in modern engines; sRGB hex fallback values live in
// `src/lib/tokens.ts` for JS color math (`decomposeColor` doesn't parse oklch).
export const blueGrey = {
	50:  'oklch(0.951 0.005 236)',
	100: 'oklch(0.864 0.014 230)',
	200: 'oklch(0.780 0.020 232)',
	300: 'oklch(0.675 0.027 234)',
	400: 'oklch(0.600 0.033 236)',
	500: 'oklch(0.530 0.039 240)',
	600: 'oklch(0.470 0.038 242)',
	700: 'oklch(0.400 0.034 244)',
	800: 'oklch(0.330 0.027 244)',
	900: 'oklch(0.250 0.020 244)',
	950: 'oklch(0.200 0.018 244)'
};


export const ruby = {
	50:  'oklch(0.960 0.015 24)',
	100: 'oklch(0.910 0.038 24)',
	200: 'oklch(0.790 0.090 22)',
	300: 'oklch(0.700 0.140 24)',
	400: 'oklch(0.630 0.180 28)',
	500: 'oklch(0.550 0.215 31)',
	600: 'oklch(0.450 0.175 31)',
	700: 'oklch(0.360 0.130 32)',
	800: 'oklch(0.280 0.090 34)',
	900: 'oklch(0.180 0.060 35)',
	950: 'oklch(0.130 0.045 35)'
};

export const primary   = blueGrey;
export const secondary = ruby;
