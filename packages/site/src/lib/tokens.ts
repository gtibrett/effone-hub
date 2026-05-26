/**
 * CSS var refs for palette tokens (emitted by MUI cssVariables + colorSchemes in Theme.ts).
 * Use `cssVar.X` when JS must produce a CSS-consumed string (SVG attrs, Nivo, inline style).
 * For pure-CSS contexts, prefer Tailwind utilities.
 */

export type ColorScheme = 'light' | 'dark';

export const cssVar = {
	primary:    {
		main:         'var(--mui-palette-primary-main)',
		light:        'var(--mui-palette-primary-light)',
		dark:         'var(--mui-palette-primary-dark)',
		contrastText: 'var(--mui-palette-primary-contrastText)'
	},
	secondary:  {
		main:         'var(--mui-palette-secondary-main)',
		light:        'var(--mui-palette-secondary-light)',
		dark:         'var(--mui-palette-secondary-dark)',
		contrastText: 'var(--mui-palette-secondary-contrastText)'
	},
	background: {
		default: 'var(--mui-palette-background-default)',
		paper:   'var(--mui-palette-background-paper)'
	},
	text:       {
		primary:   'var(--mui-palette-text-primary)',
		secondary: 'var(--mui-palette-text-secondary)',
		disabled:  'var(--mui-palette-text-disabled)'
	},
	divider:    'var(--mui-palette-divider)',
	success:    'var(--mui-palette-success-main)',
	warning:    'var(--mui-palette-warning-main)',
	error:      'var(--mui-palette-error-main)',
	info:       'var(--mui-palette-info-main)'
} as const;
