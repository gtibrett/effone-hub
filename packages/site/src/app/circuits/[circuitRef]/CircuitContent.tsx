'use client';

import { Suspense } from 'react';
import { Card, CardContent, CardHeader, Divider, Grid, Stack, Typography } from '@mui/material';

import type { CircuitPageDataPair } from '@/app/lib/cached-data';
import {
	CircuitMap,
	EntityDisplayProvider,
	RaceMap,
	useMapCircuitsToMapPoints
} from '@/components/app';
import type { DriverDisplay, TeamDisplay } from '@/components/app/EntityDisplayProvider';
import { History, Season } from '@/components/page/circuits';
import { FastestLap, LapLeader, MostWins } from '@/components/page/circuits/stats';
import type { NextRaceQueryNode } from '@/components/page/raceWeekend/queries';
import { selectNextRace } from '@/components/page/raceWeekend/useNextRaceData';
import { OpenAILink, Page, Tabs } from '@/components/ui';
import type { CircuitHistoryData, CircuitPageData } from '@/hooks/data/useCircuitByRef';

type Props = CircuitPageDataPair & {
	circuitRef: string;
	currentSeason: number;
	races: NextRaceQueryNode[];
};

function buildDriverDisplays(history: CircuitHistoryData[]): DriverDisplay[] {
	const seen = new Map<string, DriverDisplay>();
	for (const race of history) {
		for (const result of race.raceResults) {
			if (!result.driverId || seen.has(result.driverId)) continue;
			seen.set(result.driverId, {
				id: result.driverId,
				firstName: result.driver.firstName,
				lastName: result.driver.lastName,
				abbreviation: result.driver.abbreviation,
				thumbnailUrl: result.driver.bio?.thumbnailUrl ?? null,
				teamColors: result.team?.colors ?? null
			});
		}
	}
	return [...seen.values()];
}

function buildTeamDisplays(history: CircuitHistoryData[]): TeamDisplay[] {
	const seen = new Map<string, TeamDisplay>();
	for (const race of history) {
		for (const result of race.raceResults) {
			const t = result.team;
			if (!t?.id || seen.has(t.id)) continue;
			seen.set(t.id, { id: t.id, name: t.name, colors: t.colors });
		}
	}
	return [...seen.values()];
}

export default function CircuitContent({
	circuitRef,
	current,
	prior,
	currentSeason,
	races
}: Props) {
	const mapCircuitsToMapPoints = useMapCircuitsToMapPoints();

	if (!circuitRef) {
		throw new Error('Page Not found');
	}

	if (!current) {
		return null;
	}

	// Wrap server data in the shape sub-components expect
	const data: CircuitPageData = { circuit: current };
	const lastSeasonData: CircuitPageData | undefined = prior ? { circuit: prior } : undefined;

	// wall-clock stays client-side; circuit page already has the server races
	const today = new Date().toISOString().slice(0, 10);
	const nextRace = selectNextRace(races, today);

	const seasonToShow = data.circuit.season?.[0]?.raceResults?.length
		? currentSeason
		: currentSeason - 1;

	const { points, onClick } = mapCircuitsToMapPoints([current]);

	const driverDisplays = buildDriverDisplays(current.history);
	const teamDisplays = buildTeamDisplays(current.history);

	return (
		<EntityDisplayProvider drivers={driverDisplays} teams={teamDisplays}>
			<Suspense>
				<Page
					title={current.fullName}
					subheader={
						<>
							<Typography variant="body1">
								{current.placeName}, {current.countryId}
							</Typography>
							{current.description?.description && (
								<>
									<Typography variant="body1">
										{current.description.description}
									</Typography>
									<Divider orientation="horizontal" className="my-2" />
									<OpenAILink />
								</>
							)}
						</>
					}
					action={
						<Card className="hidden md:block h-full">
							<RaceMap
								points={points}
								onClick={onClick}
								height="100%"
								centerOn={current}
								zoom
							/>
						</Card>
					}
					actionProps={{ size: { xs: 0, md: 4, lg: 3 } }}
				>
					<Grid container spacing={2}>
						<Grid
							className="order-2 md:order-1"
							size={{
								xs: 12,
								md: 8,
								lg: 9
							}}
						>
							<Card>
								<Tabs
									active="history"
									tabs={[
										{
											id: 'history',
											label: 'History',
											content: <History data={data} loading={false} />
										},
										{
											id: 'map',
											label: 'Circuit Map',
											content: (
												<CircuitMap
													circuitRef={circuitRef}
													circuitName={current.fullName}
													height="50vh"
												/>
											)
										},
										{
											id: 'season',
											label: `${currentSeason} Season`,
											content: (
												<Season
													data={data}
													loading={false}
													nextRace={nextRace}
												/>
											)
										}
									]}
								/>
							</Card>
						</Grid>

						<Grid
							className="order-1 md:order-2"
							size={{
								xs: 12,
								md: 4,
								lg: 3
							}}
						>
							<Card className="h-full">
								<CardHeader title={`${seasonToShow} Season`} />
								<CardContent>
									<Stack spacing={2}>
										<LapLeader
											data={
												seasonToShow === currentSeason
													? data
													: lastSeasonData
											}
											loading={false}
										/>
										<MostWins
											data={
												seasonToShow === currentSeason
													? data
													: lastSeasonData
											}
											loading={false}
										/>
										<FastestLap
											data={
												seasonToShow === currentSeason
													? data
													: lastSeasonData
											}
											loading={false}
										/>
									</Stack>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</Page>
			</Suspense>
		</EntityDisplayProvider>
	);
}
