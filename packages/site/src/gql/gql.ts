/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n\tquery SeasonMenuQuery {\n\t\tseasons(orderBy: YEAR_DESC) {\n\t\t\tnodes {\n\t\t\t\tyear\n\t\t\t}\n\t\t}\n\t}\n": types.SeasonMenuQueryDocument,
    "\n\tquery constructorDriverPodiumsQuery($season: Int!, $constructorId: String!) {\n\t\tseason(year: $season) {\n\t\t\tracesByYear(orderBy: ROUND_ASC) {\n\t\t\t\tnodes {\n\t\t\t\t\trowId\n\t\t\t\t\traceResults(condition: {constructorId: $constructorId}) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t\tpositionNumber\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.ConstructorDriverPodiumsQueryDocument,
    "\n\tquery ConstructorDriverPointsQuery($season: Int!, $constructorId: String!) {\n\t\tseason(year: $season) {\n\t\t\tracesByYear {\n\t\t\t\tnodes {\n\t\t\t\t\traceResults(condition: {constructorId: $constructorId}) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t\tpoints\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tsprintRaceResults(condition: {constructorId: $constructorId}) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t\tpoints\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.ConstructorDriverPointsQueryDocument,
    "\n\tquery ConstructorDriverQualifyingQuery($season: Int!, $constructorId: String!) {\n\t\tseason(year: $season) {\n\t\t\tracesByYear {\n\t\t\t\tnodes {\n\t\t\t\t\trowId\n\t\t\t\t\tround\n\t\t\t\t\tqualifyingResults(condition: {constructorId: $constructorId}, orderBy: POSITION_NUMBER_ASC) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t\tpositionNumber\n\t\t\t\t\t\t\tdriver { id fullName }\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.ConstructorDriverQualifyingQueryDocument,
    "\n\tquery qualifyingQuery($season: Int!, $round: Int!) {\n\t\trace: raceByYearAndRound(year: $season, round: $round) {\n\t\t\tqualifyingResults {\n\t\t\t\tnodes {\n\t\t\t\t\tdriverId\n\t\t\t\t\tconstructorId\n\t\t\t\t\tpositionNumber\n\t\t\t\t\tq1\n\t\t\t\t\tq2\n\t\t\t\t\tq3\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.QualifyingQueryDocument,
    "\n\t#graphql\n\tquery pitStopsBySeasonRound($season: Int!, $round: Int!) {\n\t\trace: raceByYearAndRound(year: $season, round: $round) {\n\t\t\tpitStops {\n\t\t\t\tnodes {\n\t\t\t\t\tlap\n\t\t\t\t\tstop\n\t\t\t\t\ttime\n\t\t\t\t\ttimeMillis\n\t\t\t\t\tdriverId\n\t\t\t\t\tdriver {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tabbreviation\n\t\t\t\t\t}\n\t\t\t\t\tconstructor {\n\t\t\t\t\t\tcolors {\n\t\t\t\t\t\t\tprimaryHex\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.PitStopsBySeasonRoundDocument,
    "\n\tquery raceFastestLapQuery($season: Int!, $round: Int!) {\n\t\trace: raceByYearAndRound(year: $season, round: $round) {\n\t\t\tfastestLaps(first: 1) {\n\t\t\t\tnodes {\n\t\t\t\t\tdriverId\n\t\t\t\t\tlap\n\t\t\t\t\ttime\n\t\t\t\t\ttimeMillis\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.RaceFastestLapQueryDocument,
    "\n\tquery raceLapLeaderQuery($season: Int!, $round: Int!) {\n\t\trace: raceByYearAndRound(year: $season, round: $round) {\n\t\t\tlapTimes {\n\t\t\t\tnodes {\n\t\t\t\t\tdriverId\n\t\t\t\t\tposition\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.RaceLapLeaderQueryDocument,
    "\n\tquery racePolesLeaderQuery($season: Int!, $round: Int!) {\n\t\traces (condition: {year: $season, round: $round}) {\n\t\t\tnodes {\n\t\t\t\tqualifyingResults (condition: {positionNumber: 1}, first: 1) {\n\t\t\t\t\tnodes {\n\t\t\t\t\t\tdriverId\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.RacePolesLeaderQueryDocument,
    "\n\tquery racePositionsGainedLeaderQuery($season: Int!, $round: Int!) {\n\t\trace: raceByYearAndRound(year: $season, round: $round) {\n\t\t\traceResults {\n\t\t\t\tnodes {\n\t\t\t\t\tdriverId\n\t\t\t\t\tgridPositionNumber\n\t\t\t\t\tpositionNumber\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.RacePositionsGainedLeaderQueryDocument,
    "\n\tquery seasonConstructorChampionQuery($season: Int!) {\n\t\tseason(year: $season) {\n\t\t\tseasonConstructorStandingsByYear(orderBy: POSITION_NUMBER_ASC, first: 1) {\n\t\t\t\tnodes {\n\t\t\t\t\tconstructorId\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.SeasonConstructorChampionQueryDocument,
    "\n\tquery SeasonDNFsQuery($season: Int!) {\n\t\tseason(year: $season) {\n\t\t\tracesByYear {\n\t\t\t\tnodes {\n\t\t\t\t\trowId\n\t\t\t\t\traceResults {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t\treasonRetired\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.SeasonDnFsQueryDocument,
    "\n\tquery SeasonDriverChampionQuery($season: Int!) {\n\t\tseasonDriverStandings(condition: {year: $season}, orderBy: POSITION_NUMBER_ASC, first: 1) {\n\t\t\tnodes {\n\t\t\t\tdriverId\n\t\t\t}\n\t\t}\n\t}\n": types.SeasonDriverChampionQueryDocument,
    "\n\tquery seasonFastestLapQuery($season: Int!) {\n\t\tseason(year: $season) {\n\t\t\tyear\n\t\t\tracesByYear {\n\t\t\t\tnodes {\n\t\t\t\t\trowId\n\t\t\t\t\tround\n\t\t\t\t\tofficialName\n\t\t\t\t\tfastestLaps(orderBy: TIME_MILLIS_ASC, first: 1) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t\tlap\n\t\t\t\t\t\t\ttime\n\t\t\t\t\t\t\ttimeMillis\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.SeasonFastestLapQueryDocument,
    "\n\tquery SeasonLapLeaderQuery($season: Int!) {\n\t\tseason(year: $season) {\n\t\t\tracesByYear {\n\t\t\t\tnodes {\n\t\t\t\t\trowId\n\t\t\t\t\tround\n\t\t\t\t\tlapTimes {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t\tposition\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.SeasonLapLeaderQueryDocument,
    "\n\tquery SeasonPolesQuery($season: Int!) {\n\t\tseason(year: $season) {\n\t\t\tracesByYear {\n\t\t\t\tnodes {\n\t\t\t\t\trowId\n\t\t\t\t\tqualifyingResults(condition: {positionNumber: 1}, first: 1) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.SeasonPolesQueryDocument,
    "\n\tquery SeasonPositionsGainedQuery($season: Int!) {\n\t\tseason(year: $season) {\n\t\t\tracesByYear {\n\t\t\t\tnodes {\n\t\t\t\t\trowId\n\t\t\t\t\traceResults {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t\tgridPositionNumber\n\t\t\t\t\t\t\tpositionNumber\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.SeasonPositionsGainedQueryDocument,
    "\n\tquery SeasonSprintWinsQuery($season: Int!) {\n\t\tseason(year: $season) {\n\t\t\tracesByYear {\n\t\t\t\tnodes {\n\t\t\t\t\trowId\n\t\t\t\t\tsprintRaceResults(condition: {positionNumber: 1}, first: 1) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.SeasonSprintWinsQueryDocument,
    "\n\tquery SeasonWinsQuery($season: Int!) {\n\t\tseason(year: $season) {\n\t\t\tracesByYear {\n\t\t\t\tnodes {\n\t\t\t\t\trowId\n\t\t\t\t\traceResults(condition: {positionNumber: 1}, first: 1) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.SeasonWinsQueryDocument,
    "\n\tquery RaceQuery($season: Int!, $round: Int!) {\n\t\traces(condition: {year: $season, round: $round }) {\n\t\t\tnodes {\n\t\t\t\trowId\n\t\t\t\tyear\n\t\t\t\tround\n\t\t\t\tofficialName\n\t\t\t\tdate\n\t\t\t\tcircuit {\n\t\t\t\t\tid\n\t\t\t\t\tfullName\n\t\t\t\t\tplaceName\n\t\t\t\t\tcountryId\n\t\t\t\t\tlatitude\n\t\t\t\t\tlongitude\n\t\t\t\t\tdescription {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.RaceQueryDocument,
    "\n\t\tquery AllRacesQuery {\n\t\t\traces {\n\t\t\t\tnodes {\n\t\t\t\t\trowId\n\t\t\t\t\tyear\n\t\t\t\t\tround\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.AllRacesQueryDocument,
    "\n\t\tquery AllCircuitsQuery {\n\t\t\tcircuits {\n\t\t\t\tnodes {\n\t\t\t\t\tid\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.AllCircuitsQueryDocument,
    "\n\tquery ConstructorPageStaticQuery($constructorRef: String!) {\n\t\tconstructors(condition: {rowId: $constructorRef}) {\n\t\t\tnodes {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tcountryId\n\t\t\t\tcolors {\n\t\t\t\t\tprimaryHex\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.ConstructorPageStaticQueryDocument,
    "query CurrentSeasonQuery {\n\tseasons(orderBy: YEAR_DESC, first: 1) {\n\t\tnodes {\n\t\t\tyear\n\t\t}\n\t}\n}": types.CurrentSeasonQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery SeasonMenuQuery {\n\t\tseasons(orderBy: YEAR_DESC) {\n\t\t\tnodes {\n\t\t\t\tyear\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery SeasonMenuQuery {\n\t\tseasons(orderBy: YEAR_DESC) {\n\t\t\tnodes {\n\t\t\t\tyear\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery constructorDriverPodiumsQuery($season: Int!, $constructorId: String!) {\n\t\tseason(year: $season) {\n\t\t\tracesByYear(orderBy: ROUND_ASC) {\n\t\t\t\tnodes {\n\t\t\t\t\trowId\n\t\t\t\t\traceResults(condition: {constructorId: $constructorId}) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t\tpositionNumber\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery constructorDriverPodiumsQuery($season: Int!, $constructorId: String!) {\n\t\tseason(year: $season) {\n\t\t\tracesByYear(orderBy: ROUND_ASC) {\n\t\t\t\tnodes {\n\t\t\t\t\trowId\n\t\t\t\t\traceResults(condition: {constructorId: $constructorId}) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t\tpositionNumber\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery ConstructorDriverPointsQuery($season: Int!, $constructorId: String!) {\n\t\tseason(year: $season) {\n\t\t\tracesByYear {\n\t\t\t\tnodes {\n\t\t\t\t\traceResults(condition: {constructorId: $constructorId}) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t\tpoints\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tsprintRaceResults(condition: {constructorId: $constructorId}) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t\tpoints\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery ConstructorDriverPointsQuery($season: Int!, $constructorId: String!) {\n\t\tseason(year: $season) {\n\t\t\tracesByYear {\n\t\t\t\tnodes {\n\t\t\t\t\traceResults(condition: {constructorId: $constructorId}) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t\tpoints\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tsprintRaceResults(condition: {constructorId: $constructorId}) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t\tpoints\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery ConstructorDriverQualifyingQuery($season: Int!, $constructorId: String!) {\n\t\tseason(year: $season) {\n\t\t\tracesByYear {\n\t\t\t\tnodes {\n\t\t\t\t\trowId\n\t\t\t\t\tround\n\t\t\t\t\tqualifyingResults(condition: {constructorId: $constructorId}, orderBy: POSITION_NUMBER_ASC) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t\tpositionNumber\n\t\t\t\t\t\t\tdriver { id fullName }\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery ConstructorDriverQualifyingQuery($season: Int!, $constructorId: String!) {\n\t\tseason(year: $season) {\n\t\t\tracesByYear {\n\t\t\t\tnodes {\n\t\t\t\t\trowId\n\t\t\t\t\tround\n\t\t\t\t\tqualifyingResults(condition: {constructorId: $constructorId}, orderBy: POSITION_NUMBER_ASC) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t\tpositionNumber\n\t\t\t\t\t\t\tdriver { id fullName }\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery qualifyingQuery($season: Int!, $round: Int!) {\n\t\trace: raceByYearAndRound(year: $season, round: $round) {\n\t\t\tqualifyingResults {\n\t\t\t\tnodes {\n\t\t\t\t\tdriverId\n\t\t\t\t\tconstructorId\n\t\t\t\t\tpositionNumber\n\t\t\t\t\tq1\n\t\t\t\t\tq2\n\t\t\t\t\tq3\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery qualifyingQuery($season: Int!, $round: Int!) {\n\t\trace: raceByYearAndRound(year: $season, round: $round) {\n\t\t\tqualifyingResults {\n\t\t\t\tnodes {\n\t\t\t\t\tdriverId\n\t\t\t\t\tconstructorId\n\t\t\t\t\tpositionNumber\n\t\t\t\t\tq1\n\t\t\t\t\tq2\n\t\t\t\t\tq3\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t#graphql\n\tquery pitStopsBySeasonRound($season: Int!, $round: Int!) {\n\t\trace: raceByYearAndRound(year: $season, round: $round) {\n\t\t\tpitStops {\n\t\t\t\tnodes {\n\t\t\t\t\tlap\n\t\t\t\t\tstop\n\t\t\t\t\ttime\n\t\t\t\t\ttimeMillis\n\t\t\t\t\tdriverId\n\t\t\t\t\tdriver {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tabbreviation\n\t\t\t\t\t}\n\t\t\t\t\tconstructor {\n\t\t\t\t\t\tcolors {\n\t\t\t\t\t\t\tprimaryHex\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\t#graphql\n\tquery pitStopsBySeasonRound($season: Int!, $round: Int!) {\n\t\trace: raceByYearAndRound(year: $season, round: $round) {\n\t\t\tpitStops {\n\t\t\t\tnodes {\n\t\t\t\t\tlap\n\t\t\t\t\tstop\n\t\t\t\t\ttime\n\t\t\t\t\ttimeMillis\n\t\t\t\t\tdriverId\n\t\t\t\t\tdriver {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tabbreviation\n\t\t\t\t\t}\n\t\t\t\t\tconstructor {\n\t\t\t\t\t\tcolors {\n\t\t\t\t\t\t\tprimaryHex\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery raceFastestLapQuery($season: Int!, $round: Int!) {\n\t\trace: raceByYearAndRound(year: $season, round: $round) {\n\t\t\tfastestLaps(first: 1) {\n\t\t\t\tnodes {\n\t\t\t\t\tdriverId\n\t\t\t\t\tlap\n\t\t\t\t\ttime\n\t\t\t\t\ttimeMillis\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery raceFastestLapQuery($season: Int!, $round: Int!) {\n\t\trace: raceByYearAndRound(year: $season, round: $round) {\n\t\t\tfastestLaps(first: 1) {\n\t\t\t\tnodes {\n\t\t\t\t\tdriverId\n\t\t\t\t\tlap\n\t\t\t\t\ttime\n\t\t\t\t\ttimeMillis\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery raceLapLeaderQuery($season: Int!, $round: Int!) {\n\t\trace: raceByYearAndRound(year: $season, round: $round) {\n\t\t\tlapTimes {\n\t\t\t\tnodes {\n\t\t\t\t\tdriverId\n\t\t\t\t\tposition\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery raceLapLeaderQuery($season: Int!, $round: Int!) {\n\t\trace: raceByYearAndRound(year: $season, round: $round) {\n\t\t\tlapTimes {\n\t\t\t\tnodes {\n\t\t\t\t\tdriverId\n\t\t\t\t\tposition\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery racePolesLeaderQuery($season: Int!, $round: Int!) {\n\t\traces (condition: {year: $season, round: $round}) {\n\t\t\tnodes {\n\t\t\t\tqualifyingResults (condition: {positionNumber: 1}, first: 1) {\n\t\t\t\t\tnodes {\n\t\t\t\t\t\tdriverId\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery racePolesLeaderQuery($season: Int!, $round: Int!) {\n\t\traces (condition: {year: $season, round: $round}) {\n\t\t\tnodes {\n\t\t\t\tqualifyingResults (condition: {positionNumber: 1}, first: 1) {\n\t\t\t\t\tnodes {\n\t\t\t\t\t\tdriverId\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery racePositionsGainedLeaderQuery($season: Int!, $round: Int!) {\n\t\trace: raceByYearAndRound(year: $season, round: $round) {\n\t\t\traceResults {\n\t\t\t\tnodes {\n\t\t\t\t\tdriverId\n\t\t\t\t\tgridPositionNumber\n\t\t\t\t\tpositionNumber\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery racePositionsGainedLeaderQuery($season: Int!, $round: Int!) {\n\t\trace: raceByYearAndRound(year: $season, round: $round) {\n\t\t\traceResults {\n\t\t\t\tnodes {\n\t\t\t\t\tdriverId\n\t\t\t\t\tgridPositionNumber\n\t\t\t\t\tpositionNumber\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery seasonConstructorChampionQuery($season: Int!) {\n\t\tseason(year: $season) {\n\t\t\tseasonConstructorStandingsByYear(orderBy: POSITION_NUMBER_ASC, first: 1) {\n\t\t\t\tnodes {\n\t\t\t\t\tconstructorId\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery seasonConstructorChampionQuery($season: Int!) {\n\t\tseason(year: $season) {\n\t\t\tseasonConstructorStandingsByYear(orderBy: POSITION_NUMBER_ASC, first: 1) {\n\t\t\t\tnodes {\n\t\t\t\t\tconstructorId\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery SeasonDNFsQuery($season: Int!) {\n\t\tseason(year: $season) {\n\t\t\tracesByYear {\n\t\t\t\tnodes {\n\t\t\t\t\trowId\n\t\t\t\t\traceResults {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t\treasonRetired\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery SeasonDNFsQuery($season: Int!) {\n\t\tseason(year: $season) {\n\t\t\tracesByYear {\n\t\t\t\tnodes {\n\t\t\t\t\trowId\n\t\t\t\t\traceResults {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t\treasonRetired\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery SeasonDriverChampionQuery($season: Int!) {\n\t\tseasonDriverStandings(condition: {year: $season}, orderBy: POSITION_NUMBER_ASC, first: 1) {\n\t\t\tnodes {\n\t\t\t\tdriverId\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery SeasonDriverChampionQuery($season: Int!) {\n\t\tseasonDriverStandings(condition: {year: $season}, orderBy: POSITION_NUMBER_ASC, first: 1) {\n\t\t\tnodes {\n\t\t\t\tdriverId\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery seasonFastestLapQuery($season: Int!) {\n\t\tseason(year: $season) {\n\t\t\tyear\n\t\t\tracesByYear {\n\t\t\t\tnodes {\n\t\t\t\t\trowId\n\t\t\t\t\tround\n\t\t\t\t\tofficialName\n\t\t\t\t\tfastestLaps(orderBy: TIME_MILLIS_ASC, first: 1) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t\tlap\n\t\t\t\t\t\t\ttime\n\t\t\t\t\t\t\ttimeMillis\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery seasonFastestLapQuery($season: Int!) {\n\t\tseason(year: $season) {\n\t\t\tyear\n\t\t\tracesByYear {\n\t\t\t\tnodes {\n\t\t\t\t\trowId\n\t\t\t\t\tround\n\t\t\t\t\tofficialName\n\t\t\t\t\tfastestLaps(orderBy: TIME_MILLIS_ASC, first: 1) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t\tlap\n\t\t\t\t\t\t\ttime\n\t\t\t\t\t\t\ttimeMillis\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery SeasonLapLeaderQuery($season: Int!) {\n\t\tseason(year: $season) {\n\t\t\tracesByYear {\n\t\t\t\tnodes {\n\t\t\t\t\trowId\n\t\t\t\t\tround\n\t\t\t\t\tlapTimes {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t\tposition\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery SeasonLapLeaderQuery($season: Int!) {\n\t\tseason(year: $season) {\n\t\t\tracesByYear {\n\t\t\t\tnodes {\n\t\t\t\t\trowId\n\t\t\t\t\tround\n\t\t\t\t\tlapTimes {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t\tposition\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery SeasonPolesQuery($season: Int!) {\n\t\tseason(year: $season) {\n\t\t\tracesByYear {\n\t\t\t\tnodes {\n\t\t\t\t\trowId\n\t\t\t\t\tqualifyingResults(condition: {positionNumber: 1}, first: 1) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery SeasonPolesQuery($season: Int!) {\n\t\tseason(year: $season) {\n\t\t\tracesByYear {\n\t\t\t\tnodes {\n\t\t\t\t\trowId\n\t\t\t\t\tqualifyingResults(condition: {positionNumber: 1}, first: 1) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery SeasonPositionsGainedQuery($season: Int!) {\n\t\tseason(year: $season) {\n\t\t\tracesByYear {\n\t\t\t\tnodes {\n\t\t\t\t\trowId\n\t\t\t\t\traceResults {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t\tgridPositionNumber\n\t\t\t\t\t\t\tpositionNumber\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery SeasonPositionsGainedQuery($season: Int!) {\n\t\tseason(year: $season) {\n\t\t\tracesByYear {\n\t\t\t\tnodes {\n\t\t\t\t\trowId\n\t\t\t\t\traceResults {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t\tgridPositionNumber\n\t\t\t\t\t\t\tpositionNumber\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery SeasonSprintWinsQuery($season: Int!) {\n\t\tseason(year: $season) {\n\t\t\tracesByYear {\n\t\t\t\tnodes {\n\t\t\t\t\trowId\n\t\t\t\t\tsprintRaceResults(condition: {positionNumber: 1}, first: 1) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery SeasonSprintWinsQuery($season: Int!) {\n\t\tseason(year: $season) {\n\t\t\tracesByYear {\n\t\t\t\tnodes {\n\t\t\t\t\trowId\n\t\t\t\t\tsprintRaceResults(condition: {positionNumber: 1}, first: 1) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery SeasonWinsQuery($season: Int!) {\n\t\tseason(year: $season) {\n\t\t\tracesByYear {\n\t\t\t\tnodes {\n\t\t\t\t\trowId\n\t\t\t\t\traceResults(condition: {positionNumber: 1}, first: 1) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery SeasonWinsQuery($season: Int!) {\n\t\tseason(year: $season) {\n\t\t\tracesByYear {\n\t\t\t\tnodes {\n\t\t\t\t\trowId\n\t\t\t\t\traceResults(condition: {positionNumber: 1}, first: 1) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\tdriverId\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery RaceQuery($season: Int!, $round: Int!) {\n\t\traces(condition: {year: $season, round: $round }) {\n\t\t\tnodes {\n\t\t\t\trowId\n\t\t\t\tyear\n\t\t\t\tround\n\t\t\t\tofficialName\n\t\t\t\tdate\n\t\t\t\tcircuit {\n\t\t\t\t\tid\n\t\t\t\t\tfullName\n\t\t\t\t\tplaceName\n\t\t\t\t\tcountryId\n\t\t\t\t\tlatitude\n\t\t\t\t\tlongitude\n\t\t\t\t\tdescription {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery RaceQuery($season: Int!, $round: Int!) {\n\t\traces(condition: {year: $season, round: $round }) {\n\t\t\tnodes {\n\t\t\t\trowId\n\t\t\t\tyear\n\t\t\t\tround\n\t\t\t\tofficialName\n\t\t\t\tdate\n\t\t\t\tcircuit {\n\t\t\t\t\tid\n\t\t\t\t\tfullName\n\t\t\t\t\tplaceName\n\t\t\t\t\tcountryId\n\t\t\t\t\tlatitude\n\t\t\t\t\tlongitude\n\t\t\t\t\tdescription {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\tquery AllRacesQuery {\n\t\t\traces {\n\t\t\t\tnodes {\n\t\t\t\t\trowId\n\t\t\t\t\tyear\n\t\t\t\t\tround\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tquery AllRacesQuery {\n\t\t\traces {\n\t\t\t\tnodes {\n\t\t\t\t\trowId\n\t\t\t\t\tyear\n\t\t\t\t\tround\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\tquery AllCircuitsQuery {\n\t\t\tcircuits {\n\t\t\t\tnodes {\n\t\t\t\t\tid\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tquery AllCircuitsQuery {\n\t\t\tcircuits {\n\t\t\t\tnodes {\n\t\t\t\t\tid\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery ConstructorPageStaticQuery($constructorRef: String!) {\n\t\tconstructors(condition: {rowId: $constructorRef}) {\n\t\t\tnodes {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tcountryId\n\t\t\t\tcolors {\n\t\t\t\t\tprimaryHex\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery ConstructorPageStaticQuery($constructorRef: String!) {\n\t\tconstructors(condition: {rowId: $constructorRef}) {\n\t\t\tnodes {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tcountryId\n\t\t\t\tcolors {\n\t\t\t\t\tprimaryHex\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CurrentSeasonQuery {\n\tseasons(orderBy: YEAR_DESC, first: 1) {\n\t\tnodes {\n\t\t\tyear\n\t\t}\n\t}\n}"): (typeof documents)["query CurrentSeasonQuery {\n\tseasons(orderBy: YEAR_DESC, first: 1) {\n\t\tnodes {\n\t\t\tyear\n\t\t}\n\t}\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;