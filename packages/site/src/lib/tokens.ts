/**
 * CSS var references for palette tokens. The actual values are emitted
 * by MUI's `cssVariables` + `colorSchemes` layer (see Theme.ts) as
 * `--mui-palette-*` vars that auto-flip via the prefers-color-scheme
 * media query. Tailwind v4 `@theme inline` (globals.css) aliases these
 * into `--color-*` for the utility classes.
 *
 * Use `cssVar.X` wherever JS needs to produce a string consumed by CSS
 * (SVG fill/stroke, Nivo theme, inline style). For pure CSS contexts,
 * prefer Tailwind utilities (`bg-primary`, `text-secondary`).
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
