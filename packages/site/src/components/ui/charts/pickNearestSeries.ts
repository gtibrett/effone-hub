// Pure geometry helpers for proximity hover on line charts. Kept free of MUI /
// React so the nearest-pick logic can be unit-tested without a browser.

export type SeriesCandidate = {
	seriesId: string;
	// Pixel-space y of this series' value at the chosen data index.
	valuePx: number;
};

// Nearest data index by pixel x. Non-finite positions (missing ticks) ignored.
// Returns -1 when no finite candidate exists.
export function pickNearestIndex(xPositions: number[], cursorX: number): number {
	let best = -1;
	let bestDist = Infinity;
	for (let i = 0; i < xPositions.length; i++) {
		const px = xPositions[i];
		if (!Number.isFinite(px)) {
			continue;
		}
		const d = Math.abs(px - cursorX);
		if (d < bestDist) {
			bestDist = d;
			best = i;
		}
	}
	return best;
}

// Nearest series by pixel y. Returns null when no candidates, or when the
// closest exceeds maxRadius (so the tooltip only fires "close to a line").
export function pickNearestSeries(
	candidates: SeriesCandidate[],
	cursorY: number,
	maxRadius?: number
): string | null {
	let best: string | null = null;
	let bestDist = Infinity;
	for (const c of candidates) {
		if (!Number.isFinite(c.valuePx)) {
			continue;
		}
		const d = Math.abs(c.valuePx - cursorY);
		if (d < bestDist) {
			bestDist = d;
			best = c.seriesId;
		}
	}
	if (best == null) {
		return null;
	}
	if (maxRadius != null && bestDist > maxRadius) {
		return null;
	}
	return best;
}
