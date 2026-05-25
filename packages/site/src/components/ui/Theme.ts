'use client';

import type {} from '@mui/x-data-grid/themeAugmentation';
import {LinkBehavior} from '@gtibrett/mui-additions/next';
import {createTheme, useMediaQuery} from '@mui/material';
import {tokens} from '@/lib/tokens';
import {useMemo} from 'react';

const {spacing} = createTheme({spacing: 8});

// Single MUI theme — palette values reference Tailwind CSS vars defined in
// `src/app/globals.css`. Mode switching happens entirely in CSS via the
// `prefers-color-scheme` media query (which flips the `--brand-*` vars
// the `--color-*` aliases point at). No `cssVariables: true`, no
// `colorSchemes`, no `applyStyles` — Tailwind is the driver.
//
// `palette.mode` is left at the default ('light'). MUI's runtime never
// resolves colors from it at paint time because every value is a CSS var
// that the browser swaps per the OS scheme.
const effTheme = createTheme({
	palette: {
		contrastThreshold: 4.5,
		primary:    {
			main:         'var(--color-primary)',
			light:        'var(--color-primary-light)',
			dark:         'var(--color-primary-dark)',
			contrastText: 'var(--color-primary-contrast)'
		},
		secondary:  {
			main:         'var(--color-secondary)',
			light:        'var(--color-secondary-light)',
			dark:         'var(--color-secondary-dark)',
			contrastText: 'var(--color-secondary-contrast)'
		},
		background: {
			default: 'var(--color-background)',
			paper:   'var(--color-background-paper)'
		},
		text:       {
			primary:   'var(--color-text-primary)',
			secondary: 'var(--color-text-secondary)',
			disabled:  'var(--color-text-disabled)'
		},
		divider:    'var(--color-divider)',
		// Augmented set (light/dark/contrastText all explicit) — without these
		// MUI's createPalette calls lighten()/darken() on `main` to derive
		// variants, which fails on var() strings.
		success:    {main: 'var(--color-success)', light: 'var(--color-success)', dark: 'var(--color-success)', contrastText: '#ffffff'},
		warning:    {main: 'var(--color-warning)', light: 'var(--color-warning)', dark: 'var(--color-warning)', contrastText: '#000000'},
		error:      {main: 'var(--color-error)',   light: 'var(--color-error)',   dark: 'var(--color-error)',   contrastText: '#ffffff'},
		info:       {main: 'var(--color-info)',    light: 'var(--color-info)',    dark: 'var(--color-info)',    contrastText: '#ffffff'}
	},
	spacing:    8,
	typography: {
		fontFamily: "'Titillium Web', sans-serif",
		h1:         {fontSize: 48},
		h2:         {fontSize: 24},
		h3:         {fontSize: 20},
		h4:         {fontSize: 16}
	},
	components: {
		MuiAlert:        {
			styleOverrides: {
				root:    {alignItems: 'center', padding: spacing(2, 4)},
				icon:    {marginRight: spacing(2)},
				message: {padding: 0, overflow: 'visible'}
			}
		},
		MuiCard:         {
			defaultProps:   {elevation: 0, variant: 'outlined'},
			styleOverrides: {root: {overflow: 'visible'}}
		},
		MuiCardHeader:   {
			defaultProps: {
				slotProps: {title: {variant: 'h3'}}
			}
		},
		MuiDataGrid:     {
			defaultProps:   {
				slotProps: {
					loadingOverlay: {
						//@ts-ignore
						variant:       'linear-progress',
						noRowsVariant: 'skeleton'
					}
				}
			},
			styleOverrides: {
				root: {
					border:                           0,
					'--DataGrid-containerBackground': 'var(--color-background-paper)'
				}
			}
		},
		MuiDialog:       {
			styleOverrides: {
				paper: {background: 'var(--color-background-paper)'}
			}
		},
		MuiBackdrop:     {
			styleOverrides: {
				root: {
					background:     'color-mix(in srgb, var(--color-primary-dark), transparent 25%)',
					backdropFilter: `blur(5px) grayscale(100%)`,
					zIndex:         100000
				}
			}
		},
		MuiLink:         {
			defaultProps: {component: LinkBehavior}
		},
		MuiListItemIcon: {
			styleOverrides: {root: {minWidth: 36}}
		},
		MuiMenuItem:     {
			styleOverrides: {
				root: {
					'&.Mui-selected': {
						backgroundColor: 'var(--color-secondary) !important',
						color:           'var(--color-secondary-contrast)'
					}
				}
			}
		},
		MuiTab:          {
			styleOverrides: {
				root: {
					'&.Mui-selected': {
						color:      'var(--color-text-primary)',
						fontWeight: 'bold'
					}
				}
			}
		},
		MuiToggleButton: {
			styleOverrides: {
				root: {
					padding:     spacing(.25, 1),
					borderColor: 'var(--color-secondary)',
					color:       'var(--color-secondary)',

					'&.Mui-selected':   {
						backgroundColor: 'var(--color-secondary)',
						color:           'var(--color-secondary-contrast)'
					},
					'&:hover, &:focus': {
						backgroundColor: 'var(--color-primary) !important',
						color:           'var(--color-primary-contrast)'
					}
				}
			}
		}
	}
});

/**
 * Returns the stable app theme. Mode flipping is CSS-only (Tailwind
 * `--color-*` vars in `globals.css`); the theme object itself is constant.
 */
export const useEffTheme = (_overrideMode?: 'light' | 'dark') => {
	return useMemo(() => effTheme, []);
};

/**
 * Flat MUI theme with the OPPOSITE mode's concrete tokens. Used by Nivo
 * chart tooltips which render in a portal that doesn't reliably inherit
 * the OS color scheme — concrete hex values force the desired look.
 */
export const useInvertedTheme = () => {
	const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
	// Invert: when user prefers dark, tooltip uses light theme.
	const invertedMode = prefersDark ? 'light' : 'dark';
	const t            = tokens[invertedMode];

	return useMemo(() => createTheme({
		spacing:    8,
		palette:    {
			mode:              invertedMode,
			contrastThreshold: 4.5,
			primary:           t.primary,
			secondary:         t.secondary,
			background:        t.background,
			text:              t.text,
			divider:           t.divider
		},
		typography: {fontFamily: "'Titillium Web', sans-serif"}
	}), [invertedMode, t]);
};

/**
 * Reads OS dark-mode preference. Re-renders the calling component on flip.
 * Use only in chart/map islands that need JS-side color decisions; CSS-
 * renderable values should reference the `--color-*` vars directly.
 */
export const useDarkMode      = () => useMediaQuery('(prefers-color-scheme: dark)');

/**
 * Fallback color (CSS var) used when team color is unavailable. Renders
 * correctly in MUI sx, inline style, and SVG fill/stroke contexts.
 */
export const useFallbackColor = () => 'var(--color-primary)';
