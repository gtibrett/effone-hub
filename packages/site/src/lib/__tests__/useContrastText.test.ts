import {getCssContrast, useContrastText} from '@/lib/useContrastText';
import {renderHook} from '@testing-library/react';

describe('useContrastText (CSS-only)', () => {
	test('returns sx with contrast-color() — no JS fallback', () => {
		const {result} = renderHook(() => useContrastText('#000000'));
		expect(result.current).toEqual({color: 'contrast-color(#000000 vs white, black)'});
	});

	test('passes var(--color-*) through verbatim — the function resolves at paint', () => {
		const {result} = renderHook(() => useContrastText('var(--color-primary)'));
		expect(result.current.color).toBe('contrast-color(var(--color-primary) vs white, black)');
	});

	test('passes oklch() through verbatim', () => {
		const {result} = renderHook(() => useContrastText('oklch(0.25 0.020 244)'));
		expect(result.current.color).toBe('contrast-color(oklch(0.25 0.020 244) vs white, black)');
	});

	test('getCssContrast emits the contrast-color() CSS function', () => {
		expect(getCssContrast('#37474f')).toBe('contrast-color(#37474f vs white, black)');
		expect(getCssContrast('var(--color-primary)')).toBe('contrast-color(var(--color-primary) vs white, black)');
	});
});
