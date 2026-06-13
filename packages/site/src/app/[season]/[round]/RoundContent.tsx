'use client';

import {
	Box,
	Card,
	CardContent,
	CardHeader,
	CardMedia,
	Grid,
	Link,
	Stack,
	Typography
} from '@mui/material';

import type {
	RaceLapByLapData,
	RacePitStopsData,
	RaceQualifyingData,
	RaceStatsBundle
} from '@/app/lib/cached-data';
import { EntityDisplayProvider, RaceMap, useMapSeasonRacesToMapPoints } from '@/components/app';
import type { DriverDisplay, TeamDisplay } from '@/components/app/EntityDisplayProvider';
import { Laps, PitStops, Qualifying, Results, SprintResults } from '@/components/page/race';
import { useLapByLapData } from '@/components/page/race/lapByLap/useLapByLapChartData';
import { FastestLap, LapLeader, Pole, PositionsGained } from '@/components/page/race/stats';
import { OpenAILink, Page, type TabContent, Tabs } from '@/components/ui';
import type { Race } from '@/gql/graphql';

type Props = {
	season: string;
	round: string;
	race: Partial<Race>;
	raceData: Race | null;
	qualifying: RaceQualifyingData['race'];
	pitStops: RacePitStopsData['race'];
	lapByLap: RaceLapByLapData['race'];
	stats: RaceStatsBundle;
};

function buildEntityDisplays(raceData: Race | null): {
	drivers: DriverDisplay[];
	teams: TeamDisplay[];
} {
	if (!raceData?.raceResults) return { drivers: [], teams: [] };

	const driverMap = new Map<string, DriverDisplay>();
	const teamMap = new Map<string, TeamDisplay>();

	for (const r of raceData.raceResults) {
		if (!r) continue;

		const d = r.driver;
		if (d?.id && !driverMap.has(d.id)) {
			driverMap.set(d.id, {
				id: d.id,
				firstName: d.firstName,
				lastName: d.lastName,
				abbreviation: d.abbreviation,
				thumbnailUrl: d.bio?.thumbnailUrl,
				teamColors: r.team?.colors ?? undefined
			});
		}

		const t = r.team;
		if (t?.id && !teamMap.has(t.id)) {
			teamMap.set(t.id, {
				id: t.id,
				colors: t.colors ?? undefined
			});
		}
	}

	return { drivers: [...driverMap.values()], teams: [...teamMap.values()] };
}

export default function RoundContent({
	season: seasonStr,
	round: roundStr,
	race,
	raceData,
	qualifying,
	pitStops,
	lapByLap,
	stats
}: Props) {
	const season = Number(seasonStr);
	const round = Number(roundStr);
	const mapSeasonRacesToFeatures = useMapSeasonRacesToMapPoints();

	const results = raceData?.raceResults;
	const sprintResults = (raceData?.sprintRaceResults ?? []).filter(
		(r): r is NonNullable<typeof r> => r != null
	);

	const qualifyingRows = qualifying?.qualifyingResults ?? [];
	const pitStopNodes = pitStops?.pitStops ?? [];

	// Build LapByLapData from server payload (no Apollo query).
	const lapByLapData = useLapByLapData(lapByLap);

	const circuitDescription = race?.circuit?.description?.description || '';
	const hasResults = Number(results?.length) > 0;
	const seasonToShow = hasResults ? season : season - 1;
	const { points, onClick } = mapSeasonRacesToFeatures(season, [
		{
			officialName: race.officialName ?? '',
			round: race.round ?? 0,
			latitude: race.circuit?.latitude ?? null,
			longitude: race.circuit?.longitude ?? null,
			hasResults
		}
	]);

	const { drivers: driverDisplays, teams: teamDisplays } = buildEntityDisplays(raceData);

	const tabs: TabContent[] = [
		{
			id: 'race',
			label: 'Race',
			content: <Results results={results} />
		},
		{
			id: 'Sprint',
			label: 'Sprint',
			content: <SprintResults results={sprintResults} />
		},
		{
			id: 'quali',
			label: 'Qualifying',
			content: <Qualifying rows={qualifyingRows} />
		},
		{
			id: 'laps',
			label: 'Laps',
			content: <Laps lapByLapData={lapByLapData} />
		},
		{
			id: 'pit-stops',
			label: 'Pit Stops',
			content: <PitStops nodes={pitStopNodes} />
		},
		{
			id: 'circuit',
			label: 'Circuit',
			content: (
				<Card>
					<CardHeader
						title={
							<Link href={`/circuits/${race.circuit?.id}`}>
								{race.circuit?.fullName}
							</Link>
						}
					/>
					<CardMedia>
						<RaceMap
							points={points}
							onClick={onClick}
							height={140}
							centerOn={{
								latitude: race.circuit?.latitude,
								longitude: race.circuit?.longitude
							}}
							zoom
						/>
					</CardMedia>
					<CardContent>
						<Typography variant="body1">
							{circuitDescription}{' '}
							<Box component="span" className="block">
								<OpenAILink />
							</Box>
						</Typography>
					</CardContent>
				</Card>
			)
		}
	];

	if (!sprintResults.length) {
		tabs.splice(1, 1);
	}

	return (
		<EntityDisplayProvider drivers={driverDisplays} teams={teamDisplays}>
			<Page
				title={race.officialName}
				subheader={
					<Typography>
						Round {race.round},{' '}
						{race.date ? new Date(race.date).toLocaleDateString() : ''}
					</Typography>
				}
				extra={null}
				action={
					race.circuit && (
						<Card className="hidden md:block">
							<CardMedia>
								<RaceMap
									points={points}
									onClick={onClick}
									height={140}
									centerOn={{
										latitude: race.circuit.latitude,
										longitude: race.circuit.longitude
									}}
									zoom
								/>
							</CardMedia>
							<CardHeader
								title={
									<Link href={`/circuits/${race.circuit.id}`}>
										{race.circuit.fullName}
									</Link>
								}
							/>
						</Card>
					)
				}
				actionProps={{ size: { xs: 0, md: 3 } }}
			>
				<Grid container spacing={2}>
					<Grid
						size={{
							xs: 12,
							md: 8,
							lg: 9
						}}
						className="order-2 md:order-1"
					>
						<Card>
							{hasResults ? (
								<Tabs active="race" tabs={tabs} />
							) : (
								<CardContent>
									<Typography variant="h5">
										<Link href={`/circuits/${race.circuit?.id}`}>
											{race.circuit?.fullName}
										</Link>
									</Typography>
									<Typography variant="h6">
										{race.circuit?.placeName}, {race.circuit?.countryId}
									</Typography>
									{circuitDescription && (
										<>
											<Typography variant="body2">
												{circuitDescription}
											</Typography>
											<Box className="text-right block">
												<OpenAILink />
											</Box>
										</>
									)}
								</CardContent>
							)}
						</Card>
					</Grid>

					<Grid
						size={{
							xs: 12,
							md: 4,
							lg: 3
						}}
						className="order-1 md:order-2"
					>
						<Card className="h-full">
							<CardContent>
								<Stack spacing={2}>
									<CardHeader title={`${seasonToShow} Season`} />
									<Pole data={stats.poles} size="small" />
									<FastestLap data={stats.fastestLap} size="small" />
									<Grid size={12} className="block lg:hidden" />
									<LapLeader data={stats.lapLeader} size="small" />
									<PositionsGained data={stats.positionsGained} size="small" />
								</Stack>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Page>
		</EntityDisplayProvider>
	);
}
