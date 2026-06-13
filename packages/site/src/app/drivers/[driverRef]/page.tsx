import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
	getAppSeasonState,
	getCurrentSeasonDriverIds,
	getDriver,
	getDriverCareer,
	getDriverCircuits,
	getDriverSeason,
	getDriverStats
} from '../../lib/cached-data';
import DriverContent from './DriverContent';

type Params = Promise<{ driverRef: string }>;

export async function generateStaticParams(): Promise<{ driverRef: string }[]> {
	const ids = await getCurrentSeasonDriverIds();
	return ids.map(driverRef => ({ driverRef }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { driverRef } = await params;
	const d = await getDriver(driverRef);
	return {
		title: d ? `${d.firstName} ${d.lastName} | effOne Hub` : `Driver: ${driverRef} | effOne Hub`
	};
}

export default async function DriverPage({ params }: { params: Params }) {
	const { driverRef } = await params;

	const [driver, { currentSeason }] = await Promise.all([
		getDriver(driverRef),
		getAppSeasonState()
	]);

	if (!driver) notFound();

	const latestSeasonNode = driver.seasonEntrantDrivers?.[0];
	const isCurrentSeason = latestSeasonNode?.year === currentSeason;

	const [careerData, circuitRawData, statsData, seasonRaces] = await Promise.all([
		getDriverCareer(driverRef),
		getDriverCircuits(driverRef),
		getDriverStats(driverRef),
		isCurrentSeason ? getDriverSeason(driverRef, currentSeason) : Promise.resolve(null)
	]);

	return (
		<DriverContent
			driver={driver}
			careerData={careerData}
			circuitRawData={circuitRawData}
			statsData={statsData}
			seasonRaces={seasonRaces}
		/>
	);
}
