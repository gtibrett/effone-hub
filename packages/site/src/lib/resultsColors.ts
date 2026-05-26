/**
 * Static map of result-bucket → CSS color strings. Plain strings (not Tailwind classes) for
 * Nivo's `colors` prop, which writes them straight to SVG fill/stroke.
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
