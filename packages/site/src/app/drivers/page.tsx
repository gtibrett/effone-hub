import type { Metadata } from 'next';

import { getDrivers } from '@/app/lib/cached-data';

import DriversContent from './DriversContent';

export const metadata: Metadata = {
	title: 'Drivers | effOne Hub'
};

export default async function DriversPage() {
	const drivers = await getDrivers();
	return <DriversContent drivers={drivers} />;
}
