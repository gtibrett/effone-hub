'use client';

import type {
	SeasonConstructorStandingsData,
	SeasonDriverStandingsData,
	SeasonScheduleData,
	SeasonStatsBundle
} from '@/app/lib/cached-data';
import type { NextRaceQueryNode } from '@/components/page/raceWeekend/queries';
import Season from '@/components/page/season/Season';

type HomeContentProps = {
	season: { year: number };
	races: NextRaceQueryNode[];
	scheduleData: SeasonScheduleData['season'];
	driverStandingsData: SeasonDriverStandingsData['season'];
	constructorStandingsData: SeasonConstructorStandingsData['season'];
	statsBundle: SeasonStatsBundle;
};

export default function HomeContent({
	season,
	races,
	scheduleData,
	driverStandingsData,
	constructorStandingsData,
	statsBundle
}: HomeContentProps) {
	return (
		<Season
			season={season}
			races={races}
			scheduleData={scheduleData}
			driverStandingsData={driverStandingsData}
			constructorStandingsData={constructorStandingsData}
			statsBundle={statsBundle}
		/>
	);
}
