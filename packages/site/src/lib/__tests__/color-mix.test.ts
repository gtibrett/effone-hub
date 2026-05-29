import { alpha, darken, lighten } from '@/components/ui/colors';

describe('color-mix helpers (src/components/ui/colors.ts)', () => {
	describe('alpha', () => {
		// percentage = target opacity (MUI semantics): alpha(c, 0.9) → 90% opaque,
		// i.e. mixed with the complementary (1-p) transparent amount.
		test('treats percentage as target opacity, mixing complementary transparent', () => {
			expect(alpha('var(--color-primary)', 0.5)).toBe(
				'color-mix(in srgb, var(--color-primary), transparent 50%)'
			);
			expect(alpha('#37474f', 0.25)).toBe('color-mix(in srgb, #37474f, transparent 75%)');
			expect(alpha('oklch(0.6 0.033 236)', 0.1)).toBe(
				'color-mix(in srgb, oklch(0.6 0.033 236), transparent 90%)'
			);
			expect(alpha('#fff', 0.9)).toBe('color-mix(in srgb, #fff, transparent 10%)');
		});
	});

	describe('lighten', () => {
		test('mixes input with white in oklch space', () => {
			expect(lighten('var(--color-secondary-light)', 0.375)).toBe(
				'color-mix(in oklch, var(--color-secondary-light), white 37.5%)'
			);
			expect(lighten('oklch(0.5 0.1 240)', 0.25)).toBe(
				'color-mix(in oklch, oklch(0.5 0.1 240), white 25%)'
			);
		});
	});

	describe('darken', () => {
		test('mixes input with black in oklch space', () => {
			expect(darken('#37474f', 0.25)).toBe('color-mix(in oklch, #37474f, black 25%)');
			expect(darken('var(--color-primary)', 0.5)).toBe(
				'color-mix(in oklch, var(--color-primary), black 50%)'
			);
		});
	});

	test('helpers accept var()/oklch/hex uniformly (the whole point of the rewrite)', () => {
		const inputs = [
			'#F4F4F6',
			'var(--color-primary)',
			'oklch(0.6 0.033 236)',
			'rgb(120, 144, 156)'
		];
		for (const input of inputs) {
			expect(() => alpha(input, 0.5)).not.toThrow();
			expect(() => lighten(input, 0.25)).not.toThrow();
			expect(() => darken(input, 0.25)).not.toThrow();
		}
	});
});
