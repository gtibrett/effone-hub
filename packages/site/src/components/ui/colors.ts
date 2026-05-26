export function alpha(color: string, percentage: number) {
	return `color-mix(in srgb, ${color}, transparent ${percentage * 100}%)`;
}

// color-mix accepts oklch/var()/hex/rgb — MUI's lighten/darken only parse named formats.
export function lighten(color: string, percentage: number) {
	return `color-mix(in oklch, ${color}, white ${percentage * 100}%)`;
}

export function darken(color: string, percentage: number) {
	return `color-mix(in oklch, ${color}, black ${percentage * 100}%)`;
}

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
	50: 'oklch(0.968 0.014 17.52)',
	100: 'oklch(0.934 0.029 17.73)',
	200: 'oklch(0.87 0.061 18.41)',
	300: 'oklch(0.797 0.103 19.6)',
	400: 'oklch(0.733 0.145 21.23)',
	500: 'oklch(0.669 0.194 23.65)',
	600: 'oklch(0.604 0.226 27.02)',
	700: 'oklch(0.529 0.198 27.16)',
	800: 'oklch(0.398 0.149 27.08)',
	900: 'oklch(0.271 0.102 26.81)',
	950: 'oklch(0.207 0.077 27.3)'
};

export const blue = {
	50: 'oklch(0.957 0.019 266.01)',
	100: 'oklch(0.914 0.037 265.15)',
	200: 'oklch(0.829 0.077 264.37)',
	300: 'oklch(0.735 0.124 259.15)',
	400: 'oklch(0.649 0.17 253.56)',
	500: 'oklch(0.562 0.147 253.39)',
	600: 'oklch(0.475 0.125 253.46)',
	700: 'oklch(0.398 0.104 253.1)',
	800: 'oklch(0.311 0.081 253.43)',
	900: 'oklch(0.225 0.058 253.41)',
	950: 'oklch(0.177 0.048 253.48)'
};

export const primary = blueGrey;
export const secondary = red;
export const tertiary = blue;
