'use client';

import { Suspense } from 'react';
import { Card, CardContent, CardHeader, Grid, Stack } from '@mui/material';

import type {
	SeasonConstructorStandingsData,
	SeasonDriverStandingsData,
	SeasonScheduleData,
	SeasonStatsBundle
} from '@/app/lib/cached-data';
import { EntityDisplayProvider } from '@/components/app';
import type { DriverDisplay, TeamDisplay } from '@/components/app/EntityDisplayProvider';
import type { NextRaceQueryNode } from '@/components/page/raceWeekend/queries';
import RaceWeekend from '@/components/page/raceWeekend/RaceWeekend';
import { Schedule } from '@/components/page/season/index';
import { ScheduleSkeleton } from '@/components/page/season/Schedule';
import { DriverStandings, TeamStandings } from '@/components/page/season/standings';
import {
	DNFs,
	FastestLap,
	FastestLaps,
	LapLeader,
	Poles,
	PositionsGained,
	SprintWins,
	Wins
} from '@/components/page/season/stats';
import { Page } from '@/components/ui';
import type { Season as SeasonT } from '@/gql/graphql';

type SeasonProps = {
	season: Pick<SeasonT, 'year'>;
	races: NextRaceQueryNode[];
	scheduleData: SeasonScheduleData['season'];
	driverStandingsData: SeasonDriverStandingsData['season'];
	constructorStandingsData: SeasonConstructorStandingsData['season'];
	statsBundle: SeasonStatsBundle;
};

function buildEntityDisplays(
	driverStandingsData: SeasonDriverStandingsData['season'],
	constructorStandingsData: SeasonConstructorStandingsData['season']
): { drivers: DriverDisplay[]; teams: TeamDisplay[] } {
	const driverMap = new Map<string, DriverDisplay>();
	const teamMap = new Map<string, TeamDisplay>();

	for (const s of driverStandingsData?.seasonDriverStandingsByYear ?? []) {
		const d = s.driver;
		if (!d?.id || driverMap.has(d.id)) continue;
		const entrant = d.seasonEntrantDrivers[0];
		driverMap.set(d.id, {
			id: d.id,
			firstName: d.firstName,
			lastName: d.lastName,
			abbreviation: d.abbreviation,
			thumbnailUrl: d.bio?.thumbnailUrl,
			teamColors: entrant?.team?.colors ?? undefined
		});
	}

	for (const s of constructorStandingsData?.seasonTeamStandingsByYear ?? []) {
		const t = s.team;
		if (!t?.id || teamMap.has(t.id)) continue;
		teamMap.set(t.id, {
			id: t.id,
			name: t.name,
			thumbnailUrl: t.bio?.thumbnailUrl,
			colors: t.colors ?? undefined
		});
	}

	return { drivers: [...driverMap.values()], teams: [...teamMap.values()] };
}

export default function Season({
	season,
	races,
	scheduleData,
	driverStandingsData,
	constructorStandingsData,
	statsBundle
}: SeasonProps) {
	const { drivers: driverDisplays, teams: teamDisplays } = buildEntityDisplays(
		driverStandingsData,
		constructorStandingsData
	);

	return (
		<EntityDisplayProvider drivers={driverDisplays} teams={teamDisplays}>
			<Page title={`${season.year} Season`} headerProps={{ sx: { minWidth: 480 } }}>
				<Grid container spacing={2} className="items-stretch">
					<Grid
						size={{
							xs: 12,
							lg: 8
						}}
					>
						<Grid container spacing={2} className="items-stretch">
							<Suspense>
								<RaceWeekend races={races} />
							</Suspense>
							<Grid size={12}>
								<Schedule season={season.year} data={scheduleData} />
							</Grid>
						</Grid>
					</Grid>
					<Grid
						size={{
							xs: 12,
							lg: 4
						}}
					>
						<Grid container spacing={2}>
							<Grid size={12}>
								<DriverStandings
									season={season.year}
									data={driverStandingsData}
									driverChampionData={statsBundle.driverChampion}
								/>
							</Grid>
							<Grid size={12}>
								<TeamStandings
									season={season.year}
									data={constructorStandingsData}
									constructorChampionData={statsBundle.constructorChampion}
								/>
							</Grid>

							<Grid size={12}>
								<Card>
									<CardHeader title="Season Stats" />
									<CardContent>
										<Stack spacing={2}>
											<Wins
												size="small"
												season={season.year}
												data={statsBundle.wins}
											/>
											<SprintWins
												size="small"
												season={season.year}
												data={statsBundle.sprintWins}
											/>
											<Grid size={12} className="block lg:hidden" />
											<Poles
												size="small"
												season={season.year}
												data={statsBundle.poles}
											/>
											<FastestLaps
												season={season.year}
												data={statsBundle.fastestLap}
											/>
											<Grid size={12} className="block lg:hidden" />
											<FastestLap
												season={season.year}
												data={statsBundle.fastestLap}
											/>
											<LapLeader
												size="small"
												season={season.year}
												data={statsBundle.lapLeader}
											/>
											<Grid size={12} className="block lg:hidden" />
											<PositionsGained
												size="small"
												season={season.year}
												data={statsBundle.positionsGained}
											/>
											<DNFs
												size="small"
												season={season.year}
												data={statsBundle.dnfs}
											/>
										</Stack>
									</CardContent>
								</Card>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Page>
		</EntityDisplayProvider>
	);
}
