'use client';

/**
 * Legacy theme hooks. After M12 dropped MUI, the bulky
 * `createTheme(...components: {...}})` block was deleted — those style
 * overrides were MUI-specific selectors that have no consumer. We keep
 * the four hooks (`useEffTheme`, `useInvertedTheme`, `useDarkMode`,
 * `useFallbackColor`) since several non-trivial callers (Nivo charts,
 * RaceWeekend) still rely on a MUI-shaped object.
 *
 * Internally each hook just delegates to `@/lib/theme` and the
 * (prefers-color-scheme)/`.dark` class watcher already wired up there.
 */
import {useMemo} from 'react';
import {useTheme} from '@/lib/theme';
import useMediaQuery from '@/hooks/useMediaQuery';
import {blueGrey, deepOrange} from '@/lib/muiColors';
import {alpha as alphaFn, getContrastText, lighten as lightenFn, darken as darkenFn} from '@/lib/color';

const primary   = blueGrey;
const secondary = deepOrange;

type EffTheme = ReturnType<typeof useTheme>;

function buildTheme(prefersDarkMode: boolean): EffTheme {
	const primaryMain   = primary[prefersDarkMode ? 400 : 800];
	const secondaryMain = secondary[prefersDarkMode ? 200 : 900];

	return {
		palette: {
			mode:      prefersDarkMode ? 'dark' : 'light',
			primary:   {
				main:         primaryMain,
				light:        lightenFn(primaryMain, .2),
				dark:         darkenFn(primaryMain, .2),
				contrastText: getContrastText(primaryMain)
			},
			secondary: {
				main:         secondaryMain,
				light:        lightenFn(secondaryMain, .2),
				dark:         darkenFn(secondaryMain, .2),
				contrastText: getContrastText(secondaryMain)
			},
			error:   {main: prefersDarkMode ? '#ef5350' : '#d32f2f', light: '#ef9a9a', dark: '#c62828'},
			warning: {main: '#ffa726', light: '#ffb74d', dark: '#f57c00'},
			info:    {main: '#29b6f6', light: '#4fc3f7', dark: '#0288d1'},
			success: {main: '#66bb6a', light: '#81c784', dark: '#388e3c'},
			background: {
				paper:   prefersDarkMode ? primary[900] : '#fff',
				default: prefersDarkMode ? primary[800] : primary[200]
			},
			text: {
				primary:   prefersDarkMode ? '#fff' : 'rgba(0, 0, 0, 0.87)',
				secondary: prefersDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
				disabled:  prefersDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.38)'
			},
			divider: prefersDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
			common:  {white: '#fff', black: '#000'},
			action:  {
				hover:    prefersDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
				selected: prefersDarkMode ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.08)',
				disabled: prefersDarkMode ? 'rgba(255, 255, 255, 0.3)'  : 'rgba(0, 0, 0, 0.26)',
				active:   prefersDarkMode ? '#fff' : 'rgba(0, 0, 0, 0.54)',
				focus:    prefersDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'
			},
			grey: primary,
			getContrastText
		},
		spacing: (...args: Array<number | string>) => {
			if (args.length === 0) return '8px';
			return args.map(a => typeof a === 'number' ? `${a * 8}px` : a).join(' ');
		},
		typography: {
			fontFamily: "'Titillium Web', sans-serif",
			caption:    {fontSize: '0.75rem'},
			subtitle1:  {fontSize: '1rem'},
			h1:         {fontSize: 48},
			h2:         {fontSize: 24},
			h3:         {fontSize: 20},
			h4:         {fontSize: 16}
		},
		breakpoints: {
			down: (key) => `(max-width: ${({xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536}[key] ?? 0) - 0.05}px)`,
			up:   (key) => `(min-width: ${{xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536}[key] ?? 0}px)`
		},
		zIndex: {fab: 1050, modal: 1300, tooltip: 1500}
	};
}

export const useEffTheme = (overrideMode?: 'light' | 'dark'): EffTheme => {
	const colorSchemePreference = useMediaQuery('(prefers-color-scheme: dark)');
	const prefersDarkMode       = (colorSchemePreference && overrideMode !== 'light') || overrideMode === 'dark';
	return useMemo(() => buildTheme(prefersDarkMode), [prefersDarkMode]);
};

export const useInvertedTheme = () => {
	const theme = useTheme();
	return useEffTheme(theme.palette.mode === 'light' ? 'dark' : 'light');
};

export const useDarkMode      = () => useTheme().palette.mode === 'dark';
export const useFallbackColor = () => useTheme().palette.primary.main;

export {alphaFn as alpha};
