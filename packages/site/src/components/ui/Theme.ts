'use client';

import type {} from '@mui/x-data-grid/themeAugmentation';
import {LinkBehavior} from '@gtibrett/mui-additions/next';
import {createTheme, useMediaQuery} from '@mui/material';
import {tokens} from '@/lib/tokens';
import {useMemo} from 'react';

const {spacing} = createTheme({spacing: 8});

// MUI palette uses CONCRETE sRGB hex values (light scheme) — not CSS vars.
//
// Reasoning: MUI internals and third-party components (e.g. SkipNav from
// @gtibrett/mui-additions) call `alpha()` / `darken()` / `lighten()` on
// theme.palette.X values, which feed `decomposeColor` — and decomposeColor
// only understands hex/rgb/hsl/color(), not var() strings. Putting var()
// strings in the palette makes every such caller throw at runtime.
//
// Mode-flipping for our own consumers is opt-in via CSS vars from
// `@/lib/tokens` (e.g. `cssVar.primary.main`) or via Tailwind utilities
// (`bg-primary`). Component styleOverrides below use var(--color-*) inline
// so they land in CSS and flip naturally via the prefers-color-scheme
// media query in globals.css.
const lightTokens = tokens.light;

const effTheme = createTheme({
	palette: {
		contrastThreshold: 4.5,
		primary:           lightTokens.primary,
		secondary:         lightTokens.secondary,
		background:        lightTokens.background,
		text:              lightTokens.text,
		divider:           lightTokens.divider,
		success:           {main: lightTokens.success, light: lightTokens.success, dark: lightTokens.success, contrastText: '#ffffff'},
		warning:           {main: lightTokens.warning, light: lightTokens.warning, dark: lightTokens.warning, contrastText: '#000000'},
		error:             {main: lightTokens.error,   light: lightTokens.error,   dark: lightTokens.error,   contrastText: '#ffffff'},
		info:              {main: lightTokens.info,    light: lightTokens.info,    dark: lightTokens.info,    contrastText: '#ffffff'}
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
				// var() lands in CSS — flips with the OS scheme.
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
 * Returns the stable app theme. Mode flipping for components that consume
 * `theme.palette.X` does NOT happen — those reads always resolve to the
 * light-scheme sRGB hex (see palette setup above). Mode-aware consumers
 * should import `cssVar` from `@/lib/tokens` and use `var(--color-*)`
 * strings directly.
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
	const prefersDark  = useMediaQuery('(prefers-color-scheme: dark)');
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
