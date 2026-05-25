import {decomposeColor, getContrastRatio, getContrastText, getLuminance, oklchToRgbString, resolveColorString} from '@/lib/color-utils';
import {tokens} from '@/lib/tokens';

describe('color-utils', () => {
	describe('oklchToRgbString', () => {
		test('converts oklch literal to rgb(r, g, b) string with channels in [0,255]', () => {
			const out = oklchToRgbString('oklch(0.5 0.1 240)');
			expect(out).toMatch(/^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$/);
			const [r, g, b] = out.match(/\d+/g)!.map(Number);
			for (const c of [r, g, b]) {
				expect(c).toBeGreaterThanOrEqual(0);
				expect(c).toBeLessThanOrEqual(255);
			}
		});

		test('preserves alpha when oklch input has an alpha component', () => {
			const out = oklchToRgbString('oklch(0.5 0.1 240 / 0.5)');
			expect(out).toMatch(/^rgba\(\d+, \d+, \d+, 0\.5\)$/);
		});

		test('returns input unchanged if not oklch', () => {
			expect(oklchToRgbString('#37474f')).toBe('#37474f');
			expect(oklchToRgbString('var(--color-primary)')).toBe('var(--color-primary)');
			expect(oklchToRgbString('rgb(120, 144, 156)')).toBe('rgb(120, 144, 156)');
		});
	});

	describe('resolveColorString', () => {
		test('resolves known var(--color-*) refs to scheme hex', () => {
			expect(resolveColorString('var(--color-primary)', 'light')).toBe(tokens.light.primary.main);
			expect(resolveColorString('var(--color-primary)', 'dark')).toBe(tokens.dark.primary.main);
			expect(resolveColorString('var(--color-background-paper)', 'light')).toBe(tokens.light.background.paper);
		});

		test('returns input unchanged for non-token inputs', () => {
			expect(resolveColorString('#37474f', 'light')).toBe('#37474f');
			expect(resolveColorString('oklch(0.5 0.1 240)', 'light')).toBe('oklch(0.5 0.1 240)');
			expect(resolveColorString('var(--unknown-token)', 'light')).toBe('var(--unknown-token)');
		});
	});

	describe('decomposeColor (wrapped)', () => {
		test('does NOT throw on oklch input', () => {
			expect(() => decomposeColor('oklch(0.6 0.033 236)')).not.toThrow();
			const result = decomposeColor('oklch(0.6 0.033 236)');
			expect(result.type).toBe('rgb');
			expect(result.values).toHaveLength(3);
		});

		test('does NOT throw on var(--color-*) input', () => {
			expect(() => decomposeColor('var(--color-primary)', 'light')).not.toThrow();
			expect(() => decomposeColor('var(--color-secondary)', 'dark')).not.toThrow();
		});

		test('still works on standard MUI inputs', () => {
			expect(() => decomposeColor('#37474f')).not.toThrow();
			expect(() => decomposeColor('rgb(120, 144, 156)')).not.toThrow();
			expect(() => decomposeColor('rgba(120, 144, 156, 0.5)')).not.toThrow();
		});
	});

	describe('getContrastRatio (wrapped)', () => {
		test('does NOT throw on var(--color-*) input on either side', () => {
			// Regression: fixContrast in useGetAccessibleColor.ts hits this
			// with cssVar.primary.main as the foreground (team-color fallback).
			expect(() => getContrastRatio('var(--color-primary)', '#ffffff')).not.toThrow();
			expect(() => getContrastRatio('#000000', 'var(--color-background-paper)')).not.toThrow();
			expect(() => getContrastRatio('var(--color-primary)', 'var(--color-background-paper)')).not.toThrow();
		});

		test('does NOT throw on oklch input on either side', () => {
			expect(() => getContrastRatio('oklch(0.25 0.020 244)', '#ffffff')).not.toThrow();
			expect(() => getContrastRatio('#000000', 'oklch(0.95 0.005 236)')).not.toThrow();
		});

		test('returns sensible values (white/black ≈ 21)', () => {
			expect(getContrastRatio('#ffffff', '#000000')).toBeCloseTo(21, 0);
			expect(getContrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 0);
		});
	});

	describe('getLuminance (wrapped)', () => {
		test('does NOT throw on var() or oklch', () => {
			expect(() => getLuminance('var(--color-primary)')).not.toThrow();
			expect(() => getLuminance('oklch(0.5 0.1 240)')).not.toThrow();
		});

		test('returns 0 for black and 1 for white', () => {
			expect(getLuminance('#000000')).toBe(0);
			expect(getLuminance('#ffffff')).toBe(1);
		});
	});

	describe('getContrastText (wrapped)', () => {
		test('returns white for dark backgrounds', () => {
			expect(getContrastText('#000000')).toBe('rgb(255, 255, 255)');
			expect(getContrastText('oklch(0.25 0.020 244)')).toBe('rgb(255, 255, 255)');
		});

		test('returns black for light backgrounds', () => {
			expect(getContrastText('#ffffff')).toBe('rgb(0, 0, 0)');
			expect(getContrastText('oklch(0.95 0.005 236)')).toBe('rgb(0, 0, 0)');
		});

		test('handles var(--color-*) input', () => {
			const result = getContrastText('var(--color-secondary)');
			expect(['rgb(0, 0, 0)', 'rgb(255, 255, 255)']).toContain(result);
		});
	});
});
