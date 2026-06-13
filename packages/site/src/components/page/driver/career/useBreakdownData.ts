import type { DriverCareerData } from '@/app/lib/cached-data';

export interface BreakdownMetrics {
	wins: number;
	podiums: number;
	inPoints: number;
	outOfPoints: number;
	DNFs: number;
	appearances: number;
	[key: string]: number;
}

export interface BreakdownDatum {
	driverId: string | undefined;
	year: number;
	raw: BreakdownMetrics;
	[key: string]: unknown;
}

type CareerRaceResult = DriverCareerData['driver']['raceResults'][number];

export default function useBreakdownData(
	driverId: string | undefined,
	careerData: DriverCareerData['driver'] | null | undefined
): BreakdownDatum[] | undefined {
	const careerResults = careerData?.raceResults;

	if (!careerResults) {
		return undefined;
	}

	return (
		careerData?.standings
			// drop seasons with no race starts (e.g. practice-only entries); also avoids /0 -> NaN below
			.filter(({ year }) =>
				careerResults.some((r: CareerRaceResult) => r.race?.year === year)
			)
			.map(({ year }) => {
				const seasonResults = careerResults.filter(
					(r: CareerRaceResult) => r.race?.year === year
				);
				const appearances = seasonResults.length;

				const raw: BreakdownMetrics = {
					wins: 0,
					podiums: 0,
					inPoints: 0,
					outOfPoints: 0,
					DNFs: 0,
					appearances
				};

				seasonResults.forEach((r: CareerRaceResult) => {
					switch (true) {
						case r.positionNumber === 1:
							raw.wins++;
							break;
						case r.positionNumber != null && r.positionNumber <= 3:
							raw.podiums++;
							break;
						case r.positionNumber != null && r.positionNumber <= 10:
							raw.inPoints++;
							break;
						case r.positionText !== String(r.positionNumber):
							raw.DNFs++;
							break;
						default:
							raw.outOfPoints++;
					}
				});

				const asPercentage: BreakdownMetrics = Object.entries(raw)
					.map(([key, value]) => ({ key, value: (Number(value) / appearances) * 100 }))
					.reduce<Record<string, number>>((cur, { key, value }) => {
						cur[`${key}Percentage`] = value;
						return cur;
					}, {}) as BreakdownMetrics;

				return {
					year,
					driverId,
					raw,
					...asPercentage
				};
			})
	);
}
