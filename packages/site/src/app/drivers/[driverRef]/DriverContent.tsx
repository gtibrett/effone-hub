'use client';

import {DriverAvatar, useAppState} from '@/components/app';
import {Career, Circuits, Season} from '@/components/page/driver';
import {Flag, Page, Tabs, Card, Typography} from '@/components/ui';
import {useGetTeamColor} from '@/hooks';
import Image from 'next/image';
import type {ReactNode} from 'react';
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

type DriverDetailsProps = {
	driver:    DriverPageProp;
	portrait?: ReactNode;
};

const DriverDetails = ({driver, portrait}: DriverDetailsProps) => (
	<div className="text-[1.5em] font-bold">
		{portrait}
		<div className="flex flex-row flex-wrap gap-4 items-center">
			<div><Typography variant="h2">{driver.firstName} {driver.lastName}</Typography></div>
			<div className="hidden md:contents">
				{driver.nationalityCountryId && <div><Flag nationality={driver.nationalityCountryId} className="w-12 h-12 text-2xl"/></div>}
				<div className="flex-1"/>
				<div><Typography variant="h2" className="font-bold">{driver.abbreviation}</Typography></div>
				<div className="font-racing-sans-one text-[1.1em]">{driver.permanentNumber}</div>
			</div>
		</div>
	</div>
);

export default function DriverContent({driver}: {driver: DriverPageProp | null}) {
	const getTeamColor      = useGetTeamColor();
	const [{currentSeason}] = useAppState();

	if (!driver) {
		return null;
	}

	const latestSeasonNode = driver.seasonEntrantDrivers?.nodes?.[0];
	const teamStripeColor  = getTeamColor(latestSeasonNode?.team?.colors, 'primaryHex', false);
	const isCurrentSeason  = latestSeasonNode?.year === currentSeason;

	const tabs = [
		{id: 'career',   label: 'Career',   content: <Career driverId={driver.rowId}/>},
		{id: 'circuits', label: 'Circuits', content: <Circuits driverId={driver.rowId}/>}
	];

	if (isCurrentSeason) {
		tabs.push({id: 'season', label: `${currentSeason} Season`, content: <Season driverId={driver.rowId} season={currentSeason}/>});
	}

	const bio = driver.bio;

	const portrait = bio?.thumbnailUrl
		? <Image width={128} src={bio.thumbnailUrl} alt={`${driver.firstName} ${driver.lastName}`} className="aspect-square float-right ml-4 mb-2 object-cover rounded-sm"/>
		: <div className="float-right ml-4 mb-2"><DriverAvatar driverId={driver.rowId} size="large"/></div>;

	return (
		<Page
			title={
				<>
					<div
						aria-hidden
						className="absolute top-0 left-0 right-0 h-1.5"
						style={{background: teamStripeColor}}
					/>
					<DriverDetails driver={driver} portrait={portrait}/>
				</>
			}
			subheader={<><div className="border-t my-2"/></>}
			headerProps={{
				className: 'relative overflow-hidden pt-6'
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
