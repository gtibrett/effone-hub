/**
 * Pick black or white text against a background — pure CSS via the
 * `contrast-color()` function. Older browsers without support get the
 * inherited color (acceptable graceful degradation).
 *
 *   useContrastText(bg)  — returns an sx-spreadable object with the
 *                          color rule.
 *   getCssContrast(bg)   — returns the raw `contrast-color(...)` string
 *                          to embed inside nested sx selectors.
 */

export function getCssContrast(background: string): string {
	return `contrast-color(${background} vs white, black)`;
}

export function useContrastText(background: string) {
	return {color: getCssContrast(background)} as const;
}

export default useContrastText;
