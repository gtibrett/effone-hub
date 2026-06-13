'use client';

import type {
	SeasonConstructorStandingsData,
	SeasonDriverStandingsData,
	SeasonScheduleData,
	SeasonStatsBundle
} from '@/app/lib/cached-data';
import Season from '@/components/page/season/Season';

type HomeContentProps = {
	season: { year: number };
	scheduleData: SeasonScheduleData['season'];
	driverStandingsData: SeasonDriverStandingsData['season'];
	constructorStandingsData: SeasonConstructorStandingsData['season'];
	statsBundle: SeasonStatsBundle;
};

export default function HomeContent({
	season,
	scheduleData,
	driverStandingsData,
	constructorStandingsData,
	statsBundle
}: HomeContentProps) {
	return (
		<Season
			season={season}
			scheduleData={scheduleData}
			driverStandingsData={driverStandingsData}
			constructorStandingsData={constructorStandingsData}
			statsBundle={statsBundle}
		/>
	);
}
