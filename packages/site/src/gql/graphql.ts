/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: { input: any; output: any; }
  /** The day, does not include a time. */
  Date: { input: any; output: any; }
};

export type BioImage = {
  __typename?: 'BioImage';
  height?: Maybe<Scalars['Int']['output']>;
  source?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type Circuit = Node & {
  __typename?: 'Circuit';
  alt?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `CircuitDescription` that is related to this `Circuit`. */
  circuitDescription?: Maybe<CircuitDescription>;
  circuitId: Scalars['Int']['output'];
  circuitRef?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `Race`. */
  races: Array<Race>;
  /** Reads and enables pagination through a set of `Race`. */
  racesConnection: RacesConnection;
  url?: Maybe<Scalars['String']['output']>;
};


export type CircuitRacesArgs = {
  condition?: InputMaybe<RaceCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RacesOrderBy>>;
};


export type CircuitRacesConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RaceCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RacesOrderBy>>;
};

/** A condition to be used against `Circuit` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type CircuitCondition = {
  /** Checks for equality with the object’s `alt` field. */
  alt?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `circuitId` field. */
  circuitId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `circuitRef` field. */
  circuitRef?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `country` field. */
  country?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `lat` field. */
  lat?: InputMaybe<Scalars['Float']['input']>;
  /** Checks for equality with the object’s `lng` field. */
  lng?: InputMaybe<Scalars['Float']['input']>;
  /** Checks for equality with the object’s `location` field. */
  location?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `url` field. */
  url?: InputMaybe<Scalars['String']['input']>;
};

export type CircuitDescription = Node & {
  __typename?: 'CircuitDescription';
  /** Reads a single `Circuit` that is related to this `CircuitDescription`. */
  circuit?: Maybe<Circuit>;
  circuitId: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
};

/**
 * A condition to be used against `CircuitDescription` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type CircuitDescriptionCondition = {
  /** Checks for equality with the object’s `circuitId` field. */
  circuitId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
};

/** An input for mutations affecting `CircuitDescription` */
export type CircuitDescriptionInput = {
  circuitId: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
};

/** Represents an update to a `CircuitDescription`. Fields that are set will be updated. */
export type CircuitDescriptionPatch = {
  circuitId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `CircuitDescription` values. */
export type CircuitDescriptionsConnection = {
  __typename?: 'CircuitDescriptionsConnection';
  /** A list of edges which contains the `CircuitDescription` and cursor to aid in pagination. */
  edges: Array<CircuitDescriptionsEdge>;
  /** A list of `CircuitDescription` objects. */
  nodes: Array<CircuitDescription>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CircuitDescription` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `CircuitDescription` edge in the connection. */
export type CircuitDescriptionsEdge = {
  __typename?: 'CircuitDescriptionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `CircuitDescription` at the end of the edge. */
  node: CircuitDescription;
};

/** Methods to use when ordering `CircuitDescription`. */
export enum CircuitDescriptionsOrderBy {
  CircuitIdAsc = 'CIRCUIT_ID_ASC',
  CircuitIdDesc = 'CIRCUIT_ID_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** An input for mutations affecting `Circuit` */
export type CircuitInput = {
  alt?: InputMaybe<Scalars['Int']['input']>;
  circuitId: Scalars['Int']['input'];
  circuitRef?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  lat?: InputMaybe<Scalars['Float']['input']>;
  lng?: InputMaybe<Scalars['Float']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

/** Represents an update to a `Circuit`. Fields that are set will be updated. */
export type CircuitPatch = {
  alt?: InputMaybe<Scalars['Int']['input']>;
  circuitId?: InputMaybe<Scalars['Int']['input']>;
  circuitRef?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  lat?: InputMaybe<Scalars['Float']['input']>;
  lng?: InputMaybe<Scalars['Float']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `Circuit` values. */
export type CircuitsConnection = {
  __typename?: 'CircuitsConnection';
  /** A list of edges which contains the `Circuit` and cursor to aid in pagination. */
  edges: Array<CircuitsEdge>;
  /** A list of `Circuit` objects. */
  nodes: Array<Circuit>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Circuit` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Circuit` edge in the connection. */
export type CircuitsEdge = {
  __typename?: 'CircuitsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Circuit` at the end of the edge. */
  node: Circuit;
};

/** Methods to use when ordering `Circuit`. */
export enum CircuitsOrderBy {
  AltAsc = 'ALT_ASC',
  AltDesc = 'ALT_DESC',
  CircuitIdAsc = 'CIRCUIT_ID_ASC',
  CircuitIdDesc = 'CIRCUIT_ID_DESC',
  CircuitRefAsc = 'CIRCUIT_REF_ASC',
  CircuitRefDesc = 'CIRCUIT_REF_DESC',
  CountryAsc = 'COUNTRY_ASC',
  CountryDesc = 'COUNTRY_DESC',
  LatAsc = 'LAT_ASC',
  LatDesc = 'LAT_DESC',
  LngAsc = 'LNG_ASC',
  LngDesc = 'LNG_DESC',
  LocationAsc = 'LOCATION_ASC',
  LocationDesc = 'LOCATION_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UrlAsc = 'URL_ASC',
  UrlDesc = 'URL_DESC'
}

/** All input for the create `CircuitDescription` mutation. */
export type CreateCircuitDescriptionInput = {
  /** The `CircuitDescription` to be created by this mutation. */
  circuitDescription: CircuitDescriptionInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our create `CircuitDescription` mutation. */
export type CreateCircuitDescriptionPayload = {
  __typename?: 'CreateCircuitDescriptionPayload';
  /** Reads a single `Circuit` that is related to this `CircuitDescription`. */
  circuit?: Maybe<Circuit>;
  /** The `CircuitDescription` that was created by this mutation. */
  circuitDescription?: Maybe<CircuitDescription>;
  /** An edge for our `CircuitDescription`. May be used by Relay 1. */
  circuitDescriptionEdge?: Maybe<CircuitDescriptionsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `CircuitDescription` mutation. */
export type CreateCircuitDescriptionPayloadCircuitDescriptionEdgeArgs = {
  orderBy?: InputMaybe<Array<CircuitDescriptionsOrderBy>>;
};

/** All input for the create `Circuit` mutation. */
export type CreateCircuitInput = {
  /** The `Circuit` to be created by this mutation. */
  circuit: CircuitInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our create `Circuit` mutation. */
export type CreateCircuitPayload = {
  __typename?: 'CreateCircuitPayload';
  /** The `Circuit` that was created by this mutation. */
  circuit?: Maybe<Circuit>;
  /** An edge for our `Circuit`. May be used by Relay 1. */
  circuitEdge?: Maybe<CircuitsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Circuit` mutation. */
export type CreateCircuitPayloadCircuitEdgeArgs = {
  orderBy?: InputMaybe<Array<CircuitsOrderBy>>;
};

/** All input for the create `Driver` mutation. */
export type CreateDriverInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Driver` to be created by this mutation. */
  driver: DriverInput;
};

/** The output of our create `Driver` mutation. */
export type CreateDriverPayload = {
  __typename?: 'CreateDriverPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Driver` that was created by this mutation. */
  driver?: Maybe<Driver>;
  /** An edge for our `Driver`. May be used by Relay 1. */
  driverEdge?: Maybe<DriversEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Driver` mutation. */
export type CreateDriverPayloadDriverEdgeArgs = {
  orderBy?: InputMaybe<Array<DriversOrderBy>>;
};

/** All input for the create `DriverStanding` mutation. */
export type CreateDriverStandingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `DriverStanding` to be created by this mutation. */
  driverStanding: DriverStandingInput;
};

/** The output of our create `DriverStanding` mutation. */
export type CreateDriverStandingPayload = {
  __typename?: 'CreateDriverStandingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Driver` that is related to this `DriverStanding`. */
  driver?: Maybe<Driver>;
  /** The `DriverStanding` that was created by this mutation. */
  driverStanding?: Maybe<DriverStanding>;
  /** An edge for our `DriverStanding`. May be used by Relay 1. */
  driverStandingEdge?: Maybe<DriverStandingsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Race` that is related to this `DriverStanding`. */
  race?: Maybe<Race>;
};


/** The output of our create `DriverStanding` mutation. */
export type CreateDriverStandingPayloadDriverStandingEdgeArgs = {
  orderBy?: InputMaybe<Array<DriverStandingsOrderBy>>;
};

/** All input for the create `LapTime` mutation. */
export type CreateLapTimeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `LapTime` to be created by this mutation. */
  lapTime: LapTimeInput;
};

/** The output of our create `LapTime` mutation. */
export type CreateLapTimePayload = {
  __typename?: 'CreateLapTimePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Driver` that is related to this `LapTime`. */
  driver?: Maybe<Driver>;
  /** The `LapTime` that was created by this mutation. */
  lapTime?: Maybe<LapTime>;
  /** An edge for our `LapTime`. May be used by Relay 1. */
  lapTimeEdge?: Maybe<LapTimesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Race` that is related to this `LapTime`. */
  race?: Maybe<Race>;
};


/** The output of our create `LapTime` mutation. */
export type CreateLapTimePayloadLapTimeEdgeArgs = {
  orderBy?: InputMaybe<Array<LapTimesOrderBy>>;
};

/** All input for the create `PitStop` mutation. */
export type CreatePitStopInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `PitStop` to be created by this mutation. */
  pitStop: PitStopInput;
};

/** The output of our create `PitStop` mutation. */
export type CreatePitStopPayload = {
  __typename?: 'CreatePitStopPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Driver` that is related to this `PitStop`. */
  driver?: Maybe<Driver>;
  /** The `PitStop` that was created by this mutation. */
  pitStop?: Maybe<PitStop>;
  /** An edge for our `PitStop`. May be used by Relay 1. */
  pitStopEdge?: Maybe<PitStopsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Race` that is related to this `PitStop`. */
  race?: Maybe<Race>;
};


/** The output of our create `PitStop` mutation. */
export type CreatePitStopPayloadPitStopEdgeArgs = {
  orderBy?: InputMaybe<Array<PitStopsOrderBy>>;
};

/** All input for the create `Qualifying` mutation. */
export type CreateQualifyingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Qualifying` to be created by this mutation. */
  qualifying: QualifyingInput;
};

/** The output of our create `Qualifying` mutation. */
export type CreateQualifyingPayload = {
  __typename?: 'CreateQualifyingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Driver` that is related to this `Qualifying`. */
  driver?: Maybe<Driver>;
  /** The `Qualifying` that was created by this mutation. */
  qualifying?: Maybe<Qualifying>;
  /** An edge for our `Qualifying`. May be used by Relay 1. */
  qualifyingEdge?: Maybe<QualifyingsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Race` that is related to this `Qualifying`. */
  race?: Maybe<Race>;
  /** Reads a single `Team` that is related to this `Qualifying`. */
  team?: Maybe<Team>;
};


/** The output of our create `Qualifying` mutation. */
export type CreateQualifyingPayloadQualifyingEdgeArgs = {
  orderBy?: InputMaybe<Array<QualifyingsOrderBy>>;
};

/** All input for the create `Race` mutation. */
export type CreateRaceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Race` to be created by this mutation. */
  race: RaceInput;
};

/** The output of our create `Race` mutation. */
export type CreateRacePayload = {
  __typename?: 'CreateRacePayload';
  /** Reads a single `Circuit` that is related to this `Race`. */
  circuit?: Maybe<Circuit>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Race` that was created by this mutation. */
  race?: Maybe<Race>;
  /** An edge for our `Race`. May be used by Relay 1. */
  raceEdge?: Maybe<RacesEdge>;
  /** Reads a single `Season` that is related to this `Race`. */
  seasonByYear?: Maybe<Season>;
};


/** The output of our create `Race` mutation. */
export type CreateRacePayloadRaceEdgeArgs = {
  orderBy?: InputMaybe<Array<RacesOrderBy>>;
};

/** All input for the create `Result` mutation. */
export type CreateResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Result` to be created by this mutation. */
  result: ResultInput;
};

/** The output of our create `Result` mutation. */
export type CreateResultPayload = {
  __typename?: 'CreateResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Driver` that is related to this `Result`. */
  driver?: Maybe<Driver>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Race` that is related to this `Result`. */
  race?: Maybe<Race>;
  /** The `Result` that was created by this mutation. */
  result?: Maybe<Result>;
  /** An edge for our `Result`. May be used by Relay 1. */
  resultEdge?: Maybe<ResultsEdge>;
  /** Reads a single `Status` that is related to this `Result`. */
  status?: Maybe<Status>;
  /** Reads a single `Team` that is related to this `Result`. */
  team?: Maybe<Team>;
};


/** The output of our create `Result` mutation. */
export type CreateResultPayloadResultEdgeArgs = {
  orderBy?: InputMaybe<Array<ResultsOrderBy>>;
};

/** All input for the create `Season` mutation. */
export type CreateSeasonInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Season` to be created by this mutation. */
  season: SeasonInput;
};

/** The output of our create `Season` mutation. */
export type CreateSeasonPayload = {
  __typename?: 'CreateSeasonPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Season` that was created by this mutation. */
  season?: Maybe<Season>;
  /** An edge for our `Season`. May be used by Relay 1. */
  seasonEdge?: Maybe<SeasonsEdge>;
};


/** The output of our create `Season` mutation. */
export type CreateSeasonPayloadSeasonEdgeArgs = {
  orderBy?: InputMaybe<Array<SeasonsOrderBy>>;
};

/** All input for the create `SprintResult` mutation. */
export type CreateSprintResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `SprintResult` to be created by this mutation. */
  sprintResult: SprintResultInput;
};

/** The output of our create `SprintResult` mutation. */
export type CreateSprintResultPayload = {
  __typename?: 'CreateSprintResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Driver` that is related to this `SprintResult`. */
  driver?: Maybe<Driver>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Race` that is related to this `SprintResult`. */
  race?: Maybe<Race>;
  /** The `SprintResult` that was created by this mutation. */
  sprintResult?: Maybe<SprintResult>;
  /** An edge for our `SprintResult`. May be used by Relay 1. */
  sprintResultEdge?: Maybe<SprintResultsEdge>;
  /** Reads a single `Status` that is related to this `SprintResult`. */
  status?: Maybe<Status>;
  /** Reads a single `Team` that is related to this `SprintResult`. */
  team?: Maybe<Team>;
};


/** The output of our create `SprintResult` mutation. */
export type CreateSprintResultPayloadSprintResultEdgeArgs = {
  orderBy?: InputMaybe<Array<SprintResultsOrderBy>>;
};

/** All input for the create `Status` mutation. */
export type CreateStatusInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Status` to be created by this mutation. */
  status: StatusInput;
};

/** The output of our create `Status` mutation. */
export type CreateStatusPayload = {
  __typename?: 'CreateStatusPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Status` that was created by this mutation. */
  status?: Maybe<Status>;
  /** An edge for our `Status`. May be used by Relay 1. */
  statusEdge?: Maybe<StatusesEdge>;
};


/** The output of our create `Status` mutation. */
export type CreateStatusPayloadStatusEdgeArgs = {
  orderBy?: InputMaybe<Array<StatusesOrderBy>>;
};

/** All input for the create `TeamColor` mutation. */
export type CreateTeamColorInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `TeamColor` to be created by this mutation. */
  teamColor: TeamColorInput;
};

/** The output of our create `TeamColor` mutation. */
export type CreateTeamColorPayload = {
  __typename?: 'CreateTeamColorPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Team` that is related to this `TeamColor`. */
  team?: Maybe<Team>;
  /** The `TeamColor` that was created by this mutation. */
  teamColor?: Maybe<TeamColor>;
  /** An edge for our `TeamColor`. May be used by Relay 1. */
  teamColorEdge?: Maybe<TeamColorsEdge>;
};


/** The output of our create `TeamColor` mutation. */
export type CreateTeamColorPayloadTeamColorEdgeArgs = {
  orderBy?: InputMaybe<Array<TeamColorsOrderBy>>;
};

/** All input for the create `TeamHistory` mutation. */
export type CreateTeamHistoryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `TeamHistory` to be created by this mutation. */
  teamHistory: TeamHistoryInput;
};

/** The output of our create `TeamHistory` mutation. */
export type CreateTeamHistoryPayload = {
  __typename?: 'CreateTeamHistoryPayload';
  /** Reads a single `Team` that is related to this `TeamHistory`. */
  antecedentTeam?: Maybe<Team>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Team` that is related to this `TeamHistory`. */
  team?: Maybe<Team>;
  /** The `TeamHistory` that was created by this mutation. */
  teamHistory?: Maybe<TeamHistory>;
  /** An edge for our `TeamHistory`. May be used by Relay 1. */
  teamHistoryEdge?: Maybe<TeamHistoriesEdge>;
};


/** The output of our create `TeamHistory` mutation. */
export type CreateTeamHistoryPayloadTeamHistoryEdgeArgs = {
  orderBy?: InputMaybe<Array<TeamHistoriesOrderBy>>;
};

/** All input for the create `Team` mutation. */
export type CreateTeamInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Team` to be created by this mutation. */
  team: TeamInput;
};

/** The output of our create `Team` mutation. */
export type CreateTeamPayload = {
  __typename?: 'CreateTeamPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Team` that was created by this mutation. */
  team?: Maybe<Team>;
  /** An edge for our `Team`. May be used by Relay 1. */
  teamEdge?: Maybe<TeamsEdge>;
};


/** The output of our create `Team` mutation. */
export type CreateTeamPayloadTeamEdgeArgs = {
  orderBy?: InputMaybe<Array<TeamsOrderBy>>;
};

/** All input for the create `TeamResult` mutation. */
export type CreateTeamResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `TeamResult` to be created by this mutation. */
  teamResult: TeamResultInput;
};

/** The output of our create `TeamResult` mutation. */
export type CreateTeamResultPayload = {
  __typename?: 'CreateTeamResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Race` that is related to this `TeamResult`. */
  race?: Maybe<Race>;
  /** Reads a single `Team` that is related to this `TeamResult`. */
  team?: Maybe<Team>;
  /** The `TeamResult` that was created by this mutation. */
  teamResult?: Maybe<TeamResult>;
  /** An edge for our `TeamResult`. May be used by Relay 1. */
  teamResultEdge?: Maybe<TeamResultsEdge>;
};


/** The output of our create `TeamResult` mutation. */
export type CreateTeamResultPayloadTeamResultEdgeArgs = {
  orderBy?: InputMaybe<Array<TeamResultsOrderBy>>;
};

/** All input for the create `TeamStanding` mutation. */
export type CreateTeamStandingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `TeamStanding` to be created by this mutation. */
  teamStanding: TeamStandingInput;
};

/** The output of our create `TeamStanding` mutation. */
export type CreateTeamStandingPayload = {
  __typename?: 'CreateTeamStandingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Race` that is related to this `TeamStanding`. */
  race?: Maybe<Race>;
  /** Reads a single `Team` that is related to this `TeamStanding`. */
  team?: Maybe<Team>;
  /** The `TeamStanding` that was created by this mutation. */
  teamStanding?: Maybe<TeamStanding>;
  /** An edge for our `TeamStanding`. May be used by Relay 1. */
  teamStandingEdge?: Maybe<TeamStandingsEdge>;
};


/** The output of our create `TeamStanding` mutation. */
export type CreateTeamStandingPayloadTeamStandingEdgeArgs = {
  orderBy?: InputMaybe<Array<TeamStandingsOrderBy>>;
};

/** All input for the `deleteCircuitByCircuitRef` mutation. */
export type DeleteCircuitByCircuitRefInput = {
  circuitRef: Scalars['String']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** All input for the `deleteCircuitByNodeId` mutation. */
export type DeleteCircuitByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Circuit` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteCircuitByUrl` mutation. */
export type DeleteCircuitByUrlInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
};

/** All input for the `deleteCircuitDescriptionByNodeId` mutation. */
export type DeleteCircuitDescriptionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `CircuitDescription` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteCircuitDescription` mutation. */
export type DeleteCircuitDescriptionInput = {
  circuitId: Scalars['Int']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our delete `CircuitDescription` mutation. */
export type DeleteCircuitDescriptionPayload = {
  __typename?: 'DeleteCircuitDescriptionPayload';
  /** Reads a single `Circuit` that is related to this `CircuitDescription`. */
  circuit?: Maybe<Circuit>;
  /** The `CircuitDescription` that was deleted by this mutation. */
  circuitDescription?: Maybe<CircuitDescription>;
  /** An edge for our `CircuitDescription`. May be used by Relay 1. */
  circuitDescriptionEdge?: Maybe<CircuitDescriptionsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedCircuitDescriptionNodeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `CircuitDescription` mutation. */
export type DeleteCircuitDescriptionPayloadCircuitDescriptionEdgeArgs = {
  orderBy?: InputMaybe<Array<CircuitDescriptionsOrderBy>>;
};

/** All input for the `deleteCircuit` mutation. */
export type DeleteCircuitInput = {
  circuitId: Scalars['Int']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our delete `Circuit` mutation. */
export type DeleteCircuitPayload = {
  __typename?: 'DeleteCircuitPayload';
  /** The `Circuit` that was deleted by this mutation. */
  circuit?: Maybe<Circuit>;
  /** An edge for our `Circuit`. May be used by Relay 1. */
  circuitEdge?: Maybe<CircuitsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedCircuitNodeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Circuit` mutation. */
export type DeleteCircuitPayloadCircuitEdgeArgs = {
  orderBy?: InputMaybe<Array<CircuitsOrderBy>>;
};

/** All input for the `deleteDriverByDriverRef` mutation. */
export type DeleteDriverByDriverRefInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  driverRef: Scalars['String']['input'];
};

/** All input for the `deleteDriverByNodeId` mutation. */
export type DeleteDriverByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Driver` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteDriverByUrl` mutation. */
export type DeleteDriverByUrlInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
};

/** All input for the `deleteDriver` mutation. */
export type DeleteDriverInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  driverId: Scalars['Int']['input'];
};

/** The output of our delete `Driver` mutation. */
export type DeleteDriverPayload = {
  __typename?: 'DeleteDriverPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedDriverNodeId?: Maybe<Scalars['ID']['output']>;
  /** The `Driver` that was deleted by this mutation. */
  driver?: Maybe<Driver>;
  /** An edge for our `Driver`. May be used by Relay 1. */
  driverEdge?: Maybe<DriversEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Driver` mutation. */
export type DeleteDriverPayloadDriverEdgeArgs = {
  orderBy?: InputMaybe<Array<DriversOrderBy>>;
};

/** All input for the `deleteDriverStandingByNodeId` mutation. */
export type DeleteDriverStandingByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `DriverStanding` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteDriverStanding` mutation. */
export type DeleteDriverStandingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  driverStandingsId: Scalars['Int']['input'];
};

