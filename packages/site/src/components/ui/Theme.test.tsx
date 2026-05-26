import { useTheme } from '@mui/material';
import { renderHook } from '@testing-library/react';

import { setDarkMode } from '@/jest';

import { useDarkMode, useEffTheme, useFallbackColor, useInvertedTheme } from './Theme';

describe('Theme.ts', () => {
	describe('useEffTheme', () => {
		test('exposes theme.vars CSS-var strings so components paint via vars', () => {
			// theme.vars holds `var(--mui-palette-*)` strings — MUI internals prefer them, drives dark-mode flip.
			const { result } = renderHook(() => useTheme());
			const vars = (result.current as any).vars;
			expect(vars).toBeDefined();
			expect(vars.palette.primary.main).toMatch(/^var\(--mui-palette-primary-main/);
			expect(vars.palette.background.paper).toMatch(/^var\(--mui-palette-background-paper/);
		});

		test('emits both light and dark colorSchemes', () => {
			const { result } = renderHook(() => useTheme());
			const schemes = (result.current as any).colorSchemes;
			expect(schemes?.light).toBeDefined();
			expect(schemes?.dark).toBeDefined();
		});

		test('returns stable reference across renders', () => {
			const { result, rerender } = renderHook(() => useTheme());
			const first = result.current;
			rerender();
			expect(result.current).toBe(first);
		});
	});

	test('useInvertedTheme returns opposite mode of OS preference', () => {
		setDarkMode(false);
		const { result: lightOs } = renderHook(() => useInvertedTheme());
		expect(lightOs.current.palette.mode).toBe('dark');

		setDarkMode(true);
		const { result: darkOs } = renderHook(() => useInvertedTheme());
		expect(darkOs.current.palette.mode).toBe('light');
	});

	test('useDarkMode reflects OS preference', () => {
		setDarkMode(false);
		const { result: light } = renderHook(() => useDarkMode());
		expect(light.current).toBe(false);

		setDarkMode(true);
		const { result: dark } = renderHook(() => useDarkMode());
		expect(dark.current).toBe(true);
	});

	test('useFallbackColor returns the MUI palette primary var', () => {
		const { result } = renderHook(() => useFallbackColor());
		expect(result.current).toBe('var(--mui-palette-primary-main)');
	});
});
