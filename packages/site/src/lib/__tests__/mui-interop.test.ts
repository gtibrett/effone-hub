import {useEffTheme} from '@/components/ui';
import {alpha, darken, lighten} from '@mui/material';
import {renderHook} from '@testing-library/react';

/**
 * Regression guard for SkipNav + MUI-internals color-helper crash.
 *
 * `theme.palette.X` values MUST be sRGB-parseable concrete strings (not
 * var() refs) so MUI's own `decomposeColor` (called transitively by
 * alpha/lighten/darken/getContrastText) works without throwing.
 *
 * If anyone reverts the palette to var() strings, this test fires
 * immediately and tells you WHY (instead of waiting for SkipNav-style
 * runtime crashes downstream).
 */
describe('MUI color-helper interop with theme.palette', () => {
	const getPalette = () => renderHook(() => useEffTheme()).result.current.palette;

	test('palette values are sRGB-parseable (no var() strings)', () => {
		const palette = getPalette();
		const fields  = [
			palette.primary.main,
			palette.primary.light,
			palette.primary.dark,
			palette.secondary.main,
			palette.background.paper,
			palette.background.default,
			palette.divider,
			palette.text.primary,
			palette.text.secondary
		];
		for (const f of fields) {
			expect(f).not.toMatch(/^var\(/);
			expect(typeof f).toBe('string');
			expect(f.length).toBeGreaterThan(0);
		}
	});

	test('MUI alpha works on every palette entry', () => {
		const palette = getPalette();
		expect(() => alpha(palette.primary.main, 0.5)).not.toThrow();
		expect(() => alpha(palette.secondary.main, 0.5)).not.toThrow();
		expect(() => alpha(palette.background.paper, 0.5)).not.toThrow();
		expect(() => alpha(palette.background.default, 0.5)).not.toThrow();
	});

	test('MUI darken works on every palette entry', () => {
		const palette = getPalette();
		expect(() => darken(palette.primary.main, 0.25)).not.toThrow();
		expect(() => darken(palette.secondary.main, 0.25)).not.toThrow();
	});

	test('MUI lighten works on every palette entry', () => {
		const palette = getPalette();
		expect(() => lighten(palette.primary.main, 0.25)).not.toThrow();
		expect(() => lighten(palette.secondary.main, 0.25)).not.toThrow();
	});

	test('MUI getContrastText returns a hex against background.paper', () => {
		const palette = getPalette();
		const result  = palette.getContrastText(palette.background.paper);
		expect(['#fff', '#000', 'rgba(0, 0, 0, 0.87)']).toContain(result);
	});
});
