import {getCssContrast, SUPPORTS_CONTRAST_COLOR, useContrastText} from '@/lib/useContrastText';
import {renderHook} from '@testing-library/react';

describe('useContrastText', () => {
	test('returns both JS fallback color and @supports CSS-only override', () => {
		const {result} = renderHook(() => useContrastText('#000000'));
		const sx       = result.current;

		// JS fallback layer
		expect(sx.color).toBe('rgb(255, 255, 255)');

		// CSS-only @supports override
		const supports = (sx as any)[SUPPORTS_CONTRAST_COLOR];
		expect(supports).toBeDefined();
		expect(supports.color).toBe('contrast-color(#000000 vs white, black)');
	});

	test('JS fallback picks correct color for known team-color fixtures', () => {
		// Mercedes teal — light bg, should pick black text
		expect(renderHook(() => useContrastText('#5fcfbe')).result.current.color).toBe('rgb(0, 0, 0)');
		// Red Bull navy — dark bg, should pick white text
		expect(renderHook(() => useContrastText('#1e1e2c')).result.current.color).toBe('rgb(255, 255, 255)');
	});

	test('JS fallback handles oklch literal inputs', () => {
		expect(renderHook(() => useContrastText('oklch(0.25 0.020 244)')).result.current.color).toBe('rgb(255, 255, 255)');
		expect(renderHook(() => useContrastText('oklch(0.95 0.005 236)')).result.current.color).toBe('rgb(0, 0, 0)');
	});

	test('getCssContrast emits the contrast-color() CSS function', () => {
		expect(getCssContrast('#37474f')).toBe('contrast-color(#37474f vs white, black)');
		expect(getCssContrast('var(--color-primary)')).toBe('contrast-color(var(--color-primary) vs white, black)');
	});

	test('SUPPORTS_CONTRAST_COLOR key matches the @supports gate exactly', () => {
		expect(SUPPORTS_CONTRAST_COLOR).toBe('@supports (color: contrast-color(white vs white, black))');
	});
});
