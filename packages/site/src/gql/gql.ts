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
 */
const documents = {
    "\n\tquery seasons {\n\t\tseasons {\n\t\t\tyear\n\t\t\tended\n\t\t\thasResults\n\t\t}\n\t}\n": types.SeasonsDocument,
    "\n\tquery driverPodiums($season: Int!, $teamId: Int!) {\n\t\traces (condition: {year: $season},orderBy: ROUND_ASC) {\n\t\t\tresults (condition: {teamId: $teamId}) {\n\t\t\t\tdriverId\n\t\t\t\tpositionOrder\n\t\t\t}\n\t\t}\n\t}\n": types.DriverPodiumsDocument,
    "\n\tquery driverPoints($season: Int!, $teamId: Int!) {\n\t\traces (condition: {year: $season},orderBy: ROUND_ASC) {\n\t\t\tresults (condition: {teamId: $teamId}) {\n\t\t\t\tdriverId\n\t\t\t\tpoints\n\t\t\t}\n\t\t}\n\t}\n": types.DriverPointsDocument,
    "\n\tquery driverQualifying($season: Int!) {\n\t\traces (condition: {year: $season},orderBy: ROUND_ASC) {\n\t\t\tqualifyings (orderBy: POSITION_ASC) {\n\t\t\t\tdriverId\n\t\t\t\tposition\n\t\t\t\tdriver {\n\t\t\t\t\tcurrentTeam {\n\t\t\t\t\t\tteamId\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.DriverQualifyingDocument,
    "\n\tquery qualifyingQuery($season: Int!, $round: Int!) {\n\t\trace: raceByYearAndRound(year: $season, round: $round) {\n\t\t\tqualifyings {\n\t\t\t\tdriverId\n\t\t\t\tdriver {\n\t\t\t\t\tteamsByYear (condition: {year: $season}) {\n\t\t\t\t\t\tteamId\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tposition\n\t\t\t\tq1\n\t\t\t\tq2\n\t\t\t\tq3\n\t\t\t}\n\t\t}\n\t}\n": types.QualifyingQueryDocument,
    "\n\t#graphql\n\tquery pitStopsBySeasonRound($season: Int!, $round: Int!) {\n\t\trace: raceByYearAndRound(year: $season, round: $round) {\n\t\t\tpitStops {\n\t\t\t\tlap\n\t\t\t\ttime\n\t\t\t\tduration\n\t\t\t\tmilliseconds\n\t\t\t\tdriver {\n\t\t\t\t\tdriverId\n\t\t\t\t\tcode\n\n\t\t\t\t\tcurrentTeam {\n\t\t\t\t\t\tteam {\n\t\t\t\t\t\t\tcolors {\n\t\t\t\t\t\t\t\tprimary\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.PitStopsBySeasonRoundDocument,
    "\n\tquery raceFastestLapQuery($season: Int!, $round: Int!) {\n\t\traces (condition: {year: $season, round: $round}) {\n\t\t\tlapTimes (orderBy: MILLISECONDS_ASC, first: 1) {\n\t\t\t\tlap\n\t\t\t\tmilliseconds\n\t\t\t\tdriverId\n\t\t\t}\n\t\t}\n\t}\n": types.RaceFastestLapQueryDocument,
    "\n\tquery raceLapLeaderQuery($season: Int!, $round: Int!) {\n\t\traces (condition: {year: $season, round: $round},orderBy: ROUND_ASC) {\n\t\t\tlapTimes (condition: {position: 1}) {\n\t\t\t\tdriverId\n\t\t\t}\n\t\t}\n\t}\n": types.RaceLapLeaderQueryDocument,
    "\n\tquery racePolesLeaderQuery($season: Int!, $round: Int!) {\n\t\traces (condition: {year: $season, round: $round}) {\n\t\t\tqualifyings (condition: {position: 1}) {\n\t\t\t\tdriverId\n\t\t\t}\n\t\t}\n\t}\n": types.RacePolesLeaderQueryDocument,
    "\n\tquery racePositionsGainedLeaderQuery($season: Int!, $round: Int!) {\n\t\traces (condition: {year: $season, round: $round}) {\n\t\t\tresults {\n\t\t\t\tdriverId\n\t\t\t\tgrid\n\t\t\t\tpositionOrder\n\t\t\t}\n\t\t}\n\t}\n": types.RacePositionsGainedLeaderQueryDocument,
    "\n\tquery seasonConstructorChampionQuery($season: Int!) {\n\t\tfinalTeamStandingsByYears (condition: {year: $season}, orderBy: POSITION_ASC, first: 1) {\n\t\t\tteamId\n\t\t}\n\t}\n": types.SeasonConstructorChampionQueryDocument,
    "\n\tquery seasonDNFsLeaderQuery($season: Int!) {\n\t\traces (condition: {year: $season},orderBy: ROUND_ASC) {\n\t\t\tresults (condition: {position: null}) {\n\t\t\t\tdriverId\n\t\t\t}\n\t\t}\n\t}\n": types.SeasonDnFsLeaderQueryDocument,
    "\n\tquery seasonDriverChampionQuery($season: Int!) {\n\t\tdriverStandingsBySeasons (condition: {year: $season}, orderBy: POSITION_ASC, first: 1) {\n\t\t\tdriverId\n\t\t}\n\t}\n": types.SeasonDriverChampionQueryDocument,
    "\n\tquery seasonFastestLapQuery($season: Int!) {\n\t\traces (condition: {year: $season}) {\n\t\t\tname\n\t\t\tround\n\t\t\tlapTimes (orderBy: MILLISECONDS_ASC, first: 1) {\n\t\t\t\tlap\n\t\t\t\tmilliseconds\n\t\t\t\tdriverId\n\t\t\t}\n\t\t}\n\t}\n": types.SeasonFastestLapQueryDocument,
    "\n\tquery seasonLapLeaderQuery($season: Int!) {\n\t\traces (condition: {year: $season},orderBy: ROUND_ASC) {\n\t\t\tlapTimes (condition: {position: 1}) {\n\t\t\t\tdriverId\n\t\t\t}\n\t\t}\n\t}\n": types.SeasonLapLeaderQueryDocument,
    "\n\tquery seasonPolesLeaderQuery($season: Int!) {\n\t\traces (condition: {year: $season},orderBy: ROUND_ASC) {\n\t\t\tqualifyings (condition: {position: 1}) {\n\t\t\t\tdriverId\n\t\t\t}\n\t\t}\n\t}\n": types.SeasonPolesLeaderQueryDocument,
    "\n\tquery seasonPositionsGainedLeaderQuery($season: Int!) {\n\t\traces (condition: {year: $season},orderBy: ROUND_ASC) {\n\t\t\tresults {\n\t\t\t\tdriverId\n\t\t\t\tgrid\n\t\t\t\tpositionOrder\n\t\t\t}\n\t\t}\n\t}\n": types.SeasonPositionsGainedLeaderQueryDocument,
    "\n\tquery seasonSprintWinsLeaderQuery($season: Int!) {\n\t\traces (condition: {year: $season},orderBy: ROUND_ASC) {\n\t\t\tsprintResults (condition: {positionOrder: 1}) {\n\t\t\t\tdriverId\n\t\t\t}\n\t\t}\n\t}\n": types.SeasonSprintWinsLeaderQueryDocument,
    "\n\tquery seasonWinsLeaderQuery($season: Int!) {\n\t\traces (condition: {year: $season},orderBy: ROUND_ASC) {\n\t\t\tresults (condition: {positionOrder: 1}) {\n\t\t\t\tdriverId\n\t\t\t}\n\t\t}\n\t}\n": types.SeasonWinsLeaderQueryDocument,
    "\n\tquery AllRacesQuery {\n\t\traces {\n\t\t\tyear\n\t\t\tround\n\t\t}\n\t}\n": types.AllRacesQueryDocument,
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
export function graphql(source: "\n\tquery seasons {\n\t\tseasons {\n\t\t\tyear\n\t\t\tended\n\t\t\thasResults\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery seasons {\n\t\tseasons {\n\t\t\tyear\n\t\t\tended\n\t\t\thasResults\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery driverPodiums($season: Int!, $teamId: Int!) {\n\t\traces (condition: {year: $season},orderBy: ROUND_ASC) {\n\t\t\tresults (condition: {teamId: $teamId}) {\n\t\t\t\tdriverId\n\t\t\t\tpositionOrder\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery driverPodiums($season: Int!, $teamId: Int!) {\n\t\traces (condition: {year: $season},orderBy: ROUND_ASC) {\n\t\t\tresults (condition: {teamId: $teamId}) {\n\t\t\t\tdriverId\n\t\t\t\tpositionOrder\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery driverPoints($season: Int!, $teamId: Int!) {\n\t\traces (condition: {year: $season},orderBy: ROUND_ASC) {\n\t\t\tresults (condition: {teamId: $teamId}) {\n\t\t\t\tdriverId\n\t\t\t\tpoints\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery driverPoints($season: Int!, $teamId: Int!) {\n\t\traces (condition: {year: $season},orderBy: ROUND_ASC) {\n\t\t\tresults (condition: {teamId: $teamId}) {\n\t\t\t\tdriverId\n\t\t\t\tpoints\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery driverQualifying($season: Int!) {\n\t\traces (condition: {year: $season},orderBy: ROUND_ASC) {\n\t\t\tqualifyings (orderBy: POSITION_ASC) {\n\t\t\t\tdriverId\n\t\t\t\tposition\n\t\t\t\tdriver {\n\t\t\t\t\tcurrentTeam {\n\t\t\t\t\t\tteamId\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery driverQualifying($season: Int!) {\n\t\traces (condition: {year: $season},orderBy: ROUND_ASC) {\n\t\t\tqualifyings (orderBy: POSITION_ASC) {\n\t\t\t\tdriverId\n\t\t\t\tposition\n\t\t\t\tdriver {\n\t\t\t\t\tcurrentTeam {\n\t\t\t\t\t\tteamId\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery qualifyingQuery($season: Int!, $round: Int!) {\n\t\trace: raceByYearAndRound(year: $season, round: $round) {\n\t\t\tqualifyings {\n\t\t\t\tdriverId\n\t\t\t\tdriver {\n\t\t\t\t\tteamsByYear (condition: {year: $season}) {\n\t\t\t\t\t\tteamId\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tposition\n\t\t\t\tq1\n\t\t\t\tq2\n\t\t\t\tq3\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery qualifyingQuery($season: Int!, $round: Int!) {\n\t\trace: raceByYearAndRound(year: $season, round: $round) {\n\t\t\tqualifyings {\n\t\t\t\tdriverId\n\t\t\t\tdriver {\n\t\t\t\t\tteamsByYear (condition: {year: $season}) {\n\t\t\t\t\t\tteamId\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tposition\n\t\t\t\tq1\n\t\t\t\tq2\n\t\t\t\tq3\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t#graphql\n\tquery pitStopsBySeasonRound($season: Int!, $round: Int!) {\n\t\trace: raceByYearAndRound(year: $season, round: $round) {\n\t\t\tpitStops {\n\t\t\t\tlap\n\t\t\t\ttime\n\t\t\t\tduration\n\t\t\t\tmilliseconds\n\t\t\t\tdriver {\n\t\t\t\t\tdriverId\n\t\t\t\t\tcode\n\n\t\t\t\t\tcurrentTeam {\n\t\t\t\t\t\tteam {\n\t\t\t\t\t\t\tcolors {\n\t\t\t\t\t\t\t\tprimary\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\t#graphql\n\tquery pitStopsBySeasonRound($season: Int!, $round: Int!) {\n\t\trace: raceByYearAndRound(year: $season, round: $round) {\n\t\t\tpitStops {\n\t\t\t\tlap\n\t\t\t\ttime\n\t\t\t\tduration\n\t\t\t\tmilliseconds\n\t\t\t\tdriver {\n\t\t\t\t\tdriverId\n\t\t\t\t\tcode\n\n\t\t\t\t\tcurrentTeam {\n\t\t\t\t\t\tteam {\n\t\t\t\t\t\t\tcolors {\n\t\t\t\t\t\t\t\tprimary\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery raceFastestLapQuery($season: Int!, $round: Int!) {\n\t\traces (condition: {year: $season, round: $round}) {\n\t\t\tlapTimes (orderBy: MILLISECONDS_ASC, first: 1) {\n\t\t\t\tlap\n\t\t\t\tmilliseconds\n\t\t\t\tdriverId\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery raceFastestLapQuery($season: Int!, $round: Int!) {\n\t\traces (condition: {year: $season, round: $round}) {\n\t\t\tlapTimes (orderBy: MILLISECONDS_ASC, first: 1) {\n\t\t\t\tlap\n\t\t\t\tmilliseconds\n\t\t\t\tdriverId\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery raceLapLeaderQuery($season: Int!, $round: Int!) {\n\t\traces (condition: {year: $season, round: $round},orderBy: ROUND_ASC) {\n\t\t\tlapTimes (condition: {position: 1}) {\n\t\t\t\tdriverId\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery raceLapLeaderQuery($season: Int!, $round: Int!) {\n\t\traces (condition: {year: $season, round: $round},orderBy: ROUND_ASC) {\n\t\t\tlapTimes (condition: {position: 1}) {\n\t\t\t\tdriverId\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery racePolesLeaderQuery($season: Int!, $round: Int!) {\n\t\traces (condition: {year: $season, round: $round}) {\n\t\t\tqualifyings (condition: {position: 1}) {\n\t\t\t\tdriverId\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery racePolesLeaderQuery($season: Int!, $round: Int!) {\n\t\traces (condition: {year: $season, round: $round}) {\n\t\t\tqualifyings (condition: {position: 1}) {\n\t\t\t\tdriverId\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery racePositionsGainedLeaderQuery($season: Int!, $round: Int!) {\n\t\traces (condition: {year: $season, round: $round}) {\n\t\t\tresults {\n\t\t\t\tdriverId\n\t\t\t\tgrid\n\t\t\t\tpositionOrder\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery racePositionsGainedLeaderQuery($season: Int!, $round: Int!) {\n\t\traces (condition: {year: $season, round: $round}) {\n\t\t\tresults {\n\t\t\t\tdriverId\n\t\t\t\tgrid\n\t\t\t\tpositionOrder\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery seasonConstructorChampionQuery($season: Int!) {\n\t\tfinalTeamStandingsByYears (condition: {year: $season}, orderBy: POSITION_ASC, first: 1) {\n\t\t\tteamId\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery seasonConstructorChampionQuery($season: Int!) {\n\t\tfinalTeamStandingsByYears (condition: {year: $season}, orderBy: POSITION_ASC, first: 1) {\n\t\t\tteamId\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery seasonDNFsLeaderQuery($season: Int!) {\n\t\traces (condition: {year: $season},orderBy: ROUND_ASC) {\n\t\t\tresults (condition: {position: null}) {\n\t\t\t\tdriverId\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery seasonDNFsLeaderQuery($season: Int!) {\n\t\traces (condition: {year: $season},orderBy: ROUND_ASC) {\n\t\t\tresults (condition: {position: null}) {\n\t\t\t\tdriverId\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery seasonDriverChampionQuery($season: Int!) {\n\t\tdriverStandingsBySeasons (condition: {year: $season}, orderBy: POSITION_ASC, first: 1) {\n\t\t\tdriverId\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery seasonDriverChampionQuery($season: Int!) {\n\t\tdriverStandingsBySeasons (condition: {year: $season}, orderBy: POSITION_ASC, first: 1) {\n\t\t\tdriverId\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery seasonFastestLapQuery($season: Int!) {\n\t\traces (condition: {year: $season}) {\n\t\t\tname\n\t\t\tround\n\t\t\tlapTimes (orderBy: MILLISECONDS_ASC, first: 1) {\n\t\t\t\tlap\n\t\t\t\tmilliseconds\n\t\t\t\tdriverId\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery seasonFastestLapQuery($season: Int!) {\n\t\traces (condition: {year: $season}) {\n\t\t\tname\n\t\t\tround\n\t\t\tlapTimes (orderBy: MILLISECONDS_ASC, first: 1) {\n\t\t\t\tlap\n\t\t\t\tmilliseconds\n\t\t\t\tdriverId\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery seasonLapLeaderQuery($season: Int!) {\n\t\traces (condition: {year: $season},orderBy: ROUND_ASC) {\n\t\t\tlapTimes (condition: {position: 1}) {\n\t\t\t\tdriverId\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery seasonLapLeaderQuery($season: Int!) {\n\t\traces (condition: {year: $season},orderBy: ROUND_ASC) {\n\t\t\tlapTimes (condition: {position: 1}) {\n\t\t\t\tdriverId\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery seasonPolesLeaderQuery($season: Int!) {\n\t\traces (condition: {year: $season},orderBy: ROUND_ASC) {\n\t\t\tqualifyings (condition: {position: 1}) {\n\t\t\t\tdriverId\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery seasonPolesLeaderQuery($season: Int!) {\n\t\traces (condition: {year: $season},orderBy: ROUND_ASC) {\n\t\t\tqualifyings (condition: {position: 1}) {\n\t\t\t\tdriverId\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery seasonPositionsGainedLeaderQuery($season: Int!) {\n\t\traces (condition: {year: $season},orderBy: ROUND_ASC) {\n\t\t\tresults {\n\t\t\t\tdriverId\n\t\t\t\tgrid\n\t\t\t\tpositionOrder\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery seasonPositionsGainedLeaderQuery($season: Int!) {\n\t\traces (condition: {year: $season},orderBy: ROUND_ASC) {\n\t\t\tresults {\n\t\t\t\tdriverId\n\t\t\t\tgrid\n\t\t\t\tpositionOrder\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery seasonSprintWinsLeaderQuery($season: Int!) {\n\t\traces (condition: {year: $season},orderBy: ROUND_ASC) {\n\t\t\tsprintResults (condition: {positionOrder: 1}) {\n\t\t\t\tdriverId\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery seasonSprintWinsLeaderQuery($season: Int!) {\n\t\traces (condition: {year: $season},orderBy: ROUND_ASC) {\n\t\t\tsprintResults (condition: {positionOrder: 1}) {\n\t\t\t\tdriverId\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery seasonWinsLeaderQuery($season: Int!) {\n\t\traces (condition: {year: $season},orderBy: ROUND_ASC) {\n\t\t\tresults (condition: {positionOrder: 1}) {\n\t\t\t\tdriverId\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery seasonWinsLeaderQuery($season: Int!) {\n\t\traces (condition: {year: $season},orderBy: ROUND_ASC) {\n\t\t\tresults (condition: {positionOrder: 1}) {\n\t\t\t\tdriverId\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery AllRacesQuery {\n\t\traces {\n\t\t\tyear\n\t\t\tround\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery AllRacesQuery {\n\t\traces {\n\t\t\tyear\n\t\t\tround\n\t\t}\n\t}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;