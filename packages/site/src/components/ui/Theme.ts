'use client';

import type {} from '@mui/x-data-grid/themeAugmentation';
import {LinkBehavior} from '@gtibrett/mui-additions/next';
import {alpha, createTheme, useMediaQuery, useTheme} from '@mui/material';
import {blueGrey, deepOrange} from '@mui/material/colors';
import {useMemo} from 'react';

const primary   = blueGrey;
const secondary = deepOrange;
const {spacing} = createTheme({spacing: 8});

// Build once at module load — under cssVariables mode the theme object is
// stable across light/dark switches (CSS vars handle the flip).
const effTheme = createTheme({
	cssVariables: {
		cssVarPrefix:        'mui',
		colorSchemeSelector: 'media'   // OS-only — driven by (prefers-color-scheme)
	},
	defaultColorScheme: 'light',
	colorSchemes: {
		light: {
			palette: {
				contrastThreshold: 4.5,
				primary:           {main: primary[800]},
				secondary:         {main: secondary[900]},
				background:        {paper: '#fff', default: primary[200]}
			}
		},
		dark:  {
			palette: {
				contrastThreshold: 4.5,
				primary:           {main: primary[400]},
				secondary:         {main: secondary[200]},
				background:        {paper: primary[900], default: primary[800]}
			}
		}
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
				root: ({theme}) => ({
					border:                           0,
					'--DataGrid-containerBackground': theme.vars.palette.background.paper
				})
			}
		},
		MuiDialog:       {
			styleOverrides: {
				paper: ({theme}) => ({
					background: theme.vars.palette.background.paper
				})
			}
		},
		MuiBackdrop:     {
			styleOverrides: {
				root: ({theme}) => ({
					background:     alpha(primary[900], .75),
					backdropFilter: `blur(5px) grayscale(100%)`,
					zIndex:         100000,
					...theme.applyStyles('dark', {
						background: alpha(primary[100], .5)
					})
				})
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
				root: ({theme}) => ({
					'&.Mui-selected': {
						backgroundColor: `${secondary[900]} !important`,
						color:           '#fff',
						...theme.applyStyles('dark', {
							backgroundColor: `${secondary[400]} !important`,
							color:           '#000'
						})
					}
				})
			}
		},
		MuiTab:          {
			styleOverrides: {
				root: ({theme}) => ({
					'&.Mui-selected': {
						color:      '#000',
						fontWeight: 'bold',
						...theme.applyStyles('dark', {color: '#fff'})
					}
				})
			}
		},
		MuiToggleButton: {
			styleOverrides: {
				root: ({theme}) => ({
					padding:     spacing(.25, 1),
					borderColor: secondary[900],
					color:       secondary[900],

					'&.Mui-selected':   {
						backgroundColor: secondary[900],
						color:           '#fff'
					},
					'&:hover, &:focus': {
						backgroundColor: `${primary[900]} !important`,
						color:           '#fff'
					},

					...theme.applyStyles('dark', {
						borderColor: secondary[400],
						color:       secondary[400],

						'&.Mui-selected':   {
							backgroundColor: secondary[400],
							color:           '#000'
						},
						'&:hover, &:focus': {
							backgroundColor: `${primary[400]} !important`,
							color:           '#000'
						}
					})
				})
			}
		}
	}
});

/**
 * Returns the stable app theme. Under cssVariables mode the theme object does
 * not change across light/dark mode flips — CSS handles the switch.
 *
 * `overrideMode` is no longer honored (legacy signature kept for back-compat
 * during the migration). Tests should read `theme.colorSchemes.{light|dark}`
 * directly.
 */
export const useEffTheme = (_overrideMode?: 'light' | 'dark') => {
	return useMemo(() => effTheme, []);
};

/**
 * Returns a flat (non-cssVars) theme with the OPPOSITE mode from OS preference.
 * Used by Nivo chart tooltips which render inside a portal that doesn't
 * inherit color-scheme CSS, so we need a JS-resolved palette they can read.
 */
export const useInvertedTheme = () => {
	const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
	// Invert: if user prefers dark, we want a light theme for the tooltip
	const invertedMode = prefersDark ? 'light' : 'dark';

	return useMemo(() => createTheme({
		spacing:    8,
		palette:    {
			mode:              invertedMode,
			contrastThreshold: 4.5,
			primary:           {main: primary[invertedMode === 'dark' ? 400 : 800]},
			secondary:         {main: secondary[invertedMode === 'dark' ? 200 : 900]},
			background:        {
				paper:   invertedMode === 'dark' ? primary[900] : '#fff',
				default: invertedMode === 'dark' ? primary[800] : primary[200]
			}
		},
		typography: {
			fontFamily: "'Titillium Web', sans-serif"
		}
	}), [invertedMode]);
};

/**
 * Read OS dark-mode preference. Rerenders the calling component on mode flip
 * (only use in chart/map islands that need to recompute SVG colors in JS).
 * For CSS-renderable values, prefer sx + theme.applyStyles('dark', {...})
 * which is fully CSS-driven and rerender-free.
 */
export const useDarkMode      = () => useMediaQuery('(prefers-color-scheme: dark)');

/**
 * Fallback color used when team color is not available. Under cssVars this
 * returns a CSS var string (e.g. `var(--mui-palette-primary-main)`), which is
 * valid as a CSS color value in SVG fills, CSS backgrounds, etc.
 */
export const useFallbackColor = () => {
	const theme = useTheme();
	return theme.vars?.palette.primary.main ?? theme.palette.primary.main;
};
