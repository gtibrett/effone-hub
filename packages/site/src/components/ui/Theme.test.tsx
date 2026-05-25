import {setDarkMode} from '@/jest';
import {renderHook} from '@testing-library/react';
import {useDarkMode, useEffTheme, useFallbackColor, useInvertedTheme} from './Theme';

describe('Theme.ts', () => {
	describe('useEffTheme', () => {
		test('exposes cssVariables config', () => {
			const {result} = renderHook(() => useEffTheme());
			const theme    = result.current as any;
			// Under cssVariables mode the prefix is set
			expect(theme.cssVarPrefix).toBe('mui');
			// colorSchemes contain both light + dark palettes
			expect(theme.colorSchemes.light.palette.primary.main).toBe('#37474f');
			expect(theme.colorSchemes.dark.palette.primary.main).toBe('#78909c');
			expect(theme.colorSchemes.light.palette.secondary.main).toBe('#bf360c');
			expect(theme.colorSchemes.dark.palette.secondary.main).toBe('#ffab91');
		});

		test('returns stable reference across renders (no re-memoization)', () => {
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

	test('useFallbackColor returns a usable color string', () => {
		const {result} = renderHook(() => useFallbackColor());
		// Either CSS var string (cssVars mode) or a hex
		expect(result.current).toMatch(/^(var\(--mui-|#)/);
	});
});
