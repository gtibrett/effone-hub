import type {Metadata} from 'next';
import {buildDriverFull, buildDriverName, buildDriverRowIds} from '../../lib/build-pg';
import DriverContent from './DriverContent';

type Params = Promise<{driverRef: string}>;

export async function generateStaticParams(): Promise<{driverRef: string}[]> {
	const ids = await buildDriverRowIds();
	return ids.map(driverRef => ({driverRef}));
}

export async function generateMetadata({params}: {params: Params}): Promise<Metadata> {
	const {driverRef} = await params;
	const d = await buildDriverName(driverRef);
	return {title: d ? `${d.firstName} ${d.lastName} | effOne Hub` : `Driver: ${driverRef} | effOne Hub`};
}

export default async function DriverPage({params}: {params: Params}) {
	const {driverRef} = await params;
	const driver = await buildDriverFull(driverRef);
	// `as any` because buildDriverFull returns a hand-built shape that mirrors
	// the GraphQL Driver type but skips fields DriverContent doesn't read at
	// the top level (bio is fetched client-side by useDriver in nested
	// components).
	return <DriverContent driver={driver as any}/>;
}
