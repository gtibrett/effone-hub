/**
 * Static map of result-bucket → CSS color strings (no hook, no React).
 *
 * Charts that paint via Nivo's `colors` prop need plain strings, not
 * Tailwind class names — Nivo writes them straight to SVG fill/stroke.
 * Both fields are pure CSS:
 *   - background: scheme-aware var defined in globals.css
 *   - color: `contrast-color()` lets the browser pick black/white
 */

export type ResultsBucket =
	| 'appearances'
	| 'wins'
	| 'podiums'
	| 'inPoints'
	| 'outPoints'
	| 'outOfPoints'
	| 'DNFs';

export type ResultsColor = {
	background: string;
	color:      string;
};

const VAR_FOR: Record<ResultsBucket, string> = {
	appearances: 'var(--results-appearances)',
	wins:        'var(--results-wins)',
	podiums:     'var(--results-podiums)',
	inPoints:    'var(--results-in-points)',
	outPoints:   'var(--results-out-points)',
	outOfPoints: 'var(--results-out-of-points)',
	DNFs:        'var(--results-dnfs)'
};

export const RESULTS_COLORS: Record<ResultsBucket, ResultsColor> = Object.fromEntries(
	(Object.entries(VAR_FOR) as [ResultsBucket, string][]).map(([key, bg]) => [
		key,
		{background: bg, color: `contrast-color(${bg} vs white, black)`}
	])
) as Record<ResultsBucket, ResultsColor>;
