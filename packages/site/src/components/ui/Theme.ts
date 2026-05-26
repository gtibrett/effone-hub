'use client';

/**
 * MUI is the single source of truth for design tokens. createTheme with
 * `cssVariables: {nativeColor: true, colorSchemeSelector: 'media'}` emits
 * `--mui-palette-*` CSS vars for both light and dark schemes, picked by
 * the browser via @media (prefers-color-scheme). Tailwind v4 (globals.css
 * @theme inline) reads those vars into utility tokens (`bg-primary`,
 * `text-secondary`, ...) for parity.
 *
 * `nativeColor: true` keeps the OKLCH color literals from `colors.ts`
 * verbatim in the emitted vars — no decomposeColor normalization. Pair
 * with no JS color math on palette values (we removed all of it in an
 * earlier phase). MUI internal styles needing alpha/darken/lighten emit
 * `color-mix()` expressions, not JS.
 */

import {blueGrey, red} from '@/components/ui/colors';
import type {} from '@mui/x-data-grid/themeAugmentation';
import {createTheme, useMediaQuery} from '@mui/material';
import {default as NextLink} from 'next/link';
import {useMemo} from 'react';

const {spacing} = createTheme({spacing: 8});

// Light palette — darker shades against white backgrounds.
const lightPalette = {
	mode:              'light' as const,
	contrastThreshold: 4.5,
	primary:           {main: blueGrey[800], light: blueGrey[600], dark: blueGrey[900], contrastText: '#F4F4F6'},
	secondary:         {main: red[900], light: red[700], dark: red[950], contrastText: '#F4F4F6'},
	background:        {default: blueGrey[200], paper: '#F4F4F6'},
	text:              {primary: 'rgba(0, 0, 0, 0.87)', secondary: 'rgba(0, 0, 0, 0.6)', disabled: 'rgba(0, 0, 0, 0.38)'},
	divider:           'rgba(0, 0, 0, 0.12)',
	success:           {main: '#2e7d32', contrastText: '#F4F4F6'},
	warning:           {main: '#ed6c02', contrastText: '#000'},
	error:             {main: '#d32f2f', contrastText: '#F4F4F6'},
	info:              {main: '#0288d1', contrastText: '#F4F4F6'}
};

// Dark palette — lighter shades against dark backgrounds.
const darkPalette = {
	mode:              'dark' as const,
	contrastThreshold: 4.5,
	primary:           {main: blueGrey[400], light: blueGrey[300], dark: blueGrey[500], contrastText: '#F4F4F6'},
	secondary:         {main: red[500], light: red[300], dark: red[700], contrastText: '#000'},
	background:        {default: blueGrey[800], paper: blueGrey[900]},
	text:              {primary: '#F4F4F6', secondary: 'rgba(255, 255, 255, 0.7)', disabled: 'rgba(255, 255, 255, 0.5)'},
	divider:           'rgba(255, 255, 255, 0.12)',
	success:           {main: '#66bb6a', contrastText: '#000'},
	warning:           {main: '#ffa726', contrastText: '#000'},
	error:             {main: '#f44336', contrastText: '#F4F4F6'},
	info:              {main: '#29b6f6', contrastText: '#000000'}
};

const effTheme = createTheme({
	colorSchemes: {
		light: {palette: lightPalette},
		dark:  {palette: darkPalette}
	},
	cssVariables: {
		nativeColor:         true,
		colorSchemeSelector: 'media',
		cssVarPrefix:        'mui'
	},
	spacing:      8,
	typography:   {
		fontFamily: "var(--font-titillium), sans-serif",
		h1:         {fontSize: 48},
		h2:         {fontSize: 24},
		h3:         {fontSize: 20},
		h4:         {fontSize: 16}
	},
	components:   {
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
			defaultProps: {component: NextLink}
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
 * Returns the app theme. Mode flipping handled by MUI's cssVariables +
 * colorSchemes layer (see colorSchemes above) — every palette read
 * resolves through a CSS var the browser picks based on the OS scheme.
 */
export const useEffTheme = (_overrideMode?: 'light' | 'dark') => effTheme;

/**
 * FROZEN-opposite-scheme theme for Nivo chart tooltips. Tooltips render
 * in a React portal that doesn't reliably inherit cssVar scoping, so they
 * get a flat MUI theme built from the OPPOSITE scheme's concrete OKLCH
 * tokens. Hook re-renders when the OS preference flips.
 */
export const useInvertedTheme = () => {
	const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
	const palette     = prefersDark ? lightPalette : darkPalette;
	
	return useMemo(() => createTheme({
		spacing:    8,
		palette,
		typography: {fontFamily: "var(--font-titillium), sans-serif"}
	}), [palette]);
};

/**
 * Reads OS dark-mode preference. Re-renders the calling component on flip.
 * Use only in chart/map islands that need JS-side scheme branching.
 */
export const useDarkMode = () => useMediaQuery('(prefers-color-scheme: dark)');

/**
 * Fallback color used when team color is unavailable. Returns a
 * `--mui-palette-*` reference so it flips with the OS scheme; SVG
 * fill/stroke and sx contexts both resolve it correctly.
 */
export const useFallbackColor = () => 'var(--mui-palette-primary-main)';
