export type SeasonTeam = {
	id: string;
	colors?: { primaryHex?: string | null; secondaryHex?: string | null } | null;
};

type RaceResultWithRaceAndTeam = {
	race?: { year?: number | null; round?: number | null } | null;
	team?: SeasonTeam | null;
};

/**
 * Maps each season year to the team the driver finished the season with
 * (their highest-round race that year). Team lives on raceResults, not on
 * the season standing.
 */
export function getSeasonEndTeamByYear(
	raceResults: RaceResultWithRaceAndTeam[] = []
): Map<number, SeasonTeam> {
	const latest = new Map<number, { round: number; team: SeasonTeam }>();

	raceResults.forEach(r => {
		const year = r.race?.year;
		const round = r.race?.round;
		if (year == null || round == null || !r.team) {
			return;
		}
		const seen = latest.get(year);
		if (!seen || round > seen.round) {
			latest.set(year, { round, team: r.team });
		}
	});

	const byYear = new Map<number, SeasonTeam>();
	latest.forEach(({ team }, year) => {
		byYear.set(year, team);
	});
	return byYear;
}
