import { RaceResult } from '@/gql/graphql';

type Stats = {
	wins: number;
	podiums: number;
	inPoints: number;
	DNFs: number;
	appearances: number;
};

export default function usePerformanceData(results?: RaceResult[]): Stats | undefined {
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
