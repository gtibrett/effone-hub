'use client';

/**
 * Source of truth for design tokens. `cssVariables.nativeColor: true` keeps OKLCH literals
 * verbatim (no decomposeColor) — requires zero JS color math on palette values.
 * Tailwind globals.css `@theme inline` mirrors these into utility tokens.
 */

import {blueGrey, red} from '@/components/ui/colors';
import type {} from '@mui/x-data-grid/themeAugmentation';
import {createTheme, useMediaQuery} from '@mui/material';
import {default as NextLink} from 'next/link';
import {useMemo} from 'react';

const {spacing} = createTheme({spacing: 8});

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

/** Returns the app theme. Mode flips via cssVariables + colorSchemes — palette reads resolve through CSS vars. */
export const useEffTheme = (_overrideMode?: 'light' | 'dark') => effTheme;

/**
 * FROZEN-opposite-scheme theme for Nivo tooltips. Portal-rendered tooltips don't inherit
 * cssVar scoping, so they get a flat theme built from concrete OPPOSITE-scheme OKLCH tokens.
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

/** Reads OS dark-mode preference. Use only in chart/map islands needing JS-side scheme branching. */
export const useDarkMode = () => useMediaQuery('(prefers-color-scheme: dark)');

/** Fallback when team color missing. Returns `--mui-palette-*` ref — flips with OS scheme. */
export const useFallbackColor = () => 'var(--mui-palette-primary-main)';
