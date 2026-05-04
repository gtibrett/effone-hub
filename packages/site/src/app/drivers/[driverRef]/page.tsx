import {Driver as DriverT} from '@/gql/graphql';
import DriversQuery from '@/components/page/driver/DriversQuery';
import {DriverQuery} from '@/hooks/data/useDriver';
import type {Metadata} from 'next';
import {getClient} from '../../lib/apollo-rsc';
import DriverContent from './DriverContent';

type Params = Promise<{driverRef: string}>;

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams(): Promise<{driverRef: string}[]> {
	try {
		const {data: {drivers}} = await getClient().query<{drivers: {nodes: DriverT[]}}>({query: DriversQuery});
		return drivers.nodes.map(d => ({driverRef: d.rowId!}));
	} catch {
		return [];
	}
}

export async function generateMetadata({params}: {params: Params}): Promise<Metadata> {
	const {driverRef} = await params;
	try {
		const {data} = await getClient().query<{driver: DriverT}>({query: DriverQuery, variables: {id: driverRef}});
		const d      = data.driver;
		return {title: d ? `${d.firstName} ${d.lastName} | effOne Hub` : `Driver: ${driverRef} | effOne Hub`};
	} catch {
		return {title: `Driver: ${driverRef} | effOne Hub`};
	}
}

export default async function DriverPage({params}: {params: Params}) {
	const {driverRef} = await params;

	let driver: DriverT | null = null;
	try {
		const {data} = await getClient().query<{driver: DriverT}>({query: DriverQuery, variables: {id: driverRef}});
		driver       = data.driver ?? null;
	} catch {
		// fall back
	}

	return <DriverContent driver={driver}/>;
}
