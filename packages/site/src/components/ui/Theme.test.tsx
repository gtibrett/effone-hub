import {setDarkMode} from '@/jest';
import {renderHook} from '@testing-library/react';
import {useDarkMode, useEffTheme, useFallbackColor, useInvertedTheme} from './Theme';

describe('Theme.ts', () => {
	describe('useEffTheme', () => {
		test('palette references Tailwind CSS vars', () => {
			const {result} = renderHook(() => useEffTheme());
			const theme    = result.current;
			expect(theme.palette.primary.main).toBe('var(--color-primary)');
			expect(theme.palette.secondary.main).toBe('var(--color-secondary)');
			expect(theme.palette.background.default).toBe('var(--color-background)');
			expect(theme.palette.divider).toBe('var(--color-divider)');
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
