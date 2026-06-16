'use client';

import type {
	SeasonConstructorStandingsData,
	SeasonDriverStandingsData,
	SeasonScheduleData,
	SeasonStatsBundle
} from '@/app/lib/cached-data';
import type { NextRaceQueryNode } from '@/components/page/raceWeekend/queries';
import SeasonView from '@/components/page/season/Season';

type SeasonContentProps = {
	season: { year: number };
	races: NextRaceQueryNode[];
	scheduleData: SeasonScheduleData['season'];
	driverStandingsData: SeasonDriverStandingsData['season'];
	constructorStandingsData: SeasonConstructorStandingsData['season'];
	statsBundle: SeasonStatsBundle;
};

export default function SeasonContent({
	season,
	races,
	scheduleData,
	driverStandingsData,
	constructorStandingsData,
	statsBundle
}: SeasonContentProps) {
	return (
		<SeasonView
			season={season}
			races={races}
			scheduleData={scheduleData}
			driverStandingsData={driverStandingsData}
			constructorStandingsData={constructorStandingsData}
			statsBundle={statsBundle}
		/>
	);
}
