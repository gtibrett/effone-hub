'use client';

import { useMemo } from 'react';
import { default as NextLink } from 'next/link';
import { createTheme, ThemeOptions, useMediaQuery } from '@mui/material';
import type {} from '@mui/x-data-grid/themeAugmentation';

/**
 * Source of truth for design tokens. `cssVariables.nativeColor: true` keeps OKLCH literals
 * verbatim (no decomposeColor) — requires zero JS color math on palette values.
 * Tailwind globals.css `@theme inline` mirrors these into utility tokens.
 */
import { blue, blueGrey, red } from '@/components/ui/colors';

const { spacing } = createTheme({ spacing: 8 });

const white = 'oklch(0.968 0.003 286.81)';
const black = 'oklch(0.200 0.018 244)';

const lightPalette: ThemeOptions['palette'] = {
	mode: 'light',
	primary: { main: blue[500], light: blue[300], dark: blue[700], contrastText: white },
	secondary: { main: red[500], light: red[300], dark: red[700], contrastText: black },
	background: { default: blueGrey[200], paper: white },
	text: {
		primary: 'oklch(0 0 0 / 0.87)',
		secondary: 'oklch(0 0 0 / 0.6)',
		disabled: 'oklch(0 0 0 / 0.38)'
	},
	divider: 'oklch(0 0 0 / 0.12)',
	success: { main: '#2e7d32', contrastText: white },
	warning: { main: '#ed6c02', contrastText: black },
	error: { main: '#d32f2f', contrastText: white },
	info: { main: '#0288d1', contrastText: white }
};

const darkPalette: ThemeOptions['palette'] = {
	mode: 'dark',
	primary: { main: blue[500], light: blue[300], dark: blue[700], contrastText: white },
	secondary: { main: red[500], light: red[300], dark: red[700], contrastText: black },
	background: { default: blueGrey[800], paper: blueGrey[900] },
	text: {
		primary: white,
		secondary: 'oklch(1 0 0 / 0.7)',
		disabled: 'oklch(1 0 0 / 0.5)'
	},
	divider: 'oklch(1 0 0 / 0.12)',
	success: { main: '#66bb6a', contrastText: black },
	warning: { main: '#ffa726', contrastText: black },
	error: { main: '#f44336', contrastText: white },
	info: { main: '#29b6f6', contrastText: black }
};

export const effTheme = createTheme({
	colorSchemes: {
		light: { palette: lightPalette },
		dark: { palette: darkPalette }
	},
	cssVariables: {
		nativeColor: true,
		colorSchemeSelector: 'media',
		cssVarPrefix: 'mui'
	},
	spacing: 8,
	typography: {
		fontFamily: 'var(--font-titillium), sans-serif',
		h1: { fontSize: 48 },
		h2: { fontSize: 24 },
		h3: { fontSize: 20 },
		h4: { fontSize: 16 }
	},
	components: {
		MuiAlert: {
			styleOverrides: {
				root: { alignItems: 'center', padding: spacing(2, 4) },
				icon: { marginRight: spacing(2) },
				message: { padding: 0, overflow: 'visible' }
			}
		},
		MuiCard: {
			defaultProps: { elevation: 0, variant: 'outlined' },
			styleOverrides: { root: { overflow: 'visible' } }
		},
		MuiCardHeader: {
			defaultProps: {
				slotProps: { title: { variant: 'h3' } }
			}
		},
		MuiDataGrid: {
			defaultProps: {
				slotProps: {
					loadingOverlay: {
						//@ts-ignore
						variant: 'linear-progress',
						noRowsVariant: 'skeleton'
					}
				}
			},
			styleOverrides: {
				root: {
					border: 0,
					'--DataGrid-containerBackground': 'var(--mui-palette-background-paper)'
				}
			}
		},
		MuiDialog: {
			styleOverrides: {
				paper: { background: 'var(--mui-palette-background-paper)' }
			}
		},
		MuiBackdrop: {
			defaultProps: {
				className: 'bg-primary-900'
			},
			styleOverrides: {
				root: {
					backdropFilter: `blur(5px) grayscale(50%)`,
					zIndex: 100000
				}
			}
		},
		MuiLink: {
			defaultProps: { component: NextLink }
		},
		MuiListItemIcon: {
			styleOverrides: { root: { minWidth: 36 } }
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					'&.Mui-selected': {
						backgroundColor: 'var(--mui-palette-secondary-main) !important',
						color: 'var(--mui-palette-secondary-contrastText)'
					}
				}
			}
		},
		MuiTab: {
			styleOverrides: {
				root: {
					'&.Mui-selected': {
						color: 'var(--mui-palette-text-primary)',
						fontWeight: 'bold'
					}
				}
			}
		},
		MuiToggleButton: {
			styleOverrides: {
				root: {
					padding: spacing(0.25, 1),
					borderColor: 'var(--mui-palette-secondary-main)',
					color: 'var(--mui-palette-secondary-main)',

					'&.Mui-selected': {
						backgroundColor: 'var(--mui-palette-secondary-main)',
						color: 'var(--mui-palette-secondary-contrastText)'
					},
					'&:hover, &:focus': {
						backgroundColor: 'var(--mui-palette-primary-main) !important',
						color: 'var(--mui-palette-primary-contrastText)'
					}
				}
			}
		}
	}
});

/**
 * FROZEN-opposite-scheme theme for Nivo tooltips. Portal-rendered tooltips don't inherit
 * cssVar scoping, so they get a flat theme built from concrete OPPOSITE-scheme OKLCH tokens.
 */
export const useInvertedTheme = () => {
	const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
	const palette = prefersDark ? lightPalette : darkPalette;

	return useMemo(
		() =>
			createTheme({
				palette
			}),
		[palette]
	);
};

export const useDarkTheme = () =>
	createTheme(effTheme, {
		palette: darkPalette
	});

/** Reads OS dark-mode preference. Use only in chart/map islands needing JS-side scheme branching. */
export const useDarkMode = () => useMediaQuery('(prefers-color-scheme: dark)');

/** Fallback when team color missing. Returns `--mui-palette-*` ref — flips with OS scheme. */
export const useFallbackColor = () => 'var(--mui-palette-primary-main)';
