'use client';

import {DriverAvatar, useAppState} from '@/components/app';
import {Career, Circuits, Season} from '@/components/page/driver';
import {Flag, Page, Tabs, Card, Typography} from '@/components/ui';
import {useGetTeamColor} from '@/hooks';
 
import {useTheme} from '@mui/material';
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
	<div className="flex flex-row flex-wrap gap-4 items-center text-[1.5em] font-bold">
		<div><Typography variant="h2">{driver.firstName} {driver.lastName}</Typography></div>
		<div className="hidden md:contents">
			{driver.nationalityCountryId && <div><Flag nationality={driver.nationalityCountryId} size={48}/></div>}
			<div className="flex-1"/>
			<div><Typography variant="h2" sx={{fontWeight: 'bold'}}>{driver.abbreviation}</Typography></div>
			<div style={{fontFamily: 'Racing Sans One', fontSize: '1.1em'}}>{driver.permanentNumber}</div>
		</div>
	</div>
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
					? <img src={bio.thumbnailUrl} alt={`${driver.firstName} ${driver.lastName}`} className="w-[200px] h-[200px] object-cover rounded-sm"/>
					: <DriverAvatar driverId={driver.rowId} size={200}/>
			}
			actionProps={{xs: 'auto'}}
			subheader={<><div className="border-t my-2"/></>}
			headerProps={{
				sx: {
					position:   'relative',
					pt:         3,
					'&:before': {
						position:   'absolute',
						left:       0,
						top:        0,
						bottom:     'auto',
						width:      '100%',
						height:     theme.spacing(2),
						content:    '" "',
						background: primaryColor ?? 'transparent'
					}
				}
			}}
		>
			{bio?.extract && (
				<Card sx={{mb: 2, p: 2}}>
					<Typography variant="body1">{bio.extract}</Typography>
				</Card>
			)}
			<Card>
				<Tabs active="career" tabs={tabs}/>
			</Card>
		</Page>
	);
}