/** The output of our delete `DriverStanding` mutation. */
export type DeleteDriverStandingPayload = {
  __typename?: 'DeleteDriverStandingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedDriverStandingNodeId?: Maybe<Scalars['ID']['output']>;
  /** Reads a single `Driver` that is related to this `DriverStanding`. */
  driver?: Maybe<Driver>;
  /** The `DriverStanding` that was deleted by this mutation. */
  driverStanding?: Maybe<DriverStanding>;
  /** An edge for our `DriverStanding`. May be used by Relay 1. */
  driverStandingEdge?: Maybe<DriverStandingsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Race` that is related to this `DriverStanding`. */
  race?: Maybe<Race>;
};


/** The output of our delete `DriverStanding` mutation. */
export type DeleteDriverStandingPayloadDriverStandingEdgeArgs = {
  orderBy?: InputMaybe<Array<DriverStandingsOrderBy>>;
};

/** All input for the `deleteLapTimeByNodeId` mutation. */
export type DeleteLapTimeByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `LapTime` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteLapTime` mutation. */
export type DeleteLapTimeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  driverId: Scalars['Int']['input'];
  lap: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};

/** The output of our delete `LapTime` mutation. */
export type DeleteLapTimePayload = {
  __typename?: 'DeleteLapTimePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedLapTimeNodeId?: Maybe<Scalars['ID']['output']>;
  /** Reads a single `Driver` that is related to this `LapTime`. */
  driver?: Maybe<Driver>;
  /** The `LapTime` that was deleted by this mutation. */
  lapTime?: Maybe<LapTime>;
  /** An edge for our `LapTime`. May be used by Relay 1. */
  lapTimeEdge?: Maybe<LapTimesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Race` that is related to this `LapTime`. */
  race?: Maybe<Race>;
};


/** The output of our delete `LapTime` mutation. */
export type DeleteLapTimePayloadLapTimeEdgeArgs = {
  orderBy?: InputMaybe<Array<LapTimesOrderBy>>;
};

/** All input for the `deletePitStopByNodeId` mutation. */
export type DeletePitStopByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `PitStop` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deletePitStop` mutation. */
export type DeletePitStopInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  driverId: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
  stop: Scalars['Int']['input'];
};

/** The output of our delete `PitStop` mutation. */
export type DeletePitStopPayload = {
  __typename?: 'DeletePitStopPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedPitStopNodeId?: Maybe<Scalars['ID']['output']>;
  /** Reads a single `Driver` that is related to this `PitStop`. */
  driver?: Maybe<Driver>;
  /** The `PitStop` that was deleted by this mutation. */
  pitStop?: Maybe<PitStop>;
  /** An edge for our `PitStop`. May be used by Relay 1. */
  pitStopEdge?: Maybe<PitStopsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Race` that is related to this `PitStop`. */
  race?: Maybe<Race>;
};


/** The output of our delete `PitStop` mutation. */
export type DeletePitStopPayloadPitStopEdgeArgs = {
  orderBy?: InputMaybe<Array<PitStopsOrderBy>>;
};

/** All input for the `deleteQualifyingByNodeId` mutation. */
export type DeleteQualifyingByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Qualifying` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteQualifying` mutation. */
export type DeleteQualifyingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  qualifyId: Scalars['Int']['input'];
};

/** The output of our delete `Qualifying` mutation. */
export type DeleteQualifyingPayload = {
  __typename?: 'DeleteQualifyingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedQualifyingNodeId?: Maybe<Scalars['ID']['output']>;
  /** Reads a single `Driver` that is related to this `Qualifying`. */
  driver?: Maybe<Driver>;
  /** The `Qualifying` that was deleted by this mutation. */
  qualifying?: Maybe<Qualifying>;
  /** An edge for our `Qualifying`. May be used by Relay 1. */
  qualifyingEdge?: Maybe<QualifyingsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Race` that is related to this `Qualifying`. */
  race?: Maybe<Race>;
  /** Reads a single `Team` that is related to this `Qualifying`. */
  team?: Maybe<Team>;
};


/** The output of our delete `Qualifying` mutation. */
export type DeleteQualifyingPayloadQualifyingEdgeArgs = {
  orderBy?: InputMaybe<Array<QualifyingsOrderBy>>;
};

/** All input for the `deleteRaceByNodeId` mutation. */
export type DeleteRaceByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Race` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteRaceByYearAndRound` mutation. */
export type DeleteRaceByYearAndRoundInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  round: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
};

/** All input for the `deleteRace` mutation. */
export type DeleteRaceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  raceId: Scalars['Int']['input'];
};

/** The output of our delete `Race` mutation. */
export type DeleteRacePayload = {
  __typename?: 'DeleteRacePayload';
  /** Reads a single `Circuit` that is related to this `Race`. */
  circuit?: Maybe<Circuit>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedRaceNodeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Race` that was deleted by this mutation. */
  race?: Maybe<Race>;
  /** An edge for our `Race`. May be used by Relay 1. */
  raceEdge?: Maybe<RacesEdge>;
  /** Reads a single `Season` that is related to this `Race`. */
  seasonByYear?: Maybe<Season>;
};


/** The output of our delete `Race` mutation. */
export type DeleteRacePayloadRaceEdgeArgs = {
  orderBy?: InputMaybe<Array<RacesOrderBy>>;
};

/** All input for the `deleteResultByNodeId` mutation. */
export type DeleteResultByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Result` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteResult` mutation. */
export type DeleteResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  resultId: Scalars['Int']['input'];
};

/** The output of our delete `Result` mutation. */
export type DeleteResultPayload = {
  __typename?: 'DeleteResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedResultNodeId?: Maybe<Scalars['ID']['output']>;
  /** Reads a single `Driver` that is related to this `Result`. */
  driver?: Maybe<Driver>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Race` that is related to this `Result`. */
  race?: Maybe<Race>;
  /** The `Result` that was deleted by this mutation. */
  result?: Maybe<Result>;
  /** An edge for our `Result`. May be used by Relay 1. */
  resultEdge?: Maybe<ResultsEdge>;
  /** Reads a single `Status` that is related to this `Result`. */
  status?: Maybe<Status>;
  /** Reads a single `Team` that is related to this `Result`. */
  team?: Maybe<Team>;
};


/** The output of our delete `Result` mutation. */
export type DeleteResultPayloadResultEdgeArgs = {
  orderBy?: InputMaybe<Array<ResultsOrderBy>>;
};

/** All input for the `deleteSeasonByNodeId` mutation. */
export type DeleteSeasonByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Season` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteSeasonByUrl` mutation. */
export type DeleteSeasonByUrlInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
};

/** All input for the `deleteSeason` mutation. */
export type DeleteSeasonInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  year: Scalars['Int']['input'];
};

/** The output of our delete `Season` mutation. */
export type DeleteSeasonPayload = {
  __typename?: 'DeleteSeasonPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedSeasonNodeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Season` that was deleted by this mutation. */
  season?: Maybe<Season>;
  /** An edge for our `Season`. May be used by Relay 1. */
  seasonEdge?: Maybe<SeasonsEdge>;
};


/** The output of our delete `Season` mutation. */
export type DeleteSeasonPayloadSeasonEdgeArgs = {
  orderBy?: InputMaybe<Array<SeasonsOrderBy>>;
};

/** All input for the `deleteSprintResultByNodeId` mutation. */
export type DeleteSprintResultByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SprintResult` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteSprintResult` mutation. */
export type DeleteSprintResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  sprintResultId: Scalars['Int']['input'];
};

/** The output of our delete `SprintResult` mutation. */
export type DeleteSprintResultPayload = {
  __typename?: 'DeleteSprintResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedSprintResultNodeId?: Maybe<Scalars['ID']['output']>;
  /** Reads a single `Driver` that is related to this `SprintResult`. */
  driver?: Maybe<Driver>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Race` that is related to this `SprintResult`. */
  race?: Maybe<Race>;
  /** The `SprintResult` that was deleted by this mutation. */
  sprintResult?: Maybe<SprintResult>;
  /** An edge for our `SprintResult`. May be used by Relay 1. */
  sprintResultEdge?: Maybe<SprintResultsEdge>;
  /** Reads a single `Status` that is related to this `SprintResult`. */
  status?: Maybe<Status>;
  /** Reads a single `Team` that is related to this `SprintResult`. */
  team?: Maybe<Team>;
};


/** The output of our delete `SprintResult` mutation. */
export type DeleteSprintResultPayloadSprintResultEdgeArgs = {
  orderBy?: InputMaybe<Array<SprintResultsOrderBy>>;
};

/** All input for the `deleteStatusByNodeId` mutation. */
export type DeleteStatusByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Status` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteStatus` mutation. */
export type DeleteStatusInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  statusId: Scalars['Int']['input'];
};

/** The output of our delete `Status` mutation. */
export type DeleteStatusPayload = {
  __typename?: 'DeleteStatusPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedStatusNodeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Status` that was deleted by this mutation. */
  status?: Maybe<Status>;
  /** An edge for our `Status`. May be used by Relay 1. */
  statusEdge?: Maybe<StatusesEdge>;
};


/** The output of our delete `Status` mutation. */
export type DeleteStatusPayloadStatusEdgeArgs = {
  orderBy?: InputMaybe<Array<StatusesOrderBy>>;
};

/** All input for the `deleteTeamByConstructorRef` mutation. */
export type DeleteTeamByConstructorRefInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  constructorRef: Scalars['String']['input'];
};

/** All input for the `deleteTeamByNodeId` mutation. */
export type DeleteTeamByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Team` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteTeamColorByNodeId` mutation. */
export type DeleteTeamColorByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `TeamColor` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteTeamColor` mutation. */
export type DeleteTeamColorInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  teamId: Scalars['Int']['input'];
};

/** The output of our delete `TeamColor` mutation. */
export type DeleteTeamColorPayload = {
  __typename?: 'DeleteTeamColorPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedTeamColorNodeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Team` that is related to this `TeamColor`. */
  team?: Maybe<Team>;
  /** The `TeamColor` that was deleted by this mutation. */
  teamColor?: Maybe<TeamColor>;
  /** An edge for our `TeamColor`. May be used by Relay 1. */
  teamColorEdge?: Maybe<TeamColorsEdge>;
};


/** The output of our delete `TeamColor` mutation. */
export type DeleteTeamColorPayloadTeamColorEdgeArgs = {
  orderBy?: InputMaybe<Array<TeamColorsOrderBy>>;
};

/** All input for the `deleteTeamHistoryByNodeId` mutation. */
export type DeleteTeamHistoryByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `TeamHistory` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteTeamHistory` mutation. */
export type DeleteTeamHistoryInput = {
  antecedentTeamId: Scalars['Int']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  startYear: Scalars['Int']['input'];
  teamId: Scalars['Int']['input'];
};

/** The output of our delete `TeamHistory` mutation. */
export type DeleteTeamHistoryPayload = {
  __typename?: 'DeleteTeamHistoryPayload';
  /** Reads a single `Team` that is related to this `TeamHistory`. */
  antecedentTeam?: Maybe<Team>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedTeamHistoryNodeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Team` that is related to this `TeamHistory`. */
  team?: Maybe<Team>;
  /** The `TeamHistory` that was deleted by this mutation. */
  teamHistory?: Maybe<TeamHistory>;
  /** An edge for our `TeamHistory`. May be used by Relay 1. */
  teamHistoryEdge?: Maybe<TeamHistoriesEdge>;
};


/** The output of our delete `TeamHistory` mutation. */
export type DeleteTeamHistoryPayloadTeamHistoryEdgeArgs = {
  orderBy?: InputMaybe<Array<TeamHistoriesOrderBy>>;
};

/** All input for the `deleteTeam` mutation. */
export type DeleteTeamInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  teamId: Scalars['Int']['input'];
};

/** The output of our delete `Team` mutation. */
export type DeleteTeamPayload = {
  __typename?: 'DeleteTeamPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedTeamNodeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Team` that was deleted by this mutation. */
  team?: Maybe<Team>;
  /** An edge for our `Team`. May be used by Relay 1. */
  teamEdge?: Maybe<TeamsEdge>;
};


/** The output of our delete `Team` mutation. */
export type DeleteTeamPayloadTeamEdgeArgs = {
  orderBy?: InputMaybe<Array<TeamsOrderBy>>;
};

/** All input for the `deleteTeamResultByNodeId` mutation. */
export type DeleteTeamResultByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `TeamResult` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteTeamResult` mutation. */
export type DeleteTeamResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  constructorResultsId: Scalars['Int']['input'];
};

/** The output of our delete `TeamResult` mutation. */
export type DeleteTeamResultPayload = {
  __typename?: 'DeleteTeamResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedTeamResultNodeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Race` that is related to this `TeamResult`. */
  race?: Maybe<Race>;
  /** Reads a single `Team` that is related to this `TeamResult`. */
  team?: Maybe<Team>;
  /** The `TeamResult` that was deleted by this mutation. */
  teamResult?: Maybe<TeamResult>;
  /** An edge for our `TeamResult`. May be used by Relay 1. */
  teamResultEdge?: Maybe<TeamResultsEdge>;
};


/** The output of our delete `TeamResult` mutation. */
export type DeleteTeamResultPayloadTeamResultEdgeArgs = {
  orderBy?: InputMaybe<Array<TeamResultsOrderBy>>;
};

/** All input for the `deleteTeamStandingByNodeId` mutation. */
export type DeleteTeamStandingByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `TeamStanding` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteTeamStanding` mutation. */
export type DeleteTeamStandingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  constructorStandingsId: Scalars['Int']['input'];
};

/** The output of our delete `TeamStanding` mutation. */
export type DeleteTeamStandingPayload = {
  __typename?: 'DeleteTeamStandingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedTeamStandingNodeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Race` that is related to this `TeamStanding`. */
  race?: Maybe<Race>;
  /** Reads a single `Team` that is related to this `TeamStanding`. */
  team?: Maybe<Team>;
  /** The `TeamStanding` that was deleted by this mutation. */
  teamStanding?: Maybe<TeamStanding>;
  /** An edge for our `TeamStanding`. May be used by Relay 1. */
  teamStandingEdge?: Maybe<TeamStandingsEdge>;
};


/** The output of our delete `TeamStanding` mutation. */
export type DeleteTeamStandingPayloadTeamStandingEdgeArgs = {
  orderBy?: InputMaybe<Array<TeamStandingsOrderBy>>;
};

export type Driver = Node & {
  __typename?: 'Driver';
  bio?: Maybe<DriverBio>;
  code?: Maybe<Scalars['String']['output']>;
  /** Reads a single `DriverCurrentTeam` that is related to this `Driver`. */
  currentTeam?: Maybe<DriverCurrentTeam>;
  dob?: Maybe<Scalars['Date']['output']>;
  driverId: Scalars['Int']['output'];
  driverRef: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `DriverStanding`. */
  driverStandings: Array<DriverStanding>;
  /** Reads and enables pagination through a set of `DriverStandingsBySeason`. */
  driverStandingsBySeasons: Array<DriverStandingsBySeason>;
  /** Reads and enables pagination through a set of `DriverStandingsBySeason`. */
  driverStandingsBySeasonsConnection: DriverStandingsBySeasonsConnection;
  /** Reads and enables pagination through a set of `DriverStanding`. */
  driverStandingsConnection: DriverStandingsConnection;
  forename?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `LapTime`. */
  lapTimes: Array<LapTime>;
  /** Reads and enables pagination through a set of `LapTime`. */
  lapTimesConnection: LapTimesConnection;
  nationality?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  number?: Maybe<Scalars['Int']['output']>;
  /** Reads and enables pagination through a set of `PitStop`. */
  pitStops: Array<PitStop>;
  /** Reads and enables pagination through a set of `PitStop`. */
  pitStopsConnection: PitStopsConnection;
  /** Reads and enables pagination through a set of `Qualifying`. */
  qualifyings: Array<Qualifying>;
  /** Reads and enables pagination through a set of `Qualifying`. */
  qualifyingsConnection: QualifyingsConnection;
  /** Reads and enables pagination through a set of `Result`. */
  results: Array<Result>;
  /** Reads and enables pagination through a set of `Result`. */
  resultsConnection: ResultsConnection;
  /** Reads and enables pagination through a set of `SprintResult`. */
  sprintResults: Array<SprintResult>;
  /** Reads and enables pagination through a set of `SprintResult`. */
  sprintResultsConnection: SprintResultsConnection;
  surname?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `DriverTeam`. */
  teamsByYear: Array<DriverTeam>;
  /** Reads and enables pagination through a set of `DriverTeam`. */
  teamsByYearConnection: DriverTeamsConnection;
  url?: Maybe<Scalars['String']['output']>;
};


export type DriverDriverStandingsArgs = {
  condition?: InputMaybe<DriverStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverStandingsOrderBy>>;
};


export type DriverDriverStandingsBySeasonsArgs = {
  condition?: InputMaybe<DriverStandingsBySeasonCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverStandingsBySeasonsOrderBy>>;
};


export type DriverDriverStandingsBySeasonsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DriverStandingsBySeasonCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverStandingsBySeasonsOrderBy>>;
};


export type DriverDriverStandingsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DriverStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverStandingsOrderBy>>;
};


export type DriverLapTimesArgs = {
  condition?: InputMaybe<LapTimeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LapTimesOrderBy>>;
};


export type DriverLapTimesConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<LapTimeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LapTimesOrderBy>>;
};


export type DriverPitStopsArgs = {
  condition?: InputMaybe<PitStopCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PitStopsOrderBy>>;
};


export type DriverPitStopsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PitStopCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PitStopsOrderBy>>;
};


export type DriverQualifyingsArgs = {
  condition?: InputMaybe<QualifyingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<QualifyingsOrderBy>>;
};


export type DriverQualifyingsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<QualifyingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<QualifyingsOrderBy>>;
};


export type DriverResultsArgs = {
  condition?: InputMaybe<ResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ResultsOrderBy>>;
};


export type DriverResultsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ResultsOrderBy>>;
};


export type DriverSprintResultsArgs = {
  condition?: InputMaybe<SprintResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintResultsOrderBy>>;
};


export type DriverSprintResultsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SprintResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintResultsOrderBy>>;
};


export type DriverTeamsByYearArgs = {
  condition?: InputMaybe<DriverTeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverTeamsOrderBy>>;
};


export type DriverTeamsByYearConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DriverTeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverTeamsOrderBy>>;
};

export type DriverBio = {
  __typename?: 'DriverBio';
  description?: Maybe<Scalars['String']['output']>;
  extract?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<BioImage>;
  title?: Maybe<Scalars['String']['output']>;
};

/** A condition to be used against `Driver` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type DriverCondition = {
  /** Checks for equality with the object’s `code` field. */
  code?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `dob` field. */
  dob?: InputMaybe<Scalars['Date']['input']>;
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `driverRef` field. */
  driverRef?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `forename` field. */
  forename?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `nationality` field. */
  nationality?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `number` field. */
  number?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `surname` field. */
  surname?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `url` field. */
  url?: InputMaybe<Scalars['String']['input']>;
};

