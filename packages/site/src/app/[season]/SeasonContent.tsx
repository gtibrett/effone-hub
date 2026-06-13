'use client';

import type {
	SeasonConstructorStandingsData,
	SeasonDriverStandingsData,
	SeasonScheduleData,
	SeasonStatsBundle
} from '@/app/lib/cached-data';
import SeasonView from '@/components/page/season/Season';

type SeasonContentProps = {
	season: { year: number };
	scheduleData: SeasonScheduleData['season'];
	driverStandingsData: SeasonDriverStandingsData['season'];
	constructorStandingsData: SeasonConstructorStandingsData['season'];
	statsBundle: SeasonStatsBundle;
};

export default function SeasonContent({
	season,
	scheduleData,
	driverStandingsData,
	constructorStandingsData,
	statsBundle
}: SeasonContentProps) {
	return (
		<SeasonView
			season={season}
			scheduleData={scheduleData}
			driverStandingsData={driverStandingsData}
			constructorStandingsData={constructorStandingsData}
			statsBundle={statsBundle}
		/>
	);
}
