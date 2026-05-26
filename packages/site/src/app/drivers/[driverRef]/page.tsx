import type { Metadata } from 'next';

import {
	buildCurrentSeasonDriverRowIds,
	buildDriverFull,
	buildDriverName
} from '../../lib/build-pg';
import DriverContent from './DriverContent';

type Params = Promise<{ driverRef: string }>;

export async function generateStaticParams(): Promise<{ driverRef: string }[]> {
	const ids = await buildCurrentSeasonDriverRowIds();
	return ids.map(driverRef => ({ driverRef }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { driverRef } = await params;
	const d = await buildDriverName(driverRef);
	return {
		title: d ? `${d.firstName} ${d.lastName} | effOne Hub` : `Driver: ${driverRef} | effOne Hub`
	};
}

export default async function DriverPage({ params }: { params: Params }) {
	const { driverRef } = await params;
	const driver = await buildDriverFull(driverRef);
	return <DriverContent driver={driver} />;
}
