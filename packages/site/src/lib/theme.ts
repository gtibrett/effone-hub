'use client';

/**
 * Local stand-in for `@mui/material/useTheme`. Returns an object shaped
 * like a MUI theme, but sourced from the CSS variables declared in
 * `globals.css` (set in M2) instead of a `<ThemeProvider/>` context.
 *
 * Lets every consumer that was reading
 *   const theme = useTheme();
 *   theme.palette.primary.main
 *   theme.spacing(2)
 *   theme.palette.getContrastText(bg)
 * keep working after M12 drops the MUI runtime.
 *
 * We only mirror the surface the codebase actually touches. The shape
 * is intentionally permissive (typed `any` on a few branches) so we
 * don't paint ourselves into a corner — once M12+ work fans out and
 * we can replace each callsite with a CSS-class or direct CSS-var
 * read, this hook deletes.
 */
import {useEffect, useState} from 'react';
import {getContrastText, lighten as lightenFn, darken as darkenFn, alpha} from './color';
import {blueGrey, deepOrange} from './muiColors';

type Palette = {
	mode:      'light' | 'dark';
	primary:   {main: string; light: string; dark: string; contrastText: string};
	secondary: {main: string; light: string; dark: string; contrastText: string};
	error:     {main: string; light: string; dark: string};
	warning:   {main: string; light: string; dark: string};
	info:      {main: string; light: string; dark: string};
	success:   {main: string; light: string; dark: string};
	background:{paper: string; default: string};
	text:      {primary: string; secondary: string; disabled: string};
	divider:   string;
	common:    {white: string; black: string};
	action:    {hover: string; selected: string; disabled: string; active: string; focus: string};
	grey:      Record<number, string>;
	getContrastText: (bg: string) => string;
};

type Theme = {
	palette:    Palette;
	spacing:    (...args: Array<number | string>) => string;
	typography: {
		fontFamily: string;
		caption:    {fontSize: string};
		subtitle1:  {fontSize: string};
		h1:         {fontSize: number};
		h2:         {fontSize: number};
		h3:         {fontSize: number};
		h4:         {fontSize: number};
	};
	breakpoints: {
		down: (key: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => string;
		up:   (key: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => string;
	};
	zIndex: {fab: number; modal: number; tooltip: number};
};

function paletteFor(mode: 'light' | 'dark'): Palette {
	const isDark = mode === 'dark';
	const primaryMain = isDark ? blueGrey[400] : blueGrey[800];
	const primaryLight = lightenFn(primaryMain, 0.2);
	const primaryDark = darkenFn(primaryMain, 0.2);
	const secondaryMain = isDark ? deepOrange[200] : deepOrange[900];
	const secondaryLight = lightenFn(secondaryMain, 0.2);
	const secondaryDark = darkenFn(secondaryMain, 0.2);
	const errorMain = isDark ? '#ef5350' : '#d32f2f';

	return {
		mode,
		primary: {
			main:         primaryMain,
			light:        primaryLight,
			dark:         primaryDark,
			contrastText: getContrastText(primaryMain)
		},
		secondary: {
			main:         secondaryMain,
			light:        secondaryLight,
			dark:         secondaryDark,
			contrastText: getContrastText(secondaryMain)
		},
		error:   {main: errorMain, light: lightenFn(errorMain, 0.2), dark: darkenFn(errorMain, 0.2)},
		warning: {main: '#ffa726', light: '#ffb74d', dark: '#f57c00'},
		info:    {main: '#29b6f6', light: '#4fc3f7', dark: '#0288d1'},
		success: {main: '#66bb6a', light: '#81c784', dark: '#388e3c'},
		background: {
			paper:   isDark ? blueGrey[900] : '#fff',
			default: isDark ? blueGrey[800] : blueGrey[200]
		},
		text: {
			primary:   isDark ? '#fff' : 'rgba(0, 0, 0, 0.87)',
			secondary: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
			disabled:  isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.38)'
		},
		divider: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
		common:  {white: '#fff', black: '#000'},
		action: {
			hover:    isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
			selected: isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.08)',
			disabled: isDark ? 'rgba(255, 255, 255, 0.3)'  : 'rgba(0, 0, 0, 0.26)',
			active:   isDark ? '#fff' : 'rgba(0, 0, 0, 0.54)',
			focus:    isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'
		},
		grey: blueGrey,
		getContrastText
	};
}

const BREAKPOINTS = {xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536} as const;

const SPACING_UNIT = 8;

function makeSpacing() {
	return (...args: Array<number | string>): string => {
		if (args.length === 0) return `${SPACING_UNIT}px`;
		const px = args.map(a => typeof a === 'number' ? `${a * SPACING_UNIT}px` : a);
		return px.join(' ');
	};
}

function defaultTheme(mode: 'light' | 'dark'): Theme {
	return {
		palette: paletteFor(mode),
		spacing: makeSpacing(),
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
			down: (key) => `@media (max-width:${BREAKPOINTS[key] - 0.05}px)`,
			up:   (key) => `@media (min-width:${BREAKPOINTS[key]}px)`
		},
		zIndex: {fab: 1050, modal: 1300, tooltip: 1500}
	};
}

function readMode(): 'light' | 'dark' {
	if (typeof window === 'undefined') return 'light';
	if (document.documentElement.classList.contains('dark')) return 'dark';
	if (document.documentElement.classList.contains('light')) return 'light';
	if (typeof window.matchMedia !== 'function') return 'light';
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useTheme(): Theme {
	const [mode, setMode] = useState<'light' | 'dark'>(() => readMode());

	useEffect(() => {
		setMode(readMode());
		if (typeof window.matchMedia !== 'function') return;
		const mq = window.matchMedia('(prefers-color-scheme: dark)');
		const handler = () => setMode(readMode());
		mq.addEventListener('change', handler);
		const obs = new MutationObserver(handler);
		obs.observe(document.documentElement, {attributes: true, attributeFilter: ['class']});
		return () => {
			mq.removeEventListener('change', handler);
			obs.disconnect();
		};
	}, []);

	return defaultTheme(mode);
}

export {alpha, lightenFn as lighten, darkenFn as darken};
export type {Theme, Palette};
