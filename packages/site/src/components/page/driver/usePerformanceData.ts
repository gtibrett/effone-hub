import type { RaceResult } from '@/gql/graphql';

// usePerformanceData only reads these two fields; accept any result-shaped object
// (full RaceResult rows or a projected subset) without an `any` cast at call sites.
type PerformanceResult = {
	positionDisplayOrder?: RaceResult['positionDisplayOrder'];
	positionText?: RaceResult['positionText'];
};

type Stats = {
	wins: number;
	podiums: number;
	inPoints: number;
	DNFs: number;
	appearances: number;
};

export default function usePerformanceData(results?: PerformanceResult[]): Stats | undefined {
	if (!results) {
		return undefined;
	}

	return {
		wins: results.filter(r => r.positionDisplayOrder === 1).length,
		podiums: results.filter(r => r.positionDisplayOrder && r.positionDisplayOrder <= 3).length,
		inPoints: results.filter(r => r.positionDisplayOrder && r.positionDisplayOrder <= 10)
			.length,
		DNFs: results.filter(
			r =>
				r.positionDisplayOrder &&
				r.positionText &&
				r.positionText !== String(r.positionDisplayOrder)
		).length,
		appearances: results.length
	};
}
