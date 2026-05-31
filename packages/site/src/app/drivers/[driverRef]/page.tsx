import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getCurrentSeasonDriverIds, getDriver } from '../../lib/cached-data';
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
	const driver = await getDriver(driverRef);
	if (!driver) notFound();
	return <DriverContent driver={driver} />;
}
