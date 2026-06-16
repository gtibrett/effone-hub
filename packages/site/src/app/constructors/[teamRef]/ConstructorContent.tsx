'use client';

import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	Stack,
	Typography
} from '@mui/material';

import type {
	ConstructorDriverPodiumsData,
	ConstructorDriverPointsData,
	ConstructorDriverQualifyingData,
	ConstructorSeasonRace,
	TeamRecord
} from '@/app/lib/cached-data';
import { EntityDisplayProvider } from '@/components/app';
import type { DriverDisplay } from '@/components/app/EntityDisplayProvider';
import { Drivers, History, Season } from '@/components/page/constructor';
import { DriverPodiums, DriverPoints, DriverQualifying } from '@/components/page/constructor/stats';
import type { ConstructorPageData } from '@/components/page/constructor/types';
import { Flag, Page, Tabs } from '@/components/ui';
import { Header } from '@/components/ui/page/Header';
import { useGetTeamColor } from '@/hooks';

const TeamDetails = ({ team }: { team: TeamRecord }) => (
	<Grid container spacing={4} className="items-center text-[1.5em] font-bold">
		<Grid>
			<Typography variant="h2">{team.name}</Typography>
		</Grid>
		{team.country && (
			<Grid>
				<Flag nationality={team.country} size={48} />
			</Grid>
		)}
	</Grid>
);

type SeasonStats = {
	points: ConstructorDriverPointsData;
	podiums: ConstructorDriverPodiumsData;
	qualifying: ConstructorDriverQualifyingData;
} | null;

type Props = {
	teamRef: string;
	team: TeamRecord;
	currentSeason: number;
	constructorData: ConstructorPageData | null;
	isInCurrentSeason: boolean;
	seasonRaces: ConstructorSeasonRace[];
	seasonStats: SeasonStats;
};

function buildDriverDisplays(constructorData: ConstructorPageData | null): DriverDisplay[] {
	if (!constructorData) return [];
	const seen = new Map<string, DriverDisplay>();
	for (const dy of constructorData.team.drivers) {
		const d = dy.driver;
		if (!d?.id || seen.has(d.id)) continue;
		seen.set(d.id, {
			id: d.id,
			firstName: d.firstName,
			lastName: d.lastName,
			abbreviation: d.abbreviation,
			thumbnailUrl: d.bio?.thumbnailUrl,
			// drivers in this list all drove for this team; use the team's colors
			teamColors: constructorData.team.colors
		});
	}
	return [...seen.values()];
}

export default function ConstructorContent({
	teamRef,
	team,
	currentSeason,
	constructorData,
	isInCurrentSeason,
	seasonRaces,
	seasonStats
}: Props) {
	const getTeamColor = useGetTeamColor();

	const tabs = [
		{
			id: 'history',
			label: 'History',
			content: <History data={constructorData ?? undefined} loading={false} />
		},
		{
			id: 'drivers',
			label: 'Drivers',
			content: <Drivers data={constructorData ?? undefined} loading={false} />
		}
	];

	if (isInCurrentSeason) {
		tabs.push({
			id: 'season',
			label: `${currentSeason} Season`,
			content: <Season teamId={team.id} season={currentSeason} races={seasonRaces} />
		});
	}

	const bio = team.bio;
	const driverDisplays = buildDriverDisplays(constructorData);

	return (
		<EntityDisplayProvider drivers={driverDisplays}>
			<Page
				header={
					<Grid container spacing={2} className="items-stretch">
						<Grid size="grow">
							<Header
								title={<TeamDetails team={team} />}
								subheader={
									<>
										<Divider orientation="horizontal" className="my-2" />
										{bio?.extract && (
											<Typography variant="body1">{bio.extract}</Typography>
										)}
									</>
								}
								headerProps={{
									className: 'relative pt-3'
								}}
								extra={
									<div
										className="absolute inset-0 bottom-auto h-2"
										style={{ background: getTeamColor(team.colors) }}
									/>
								}
							/>
						</Grid>
						{bio?.thumbnailUrl && (
							<Grid size={{ xs: 0, md: 2 }}>
								<Box
									component="img"
									src={bio.thumbnailUrl}
									alt={team.name ?? ''}
									className="w-full aspect-square object-contain rounded"
								/>
							</Grid>
						)}
					</Grid>
				}
			>
				<Grid container spacing={2}>
					<Grid
						size={{
							xs: 12,
							md: isInCurrentSeason ? 8 : 12,
							lg: isInCurrentSeason ? 9 : 12
						}}
						className="order-2 md:order-1"
					>
						<Card variant="outlined">
							<Tabs active="history" tabs={tabs} />
						</Card>
					</Grid>

					{isInCurrentSeason && seasonStats && (
						<Grid
							size={{
								xs: 12,
								md: 4,
								lg: 3
							}}
							className="order-1 md:order-2"
						>
							<Card variant="outlined">
								<CardHeader title={`${currentSeason} Season Stats`} />
								<CardContent>
									<Stack spacing={2}>
										<DriverPoints data={seasonStats.points} place={1} />
										<DriverPoints data={seasonStats.points} place={2} />
										<Grid size={12}>
											<Typography variant="h4">Podiums</Typography>
										</Grid>
										<DriverPodiums data={seasonStats.podiums} place={1} />
										<DriverPodiums data={seasonStats.podiums} place={2} />
										<Grid size={12}>
											<Typography variant="h4">
												Qualifying Head-to-Head
											</Typography>
										</Grid>
										<DriverQualifying data={seasonStats.qualifying} place={1} />
										<DriverQualifying data={seasonStats.qualifying} place={2} />
									</Stack>
								</CardContent>
							</Card>
						</Grid>
					)}
				</Grid>
			</Page>
		</EntityDisplayProvider>
	);
}
