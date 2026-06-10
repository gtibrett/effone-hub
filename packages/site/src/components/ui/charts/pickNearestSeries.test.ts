import { pickNearestIndex, pickNearestSeries } from './pickNearestSeries';

describe('pickNearestIndex', () => {
	const positions = [10, 20, 30, 40];

	it('returns the closest index', () => {
		expect(pickNearestIndex(positions, 9)).toBe(0);
		expect(pickNearestIndex(positions, 22)).toBe(1);
		expect(pickNearestIndex(positions, 38)).toBe(3);
	});

	it('picks the lower index on a tie', () => {
		expect(pickNearestIndex(positions, 25)).toBe(1);
	});

	it('ignores non-finite positions', () => {
		expect(pickNearestIndex([NaN, 20, NaN], 100)).toBe(1);
	});

	it('returns -1 when nothing is finite', () => {
		expect(pickNearestIndex([NaN, NaN], 5)).toBe(-1);
		expect(pickNearestIndex([], 5)).toBe(-1);
	});
});

describe('pickNearestSeries', () => {
	const candidates = [
		{ seriesId: 'a', valuePx: 100 },
		{ seriesId: 'b', valuePx: 150 },
		{ seriesId: 'c', valuePx: 300 }
	];

	it('returns the series whose pixel y is closest to the cursor', () => {
		expect(pickNearestSeries(candidates, 105)).toBe('a');
		expect(pickNearestSeries(candidates, 148)).toBe('b');
		expect(pickNearestSeries(candidates, 280)).toBe('c');
	});

	it('returns null when the closest exceeds maxRadius', () => {
		expect(pickNearestSeries(candidates, 160, 40)).toBe('b');
		expect(pickNearestSeries(candidates, 220, 40)).toBeNull();
	});

	it('returns null for no candidates', () => {
		expect(pickNearestSeries([], 100)).toBeNull();
	});

	it('skips non-finite valuePx', () => {
		expect(pickNearestSeries([{ seriesId: 'x', valuePx: NaN }], 10)).toBeNull();
		expect(
			pickNearestSeries(
				[
					{ seriesId: 'x', valuePx: NaN },
					{ seriesId: 'y', valuePx: 50 }
				],
				48
			)
		).toBe('y');
	});
});