export type DriverCurrentTeam = {
  __typename?: 'DriverCurrentTeam';
  /** Reads a single `Driver` that is related to this `DriverCurrentTeam`. */
  driver?: Maybe<Driver>;
  driverId?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `Team` that is related to this `DriverCurrentTeam`. */
  team?: Maybe<Team>;
  teamId?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/**
 * A condition to be used against `DriverCurrentTeam` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type DriverCurrentTeamCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `year` field. */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `DriverCurrentTeam` values. */
export type DriverCurrentTeamsConnection = {
  __typename?: 'DriverCurrentTeamsConnection';
  /** A list of edges which contains the `DriverCurrentTeam` and cursor to aid in pagination. */
  edges: Array<DriverCurrentTeamsEdge>;
  /** A list of `DriverCurrentTeam` objects. */
  nodes: Array<DriverCurrentTeam>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `DriverCurrentTeam` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `DriverCurrentTeam` edge in the connection. */
export type DriverCurrentTeamsEdge = {
  __typename?: 'DriverCurrentTeamsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `DriverCurrentTeam` at the end of the edge. */
  node: DriverCurrentTeam;
};

/** Methods to use when ordering `DriverCurrentTeam`. */
export enum DriverCurrentTeamsOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  Natural = 'NATURAL',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  YearAsc = 'YEAR_ASC',
  YearDesc = 'YEAR_DESC'
}

/** An input for mutations affecting `Driver` */
export type DriverInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  dob?: InputMaybe<Scalars['Date']['input']>;
  driverId: Scalars['Int']['input'];
  driverRef: Scalars['String']['input'];
  forename?: InputMaybe<Scalars['String']['input']>;
  nationality?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

/** Represents an update to a `Driver`. Fields that are set will be updated. */
export type DriverPatch = {
  code?: InputMaybe<Scalars['String']['input']>;
  dob?: InputMaybe<Scalars['Date']['input']>;
  driverId?: InputMaybe<Scalars['Int']['input']>;
  driverRef?: InputMaybe<Scalars['String']['input']>;
  forename?: InputMaybe<Scalars['String']['input']>;
  nationality?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type DriverStanding = Node & {
  __typename?: 'DriverStanding';
  /** Reads a single `Driver` that is related to this `DriverStanding`. */
  driver?: Maybe<Driver>;
  driverId?: Maybe<Scalars['Int']['output']>;
  driverStandingsId: Scalars['Int']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  positionText?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Race` that is related to this `DriverStanding`. */
  race?: Maybe<Race>;
  raceId?: Maybe<Scalars['Int']['output']>;
  wins?: Maybe<Scalars['Int']['output']>;
};

/**
 * A condition to be used against `DriverStanding` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type DriverStandingCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `driverStandingsId` field. */
  driverStandingsId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `points` field. */
  points?: InputMaybe<Scalars['Float']['input']>;
  /** Checks for equality with the object’s `position` field. */
  position?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionText` field. */
  positionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `wins` field. */
  wins?: InputMaybe<Scalars['Int']['input']>;
  /** Filters driverStandings by year */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** An input for mutations affecting `DriverStanding` */
export type DriverStandingInput = {
  driverId?: InputMaybe<Scalars['Int']['input']>;
  driverStandingsId: Scalars['Int']['input'];
  points?: InputMaybe<Scalars['Float']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  wins?: InputMaybe<Scalars['Int']['input']>;
};

/** Represents an update to a `DriverStanding`. Fields that are set will be updated. */
export type DriverStandingPatch = {
  driverId?: InputMaybe<Scalars['Int']['input']>;
  driverStandingsId?: InputMaybe<Scalars['Int']['input']>;
  points?: InputMaybe<Scalars['Float']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  wins?: InputMaybe<Scalars['Int']['input']>;
};

export type DriverStandingsBySeason = {
  __typename?: 'DriverStandingsBySeason';
  /** Reads a single `Driver` that is related to this `DriverStandingsBySeason`. */
  driver?: Maybe<Driver>;
  driverId?: Maybe<Scalars['Int']['output']>;
  driverStandingsId?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `DriverTeam` that is related to this `DriverStandingsBySeason`. */
  driverTeamByDriverIdAndYear?: Maybe<DriverTeam>;
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  positionText?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Race` that is related to this `DriverStandingsBySeason`. */
  race?: Maybe<Race>;
  raceId?: Maybe<Scalars['Int']['output']>;
  wins?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/**
 * A condition to be used against `DriverStandingsBySeason` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type DriverStandingsBySeasonCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `driverStandingsId` field. */
  driverStandingsId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `points` field. */
  points?: InputMaybe<Scalars['Float']['input']>;
  /** Checks for equality with the object’s `position` field. */
  position?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionText` field. */
  positionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `wins` field. */
  wins?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `year` field. */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `DriverStandingsBySeason` values. */
export type DriverStandingsBySeasonsConnection = {
  __typename?: 'DriverStandingsBySeasonsConnection';
  /** A list of edges which contains the `DriverStandingsBySeason` and cursor to aid in pagination. */
  edges: Array<DriverStandingsBySeasonsEdge>;
  /** A list of `DriverStandingsBySeason` objects. */
  nodes: Array<DriverStandingsBySeason>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `DriverStandingsBySeason` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `DriverStandingsBySeason` edge in the connection. */
export type DriverStandingsBySeasonsEdge = {
  __typename?: 'DriverStandingsBySeasonsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `DriverStandingsBySeason` at the end of the edge. */
  node: DriverStandingsBySeason;
};

/** Methods to use when ordering `DriverStandingsBySeason`. */
export enum DriverStandingsBySeasonsOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  DriverStandingsIdAsc = 'DRIVER_STANDINGS_ID_ASC',
  DriverStandingsIdDesc = 'DRIVER_STANDINGS_ID_DESC',
  Natural = 'NATURAL',
  PointsAsc = 'POINTS_ASC',
  PointsDesc = 'POINTS_DESC',
  PositionAsc = 'POSITION_ASC',
  PositionDesc = 'POSITION_DESC',
  PositionTextAsc = 'POSITION_TEXT_ASC',
  PositionTextDesc = 'POSITION_TEXT_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC',
  WinsAsc = 'WINS_ASC',
  WinsDesc = 'WINS_DESC',
  YearAsc = 'YEAR_ASC',
  YearDesc = 'YEAR_DESC'
}

/** A connection to a list of `DriverStanding` values. */
export type DriverStandingsConnection = {
  __typename?: 'DriverStandingsConnection';
  /** A list of edges which contains the `DriverStanding` and cursor to aid in pagination. */
  edges: Array<DriverStandingsEdge>;
  /** A list of `DriverStanding` objects. */
  nodes: Array<DriverStanding>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `DriverStanding` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `DriverStanding` edge in the connection. */
export type DriverStandingsEdge = {
  __typename?: 'DriverStandingsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `DriverStanding` at the end of the edge. */
  node: DriverStanding;
};

/** Methods to use when ordering `DriverStanding`. */
export enum DriverStandingsOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  DriverStandingsIdAsc = 'DRIVER_STANDINGS_ID_ASC',
  DriverStandingsIdDesc = 'DRIVER_STANDINGS_ID_DESC',
  Natural = 'NATURAL',
  PointsAsc = 'POINTS_ASC',
  PointsDesc = 'POINTS_DESC',
  PositionAsc = 'POSITION_ASC',
  PositionDesc = 'POSITION_DESC',
  PositionTextAsc = 'POSITION_TEXT_ASC',
  PositionTextDesc = 'POSITION_TEXT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC',
  WinsAsc = 'WINS_ASC',
  WinsDesc = 'WINS_DESC'
}

export type DriverTeam = {
  __typename?: 'DriverTeam';
  /** Reads a single `Driver` that is related to this `DriverTeam`. */
  driver?: Maybe<Driver>;
  driverId?: Maybe<Scalars['Int']['output']>;
  /** Reads and enables pagination through a set of `DriverStandingsBySeason`. */
  driverStandingsBySeasonsByDriverIdAndYear: Array<DriverStandingsBySeason>;
  /** Reads and enables pagination through a set of `DriverStandingsBySeason`. */
  driverStandingsBySeasonsByDriverIdAndYearConnection: DriverStandingsBySeasonsConnection;
  /** Reads a single `Season` that is related to this `DriverTeam`. */
  seasonByYear?: Maybe<Season>;
  /** Reads a single `Team` that is related to this `DriverTeam`. */
  team?: Maybe<Team>;
  teamId?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};


export type DriverTeamDriverStandingsBySeasonsByDriverIdAndYearArgs = {
  condition?: InputMaybe<DriverStandingsBySeasonCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverStandingsBySeasonsOrderBy>>;
};


export type DriverTeamDriverStandingsBySeasonsByDriverIdAndYearConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DriverStandingsBySeasonCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverStandingsBySeasonsOrderBy>>;
};

/**
 * A condition to be used against `DriverTeam` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type DriverTeamCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `year` field. */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `DriverTeam` values. */
export type DriverTeamsConnection = {
  __typename?: 'DriverTeamsConnection';
  /** A list of edges which contains the `DriverTeam` and cursor to aid in pagination. */
  edges: Array<DriverTeamsEdge>;
  /** A list of `DriverTeam` objects. */
  nodes: Array<DriverTeam>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `DriverTeam` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `DriverTeam` edge in the connection. */
export type DriverTeamsEdge = {
  __typename?: 'DriverTeamsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `DriverTeam` at the end of the edge. */
  node: DriverTeam;
};

/** Methods to use when ordering `DriverTeam`. */
export enum DriverTeamsOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  Natural = 'NATURAL',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  YearAsc = 'YEAR_ASC',
  YearDesc = 'YEAR_DESC'
}

/** A connection to a list of `Driver` values. */
export type DriversConnection = {
  __typename?: 'DriversConnection';
  /** A list of edges which contains the `Driver` and cursor to aid in pagination. */
  edges: Array<DriversEdge>;
  /** A list of `Driver` objects. */
  nodes: Array<Driver>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Driver` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Driver` edge in the connection. */
export type DriversEdge = {
  __typename?: 'DriversEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Driver` at the end of the edge. */
  node: Driver;
};

/** Methods to use when ordering `Driver`. */
export enum DriversOrderBy {
  CodeAsc = 'CODE_ASC',
  CodeDesc = 'CODE_DESC',
  DobAsc = 'DOB_ASC',
  DobDesc = 'DOB_DESC',
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  DriverRefAsc = 'DRIVER_REF_ASC',
  DriverRefDesc = 'DRIVER_REF_DESC',
  ForenameAsc = 'FORENAME_ASC',
  ForenameDesc = 'FORENAME_DESC',
  NationalityAsc = 'NATIONALITY_ASC',
  NationalityDesc = 'NATIONALITY_DESC',
  Natural = 'NATURAL',
  NumberAsc = 'NUMBER_ASC',
  NumberDesc = 'NUMBER_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SurnameAsc = 'SURNAME_ASC',
  SurnameDesc = 'SURNAME_DESC',
  UrlAsc = 'URL_ASC',
  UrlDesc = 'URL_DESC'
}

export type FinalTeamStandingsByYear = {
  __typename?: 'FinalTeamStandingsByYear';
  constructorStandingsId?: Maybe<Scalars['Int']['output']>;
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  positionText?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Race` that is related to this `FinalTeamStandingsByYear`. */
  race?: Maybe<Race>;
  raceId?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `Team` that is related to this `FinalTeamStandingsByYear`. */
  team?: Maybe<Team>;
  teamId?: Maybe<Scalars['Int']['output']>;
  wins?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/**
 * A condition to be used against `FinalTeamStandingsByYear` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type FinalTeamStandingsByYearCondition = {
  /** Checks for equality with the object’s `constructorStandingsId` field. */
  constructorStandingsId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `points` field. */
  points?: InputMaybe<Scalars['Float']['input']>;
  /** Checks for equality with the object’s `position` field. */
  position?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionText` field. */
  positionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `wins` field. */
  wins?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `year` field. */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `FinalTeamStandingsByYear` values. */
export type FinalTeamStandingsByYearsConnection = {
  __typename?: 'FinalTeamStandingsByYearsConnection';
  /** A list of edges which contains the `FinalTeamStandingsByYear` and cursor to aid in pagination. */
  edges: Array<FinalTeamStandingsByYearsEdge>;
  /** A list of `FinalTeamStandingsByYear` objects. */
  nodes: Array<FinalTeamStandingsByYear>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `FinalTeamStandingsByYear` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `FinalTeamStandingsByYear` edge in the connection. */
export type FinalTeamStandingsByYearsEdge = {
  __typename?: 'FinalTeamStandingsByYearsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `FinalTeamStandingsByYear` at the end of the edge. */
  node: FinalTeamStandingsByYear;
};

/** Methods to use when ordering `FinalTeamStandingsByYear`. */
export enum FinalTeamStandingsByYearsOrderBy {
  ConstructorStandingsIdAsc = 'CONSTRUCTOR_STANDINGS_ID_ASC',
  ConstructorStandingsIdDesc = 'CONSTRUCTOR_STANDINGS_ID_DESC',
  Natural = 'NATURAL',
  PointsAsc = 'POINTS_ASC',
  PointsDesc = 'POINTS_DESC',
  PositionAsc = 'POSITION_ASC',
  PositionDesc = 'POSITION_DESC',
  PositionTextAsc = 'POSITION_TEXT_ASC',
  PositionTextDesc = 'POSITION_TEXT_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  WinsAsc = 'WINS_ASC',
  WinsDesc = 'WINS_DESC',
  YearAsc = 'YEAR_ASC',
  YearDesc = 'YEAR_DESC'
}

export type LapTime = Node & {
  __typename?: 'LapTime';
  /** Reads a single `Driver` that is related to this `LapTime`. */
  driver?: Maybe<Driver>;
  driverId: Scalars['Int']['output'];
  lap: Scalars['Int']['output'];
  milliseconds?: Maybe<Scalars['Int']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  position?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `Race` that is related to this `LapTime`. */
  race?: Maybe<Race>;
  raceId: Scalars['Int']['output'];
  time?: Maybe<Scalars['String']['output']>;
};

/** A condition to be used against `LapTime` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type LapTimeCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `lap` field. */
  lap?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `milliseconds` field. */
  milliseconds?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `position` field. */
  position?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `time` field. */
  time?: InputMaybe<Scalars['String']['input']>;
};

/** An input for mutations affecting `LapTime` */
export type LapTimeInput = {
  driverId: Scalars['Int']['input'];
  lap: Scalars['Int']['input'];
  milliseconds?: InputMaybe<Scalars['Int']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  raceId: Scalars['Int']['input'];
  time?: InputMaybe<Scalars['String']['input']>;
};

/** Represents an update to a `LapTime`. Fields that are set will be updated. */
export type LapTimePatch = {
  driverId?: InputMaybe<Scalars['Int']['input']>;
  lap?: InputMaybe<Scalars['Int']['input']>;
  milliseconds?: InputMaybe<Scalars['Int']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `LapTime` values. */
export type LapTimesConnection = {
  __typename?: 'LapTimesConnection';
  /** A list of edges which contains the `LapTime` and cursor to aid in pagination. */
  edges: Array<LapTimesEdge>;
  /** A list of `LapTime` objects. */
  nodes: Array<LapTime>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `LapTime` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `LapTime` edge in the connection. */
export type LapTimesEdge = {
  __typename?: 'LapTimesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `LapTime` at the end of the edge. */
  node: LapTime;
};

/** Methods to use when ordering `LapTime`. */
export enum LapTimesOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  LapAsc = 'LAP_ASC',
  LapDesc = 'LAP_DESC',
  MillisecondsAsc = 'MILLISECONDS_ASC',
  MillisecondsDesc = 'MILLISECONDS_DESC',
  Natural = 'NATURAL',
  PositionAsc = 'POSITION_ASC',
  PositionDesc = 'POSITION_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC',
  TimeAsc = 'TIME_ASC',
  TimeDesc = 'TIME_DESC'
}

export type LapTimesWithStart = {
  __typename?: 'LapTimesWithStart';
  driverId?: Maybe<Scalars['Int']['output']>;
  lap?: Maybe<Scalars['Int']['output']>;
  milliseconds?: Maybe<Scalars['Int']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `Race` that is related to this `LapTimesWithStart`. */
  race?: Maybe<Race>;
  raceId?: Maybe<Scalars['Int']['output']>;
  time?: Maybe<Scalars['String']['output']>;
};

/**
 * A condition to be used against `LapTimesWithStart` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type LapTimesWithStartCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `lap` field. */
  lap?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `milliseconds` field. */
  milliseconds?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `position` field. */
  position?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `time` field. */
  time?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `LapTimesWithStart` values. */
export type LapTimesWithStartsConnection = {
  __typename?: 'LapTimesWithStartsConnection';
  /** A list of edges which contains the `LapTimesWithStart` and cursor to aid in pagination. */
  edges: Array<LapTimesWithStartsEdge>;
  /** A list of `LapTimesWithStart` objects. */
  nodes: Array<LapTimesWithStart>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `LapTimesWithStart` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `LapTimesWithStart` edge in the connection. */
export type LapTimesWithStartsEdge = {
  __typename?: 'LapTimesWithStartsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `LapTimesWithStart` at the end of the edge. */
  node: LapTimesWithStart;
};

/** Methods to use when ordering `LapTimesWithStart`. */
export enum LapTimesWithStartsOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  LapAsc = 'LAP_ASC',
  LapDesc = 'LAP_DESC',
  MillisecondsAsc = 'MILLISECONDS_ASC',
  MillisecondsDesc = 'MILLISECONDS_DESC',
  Natural = 'NATURAL',
  PositionAsc = 'POSITION_ASC',
  PositionDesc = 'POSITION_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC',
  TimeAsc = 'TIME_ASC',
  TimeDesc = 'TIME_DESC'
}

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `Circuit`. */
  createCircuit?: Maybe<CreateCircuitPayload>;
  /** Creates a single `CircuitDescription`. */
  createCircuitDescription?: Maybe<CreateCircuitDescriptionPayload>;
  /** Creates a single `Driver`. */
  createDriver?: Maybe<CreateDriverPayload>;
  /** Creates a single `DriverStanding`. */
  createDriverStanding?: Maybe<CreateDriverStandingPayload>;
  /** Creates a single `LapTime`. */
  createLapTime?: Maybe<CreateLapTimePayload>;
  /** Creates a single `PitStop`. */
  createPitStop?: Maybe<CreatePitStopPayload>;
  /** Creates a single `Qualifying`. */
  createQualifying?: Maybe<CreateQualifyingPayload>;
  /** Creates a single `Race`. */
  createRace?: Maybe<CreateRacePayload>;
  /** Creates a single `Result`. */
  createResult?: Maybe<CreateResultPayload>;
  /** Creates a single `Season`. */
  createSeason?: Maybe<CreateSeasonPayload>;
  /** Creates a single `SprintResult`. */
  createSprintResult?: Maybe<CreateSprintResultPayload>;
  /** Creates a single `Status`. */
  createStatus?: Maybe<CreateStatusPayload>;
  /** Creates a single `Team`. */
  createTeam?: Maybe<CreateTeamPayload>;
  /** Creates a single `TeamColor`. */
  createTeamColor?: Maybe<CreateTeamColorPayload>;
  /** Creates a single `TeamHistory`. */
  createTeamHistory?: Maybe<CreateTeamHistoryPayload>;
  /** Creates a single `TeamResult`. */
  createTeamResult?: Maybe<CreateTeamResultPayload>;
  /** Creates a single `TeamStanding`. */
  createTeamStanding?: Maybe<CreateTeamStandingPayload>;
  /** Deletes a single `Circuit` using a unique key. */
  deleteCircuit?: Maybe<DeleteCircuitPayload>;
  /** Deletes a single `Circuit` using a unique key. */
  deleteCircuitByCircuitRef?: Maybe<DeleteCircuitPayload>;
  /** Deletes a single `Circuit` using its globally unique id. */
  deleteCircuitByNodeId?: Maybe<DeleteCircuitPayload>;
  /** Deletes a single `Circuit` using a unique key. */
  deleteCircuitByUrl?: Maybe<DeleteCircuitPayload>;
  /** Deletes a single `CircuitDescription` using a unique key. */
  deleteCircuitDescription?: Maybe<DeleteCircuitDescriptionPayload>;
  /** Deletes a single `CircuitDescription` using its globally unique id. */
  deleteCircuitDescriptionByNodeId?: Maybe<DeleteCircuitDescriptionPayload>;
  /** Deletes a single `Driver` using a unique key. */
  deleteDriver?: Maybe<DeleteDriverPayload>;
  /** Deletes a single `Driver` using a unique key. */
  deleteDriverByDriverRef?: Maybe<DeleteDriverPayload>;
  /** Deletes a single `Driver` using its globally unique id. */
  deleteDriverByNodeId?: Maybe<DeleteDriverPayload>;
  /** Deletes a single `Driver` using a unique key. */
  deleteDriverByUrl?: Maybe<DeleteDriverPayload>;
  /** Deletes a single `DriverStanding` using a unique key. */
  deleteDriverStanding?: Maybe<DeleteDriverStandingPayload>;
  /** Deletes a single `DriverStanding` using its globally unique id. */
  deleteDriverStandingByNodeId?: Maybe<DeleteDriverStandingPayload>;
  /** Deletes a single `LapTime` using a unique key. */
  deleteLapTime?: Maybe<DeleteLapTimePayload>;
  /** Deletes a single `LapTime` using its globally unique id. */
  deleteLapTimeByNodeId?: Maybe<DeleteLapTimePayload>;
  /** Deletes a single `PitStop` using a unique key. */
  deletePitStop?: Maybe<DeletePitStopPayload>;
  /** Deletes a single `PitStop` using its globally unique id. */
  deletePitStopByNodeId?: Maybe<DeletePitStopPayload>;
  /** Deletes a single `Qualifying` using a unique key. */
  deleteQualifying?: Maybe<DeleteQualifyingPayload>;
  /** Deletes a single `Qualifying` using its globally unique id. */
  deleteQualifyingByNodeId?: Maybe<DeleteQualifyingPayload>;
  /** Deletes a single `Race` using a unique key. */
  deleteRace?: Maybe<DeleteRacePayload>;
  /** Deletes a single `Race` using its globally unique id. */
  deleteRaceByNodeId?: Maybe<DeleteRacePayload>;
  /** Deletes a single `Race` using a unique key. */
  deleteRaceByYearAndRound?: Maybe<DeleteRacePayload>;
  /** Deletes a single `Result` using a unique key. */
  deleteResult?: Maybe<DeleteResultPayload>;
  /** Deletes a single `Result` using its globally unique id. */
  deleteResultByNodeId?: Maybe<DeleteResultPayload>;
  /** Deletes a single `Season` using a unique key. */
  deleteSeason?: Maybe<DeleteSeasonPayload>;
  /** Deletes a single `Season` using its globally unique id. */
  deleteSeasonByNodeId?: Maybe<DeleteSeasonPayload>;
  /** Deletes a single `Season` using a unique key. */
  deleteSeasonByUrl?: Maybe<DeleteSeasonPayload>;
  /** Deletes a single `SprintResult` using a unique key. */
  deleteSprintResult?: Maybe<DeleteSprintResultPayload>;
  /** Deletes a single `SprintResult` using its globally unique id. */
  deleteSprintResultByNodeId?: Maybe<DeleteSprintResultPayload>;
  /** Deletes a single `Status` using a unique key. */
  deleteStatus?: Maybe<DeleteStatusPayload>;
  /** Deletes a single `Status` using its globally unique id. */
  deleteStatusByNodeId?: Maybe<DeleteStatusPayload>;
  /** Deletes a single `Team` using a unique key. */
  deleteTeam?: Maybe<DeleteTeamPayload>;
  /** Deletes a single `Team` using a unique key. */
  deleteTeamByConstructorRef?: Maybe<DeleteTeamPayload>;
  /** Deletes a single `Team` using its globally unique id. */
  deleteTeamByNodeId?: Maybe<DeleteTeamPayload>;
  /** Deletes a single `TeamColor` using a unique key. */
  deleteTeamColor?: Maybe<DeleteTeamColorPayload>;
  /** Deletes a single `TeamColor` using its globally unique id. */
  deleteTeamColorByNodeId?: Maybe<DeleteTeamColorPayload>;
  /** Deletes a single `TeamHistory` using a unique key. */
  deleteTeamHistory?: Maybe<DeleteTeamHistoryPayload>;
  /** Deletes a single `TeamHistory` using its globally unique id. */
  deleteTeamHistoryByNodeId?: Maybe<DeleteTeamHistoryPayload>;
  /** Deletes a single `TeamResult` using a unique key. */
  deleteTeamResult?: Maybe<DeleteTeamResultPayload>;
  /** Deletes a single `TeamResult` using its globally unique id. */
  deleteTeamResultByNodeId?: Maybe<DeleteTeamResultPayload>;
  /** Deletes a single `TeamStanding` using a unique key. */
  deleteTeamStanding?: Maybe<DeleteTeamStandingPayload>;
  /** Deletes a single `TeamStanding` using its globally unique id. */
  deleteTeamStandingByNodeId?: Maybe<DeleteTeamStandingPayload>;
  /** Updates a single `Circuit` using a unique key and a patch. */
  updateCircuit?: Maybe<UpdateCircuitPayload>;
  /** Updates a single `Circuit` using a unique key and a patch. */
  updateCircuitByCircuitRef?: Maybe<UpdateCircuitPayload>;
  /** Updates a single `Circuit` using its globally unique id and a patch. */
  updateCircuitByNodeId?: Maybe<UpdateCircuitPayload>;
  /** Updates a single `Circuit` using a unique key and a patch. */
  updateCircuitByUrl?: Maybe<UpdateCircuitPayload>;
  /** Updates a single `CircuitDescription` using a unique key and a patch. */
  updateCircuitDescription?: Maybe<UpdateCircuitDescriptionPayload>;
  /** Updates a single `CircuitDescription` using its globally unique id and a patch. */
  updateCircuitDescriptionByNodeId?: Maybe<UpdateCircuitDescriptionPayload>;
  /** Updates a single `Driver` using a unique key and a patch. */
  updateDriver?: Maybe<UpdateDriverPayload>;
  /** Updates a single `Driver` using a unique key and a patch. */
  updateDriverByDriverRef?: Maybe<UpdateDriverPayload>;
  /** Updates a single `Driver` using its globally unique id and a patch. */
  updateDriverByNodeId?: Maybe<UpdateDriverPayload>;
  /** Updates a single `Driver` using a unique key and a patch. */
  updateDriverByUrl?: Maybe<UpdateDriverPayload>;
  /** Updates a single `DriverStanding` using a unique key and a patch. */
  updateDriverStanding?: Maybe<UpdateDriverStandingPayload>;
  /** Updates a single `DriverStanding` using its globally unique id and a patch. */
  updateDriverStandingByNodeId?: Maybe<UpdateDriverStandingPayload>;
  /** Updates a single `LapTime` using a unique key and a patch. */
  updateLapTime?: Maybe<UpdateLapTimePayload>;
  /** Updates a single `LapTime` using its globally unique id and a patch. */
  updateLapTimeByNodeId?: Maybe<UpdateLapTimePayload>;
  /** Updates a single `PitStop` using a unique key and a patch. */
  updatePitStop?: Maybe<UpdatePitStopPayload>;
  /** Updates a single `PitStop` using its globally unique id and a patch. */
  updatePitStopByNodeId?: Maybe<UpdatePitStopPayload>;
  /** Updates a single `Qualifying` using a unique key and a patch. */
  updateQualifying?: Maybe<UpdateQualifyingPayload>;
  /** Updates a single `Qualifying` using its globally unique id and a patch. */
  updateQualifyingByNodeId?: Maybe<UpdateQualifyingPayload>;
  /** Updates a single `Race` using a unique key and a patch. */
  updateRace?: Maybe<UpdateRacePayload>;
  /** Updates a single `Race` using its globally unique id and a patch. */
  updateRaceByNodeId?: Maybe<UpdateRacePayload>;
  /** Updates a single `Race` using a unique key and a patch. */
  updateRaceByYearAndRound?: Maybe<UpdateRacePayload>;
  /** Updates a single `Result` using a unique key and a patch. */
  updateResult?: Maybe<UpdateResultPayload>;
  /** Updates a single `Result` using its globally unique id and a patch. */
  updateResultByNodeId?: Maybe<UpdateResultPayload>;
  /** Updates a single `Season` using a unique key and a patch. */
  updateSeason?: Maybe<UpdateSeasonPayload>;
  /** Updates a single `Season` using its globally unique id and a patch. */
  updateSeasonByNodeId?: Maybe<UpdateSeasonPayload>;
  /** Updates a single `Season` using a unique key and a patch. */
  updateSeasonByUrl?: Maybe<UpdateSeasonPayload>;
  /** Updates a single `SprintResult` using a unique key and a patch. */
  updateSprintResult?: Maybe<UpdateSprintResultPayload>;
  /** Updates a single `SprintResult` using its globally unique id and a patch. */
  updateSprintResultByNodeId?: Maybe<UpdateSprintResultPayload>;
  /** Updates a single `Status` using a unique key and a patch. */
  updateStatus?: Maybe<UpdateStatusPayload>;
  /** Updates a single `Status` using its globally unique id and a patch. */
  updateStatusByNodeId?: Maybe<UpdateStatusPayload>;
  /** Updates a single `Team` using a unique key and a patch. */
  updateTeam?: Maybe<UpdateTeamPayload>;
  /** Updates a single `Team` using a unique key and a patch. */
  updateTeamByConstructorRef?: Maybe<UpdateTeamPayload>;
  /** Updates a single `Team` using its globally unique id and a patch. */
  updateTeamByNodeId?: Maybe<UpdateTeamPayload>;
  /** Updates a single `TeamColor` using a unique key and a patch. */
  updateTeamColor?: Maybe<UpdateTeamColorPayload>;
  /** Updates a single `TeamColor` using its globally unique id and a patch. */
  updateTeamColorByNodeId?: Maybe<UpdateTeamColorPayload>;
  /** Updates a single `TeamHistory` using a unique key and a patch. */
  updateTeamHistory?: Maybe<UpdateTeamHistoryPayload>;
  /** Updates a single `TeamHistory` using its globally unique id and a patch. */
  updateTeamHistoryByNodeId?: Maybe<UpdateTeamHistoryPayload>;
  /** Updates a single `TeamResult` using a unique key and a patch. */
  updateTeamResult?: Maybe<UpdateTeamResultPayload>;
  /** Updates a single `TeamResult` using its globally unique id and a patch. */
  updateTeamResultByNodeId?: Maybe<UpdateTeamResultPayload>;
  /** Updates a single `TeamStanding` using a unique key and a patch. */
  updateTeamStanding?: Maybe<UpdateTeamStandingPayload>;
  /** Updates a single `TeamStanding` using its globally unique id and a patch. */
  updateTeamStandingByNodeId?: Maybe<UpdateTeamStandingPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCircuitArgs = {
  input: CreateCircuitInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCircuitDescriptionArgs = {
  input: CreateCircuitDescriptionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateDriverArgs = {
  input: CreateDriverInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateDriverStandingArgs = {
  input: CreateDriverStandingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateLapTimeArgs = {
  input: CreateLapTimeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePitStopArgs = {
  input: CreatePitStopInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateQualifyingArgs = {
  input: CreateQualifyingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateRaceArgs = {
  input: CreateRaceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateResultArgs = {
  input: CreateResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSeasonArgs = {
  input: CreateSeasonInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSprintResultArgs = {
  input: CreateSprintResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateStatusArgs = {
  input: CreateStatusInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTeamArgs = {
  input: CreateTeamInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTeamColorArgs = {
  input: CreateTeamColorInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTeamHistoryArgs = {
  input: CreateTeamHistoryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTeamResultArgs = {
  input: CreateTeamResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTeamStandingArgs = {
  input: CreateTeamStandingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCircuitArgs = {
  input: DeleteCircuitInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCircuitByCircuitRefArgs = {
  input: DeleteCircuitByCircuitRefInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCircuitByNodeIdArgs = {
  input: DeleteCircuitByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCircuitByUrlArgs = {
  input: DeleteCircuitByUrlInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCircuitDescriptionArgs = {
  input: DeleteCircuitDescriptionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCircuitDescriptionByNodeIdArgs = {
  input: DeleteCircuitDescriptionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDriverArgs = {
  input: DeleteDriverInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDriverByDriverRefArgs = {
  input: DeleteDriverByDriverRefInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDriverByNodeIdArgs = {
  input: DeleteDriverByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDriverByUrlArgs = {
  input: DeleteDriverByUrlInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDriverStandingArgs = {
  input: DeleteDriverStandingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDriverStandingByNodeIdArgs = {
  input: DeleteDriverStandingByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteLapTimeArgs = {
  input: DeleteLapTimeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteLapTimeByNodeIdArgs = {
  input: DeleteLapTimeByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePitStopArgs = {
  input: DeletePitStopInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePitStopByNodeIdArgs = {
  input: DeletePitStopByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteQualifyingArgs = {
  input: DeleteQualifyingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteQualifyingByNodeIdArgs = {
  input: DeleteQualifyingByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRaceArgs = {
  input: DeleteRaceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRaceByNodeIdArgs = {
  input: DeleteRaceByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRaceByYearAndRoundArgs = {
  input: DeleteRaceByYearAndRoundInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteResultArgs = {
  input: DeleteResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteResultByNodeIdArgs = {
  input: DeleteResultByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonArgs = {
  input: DeleteSeasonInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonByNodeIdArgs = {
  input: DeleteSeasonByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonByUrlArgs = {
  input: DeleteSeasonByUrlInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSprintResultArgs = {
  input: DeleteSprintResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSprintResultByNodeIdArgs = {
  input: DeleteSprintResultByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteStatusArgs = {
  input: DeleteStatusInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteStatusByNodeIdArgs = {
  input: DeleteStatusByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTeamArgs = {
  input: DeleteTeamInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTeamByConstructorRefArgs = {
  input: DeleteTeamByConstructorRefInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTeamByNodeIdArgs = {
  input: DeleteTeamByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTeamColorArgs = {
  input: DeleteTeamColorInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTeamColorByNodeIdArgs = {
  input: DeleteTeamColorByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTeamHistoryArgs = {
  input: DeleteTeamHistoryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTeamHistoryByNodeIdArgs = {
  input: DeleteTeamHistoryByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTeamResultArgs = {
  input: DeleteTeamResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTeamResultByNodeIdArgs = {
  input: DeleteTeamResultByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTeamStandingArgs = {
  input: DeleteTeamStandingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTeamStandingByNodeIdArgs = {
  input: DeleteTeamStandingByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCircuitArgs = {
  input: UpdateCircuitInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCircuitByCircuitRefArgs = {
  input: UpdateCircuitByCircuitRefInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCircuitByNodeIdArgs = {
  input: UpdateCircuitByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCircuitByUrlArgs = {
  input: UpdateCircuitByUrlInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCircuitDescriptionArgs = {
  input: UpdateCircuitDescriptionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCircuitDescriptionByNodeIdArgs = {
  input: UpdateCircuitDescriptionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDriverArgs = {
  input: UpdateDriverInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDriverByDriverRefArgs = {
  input: UpdateDriverByDriverRefInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDriverByNodeIdArgs = {
  input: UpdateDriverByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDriverByUrlArgs = {
  input: UpdateDriverByUrlInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDriverStandingArgs = {
  input: UpdateDriverStandingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDriverStandingByNodeIdArgs = {
  input: UpdateDriverStandingByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateLapTimeArgs = {
  input: UpdateLapTimeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateLapTimeByNodeIdArgs = {
  input: UpdateLapTimeByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePitStopArgs = {
  input: UpdatePitStopInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePitStopByNodeIdArgs = {
  input: UpdatePitStopByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateQualifyingArgs = {
  input: UpdateQualifyingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateQualifyingByNodeIdArgs = {
  input: UpdateQualifyingByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRaceArgs = {
  input: UpdateRaceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRaceByNodeIdArgs = {
  input: UpdateRaceByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRaceByYearAndRoundArgs = {
  input: UpdateRaceByYearAndRoundInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateResultArgs = {
  input: UpdateResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateResultByNodeIdArgs = {
  input: UpdateResultByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonArgs = {
  input: UpdateSeasonInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonByNodeIdArgs = {
  input: UpdateSeasonByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonByUrlArgs = {
  input: UpdateSeasonByUrlInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSprintResultArgs = {
  input: UpdateSprintResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSprintResultByNodeIdArgs = {
  input: UpdateSprintResultByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateStatusArgs = {
  input: UpdateStatusInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateStatusByNodeIdArgs = {
  input: UpdateStatusByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTeamArgs = {
  input: UpdateTeamInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTeamByConstructorRefArgs = {
  input: UpdateTeamByConstructorRefInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTeamByNodeIdArgs = {
  input: UpdateTeamByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTeamColorArgs = {
  input: UpdateTeamColorInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTeamColorByNodeIdArgs = {
  input: UpdateTeamColorByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTeamHistoryArgs = {
  input: UpdateTeamHistoryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTeamHistoryByNodeIdArgs = {
  input: UpdateTeamHistoryByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTeamResultArgs = {
  input: UpdateTeamResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTeamResultByNodeIdArgs = {
  input: UpdateTeamResultByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTeamStandingArgs = {
  input: UpdateTeamStandingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTeamStandingByNodeIdArgs = {
  input: UpdateTeamStandingByNodeIdInput;
};

export type NextRaceBySeason = {
  __typename?: 'NextRaceBySeason';
  /** Reads a single `Race` that is related to this `NextRaceBySeason`. */
  race?: Maybe<Race>;
  raceId?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `Season` that is related to this `NextRaceBySeason`. */
  season?: Maybe<Season>;
  year?: Maybe<Scalars['Int']['output']>;
};

/**
 * A condition to be used against `NextRaceBySeason` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type NextRaceBySeasonCondition = {
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `year` field. */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `NextRaceBySeason` values. */
export type NextRaceBySeasonsConnection = {
  __typename?: 'NextRaceBySeasonsConnection';
  /** A list of edges which contains the `NextRaceBySeason` and cursor to aid in pagination. */
  edges: Array<NextRaceBySeasonsEdge>;
  /** A list of `NextRaceBySeason` objects. */
  nodes: Array<NextRaceBySeason>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `NextRaceBySeason` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `NextRaceBySeason` edge in the connection. */
export type NextRaceBySeasonsEdge = {
  __typename?: 'NextRaceBySeasonsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `NextRaceBySeason` at the end of the edge. */
  node: NextRaceBySeason;
};

/** Methods to use when ordering `NextRaceBySeason`. */
export enum NextRaceBySeasonsOrderBy {
  Natural = 'NATURAL',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC',
  YearAsc = 'YEAR_ASC',
  YearDesc = 'YEAR_DESC'
}

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']['output']>;
};

export type PitStop = Node & {
  __typename?: 'PitStop';
  /** Reads a single `Driver` that is related to this `PitStop`. */
  driver?: Maybe<Driver>;
  driverId: Scalars['Int']['output'];
  duration?: Maybe<Scalars['String']['output']>;
  lap?: Maybe<Scalars['Int']['output']>;
  milliseconds?: Maybe<Scalars['Int']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Race` that is related to this `PitStop`. */
  race?: Maybe<Race>;
  raceId: Scalars['Int']['output'];
  stop: Scalars['Int']['output'];
  time?: Maybe<Scalars['String']['output']>;
};

/** A condition to be used against `PitStop` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type PitStopCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `duration` field. */
  duration?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `lap` field. */
  lap?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `milliseconds` field. */
  milliseconds?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `stop` field. */
  stop?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `time` field. */
  time?: InputMaybe<Scalars['String']['input']>;
};

/** An input for mutations affecting `PitStop` */
export type PitStopInput = {
  driverId: Scalars['Int']['input'];
  duration?: InputMaybe<Scalars['String']['input']>;
  lap?: InputMaybe<Scalars['Int']['input']>;
  milliseconds?: InputMaybe<Scalars['Int']['input']>;
  raceId: Scalars['Int']['input'];
  stop: Scalars['Int']['input'];
  time?: InputMaybe<Scalars['String']['input']>;
};

/** Represents an update to a `PitStop`. Fields that are set will be updated. */
export type PitStopPatch = {
  driverId?: InputMaybe<Scalars['Int']['input']>;
  duration?: InputMaybe<Scalars['String']['input']>;
  lap?: InputMaybe<Scalars['Int']['input']>;
  milliseconds?: InputMaybe<Scalars['Int']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  stop?: InputMaybe<Scalars['Int']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `PitStop` values. */
export type PitStopsConnection = {
  __typename?: 'PitStopsConnection';
  /** A list of edges which contains the `PitStop` and cursor to aid in pagination. */
  edges: Array<PitStopsEdge>;
  /** A list of `PitStop` objects. */
  nodes: Array<PitStop>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PitStop` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `PitStop` edge in the connection. */
export type PitStopsEdge = {
  __typename?: 'PitStopsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `PitStop` at the end of the edge. */
  node: PitStop;
};

/** Methods to use when ordering `PitStop`. */
export enum PitStopsOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  DurationAsc = 'DURATION_ASC',
  DurationDesc = 'DURATION_DESC',
  LapAsc = 'LAP_ASC',
  LapDesc = 'LAP_DESC',
  MillisecondsAsc = 'MILLISECONDS_ASC',
  MillisecondsDesc = 'MILLISECONDS_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC',
  StopAsc = 'STOP_ASC',
  StopDesc = 'STOP_DESC',
  TimeAsc = 'TIME_ASC',
  TimeDesc = 'TIME_DESC'
}

export type Qualifying = Node & {
  __typename?: 'Qualifying';
  /** Reads a single `Driver` that is related to this `Qualifying`. */
  driver?: Maybe<Driver>;
  driverId?: Maybe<Scalars['Int']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  number?: Maybe<Scalars['Int']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  q1?: Maybe<Scalars['String']['output']>;
  q2?: Maybe<Scalars['String']['output']>;
  q3?: Maybe<Scalars['String']['output']>;
  qualifyId: Scalars['Int']['output'];
  /** Reads a single `Race` that is related to this `Qualifying`. */
  race?: Maybe<Race>;
  raceId?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `Team` that is related to this `Qualifying`. */
  team?: Maybe<Team>;
  teamId?: Maybe<Scalars['Int']['output']>;
};

/**
 * A condition to be used against `Qualifying` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type QualifyingCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `number` field. */
  number?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `position` field. */
  position?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `q1` field. */
  q1?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `q2` field. */
  q2?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `q3` field. */
  q3?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `qualifyId` field. */
  qualifyId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['Int']['input']>;
};

/** An input for mutations affecting `Qualifying` */
export type QualifyingInput = {
  driverId?: InputMaybe<Scalars['Int']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  q1?: InputMaybe<Scalars['String']['input']>;
  q2?: InputMaybe<Scalars['String']['input']>;
  q3?: InputMaybe<Scalars['String']['input']>;
  qualifyId: Scalars['Int']['input'];
  raceId?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['Int']['input']>;
};

/** Represents an update to a `Qualifying`. Fields that are set will be updated. */
export type QualifyingPatch = {
  driverId?: InputMaybe<Scalars['Int']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  q1?: InputMaybe<Scalars['String']['input']>;
  q2?: InputMaybe<Scalars['String']['input']>;
  q3?: InputMaybe<Scalars['String']['input']>;
  qualifyId?: InputMaybe<Scalars['Int']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `Qualifying` values. */
export type QualifyingsConnection = {
  __typename?: 'QualifyingsConnection';
  /** A list of edges which contains the `Qualifying` and cursor to aid in pagination. */
  edges: Array<QualifyingsEdge>;
  /** A list of `Qualifying` objects. */
  nodes: Array<Qualifying>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Qualifying` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Qualifying` edge in the connection. */
export type QualifyingsEdge = {
  __typename?: 'QualifyingsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Qualifying` at the end of the edge. */
  node: Qualifying;
};

/** Methods to use when ordering `Qualifying`. */
export enum QualifyingsOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  Natural = 'NATURAL',
  NumberAsc = 'NUMBER_ASC',
  NumberDesc = 'NUMBER_DESC',
  PositionAsc = 'POSITION_ASC',
  PositionDesc = 'POSITION_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  Q1Asc = 'Q1_ASC',
  Q1Desc = 'Q1_DESC',
  Q2Asc = 'Q2_ASC',
  Q2Desc = 'Q2_DESC',
  Q3Asc = 'Q3_ASC',
  Q3Desc = 'Q3_DESC',
  QualifyIdAsc = 'QUALIFY_ID_ASC',
  QualifyIdDesc = 'QUALIFY_ID_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC'
}

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  circuit?: Maybe<Circuit>;
  circuitByCircuitRef?: Maybe<Circuit>;
  /** Reads a single `Circuit` using its globally unique `ID`. */
  circuitByNodeId?: Maybe<Circuit>;
  circuitByUrl?: Maybe<Circuit>;
  circuitDescription?: Maybe<CircuitDescription>;
  /** Reads a single `CircuitDescription` using its globally unique `ID`. */
  circuitDescriptionByNodeId?: Maybe<CircuitDescription>;
  /** Reads a set of `CircuitDescription`. */
  circuitDescriptions?: Maybe<Array<CircuitDescription>>;
  /** Reads and enables pagination through a set of `CircuitDescription`. */
  circuitDescriptionsConnection?: Maybe<CircuitDescriptionsConnection>;
  /** Reads a set of `Circuit`. */
  circuits?: Maybe<Array<Circuit>>;
  /** Reads and enables pagination through a set of `Circuit`. */
  circuitsConnection?: Maybe<CircuitsConnection>;
  driver?: Maybe<Driver>;
  driverByDriverRef?: Maybe<Driver>;
  /** Reads a single `Driver` using its globally unique `ID`. */
  driverByNodeId?: Maybe<Driver>;
  driverByUrl?: Maybe<Driver>;
  driverCurrentTeamByDriverId?: Maybe<DriverCurrentTeam>;
  /** Reads a set of `DriverCurrentTeam`. */
  driverCurrentTeams?: Maybe<Array<DriverCurrentTeam>>;
  /** Reads and enables pagination through a set of `DriverCurrentTeam`. */
  driverCurrentTeamsConnection?: Maybe<DriverCurrentTeamsConnection>;
  driverStanding?: Maybe<DriverStanding>;
  /** Reads a single `DriverStanding` using its globally unique `ID`. */
  driverStandingByNodeId?: Maybe<DriverStanding>;
  /** Reads a set of `DriverStanding`. */
  driverStandings?: Maybe<Array<DriverStanding>>;
  /** Reads a set of `DriverStandingsBySeason`. */
  driverStandingsBySeasons?: Maybe<Array<DriverStandingsBySeason>>;
  /** Reads and enables pagination through a set of `DriverStandingsBySeason`. */
  driverStandingsBySeasonsConnection?: Maybe<DriverStandingsBySeasonsConnection>;
  /** Reads and enables pagination through a set of `DriverStanding`. */
  driverStandingsConnection?: Maybe<DriverStandingsConnection>;
  /** Reads a set of `DriverTeam`. */
  driverTeams?: Maybe<Array<DriverTeam>>;
  /** Reads and enables pagination through a set of `DriverTeam`. */
  driverTeamsConnection?: Maybe<DriverTeamsConnection>;
  /** Reads a set of `Driver`. */
  drivers?: Maybe<Array<Driver>>;
  /** Reads and enables pagination through a set of `Driver`. */
  driversConnection?: Maybe<DriversConnection>;
  /** Reads a set of `FinalTeamStandingsByYear`. */
  finalTeamStandingsByYears?: Maybe<Array<FinalTeamStandingsByYear>>;
  /** Reads and enables pagination through a set of `FinalTeamStandingsByYear`. */
  finalTeamStandingsByYearsConnection?: Maybe<FinalTeamStandingsByYearsConnection>;
  lapTime?: Maybe<LapTime>;
  /** Reads a single `LapTime` using its globally unique `ID`. */
  lapTimeByNodeId?: Maybe<LapTime>;
  /** Reads a set of `LapTime`. */
  lapTimes?: Maybe<Array<LapTime>>;
  /** Reads and enables pagination through a set of `LapTime`. */
  lapTimesConnection?: Maybe<LapTimesConnection>;
  /** Reads a set of `LapTimesWithStart`. */
  lapTimesWithStarts?: Maybe<Array<LapTimesWithStart>>;
  /** Reads and enables pagination through a set of `LapTimesWithStart`. */
  lapTimesWithStartsConnection?: Maybe<LapTimesWithStartsConnection>;
  nextRaceBySeasonByRaceId?: Maybe<NextRaceBySeason>;
  nextRaceBySeasonByYear?: Maybe<NextRaceBySeason>;
  /** Reads a set of `NextRaceBySeason`. */
  nextRaceBySeasons?: Maybe<Array<NextRaceBySeason>>;
  /** Reads and enables pagination through a set of `NextRaceBySeason`. */
  nextRaceBySeasonsConnection?: Maybe<NextRaceBySeasonsConnection>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID']['output'];
  pitStop?: Maybe<PitStop>;
  /** Reads a single `PitStop` using its globally unique `ID`. */
  pitStopByNodeId?: Maybe<PitStop>;
  /** Reads a set of `PitStop`. */
  pitStops?: Maybe<Array<PitStop>>;
  /** Reads and enables pagination through a set of `PitStop`. */
  pitStopsConnection?: Maybe<PitStopsConnection>;
  qualifying?: Maybe<Qualifying>;
  /** Reads a single `Qualifying` using its globally unique `ID`. */
  qualifyingByNodeId?: Maybe<Qualifying>;
  /** Reads a set of `Qualifying`. */
  qualifyings?: Maybe<Array<Qualifying>>;
  /** Reads and enables pagination through a set of `Qualifying`. */
  qualifyingsConnection?: Maybe<QualifyingsConnection>;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  race?: Maybe<Race>;
  /** Reads a single `Race` using its globally unique `ID`. */
  raceByNodeId?: Maybe<Race>;
  raceByYearAndRound?: Maybe<Race>;
  /** Reads a set of `Race`. */
  races?: Maybe<Array<Race>>;
  /** Reads and enables pagination through a set of `Race`. */
  racesConnection?: Maybe<RacesConnection>;
  result?: Maybe<Result>;
  /** Reads a single `Result` using its globally unique `ID`. */
  resultByNodeId?: Maybe<Result>;
  /** Reads a set of `Result`. */
  results?: Maybe<Array<Result>>;
  /** Reads and enables pagination through a set of `Result`. */
  resultsConnection?: Maybe<ResultsConnection>;
  season?: Maybe<Season>;
  /** Reads a single `Season` using its globally unique `ID`. */
  seasonByNodeId?: Maybe<Season>;
  seasonByUrl?: Maybe<Season>;
  /** Reads a set of `Season`. */
  seasons?: Maybe<Array<Season>>;
  /** Reads and enables pagination through a set of `Season`. */
  seasonsConnection?: Maybe<SeasonsConnection>;
  sprintResult?: Maybe<SprintResult>;
  /** Reads a single `SprintResult` using its globally unique `ID`. */
  sprintResultByNodeId?: Maybe<SprintResult>;
  /** Reads a set of `SprintResult`. */
  sprintResults?: Maybe<Array<SprintResult>>;
  /** Reads and enables pagination through a set of `SprintResult`. */
  sprintResultsConnection?: Maybe<SprintResultsConnection>;
  status?: Maybe<Status>;
  /** Reads a single `Status` using its globally unique `ID`. */
  statusByNodeId?: Maybe<Status>;
  /** Reads a set of `Status`. */
  statuses?: Maybe<Array<Status>>;
  /** Reads and enables pagination through a set of `Status`. */
  statusesConnection?: Maybe<StatusesConnection>;
  team?: Maybe<Team>;
  teamByConstructorRef?: Maybe<Team>;
  /** Reads a single `Team` using its globally unique `ID`. */
  teamByNodeId?: Maybe<Team>;
  teamColor?: Maybe<TeamColor>;
  /** Reads a single `TeamColor` using its globally unique `ID`. */
  teamColorByNodeId?: Maybe<TeamColor>;
  /** Reads a set of `TeamColor`. */
  teamColors?: Maybe<Array<TeamColor>>;
  /** Reads and enables pagination through a set of `TeamColor`. */
  teamColorsConnection?: Maybe<TeamColorsConnection>;
  /** Reads a set of `TeamHistory`. */
  teamHistories?: Maybe<Array<TeamHistory>>;
  /** Reads and enables pagination through a set of `TeamHistory`. */
  teamHistoriesConnection?: Maybe<TeamHistoriesConnection>;
  teamHistory?: Maybe<TeamHistory>;
  /** Reads a single `TeamHistory` using its globally unique `ID`. */
  teamHistoryByNodeId?: Maybe<TeamHistory>;
  teamResult?: Maybe<TeamResult>;
  /** Reads a single `TeamResult` using its globally unique `ID`. */
  teamResultByNodeId?: Maybe<TeamResult>;
  /** Reads a set of `TeamResult`. */
  teamResults?: Maybe<Array<TeamResult>>;
  /** Reads and enables pagination through a set of `TeamResult`. */
  teamResultsConnection?: Maybe<TeamResultsConnection>;
  teamStanding?: Maybe<TeamStanding>;
  /** Reads a single `TeamStanding` using its globally unique `ID`. */
  teamStandingByNodeId?: Maybe<TeamStanding>;
  /** Reads a set of `TeamStanding`. */
  teamStandings?: Maybe<Array<TeamStanding>>;
  /** Reads and enables pagination through a set of `TeamStanding`. */
  teamStandingsConnection?: Maybe<TeamStandingsConnection>;
  /** Reads a set of `Team`. */
  teams?: Maybe<Array<Team>>;
  /** Reads and enables pagination through a set of `Team`. */
  teamsConnection?: Maybe<TeamsConnection>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCircuitArgs = {
  circuitId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCircuitByCircuitRefArgs = {
  circuitRef: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCircuitByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCircuitByUrlArgs = {
  url: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCircuitDescriptionArgs = {
  circuitId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCircuitDescriptionByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCircuitDescriptionsArgs = {
  condition?: InputMaybe<CircuitDescriptionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CircuitDescriptionsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCircuitDescriptionsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CircuitDescriptionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CircuitDescriptionsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCircuitsArgs = {
  condition?: InputMaybe<CircuitCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CircuitsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCircuitsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CircuitCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CircuitsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryDriverArgs = {
  driverId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDriverByDriverRefArgs = {
  driverRef: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDriverByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDriverByUrlArgs = {
  url: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDriverCurrentTeamByDriverIdArgs = {
  driverId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDriverCurrentTeamsArgs = {
  condition?: InputMaybe<DriverCurrentTeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverCurrentTeamsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryDriverCurrentTeamsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DriverCurrentTeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverCurrentTeamsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryDriverStandingArgs = {
  driverStandingsId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDriverStandingByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDriverStandingsArgs = {
  condition?: InputMaybe<DriverStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverStandingsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryDriverStandingsBySeasonsArgs = {
  condition?: InputMaybe<DriverStandingsBySeasonCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverStandingsBySeasonsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryDriverStandingsBySeasonsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DriverStandingsBySeasonCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverStandingsBySeasonsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryDriverStandingsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DriverStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverStandingsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryDriverTeamsArgs = {
  condition?: InputMaybe<DriverTeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverTeamsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryDriverTeamsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DriverTeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverTeamsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryDriversArgs = {
  condition?: InputMaybe<DriverCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriversOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryDriversConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DriverCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriversOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryFinalTeamStandingsByYearsArgs = {
  condition?: InputMaybe<FinalTeamStandingsByYearCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FinalTeamStandingsByYearsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryFinalTeamStandingsByYearsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<FinalTeamStandingsByYearCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FinalTeamStandingsByYearsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryLapTimeArgs = {
  driverId: Scalars['Int']['input'];
  lap: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryLapTimeByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryLapTimesArgs = {
  condition?: InputMaybe<LapTimeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LapTimesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryLapTimesConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<LapTimeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LapTimesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryLapTimesWithStartsArgs = {
  condition?: InputMaybe<LapTimesWithStartCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LapTimesWithStartsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryLapTimesWithStartsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<LapTimesWithStartCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LapTimesWithStartsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNextRaceBySeasonByRaceIdArgs = {
  raceId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryNextRaceBySeasonByYearArgs = {
  year: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryNextRaceBySeasonsArgs = {
  condition?: InputMaybe<NextRaceBySeasonCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<NextRaceBySeasonsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNextRaceBySeasonsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<NextRaceBySeasonCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<NextRaceBySeasonsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPitStopArgs = {
  driverId: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
  stop: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPitStopByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPitStopsArgs = {
  condition?: InputMaybe<PitStopCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PitStopsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPitStopsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PitStopCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PitStopsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryQualifyingArgs = {
  qualifyId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryQualifyingByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryQualifyingsArgs = {
  condition?: InputMaybe<QualifyingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<QualifyingsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryQualifyingsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<QualifyingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<QualifyingsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryRaceArgs = {
  raceId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRaceByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRaceByYearAndRoundArgs = {
  round: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRacesArgs = {
  condition?: InputMaybe<RaceCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RacesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryRacesConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RaceCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RacesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryResultArgs = {
  resultId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryResultByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryResultsArgs = {
  condition?: InputMaybe<ResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ResultsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryResultsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ResultsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonArgs = {
  year: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonByUrlArgs = {
  url: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonsArgs = {
  condition?: InputMaybe<SeasonCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySprintResultArgs = {
  sprintResultId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySprintResultByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySprintResultsArgs = {
  condition?: InputMaybe<SprintResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintResultsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySprintResultsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SprintResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintResultsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryStatusArgs = {
  statusId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryStatusByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryStatusesArgs = {
  condition?: InputMaybe<StatusCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StatusesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryStatusesConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<StatusCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StatusesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTeamArgs = {
  teamId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTeamByConstructorRefArgs = {
  constructorRef: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTeamByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTeamColorArgs = {
  teamId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTeamColorByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTeamColorsArgs = {
  condition?: InputMaybe<TeamColorCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamColorsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTeamColorsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TeamColorCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamColorsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTeamHistoriesArgs = {
  condition?: InputMaybe<TeamHistoryCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamHistoriesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTeamHistoriesConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TeamHistoryCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamHistoriesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTeamHistoryArgs = {
  antecedentTeamId: Scalars['Int']['input'];
  startYear: Scalars['Int']['input'];
  teamId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTeamHistoryByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTeamResultArgs = {
  constructorResultsId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTeamResultByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTeamResultsArgs = {
  condition?: InputMaybe<TeamResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamResultsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTeamResultsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TeamResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamResultsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTeamStandingArgs = {
  constructorStandingsId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTeamStandingByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTeamStandingsArgs = {
  condition?: InputMaybe<TeamStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamStandingsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTeamStandingsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TeamStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamStandingsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTeamsArgs = {
  condition?: InputMaybe<TeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTeamsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamsOrderBy>>;
};

export type Race = Node & {
  __typename?: 'Race';
  /** Reads a single `Circuit` that is related to this `Race`. */
  circuit?: Maybe<Circuit>;
  circuitId?: Maybe<Scalars['Int']['output']>;
  date?: Maybe<Scalars['Date']['output']>;
  /** Reads and enables pagination through a set of `DriverStanding`. */
  driverStandings: Array<DriverStanding>;
  /** Reads and enables pagination through a set of `DriverStandingsBySeason`. */
  driverStandingsBySeasons: Array<DriverStandingsBySeason>;
  /** Reads and enables pagination through a set of `DriverStandingsBySeason`. */
  driverStandingsBySeasonsConnection: DriverStandingsBySeasonsConnection;
  /** Reads and enables pagination through a set of `DriverStanding`. */
  driverStandingsConnection: DriverStandingsConnection;
  /** Reads and enables pagination through a set of `FinalTeamStandingsByYear`. */
  finalTeamStandingsByYears: Array<FinalTeamStandingsByYear>;
  /** Reads and enables pagination through a set of `FinalTeamStandingsByYear`. */
  finalTeamStandingsByYearsConnection: FinalTeamStandingsByYearsConnection;
  fp1Date?: Maybe<Scalars['Date']['output']>;
  fp1Time?: Maybe<Scalars['String']['output']>;
  fp2Date?: Maybe<Scalars['Date']['output']>;
  fp2Time?: Maybe<Scalars['String']['output']>;
  fp3Date?: Maybe<Scalars['Date']['output']>;
  fp3Time?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `LapTime`. */
  lapTimes: Array<LapTime>;
  /** Reads and enables pagination through a set of `LapTime`. */
  lapTimesConnection: LapTimesConnection;
  /** Reads and enables pagination through a set of `LapTimesWithStart`. */
  lapTimesWithStarts: Array<LapTimesWithStart>;
  /** Reads and enables pagination through a set of `LapTimesWithStart`. */
  lapTimesWithStartsConnection: LapTimesWithStartsConnection;
  name?: Maybe<Scalars['String']['output']>;
  /** Reads a single `NextRaceBySeason` that is related to this `Race`. */
  nextRaceBySeason?: Maybe<NextRaceBySeason>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `PitStop`. */
  pitStops: Array<PitStop>;
  /** Reads and enables pagination through a set of `PitStop`. */
  pitStopsConnection: PitStopsConnection;
  qualiDate?: Maybe<Scalars['Date']['output']>;
  qualiTime?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `Qualifying`. */
  qualifyings: Array<Qualifying>;
  /** Reads and enables pagination through a set of `Qualifying`. */
  qualifyingsConnection: QualifyingsConnection;
  raceId: Scalars['Int']['output'];
  /** Reads and enables pagination through a set of `Result`. */
  results: Array<Result>;
  /** Reads and enables pagination through a set of `Result`. */
  resultsConnection: ResultsConnection;
  round?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `Season` that is related to this `Race`. */
  seasonByYear?: Maybe<Season>;
  sprintDate?: Maybe<Scalars['Date']['output']>;
  /** Reads and enables pagination through a set of `SprintResult`. */
  sprintResults: Array<SprintResult>;
  /** Reads and enables pagination through a set of `SprintResult`. */
  sprintResultsConnection: SprintResultsConnection;
  sprintTime?: Maybe<Scalars['String']['output']>;
  summary?: Maybe<RaceSummary>;
  /** Reads and enables pagination through a set of `TeamResult`. */
  teamResults: Array<TeamResult>;
  /** Reads and enables pagination through a set of `TeamResult`. */
  teamResultsConnection: TeamResultsConnection;
  /** Reads and enables pagination through a set of `TeamStanding`. */
  teamStandings: Array<TeamStanding>;
  /** Reads and enables pagination through a set of `TeamStanding`. */
  teamStandingsConnection: TeamStandingsConnection;
  time?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};


export type RaceDriverStandingsArgs = {
  condition?: InputMaybe<DriverStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverStandingsOrderBy>>;
};


export type RaceDriverStandingsBySeasonsArgs = {
  condition?: InputMaybe<DriverStandingsBySeasonCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverStandingsBySeasonsOrderBy>>;
};


export type RaceDriverStandingsBySeasonsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DriverStandingsBySeasonCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverStandingsBySeasonsOrderBy>>;
};


export type RaceDriverStandingsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DriverStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverStandingsOrderBy>>;
};


export type RaceFinalTeamStandingsByYearsArgs = {
  condition?: InputMaybe<FinalTeamStandingsByYearCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FinalTeamStandingsByYearsOrderBy>>;
};


export type RaceFinalTeamStandingsByYearsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<FinalTeamStandingsByYearCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FinalTeamStandingsByYearsOrderBy>>;
};


export type RaceLapTimesArgs = {
  condition?: InputMaybe<LapTimeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LapTimesOrderBy>>;
};


export type RaceLapTimesConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<LapTimeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LapTimesOrderBy>>;
};


export type RaceLapTimesWithStartsArgs = {
  condition?: InputMaybe<LapTimesWithStartCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LapTimesWithStartsOrderBy>>;
};


export type RaceLapTimesWithStartsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<LapTimesWithStartCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LapTimesWithStartsOrderBy>>;
};


export type RacePitStopsArgs = {
  condition?: InputMaybe<PitStopCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PitStopsOrderBy>>;
};


export type RacePitStopsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PitStopCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PitStopsOrderBy>>;
};


export type RaceQualifyingsArgs = {
  condition?: InputMaybe<QualifyingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<QualifyingsOrderBy>>;
};


export type RaceQualifyingsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<QualifyingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<QualifyingsOrderBy>>;
};


export type RaceResultsArgs = {
  condition?: InputMaybe<ResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ResultsOrderBy>>;
};


export type RaceResultsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ResultsOrderBy>>;
};


export type RaceSprintResultsArgs = {
  condition?: InputMaybe<SprintResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintResultsOrderBy>>;
};


export type RaceSprintResultsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SprintResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintResultsOrderBy>>;
};


export type RaceTeamResultsArgs = {
  condition?: InputMaybe<TeamResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamResultsOrderBy>>;
};


export type RaceTeamResultsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TeamResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamResultsOrderBy>>;
};


export type RaceTeamStandingsArgs = {
  condition?: InputMaybe<TeamStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamStandingsOrderBy>>;
};


export type RaceTeamStandingsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TeamStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamStandingsOrderBy>>;
};

/** A condition to be used against `Race` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type RaceCondition = {
  /** Checks for equality with the object’s `circuitId` field. */
  circuitId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `date` field. */
  date?: InputMaybe<Scalars['Date']['input']>;
  /** Checks for equality with the object’s `fp1Date` field. */
  fp1Date?: InputMaybe<Scalars['Date']['input']>;
  /** Checks for equality with the object’s `fp1Time` field. */
  fp1Time?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `fp2Date` field. */
  fp2Date?: InputMaybe<Scalars['Date']['input']>;
  /** Checks for equality with the object’s `fp2Time` field. */
  fp2Time?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `fp3Date` field. */
  fp3Date?: InputMaybe<Scalars['Date']['input']>;
  /** Checks for equality with the object’s `fp3Time` field. */
  fp3Time?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `qualiDate` field. */
  qualiDate?: InputMaybe<Scalars['Date']['input']>;
  /** Checks for equality with the object’s `qualiTime` field. */
  qualiTime?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `round` field. */
  round?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `sprintDate` field. */
  sprintDate?: InputMaybe<Scalars['Date']['input']>;
  /** Checks for equality with the object’s `sprintTime` field. */
  sprintTime?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `time` field. */
  time?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `url` field. */
  url?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `year` field. */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** An input for mutations affecting `Race` */
export type RaceInput = {
  circuitId?: InputMaybe<Scalars['Int']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  fp1Date?: InputMaybe<Scalars['Date']['input']>;
  fp1Time?: InputMaybe<Scalars['String']['input']>;
  fp2Date?: InputMaybe<Scalars['Date']['input']>;
  fp2Time?: InputMaybe<Scalars['String']['input']>;
  fp3Date?: InputMaybe<Scalars['Date']['input']>;
  fp3Time?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  qualiDate?: InputMaybe<Scalars['Date']['input']>;
  qualiTime?: InputMaybe<Scalars['String']['input']>;
  raceId: Scalars['Int']['input'];
  round?: InputMaybe<Scalars['Int']['input']>;
  sprintDate?: InputMaybe<Scalars['Date']['input']>;
  sprintTime?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** Represents an update to a `Race`. Fields that are set will be updated. */
export type RacePatch = {
  circuitId?: InputMaybe<Scalars['Int']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  fp1Date?: InputMaybe<Scalars['Date']['input']>;
  fp1Time?: InputMaybe<Scalars['String']['input']>;
  fp2Date?: InputMaybe<Scalars['Date']['input']>;
  fp2Time?: InputMaybe<Scalars['String']['input']>;
  fp3Date?: InputMaybe<Scalars['Date']['input']>;
  fp3Time?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  qualiDate?: InputMaybe<Scalars['Date']['input']>;
  qualiTime?: InputMaybe<Scalars['String']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  round?: InputMaybe<Scalars['Int']['input']>;
  sprintDate?: InputMaybe<Scalars['Date']['input']>;
  sprintTime?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type RaceSummary = {
  __typename?: 'RaceSummary';
  description?: Maybe<Scalars['String']['output']>;
  extract?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** A connection to a list of `Race` values. */
export type RacesConnection = {
  __typename?: 'RacesConnection';
  /** A list of edges which contains the `Race` and cursor to aid in pagination. */
  edges: Array<RacesEdge>;
  /** A list of `Race` objects. */
  nodes: Array<Race>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Race` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Race` edge in the connection. */
export type RacesEdge = {
  __typename?: 'RacesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Race` at the end of the edge. */
  node: Race;
};

/** Methods to use when ordering `Race`. */
export enum RacesOrderBy {
  CircuitIdAsc = 'CIRCUIT_ID_ASC',
  CircuitIdDesc = 'CIRCUIT_ID_DESC',
  DateAsc = 'DATE_ASC',
  DateDesc = 'DATE_DESC',
  Fp1DateAsc = 'FP1_DATE_ASC',
  Fp1DateDesc = 'FP1_DATE_DESC',
  Fp1TimeAsc = 'FP1_TIME_ASC',
  Fp1TimeDesc = 'FP1_TIME_DESC',
  Fp2DateAsc = 'FP2_DATE_ASC',
  Fp2DateDesc = 'FP2_DATE_DESC',
  Fp2TimeAsc = 'FP2_TIME_ASC',
  Fp2TimeDesc = 'FP2_TIME_DESC',
  Fp3DateAsc = 'FP3_DATE_ASC',
  Fp3DateDesc = 'FP3_DATE_DESC',
  Fp3TimeAsc = 'FP3_TIME_ASC',
  Fp3TimeDesc = 'FP3_TIME_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  QualiDateAsc = 'QUALI_DATE_ASC',
  QualiDateDesc = 'QUALI_DATE_DESC',
  QualiTimeAsc = 'QUALI_TIME_ASC',
  QualiTimeDesc = 'QUALI_TIME_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC',
  RoundAsc = 'ROUND_ASC',
  RoundDesc = 'ROUND_DESC',
  SprintDateAsc = 'SPRINT_DATE_ASC',
  SprintDateDesc = 'SPRINT_DATE_DESC',
  SprintTimeAsc = 'SPRINT_TIME_ASC',
  SprintTimeDesc = 'SPRINT_TIME_DESC',
  TimeAsc = 'TIME_ASC',
  TimeDesc = 'TIME_DESC',
  UrlAsc = 'URL_ASC',
  UrlDesc = 'URL_DESC',
  YearAsc = 'YEAR_ASC',
  YearDesc = 'YEAR_DESC'
}

export type Result = Node & {
  __typename?: 'Result';
  /** Reads a single `Driver` that is related to this `Result`. */
  driver?: Maybe<Driver>;
  driverId?: Maybe<Scalars['Int']['output']>;
  fastestLap?: Maybe<Scalars['Int']['output']>;
  fastestLapSpeed?: Maybe<Scalars['String']['output']>;
  fastestLapTime?: Maybe<Scalars['String']['output']>;
  grid?: Maybe<Scalars['Int']['output']>;
  laps?: Maybe<Scalars['Int']['output']>;
  milliseconds?: Maybe<Scalars['Int']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  number?: Maybe<Scalars['Int']['output']>;
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  positionOrder?: Maybe<Scalars['Int']['output']>;
  positionText?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Race` that is related to this `Result`. */
  race?: Maybe<Race>;
  raceId?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  resultId: Scalars['Int']['output'];
  /** Reads a single `Status` that is related to this `Result`. */
  status?: Maybe<Status>;
  statusId?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `Team` that is related to this `Result`. */
  team?: Maybe<Team>;
  teamId?: Maybe<Scalars['Int']['output']>;
  time?: Maybe<Scalars['String']['output']>;
};

/** A condition to be used against `Result` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ResultCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `fastestLap` field. */
  fastestLap?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `fastestLapSpeed` field. */
  fastestLapSpeed?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `fastestLapTime` field. */
  fastestLapTime?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `grid` field. */
  grid?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `laps` field. */
  laps?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `milliseconds` field. */
  milliseconds?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `number` field. */
  number?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `points` field. */
  points?: InputMaybe<Scalars['Float']['input']>;
  /** Checks for equality with the object’s `position` field. */
  position?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionOrder` field. */
  positionOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionText` field. */
  positionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `rank` field. */
  rank?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `resultId` field. */
  resultId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `statusId` field. */
  statusId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `time` field. */
  time?: InputMaybe<Scalars['String']['input']>;
  /** Filters results by year */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** An input for mutations affecting `Result` */
export type ResultInput = {
  driverId?: InputMaybe<Scalars['Int']['input']>;
  fastestLap?: InputMaybe<Scalars['Int']['input']>;
  fastestLapSpeed?: InputMaybe<Scalars['String']['input']>;
  fastestLapTime?: InputMaybe<Scalars['String']['input']>;
  grid?: InputMaybe<Scalars['Int']['input']>;
  laps?: InputMaybe<Scalars['Int']['input']>;
  milliseconds?: InputMaybe<Scalars['Int']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  points?: InputMaybe<Scalars['Float']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  positionOrder?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  resultId: Scalars['Int']['input'];
  statusId?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['Int']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
};

/** Represents an update to a `Result`. Fields that are set will be updated. */
export type ResultPatch = {
  driverId?: InputMaybe<Scalars['Int']['input']>;
  fastestLap?: InputMaybe<Scalars['Int']['input']>;
  fastestLapSpeed?: InputMaybe<Scalars['String']['input']>;
  fastestLapTime?: InputMaybe<Scalars['String']['input']>;
  grid?: InputMaybe<Scalars['Int']['input']>;
  laps?: InputMaybe<Scalars['Int']['input']>;
  milliseconds?: InputMaybe<Scalars['Int']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  points?: InputMaybe<Scalars['Float']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  positionOrder?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  resultId?: InputMaybe<Scalars['Int']['input']>;
  statusId?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['Int']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `Result` values. */
export type ResultsConnection = {
  __typename?: 'ResultsConnection';
  /** A list of edges which contains the `Result` and cursor to aid in pagination. */
  edges: Array<ResultsEdge>;
  /** A list of `Result` objects. */
  nodes: Array<Result>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Result` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Result` edge in the connection. */
export type ResultsEdge = {
  __typename?: 'ResultsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Result` at the end of the edge. */
  node: Result;
};

/** Methods to use when ordering `Result`. */
export enum ResultsOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  FastestLapAsc = 'FASTEST_LAP_ASC',
  FastestLapDesc = 'FASTEST_LAP_DESC',
  FastestLapSpeedAsc = 'FASTEST_LAP_SPEED_ASC',
  FastestLapSpeedDesc = 'FASTEST_LAP_SPEED_DESC',
  FastestLapTimeAsc = 'FASTEST_LAP_TIME_ASC',
  FastestLapTimeDesc = 'FASTEST_LAP_TIME_DESC',
  GridAsc = 'GRID_ASC',
  GridDesc = 'GRID_DESC',
  LapsAsc = 'LAPS_ASC',
  LapsDesc = 'LAPS_DESC',
  MillisecondsAsc = 'MILLISECONDS_ASC',
  MillisecondsDesc = 'MILLISECONDS_DESC',
  Natural = 'NATURAL',
  NumberAsc = 'NUMBER_ASC',
  NumberDesc = 'NUMBER_DESC',
  PointsAsc = 'POINTS_ASC',
  PointsDesc = 'POINTS_DESC',
  PositionAsc = 'POSITION_ASC',
  PositionDesc = 'POSITION_DESC',
  PositionOrderAsc = 'POSITION_ORDER_ASC',
  PositionOrderDesc = 'POSITION_ORDER_DESC',
  PositionTextAsc = 'POSITION_TEXT_ASC',
  PositionTextDesc = 'POSITION_TEXT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC',
  RankAsc = 'RANK_ASC',
  RankDesc = 'RANK_DESC',
  ResultIdAsc = 'RESULT_ID_ASC',
  ResultIdDesc = 'RESULT_ID_DESC',
  StatusIdAsc = 'STATUS_ID_ASC',
  StatusIdDesc = 'STATUS_ID_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  TimeAsc = 'TIME_ASC',
  TimeDesc = 'TIME_DESC'
}

export type Season = Node & {
  __typename?: 'Season';
  /** Reads and enables pagination through a set of `DriverTeam`. */
  driverTeams: Array<DriverTeam>;
  /** Reads and enables pagination through a set of `DriverTeam`. */
  driverTeamsConnection: DriverTeamsConnection;
  ended?: Maybe<Scalars['Boolean']['output']>;
  hasResults?: Maybe<Scalars['Boolean']['output']>;
  /** Reads a single `NextRaceBySeason` that is related to this `Season`. */
  nextRace?: Maybe<NextRaceBySeason>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `Race`. */
  racesByYear: Array<Race>;
  /** Reads and enables pagination through a set of `Race`. */
  racesByYearConnection: RacesConnection;
  url?: Maybe<Scalars['String']['output']>;
  year: Scalars['Int']['output'];
};


export type SeasonDriverTeamsArgs = {
  condition?: InputMaybe<DriverTeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverTeamsOrderBy>>;
};


export type SeasonDriverTeamsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DriverTeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverTeamsOrderBy>>;
};


export type SeasonRacesByYearArgs = {
  condition?: InputMaybe<RaceCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RacesOrderBy>>;
};


export type SeasonRacesByYearConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RaceCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RacesOrderBy>>;
};

/** A condition to be used against `Season` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type SeasonCondition = {
  /** Filters seasons by 'ended' */
  ended?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filters seasons by 'hasResults' */
  hasResults?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `url` field. */
  url?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `year` field. */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** An input for mutations affecting `Season` */
export type SeasonInput = {
  url?: InputMaybe<Scalars['String']['input']>;
  year: Scalars['Int']['input'];
};

/** Represents an update to a `Season`. Fields that are set will be updated. */
export type SeasonPatch = {
  url?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `Season` values. */
export type SeasonsConnection = {
  __typename?: 'SeasonsConnection';
  /** A list of edges which contains the `Season` and cursor to aid in pagination. */
  edges: Array<SeasonsEdge>;
  /** A list of `Season` objects. */
  nodes: Array<Season>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Season` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Season` edge in the connection. */
export type SeasonsEdge = {
  __typename?: 'SeasonsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Season` at the end of the edge. */
  node: Season;
};

/** Methods to use when ordering `Season`. */
export enum SeasonsOrderBy {
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UrlAsc = 'URL_ASC',
  UrlDesc = 'URL_DESC',
  YearAsc = 'YEAR_ASC',
  YearDesc = 'YEAR_DESC'
}

export type SprintResult = Node & {
  __typename?: 'SprintResult';
  /** Reads a single `Driver` that is related to this `SprintResult`. */
  driver?: Maybe<Driver>;
  driverId?: Maybe<Scalars['Int']['output']>;
  fastestLap?: Maybe<Scalars['Int']['output']>;
  fastestLapTime?: Maybe<Scalars['String']['output']>;
  grid?: Maybe<Scalars['Int']['output']>;
  laps?: Maybe<Scalars['Int']['output']>;
  milliseconds?: Maybe<Scalars['Int']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  number?: Maybe<Scalars['Int']['output']>;
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  positionOrder?: Maybe<Scalars['Int']['output']>;
  positionText?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Race` that is related to this `SprintResult`. */
  race?: Maybe<Race>;
  raceId?: Maybe<Scalars['Int']['output']>;
  sprintResultId: Scalars['Int']['output'];
  /** Reads a single `Status` that is related to this `SprintResult`. */
  status?: Maybe<Status>;
  statusId?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `Team` that is related to this `SprintResult`. */
  team?: Maybe<Team>;
  teamId?: Maybe<Scalars['Int']['output']>;
  time?: Maybe<Scalars['String']['output']>;
};

/**
 * A condition to be used against `SprintResult` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type SprintResultCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `fastestLap` field. */
  fastestLap?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `fastestLapTime` field. */
  fastestLapTime?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `grid` field. */
  grid?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `laps` field. */
  laps?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `milliseconds` field. */
  milliseconds?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `number` field. */
  number?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `points` field. */
  points?: InputMaybe<Scalars['Float']['input']>;
  /** Checks for equality with the object’s `position` field. */
  position?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionOrder` field. */
  positionOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionText` field. */
  positionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `sprintResultId` field. */
  sprintResultId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `statusId` field. */
  statusId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `time` field. */
  time?: InputMaybe<Scalars['String']['input']>;
  /** Filters sprintResults by year */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** An input for mutations affecting `SprintResult` */
export type SprintResultInput = {
  driverId?: InputMaybe<Scalars['Int']['input']>;
  fastestLap?: InputMaybe<Scalars['Int']['input']>;
  fastestLapTime?: InputMaybe<Scalars['String']['input']>;
  grid?: InputMaybe<Scalars['Int']['input']>;
  laps?: InputMaybe<Scalars['Int']['input']>;
  milliseconds?: InputMaybe<Scalars['Int']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  points?: InputMaybe<Scalars['Float']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  positionOrder?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  sprintResultId: Scalars['Int']['input'];
  statusId?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['Int']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
};

/** Represents an update to a `SprintResult`. Fields that are set will be updated. */
export type SprintResultPatch = {
  driverId?: InputMaybe<Scalars['Int']['input']>;
  fastestLap?: InputMaybe<Scalars['Int']['input']>;
  fastestLapTime?: InputMaybe<Scalars['String']['input']>;
  grid?: InputMaybe<Scalars['Int']['input']>;
  laps?: InputMaybe<Scalars['Int']['input']>;
  milliseconds?: InputMaybe<Scalars['Int']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  points?: InputMaybe<Scalars['Float']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  positionOrder?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  sprintResultId?: InputMaybe<Scalars['Int']['input']>;
  statusId?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['Int']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `SprintResult` values. */
export type SprintResultsConnection = {
  __typename?: 'SprintResultsConnection';
  /** A list of edges which contains the `SprintResult` and cursor to aid in pagination. */
  edges: Array<SprintResultsEdge>;
  /** A list of `SprintResult` objects. */
  nodes: Array<SprintResult>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SprintResult` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `SprintResult` edge in the connection. */
export type SprintResultsEdge = {
  __typename?: 'SprintResultsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `SprintResult` at the end of the edge. */
  node: SprintResult;
};

/** Methods to use when ordering `SprintResult`. */
export enum SprintResultsOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  FastestLapAsc = 'FASTEST_LAP_ASC',
  FastestLapDesc = 'FASTEST_LAP_DESC',
  FastestLapTimeAsc = 'FASTEST_LAP_TIME_ASC',
  FastestLapTimeDesc = 'FASTEST_LAP_TIME_DESC',
  GridAsc = 'GRID_ASC',
  GridDesc = 'GRID_DESC',
  LapsAsc = 'LAPS_ASC',
  LapsDesc = 'LAPS_DESC',
  MillisecondsAsc = 'MILLISECONDS_ASC',
  MillisecondsDesc = 'MILLISECONDS_DESC',
  Natural = 'NATURAL',
  NumberAsc = 'NUMBER_ASC',
  NumberDesc = 'NUMBER_DESC',
  PointsAsc = 'POINTS_ASC',
  PointsDesc = 'POINTS_DESC',
  PositionAsc = 'POSITION_ASC',
  PositionDesc = 'POSITION_DESC',
  PositionOrderAsc = 'POSITION_ORDER_ASC',
  PositionOrderDesc = 'POSITION_ORDER_DESC',
  PositionTextAsc = 'POSITION_TEXT_ASC',
  PositionTextDesc = 'POSITION_TEXT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC',
  SprintResultIdAsc = 'SPRINT_RESULT_ID_ASC',
  SprintResultIdDesc = 'SPRINT_RESULT_ID_DESC',
  StatusIdAsc = 'STATUS_ID_ASC',
  StatusIdDesc = 'STATUS_ID_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  TimeAsc = 'TIME_ASC',
  TimeDesc = 'TIME_DESC'
}

export type Status = Node & {
  __typename?: 'Status';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `Result`. */
  results: Array<Result>;
  /** Reads and enables pagination through a set of `Result`. */
  resultsConnection: ResultsConnection;
  /** Reads and enables pagination through a set of `SprintResult`. */
  sprintResults: Array<SprintResult>;
  /** Reads and enables pagination through a set of `SprintResult`. */
  sprintResultsConnection: SprintResultsConnection;
  status?: Maybe<Scalars['String']['output']>;
  statusId: Scalars['Int']['output'];
};


export type StatusResultsArgs = {
  condition?: InputMaybe<ResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ResultsOrderBy>>;
};


export type StatusResultsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ResultsOrderBy>>;
};


export type StatusSprintResultsArgs = {
  condition?: InputMaybe<SprintResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintResultsOrderBy>>;
};


export type StatusSprintResultsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SprintResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintResultsOrderBy>>;
};

/** A condition to be used against `Status` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type StatusCondition = {
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `statusId` field. */
  statusId?: InputMaybe<Scalars['Int']['input']>;
};

/** An input for mutations affecting `Status` */
export type StatusInput = {
  status?: InputMaybe<Scalars['String']['input']>;
  statusId: Scalars['Int']['input'];
};

/** Represents an update to a `Status`. Fields that are set will be updated. */
export type StatusPatch = {
  status?: InputMaybe<Scalars['String']['input']>;
  statusId?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `Status` values. */
export type StatusesConnection = {
  __typename?: 'StatusesConnection';
  /** A list of edges which contains the `Status` and cursor to aid in pagination. */
  edges: Array<StatusesEdge>;
  /** A list of `Status` objects. */
  nodes: Array<Status>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Status` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Status` edge in the connection. */
export type StatusesEdge = {
  __typename?: 'StatusesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Status` at the end of the edge. */
  node: Status;
};

/** Methods to use when ordering `Status`. */
export enum StatusesOrderBy {
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  StatusIdAsc = 'STATUS_ID_ASC',
  StatusIdDesc = 'STATUS_ID_DESC'
}

export type Team = Node & {
  __typename?: 'Team';
  bio?: Maybe<TeamBio>;
  /** Reads a single `TeamColor` that is related to this `Team`. */
  colors?: Maybe<TeamColor>;
  constructorRef?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `DriverCurrentTeam`. */
  currentDrivers: Array<DriverCurrentTeam>;
  /** Reads and enables pagination through a set of `DriverCurrentTeam`. */
  currentDriversConnection: DriverCurrentTeamsConnection;
  /** Reads and enables pagination through a set of `DriverTeam`. */
  driversByYear: Array<DriverTeam>;
  /** Reads and enables pagination through a set of `DriverTeam`. */
  driversByYearConnection: DriverTeamsConnection;
  /** Reads and enables pagination through a set of `FinalTeamStandingsByYear`. */
  finalTeamStandingsByYears: Array<FinalTeamStandingsByYear>;
  /** Reads and enables pagination through a set of `FinalTeamStandingsByYear`. */
  finalTeamStandingsByYearsConnection: FinalTeamStandingsByYearsConnection;
  name?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `Qualifying`. */
  qualifyings: Array<Qualifying>;
  /** Reads and enables pagination through a set of `Qualifying`. */
  qualifyingsConnection: QualifyingsConnection;
  /** Reads and enables pagination through a set of `Result`. */
  results: Array<Result>;
  /** Reads and enables pagination through a set of `Result`. */
  resultsConnection: ResultsConnection;
  /** Reads and enables pagination through a set of `SprintResult`. */
  sprintResults: Array<SprintResult>;
  /** Reads and enables pagination through a set of `SprintResult`. */
  sprintResultsConnection: SprintResultsConnection;
  /** Reads and enables pagination through a set of `TeamHistory`. */
  teamHistories: Array<TeamHistory>;
  /** Reads and enables pagination through a set of `TeamHistory`. */
  teamHistoriesByAntecedentTeamId: Array<TeamHistory>;
  /** Reads and enables pagination through a set of `TeamHistory`. */
  teamHistoriesByAntecedentTeamIdConnection: TeamHistoriesConnection;
  /** Reads and enables pagination through a set of `TeamHistory`. */
  teamHistoriesConnection: TeamHistoriesConnection;
  teamId: Scalars['Int']['output'];
  /** Reads and enables pagination through a set of `TeamResult`. */
  teamResults: Array<TeamResult>;
  /** Reads and enables pagination through a set of `TeamResult`. */
  teamResultsConnection: TeamResultsConnection;
  /** Reads and enables pagination through a set of `TeamStanding`. */
  teamStandings: Array<TeamStanding>;
  /** Reads and enables pagination through a set of `TeamStanding`. */
  teamStandingsConnection: TeamStandingsConnection;
  url?: Maybe<Scalars['String']['output']>;
};


export type TeamCurrentDriversArgs = {
  condition?: InputMaybe<DriverCurrentTeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverCurrentTeamsOrderBy>>;
};


export type TeamCurrentDriversConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DriverCurrentTeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverCurrentTeamsOrderBy>>;
};


export type TeamDriversByYearArgs = {
  condition?: InputMaybe<DriverTeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverTeamsOrderBy>>;
};


export type TeamDriversByYearConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DriverTeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverTeamsOrderBy>>;
};


export type TeamFinalTeamStandingsByYearsArgs = {
  condition?: InputMaybe<FinalTeamStandingsByYearCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FinalTeamStandingsByYearsOrderBy>>;
};


export type TeamFinalTeamStandingsByYearsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<FinalTeamStandingsByYearCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FinalTeamStandingsByYearsOrderBy>>;
};


export type TeamQualifyingsArgs = {
  condition?: InputMaybe<QualifyingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<QualifyingsOrderBy>>;
};


export type TeamQualifyingsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<QualifyingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<QualifyingsOrderBy>>;
};


export type TeamResultsArgs = {
  condition?: InputMaybe<ResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ResultsOrderBy>>;
};


export type TeamResultsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ResultsOrderBy>>;
};


export type TeamSprintResultsArgs = {
  condition?: InputMaybe<SprintResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintResultsOrderBy>>;
};


export type TeamSprintResultsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SprintResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintResultsOrderBy>>;
};


export type TeamTeamHistoriesArgs = {
  condition?: InputMaybe<TeamHistoryCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamHistoriesOrderBy>>;
};


export type TeamTeamHistoriesByAntecedentTeamIdArgs = {
  condition?: InputMaybe<TeamHistoryCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamHistoriesOrderBy>>;
};


export type TeamTeamHistoriesByAntecedentTeamIdConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TeamHistoryCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamHistoriesOrderBy>>;
};


export type TeamTeamHistoriesConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TeamHistoryCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamHistoriesOrderBy>>;
};


export type TeamTeamResultsArgs = {
  condition?: InputMaybe<TeamResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamResultsOrderBy>>;
};


export type TeamTeamResultsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TeamResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamResultsOrderBy>>;
};


export type TeamTeamStandingsArgs = {
  condition?: InputMaybe<TeamStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamStandingsOrderBy>>;
};


export type TeamTeamStandingsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TeamStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamStandingsOrderBy>>;
};

export type TeamBio = {
  __typename?: 'TeamBio';
  description?: Maybe<Scalars['String']['output']>;
  extract?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<TeamBioImage>;
  title?: Maybe<Scalars['String']['output']>;
};

export type TeamBioImage = {
  __typename?: 'TeamBioImage';
  height?: Maybe<Scalars['Int']['output']>;
  source?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type TeamColor = Node & {
  __typename?: 'TeamColor';
  logo?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  primary?: Maybe<Scalars['String']['output']>;
  secondary?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Team` that is related to this `TeamColor`. */
  team?: Maybe<Team>;
  teamId: Scalars['Int']['output'];
};

/**
 * A condition to be used against `TeamColor` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type TeamColorCondition = {
  /** Checks for equality with the object’s `logo` field. */
  logo?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `primary` field. */
  primary?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `secondary` field. */
  secondary?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['Int']['input']>;
};

/** An input for mutations affecting `TeamColor` */
export type TeamColorInput = {
  logo?: InputMaybe<Scalars['String']['input']>;
  primary?: InputMaybe<Scalars['String']['input']>;
  secondary?: InputMaybe<Scalars['String']['input']>;
  teamId: Scalars['Int']['input'];
};

/** Represents an update to a `TeamColor`. Fields that are set will be updated. */
export type TeamColorPatch = {
  logo?: InputMaybe<Scalars['String']['input']>;
  primary?: InputMaybe<Scalars['String']['input']>;
  secondary?: InputMaybe<Scalars['String']['input']>;
  teamId?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `TeamColor` values. */
export type TeamColorsConnection = {
  __typename?: 'TeamColorsConnection';
  /** A list of edges which contains the `TeamColor` and cursor to aid in pagination. */
  edges: Array<TeamColorsEdge>;
  /** A list of `TeamColor` objects. */
  nodes: Array<TeamColor>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TeamColor` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `TeamColor` edge in the connection. */
export type TeamColorsEdge = {
  __typename?: 'TeamColorsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `TeamColor` at the end of the edge. */
  node: TeamColor;
};

/** Methods to use when ordering `TeamColor`. */
export enum TeamColorsOrderBy {
  LogoAsc = 'LOGO_ASC',
  LogoDesc = 'LOGO_DESC',
  Natural = 'NATURAL',
  PrimaryAsc = 'PRIMARY_ASC',
  PrimaryDesc = 'PRIMARY_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SecondaryAsc = 'SECONDARY_ASC',
  SecondaryDesc = 'SECONDARY_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC'
}

/** A condition to be used against `Team` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type TeamCondition = {
  /** Checks for equality with the object’s `constructorRef` field. */
  constructorRef?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `nationality` field. */
  nationality?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `url` field. */
  url?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `TeamHistory` values. */
export type TeamHistoriesConnection = {
  __typename?: 'TeamHistoriesConnection';
  /** A list of edges which contains the `TeamHistory` and cursor to aid in pagination. */
  edges: Array<TeamHistoriesEdge>;
  /** A list of `TeamHistory` objects. */
  nodes: Array<TeamHistory>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TeamHistory` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `TeamHistory` edge in the connection. */
export type TeamHistoriesEdge = {
  __typename?: 'TeamHistoriesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `TeamHistory` at the end of the edge. */
  node: TeamHistory;
};

/** Methods to use when ordering `TeamHistory`. */
export enum TeamHistoriesOrderBy {
  AntecedentTeamIdAsc = 'ANTECEDENT_TEAM_ID_ASC',
  AntecedentTeamIdDesc = 'ANTECEDENT_TEAM_ID_DESC',
  EndYearAsc = 'END_YEAR_ASC',
  EndYearDesc = 'END_YEAR_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  StartYearAsc = 'START_YEAR_ASC',
  StartYearDesc = 'START_YEAR_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC'
}

export type TeamHistory = Node & {
  __typename?: 'TeamHistory';
  /** Reads a single `Team` that is related to this `TeamHistory`. */
  antecedentTeam?: Maybe<Team>;
  antecedentTeamId: Scalars['Int']['output'];
  endYear?: Maybe<Scalars['Int']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  startYear: Scalars['Int']['output'];
  /** Reads a single `Team` that is related to this `TeamHistory`. */
  team?: Maybe<Team>;
  teamId: Scalars['Int']['output'];
};

/**
 * A condition to be used against `TeamHistory` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type TeamHistoryCondition = {
  /** Checks for equality with the object’s `antecedentTeamId` field. */
  antecedentTeamId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `endYear` field. */
  endYear?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `startYear` field. */
  startYear?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['Int']['input']>;
};

/** An input for mutations affecting `TeamHistory` */
export type TeamHistoryInput = {
  antecedentTeamId: Scalars['Int']['input'];
  endYear?: InputMaybe<Scalars['Int']['input']>;
  startYear: Scalars['Int']['input'];
  teamId: Scalars['Int']['input'];
};

/** Represents an update to a `TeamHistory`. Fields that are set will be updated. */
export type TeamHistoryPatch = {
  antecedentTeamId?: InputMaybe<Scalars['Int']['input']>;
  endYear?: InputMaybe<Scalars['Int']['input']>;
  startYear?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['Int']['input']>;
};

/** An input for mutations affecting `Team` */
export type TeamInput = {
  constructorRef?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nationality?: InputMaybe<Scalars['String']['input']>;
  teamId: Scalars['Int']['input'];
  url?: InputMaybe<Scalars['String']['input']>;
};

/** Represents an update to a `Team`. Fields that are set will be updated. */
export type TeamPatch = {
  constructorRef?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nationality?: InputMaybe<Scalars['String']['input']>;
  teamId?: InputMaybe<Scalars['Int']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type TeamResult = Node & {
  __typename?: 'TeamResult';
  constructorResultsId: Scalars['Int']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  points?: Maybe<Scalars['Float']['output']>;
  /** Reads a single `Race` that is related to this `TeamResult`. */
  race?: Maybe<Race>;
  raceId?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Team` that is related to this `TeamResult`. */
  team?: Maybe<Team>;
  teamId?: Maybe<Scalars['Int']['output']>;
};

/**
 * A condition to be used against `TeamResult` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type TeamResultCondition = {
  /** Checks for equality with the object’s `constructorResultsId` field. */
  constructorResultsId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `points` field. */
  points?: InputMaybe<Scalars['Float']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['Int']['input']>;
};

/** An input for mutations affecting `TeamResult` */
export type TeamResultInput = {
  constructorResultsId: Scalars['Int']['input'];
  points?: InputMaybe<Scalars['Float']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  teamId?: InputMaybe<Scalars['Int']['input']>;
};

/** Represents an update to a `TeamResult`. Fields that are set will be updated. */
export type TeamResultPatch = {
  constructorResultsId?: InputMaybe<Scalars['Int']['input']>;
  points?: InputMaybe<Scalars['Float']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  teamId?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `TeamResult` values. */
export type TeamResultsConnection = {
  __typename?: 'TeamResultsConnection';
  /** A list of edges which contains the `TeamResult` and cursor to aid in pagination. */
  edges: Array<TeamResultsEdge>;
  /** A list of `TeamResult` objects. */
  nodes: Array<TeamResult>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TeamResult` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `TeamResult` edge in the connection. */
export type TeamResultsEdge = {
  __typename?: 'TeamResultsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `TeamResult` at the end of the edge. */
  node: TeamResult;
};

/** Methods to use when ordering `TeamResult`. */
export enum TeamResultsOrderBy {
  ConstructorResultsIdAsc = 'CONSTRUCTOR_RESULTS_ID_ASC',
  ConstructorResultsIdDesc = 'CONSTRUCTOR_RESULTS_ID_DESC',
  Natural = 'NATURAL',
  PointsAsc = 'POINTS_ASC',
  PointsDesc = 'POINTS_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC'
}

export type TeamStanding = Node & {
  __typename?: 'TeamStanding';
  constructorStandingsId: Scalars['Int']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  positionText?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Race` that is related to this `TeamStanding`. */
  race?: Maybe<Race>;
  raceId?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `Team` that is related to this `TeamStanding`. */
  team?: Maybe<Team>;
  teamId?: Maybe<Scalars['Int']['output']>;
  wins?: Maybe<Scalars['Int']['output']>;
};

/**
 * A condition to be used against `TeamStanding` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type TeamStandingCondition = {
  /** Checks for equality with the object’s `constructorStandingsId` field. */
  constructorStandingsId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `points` field. */
  points?: InputMaybe<Scalars['Float']['input']>;
  /** Checks for equality with the object’s `position` field. */
  position?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionText` field. */
  positionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `wins` field. */
  wins?: InputMaybe<Scalars['Int']['input']>;
  /** Filters teamStandings by year */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** An input for mutations affecting `TeamStanding` */
export type TeamStandingInput = {
  constructorStandingsId: Scalars['Int']['input'];
  points?: InputMaybe<Scalars['Float']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['Int']['input']>;
  wins?: InputMaybe<Scalars['Int']['input']>;
};

/** Represents an update to a `TeamStanding`. Fields that are set will be updated. */
export type TeamStandingPatch = {
  constructorStandingsId?: InputMaybe<Scalars['Int']['input']>;
  points?: InputMaybe<Scalars['Float']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['Int']['input']>;
  wins?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `TeamStanding` values. */
export type TeamStandingsConnection = {
  __typename?: 'TeamStandingsConnection';
  /** A list of edges which contains the `TeamStanding` and cursor to aid in pagination. */
  edges: Array<TeamStandingsEdge>;
  /** A list of `TeamStanding` objects. */
  nodes: Array<TeamStanding>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TeamStanding` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `TeamStanding` edge in the connection. */
export type TeamStandingsEdge = {
  __typename?: 'TeamStandingsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `TeamStanding` at the end of the edge. */
  node: TeamStanding;
};

/** Methods to use when ordering `TeamStanding`. */
export enum TeamStandingsOrderBy {
  ConstructorStandingsIdAsc = 'CONSTRUCTOR_STANDINGS_ID_ASC',
  ConstructorStandingsIdDesc = 'CONSTRUCTOR_STANDINGS_ID_DESC',
  Natural = 'NATURAL',
  PointsAsc = 'POINTS_ASC',
  PointsDesc = 'POINTS_DESC',
  PositionAsc = 'POSITION_ASC',
  PositionDesc = 'POSITION_DESC',
  PositionTextAsc = 'POSITION_TEXT_ASC',
  PositionTextDesc = 'POSITION_TEXT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  WinsAsc = 'WINS_ASC',
  WinsDesc = 'WINS_DESC'
}

/** A connection to a list of `Team` values. */
export type TeamsConnection = {
  __typename?: 'TeamsConnection';
  /** A list of edges which contains the `Team` and cursor to aid in pagination. */
  edges: Array<TeamsEdge>;
  /** A list of `Team` objects. */
  nodes: Array<Team>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Team` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Team` edge in the connection. */
export type TeamsEdge = {
  __typename?: 'TeamsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Team` at the end of the edge. */
  node: Team;
};

/** Methods to use when ordering `Team`. */
export enum TeamsOrderBy {
  ConstructorRefAsc = 'CONSTRUCTOR_REF_ASC',
  ConstructorRefDesc = 'CONSTRUCTOR_REF_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  NationalityAsc = 'NATIONALITY_ASC',
  NationalityDesc = 'NATIONALITY_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  UrlAsc = 'URL_ASC',
  UrlDesc = 'URL_DESC'
}

/** All input for the `updateCircuitByCircuitRef` mutation. */
export type UpdateCircuitByCircuitRefInput = {
  circuitRef: Scalars['String']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Circuit` being updated. */
  patch: CircuitPatch;
};

/** All input for the `updateCircuitByNodeId` mutation. */
export type UpdateCircuitByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Circuit` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Circuit` being updated. */
  patch: CircuitPatch;
};

/** All input for the `updateCircuitByUrl` mutation. */
export type UpdateCircuitByUrlInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Circuit` being updated. */
  patch: CircuitPatch;
  url: Scalars['String']['input'];
};

/** All input for the `updateCircuitDescriptionByNodeId` mutation. */
export type UpdateCircuitDescriptionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `CircuitDescription` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `CircuitDescription` being updated. */
  patch: CircuitDescriptionPatch;
};

/** All input for the `updateCircuitDescription` mutation. */
export type UpdateCircuitDescriptionInput = {
  circuitId: Scalars['Int']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `CircuitDescription` being updated. */
  patch: CircuitDescriptionPatch;
};

/** The output of our update `CircuitDescription` mutation. */
export type UpdateCircuitDescriptionPayload = {
  __typename?: 'UpdateCircuitDescriptionPayload';
  /** Reads a single `Circuit` that is related to this `CircuitDescription`. */
  circuit?: Maybe<Circuit>;
  /** The `CircuitDescription` that was updated by this mutation. */
  circuitDescription?: Maybe<CircuitDescription>;
  /** An edge for our `CircuitDescription`. May be used by Relay 1. */
  circuitDescriptionEdge?: Maybe<CircuitDescriptionsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `CircuitDescription` mutation. */
export type UpdateCircuitDescriptionPayloadCircuitDescriptionEdgeArgs = {
  orderBy?: InputMaybe<Array<CircuitDescriptionsOrderBy>>;
};

/** All input for the `updateCircuit` mutation. */
export type UpdateCircuitInput = {
  circuitId: Scalars['Int']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Circuit` being updated. */
  patch: CircuitPatch;
};

/** The output of our update `Circuit` mutation. */
export type UpdateCircuitPayload = {
  __typename?: 'UpdateCircuitPayload';
  /** The `Circuit` that was updated by this mutation. */
  circuit?: Maybe<Circuit>;
  /** An edge for our `Circuit`. May be used by Relay 1. */
  circuitEdge?: Maybe<CircuitsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Circuit` mutation. */
export type UpdateCircuitPayloadCircuitEdgeArgs = {
  orderBy?: InputMaybe<Array<CircuitsOrderBy>>;
};

/** All input for the `updateDriverByDriverRef` mutation. */
export type UpdateDriverByDriverRefInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  driverRef: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `Driver` being updated. */
  patch: DriverPatch;
};

/** All input for the `updateDriverByNodeId` mutation. */
export type UpdateDriverByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Driver` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Driver` being updated. */
  patch: DriverPatch;
};

/** All input for the `updateDriverByUrl` mutation. */
export type UpdateDriverByUrlInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Driver` being updated. */
  patch: DriverPatch;
  url: Scalars['String']['input'];
};

/** All input for the `updateDriver` mutation. */
export type UpdateDriverInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  driverId: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `Driver` being updated. */
  patch: DriverPatch;
};

/** The output of our update `Driver` mutation. */
export type UpdateDriverPayload = {
  __typename?: 'UpdateDriverPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Driver` that was updated by this mutation. */
  driver?: Maybe<Driver>;
  /** An edge for our `Driver`. May be used by Relay 1. */
  driverEdge?: Maybe<DriversEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Driver` mutation. */
export type UpdateDriverPayloadDriverEdgeArgs = {
  orderBy?: InputMaybe<Array<DriversOrderBy>>;
};

/** All input for the `updateDriverStandingByNodeId` mutation. */
export type UpdateDriverStandingByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `DriverStanding` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `DriverStanding` being updated. */
  patch: DriverStandingPatch;
};

/** All input for the `updateDriverStanding` mutation. */
export type UpdateDriverStandingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  driverStandingsId: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `DriverStanding` being updated. */
  patch: DriverStandingPatch;
};

/** The output of our update `DriverStanding` mutation. */
export type UpdateDriverStandingPayload = {
  __typename?: 'UpdateDriverStandingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Driver` that is related to this `DriverStanding`. */
  driver?: Maybe<Driver>;
  /** The `DriverStanding` that was updated by this mutation. */
  driverStanding?: Maybe<DriverStanding>;
  /** An edge for our `DriverStanding`. May be used by Relay 1. */
  driverStandingEdge?: Maybe<DriverStandingsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Race` that is related to this `DriverStanding`. */
  race?: Maybe<Race>;
};


/** The output of our update `DriverStanding` mutation. */
export type UpdateDriverStandingPayloadDriverStandingEdgeArgs = {
  orderBy?: InputMaybe<Array<DriverStandingsOrderBy>>;
};

/** All input for the `updateLapTimeByNodeId` mutation. */
export type UpdateLapTimeByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `LapTime` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `LapTime` being updated. */
  patch: LapTimePatch;
};

/** All input for the `updateLapTime` mutation. */
export type UpdateLapTimeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  driverId: Scalars['Int']['input'];
  lap: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `LapTime` being updated. */
  patch: LapTimePatch;
  raceId: Scalars['Int']['input'];
};

/** The output of our update `LapTime` mutation. */
export type UpdateLapTimePayload = {
  __typename?: 'UpdateLapTimePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Driver` that is related to this `LapTime`. */
  driver?: Maybe<Driver>;
  /** The `LapTime` that was updated by this mutation. */
  lapTime?: Maybe<LapTime>;
  /** An edge for our `LapTime`. May be used by Relay 1. */
  lapTimeEdge?: Maybe<LapTimesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Race` that is related to this `LapTime`. */
  race?: Maybe<Race>;
};


/** The output of our update `LapTime` mutation. */
export type UpdateLapTimePayloadLapTimeEdgeArgs = {
  orderBy?: InputMaybe<Array<LapTimesOrderBy>>;
};

/** All input for the `updatePitStopByNodeId` mutation. */
export type UpdatePitStopByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `PitStop` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `PitStop` being updated. */
  patch: PitStopPatch;
};

/** All input for the `updatePitStop` mutation. */
export type UpdatePitStopInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  driverId: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `PitStop` being updated. */
  patch: PitStopPatch;
  raceId: Scalars['Int']['input'];
  stop: Scalars['Int']['input'];
};

/** The output of our update `PitStop` mutation. */
export type UpdatePitStopPayload = {
  __typename?: 'UpdatePitStopPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Driver` that is related to this `PitStop`. */
  driver?: Maybe<Driver>;
  /** The `PitStop` that was updated by this mutation. */
  pitStop?: Maybe<PitStop>;
  /** An edge for our `PitStop`. May be used by Relay 1. */
  pitStopEdge?: Maybe<PitStopsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Race` that is related to this `PitStop`. */
  race?: Maybe<Race>;
};


/** The output of our update `PitStop` mutation. */
export type UpdatePitStopPayloadPitStopEdgeArgs = {
  orderBy?: InputMaybe<Array<PitStopsOrderBy>>;
};

/** All input for the `updateQualifyingByNodeId` mutation. */
export type UpdateQualifyingByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Qualifying` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Qualifying` being updated. */
  patch: QualifyingPatch;
};

/** All input for the `updateQualifying` mutation. */
export type UpdateQualifyingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Qualifying` being updated. */
  patch: QualifyingPatch;
  qualifyId: Scalars['Int']['input'];
};

/** The output of our update `Qualifying` mutation. */
export type UpdateQualifyingPayload = {
  __typename?: 'UpdateQualifyingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Driver` that is related to this `Qualifying`. */
  driver?: Maybe<Driver>;
  /** The `Qualifying` that was updated by this mutation. */
  qualifying?: Maybe<Qualifying>;
  /** An edge for our `Qualifying`. May be used by Relay 1. */
  qualifyingEdge?: Maybe<QualifyingsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Race` that is related to this `Qualifying`. */
  race?: Maybe<Race>;
  /** Reads a single `Team` that is related to this `Qualifying`. */
  team?: Maybe<Team>;
};


/** The output of our update `Qualifying` mutation. */
export type UpdateQualifyingPayloadQualifyingEdgeArgs = {
  orderBy?: InputMaybe<Array<QualifyingsOrderBy>>;
};

/** All input for the `updateRaceByNodeId` mutation. */
export type UpdateRaceByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Race` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Race` being updated. */
  patch: RacePatch;
};

/** All input for the `updateRaceByYearAndRound` mutation. */
export type UpdateRaceByYearAndRoundInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Race` being updated. */
  patch: RacePatch;
  round: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
};

/** All input for the `updateRace` mutation. */
export type UpdateRaceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Race` being updated. */
  patch: RacePatch;
  raceId: Scalars['Int']['input'];
};

/** The output of our update `Race` mutation. */
export type UpdateRacePayload = {
  __typename?: 'UpdateRacePayload';
  /** Reads a single `Circuit` that is related to this `Race`. */
  circuit?: Maybe<Circuit>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Race` that was updated by this mutation. */
  race?: Maybe<Race>;
  /** An edge for our `Race`. May be used by Relay 1. */
  raceEdge?: Maybe<RacesEdge>;
  /** Reads a single `Season` that is related to this `Race`. */
  seasonByYear?: Maybe<Season>;
};


/** The output of our update `Race` mutation. */
export type UpdateRacePayloadRaceEdgeArgs = {
  orderBy?: InputMaybe<Array<RacesOrderBy>>;
};

/** All input for the `updateResultByNodeId` mutation. */
export type UpdateResultByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Result` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Result` being updated. */
  patch: ResultPatch;
};

/** All input for the `updateResult` mutation. */
export type UpdateResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Result` being updated. */
  patch: ResultPatch;
  resultId: Scalars['Int']['input'];
};

/** The output of our update `Result` mutation. */
export type UpdateResultPayload = {
  __typename?: 'UpdateResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Driver` that is related to this `Result`. */
  driver?: Maybe<Driver>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Race` that is related to this `Result`. */
  race?: Maybe<Race>;
  /** The `Result` that was updated by this mutation. */
  result?: Maybe<Result>;
  /** An edge for our `Result`. May be used by Relay 1. */
  resultEdge?: Maybe<ResultsEdge>;
  /** Reads a single `Status` that is related to this `Result`. */
  status?: Maybe<Status>;
  /** Reads a single `Team` that is related to this `Result`. */
  team?: Maybe<Team>;
};


/** The output of our update `Result` mutation. */
export type UpdateResultPayloadResultEdgeArgs = {
  orderBy?: InputMaybe<Array<ResultsOrderBy>>;
};

/** All input for the `updateSeasonByNodeId` mutation. */
export type UpdateSeasonByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Season` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Season` being updated. */
  patch: SeasonPatch;
};

/** All input for the `updateSeasonByUrl` mutation. */
export type UpdateSeasonByUrlInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Season` being updated. */
  patch: SeasonPatch;
  url: Scalars['String']['input'];
};

/** All input for the `updateSeason` mutation. */
export type UpdateSeasonInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Season` being updated. */
  patch: SeasonPatch;
  year: Scalars['Int']['input'];
};

/** The output of our update `Season` mutation. */
export type UpdateSeasonPayload = {
  __typename?: 'UpdateSeasonPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Season` that was updated by this mutation. */
  season?: Maybe<Season>;
  /** An edge for our `Season`. May be used by Relay 1. */
  seasonEdge?: Maybe<SeasonsEdge>;
};


/** The output of our update `Season` mutation. */
export type UpdateSeasonPayloadSeasonEdgeArgs = {
  orderBy?: InputMaybe<Array<SeasonsOrderBy>>;
};

/** All input for the `updateSprintResultByNodeId` mutation. */
export type UpdateSprintResultByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SprintResult` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `SprintResult` being updated. */
  patch: SprintResultPatch;
};

/** All input for the `updateSprintResult` mutation. */
export type UpdateSprintResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `SprintResult` being updated. */
  patch: SprintResultPatch;
  sprintResultId: Scalars['Int']['input'];
};

/** The output of our update `SprintResult` mutation. */
export type UpdateSprintResultPayload = {
  __typename?: 'UpdateSprintResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Driver` that is related to this `SprintResult`. */
  driver?: Maybe<Driver>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Race` that is related to this `SprintResult`. */
  race?: Maybe<Race>;
  /** The `SprintResult` that was updated by this mutation. */
  sprintResult?: Maybe<SprintResult>;
  /** An edge for our `SprintResult`. May be used by Relay 1. */
  sprintResultEdge?: Maybe<SprintResultsEdge>;
  /** Reads a single `Status` that is related to this `SprintResult`. */
  status?: Maybe<Status>;
  /** Reads a single `Team` that is related to this `SprintResult`. */
  team?: Maybe<Team>;
};


/** The output of our update `SprintResult` mutation. */
export type UpdateSprintResultPayloadSprintResultEdgeArgs = {
  orderBy?: InputMaybe<Array<SprintResultsOrderBy>>;
};

/** All input for the `updateStatusByNodeId` mutation. */
export type UpdateStatusByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Status` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Status` being updated. */
  patch: StatusPatch;
};

/** All input for the `updateStatus` mutation. */
export type UpdateStatusInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Status` being updated. */
  patch: StatusPatch;
  statusId: Scalars['Int']['input'];
};

/** The output of our update `Status` mutation. */
export type UpdateStatusPayload = {
  __typename?: 'UpdateStatusPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Status` that was updated by this mutation. */
  status?: Maybe<Status>;
  /** An edge for our `Status`. May be used by Relay 1. */
  statusEdge?: Maybe<StatusesEdge>;
};


/** The output of our update `Status` mutation. */
export type UpdateStatusPayloadStatusEdgeArgs = {
  orderBy?: InputMaybe<Array<StatusesOrderBy>>;
};

/** All input for the `updateTeamByConstructorRef` mutation. */
export type UpdateTeamByConstructorRefInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  constructorRef: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `Team` being updated. */
  patch: TeamPatch;
};

/** All input for the `updateTeamByNodeId` mutation. */
export type UpdateTeamByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Team` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Team` being updated. */
  patch: TeamPatch;
};

/** All input for the `updateTeamColorByNodeId` mutation. */
export type UpdateTeamColorByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `TeamColor` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `TeamColor` being updated. */
  patch: TeamColorPatch;
};

/** All input for the `updateTeamColor` mutation. */
export type UpdateTeamColorInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `TeamColor` being updated. */
  patch: TeamColorPatch;
  teamId: Scalars['Int']['input'];
};

/** The output of our update `TeamColor` mutation. */
export type UpdateTeamColorPayload = {
  __typename?: 'UpdateTeamColorPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Team` that is related to this `TeamColor`. */
  team?: Maybe<Team>;
  /** The `TeamColor` that was updated by this mutation. */
  teamColor?: Maybe<TeamColor>;
  /** An edge for our `TeamColor`. May be used by Relay 1. */
  teamColorEdge?: Maybe<TeamColorsEdge>;
};


/** The output of our update `TeamColor` mutation. */
export type UpdateTeamColorPayloadTeamColorEdgeArgs = {
  orderBy?: InputMaybe<Array<TeamColorsOrderBy>>;
};

/** All input for the `updateTeamHistoryByNodeId` mutation. */
export type UpdateTeamHistoryByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `TeamHistory` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `TeamHistory` being updated. */
  patch: TeamHistoryPatch;
};

/** All input for the `updateTeamHistory` mutation. */
export type UpdateTeamHistoryInput = {
  antecedentTeamId: Scalars['Int']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `TeamHistory` being updated. */
  patch: TeamHistoryPatch;
  startYear: Scalars['Int']['input'];
  teamId: Scalars['Int']['input'];
};

/** The output of our update `TeamHistory` mutation. */
export type UpdateTeamHistoryPayload = {
  __typename?: 'UpdateTeamHistoryPayload';
  /** Reads a single `Team` that is related to this `TeamHistory`. */
  antecedentTeam?: Maybe<Team>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Team` that is related to this `TeamHistory`. */
  team?: Maybe<Team>;
  /** The `TeamHistory` that was updated by this mutation. */
  teamHistory?: Maybe<TeamHistory>;
  /** An edge for our `TeamHistory`. May be used by Relay 1. */
  teamHistoryEdge?: Maybe<TeamHistoriesEdge>;
};


/** The output of our update `TeamHistory` mutation. */
export type UpdateTeamHistoryPayloadTeamHistoryEdgeArgs = {
  orderBy?: InputMaybe<Array<TeamHistoriesOrderBy>>;
};

/** All input for the `updateTeam` mutation. */
export type UpdateTeamInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Team` being updated. */
  patch: TeamPatch;
  teamId: Scalars['Int']['input'];
};

/** The output of our update `Team` mutation. */
export type UpdateTeamPayload = {
  __typename?: 'UpdateTeamPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Team` that was updated by this mutation. */
  team?: Maybe<Team>;
  /** An edge for our `Team`. May be used by Relay 1. */
  teamEdge?: Maybe<TeamsEdge>;
};


/** The output of our update `Team` mutation. */
export type UpdateTeamPayloadTeamEdgeArgs = {
  orderBy?: InputMaybe<Array<TeamsOrderBy>>;
};

/** All input for the `updateTeamResultByNodeId` mutation. */
export type UpdateTeamResultByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `TeamResult` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `TeamResult` being updated. */
  patch: TeamResultPatch;
};

/** All input for the `updateTeamResult` mutation. */
export type UpdateTeamResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  constructorResultsId: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `TeamResult` being updated. */
  patch: TeamResultPatch;
};

/** The output of our update `TeamResult` mutation. */
export type UpdateTeamResultPayload = {
  __typename?: 'UpdateTeamResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Race` that is related to this `TeamResult`. */
  race?: Maybe<Race>;
  /** Reads a single `Team` that is related to this `TeamResult`. */
  team?: Maybe<Team>;
  /** The `TeamResult` that was updated by this mutation. */
  teamResult?: Maybe<TeamResult>;
  /** An edge for our `TeamResult`. May be used by Relay 1. */
  teamResultEdge?: Maybe<TeamResultsEdge>;
};


/** The output of our update `TeamResult` mutation. */
export type UpdateTeamResultPayloadTeamResultEdgeArgs = {
  orderBy?: InputMaybe<Array<TeamResultsOrderBy>>;
};

/** All input for the `updateTeamStandingByNodeId` mutation. */
export type UpdateTeamStandingByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `TeamStanding` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `TeamStanding` being updated. */
  patch: TeamStandingPatch;
};

/** All input for the `updateTeamStanding` mutation. */
export type UpdateTeamStandingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  constructorStandingsId: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `TeamStanding` being updated. */
  patch: TeamStandingPatch;
};

/** The output of our update `TeamStanding` mutation. */
export type UpdateTeamStandingPayload = {
  __typename?: 'UpdateTeamStandingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Race` that is related to this `TeamStanding`. */
  race?: Maybe<Race>;
  /** Reads a single `Team` that is related to this `TeamStanding`. */
  team?: Maybe<Team>;
  /** The `TeamStanding` that was updated by this mutation. */
  teamStanding?: Maybe<TeamStanding>;
  /** An edge for our `TeamStanding`. May be used by Relay 1. */
  teamStandingEdge?: Maybe<TeamStandingsEdge>;
};


/** The output of our update `TeamStanding` mutation. */
export type UpdateTeamStandingPayloadTeamStandingEdgeArgs = {
  orderBy?: InputMaybe<Array<TeamStandingsOrderBy>>;
};

export type SeasonsQueryVariables = Exact<{ [key: string]: never; }>;


export type SeasonsQuery = { __typename?: 'Query', seasons?: Array<{ __typename?: 'Season', year: number, ended?: boolean | null, hasResults?: boolean | null }> | null };

export type DriverPodiumsQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  teamId: Scalars['Int']['input'];
}>;


export type DriverPodiumsQuery = { __typename?: 'Query', races?: Array<{ __typename?: 'Race', results: Array<{ __typename?: 'Result', driverId?: number | null, positionOrder?: number | null }> }> | null };

export type DriverPointsQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  teamId: Scalars['Int']['input'];
}>;


export type DriverPointsQuery = { __typename?: 'Query', races?: Array<{ __typename?: 'Race', results: Array<{ __typename?: 'Result', driverId?: number | null, points?: number | null }> }> | null };

export type DriverQualifyingQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type DriverQualifyingQuery = { __typename?: 'Query', races?: Array<{ __typename?: 'Race', qualifyings: Array<{ __typename?: 'Qualifying', driverId?: number | null, position?: number | null, driver?: { __typename?: 'Driver', currentTeam?: { __typename?: 'DriverCurrentTeam', teamId?: number | null } | null } | null }> }> | null };

export type QualifyingQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  round: Scalars['Int']['input'];
}>;


export type QualifyingQueryQuery = { __typename?: 'Query', race?: { __typename?: 'Race', qualifyings: Array<{ __typename?: 'Qualifying', driverId?: number | null, position?: number | null, q1?: string | null, q2?: string | null, q3?: string | null, driver?: { __typename?: 'Driver', teamsByYear: Array<{ __typename?: 'DriverTeam', teamId?: number | null }> } | null }> } | null };

export type PitStopsBySeasonRoundQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  round: Scalars['Int']['input'];
}>;


export type PitStopsBySeasonRoundQuery = { __typename?: 'Query', race?: { __typename?: 'Race', pitStops: Array<{ __typename?: 'PitStop', lap?: number | null, time?: string | null, duration?: string | null, milliseconds?: number | null, driver?: { __typename?: 'Driver', driverId: number, code?: string | null, currentTeam?: { __typename?: 'DriverCurrentTeam', team?: { __typename?: 'Team', colors?: { __typename?: 'TeamColor', primary?: string | null } | null } | null } | null } | null }> } | null };

export type RaceFastestLapQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  round: Scalars['Int']['input'];
}>;


export type RaceFastestLapQueryQuery = { __typename?: 'Query', races?: Array<{ __typename?: 'Race', lapTimes: Array<{ __typename?: 'LapTime', lap: number, milliseconds?: number | null, driverId: number }> }> | null };

export type RaceLapLeaderQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  round: Scalars['Int']['input'];
}>;


export type RaceLapLeaderQueryQuery = { __typename?: 'Query', races?: Array<{ __typename?: 'Race', lapTimes: Array<{ __typename?: 'LapTime', driverId: number }> }> | null };

export type RacePolesLeaderQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  round: Scalars['Int']['input'];
}>;


export type RacePolesLeaderQueryQuery = { __typename?: 'Query', races?: Array<{ __typename?: 'Race', qualifyings: Array<{ __typename?: 'Qualifying', driverId?: number | null }> }> | null };

export type RacePositionsGainedLeaderQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  round: Scalars['Int']['input'];
}>;


export type RacePositionsGainedLeaderQueryQuery = { __typename?: 'Query', races?: Array<{ __typename?: 'Race', results: Array<{ __typename?: 'Result', driverId?: number | null, grid?: number | null, positionOrder?: number | null }> }> | null };

export type SeasonConstructorChampionQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type SeasonConstructorChampionQueryQuery = { __typename?: 'Query', finalTeamStandingsByYears?: Array<{ __typename?: 'FinalTeamStandingsByYear', teamId?: number | null }> | null };

export type SeasonDnFsLeaderQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type SeasonDnFsLeaderQueryQuery = { __typename?: 'Query', races?: Array<{ __typename?: 'Race', results: Array<{ __typename?: 'Result', driverId?: number | null }> }> | null };

export type SeasonDriverChampionQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type SeasonDriverChampionQueryQuery = { __typename?: 'Query', driverStandingsBySeasons?: Array<{ __typename?: 'DriverStandingsBySeason', driverId?: number | null }> | null };

export type SeasonFastestLapQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type SeasonFastestLapQueryQuery = { __typename?: 'Query', races?: Array<{ __typename?: 'Race', name?: string | null, round?: number | null, lapTimes: Array<{ __typename?: 'LapTime', lap: number, milliseconds?: number | null, driverId: number }> }> | null };

export type SeasonLapLeaderQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type SeasonLapLeaderQueryQuery = { __typename?: 'Query', races?: Array<{ __typename?: 'Race', lapTimes: Array<{ __typename?: 'LapTime', driverId: number }> }> | null };

export type SeasonPolesLeaderQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type SeasonPolesLeaderQueryQuery = { __typename?: 'Query', races?: Array<{ __typename?: 'Race', qualifyings: Array<{ __typename?: 'Qualifying', driverId?: number | null }> }> | null };

export type SeasonPositionsGainedLeaderQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type SeasonPositionsGainedLeaderQueryQuery = { __typename?: 'Query', races?: Array<{ __typename?: 'Race', results: Array<{ __typename?: 'Result', driverId?: number | null, grid?: number | null, positionOrder?: number | null }> }> | null };

export type SeasonSprintWinsLeaderQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type SeasonSprintWinsLeaderQueryQuery = { __typename?: 'Query', races?: Array<{ __typename?: 'Race', sprintResults: Array<{ __typename?: 'SprintResult', driverId?: number | null }> }> | null };

export type SeasonWinsLeaderQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type SeasonWinsLeaderQueryQuery = { __typename?: 'Query', races?: Array<{ __typename?: 'Race', results: Array<{ __typename?: 'Result', driverId?: number | null }> }> | null };

export type RaceBySeasonRoundQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  round: Scalars['Int']['input'];
}>;


export type RaceBySeasonRoundQuery = { __typename?: 'Query', races?: Array<{ __typename?: 'Race', name?: string | null, date?: any | null, round?: number | null, url?: string | null, summary?: { __typename?: 'RaceSummary', extract?: string | null } | null, circuit?: { __typename?: 'Circuit', circuitRef?: string | null, name?: string | null, location?: string | null, country?: string | null, lat?: number | null, lng?: number | null, circuitDescription?: { __typename?: 'CircuitDescription', description?: string | null } | null } | null, results: Array<{ __typename?: 'Result', teamId?: number | null, grid?: number | null, position?: number | null, positionText?: string | null, positionOrder?: number | null, points?: number | null, laps?: number | null, time?: string | null, milliseconds?: number | null, fastestLap?: number | null, rank?: number | null, fastestLapTime?: string | null, driver?: { __typename?: 'Driver', driverId: number } | null, status?: { __typename?: 'Status', status?: string | null } | null }>, sprintResults: Array<{ __typename?: 'SprintResult', teamId?: number | null, grid?: number | null, position?: number | null, positionText?: string | null, positionOrder?: number | null, points?: number | null, laps?: number | null, time?: string | null, milliseconds?: number | null, fastestLap?: number | null, fastestLapTime?: string | null, driver?: { __typename?: 'Driver', driverId: number } | null, status?: { __typename?: 'Status', status?: string | null } | null }> }> | null };


export const SeasonsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"seasons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seasons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"ended"}},{"kind":"Field","name":{"kind":"Name","value":"hasResults"}}]}}]}}]} as unknown as DocumentNode<SeasonsQuery, SeasonsQueryVariables>;
export const DriverPodiumsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"driverPodiums"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"ROUND_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"positionOrder"}}]}}]}}]}}]} as unknown as DocumentNode<DriverPodiumsQuery, DriverPodiumsQueryVariables>;
export const DriverPointsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"driverPoints"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"ROUND_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"points"}}]}}]}}]}}]} as unknown as DocumentNode<DriverPointsQuery, DriverPointsQueryVariables>;
export const DriverQualifyingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"driverQualifying"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"ROUND_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"qualifyings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"POSITION_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"driver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentTeam"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamId"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<DriverQualifyingQuery, DriverQualifyingQueryVariables>;
export const QualifyingQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"qualifyingQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"round"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"race"},"name":{"kind":"Name","value":"raceByYearAndRound"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}},{"kind":"Argument","name":{"kind":"Name","value":"round"},"value":{"kind":"Variable","name":{"kind":"Name","value":"round"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"qualifyings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"driver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamsByYear"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"q1"}},{"kind":"Field","name":{"kind":"Name","value":"q2"}},{"kind":"Field","name":{"kind":"Name","value":"q3"}}]}}]}}]}}]} as unknown as DocumentNode<QualifyingQueryQuery, QualifyingQueryQueryVariables>;
export const PitStopsBySeasonRoundDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"pitStopsBySeasonRound"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"round"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"race"},"name":{"kind":"Name","value":"raceByYearAndRound"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}},{"kind":"Argument","name":{"kind":"Name","value":"round"},"value":{"kind":"Variable","name":{"kind":"Name","value":"round"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pitStops"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lap"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"milliseconds"}},{"kind":"Field","name":{"kind":"Name","value":"driver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"currentTeam"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"primary"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<PitStopsBySeasonRoundQuery, PitStopsBySeasonRoundQueryVariables>;
export const RaceFastestLapQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"raceFastestLapQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"round"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"round"},"value":{"kind":"Variable","name":{"kind":"Name","value":"round"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lapTimes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"MILLISECONDS_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lap"}},{"kind":"Field","name":{"kind":"Name","value":"milliseconds"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}}]}}]}}]}}]} as unknown as DocumentNode<RaceFastestLapQueryQuery, RaceFastestLapQueryQueryVariables>;
export const RaceLapLeaderQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"raceLapLeaderQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"round"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"round"},"value":{"kind":"Variable","name":{"kind":"Name","value":"round"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"ROUND_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lapTimes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"position"},"value":{"kind":"IntValue","value":"1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driverId"}}]}}]}}]}}]} as unknown as DocumentNode<RaceLapLeaderQueryQuery, RaceLapLeaderQueryQueryVariables>;
export const RacePolesLeaderQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"racePolesLeaderQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"round"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"round"},"value":{"kind":"Variable","name":{"kind":"Name","value":"round"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"qualifyings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"position"},"value":{"kind":"IntValue","value":"1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driverId"}}]}}]}}]}}]} as unknown as DocumentNode<RacePolesLeaderQueryQuery, RacePolesLeaderQueryQueryVariables>;
export const RacePositionsGainedLeaderQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"racePositionsGainedLeaderQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"round"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"round"},"value":{"kind":"Variable","name":{"kind":"Name","value":"round"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"grid"}},{"kind":"Field","name":{"kind":"Name","value":"positionOrder"}}]}}]}}]}}]} as unknown as DocumentNode<RacePositionsGainedLeaderQueryQuery, RacePositionsGainedLeaderQueryQueryVariables>;
export const SeasonConstructorChampionQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"seasonConstructorChampionQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"finalTeamStandingsByYears"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"POSITION_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamId"}}]}}]}}]} as unknown as DocumentNode<SeasonConstructorChampionQueryQuery, SeasonConstructorChampionQueryQueryVariables>;
export const SeasonDnFsLeaderQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"seasonDNFsLeaderQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"ROUND_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"position"},"value":{"kind":"NullValue"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driverId"}}]}}]}}]}}]} as unknown as DocumentNode<SeasonDnFsLeaderQueryQuery, SeasonDnFsLeaderQueryQueryVariables>;
export const SeasonDriverChampionQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"seasonDriverChampionQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driverStandingsBySeasons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"POSITION_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driverId"}}]}}]}}]} as unknown as DocumentNode<SeasonDriverChampionQueryQuery, SeasonDriverChampionQueryQueryVariables>;
export const SeasonFastestLapQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"seasonFastestLapQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"lapTimes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"MILLISECONDS_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lap"}},{"kind":"Field","name":{"kind":"Name","value":"milliseconds"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}}]}}]}}]}}]} as unknown as DocumentNode<SeasonFastestLapQueryQuery, SeasonFastestLapQueryQueryVariables>;
export const SeasonLapLeaderQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"seasonLapLeaderQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"ROUND_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lapTimes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"position"},"value":{"kind":"IntValue","value":"1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driverId"}}]}}]}}]}}]} as unknown as DocumentNode<SeasonLapLeaderQueryQuery, SeasonLapLeaderQueryQueryVariables>;
export const SeasonPolesLeaderQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"seasonPolesLeaderQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"ROUND_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"qualifyings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"position"},"value":{"kind":"IntValue","value":"1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driverId"}}]}}]}}]}}]} as unknown as DocumentNode<SeasonPolesLeaderQueryQuery, SeasonPolesLeaderQueryQueryVariables>;
export const SeasonPositionsGainedLeaderQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"seasonPositionsGainedLeaderQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"ROUND_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"grid"}},{"kind":"Field","name":{"kind":"Name","value":"positionOrder"}}]}}]}}]}}]} as unknown as DocumentNode<SeasonPositionsGainedLeaderQueryQuery, SeasonPositionsGainedLeaderQueryQueryVariables>;
export const SeasonSprintWinsLeaderQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"seasonSprintWinsLeaderQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"ROUND_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sprintResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"positionOrder"},"value":{"kind":"IntValue","value":"1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driverId"}}]}}]}}]}}]} as unknown as DocumentNode<SeasonSprintWinsLeaderQueryQuery, SeasonSprintWinsLeaderQueryQueryVariables>;
export const SeasonWinsLeaderQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"seasonWinsLeaderQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"ROUND_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"positionOrder"},"value":{"kind":"IntValue","value":"1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driverId"}}]}}]}}]}}]} as unknown as DocumentNode<SeasonWinsLeaderQueryQuery, SeasonWinsLeaderQueryQueryVariables>;
export const RaceBySeasonRoundDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"raceBySeasonRound"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"round"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"round"},"value":{"kind":"Variable","name":{"kind":"Name","value":"round"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"summary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"extract"}}]}},{"kind":"Field","name":{"kind":"Name","value":"circuit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"circuitRef"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}},{"kind":"Field","name":{"kind":"Name","value":"circuitDescription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driverId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"grid"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"positionText"}},{"kind":"Field","name":{"kind":"Name","value":"positionOrder"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"laps"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"milliseconds"}},{"kind":"Field","name":{"kind":"Name","value":"fastestLap"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"fastestLapTime"}},{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"sprintResults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driverId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"grid"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"positionText"}},{"kind":"Field","name":{"kind":"Name","value":"positionOrder"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"laps"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"milliseconds"}},{"kind":"Field","name":{"kind":"Name","value":"fastestLap"}},{"kind":"Field","name":{"kind":"Name","value":"fastestLapTime"}},{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RaceBySeasonRoundQuery, RaceBySeasonRoundQueryVariables>;