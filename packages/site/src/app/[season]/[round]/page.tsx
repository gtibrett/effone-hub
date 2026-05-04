import {Race} from '@/gql/graphql';
import {gql} from '@apollo/client';
import type {Metadata} from 'next';
import {getClient} from '../../lib/apollo-rsc';
import RoundContent from './RoundContent';

type Params = Promise<{season: string; round: string}>;

export const revalidate = 3600;
export const dynamicParams = true;

const RaceQuery = gql`
	query RaceQuery($season: Int!, $round: Int!) {
		races(condition: {year: $season, round: $round}) {
			nodes {
				rowId
				year
				round
				officialName
				date
				circuit {
					id
					rowId
					fullName
					placeName
					countryId
					latitude
					longitude
					description {
						description
					}
				}
			}
		}
	}
`;

const AllRacesQuery = gql`
	query AllRacesQuery {
		races {
			nodes {
				rowId
				year
				round
			}
		}
	}
`;

export async function generateStaticParams(): Promise<{season: string; round: string}[]> {
	try {
		const {data: {races}} = await getClient().query<{races: {nodes: Race[]}}>({query: AllRacesQuery});
		return races.nodes
			.filter(r => r.year != null && r.round != null)
			.map(r => ({season: String(r.year), round: String(r.round)}));
	} catch {
		return [];
	}
}

export async function generateMetadata({params}: {params: Params}): Promise<Metadata> {
	const {season, round} = await params;
	try {
		const {data: {races}} = await getClient().query<{races: {nodes: Race[]}}>({
			query:     RaceQuery,
			variables: {season: Number(season), round: Number(round)}
		});
		const race = races.nodes[0];
		return {title: race?.officialName ? `${race.officialName} | effOne Hub` : `Race ${season}/${round} | effOne Hub`};
	} catch {
		return {title: `Race ${season}/${round} | effOne Hub`};
	}
}

export default async function RoundPage({params}: {params: Params}) {
	const {season, round} = await params;

	let race: Partial<Race> = {};
	try {
		const {data: {races}} = await getClient().query<{races: {nodes: Race[]}}>({
			query:     RaceQuery,
			variables: {season: Number(season), round: Number(round)}
		});
		race = races.nodes[0] ?? {};
	} catch {
		// fall back to empty race
	}

	return <RoundContent season={season} round={round} race={race}/>;
}
