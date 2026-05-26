import {setDarkMode} from '@/jest';
import {alpha, darken, lighten} from '@mui/material';
import {renderHook} from '@testing-library/react';
import {useDarkMode, useEffTheme, useFallbackColor, useInvertedTheme} from './Theme';

describe('Theme.ts', () => {
	describe('useEffTheme', () => {
		test('exposes theme.vars CSS-var strings so components paint via vars', () => {
			// MUI cssVariables exposes parallel `theme.vars.X` containing the
			// `var(--mui-palette-*)` strings. Internal components prefer
			// theme.vars when available, which is how dark-mode flipping works.
			const {result} = renderHook(() => useEffTheme());
			const vars     = (result.current as any).vars;
			expect(vars).toBeDefined();
			expect(vars.palette.primary.main).toMatch(/^var\(--mui-palette-primary-main/);
			expect(vars.palette.background.paper).toMatch(/^var\(--mui-palette-background-paper/);
		});

		test('emits both light and dark colorSchemes', () => {
			const {result}   = renderHook(() => useEffTheme());
			const schemes    = (result.current as any).colorSchemes;
			expect(schemes?.light).toBeDefined();
			expect(schemes?.dark).toBeDefined();
		});

		test('MUI color helpers (alpha/darken/lighten) work on palette values', () => {
			const {result} = renderHook(() => useEffTheme());
			const palette  = result.current.palette;
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
