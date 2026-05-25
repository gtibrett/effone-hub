import {oklchToRgbString} from '@/lib/color-utils';

describe('oklchToRgbString', () => {
	test('converts oklch literal to rgb(r, g, b) with channels in [0,255]', () => {
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
