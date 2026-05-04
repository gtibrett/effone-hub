import {PastSeasonsQuery, SingleSeasonQuery} from '@/data/query/season.graphql';
import type {Metadata} from 'next';
import {getClient} from '../lib/apollo-rsc';
import SeasonContent from './SeasonContent';

type Params = Promise<{season: string}>;

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams(): Promise<{season: string}[]> {
	try {
		const {data: {seasons}} = await getClient().query<{seasons: {nodes: {year: number}[]}}>({query: PastSeasonsQuery});
		return seasons.nodes.map(s => ({season: s.year.toString()}));
	} catch {
		return [];
	}
}

export async function generateMetadata({params}: {params: Params}): Promise<Metadata> {
	const {season} = await params;
	return {title: `${season} Season | effOne Hub`};
}

export default async function SeasonPage({params}: {params: Params}) {
	const {season: seasonParam} = await params;
	const year = Number(seasonParam);

	let season: {year: number} = {year};
	try {
		const {data} = await getClient().query<{season: {year: number}}>({
			query:     SingleSeasonQuery,
			variables: {season: year}
		});
		if (data.season) season = data.season;
	} catch {
		// fall back
	}

	return <SeasonContent season={season}/>;
}
