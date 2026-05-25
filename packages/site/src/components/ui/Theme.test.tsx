import {setDarkMode} from '@/jest';
import {alpha, darken, lighten} from '@mui/material';
import {renderHook} from '@testing-library/react';
import {useDarkMode, useEffTheme, useFallbackColor, useInvertedTheme} from './Theme';

describe('Theme.ts', () => {
	describe('useEffTheme', () => {
		test('palette holds CONCRETE sRGB-parseable values (not var() strings)', () => {
			// Regression guard for the SkipNav/MUI-internals crash:
			// MUI's decomposeColor (called transitively by alpha/lighten/darken)
			// throws on var(--color-*). If anyone reverts to var() palette
			// values, this test fails fast — and the assertions below confirm
			// that MUI's own helpers can still operate on the palette.
			const {result} = renderHook(() => useEffTheme());
			const palette  = result.current.palette;

			expect(palette.primary.main).not.toMatch(/^var\(/);
			expect(palette.secondary.main).not.toMatch(/^var\(/);
			expect(palette.background.paper).not.toMatch(/^var\(/);
			expect(palette.background.default).not.toMatch(/^var\(/);
			expect(palette.divider).not.toMatch(/^var\(/);

			// And MUI's color helpers must not throw on any palette value.
			expect(() => alpha(palette.background.paper, .5)).not.toThrow();
			expect(() => alpha(palette.primary.main, .5)).not.toThrow();
			expect(() => darken(palette.primary.main, .25)).not.toThrow();
			expect(() => lighten(palette.primary.main, .25)).not.toThrow();
		});

		test('returns stable reference across renders', () => {
			const {result, rerender} = renderHook(() => useEffTheme());
			const first              = result.current;
			rerender();
			expect(result.current).toBe(first);
		});
	});

	test('useInvertedTheme returns opposite mode of OS preference', () => {
		setDarkMode(false);
		const {result: lightOs} = renderHook(() => useInvertedTheme());
		expect(lightOs.current.palette.mode).toBe('dark');

		setDarkMode(true);
		const {result: darkOs} = renderHook(() => useInvertedTheme());
		expect(darkOs.current.palette.mode).toBe('light');
	});

	test('useDarkMode reflects OS preference', () => {
		setDarkMode(false);
		const {result: light} = renderHook(() => useDarkMode());
		expect(light.current).toBe(false);

		setDarkMode(true);
		const {result: dark} = renderHook(() => useDarkMode());
		expect(dark.current).toBe(true);
	});

	test('useFallbackColor returns the primary CSS var', () => {
		const {result} = renderHook(() => useFallbackColor());
		expect(result.current).toBe('var(--color-primary)');
	});
});
