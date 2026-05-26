/**
 * Maps result categories to background + text-color CSS strings. Both
 * values are pure CSS — bg points to a scheme-aware var defined in
 * globals.css; color uses `contrast-color()` so the browser picks the
 * best black/white against the var at paint time.
 */

type ResultsColor = {
	background: string;
	color:      string;
}

const buckets = {
	appearances: 'var(--results-appearances)',
	wins:        'var(--results-wins)',
	podiums:     'var(--results-podiums)',
	inPoints:    'var(--results-in-points)',
	outPoints:   'var(--results-out-points)',
	outOfPoints: 'var(--results-out-of-points)',
	DNFs:        'var(--results-dnfs)'
} as const;

const palette: Record<keyof typeof buckets, ResultsColor> = Object.fromEntries(
	Object.entries(buckets).map(([key, bg]) => [
		key,
		{background: bg, color: `contrast-color(${bg} vs white, black)`}
	])
) as Record<keyof typeof buckets, ResultsColor>;

export default function useResultsColors(): Record<keyof typeof buckets, ResultsColor> {
	return palette;
}
