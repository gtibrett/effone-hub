/**
 * OKLCH → sRGB conversion. Standalone — kept for code that needs to
 * convert an oklch literal to a rgb()/rgba() string at runtime (e.g.
 * canvas APIs that don't parse oklch). No JS contrast math here; all
 * contrast picking goes through CSS `contrast-color()` via
 * `@/lib/useContrastText`.
 *
 * Reference: Björn Ottosson — https://bottosson.github.io/posts/oklab/
 */

const OKLCH_RE = /^oklch\(\s*([0-9.+\-%]+)\s+([0-9.+\-]+)\s+([0-9.+\-]+)(?:deg)?\s*(?:\/\s*([0-9.+\-%]+))?\s*\)\s*$/i;

function parseLightness(raw: string): number {
	return raw.endsWith('%') ? parseFloat(raw) / 100 : parseFloat(raw);
}

function parseAlpha(raw: string | undefined): number {
	if (raw == null) return 1;
	return raw.endsWith('%') ? parseFloat(raw) / 100 : parseFloat(raw);
}

function clamp01(x: number): number {
	return x < 0 ? 0 : x > 1 ? 1 : x;
}

function linearToSrgb(x: number): number {
	if (x <= 0) return 0;
	if (x >= 1) return 1;
	return x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
}

/**
 * Convert an OKLCH color string to a CSS-parseable `rgb(...)` /
 * `rgba(...)` string. Returns input unchanged if not an oklch literal.
 */
export function oklchToRgbString(color: string): string {
	const m = color.match(OKLCH_RE);
	if (!m) return color;

	const L     = parseLightness(m[1]);
	const C     = parseFloat(m[2]);
	const hDeg  = parseFloat(m[3]);
	const alpha = parseAlpha(m[4]);

	const hRad = (hDeg * Math.PI) / 180;
	const a    = C * Math.cos(hRad);
	const b    = C * Math.sin(hRad);

	const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
	const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
	const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

	const lc = l_ * l_ * l_;
	const mc = m_ * m_ * m_;
	const sc = s_ * s_ * s_;

	const lr = +4.0767416621 * lc - 3.3077115913 * mc + 0.2309699292 * sc;
	const lg = -1.2684380046 * lc + 2.6097574011 * mc - 0.3413193965 * sc;
	const lb = -0.0041960863 * lc - 0.7034186147 * mc + 1.7076147010 * sc;

	const r  = Math.round(clamp01(linearToSrgb(lr)) * 255);
	const g  = Math.round(clamp01(linearToSrgb(lg)) * 255);
	const b8 = Math.round(clamp01(linearToSrgb(lb)) * 255);

	return alpha < 1
		? `rgba(${r}, ${g}, ${b8}, ${alpha})`
		: `rgb(${r}, ${g}, ${b8})`;
}
