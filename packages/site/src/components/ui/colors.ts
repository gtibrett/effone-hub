// https://coolors.co/ef233c-f4f4f6-1f262e-faf33e-009ddc

// OKLCH for perceptual uniformity. sRGB hex fallbacks in `src/lib/tokens.ts` for JS color math.
export const blueGrey = {
	50: 'oklch(0.951 0.005 236)',
	100: 'oklch(0.864 0.014 230)',
	200: 'oklch(0.780 0.020 232)',
	300: 'oklch(0.675 0.027 234)',
	400: 'oklch(0.600 0.033 236)',
	500: 'oklch(0.530 0.039 240)',
	600: 'oklch(0.470 0.038 242)',
	700: 'oklch(0.400 0.034 244)',
	800: 'oklch(0.330 0.027 244)',
	900: 'oklch(0.250 0.020 244)',
	950: 'oklch(0.200 0.018 244)'
};

export const red = {
	50: 'oklch(0.96 0.018 17.57)',
	100: 'oklch(0.918 0.039 14.02)',
	200: 'oklch(0.845 0.078 15.89)',
	300: 'oklch(0.766 0.127 17.46)',
	400: 'oklch(0.686 0.187 19.32)',
	500: 'oklch(0.612 0.231 22.61)',
	600: 'oklch(0.516 0.194 22.56)',
	700: 'oklch(0.424 0.16 22.53)',
	800: 'oklch(0.335 0.127 22.49)',
	900: 'oklch(0.234 0.089 22.84)',
	950: 'oklch(0.187 0.069 23.49)'
};

export const blue = {
	50: 'oklch(0.966 0.017 247.99)',
	100: 'oklch(0.931 0.035 246.87)',
	200: 'oklch(0.86 0.074 244.48)',
	300: 'oklch(0.797 0.113 241.15)',
	400: 'oklch(0.726 0.157 236.39)',
	500: 'oklch(0.658 0.142 236.06)',
	600: 'oklch(0.555 0.12 236.14)',
	700: 'oklch(0.453 0.098 236.45)',
	800: 'oklch(0.341 0.074 236.41)',
	900: 'oklch(0.239 0.052 236.52)',
	950: 'oklch(0.185 0.04 236.26)'
};

export function alpha(color: string, percentage: number) {
	// MUI-compatible: `percentage` is target opacity (alpha(c, 0.9) ≈ 90% opaque).
	// color-mix needs the complementary transparent amount; round to kill FP noise.
	const transparent = Math.round((1 - percentage) * 1000) / 10;
	return `color-mix(in srgb, ${color}, transparent ${transparent}%)`;
}

// color-mix accepts oklch/var()/hex/rgb — MUI's lighten/darken only parse named formats.
export function lighten(color: string, percentage: number) {
	return `color-mix(in oklch, ${color}, white ${percentage * 100}%)`;
}

export function darken(color: string, percentage: number) {
	return `color-mix(in oklch, ${color}, black ${percentage * 100}%)`;
}
