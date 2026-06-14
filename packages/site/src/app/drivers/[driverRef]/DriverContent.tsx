'use client';

import { Box, Card, Divider, Grid, Typography } from '@mui/material';

import type { DriverCareerData, DriverCircuitRawData } from '@/app/lib/cached-data';
import { DriverAvatar, useAppState } from '@/components/app';
import { Career, Circuits, Season } from '@/components/page/driver';
import type { DriverStatsData } from '@/components/page/driver/stats/useDriverStatsData';
import { Flag, Page, Tabs } from '@/components/ui';
import { Header } from '@/components/ui/page/Header';
import type { Driver, Race } from '@/gql/graphql';

/**
 * The subset of `Driver` fields DriverContent reads at the top level.
 * Structurally assignable from the GraphQL `Driver` type (via `getDriver`).
 */
export type DriverPageProp = {
	id: string;
	firstName?: string | null;
	lastName?: string | null;
	abbreviation?: string | null;
	permanentNumber?: string | null;
	// Country object (alpha2Code/name) consumed by <Flag/>, not the bare id.
	nationalityCountry?: Driver['nationalityCountry'];
	bio?: {
		thumbnailUrl?: string | null;
		extract?: string | null;
	} | null;
	seasonEntrantDrivers?: Array<{
		year: number;
		team?: {
			id?: string | null;
			colors?: { primaryHex?: string | null } | null;
		} | null;
	}> | null;
};

export type DriverContentProps = {
	driver: DriverPageProp | null;
	careerData: DriverCareerData['driver'] | null;
	circuitRawData: DriverCircuitRawData['driver'] | null;
	statsData: DriverStatsData['driver'] | null;
	seasonRaces: Race[] | null;
};

const DriverDetails = ({ driver }: { driver: DriverPageProp }) => (
	<Grid container spacing={2} className="items-center text-[1.5em] font-bold">
		<Grid>
			<Typography variant="h2">
				{driver.firstName} {driver.lastName}
			</Typography>
		</Grid>
		<Box className="hidden md:contents">
			{driver.nationalityCountry && (
				<Grid>
					<Flag nationality={driver.nationalityCountry} size={48} />
				</Grid>
			)}
			<Grid size="grow" />
			<Grid>
				<Typography variant="h2" className="font-bold">
					{driver.abbreviation}
				</Typography>
			</Grid>
			<Grid className="font-racing text-[1.1em]">{driver.permanentNumber}</Grid>
		</Box>
	</Grid>
);

export default function DriverContent({
	driver,
	careerData,
	circuitRawData,
	statsData,
	seasonRaces
}: DriverContentProps) {
	const [{ currentSeason }] = useAppState();

	if (!driver) {
		return null;
	}

	const latestSeasonNode = driver.seasonEntrantDrivers?.[0];
	const primaryColor = latestSeasonNode?.team?.colors?.primaryHex;
	const isCurrentSeason = latestSeasonNode?.year === currentSeason;
	const currentSeasonTeam = isCurrentSeason ? (latestSeasonNode?.team ?? null) : null;

	const tabs = [
		{
			id: 'career',
			label: 'Career',
			content: <Career driverId={driver.id} careerData={careerData} statsData={statsData} />
		},
		{
			id: 'circuits',
			label: 'Circuits',
			content: <Circuits driverId={driver.id} circuitRawData={circuitRawData} />
		}
	];

	if (isCurrentSeason && seasonRaces) {
		tabs.push({
			id: 'season',
			label: `${currentSeason} Season`,
			content: (
				<Season
					driverId={driver.id}
					season={currentSeason}
					races={seasonRaces}
					careerData={careerData}
					currentSeasonTeam={currentSeasonTeam}
				/>
			)
		});
	}

	const bio = driver.bio;

	return (
		<Page
			header={
				<Grid container spacing={2} className="items-stretch">
					<Grid size="grow">
						<Header
							title={<DriverDetails driver={driver} />}
							actionProps={{ size: 'auto' }}
							subheader={
								<>
									<Divider orientation="horizontal" className="my-2" />
									{bio?.extract && (
										<Typography variant="body1">{bio.extract}</Typography>
									)}
								</>
							}
							extra={
								<div
									className="absolute inset-0 bottom-auto h-4"
									style={{ background: primaryColor || undefined }}
								/>
							}
							headerProps={{
								className: 'relative pt-6'
							}}
						/>
					</Grid>
					<Grid size={{ xs: 12, md: 3 }}>
						{bio?.thumbnailUrl ? (
							<Box
								component="img"
								src={bio.thumbnailUrl}
								alt={`${driver.firstName} ${driver.lastName}`}
								className="w-full aspect-square object-cover rounded"
							/>
						) : (
							<DriverAvatar driverId={driver.id} size={200} />
						)}
					</Grid>
				</Grid>
			}
		>
			<Card>
				<Tabs active="career" tabs={tabs} urlParam="tab" />
			</Card>
		</Page>
	);
}
