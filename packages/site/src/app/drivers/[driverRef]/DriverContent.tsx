'use client';

import {DriverAvatar, useAppState} from '@/components/app';
import {Career, Circuits, Season} from '@/components/page/driver';
import {Flag, Page} from '@/components/ui';
import {useGetTeamColor} from '@/hooks';
import {Tabs} from '@/components/ui';
import {Box, Card, Divider, Grid, Typography, useTheme} from '@mui/material';

/**
 * The subset of `Driver` fields DriverContent reads at the top level.
 * Nested components (Career, Circuits, Season, DriverAvatar) fetch their own
 * data client-side via Apollo from `driver.rowId`, so this prop only needs
 * the header fields plus the latest-team color and the bio thumbnail/extract.
 *
 * Both the GraphQL `Driver` type and the pg-backed `BuildDriverRow` (see
 * `src/app/lib/build-pg.ts`) are structurally assignable to this shape.
 */
export type DriverPageProp = {
	rowId:                string;
	firstName?:           string | null;
	lastName?:            string | null;
	abbreviation?:        string | null;
	permanentNumber?:     string | null;
	nationalityCountryId?: string | null;
	bio?: {
		thumbnailUrl?: string | null;
		extract?:      string | null;
	} | null;
	seasonEntrantDrivers?: {
		nodes: Array<{
			year:   number;
			team?: {
				colors?: {primaryHex?: string | null} | null;
			} | null;
		}>;
	} | null;
};

const DriverDetails = ({driver}: {driver: DriverPageProp}) => (
	<Grid
        container
        spacing={2}
        className="items-center text-[1.5em] font-bold">
		<Grid><Typography variant="h2">{driver.firstName} {driver.lastName}</Typography></Grid>
		<Box className="hidden md:contents">
			{driver.nationalityCountryId && <Grid><Flag nationality={driver.nationalityCountryId} size={48}/></Grid>}
			<Grid size="grow" />
			<Grid><Typography variant="h2" className="font-bold">{driver.abbreviation}</Typography></Grid>
			<Grid className="font-racing text-[1.1em]">{driver.permanentNumber}</Grid>
		</Box>
	</Grid>
);

export default function DriverContent({driver}: {driver: DriverPageProp | null}) {
	const theme             = useTheme();
	const getTeamColor      = useGetTeamColor();
	const [{currentSeason}] = useAppState();

	if (!driver) {
		return null;
	}

	const latestSeasonNode = driver.seasonEntrantDrivers?.nodes?.[0];
	const primaryColor     = latestSeasonNode?.team?.colors?.primaryHex;
	const isCurrentSeason  = latestSeasonNode?.year === currentSeason;

	const tabs = [
		{id: 'career',   label: 'Career',   content: <Career driverId={driver.rowId}/>},
		{id: 'circuits', label: 'Circuits', content: <Circuits driverId={driver.rowId}/>}
	];

	if (isCurrentSeason) {
		tabs.push({id: 'season', label: `${currentSeason} Season`, content: <Season driverId={driver.rowId} season={currentSeason}/>});
	}

	const bio = driver.bio;

	return (
		<Page
			title={<DriverDetails driver={driver}/>}
			action={
				bio?.thumbnailUrl
					? <Box component="img" src={bio.thumbnailUrl} alt={`${driver.firstName} ${driver.lastName}`} className="w-[200px] h-[200px] object-cover rounded"/>
					: <DriverAvatar driverId={driver.rowId} size={200}/>
			}
			
			actionProps={{size: 'auto'}}
			subheader={<><Divider orientation="horizontal" className="my-2"/></>}
			extra={<div className="absolute inset-0 bottom-auto h-4" style={{background: primaryColor || undefined}}/>}
			headerProps={{
				className:"relative pt-6",
			}}
		>
			{bio?.extract && (
				<Card className="mb-4 p-4">
					<Typography variant="body1">{bio.extract}</Typography>
				</Card>
			)}
			<Card>
				<Tabs active="career" tabs={tabs}/>
			</Card>
		</Page>
	);
}
