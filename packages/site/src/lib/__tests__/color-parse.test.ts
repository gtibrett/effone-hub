import {decomposeColor, getContrastText, oklchToRgbString, resolveColorString} from '@/lib/color-utils';
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
