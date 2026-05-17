/**
 * Port of the MUI `@mui/system/colorManipulator` helpers we use.
 *
 * Lets M12 drop the MUI runtime entirely while preserving byte-identical
 * accessible-color output for every team-coloured surface. Only the
 * subset we actually call is reimplemented — see consumers
 * (useGetAccessibleColor, NivoTooltipFactory, etc.) for which functions
 * are reachable.
 */

export type ColorObject = {
	type:   'rgb' | 'rgba' | 'hsl' | 'hsla' | 'color';
	values: [number, number, number] | [number, number, number, number];
	colorSpace?: string;
};

function clamp(value: number, min = 0, max = 1): number {
	if (value < min) return min;
	if (value > max) return max;
	return value;
}

function hexToRgb(color: string): string {
	color = color.slice(1);
	const re = new RegExp(`.{1,${color.length >= 6 ? 2 : 1}}`, 'g');
	const matches = color.match(re);
	if (!matches) return 'rgb(0, 0, 0)';
	let colors = matches.map(n => n.length === 1 ? n + n : n);
	const rgb = colors.slice(0, 3).map(c => parseInt(c, 16));
	if (colors.length === 4) {
		const a = parseInt(colors[3], 16) / 255;
		return `rgba(${rgb.join(', ')}, ${a})`;
	}
	return `rgb(${rgb.join(', ')})`;
}

export function decomposeColor(color: string): ColorObject {
	if (color.charAt(0) === '#') return decomposeColor(hexToRgb(color));
	const marker = color.indexOf('(');
	const type = color.substring(0, marker) as ColorObject['type'];
	if (!['rgb', 'rgba', 'hsl', 'hsla', 'color'].includes(type)) {
		throw new Error(`Unsupported \`${color}\` color`);
	}
	const valuesStr = color.substring(marker + 1, color.length - 1);
	let values: number[];
	let colorSpace: string | undefined;
	if (type === 'color') {
		const parts = valuesStr.split(' ');
		colorSpace = parts.shift();
		if (parts.length === 4 && parts[3].charAt(0) === '/') parts[3] = parts[3].slice(1);
		values = parts.map(v => parseFloat(v));
	} else {
		values = valuesStr.split(',').map(v => parseFloat(v));
	}
	return {type, values: values as ColorObject['values'], colorSpace};
}

export function recomposeColor(color: ColorObject): string {
	const {type, colorSpace} = color;
	let {values} = color;
	let out: string;
	if (type.indexOf('rgb') !== -1) {
		out = (values as number[]).map((n, i) => i < 3 ? parseInt(String(n), 10) : n).join(', ');
	} else if (type.indexOf('hsl') !== -1) {
		out = (values as number[]).map((n, i) => i === 1 || i === 2 ? `${n}%` : n).join(', ');
	} else {
		out = (values as number[]).join(' ');
	}
	return type === 'color' ? `color(${colorSpace} ${out})` : `${type}(${out})`;
}

function hslToRgb(color: ColorObject): ColorObject {
	const h = color.values[0];
	const s = (color.values[1] as number) / 100;
	const l = (color.values[2] as number) / 100;
	const a = s * Math.min(l, 1 - l);
	const f = (n: number) => {
		const k = (n + h / 30) % 12;
		return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
	};
	let type: ColorObject['type'] = 'rgb';
	const rgb: number[] = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
	if (color.type === 'hsla') {
		type = 'rgba';
		rgb.push(color.values[3] as number);
	}
	return {type, values: rgb as ColorObject['values']};
}

function getLuminance(color: string): number {
	const c = decomposeColor(color);
	let rgb = c.type === 'hsl' || c.type === 'hsla' ? hslToRgb(c).values : c.values;
	const arr = (rgb.slice(0, 3) as number[]).map(v => {
		if (c.type !== 'color') v = v / 255;
		return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
	});
	return Number((0.2126 * arr[0] + 0.7152 * arr[1] + 0.0722 * arr[2]).toFixed(3));
}

export function getContrastRatio(foreground: string, background: string): number {
	const lumA = getLuminance(foreground);
	const lumB = getLuminance(background);
	return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}

/**
 * Convert a color to an rgba/hsla form with the given alpha value.
 */
export function alpha(color: string, value: number): string {
	const c = decomposeColor(color);
	value = clamp(value);
	if (c.type === 'rgb' || c.type === 'hsl') {
		c.type = (c.type + 'a') as ColorObject['type'];
	}
	if (c.type === 'color') {
		(c.values as number[])[3] = `/${value}` as unknown as number;
	} else {
		(c.values as number[])[3] = value;
	}
	return recomposeColor(c);
}

export function darken(color: string, coefficient: number): string {
	const c = decomposeColor(color);
	coefficient = clamp(coefficient);
	if (c.type.indexOf('hsl') !== -1) {
		(c.values as number[])[2] *= 1 - coefficient;
	} else if (c.type.indexOf('rgb') !== -1 || c.type.indexOf('color') !== -1) {
		for (let i = 0; i < 3; i += 1) {
			(c.values as number[])[i] *= 1 - coefficient;
		}
	}
	return recomposeColor(c);
}

export function lighten(color: string, coefficient: number): string {
	const c = decomposeColor(color);
	coefficient = clamp(coefficient);
	if (c.type.indexOf('hsl') !== -1) {
		(c.values as number[])[2] += (100 - (c.values as number[])[2]) * coefficient;
	} else if (c.type.indexOf('rgb') !== -1) {
		for (let i = 0; i < 3; i += 1) {
			(c.values as number[])[i] += (255 - (c.values as number[])[i]) * coefficient;
		}
	} else if (c.type.indexOf('color') !== -1) {
		for (let i = 0; i < 3; i += 1) {
			(c.values as number[])[i] += (1 - (c.values as number[])[i]) * coefficient;
		}
	}
	return recomposeColor(c);
}

export function getContrastText(background: string, contrastThreshold = 3): string {
	return getContrastRatio(background, '#fff') >= contrastThreshold ? '#fff' : 'rgba(0, 0, 0, 0.87)';
}

/** Tiny capitalize port (MUI's just upper-cases first char). */
export function capitalize(s: string): string {
	if (!s) return s;
	return s.charAt(0).toUpperCase() + s.slice(1);
}
