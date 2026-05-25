/**
 * JS mirror of the CSS color tokens defined in `src/app/globals.css`.
 *
 * CSS is the source of truth for paint (auto-flips via `prefers-color-scheme`)
 * and uses display-p3 wide-gamut color values from `components/ui/colors.ts`.
 * This mirror exists for JS color math — `decomposeColor`, `getContrastRatio`,
 * etc. which DO NOT understand `color(display-p3 ...)` syntax. The sRGB hex
 * values below are visual equivalents of the display-p3 shades, accurate
 * enough for contrast / accessibility calculations.
 *
 * Shade-to-hex mapping derived from MUI's blueGrey + a ruby-equivalent set.
 * KEEP IN SYNC with `globals.css` and `components/ui/colors.ts`.
 */

export type ColorScheme = 'light' | 'dark';

export type SchemeTokens = {
	primary:    {main: string; light: string; dark: string; contrastText: string};
	secondary:  {main: string; light: string; dark: string; contrastText: string};
	background: {default: string; paper: string};
	text:       {primary: string; secondary: string; disabled: string};
	divider:    string;
	success:    string;
	warning:    string;
	error:      string;
	info:       string;
};

// sRGB equivalents of the display-p3 shades in components/ui/colors.ts
const blueGreySrgb = {
	200: '#cfd8dc',
	300: '#90a4ae',
	400: '#78909c',
	500: '#607d8b',
	600: '#546e7a',
	800: '#37474f',
	900: '#263238'
};

const rubySrgb = {
	200: '#f8bebb',
	300: '#f59b98',
	500: '#f24236',
	700: '#94231b',
	900: '#3f0906',
	950: '#2d0603'
};

export const tokens: Record<ColorScheme, SchemeTokens> = {
	light: {
		primary:    {main: blueGreySrgb[800], light: blueGreySrgb[600], dark: blueGreySrgb[900], contrastText: '#ffffff'},
		secondary:  {main: rubySrgb[900], light: rubySrgb[700], dark: rubySrgb[950], contrastText: '#ffffff'},
		background: {default: blueGreySrgb[200], paper: '#ffffff'},
		text:       {primary: 'rgba(0, 0, 0, 0.87)', secondary: 'rgba(0, 0, 0, 0.6)', disabled: 'rgba(0, 0, 0, 0.38)'},
		divider:    'rgba(0, 0, 0, 0.12)',
		success:    '#2e7d32',
		warning:    '#ed6c02',
		error:      '#d32f2f',
		info:       '#0288d1'
	},
	dark:  {
		primary:    {main: blueGreySrgb[400], light: blueGreySrgb[300], dark: blueGreySrgb[500], contrastText: '#ffffff'},
		secondary:  {main: rubySrgb[300], light: rubySrgb[200], dark: rubySrgb[500], contrastText: '#000000'},
		background: {default: blueGreySrgb[800], paper: blueGreySrgb[900]},
		text:       {primary: '#ffffff', secondary: 'rgba(255, 255, 255, 0.7)', disabled: 'rgba(255, 255, 255, 0.5)'},
		divider:    'rgba(255, 255, 255, 0.12)',
		success:    '#66bb6a',
		warning:    '#ffa726',
		error:      '#f44336',
		info:       '#29b6f6'
	}
};

/**
 * CSS var references for palette tokens. Pass these wherever CSS resolves
 * them (MUI palette, sx, inline style, SVG fill/stroke). Auto-flip with
 * the OS color scheme.
 */
export const cssVar = {
	primary:    {main: 'var(--color-primary)', light: 'var(--color-primary-light)', dark: 'var(--color-primary-dark)', contrastText: 'var(--color-primary-contrast)'},
	secondary:  {main: 'var(--color-secondary)', light: 'var(--color-secondary-light)', dark: 'var(--color-secondary-dark)', contrastText: 'var(--color-secondary-contrast)'},
	background: {default: 'var(--color-background)', paper: 'var(--color-background-paper)'},
	text:       {primary: 'var(--color-text-primary)', secondary: 'var(--color-text-secondary)', disabled: 'var(--color-text-disabled)'},
	divider:    'var(--color-divider)',
	success:    'var(--color-success)',
	warning:    'var(--color-warning)',
	error:      'var(--color-error)',
	info:       'var(--color-info)'
} as const;
