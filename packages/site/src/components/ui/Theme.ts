'use client';

import type {} from '@mui/x-data-grid/themeAugmentation';
import {LinkBehavior} from '@gtibrett/mui-additions/next';
import {createTheme, useMediaQuery} from '@mui/material';
import {tokens, type SchemeTokens} from '@/lib/tokens';
import {useMemo} from 'react';

const {spacing} = createTheme({spacing: 8});

// Build a MUI Palette object from one of our SchemeTokens. The single-string
// status colors (success/warning/error/info) expand into PaletteColor shape so
// MUI's createTheme can derive the helper variants.
const buildPalette = (t: SchemeTokens, mode: 'light' | 'dark') => ({
	mode,
	contrastThreshold: 4.5,
	primary:    t.primary,
	secondary:  t.secondary,
	background: t.background,
	text:       t.text,
	divider:    t.divider,
	success:    {main: t.success, contrastText: mode === 'light' ? '#ffffff' : '#000000'},
	warning:    {main: t.warning, contrastText: '#000000'},
	error:      {main: t.error,   contrastText: '#ffffff'},
	info:       {main: t.info,    contrastText: '#ffffff'}
});

// MUI v9 cssVariables + colorSchemes: theme emits CSS vars for both schemes
// and picks at runtime via the `prefers-color-scheme` media query (matches
// our globals.css strategy). Every MUI component reading `theme.palette.X`
// now resolves through a var that flips with the OS — Card/Paper/Typography
// dark-mode rendering is correct without per-component overrides.
const effTheme = createTheme({
	colorSchemes: {
		light: {palette: buildPalette(tokens.light, 'light')},
		dark:  {palette: buildPalette(tokens.dark,  'dark')}
	},
	cssVariables: {
		colorSchemeSelector: 'media',
		cssVarPrefix:        'mui'
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
					'--DataGrid-containerBackground': 'var(--mui-palette-background-paper)'
				}
			}
		},
		MuiDialog:       {
			styleOverrides: {
				paper: {background: 'var(--mui-palette-background-paper)'}
			}
		},
		MuiBackdrop:     {
			styleOverrides: {
				root: {
					background:     'color-mix(in srgb, var(--mui-palette-primary-dark), transparent 25%)',
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
						backgroundColor: 'var(--mui-palette-secondary-main) !important',
						color:           'var(--mui-palette-secondary-contrastText)'
					}
				}
			}
		},
		MuiTab:          {
			styleOverrides: {
				root: {
					'&.Mui-selected': {
						color:      'var(--mui-palette-text-primary)',
						fontWeight: 'bold'
					}
				}
			}
		},
		MuiToggleButton: {
			styleOverrides: {
				root: {
					padding:     spacing(.25, 1),
					borderColor: 'var(--mui-palette-secondary-main)',
					color:       'var(--mui-palette-secondary-main)',

					'&.Mui-selected':   {
						backgroundColor: 'var(--mui-palette-secondary-main)',
						color:           'var(--mui-palette-secondary-contrastText)'
					},
					'&:hover, &:focus': {
						backgroundColor: 'var(--mui-palette-primary-main) !important',
						color:           'var(--mui-palette-primary-contrastText)'
					}
				}
			}
		}
	}
});

/**
 * Returns the app theme. Mode flipping is handled by MUI's cssVariables
 * layer (see colorSchemes above) — every palette read resolves through a
 * CSS var that the browser picks based on `prefers-color-scheme`.
 */
export const useEffTheme = (_overrideMode?: 'light' | 'dark') => effTheme;

/**
 * FROZEN-opposite-scheme theme for Nivo chart tooltips. Tooltips render
 * in a React portal that doesn't reliably inherit cssVar scoping, so they
 * get a flat MUI theme built from the OPPOSITE scheme's concrete hex
 * values. Hook re-renders when the OS preference flips.
 */
export const useInvertedTheme = () => {
	const prefersDark  = useMediaQuery('(prefers-color-scheme: dark)');
	const invertedMode = prefersDark ? 'light' : 'dark';
	const t            = tokens[invertedMode];

	return useMemo(() => createTheme({
		spacing:    8,
		palette:    buildPalette(t, invertedMode),
		typography: {fontFamily: "'Titillium Web', sans-serif"}
	}), [invertedMode, t]);
};

/**
 * Reads OS dark-mode preference. Re-renders the calling component on flip.
 * Use only in chart/map islands that need JS-side scheme branching.
 */
export const useDarkMode = () => useMediaQuery('(prefers-color-scheme: dark)');

/**
 * Fallback color (CSS var) used when team color is unavailable. Returns
 * a globals.css var that flips with the OS scheme; SVG fill/stroke and
 * MUI sx contexts both resolve it correctly.
 */
export const useFallbackColor = () => 'var(--color-primary)';
