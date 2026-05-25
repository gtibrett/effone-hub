/**
 * Color math wrappers that extend MUI's decomposeColor / getContrastText to
 * understand OKLCH and CSS var() references in addition to MUI's native
 * formats (hex, rgb(), rgba(), hsl(), hsla(), color()).
 *
 * Why: the Tailwind-driven theme stores palette values as `var(--color-*)`
 * strings and the underlying paint colors are OKLCH. MUI's color helpers
 * only parse sRGB-shaped formats and would throw on either.
 *
 * Layered API:
 *   - resolveColorString(c): peels `var(--color-*)` -> concrete hex via tokens
 *   - oklchToRgbString(c):   peels `oklch(L C H)` -> `rgb(r, g, b)`
 *   - decomposeColor(c):     normalizes c via the above, then defers to MUI
 *   - getContrastText(c):    normalizes c, defers to MUI's helper
 */

import {
	decomposeColor as muiDecomposeColor,
	getContrastRatio as muiGetContrastRatio,
	getLuminance as muiGetLuminance
} from '@mui/system/colorManipulator';
import type {ColorObject} from '@mui/system/colorManipulator';
import {tokens, type ColorScheme} from './tokens';

// Internal normalizer — single chokepoint so every wrapped helper handles
// the same extended format set (var(--color-*) and oklch()).
function normalizeColorInput(color: string, scheme: ColorScheme): string {
	let out = color;
	if (out.startsWith('var(')) out = resolveColorString(out, scheme);
	if (out.startsWith('oklch')) out = oklchToRgbString(out);
	return out;
}

// ---------------------------------------------------------------------------
// CSS var resolution
// ---------------------------------------------------------------------------

const VAR_RE       = /^var\(--color-([a-z-]+)\)/i;
const TOKEN_LOOKUP: Record<string, (t: typeof tokens.light) => string | undefined> = {
	'primary':            (t) => t.primary.main,
	'primary-light':      (t) => t.primary.light,
	'primary-dark':       (t) => t.primary.dark,
	'primary-contrast':   (t) => t.primary.contrastText,
	'secondary':          (t) => t.secondary.main,
	'secondary-light':    (t) => t.secondary.light,
	'secondary-dark':     (t) => t.secondary.dark,
	'secondary-contrast': (t) => t.secondary.contrastText,
	'background':         (t) => t.background.default,
	'background-paper':   (t) => t.background.paper,
	'text-primary':       (t) => t.text.primary,
	'text-secondary':     (t) => t.text.secondary,
	'text-disabled':      (t) => t.text.disabled,
	'divider':            (t) => t.divider,
	'success':            (t) => t.success,
	'warning':            (t) => t.warning,
	'error':              (t) => t.error,
	'info':               (t) => t.info
};

export function resolveColorString(color: string, scheme: ColorScheme = 'light'): string {
	const match = color.match(VAR_RE);
	if (!match) return color;
	const resolver = TOKEN_LOOKUP[match[1].toLowerCase()];
	return resolver?.(tokens[scheme]) ?? color;
}

// ---------------------------------------------------------------------------
// OKLCH -> sRGB
// ---------------------------------------------------------------------------
// Reference: Björn Ottosson - https://bottosson.github.io/posts/oklab/

const OKLCH_RE = /^oklch\(\s*([0-9.+\-%]+)\s+([0-9.+\-]+)\s+([0-9.+\-]+)(?:deg)?\s*(?:\/\s*([0-9.+\-%]+))?\s*\)\s*$/i;

function parseLightness(raw: string): number {
	// `oklch(70% 0.1 30)` and `oklch(0.7 0.1 30)` both valid.
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
 * `rgba(...)` string. Returns the input unchanged if not an oklch literal.
 * Clamps out-of-gamut channels into [0, 1] sRGB (lossy but safe — matches
 * what browsers do when painting out-of-gamut oklch into an sRGB context).
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

	// OKLab -> linear sRGB
	const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
	const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
	const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

	const lc = l_ * l_ * l_;
	const mc = m_ * m_ * m_;
	const sc = s_ * s_ * s_;

	const lr = +4.0767416621 * lc - 3.3077115913 * mc + 0.2309699292 * sc;
	const lg = -1.2684380046 * lc + 2.6097574011 * mc - 0.3413193965 * sc;
	const lb = -0.0041960863 * lc - 0.7034186147 * mc + 1.7076147010 * sc;

	const r = Math.round(clamp01(linearToSrgb(lr)) * 255);
	const g = Math.round(clamp01(linearToSrgb(lg)) * 255);
	const b8 = Math.round(clamp01(linearToSrgb(lb)) * 255);

	return alpha < 1
		? `rgba(${r}, ${g}, ${b8}, ${alpha})`
		: `rgb(${r}, ${g}, ${b8})`;
}

// ---------------------------------------------------------------------------
// Wrapped MUI helpers
// ---------------------------------------------------------------------------

/**
 * Normalize a color string to a MUI-parseable form, then call MUI's
 * decomposeColor. Handles: oklch(), var(--color-*), plus everything MUI
 * already supports.
 */
export function decomposeColor(color: string, scheme: ColorScheme = 'light'): ColorObject {
	return muiDecomposeColor(normalizeColorInput(color, scheme));
}

/**
 * Wrapped getLuminance — accepts oklch() and var(--color-*) in addition
 * to MUI's native formats.
 */
export function getLuminance(color: string, scheme: ColorScheme = 'light'): number {
	return muiGetLuminance(normalizeColorInput(color, scheme));
}

/**
 * Wrapped getContrastRatio — normalizes both inputs before deferring to
 * MUI. THIS is the function that fixContrast in useGetAccessibleColor
 * calls hot-path, so it MUST handle var() / oklch.
 */
export function getContrastRatio(
	foreground: string,
	background: string,
	scheme: ColorScheme = 'light'
): number {
	return muiGetContrastRatio(
		normalizeColorInput(foreground, scheme),
		normalizeColorInput(background, scheme)
	);
}

/**
 * Wrapped getContrastText — picks black or white text for max contrast
 * against `background`. Accepts the extended set of color formats above.
 */
export function getContrastText(
	background: string,
	contrastThreshold: number = 3,
	scheme: ColorScheme = 'light'
): string {
	const black = 'rgb(0, 0, 0)';
	const white = 'rgb(255, 255, 255)';
	return getContrastRatio(background, black, scheme) >= contrastThreshold ? black : white;
}
