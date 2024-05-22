import {Result} from '@gtibrett/effone-hub-graph-api';

type Stats = {
	wins: number;
	podiums: number;
	inPoints: number;
	DNFs: number;
	appearances: number;
}

export default function usePerformanceData(results?: Result[]): Stats | undefined {
	if (!results) {
		return undefined;
	}
	
	return {
		wins:        results.filter(r => r.positionOrder === 1).length,
		podiums:     results.filter(r => r.positionOrder && r.positionOrder <= 3).length,
		inPoints:    results.filter(r => r.positionOrder && r.positionOrder <= 10).length,
		DNFs:        results.filter(r => r.positionOrder && r.positionText && r.positionText !== String(r.positionOrder)).length,
		appearances: results.length
	};
}