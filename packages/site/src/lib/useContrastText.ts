/**
 * Compute accessible text color against an arbitrary background.
 *
 * The CSS `contrast-color()` function (Safari 18.2+, Chrome flag as of
 * early 2026) flips at paint time with the OS color scheme — no JS work.
 * For older browsers we fall back to a JS-computed concrete hex via
 * `getContrastText`, which understands hex / oklch / var(--color-*).
 *
 * Public API:
 *
 *   useContrastText(bg)  — returns an sx-spreadable object with both
 *                          layers (`color` fallback + `@supports`
 *                          override). Use when sx applies to the element
 *                          itself.
 *
 *   getCssContrast(bg)   — returns the raw `contrast-color(...)` string
 *                          to embed inside nested sx selectors (e.g.
 *                          `'& *': {color: ...}`) where the @supports
 *                          gate has to live alongside other rules.
 *
 *   getContrastText(bg)  — re-exported from color-utils for the JS
 *                          fallback value (or when the result must be
 *                          a concrete string for a non-CSS sink, e.g.
 *                          a Nivo `colors` callback or an SVG `color`
 *                          attribute).
 *
 *   SUPPORTS_CONTRAST_COLOR — the @supports selector key, exported so
 *                          callers nesting their own @supports blocks
 *                          can reference it without typos.
 */

import {getContrastText} from './color-utils';

export const SUPPORTS_CONTRAST_COLOR = '@supports (color: contrast-color(white vs white, black))';

export function getCssContrast(background: string): string {
	return `contrast-color(${background} vs white, black)`;
}

export function useContrastText(background: string) {
	return {
		color: getContrastText(background),
		[SUPPORTS_CONTRAST_COLOR]: {
			color: getCssContrast(background)
		}
	} as const;
}

export {getContrastText};
export default useContrastText;
