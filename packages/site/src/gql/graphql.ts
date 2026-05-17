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
  /** A floating point number that requires more precision than IEEE 754 binary 64 */
  BigFloat: { input: any; output: any; }
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: { input: any; output: any; }
  /** A calendar date in YYYY-MM-DD format. */
  Date: { input: any; output: any; }
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) and, if it has a timezone, [RFC
   * 3339](https://datatracker.ietf.org/doc/html/rfc3339) standards. Input values
   * that do not conform to both ISO 8601 and RFC 3339 may be coerced, which may lead
   * to unexpected results.
   */
  Datetime: { input: any; output: any; }
};

export type AppCircuitDescription = Node & {
  __typename?: 'AppCircuitDescription';
  /** Reads a single `Circuit` that is related to this `AppCircuitDescription`. */
  circuit?: Maybe<Circuit>;
  circuitId: Scalars['String']['output'];
  description: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  updatedAt: Scalars['Datetime']['output'];
};

/**
 * A condition to be used against `AppCircuitDescription` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type AppCircuitDescriptionCondition = {
  /** Checks for equality with the object’s `circuitId` field. */
  circuitId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `AppCircuitDescription` values. */
export type AppCircuitDescriptionConnection = {
  __typename?: 'AppCircuitDescriptionConnection';
  /** A list of edges which contains the `AppCircuitDescription` and cursor to aid in pagination. */
  edges: Array<Maybe<AppCircuitDescriptionEdge>>;
  /** A list of `AppCircuitDescription` objects. */
  nodes: Array<Maybe<AppCircuitDescription>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AppCircuitDescription` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AppCircuitDescription` edge in the connection. */
export type AppCircuitDescriptionEdge = {
  __typename?: 'AppCircuitDescriptionEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AppCircuitDescription` at the end of the edge. */
  node?: Maybe<AppCircuitDescription>;
};

/** An input for mutations affecting `AppCircuitDescription` */
export type AppCircuitDescriptionInput = {
  circuitId: Scalars['String']['input'];
  description: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Methods to use when ordering `AppCircuitDescription`. */
export enum AppCircuitDescriptionOrderBy {
  CircuitIdAsc = 'CIRCUIT_ID_ASC',
  CircuitIdDesc = 'CIRCUIT_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** Represents an update to a `AppCircuitDescription`. Fields that are set will be updated. */
export type AppCircuitDescriptionPatch = {
  circuitId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type AppConstructorBio = Node & {
  __typename?: 'AppConstructorBio';
  description?: Maybe<Scalars['String']['output']>;
  extract?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  source?: Maybe<Scalars['String']['output']>;
  teamId: Scalars['String']['output'];
  thumbnailUrl?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Datetime']['output'];
};

/**
 * A condition to be used against `AppConstructorBio` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type AppConstructorBioCondition = {
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `AppConstructorBio` values. */
export type AppConstructorBioConnection = {
  __typename?: 'AppConstructorBioConnection';
  /** A list of edges which contains the `AppConstructorBio` and cursor to aid in pagination. */
  edges: Array<Maybe<AppConstructorBioEdge>>;
  /** A list of `AppConstructorBio` objects. */
  nodes: Array<Maybe<AppConstructorBio>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AppConstructorBio` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AppConstructorBio` edge in the connection. */
export type AppConstructorBioEdge = {
  __typename?: 'AppConstructorBioEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AppConstructorBio` at the end of the edge. */
  node?: Maybe<AppConstructorBio>;
};

/** An input for mutations affecting `AppConstructorBio` */
export type AppConstructorBioInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  extract?: InputMaybe<Scalars['String']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
  teamId: Scalars['String']['input'];
  thumbnailUrl?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Methods to use when ordering `AppConstructorBio`. */
export enum AppConstructorBioOrderBy {
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC'
}

/** Represents an update to a `AppConstructorBio`. Fields that are set will be updated. */
export type AppConstructorBioPatch = {
  description?: InputMaybe<Scalars['String']['input']>;
  extract?: InputMaybe<Scalars['String']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
  thumbnailUrl?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type AppDriverBio = Node & {
  __typename?: 'AppDriverBio';
  description?: Maybe<Scalars['String']['output']>;
  driverId: Scalars['String']['output'];
  extract?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  source?: Maybe<Scalars['String']['output']>;
  thumbnailUrl?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Datetime']['output'];
};

/**
 * A condition to be used against `AppDriverBio` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type AppDriverBioCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `AppDriverBio` values. */
export type AppDriverBioConnection = {
  __typename?: 'AppDriverBioConnection';
  /** A list of edges which contains the `AppDriverBio` and cursor to aid in pagination. */
  edges: Array<Maybe<AppDriverBioEdge>>;
  /** A list of `AppDriverBio` objects. */
  nodes: Array<Maybe<AppDriverBio>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AppDriverBio` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AppDriverBio` edge in the connection. */
export type AppDriverBioEdge = {
  __typename?: 'AppDriverBioEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AppDriverBio` at the end of the edge. */
  node?: Maybe<AppDriverBio>;
};

/** An input for mutations affecting `AppDriverBio` */
export type AppDriverBioInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  driverId: Scalars['String']['input'];
  extract?: InputMaybe<Scalars['String']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
  thumbnailUrl?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Methods to use when ordering `AppDriverBio`. */
export enum AppDriverBioOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** Represents an update to a `AppDriverBio`. Fields that are set will be updated. */
export type AppDriverBioPatch = {
  description?: InputMaybe<Scalars['String']['input']>;
  driverId?: InputMaybe<Scalars['String']['input']>;
  extract?: InputMaybe<Scalars['String']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
  thumbnailUrl?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type AppIngestState = Node & {
  __typename?: 'AppIngestState';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  updatedAt: Scalars['Datetime']['output'];
  value?: Maybe<Scalars['String']['output']>;
};

/**
 * A condition to be used against `AppIngestState` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type AppIngestStateCondition = {
  /** Checks for equality with the object’s `key` field. */
  key?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `AppIngestState` values. */
export type AppIngestStateConnection = {
  __typename?: 'AppIngestStateConnection';
  /** A list of edges which contains the `AppIngestState` and cursor to aid in pagination. */
  edges: Array<Maybe<AppIngestStateEdge>>;
  /** A list of `AppIngestState` objects. */
  nodes: Array<Maybe<AppIngestState>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AppIngestState` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AppIngestState` edge in the connection. */
export type AppIngestStateEdge = {
  __typename?: 'AppIngestStateEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AppIngestState` at the end of the edge. */
  node?: Maybe<AppIngestState>;
};

/** An input for mutations affecting `AppIngestState` */
export type AppIngestStateInput = {
  key: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `AppIngestState`. */
export enum AppIngestStateOrderBy {
  KeyAsc = 'KEY_ASC',
  KeyDesc = 'KEY_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** Represents an update to a `AppIngestState`. Fields that are set will be updated. */
export type AppIngestStatePatch = {
  key?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type AppLapTime = Node & {
  __typename?: 'AppLapTime';
  /** Reads a single `Driver` that is related to this `AppLapTime`. */
  driver?: Maybe<Driver>;
  driverId: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  lap: Scalars['Int']['output'];
  milliseconds?: Maybe<Scalars['Int']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `Race` that is related to this `AppLapTime`. */
  race?: Maybe<Race>;
  raceId: Scalars['Int']['output'];
  timeText?: Maybe<Scalars['String']['output']>;
};

/**
 * A condition to be used against `AppLapTime` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type AppLapTimeCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `lap` field. */
  lap?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `AppLapTime` values. */
export type AppLapTimeConnection = {
  __typename?: 'AppLapTimeConnection';
  /** A list of edges which contains the `AppLapTime` and cursor to aid in pagination. */
  edges: Array<Maybe<AppLapTimeEdge>>;
  /** A list of `AppLapTime` objects. */
  nodes: Array<Maybe<AppLapTime>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AppLapTime` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AppLapTime` edge in the connection. */
export type AppLapTimeEdge = {
  __typename?: 'AppLapTimeEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AppLapTime` at the end of the edge. */
  node?: Maybe<AppLapTime>;
};

/** An input for mutations affecting `AppLapTime` */
export type AppLapTimeInput = {
  driverId: Scalars['String']['input'];
  lap: Scalars['Int']['input'];
  milliseconds?: InputMaybe<Scalars['Int']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  raceId: Scalars['Int']['input'];
  timeText?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `AppLapTime`. */
export enum AppLapTimeOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  LapAsc = 'LAP_ASC',
  LapDesc = 'LAP_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC'
}

/** Represents an update to a `AppLapTime`. Fields that are set will be updated. */
export type AppLapTimePatch = {
  driverId?: InputMaybe<Scalars['String']['input']>;
  lap?: InputMaybe<Scalars['Int']['input']>;
  milliseconds?: InputMaybe<Scalars['Int']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  timeText?: InputMaybe<Scalars['String']['input']>;
};

export type AppTeamColor = Node & {
  __typename?: 'AppTeamColor';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  logo?: Maybe<Scalars['String']['output']>;
  primaryHex?: Maybe<Scalars['String']['output']>;
  secondaryHex?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Team` that is related to this `AppTeamColor`. */
  team?: Maybe<Team>;
  teamId: Scalars['String']['output'];
};

/**
 * A condition to be used against `AppTeamColor` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type AppTeamColorCondition = {
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `AppTeamColor` values. */
export type AppTeamColorConnection = {
  __typename?: 'AppTeamColorConnection';
  /** A list of edges which contains the `AppTeamColor` and cursor to aid in pagination. */
  edges: Array<Maybe<AppTeamColorEdge>>;
  /** A list of `AppTeamColor` objects. */
  nodes: Array<Maybe<AppTeamColor>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AppTeamColor` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AppTeamColor` edge in the connection. */
export type AppTeamColorEdge = {
  __typename?: 'AppTeamColorEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AppTeamColor` at the end of the edge. */
  node?: Maybe<AppTeamColor>;
};

/** An input for mutations affecting `AppTeamColor` */
export type AppTeamColorInput = {
  logo?: InputMaybe<Scalars['String']['input']>;
  primaryHex?: InputMaybe<Scalars['String']['input']>;
  secondaryHex?: InputMaybe<Scalars['String']['input']>;
  teamId: Scalars['String']['input'];
};

/** Methods to use when ordering `AppTeamColor`. */
export enum AppTeamColorOrderBy {
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC'
}

/** Represents an update to a `AppTeamColor`. Fields that are set will be updated. */
export type AppTeamColorPatch = {
  logo?: InputMaybe<Scalars['String']['input']>;
  primaryHex?: InputMaybe<Scalars['String']['input']>;
  secondaryHex?: InputMaybe<Scalars['String']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
};

export type AppTeamHistory = Node & {
  __typename?: 'AppTeamHistory';
  /** Reads a single `Team` that is related to this `AppTeamHistory`. */
  antecedentTeam?: Maybe<Team>;
  antecedentTeamId: Scalars['String']['output'];
  endYear?: Maybe<Scalars['Int']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  startYear: Scalars['Int']['output'];
  /** Reads a single `Team` that is related to this `AppTeamHistory`. */
  team?: Maybe<Team>;
  teamId: Scalars['String']['output'];
};

/**
 * A condition to be used against `AppTeamHistory` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type AppTeamHistoryCondition = {
  /** Checks for equality with the object’s `antecedentTeamId` field. */
  antecedentTeamId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `startYear` field. */
  startYear?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `AppTeamHistory` values. */
export type AppTeamHistoryConnection = {
  __typename?: 'AppTeamHistoryConnection';
  /** A list of edges which contains the `AppTeamHistory` and cursor to aid in pagination. */
  edges: Array<Maybe<AppTeamHistoryEdge>>;
  /** A list of `AppTeamHistory` objects. */
  nodes: Array<Maybe<AppTeamHistory>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AppTeamHistory` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AppTeamHistory` edge in the connection. */
export type AppTeamHistoryEdge = {
  __typename?: 'AppTeamHistoryEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AppTeamHistory` at the end of the edge. */
  node?: Maybe<AppTeamHistory>;
};

/** An input for mutations affecting `AppTeamHistory` */
export type AppTeamHistoryInput = {
  antecedentTeamId: Scalars['String']['input'];
  endYear?: InputMaybe<Scalars['Int']['input']>;
  startYear?: InputMaybe<Scalars['Int']['input']>;
  teamId: Scalars['String']['input'];
};

/** Methods to use when ordering `AppTeamHistory`. */
export enum AppTeamHistoryOrderBy {
  AntecedentTeamIdAsc = 'ANTECEDENT_TEAM_ID_ASC',
  AntecedentTeamIdDesc = 'ANTECEDENT_TEAM_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  StartYearAsc = 'START_YEAR_ASC',
  StartYearDesc = 'START_YEAR_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC'
}

/** Represents an update to a `AppTeamHistory`. Fields that are set will be updated. */
export type AppTeamHistoryPatch = {
  antecedentTeamId?: InputMaybe<Scalars['String']['input']>;
  endYear?: InputMaybe<Scalars['Int']['input']>;
  startYear?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
};

export type Chassis = Node & {
  __typename?: 'Chassis';
  fullName: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  rowId: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `SeasonEntrantChassis`. */
  seasonEntrantChassises: SeasonEntrantChassisConnection;
  /** Reads a single `Team` that is related to this `Chassis`. */
  team?: Maybe<Team>;
  teamId: Scalars['String']['output'];
};


export type ChassisSeasonEntrantChassisesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantChassisCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantChassisOrderBy>>;
};

/** A condition to be used against `Chassis` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ChassisCondition = {
  /** Checks for equality with the object’s `fullName` field. */
  fullName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `Chassis` values. */
export type ChassisConnection = {
  __typename?: 'ChassisConnection';
  /** A list of edges which contains the `Chassis` and cursor to aid in pagination. */
  edges: Array<Maybe<ChassisEdge>>;
  /** A list of `Chassis` objects. */
  nodes: Array<Maybe<Chassis>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Chassis` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Chassis` edge in the connection. */
export type ChassisEdge = {
  __typename?: 'ChassisEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Chassis` at the end of the edge. */
  node?: Maybe<Chassis>;
};

/** An input for mutations affecting `Chassis` */
export type ChassisInput = {
  fullName: Scalars['String']['input'];
  name: Scalars['String']['input'];
  rowId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
};

/** Methods to use when ordering `Chassis`. */
export enum ChassisOrderBy {
  FullNameAsc = 'FULL_NAME_ASC',
  FullNameDesc = 'FULL_NAME_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC'
}

/** Represents an update to a `Chassis`. Fields that are set will be updated. */
export type ChassisPatch = {
  fullName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['String']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
};

export type Circuit = Node & {
  __typename?: 'Circuit';
  /** Reads and enables pagination through a set of `CircuitLayout`. */
  circuitLayouts: CircuitLayoutConnection;
  /** Reads a single `Country` that is related to this `Circuit`. */
  country?: Maybe<Country>;
  countryId: Scalars['String']['output'];
  /** Reads a single `AppCircuitDescription` that is related to this `Circuit`. */
  description?: Maybe<AppCircuitDescription>;
  direction: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  latitude: Scalars['BigFloat']['output'];
  length: Scalars['BigFloat']['output'];
  longitude: Scalars['BigFloat']['output'];
  name: Scalars['String']['output'];
  placeName: Scalars['String']['output'];
  previousNames?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `Race`. */
  races: RaceConnection;
  rowId: Scalars['String']['output'];
  totalRacesHeld: Scalars['Int']['output'];
  turns: Scalars['Int']['output'];
  type: Scalars['String']['output'];
};


export type CircuitCircuitLayoutsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CircuitLayoutCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CircuitLayoutOrderBy>>;
};


export type CircuitRacesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RaceCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceOrderBy>>;
};

/** A condition to be used against `Circuit` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type CircuitCondition = {
  /** Checks for equality with the object’s `countryId` field. */
  countryId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `direction` field. */
  direction?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `fullName` field. */
  fullName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `placeName` field. */
  placeName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `Circuit` values. */
export type CircuitConnection = {
  __typename?: 'CircuitConnection';
  /** A list of edges which contains the `Circuit` and cursor to aid in pagination. */
  edges: Array<Maybe<CircuitEdge>>;
  /** A list of `Circuit` objects. */
  nodes: Array<Maybe<Circuit>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Circuit` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Circuit` edge in the connection. */
export type CircuitEdge = {
  __typename?: 'CircuitEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Circuit` at the end of the edge. */
  node?: Maybe<Circuit>;
};

/** An input for mutations affecting `Circuit` */
export type CircuitInput = {
  countryId: Scalars['String']['input'];
  direction: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  latitude: Scalars['BigFloat']['input'];
  length: Scalars['BigFloat']['input'];
  longitude: Scalars['BigFloat']['input'];
  name: Scalars['String']['input'];
  placeName: Scalars['String']['input'];
  previousNames?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['String']['input'];
  totalRacesHeld: Scalars['Int']['input'];
  turns: Scalars['Int']['input'];
  type: Scalars['String']['input'];
};

export type CircuitLayout = Node & {
  __typename?: 'CircuitLayout';
  /** Reads a single `Circuit` that is related to this `CircuitLayout`. */
  circuit?: Maybe<Circuit>;
  circuitId: Scalars['String']['output'];
  effective: Scalars['Boolean']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  length: Scalars['BigFloat']['output'];
  /** Reads and enables pagination through a set of `Race`. */
  races: RaceConnection;
  rowId: Scalars['String']['output'];
  turns: Scalars['Int']['output'];
};


export type CircuitLayoutRacesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RaceCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceOrderBy>>;
};

/**
 * A condition to be used against `CircuitLayout` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type CircuitLayoutCondition = {
  /** Checks for equality with the object’s `circuitId` field. */
  circuitId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `CircuitLayout` values. */
export type CircuitLayoutConnection = {
  __typename?: 'CircuitLayoutConnection';
  /** A list of edges which contains the `CircuitLayout` and cursor to aid in pagination. */
  edges: Array<Maybe<CircuitLayoutEdge>>;
  /** A list of `CircuitLayout` objects. */
  nodes: Array<Maybe<CircuitLayout>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CircuitLayout` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `CircuitLayout` edge in the connection. */
export type CircuitLayoutEdge = {
  __typename?: 'CircuitLayoutEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `CircuitLayout` at the end of the edge. */
  node?: Maybe<CircuitLayout>;
};

/** An input for mutations affecting `CircuitLayout` */
export type CircuitLayoutInput = {
  circuitId: Scalars['String']['input'];
  effective: Scalars['Boolean']['input'];
  length: Scalars['BigFloat']['input'];
  rowId: Scalars['String']['input'];
  turns: Scalars['Int']['input'];
};

/** Methods to use when ordering `CircuitLayout`. */
export enum CircuitLayoutOrderBy {
  CircuitIdAsc = 'CIRCUIT_ID_ASC',
  CircuitIdDesc = 'CIRCUIT_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** Represents an update to a `CircuitLayout`. Fields that are set will be updated. */
export type CircuitLayoutPatch = {
  circuitId?: InputMaybe<Scalars['String']['input']>;
  effective?: InputMaybe<Scalars['Boolean']['input']>;
  length?: InputMaybe<Scalars['BigFloat']['input']>;
  rowId?: InputMaybe<Scalars['String']['input']>;
  turns?: InputMaybe<Scalars['Int']['input']>;
};

/** Methods to use when ordering `Circuit`. */
export enum CircuitOrderBy {
  CountryIdAsc = 'COUNTRY_ID_ASC',
  CountryIdDesc = 'COUNTRY_ID_DESC',
  DirectionAsc = 'DIRECTION_ASC',
  DirectionDesc = 'DIRECTION_DESC',
  FullNameAsc = 'FULL_NAME_ASC',
  FullNameDesc = 'FULL_NAME_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PlaceNameAsc = 'PLACE_NAME_ASC',
  PlaceNameDesc = 'PLACE_NAME_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC'
}

/** Represents an update to a `Circuit`. Fields that are set will be updated. */
export type CircuitPatch = {
  countryId?: InputMaybe<Scalars['String']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['BigFloat']['input']>;
  length?: InputMaybe<Scalars['BigFloat']['input']>;
  longitude?: InputMaybe<Scalars['BigFloat']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  placeName?: InputMaybe<Scalars['String']['input']>;
  previousNames?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['String']['input']>;
  totalRacesHeld?: InputMaybe<Scalars['Int']['input']>;
  turns?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type Continent = Node & {
  __typename?: 'Continent';
  code: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `Country`. */
  countries: CountryConnection;
  demonym: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  rowId: Scalars['String']['output'];
};


export type ContinentCountriesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CountryCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CountryOrderBy>>;
};

/**
 * A condition to be used against `Continent` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type ContinentCondition = {
  /** Checks for equality with the object’s `code` field. */
  code?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `Continent` values. */
export type ContinentConnection = {
  __typename?: 'ContinentConnection';
  /** A list of edges which contains the `Continent` and cursor to aid in pagination. */
  edges: Array<Maybe<ContinentEdge>>;
  /** A list of `Continent` objects. */
  nodes: Array<Maybe<Continent>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Continent` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Continent` edge in the connection. */
export type ContinentEdge = {
  __typename?: 'ContinentEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Continent` at the end of the edge. */
  node?: Maybe<Continent>;
};

/** An input for mutations affecting `Continent` */
export type ContinentInput = {
  code: Scalars['String']['input'];
  demonym: Scalars['String']['input'];
  name: Scalars['String']['input'];
  rowId: Scalars['String']['input'];
};

/** Methods to use when ordering `Continent`. */
export enum ContinentOrderBy {
  CodeAsc = 'CODE_ASC',
  CodeDesc = 'CODE_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** Represents an update to a `Continent`. Fields that are set will be updated. */
export type ContinentPatch = {
  code?: InputMaybe<Scalars['String']['input']>;
  demonym?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['String']['input']>;
};

export type Country = Node & {
  __typename?: 'Country';
  alpha2Code: Scalars['String']['output'];
  alpha3Code: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `Circuit`. */
  circuits: CircuitConnection;
  /** Reads a single `Continent` that is related to this `Country`. */
  continent?: Maybe<Continent>;
  continentId: Scalars['String']['output'];
  demonym?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `Driver`. */
  driversByCountryOfBirthCountryId: DriverConnection;
  /** Reads and enables pagination through a set of `Driver`. */
  driversByNationalityCountryId: DriverConnection;
  /** Reads and enables pagination through a set of `Driver`. */
  driversBySecondNationalityCountryId: DriverConnection;
  /** Reads and enables pagination through a set of `EngineManufacturer`. */
  engineManufacturers: EngineManufacturerConnection;
  /** Reads and enables pagination through a set of `GrandPrix`. */
  grandPrixes: GrandPrixConnection;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  iocCode?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  rowId: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `SeasonEntrant`. */
  seasonEntrants: SeasonEntrantConnection;
  /** Reads and enables pagination through a set of `Team`. */
  teams: TeamConnection;
  /** Reads and enables pagination through a set of `TyreManufacturer`. */
  tyreManufacturers: TyreManufacturerConnection;
};


export type CountryCircuitsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CircuitCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CircuitOrderBy>>;
};


export type CountryDriversByCountryOfBirthCountryIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DriverCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverOrderBy>>;
};


export type CountryDriversByNationalityCountryIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DriverCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverOrderBy>>;
};


export type CountryDriversBySecondNationalityCountryIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DriverCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverOrderBy>>;
};


export type CountryEngineManufacturersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<EngineManufacturerCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EngineManufacturerOrderBy>>;
};


export type CountryGrandPrixesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<GrandPrixCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GrandPrixOrderBy>>;
};


export type CountrySeasonEntrantsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantOrderBy>>;
};


export type CountryTeamsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamOrderBy>>;
};


export type CountryTyreManufacturersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TyreManufacturerCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TyreManufacturerOrderBy>>;
};

/** A condition to be used against `Country` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type CountryCondition = {
  /** Checks for equality with the object’s `alpha2Code` field. */
  alpha2Code?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `alpha3Code` field. */
  alpha3Code?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `continentId` field. */
  continentId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `Country` values. */
export type CountryConnection = {
  __typename?: 'CountryConnection';
  /** A list of edges which contains the `Country` and cursor to aid in pagination. */
  edges: Array<Maybe<CountryEdge>>;
  /** A list of `Country` objects. */
  nodes: Array<Maybe<Country>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Country` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Country` edge in the connection. */
export type CountryEdge = {
  __typename?: 'CountryEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Country` at the end of the edge. */
  node?: Maybe<Country>;
};

/** An input for mutations affecting `Country` */
export type CountryInput = {
  alpha2Code: Scalars['String']['input'];
  alpha3Code: Scalars['String']['input'];
  continentId: Scalars['String']['input'];
  demonym?: InputMaybe<Scalars['String']['input']>;
  iocCode?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  rowId: Scalars['String']['input'];
};

/** Methods to use when ordering `Country`. */
export enum CountryOrderBy {
  Alpha2CodeAsc = 'ALPHA2_CODE_ASC',
  Alpha2CodeDesc = 'ALPHA2_CODE_DESC',
  Alpha3CodeAsc = 'ALPHA3_CODE_ASC',
  Alpha3CodeDesc = 'ALPHA3_CODE_DESC',
  ContinentIdAsc = 'CONTINENT_ID_ASC',
  ContinentIdDesc = 'CONTINENT_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** Represents an update to a `Country`. Fields that are set will be updated. */
export type CountryPatch = {
  alpha2Code?: InputMaybe<Scalars['String']['input']>;
  alpha3Code?: InputMaybe<Scalars['String']['input']>;
  continentId?: InputMaybe<Scalars['String']['input']>;
  demonym?: InputMaybe<Scalars['String']['input']>;
  iocCode?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['String']['input']>;
};

/** All input for the create `AppCircuitDescription` mutation. */
export type CreateAppCircuitDescriptionInput = {
  /** The `AppCircuitDescription` to be created by this mutation. */
  appCircuitDescription: AppCircuitDescriptionInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our create `AppCircuitDescription` mutation. */
export type CreateAppCircuitDescriptionPayload = {
  __typename?: 'CreateAppCircuitDescriptionPayload';
  /** The `AppCircuitDescription` that was created by this mutation. */
  appCircuitDescription?: Maybe<AppCircuitDescription>;
  /** An edge for our `AppCircuitDescription`. May be used by Relay 1. */
  appCircuitDescriptionEdge?: Maybe<AppCircuitDescriptionEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `AppCircuitDescription` mutation. */
export type CreateAppCircuitDescriptionPayloadAppCircuitDescriptionEdgeArgs = {
  orderBy?: Array<AppCircuitDescriptionOrderBy>;
};

/** All input for the create `AppConstructorBio` mutation. */
export type CreateAppConstructorBioInput = {
  /** The `AppConstructorBio` to be created by this mutation. */
  appConstructorBio: AppConstructorBioInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our create `AppConstructorBio` mutation. */
export type CreateAppConstructorBioPayload = {
  __typename?: 'CreateAppConstructorBioPayload';
  /** The `AppConstructorBio` that was created by this mutation. */
  appConstructorBio?: Maybe<AppConstructorBio>;
  /** An edge for our `AppConstructorBio`. May be used by Relay 1. */
  appConstructorBioEdge?: Maybe<AppConstructorBioEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `AppConstructorBio` mutation. */
export type CreateAppConstructorBioPayloadAppConstructorBioEdgeArgs = {
  orderBy?: Array<AppConstructorBioOrderBy>;
};

/** All input for the create `AppDriverBio` mutation. */
export type CreateAppDriverBioInput = {
  /** The `AppDriverBio` to be created by this mutation. */
  appDriverBio: AppDriverBioInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our create `AppDriverBio` mutation. */
export type CreateAppDriverBioPayload = {
  __typename?: 'CreateAppDriverBioPayload';
  /** The `AppDriverBio` that was created by this mutation. */
  appDriverBio?: Maybe<AppDriverBio>;
  /** An edge for our `AppDriverBio`. May be used by Relay 1. */
  appDriverBioEdge?: Maybe<AppDriverBioEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `AppDriverBio` mutation. */
export type CreateAppDriverBioPayloadAppDriverBioEdgeArgs = {
  orderBy?: Array<AppDriverBioOrderBy>;
};

/** All input for the create `AppIngestState` mutation. */
export type CreateAppIngestStateInput = {
  /** The `AppIngestState` to be created by this mutation. */
  appIngestState: AppIngestStateInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our create `AppIngestState` mutation. */
export type CreateAppIngestStatePayload = {
  __typename?: 'CreateAppIngestStatePayload';
  /** The `AppIngestState` that was created by this mutation. */
  appIngestState?: Maybe<AppIngestState>;
  /** An edge for our `AppIngestState`. May be used by Relay 1. */
  appIngestStateEdge?: Maybe<AppIngestStateEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `AppIngestState` mutation. */
export type CreateAppIngestStatePayloadAppIngestStateEdgeArgs = {
  orderBy?: Array<AppIngestStateOrderBy>;
};

/** All input for the create `AppLapTime` mutation. */
export type CreateAppLapTimeInput = {
  /** The `AppLapTime` to be created by this mutation. */
  appLapTime: AppLapTimeInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our create `AppLapTime` mutation. */
export type CreateAppLapTimePayload = {
  __typename?: 'CreateAppLapTimePayload';
  /** The `AppLapTime` that was created by this mutation. */
  appLapTime?: Maybe<AppLapTime>;
  /** An edge for our `AppLapTime`. May be used by Relay 1. */
  appLapTimeEdge?: Maybe<AppLapTimeEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `AppLapTime` mutation. */
export type CreateAppLapTimePayloadAppLapTimeEdgeArgs = {
  orderBy?: Array<AppLapTimeOrderBy>;
};

/** All input for the create `AppTeamColor` mutation. */
export type CreateAppTeamColorInput = {
  /** The `AppTeamColor` to be created by this mutation. */
  appTeamColor: AppTeamColorInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our create `AppTeamColor` mutation. */
export type CreateAppTeamColorPayload = {
  __typename?: 'CreateAppTeamColorPayload';
  /** The `AppTeamColor` that was created by this mutation. */
  appTeamColor?: Maybe<AppTeamColor>;
  /** An edge for our `AppTeamColor`. May be used by Relay 1. */
  appTeamColorEdge?: Maybe<AppTeamColorEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `AppTeamColor` mutation. */
export type CreateAppTeamColorPayloadAppTeamColorEdgeArgs = {
  orderBy?: Array<AppTeamColorOrderBy>;
};

/** All input for the create `AppTeamHistory` mutation. */
export type CreateAppTeamHistoryInput = {
  /** The `AppTeamHistory` to be created by this mutation. */
  appTeamHistory: AppTeamHistoryInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our create `AppTeamHistory` mutation. */
export type CreateAppTeamHistoryPayload = {
  __typename?: 'CreateAppTeamHistoryPayload';
  /** The `AppTeamHistory` that was created by this mutation. */
  appTeamHistory?: Maybe<AppTeamHistory>;
  /** An edge for our `AppTeamHistory`. May be used by Relay 1. */
  appTeamHistoryEdge?: Maybe<AppTeamHistoryEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `AppTeamHistory` mutation. */
export type CreateAppTeamHistoryPayloadAppTeamHistoryEdgeArgs = {
  orderBy?: Array<AppTeamHistoryOrderBy>;
};

/** All input for the create `Chassis` mutation. */
export type CreateChassisInput = {
  /** The `Chassis` to be created by this mutation. */
  chassis: ChassisInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our create `Chassis` mutation. */
export type CreateChassisPayload = {
  __typename?: 'CreateChassisPayload';
  /** The `Chassis` that was created by this mutation. */
  chassis?: Maybe<Chassis>;
  /** An edge for our `Chassis`. May be used by Relay 1. */
  chassisEdge?: Maybe<ChassisEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Chassis` mutation. */
export type CreateChassisPayloadChassisEdgeArgs = {
  orderBy?: Array<ChassisOrderBy>;
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

/** All input for the create `CircuitLayout` mutation. */
export type CreateCircuitLayoutInput = {
  /** The `CircuitLayout` to be created by this mutation. */
  circuitLayout: CircuitLayoutInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our create `CircuitLayout` mutation. */
export type CreateCircuitLayoutPayload = {
  __typename?: 'CreateCircuitLayoutPayload';
  /** The `CircuitLayout` that was created by this mutation. */
  circuitLayout?: Maybe<CircuitLayout>;
  /** An edge for our `CircuitLayout`. May be used by Relay 1. */
  circuitLayoutEdge?: Maybe<CircuitLayoutEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `CircuitLayout` mutation. */
export type CreateCircuitLayoutPayloadCircuitLayoutEdgeArgs = {
  orderBy?: Array<CircuitLayoutOrderBy>;
};

/** The output of our create `Circuit` mutation. */
export type CreateCircuitPayload = {
  __typename?: 'CreateCircuitPayload';
  /** The `Circuit` that was created by this mutation. */
  circuit?: Maybe<Circuit>;
  /** An edge for our `Circuit`. May be used by Relay 1. */
  circuitEdge?: Maybe<CircuitEdge>;
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
  orderBy?: Array<CircuitOrderBy>;
};

/** All input for the create `Continent` mutation. */
export type CreateContinentInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Continent` to be created by this mutation. */
  continent: ContinentInput;
};

/** The output of our create `Continent` mutation. */
export type CreateContinentPayload = {
  __typename?: 'CreateContinentPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Continent` that was created by this mutation. */
  continent?: Maybe<Continent>;
  /** An edge for our `Continent`. May be used by Relay 1. */
  continentEdge?: Maybe<ContinentEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Continent` mutation. */
export type CreateContinentPayloadContinentEdgeArgs = {
  orderBy?: Array<ContinentOrderBy>;
};

/** All input for the create `Country` mutation. */
export type CreateCountryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Country` to be created by this mutation. */
  country: CountryInput;
};

/** The output of our create `Country` mutation. */
export type CreateCountryPayload = {
  __typename?: 'CreateCountryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Country` that was created by this mutation. */
  country?: Maybe<Country>;
  /** An edge for our `Country`. May be used by Relay 1. */
  countryEdge?: Maybe<CountryEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Country` mutation. */
export type CreateCountryPayloadCountryEdgeArgs = {
  orderBy?: Array<CountryOrderBy>;
};

/** All input for the create `DriverFamilyRelationship` mutation. */
export type CreateDriverFamilyRelationshipInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `DriverFamilyRelationship` to be created by this mutation. */
  driverFamilyRelationship: DriverFamilyRelationshipInput;
};

/** The output of our create `DriverFamilyRelationship` mutation. */
export type CreateDriverFamilyRelationshipPayload = {
  __typename?: 'CreateDriverFamilyRelationshipPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `DriverFamilyRelationship` that was created by this mutation. */
  driverFamilyRelationship?: Maybe<DriverFamilyRelationship>;
  /** An edge for our `DriverFamilyRelationship`. May be used by Relay 1. */
  driverFamilyRelationshipEdge?: Maybe<DriverFamilyRelationshipEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `DriverFamilyRelationship` mutation. */
export type CreateDriverFamilyRelationshipPayloadDriverFamilyRelationshipEdgeArgs = {
  orderBy?: Array<DriverFamilyRelationshipOrderBy>;
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

/** All input for the create `DriverOfTheDayResult` mutation. */
export type CreateDriverOfTheDayResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `DriverOfTheDayResult` to be created by this mutation. */
  driverOfTheDayResult: DriverOfTheDayResultInput;
};

/** The output of our create `DriverOfTheDayResult` mutation. */
export type CreateDriverOfTheDayResultPayload = {
  __typename?: 'CreateDriverOfTheDayResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `DriverOfTheDayResult` that was created by this mutation. */
  driverOfTheDayResult?: Maybe<DriverOfTheDayResult>;
  /** An edge for our `DriverOfTheDayResult`. May be used by Relay 1. */
  driverOfTheDayResultEdge?: Maybe<DriverOfTheDayResultEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `DriverOfTheDayResult` mutation. */
export type CreateDriverOfTheDayResultPayloadDriverOfTheDayResultEdgeArgs = {
  orderBy?: Array<DriverOfTheDayResultOrderBy>;
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
  driverEdge?: Maybe<DriverEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Driver` mutation. */
export type CreateDriverPayloadDriverEdgeArgs = {
  orderBy?: Array<DriverOrderBy>;
};

/** All input for the create `Engine` mutation. */
export type CreateEngineInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Engine` to be created by this mutation. */
  engine: EngineInput;
};

/** All input for the create `EngineManufacturer` mutation. */
export type CreateEngineManufacturerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `EngineManufacturer` to be created by this mutation. */
  engineManufacturer: EngineManufacturerInput;
};

/** The output of our create `EngineManufacturer` mutation. */
export type CreateEngineManufacturerPayload = {
  __typename?: 'CreateEngineManufacturerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `EngineManufacturer` that was created by this mutation. */
  engineManufacturer?: Maybe<EngineManufacturer>;
  /** An edge for our `EngineManufacturer`. May be used by Relay 1. */
  engineManufacturerEdge?: Maybe<EngineManufacturerEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `EngineManufacturer` mutation. */
export type CreateEngineManufacturerPayloadEngineManufacturerEdgeArgs = {
  orderBy?: Array<EngineManufacturerOrderBy>;
};

/** The output of our create `Engine` mutation. */
export type CreateEnginePayload = {
  __typename?: 'CreateEnginePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Engine` that was created by this mutation. */
  engine?: Maybe<Engine>;
  /** An edge for our `Engine`. May be used by Relay 1. */
  engineEdge?: Maybe<EngineEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Engine` mutation. */
export type CreateEnginePayloadEngineEdgeArgs = {
  orderBy?: Array<EngineOrderBy>;
};

/** All input for the create `Entrant` mutation. */
export type CreateEntrantInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Entrant` to be created by this mutation. */
  entrant: EntrantInput;
};

/** The output of our create `Entrant` mutation. */
export type CreateEntrantPayload = {
  __typename?: 'CreateEntrantPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Entrant` that was created by this mutation. */
  entrant?: Maybe<Entrant>;
  /** An edge for our `Entrant`. May be used by Relay 1. */
  entrantEdge?: Maybe<EntrantEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Entrant` mutation. */
export type CreateEntrantPayloadEntrantEdgeArgs = {
  orderBy?: Array<EntrantOrderBy>;
};

/** All input for the create `FastestLap` mutation. */
export type CreateFastestLapInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `FastestLap` to be created by this mutation. */
  fastestLap: FastestLapInput;
};

/** The output of our create `FastestLap` mutation. */
export type CreateFastestLapPayload = {
  __typename?: 'CreateFastestLapPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `FastestLap` that was created by this mutation. */
  fastestLap?: Maybe<FastestLap>;
  /** An edge for our `FastestLap`. May be used by Relay 1. */
  fastestLapEdge?: Maybe<FastestLapEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `FastestLap` mutation. */
export type CreateFastestLapPayloadFastestLapEdgeArgs = {
  orderBy?: Array<FastestLapOrderBy>;
};

/** All input for the create `FreePractice1Result` mutation. */
export type CreateFreePractice1ResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `FreePractice1Result` to be created by this mutation. */
  freePractice1Result: FreePractice1ResultInput;
};

/** The output of our create `FreePractice1Result` mutation. */
export type CreateFreePractice1ResultPayload = {
  __typename?: 'CreateFreePractice1ResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `FreePractice1Result` that was created by this mutation. */
  freePractice1Result?: Maybe<FreePractice1Result>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the create `FreePractice2Result` mutation. */
export type CreateFreePractice2ResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `FreePractice2Result` to be created by this mutation. */
  freePractice2Result: FreePractice2ResultInput;
};

/** The output of our create `FreePractice2Result` mutation. */
export type CreateFreePractice2ResultPayload = {
  __typename?: 'CreateFreePractice2ResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `FreePractice2Result` that was created by this mutation. */
  freePractice2Result?: Maybe<FreePractice2Result>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the create `FreePractice3Result` mutation. */
export type CreateFreePractice3ResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `FreePractice3Result` to be created by this mutation. */
  freePractice3Result: FreePractice3ResultInput;
};

/** The output of our create `FreePractice3Result` mutation. */
export type CreateFreePractice3ResultPayload = {
  __typename?: 'CreateFreePractice3ResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `FreePractice3Result` that was created by this mutation. */
  freePractice3Result?: Maybe<FreePractice3Result>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the create `FreePractice4Result` mutation. */
export type CreateFreePractice4ResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `FreePractice4Result` to be created by this mutation. */
  freePractice4Result: FreePractice4ResultInput;
};

/** The output of our create `FreePractice4Result` mutation. */
export type CreateFreePractice4ResultPayload = {
  __typename?: 'CreateFreePractice4ResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `FreePractice4Result` that was created by this mutation. */
  freePractice4Result?: Maybe<FreePractice4Result>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the create `GrandPrix` mutation. */
export type CreateGrandPrixInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `GrandPrix` to be created by this mutation. */
  grandPrix: GrandPrixInput;
};

/** The output of our create `GrandPrix` mutation. */
export type CreateGrandPrixPayload = {
  __typename?: 'CreateGrandPrixPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `GrandPrix` that was created by this mutation. */
  grandPrix?: Maybe<GrandPrix>;
  /** An edge for our `GrandPrix`. May be used by Relay 1. */
  grandPrixEdge?: Maybe<GrandPrixEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `GrandPrix` mutation. */
export type CreateGrandPrixPayloadGrandPrixEdgeArgs = {
  orderBy?: Array<GrandPrixOrderBy>;
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
  /** The `PitStop` that was created by this mutation. */
  pitStop?: Maybe<PitStop>;
  /** An edge for our `PitStop`. May be used by Relay 1. */
  pitStopEdge?: Maybe<PitStopEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `PitStop` mutation. */
export type CreatePitStopPayloadPitStopEdgeArgs = {
  orderBy?: Array<PitStopOrderBy>;
};

/** All input for the create `PreQualifyingResult` mutation. */
export type CreatePreQualifyingResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `PreQualifyingResult` to be created by this mutation. */
  preQualifyingResult: PreQualifyingResultInput;
};

/** The output of our create `PreQualifyingResult` mutation. */
export type CreatePreQualifyingResultPayload = {
  __typename?: 'CreatePreQualifyingResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `PreQualifyingResult` that was created by this mutation. */
  preQualifyingResult?: Maybe<PreQualifyingResult>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the create `Qualifying1Result` mutation. */
export type CreateQualifying1ResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Qualifying1Result` to be created by this mutation. */
  qualifying1Result: Qualifying1ResultInput;
};

/** The output of our create `Qualifying1Result` mutation. */
export type CreateQualifying1ResultPayload = {
  __typename?: 'CreateQualifying1ResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Qualifying1Result` that was created by this mutation. */
  qualifying1Result?: Maybe<Qualifying1Result>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the create `Qualifying2Result` mutation. */
export type CreateQualifying2ResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Qualifying2Result` to be created by this mutation. */
  qualifying2Result: Qualifying2ResultInput;
};

/** The output of our create `Qualifying2Result` mutation. */
export type CreateQualifying2ResultPayload = {
  __typename?: 'CreateQualifying2ResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Qualifying2Result` that was created by this mutation. */
  qualifying2Result?: Maybe<Qualifying2Result>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the create `QualifyingResult` mutation. */
export type CreateQualifyingResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `QualifyingResult` to be created by this mutation. */
  qualifyingResult: QualifyingResultInput;
};

/** The output of our create `QualifyingResult` mutation. */
export type CreateQualifyingResultPayload = {
  __typename?: 'CreateQualifyingResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `QualifyingResult` that was created by this mutation. */
  qualifyingResult?: Maybe<QualifyingResult>;
  /** An edge for our `QualifyingResult`. May be used by Relay 1. */
  qualifyingResultEdge?: Maybe<QualifyingResultEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `QualifyingResult` mutation. */
export type CreateQualifyingResultPayloadQualifyingResultEdgeArgs = {
  orderBy?: Array<QualifyingResultOrderBy>;
};

/** All input for the create `RaceDatum` mutation. */
export type CreateRaceDatumInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `RaceDatum` to be created by this mutation. */
  raceDatum: RaceDatumInput;
};

/** The output of our create `RaceDatum` mutation. */
export type CreateRaceDatumPayload = {
  __typename?: 'CreateRaceDatumPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `RaceDatum` that was created by this mutation. */
  raceDatum?: Maybe<RaceDatum>;
  /** An edge for our `RaceDatum`. May be used by Relay 1. */
  raceDatumEdge?: Maybe<RaceDatumEdge>;
};


/** The output of our create `RaceDatum` mutation. */
export type CreateRaceDatumPayloadRaceDatumEdgeArgs = {
  orderBy?: Array<RaceDatumOrderBy>;
};

/** All input for the create `RaceDriverStanding` mutation. */
export type CreateRaceDriverStandingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `RaceDriverStanding` to be created by this mutation. */
  raceDriverStanding: RaceDriverStandingInput;
};

/** The output of our create `RaceDriverStanding` mutation. */
export type CreateRaceDriverStandingPayload = {
  __typename?: 'CreateRaceDriverStandingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `RaceDriverStanding` that was created by this mutation. */
  raceDriverStanding?: Maybe<RaceDriverStanding>;
  /** An edge for our `RaceDriverStanding`. May be used by Relay 1. */
  raceDriverStandingEdge?: Maybe<RaceDriverStandingEdge>;
};


/** The output of our create `RaceDriverStanding` mutation. */
export type CreateRaceDriverStandingPayloadRaceDriverStandingEdgeArgs = {
  orderBy?: Array<RaceDriverStandingOrderBy>;
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
  raceEdge?: Maybe<RaceEdge>;
};


/** The output of our create `Race` mutation. */
export type CreateRacePayloadRaceEdgeArgs = {
  orderBy?: Array<RaceOrderBy>;
};

/** All input for the create `RaceResult` mutation. */
export type CreateRaceResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `RaceResult` to be created by this mutation. */
  raceResult: RaceResultInput;
};

/** The output of our create `RaceResult` mutation. */
export type CreateRaceResultPayload = {
  __typename?: 'CreateRaceResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `RaceResult` that was created by this mutation. */
  raceResult?: Maybe<RaceResult>;
  /** An edge for our `RaceResult`. May be used by Relay 1. */
  raceResultEdge?: Maybe<RaceResultEdge>;
};


/** The output of our create `RaceResult` mutation. */
export type CreateRaceResultPayloadRaceResultEdgeArgs = {
  orderBy?: Array<RaceResultOrderBy>;
};

/** All input for the create `RaceTeamStanding` mutation. */
export type CreateRaceTeamStandingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `RaceTeamStanding` to be created by this mutation. */
  raceTeamStanding: RaceTeamStandingInput;
};

/** The output of our create `RaceTeamStanding` mutation. */
export type CreateRaceTeamStandingPayload = {
  __typename?: 'CreateRaceTeamStandingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `RaceTeamStanding` that was created by this mutation. */
  raceTeamStanding?: Maybe<RaceTeamStanding>;
  /** An edge for our `RaceTeamStanding`. May be used by Relay 1. */
  raceTeamStandingEdge?: Maybe<RaceTeamStandingEdge>;
};


/** The output of our create `RaceTeamStanding` mutation. */
export type CreateRaceTeamStandingPayloadRaceTeamStandingEdgeArgs = {
  orderBy?: Array<RaceTeamStandingOrderBy>;
};

/** All input for the create `SeasonDriver` mutation. */
export type CreateSeasonDriverInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `SeasonDriver` to be created by this mutation. */
  seasonDriver: SeasonDriverInput;
};

/** The output of our create `SeasonDriver` mutation. */
export type CreateSeasonDriverPayload = {
  __typename?: 'CreateSeasonDriverPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonDriver` that was created by this mutation. */
  seasonDriver?: Maybe<SeasonDriver>;
  /** An edge for our `SeasonDriver`. May be used by Relay 1. */
  seasonDriverEdge?: Maybe<SeasonDriverEdge>;
};


/** The output of our create `SeasonDriver` mutation. */
export type CreateSeasonDriverPayloadSeasonDriverEdgeArgs = {
  orderBy?: Array<SeasonDriverOrderBy>;
};

/** All input for the create `SeasonDriverStanding` mutation. */
export type CreateSeasonDriverStandingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `SeasonDriverStanding` to be created by this mutation. */
  seasonDriverStanding: SeasonDriverStandingInput;
};

/** The output of our create `SeasonDriverStanding` mutation. */
export type CreateSeasonDriverStandingPayload = {
  __typename?: 'CreateSeasonDriverStandingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonDriverStanding` that was created by this mutation. */
  seasonDriverStanding?: Maybe<SeasonDriverStanding>;
  /** An edge for our `SeasonDriverStanding`. May be used by Relay 1. */
  seasonDriverStandingEdge?: Maybe<SeasonDriverStandingEdge>;
};


/** The output of our create `SeasonDriverStanding` mutation. */
export type CreateSeasonDriverStandingPayloadSeasonDriverStandingEdgeArgs = {
  orderBy?: Array<SeasonDriverStandingOrderBy>;
};

/** All input for the create `SeasonEngineManufacturer` mutation. */
export type CreateSeasonEngineManufacturerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `SeasonEngineManufacturer` to be created by this mutation. */
  seasonEngineManufacturer: SeasonEngineManufacturerInput;
};

/** The output of our create `SeasonEngineManufacturer` mutation. */
export type CreateSeasonEngineManufacturerPayload = {
  __typename?: 'CreateSeasonEngineManufacturerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonEngineManufacturer` that was created by this mutation. */
  seasonEngineManufacturer?: Maybe<SeasonEngineManufacturer>;
  /** An edge for our `SeasonEngineManufacturer`. May be used by Relay 1. */
  seasonEngineManufacturerEdge?: Maybe<SeasonEngineManufacturerEdge>;
};


/** The output of our create `SeasonEngineManufacturer` mutation. */
export type CreateSeasonEngineManufacturerPayloadSeasonEngineManufacturerEdgeArgs = {
  orderBy?: Array<SeasonEngineManufacturerOrderBy>;
};

/** All input for the create `SeasonEntrantChassis` mutation. */
export type CreateSeasonEntrantChassisInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `SeasonEntrantChassis` to be created by this mutation. */
  seasonEntrantChassis: SeasonEntrantChassisInput;
};

/** The output of our create `SeasonEntrantChassis` mutation. */
export type CreateSeasonEntrantChassisPayload = {
  __typename?: 'CreateSeasonEntrantChassisPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonEntrantChassis` that was created by this mutation. */
  seasonEntrantChassis?: Maybe<SeasonEntrantChassis>;
  /** An edge for our `SeasonEntrantChassis`. May be used by Relay 1. */
  seasonEntrantChassisEdge?: Maybe<SeasonEntrantChassisEdge>;
};


/** The output of our create `SeasonEntrantChassis` mutation. */
export type CreateSeasonEntrantChassisPayloadSeasonEntrantChassisEdgeArgs = {
  orderBy?: Array<SeasonEntrantChassisOrderBy>;
};

/** All input for the create `SeasonEntrantDriver` mutation. */
export type CreateSeasonEntrantDriverInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `SeasonEntrantDriver` to be created by this mutation. */
  seasonEntrantDriver: SeasonEntrantDriverInput;
};

/** The output of our create `SeasonEntrantDriver` mutation. */
export type CreateSeasonEntrantDriverPayload = {
  __typename?: 'CreateSeasonEntrantDriverPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonEntrantDriver` that was created by this mutation. */
  seasonEntrantDriver?: Maybe<SeasonEntrantDriver>;
  /** An edge for our `SeasonEntrantDriver`. May be used by Relay 1. */
  seasonEntrantDriverEdge?: Maybe<SeasonEntrantDriverEdge>;
};


/** The output of our create `SeasonEntrantDriver` mutation. */
export type CreateSeasonEntrantDriverPayloadSeasonEntrantDriverEdgeArgs = {
  orderBy?: Array<SeasonEntrantDriverOrderBy>;
};

/** All input for the create `SeasonEntrantEngine` mutation. */
export type CreateSeasonEntrantEngineInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `SeasonEntrantEngine` to be created by this mutation. */
  seasonEntrantEngine: SeasonEntrantEngineInput;
};

/** The output of our create `SeasonEntrantEngine` mutation. */
export type CreateSeasonEntrantEnginePayload = {
  __typename?: 'CreateSeasonEntrantEnginePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonEntrantEngine` that was created by this mutation. */
  seasonEntrantEngine?: Maybe<SeasonEntrantEngine>;
  /** An edge for our `SeasonEntrantEngine`. May be used by Relay 1. */
  seasonEntrantEngineEdge?: Maybe<SeasonEntrantEngineEdge>;
};


/** The output of our create `SeasonEntrantEngine` mutation. */
export type CreateSeasonEntrantEnginePayloadSeasonEntrantEngineEdgeArgs = {
  orderBy?: Array<SeasonEntrantEngineOrderBy>;
};

/** All input for the create `SeasonEntrant` mutation. */
export type CreateSeasonEntrantInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `SeasonEntrant` to be created by this mutation. */
  seasonEntrant: SeasonEntrantInput;
};

/** The output of our create `SeasonEntrant` mutation. */
export type CreateSeasonEntrantPayload = {
  __typename?: 'CreateSeasonEntrantPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonEntrant` that was created by this mutation. */
  seasonEntrant?: Maybe<SeasonEntrant>;
  /** An edge for our `SeasonEntrant`. May be used by Relay 1. */
  seasonEntrantEdge?: Maybe<SeasonEntrantEdge>;
};


/** The output of our create `SeasonEntrant` mutation. */
export type CreateSeasonEntrantPayloadSeasonEntrantEdgeArgs = {
  orderBy?: Array<SeasonEntrantOrderBy>;
};

/** All input for the create `SeasonEntrantTeam` mutation. */
export type CreateSeasonEntrantTeamInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `SeasonEntrantTeam` to be created by this mutation. */
  seasonEntrantTeam: SeasonEntrantTeamInput;
};

/** The output of our create `SeasonEntrantTeam` mutation. */
export type CreateSeasonEntrantTeamPayload = {
  __typename?: 'CreateSeasonEntrantTeamPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonEntrantTeam` that was created by this mutation. */
  seasonEntrantTeam?: Maybe<SeasonEntrantTeam>;
  /** An edge for our `SeasonEntrantTeam`. May be used by Relay 1. */
  seasonEntrantTeamEdge?: Maybe<SeasonEntrantTeamEdge>;
};


/** The output of our create `SeasonEntrantTeam` mutation. */
export type CreateSeasonEntrantTeamPayloadSeasonEntrantTeamEdgeArgs = {
  orderBy?: Array<SeasonEntrantTeamOrderBy>;
};

/** All input for the create `SeasonEntrantTyreManufacturer` mutation. */
export type CreateSeasonEntrantTyreManufacturerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `SeasonEntrantTyreManufacturer` to be created by this mutation. */
  seasonEntrantTyreManufacturer: SeasonEntrantTyreManufacturerInput;
};

/** The output of our create `SeasonEntrantTyreManufacturer` mutation. */
export type CreateSeasonEntrantTyreManufacturerPayload = {
  __typename?: 'CreateSeasonEntrantTyreManufacturerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonEntrantTyreManufacturer` that was created by this mutation. */
  seasonEntrantTyreManufacturer?: Maybe<SeasonEntrantTyreManufacturer>;
  /** An edge for our `SeasonEntrantTyreManufacturer`. May be used by Relay 1. */
  seasonEntrantTyreManufacturerEdge?: Maybe<SeasonEntrantTyreManufacturerEdge>;
};


/** The output of our create `SeasonEntrantTyreManufacturer` mutation. */
export type CreateSeasonEntrantTyreManufacturerPayloadSeasonEntrantTyreManufacturerEdgeArgs = {
  orderBy?: Array<SeasonEntrantTyreManufacturerOrderBy>;
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
  seasonEdge?: Maybe<SeasonEdge>;
};


/** The output of our create `Season` mutation. */
export type CreateSeasonPayloadSeasonEdgeArgs = {
  orderBy?: Array<SeasonOrderBy>;
};

/** All input for the create `SeasonTeam` mutation. */
export type CreateSeasonTeamInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `SeasonTeam` to be created by this mutation. */
  seasonTeam: SeasonTeamInput;
};

/** The output of our create `SeasonTeam` mutation. */
export type CreateSeasonTeamPayload = {
  __typename?: 'CreateSeasonTeamPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonTeam` that was created by this mutation. */
  seasonTeam?: Maybe<SeasonTeam>;
  /** An edge for our `SeasonTeam`. May be used by Relay 1. */
  seasonTeamEdge?: Maybe<SeasonTeamEdge>;
};


/** The output of our create `SeasonTeam` mutation. */
export type CreateSeasonTeamPayloadSeasonTeamEdgeArgs = {
  orderBy?: Array<SeasonTeamOrderBy>;
};

/** All input for the create `SeasonTeamStanding` mutation. */
export type CreateSeasonTeamStandingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `SeasonTeamStanding` to be created by this mutation. */
  seasonTeamStanding: SeasonTeamStandingInput;
};

/** The output of our create `SeasonTeamStanding` mutation. */
export type CreateSeasonTeamStandingPayload = {
  __typename?: 'CreateSeasonTeamStandingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonTeamStanding` that was created by this mutation. */
  seasonTeamStanding?: Maybe<SeasonTeamStanding>;
  /** An edge for our `SeasonTeamStanding`. May be used by Relay 1. */
  seasonTeamStandingEdge?: Maybe<SeasonTeamStandingEdge>;
};


/** The output of our create `SeasonTeamStanding` mutation. */
export type CreateSeasonTeamStandingPayloadSeasonTeamStandingEdgeArgs = {
  orderBy?: Array<SeasonTeamStandingOrderBy>;
};

/** All input for the create `SeasonTyreManufacturer` mutation. */
export type CreateSeasonTyreManufacturerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `SeasonTyreManufacturer` to be created by this mutation. */
  seasonTyreManufacturer: SeasonTyreManufacturerInput;
};

/** The output of our create `SeasonTyreManufacturer` mutation. */
export type CreateSeasonTyreManufacturerPayload = {
  __typename?: 'CreateSeasonTyreManufacturerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonTyreManufacturer` that was created by this mutation. */
  seasonTyreManufacturer?: Maybe<SeasonTyreManufacturer>;
  /** An edge for our `SeasonTyreManufacturer`. May be used by Relay 1. */
  seasonTyreManufacturerEdge?: Maybe<SeasonTyreManufacturerEdge>;
};


/** The output of our create `SeasonTyreManufacturer` mutation. */
export type CreateSeasonTyreManufacturerPayloadSeasonTyreManufacturerEdgeArgs = {
  orderBy?: Array<SeasonTyreManufacturerOrderBy>;
};

/** All input for the create `SprintQualifyingResult` mutation. */
export type CreateSprintQualifyingResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `SprintQualifyingResult` to be created by this mutation. */
  sprintQualifyingResult: SprintQualifyingResultInput;
};

/** The output of our create `SprintQualifyingResult` mutation. */
export type CreateSprintQualifyingResultPayload = {
  __typename?: 'CreateSprintQualifyingResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SprintQualifyingResult` that was created by this mutation. */
  sprintQualifyingResult?: Maybe<SprintQualifyingResult>;
  /** An edge for our `SprintQualifyingResult`. May be used by Relay 1. */
  sprintQualifyingResultEdge?: Maybe<SprintQualifyingResultEdge>;
};


/** The output of our create `SprintQualifyingResult` mutation. */
export type CreateSprintQualifyingResultPayloadSprintQualifyingResultEdgeArgs = {
  orderBy?: Array<SprintQualifyingResultOrderBy>;
};

/** All input for the create `SprintRaceResult` mutation. */
export type CreateSprintRaceResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `SprintRaceResult` to be created by this mutation. */
  sprintRaceResult: SprintRaceResultInput;
};

/** The output of our create `SprintRaceResult` mutation. */
export type CreateSprintRaceResultPayload = {
  __typename?: 'CreateSprintRaceResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SprintRaceResult` that was created by this mutation. */
  sprintRaceResult?: Maybe<SprintRaceResult>;
  /** An edge for our `SprintRaceResult`. May be used by Relay 1. */
  sprintRaceResultEdge?: Maybe<SprintRaceResultEdge>;
};


/** The output of our create `SprintRaceResult` mutation. */
export type CreateSprintRaceResultPayloadSprintRaceResultEdgeArgs = {
  orderBy?: Array<SprintRaceResultOrderBy>;
};

/** All input for the create `SprintStartingGridPosition` mutation. */
export type CreateSprintStartingGridPositionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `SprintStartingGridPosition` to be created by this mutation. */
  sprintStartingGridPosition: SprintStartingGridPositionInput;
};

/** The output of our create `SprintStartingGridPosition` mutation. */
export type CreateSprintStartingGridPositionPayload = {
  __typename?: 'CreateSprintStartingGridPositionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SprintStartingGridPosition` that was created by this mutation. */
  sprintStartingGridPosition?: Maybe<SprintStartingGridPosition>;
  /** An edge for our `SprintStartingGridPosition`. May be used by Relay 1. */
  sprintStartingGridPositionEdge?: Maybe<SprintStartingGridPositionEdge>;
};


/** The output of our create `SprintStartingGridPosition` mutation. */
export type CreateSprintStartingGridPositionPayloadSprintStartingGridPositionEdgeArgs = {
  orderBy?: Array<SprintStartingGridPositionOrderBy>;
};

/** All input for the create `StartingGridPosition` mutation. */
export type CreateStartingGridPositionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `StartingGridPosition` to be created by this mutation. */
  startingGridPosition: StartingGridPositionInput;
};

/** The output of our create `StartingGridPosition` mutation. */
export type CreateStartingGridPositionPayload = {
  __typename?: 'CreateStartingGridPositionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `StartingGridPosition` that was created by this mutation. */
  startingGridPosition?: Maybe<StartingGridPosition>;
  /** An edge for our `StartingGridPosition`. May be used by Relay 1. */
  startingGridPositionEdge?: Maybe<StartingGridPositionEdge>;
};


/** The output of our create `StartingGridPosition` mutation. */
export type CreateStartingGridPositionPayloadStartingGridPositionEdgeArgs = {
  orderBy?: Array<StartingGridPositionOrderBy>;
};

/** All input for the create `TeamChronology` mutation. */
export type CreateTeamChronologyInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `TeamChronology` to be created by this mutation. */
  teamChronology: TeamChronologyInput;
};

/** The output of our create `TeamChronology` mutation. */
export type CreateTeamChronologyPayload = {
  __typename?: 'CreateTeamChronologyPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `TeamChronology` that was created by this mutation. */
  teamChronology?: Maybe<TeamChronology>;
  /** An edge for our `TeamChronology`. May be used by Relay 1. */
  teamChronologyEdge?: Maybe<TeamChronologyEdge>;
};


/** The output of our create `TeamChronology` mutation. */
export type CreateTeamChronologyPayloadTeamChronologyEdgeArgs = {
  orderBy?: Array<TeamChronologyOrderBy>;
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
  teamEdge?: Maybe<TeamEdge>;
};


/** The output of our create `Team` mutation. */
export type CreateTeamPayloadTeamEdgeArgs = {
  orderBy?: Array<TeamOrderBy>;
};

/** All input for the create `TyreManufacturer` mutation. */
export type CreateTyreManufacturerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `TyreManufacturer` to be created by this mutation. */
  tyreManufacturer: TyreManufacturerInput;
};

/** The output of our create `TyreManufacturer` mutation. */
export type CreateTyreManufacturerPayload = {
  __typename?: 'CreateTyreManufacturerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `TyreManufacturer` that was created by this mutation. */
  tyreManufacturer?: Maybe<TyreManufacturer>;
  /** An edge for our `TyreManufacturer`. May be used by Relay 1. */
  tyreManufacturerEdge?: Maybe<TyreManufacturerEdge>;
};


/** The output of our create `TyreManufacturer` mutation. */
export type CreateTyreManufacturerPayloadTyreManufacturerEdgeArgs = {
  orderBy?: Array<TyreManufacturerOrderBy>;
};

/** All input for the create `WarmingUpResult` mutation. */
export type CreateWarmingUpResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `WarmingUpResult` to be created by this mutation. */
  warmingUpResult: WarmingUpResultInput;
};

/** The output of our create `WarmingUpResult` mutation. */
export type CreateWarmingUpResultPayload = {
  __typename?: 'CreateWarmingUpResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `WarmingUpResult` that was created by this mutation. */
  warmingUpResult?: Maybe<WarmingUpResult>;
};

/** All input for the `deleteAppCircuitDescriptionById` mutation. */
export type DeleteAppCircuitDescriptionByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `AppCircuitDescription` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteAppCircuitDescription` mutation. */
export type DeleteAppCircuitDescriptionInput = {
  circuitId: Scalars['String']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our delete `AppCircuitDescription` mutation. */
export type DeleteAppCircuitDescriptionPayload = {
  __typename?: 'DeleteAppCircuitDescriptionPayload';
  /** The `AppCircuitDescription` that was deleted by this mutation. */
  appCircuitDescription?: Maybe<AppCircuitDescription>;
  /** An edge for our `AppCircuitDescription`. May be used by Relay 1. */
  appCircuitDescriptionEdge?: Maybe<AppCircuitDescriptionEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedAppCircuitDescriptionId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `AppCircuitDescription` mutation. */
export type DeleteAppCircuitDescriptionPayloadAppCircuitDescriptionEdgeArgs = {
  orderBy?: Array<AppCircuitDescriptionOrderBy>;
};

/** All input for the `deleteAppConstructorBioById` mutation. */
export type DeleteAppConstructorBioByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `AppConstructorBio` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteAppConstructorBio` mutation. */
export type DeleteAppConstructorBioInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  teamId: Scalars['String']['input'];
};

/** The output of our delete `AppConstructorBio` mutation. */
export type DeleteAppConstructorBioPayload = {
  __typename?: 'DeleteAppConstructorBioPayload';
  /** The `AppConstructorBio` that was deleted by this mutation. */
  appConstructorBio?: Maybe<AppConstructorBio>;
  /** An edge for our `AppConstructorBio`. May be used by Relay 1. */
  appConstructorBioEdge?: Maybe<AppConstructorBioEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedAppConstructorBioId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `AppConstructorBio` mutation. */
export type DeleteAppConstructorBioPayloadAppConstructorBioEdgeArgs = {
  orderBy?: Array<AppConstructorBioOrderBy>;
};

/** All input for the `deleteAppDriverBioById` mutation. */
export type DeleteAppDriverBioByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `AppDriverBio` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteAppDriverBio` mutation. */
export type DeleteAppDriverBioInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  driverId: Scalars['String']['input'];
};

/** The output of our delete `AppDriverBio` mutation. */
export type DeleteAppDriverBioPayload = {
  __typename?: 'DeleteAppDriverBioPayload';
  /** The `AppDriverBio` that was deleted by this mutation. */
  appDriverBio?: Maybe<AppDriverBio>;
  /** An edge for our `AppDriverBio`. May be used by Relay 1. */
  appDriverBioEdge?: Maybe<AppDriverBioEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedAppDriverBioId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `AppDriverBio` mutation. */
export type DeleteAppDriverBioPayloadAppDriverBioEdgeArgs = {
  orderBy?: Array<AppDriverBioOrderBy>;
};

/** All input for the `deleteAppIngestStateById` mutation. */
export type DeleteAppIngestStateByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `AppIngestState` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteAppIngestState` mutation. */
export type DeleteAppIngestStateInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  key: Scalars['String']['input'];
};

/** The output of our delete `AppIngestState` mutation. */
export type DeleteAppIngestStatePayload = {
  __typename?: 'DeleteAppIngestStatePayload';
  /** The `AppIngestState` that was deleted by this mutation. */
  appIngestState?: Maybe<AppIngestState>;
  /** An edge for our `AppIngestState`. May be used by Relay 1. */
  appIngestStateEdge?: Maybe<AppIngestStateEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedAppIngestStateId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `AppIngestState` mutation. */
export type DeleteAppIngestStatePayloadAppIngestStateEdgeArgs = {
  orderBy?: Array<AppIngestStateOrderBy>;
};

/** All input for the `deleteAppLapTimeById` mutation. */
export type DeleteAppLapTimeByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `AppLapTime` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteAppLapTime` mutation. */
export type DeleteAppLapTimeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  driverId: Scalars['String']['input'];
  lap: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};

/** The output of our delete `AppLapTime` mutation. */
export type DeleteAppLapTimePayload = {
  __typename?: 'DeleteAppLapTimePayload';
  /** The `AppLapTime` that was deleted by this mutation. */
  appLapTime?: Maybe<AppLapTime>;
  /** An edge for our `AppLapTime`. May be used by Relay 1. */
  appLapTimeEdge?: Maybe<AppLapTimeEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedAppLapTimeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `AppLapTime` mutation. */
export type DeleteAppLapTimePayloadAppLapTimeEdgeArgs = {
  orderBy?: Array<AppLapTimeOrderBy>;
};

/** All input for the `deleteAppTeamColorById` mutation. */
export type DeleteAppTeamColorByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `AppTeamColor` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteAppTeamColor` mutation. */
export type DeleteAppTeamColorInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  teamId: Scalars['String']['input'];
};

/** The output of our delete `AppTeamColor` mutation. */
export type DeleteAppTeamColorPayload = {
  __typename?: 'DeleteAppTeamColorPayload';
  /** The `AppTeamColor` that was deleted by this mutation. */
  appTeamColor?: Maybe<AppTeamColor>;
  /** An edge for our `AppTeamColor`. May be used by Relay 1. */
  appTeamColorEdge?: Maybe<AppTeamColorEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedAppTeamColorId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `AppTeamColor` mutation. */
export type DeleteAppTeamColorPayloadAppTeamColorEdgeArgs = {
  orderBy?: Array<AppTeamColorOrderBy>;
};

/** All input for the `deleteAppTeamHistoryById` mutation. */
export type DeleteAppTeamHistoryByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `AppTeamHistory` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteAppTeamHistory` mutation. */
export type DeleteAppTeamHistoryInput = {
  antecedentTeamId: Scalars['String']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  startYear: Scalars['Int']['input'];
  teamId: Scalars['String']['input'];
};

/** The output of our delete `AppTeamHistory` mutation. */
export type DeleteAppTeamHistoryPayload = {
  __typename?: 'DeleteAppTeamHistoryPayload';
  /** The `AppTeamHistory` that was deleted by this mutation. */
  appTeamHistory?: Maybe<AppTeamHistory>;
  /** An edge for our `AppTeamHistory`. May be used by Relay 1. */
  appTeamHistoryEdge?: Maybe<AppTeamHistoryEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedAppTeamHistoryId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `AppTeamHistory` mutation. */
export type DeleteAppTeamHistoryPayloadAppTeamHistoryEdgeArgs = {
  orderBy?: Array<AppTeamHistoryOrderBy>;
};

/** All input for the `deleteChassisById` mutation. */
export type DeleteChassisByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Chassis` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteChassis` mutation. */
export type DeleteChassisInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['String']['input'];
};

/** The output of our delete `Chassis` mutation. */
export type DeleteChassisPayload = {
  __typename?: 'DeleteChassisPayload';
  /** The `Chassis` that was deleted by this mutation. */
  chassis?: Maybe<Chassis>;
  /** An edge for our `Chassis`. May be used by Relay 1. */
  chassisEdge?: Maybe<ChassisEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedChassisId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Chassis` mutation. */
export type DeleteChassisPayloadChassisEdgeArgs = {
  orderBy?: Array<ChassisOrderBy>;
};

/** All input for the `deleteCircuitById` mutation. */
export type DeleteCircuitByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Circuit` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteCircuit` mutation. */
export type DeleteCircuitInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['String']['input'];
};

/** All input for the `deleteCircuitLayoutById` mutation. */
export type DeleteCircuitLayoutByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `CircuitLayout` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteCircuitLayout` mutation. */
export type DeleteCircuitLayoutInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['String']['input'];
};

/** The output of our delete `CircuitLayout` mutation. */
export type DeleteCircuitLayoutPayload = {
  __typename?: 'DeleteCircuitLayoutPayload';
  /** The `CircuitLayout` that was deleted by this mutation. */
  circuitLayout?: Maybe<CircuitLayout>;
  /** An edge for our `CircuitLayout`. May be used by Relay 1. */
  circuitLayoutEdge?: Maybe<CircuitLayoutEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedCircuitLayoutId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `CircuitLayout` mutation. */
export type DeleteCircuitLayoutPayloadCircuitLayoutEdgeArgs = {
  orderBy?: Array<CircuitLayoutOrderBy>;
};

/** The output of our delete `Circuit` mutation. */
export type DeleteCircuitPayload = {
  __typename?: 'DeleteCircuitPayload';
  /** The `Circuit` that was deleted by this mutation. */
  circuit?: Maybe<Circuit>;
  /** An edge for our `Circuit`. May be used by Relay 1. */
  circuitEdge?: Maybe<CircuitEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedCircuitId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Circuit` mutation. */
export type DeleteCircuitPayloadCircuitEdgeArgs = {
  orderBy?: Array<CircuitOrderBy>;
};

/** All input for the `deleteContinentByCode` mutation. */
export type DeleteContinentByCodeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  code: Scalars['String']['input'];
};

/** All input for the `deleteContinentById` mutation. */
export type DeleteContinentByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Continent` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteContinentByName` mutation. */
export type DeleteContinentByNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

/** All input for the `deleteContinent` mutation. */
export type DeleteContinentInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['String']['input'];
};

/** The output of our delete `Continent` mutation. */
export type DeleteContinentPayload = {
  __typename?: 'DeleteContinentPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Continent` that was deleted by this mutation. */
  continent?: Maybe<Continent>;
  /** An edge for our `Continent`. May be used by Relay 1. */
  continentEdge?: Maybe<ContinentEdge>;
  deletedContinentId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Continent` mutation. */
export type DeleteContinentPayloadContinentEdgeArgs = {
  orderBy?: Array<ContinentOrderBy>;
};

/** All input for the `deleteCountryByAlpha2Code` mutation. */
export type DeleteCountryByAlpha2CodeInput = {
  alpha2Code: Scalars['String']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** All input for the `deleteCountryByAlpha3Code` mutation. */
export type DeleteCountryByAlpha3CodeInput = {
  alpha3Code: Scalars['String']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** All input for the `deleteCountryById` mutation. */
export type DeleteCountryByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Country` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteCountryByName` mutation. */
export type DeleteCountryByNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

/** All input for the `deleteCountry` mutation. */
export type DeleteCountryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['String']['input'];
};

/** The output of our delete `Country` mutation. */
export type DeleteCountryPayload = {
  __typename?: 'DeleteCountryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Country` that was deleted by this mutation. */
  country?: Maybe<Country>;
  /** An edge for our `Country`. May be used by Relay 1. */
  countryEdge?: Maybe<CountryEdge>;
  deletedCountryId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Country` mutation. */
export type DeleteCountryPayloadCountryEdgeArgs = {
  orderBy?: Array<CountryOrderBy>;
};

/** All input for the `deleteDriverById` mutation. */
export type DeleteDriverByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Driver` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteDriverFamilyRelationshipByDriverIdAndOtherDriverIdAndType` mutation. */
export type DeleteDriverFamilyRelationshipByDriverIdAndOtherDriverIdAndTypeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  driverId: Scalars['String']['input'];
  otherDriverId: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

/** All input for the `deleteDriverFamilyRelationshipById` mutation. */
export type DeleteDriverFamilyRelationshipByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `DriverFamilyRelationship` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteDriverFamilyRelationship` mutation. */
export type DeleteDriverFamilyRelationshipInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  driverId: Scalars['String']['input'];
  positionDisplayOrder: Scalars['Int']['input'];
};

/** The output of our delete `DriverFamilyRelationship` mutation. */
export type DeleteDriverFamilyRelationshipPayload = {
  __typename?: 'DeleteDriverFamilyRelationshipPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedDriverFamilyRelationshipId?: Maybe<Scalars['ID']['output']>;
  /** The `DriverFamilyRelationship` that was deleted by this mutation. */
  driverFamilyRelationship?: Maybe<DriverFamilyRelationship>;
  /** An edge for our `DriverFamilyRelationship`. May be used by Relay 1. */
  driverFamilyRelationshipEdge?: Maybe<DriverFamilyRelationshipEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `DriverFamilyRelationship` mutation. */
export type DeleteDriverFamilyRelationshipPayloadDriverFamilyRelationshipEdgeArgs = {
  orderBy?: Array<DriverFamilyRelationshipOrderBy>;
};

/** All input for the `deleteDriver` mutation. */
export type DeleteDriverInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['String']['input'];
};

/** All input for the `deleteDriverOfTheDayResultById` mutation. */
export type DeleteDriverOfTheDayResultByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `DriverOfTheDayResult` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteDriverOfTheDayResult` mutation. */
export type DeleteDriverOfTheDayResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};

/** The output of our delete `DriverOfTheDayResult` mutation. */
export type DeleteDriverOfTheDayResultPayload = {
  __typename?: 'DeleteDriverOfTheDayResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedDriverOfTheDayResultId?: Maybe<Scalars['ID']['output']>;
  /** The `DriverOfTheDayResult` that was deleted by this mutation. */
  driverOfTheDayResult?: Maybe<DriverOfTheDayResult>;
  /** An edge for our `DriverOfTheDayResult`. May be used by Relay 1. */
  driverOfTheDayResultEdge?: Maybe<DriverOfTheDayResultEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `DriverOfTheDayResult` mutation. */
export type DeleteDriverOfTheDayResultPayloadDriverOfTheDayResultEdgeArgs = {
  orderBy?: Array<DriverOfTheDayResultOrderBy>;
};

/** The output of our delete `Driver` mutation. */
export type DeleteDriverPayload = {
  __typename?: 'DeleteDriverPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedDriverId?: Maybe<Scalars['ID']['output']>;
  /** The `Driver` that was deleted by this mutation. */
  driver?: Maybe<Driver>;
  /** An edge for our `Driver`. May be used by Relay 1. */
  driverEdge?: Maybe<DriverEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Driver` mutation. */
export type DeleteDriverPayloadDriverEdgeArgs = {
  orderBy?: Array<DriverOrderBy>;
};

/** All input for the `deleteEngineById` mutation. */
export type DeleteEngineByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Engine` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteEngine` mutation. */
export type DeleteEngineInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['String']['input'];
};

/** All input for the `deleteEngineManufacturerById` mutation. */
export type DeleteEngineManufacturerByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `EngineManufacturer` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteEngineManufacturer` mutation. */
export type DeleteEngineManufacturerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['String']['input'];
};

/** The output of our delete `EngineManufacturer` mutation. */
export type DeleteEngineManufacturerPayload = {
  __typename?: 'DeleteEngineManufacturerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedEngineManufacturerId?: Maybe<Scalars['ID']['output']>;
  /** The `EngineManufacturer` that was deleted by this mutation. */
  engineManufacturer?: Maybe<EngineManufacturer>;
  /** An edge for our `EngineManufacturer`. May be used by Relay 1. */
  engineManufacturerEdge?: Maybe<EngineManufacturerEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `EngineManufacturer` mutation. */
export type DeleteEngineManufacturerPayloadEngineManufacturerEdgeArgs = {
  orderBy?: Array<EngineManufacturerOrderBy>;
};

/** The output of our delete `Engine` mutation. */
export type DeleteEnginePayload = {
  __typename?: 'DeleteEnginePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedEngineId?: Maybe<Scalars['ID']['output']>;
  /** The `Engine` that was deleted by this mutation. */
  engine?: Maybe<Engine>;
  /** An edge for our `Engine`. May be used by Relay 1. */
  engineEdge?: Maybe<EngineEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Engine` mutation. */
export type DeleteEnginePayloadEngineEdgeArgs = {
  orderBy?: Array<EngineOrderBy>;
};

/** All input for the `deleteEntrantById` mutation. */
export type DeleteEntrantByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Entrant` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteEntrant` mutation. */
export type DeleteEntrantInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['String']['input'];
};

/** The output of our delete `Entrant` mutation. */
export type DeleteEntrantPayload = {
  __typename?: 'DeleteEntrantPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedEntrantId?: Maybe<Scalars['ID']['output']>;
  /** The `Entrant` that was deleted by this mutation. */
  entrant?: Maybe<Entrant>;
  /** An edge for our `Entrant`. May be used by Relay 1. */
  entrantEdge?: Maybe<EntrantEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Entrant` mutation. */
export type DeleteEntrantPayloadEntrantEdgeArgs = {
  orderBy?: Array<EntrantOrderBy>;
};

/** All input for the `deleteFastestLapById` mutation. */
export type DeleteFastestLapByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `FastestLap` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteFastestLap` mutation. */
export type DeleteFastestLapInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};

/** The output of our delete `FastestLap` mutation. */
export type DeleteFastestLapPayload = {
  __typename?: 'DeleteFastestLapPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedFastestLapId?: Maybe<Scalars['ID']['output']>;
  /** The `FastestLap` that was deleted by this mutation. */
  fastestLap?: Maybe<FastestLap>;
  /** An edge for our `FastestLap`. May be used by Relay 1. */
  fastestLapEdge?: Maybe<FastestLapEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `FastestLap` mutation. */
export type DeleteFastestLapPayloadFastestLapEdgeArgs = {
  orderBy?: Array<FastestLapOrderBy>;
};

/** All input for the `deleteGrandPrixById` mutation. */
export type DeleteGrandPrixByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `GrandPrix` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteGrandPrix` mutation. */
export type DeleteGrandPrixInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['String']['input'];
};

/** The output of our delete `GrandPrix` mutation. */
export type DeleteGrandPrixPayload = {
  __typename?: 'DeleteGrandPrixPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedGrandPrixId?: Maybe<Scalars['ID']['output']>;
  /** The `GrandPrix` that was deleted by this mutation. */
  grandPrix?: Maybe<GrandPrix>;
  /** An edge for our `GrandPrix`. May be used by Relay 1. */
  grandPrixEdge?: Maybe<GrandPrixEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `GrandPrix` mutation. */
export type DeleteGrandPrixPayloadGrandPrixEdgeArgs = {
  orderBy?: Array<GrandPrixOrderBy>;
};

/** All input for the `deletePitStopById` mutation. */
export type DeletePitStopByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `PitStop` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deletePitStop` mutation. */
export type DeletePitStopInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  driverId: Scalars['String']['input'];
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
  deletedPitStopId?: Maybe<Scalars['ID']['output']>;
  /** The `PitStop` that was deleted by this mutation. */
  pitStop?: Maybe<PitStop>;
  /** An edge for our `PitStop`. May be used by Relay 1. */
  pitStopEdge?: Maybe<PitStopEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `PitStop` mutation. */
export type DeletePitStopPayloadPitStopEdgeArgs = {
  orderBy?: Array<PitStopOrderBy>;
};

/** All input for the `deleteQualifyingResultById` mutation. */
export type DeleteQualifyingResultByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `QualifyingResult` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteQualifyingResult` mutation. */
export type DeleteQualifyingResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};

/** The output of our delete `QualifyingResult` mutation. */
export type DeleteQualifyingResultPayload = {
  __typename?: 'DeleteQualifyingResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedQualifyingResultId?: Maybe<Scalars['ID']['output']>;
  /** The `QualifyingResult` that was deleted by this mutation. */
  qualifyingResult?: Maybe<QualifyingResult>;
  /** An edge for our `QualifyingResult`. May be used by Relay 1. */
  qualifyingResultEdge?: Maybe<QualifyingResultEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `QualifyingResult` mutation. */
export type DeleteQualifyingResultPayloadQualifyingResultEdgeArgs = {
  orderBy?: Array<QualifyingResultOrderBy>;
};

/** All input for the `deleteRaceById` mutation. */
export type DeleteRaceByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Race` to be deleted. */
  id: Scalars['ID']['input'];
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

/** All input for the `deleteRaceDatumById` mutation. */
export type DeleteRaceDatumByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `RaceDatum` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteRaceDatum` mutation. */
export type DeleteRaceDatumInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
  type: Scalars['String']['input'];
};

/** The output of our delete `RaceDatum` mutation. */
export type DeleteRaceDatumPayload = {
  __typename?: 'DeleteRaceDatumPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedRaceDatumId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `RaceDatum` that was deleted by this mutation. */
  raceDatum?: Maybe<RaceDatum>;
  /** An edge for our `RaceDatum`. May be used by Relay 1. */
  raceDatumEdge?: Maybe<RaceDatumEdge>;
};


/** The output of our delete `RaceDatum` mutation. */
export type DeleteRaceDatumPayloadRaceDatumEdgeArgs = {
  orderBy?: Array<RaceDatumOrderBy>;
};

/** All input for the `deleteRaceDriverStandingById` mutation. */
export type DeleteRaceDriverStandingByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `RaceDriverStanding` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteRaceDriverStanding` mutation. */
export type DeleteRaceDriverStandingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};

/** The output of our delete `RaceDriverStanding` mutation. */
export type DeleteRaceDriverStandingPayload = {
  __typename?: 'DeleteRaceDriverStandingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedRaceDriverStandingId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `RaceDriverStanding` that was deleted by this mutation. */
  raceDriverStanding?: Maybe<RaceDriverStanding>;
  /** An edge for our `RaceDriverStanding`. May be used by Relay 1. */
  raceDriverStandingEdge?: Maybe<RaceDriverStandingEdge>;
};


/** The output of our delete `RaceDriverStanding` mutation. */
export type DeleteRaceDriverStandingPayloadRaceDriverStandingEdgeArgs = {
  orderBy?: Array<RaceDriverStandingOrderBy>;
};

/** All input for the `deleteRace` mutation. */
export type DeleteRaceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['Int']['input'];
};

/** The output of our delete `Race` mutation. */
export type DeleteRacePayload = {
  __typename?: 'DeleteRacePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedRaceId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Race` that was deleted by this mutation. */
  race?: Maybe<Race>;
  /** An edge for our `Race`. May be used by Relay 1. */
  raceEdge?: Maybe<RaceEdge>;
};


/** The output of our delete `Race` mutation. */
export type DeleteRacePayloadRaceEdgeArgs = {
  orderBy?: Array<RaceOrderBy>;
};

/** All input for the `deleteRaceResultById` mutation. */
export type DeleteRaceResultByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `RaceResult` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteRaceResult` mutation. */
export type DeleteRaceResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};

/** The output of our delete `RaceResult` mutation. */
export type DeleteRaceResultPayload = {
  __typename?: 'DeleteRaceResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedRaceResultId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `RaceResult` that was deleted by this mutation. */
  raceResult?: Maybe<RaceResult>;
  /** An edge for our `RaceResult`. May be used by Relay 1. */
  raceResultEdge?: Maybe<RaceResultEdge>;
};


/** The output of our delete `RaceResult` mutation. */
export type DeleteRaceResultPayloadRaceResultEdgeArgs = {
  orderBy?: Array<RaceResultOrderBy>;
};

/** All input for the `deleteRaceTeamStandingById` mutation. */
export type DeleteRaceTeamStandingByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `RaceTeamStanding` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteRaceTeamStanding` mutation. */
export type DeleteRaceTeamStandingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};

/** The output of our delete `RaceTeamStanding` mutation. */
export type DeleteRaceTeamStandingPayload = {
  __typename?: 'DeleteRaceTeamStandingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedRaceTeamStandingId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `RaceTeamStanding` that was deleted by this mutation. */
  raceTeamStanding?: Maybe<RaceTeamStanding>;
  /** An edge for our `RaceTeamStanding`. May be used by Relay 1. */
  raceTeamStandingEdge?: Maybe<RaceTeamStandingEdge>;
};


/** The output of our delete `RaceTeamStanding` mutation. */
export type DeleteRaceTeamStandingPayloadRaceTeamStandingEdgeArgs = {
  orderBy?: Array<RaceTeamStandingOrderBy>;
};

/** All input for the `deleteSeasonById` mutation. */
export type DeleteSeasonByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Season` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteSeasonDriverById` mutation. */
export type DeleteSeasonDriverByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SeasonDriver` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteSeasonDriver` mutation. */
export type DeleteSeasonDriverInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  driverId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

/** The output of our delete `SeasonDriver` mutation. */
export type DeleteSeasonDriverPayload = {
  __typename?: 'DeleteSeasonDriverPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedSeasonDriverId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonDriver` that was deleted by this mutation. */
  seasonDriver?: Maybe<SeasonDriver>;
  /** An edge for our `SeasonDriver`. May be used by Relay 1. */
  seasonDriverEdge?: Maybe<SeasonDriverEdge>;
};


/** The output of our delete `SeasonDriver` mutation. */
export type DeleteSeasonDriverPayloadSeasonDriverEdgeArgs = {
  orderBy?: Array<SeasonDriverOrderBy>;
};

/** All input for the `deleteSeasonDriverStandingById` mutation. */
export type DeleteSeasonDriverStandingByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SeasonDriverStanding` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteSeasonDriverStanding` mutation. */
export type DeleteSeasonDriverStandingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  positionDisplayOrder: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
};

/** The output of our delete `SeasonDriverStanding` mutation. */
export type DeleteSeasonDriverStandingPayload = {
  __typename?: 'DeleteSeasonDriverStandingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedSeasonDriverStandingId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonDriverStanding` that was deleted by this mutation. */
  seasonDriverStanding?: Maybe<SeasonDriverStanding>;
  /** An edge for our `SeasonDriverStanding`. May be used by Relay 1. */
  seasonDriverStandingEdge?: Maybe<SeasonDriverStandingEdge>;
};


/** The output of our delete `SeasonDriverStanding` mutation. */
export type DeleteSeasonDriverStandingPayloadSeasonDriverStandingEdgeArgs = {
  orderBy?: Array<SeasonDriverStandingOrderBy>;
};

/** All input for the `deleteSeasonEngineManufacturerById` mutation. */
export type DeleteSeasonEngineManufacturerByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SeasonEngineManufacturer` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteSeasonEngineManufacturer` mutation. */
export type DeleteSeasonEngineManufacturerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

/** The output of our delete `SeasonEngineManufacturer` mutation. */
export type DeleteSeasonEngineManufacturerPayload = {
  __typename?: 'DeleteSeasonEngineManufacturerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedSeasonEngineManufacturerId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonEngineManufacturer` that was deleted by this mutation. */
  seasonEngineManufacturer?: Maybe<SeasonEngineManufacturer>;
  /** An edge for our `SeasonEngineManufacturer`. May be used by Relay 1. */
  seasonEngineManufacturerEdge?: Maybe<SeasonEngineManufacturerEdge>;
};


/** The output of our delete `SeasonEngineManufacturer` mutation. */
export type DeleteSeasonEngineManufacturerPayloadSeasonEngineManufacturerEdgeArgs = {
  orderBy?: Array<SeasonEngineManufacturerOrderBy>;
};

/** All input for the `deleteSeasonEntrantById` mutation. */
export type DeleteSeasonEntrantByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SeasonEntrant` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteSeasonEntrantChassisById` mutation. */
export type DeleteSeasonEntrantChassisByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SeasonEntrantChassis` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteSeasonEntrantChassis` mutation. */
export type DeleteSeasonEntrantChassisInput = {
  chassisId: Scalars['String']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId: Scalars['String']['input'];
  entrantId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

/** The output of our delete `SeasonEntrantChassis` mutation. */
export type DeleteSeasonEntrantChassisPayload = {
  __typename?: 'DeleteSeasonEntrantChassisPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedSeasonEntrantChassisId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonEntrantChassis` that was deleted by this mutation. */
  seasonEntrantChassis?: Maybe<SeasonEntrantChassis>;
  /** An edge for our `SeasonEntrantChassis`. May be used by Relay 1. */
  seasonEntrantChassisEdge?: Maybe<SeasonEntrantChassisEdge>;
};


/** The output of our delete `SeasonEntrantChassis` mutation. */
export type DeleteSeasonEntrantChassisPayloadSeasonEntrantChassisEdgeArgs = {
  orderBy?: Array<SeasonEntrantChassisOrderBy>;
};

/** All input for the `deleteSeasonEntrantDriverById` mutation. */
export type DeleteSeasonEntrantDriverByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SeasonEntrantDriver` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteSeasonEntrantDriver` mutation. */
export type DeleteSeasonEntrantDriverInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  driverId: Scalars['String']['input'];
  engineManufacturerId: Scalars['String']['input'];
  entrantId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

/** The output of our delete `SeasonEntrantDriver` mutation. */
export type DeleteSeasonEntrantDriverPayload = {
  __typename?: 'DeleteSeasonEntrantDriverPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedSeasonEntrantDriverId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonEntrantDriver` that was deleted by this mutation. */
  seasonEntrantDriver?: Maybe<SeasonEntrantDriver>;
  /** An edge for our `SeasonEntrantDriver`. May be used by Relay 1. */
  seasonEntrantDriverEdge?: Maybe<SeasonEntrantDriverEdge>;
};


/** The output of our delete `SeasonEntrantDriver` mutation. */
export type DeleteSeasonEntrantDriverPayloadSeasonEntrantDriverEdgeArgs = {
  orderBy?: Array<SeasonEntrantDriverOrderBy>;
};

/** All input for the `deleteSeasonEntrantEngineById` mutation. */
export type DeleteSeasonEntrantEngineByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SeasonEntrantEngine` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteSeasonEntrantEngine` mutation. */
export type DeleteSeasonEntrantEngineInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  engineId: Scalars['String']['input'];
  engineManufacturerId: Scalars['String']['input'];
  entrantId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

/** The output of our delete `SeasonEntrantEngine` mutation. */
export type DeleteSeasonEntrantEnginePayload = {
  __typename?: 'DeleteSeasonEntrantEnginePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedSeasonEntrantEngineId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonEntrantEngine` that was deleted by this mutation. */
  seasonEntrantEngine?: Maybe<SeasonEntrantEngine>;
  /** An edge for our `SeasonEntrantEngine`. May be used by Relay 1. */
  seasonEntrantEngineEdge?: Maybe<SeasonEntrantEngineEdge>;
};


/** The output of our delete `SeasonEntrantEngine` mutation. */
export type DeleteSeasonEntrantEnginePayloadSeasonEntrantEngineEdgeArgs = {
  orderBy?: Array<SeasonEntrantEngineOrderBy>;
};

/** All input for the `deleteSeasonEntrant` mutation. */
export type DeleteSeasonEntrantInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  entrantId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

/** The output of our delete `SeasonEntrant` mutation. */
export type DeleteSeasonEntrantPayload = {
  __typename?: 'DeleteSeasonEntrantPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedSeasonEntrantId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonEntrant` that was deleted by this mutation. */
  seasonEntrant?: Maybe<SeasonEntrant>;
  /** An edge for our `SeasonEntrant`. May be used by Relay 1. */
  seasonEntrantEdge?: Maybe<SeasonEntrantEdge>;
};


/** The output of our delete `SeasonEntrant` mutation. */
export type DeleteSeasonEntrantPayloadSeasonEntrantEdgeArgs = {
  orderBy?: Array<SeasonEntrantOrderBy>;
};

/** All input for the `deleteSeasonEntrantTeamById` mutation. */
export type DeleteSeasonEntrantTeamByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SeasonEntrantTeam` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteSeasonEntrantTeam` mutation. */
export type DeleteSeasonEntrantTeamInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId: Scalars['String']['input'];
  entrantId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

/** The output of our delete `SeasonEntrantTeam` mutation. */
export type DeleteSeasonEntrantTeamPayload = {
  __typename?: 'DeleteSeasonEntrantTeamPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedSeasonEntrantTeamId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonEntrantTeam` that was deleted by this mutation. */
  seasonEntrantTeam?: Maybe<SeasonEntrantTeam>;
  /** An edge for our `SeasonEntrantTeam`. May be used by Relay 1. */
  seasonEntrantTeamEdge?: Maybe<SeasonEntrantTeamEdge>;
};


/** The output of our delete `SeasonEntrantTeam` mutation. */
export type DeleteSeasonEntrantTeamPayloadSeasonEntrantTeamEdgeArgs = {
  orderBy?: Array<SeasonEntrantTeamOrderBy>;
};

/** All input for the `deleteSeasonEntrantTyreManufacturerById` mutation. */
export type DeleteSeasonEntrantTyreManufacturerByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SeasonEntrantTyreManufacturer` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteSeasonEntrantTyreManufacturer` mutation. */
export type DeleteSeasonEntrantTyreManufacturerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId: Scalars['String']['input'];
  entrantId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
  tyreManufacturerId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

/** The output of our delete `SeasonEntrantTyreManufacturer` mutation. */
export type DeleteSeasonEntrantTyreManufacturerPayload = {
  __typename?: 'DeleteSeasonEntrantTyreManufacturerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedSeasonEntrantTyreManufacturerId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonEntrantTyreManufacturer` that was deleted by this mutation. */
  seasonEntrantTyreManufacturer?: Maybe<SeasonEntrantTyreManufacturer>;
  /** An edge for our `SeasonEntrantTyreManufacturer`. May be used by Relay 1. */
  seasonEntrantTyreManufacturerEdge?: Maybe<SeasonEntrantTyreManufacturerEdge>;
};


/** The output of our delete `SeasonEntrantTyreManufacturer` mutation. */
export type DeleteSeasonEntrantTyreManufacturerPayloadSeasonEntrantTyreManufacturerEdgeArgs = {
  orderBy?: Array<SeasonEntrantTyreManufacturerOrderBy>;
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
  deletedSeasonId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Season` that was deleted by this mutation. */
  season?: Maybe<Season>;
  /** An edge for our `Season`. May be used by Relay 1. */
  seasonEdge?: Maybe<SeasonEdge>;
};


/** The output of our delete `Season` mutation. */
export type DeleteSeasonPayloadSeasonEdgeArgs = {
  orderBy?: Array<SeasonOrderBy>;
};

/** All input for the `deleteSeasonTeamById` mutation. */
export type DeleteSeasonTeamByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SeasonTeam` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteSeasonTeam` mutation. */
export type DeleteSeasonTeamInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  teamId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

/** The output of our delete `SeasonTeam` mutation. */
export type DeleteSeasonTeamPayload = {
  __typename?: 'DeleteSeasonTeamPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedSeasonTeamId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonTeam` that was deleted by this mutation. */
  seasonTeam?: Maybe<SeasonTeam>;
  /** An edge for our `SeasonTeam`. May be used by Relay 1. */
  seasonTeamEdge?: Maybe<SeasonTeamEdge>;
};


/** The output of our delete `SeasonTeam` mutation. */
export type DeleteSeasonTeamPayloadSeasonTeamEdgeArgs = {
  orderBy?: Array<SeasonTeamOrderBy>;
};

/** All input for the `deleteSeasonTeamStandingById` mutation. */
export type DeleteSeasonTeamStandingByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SeasonTeamStanding` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteSeasonTeamStanding` mutation. */
export type DeleteSeasonTeamStandingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  positionDisplayOrder: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
};

/** The output of our delete `SeasonTeamStanding` mutation. */
export type DeleteSeasonTeamStandingPayload = {
  __typename?: 'DeleteSeasonTeamStandingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedSeasonTeamStandingId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonTeamStanding` that was deleted by this mutation. */
  seasonTeamStanding?: Maybe<SeasonTeamStanding>;
  /** An edge for our `SeasonTeamStanding`. May be used by Relay 1. */
  seasonTeamStandingEdge?: Maybe<SeasonTeamStandingEdge>;
};


/** The output of our delete `SeasonTeamStanding` mutation. */
export type DeleteSeasonTeamStandingPayloadSeasonTeamStandingEdgeArgs = {
  orderBy?: Array<SeasonTeamStandingOrderBy>;
};

/** All input for the `deleteSeasonTyreManufacturerById` mutation. */
export type DeleteSeasonTyreManufacturerByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SeasonTyreManufacturer` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteSeasonTyreManufacturer` mutation. */
export type DeleteSeasonTyreManufacturerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  tyreManufacturerId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

/** The output of our delete `SeasonTyreManufacturer` mutation. */
export type DeleteSeasonTyreManufacturerPayload = {
  __typename?: 'DeleteSeasonTyreManufacturerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedSeasonTyreManufacturerId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonTyreManufacturer` that was deleted by this mutation. */
  seasonTyreManufacturer?: Maybe<SeasonTyreManufacturer>;
  /** An edge for our `SeasonTyreManufacturer`. May be used by Relay 1. */
  seasonTyreManufacturerEdge?: Maybe<SeasonTyreManufacturerEdge>;
};


/** The output of our delete `SeasonTyreManufacturer` mutation. */
export type DeleteSeasonTyreManufacturerPayloadSeasonTyreManufacturerEdgeArgs = {
  orderBy?: Array<SeasonTyreManufacturerOrderBy>;
};

/** All input for the `deleteSprintQualifyingResultById` mutation. */
export type DeleteSprintQualifyingResultByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SprintQualifyingResult` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteSprintQualifyingResult` mutation. */
export type DeleteSprintQualifyingResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};

/** The output of our delete `SprintQualifyingResult` mutation. */
export type DeleteSprintQualifyingResultPayload = {
  __typename?: 'DeleteSprintQualifyingResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedSprintQualifyingResultId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SprintQualifyingResult` that was deleted by this mutation. */
  sprintQualifyingResult?: Maybe<SprintQualifyingResult>;
  /** An edge for our `SprintQualifyingResult`. May be used by Relay 1. */
  sprintQualifyingResultEdge?: Maybe<SprintQualifyingResultEdge>;
};


/** The output of our delete `SprintQualifyingResult` mutation. */
export type DeleteSprintQualifyingResultPayloadSprintQualifyingResultEdgeArgs = {
  orderBy?: Array<SprintQualifyingResultOrderBy>;
};

/** All input for the `deleteSprintRaceResultById` mutation. */
export type DeleteSprintRaceResultByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SprintRaceResult` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteSprintRaceResult` mutation. */
export type DeleteSprintRaceResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};

/** The output of our delete `SprintRaceResult` mutation. */
export type DeleteSprintRaceResultPayload = {
  __typename?: 'DeleteSprintRaceResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedSprintRaceResultId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SprintRaceResult` that was deleted by this mutation. */
  sprintRaceResult?: Maybe<SprintRaceResult>;
  /** An edge for our `SprintRaceResult`. May be used by Relay 1. */
  sprintRaceResultEdge?: Maybe<SprintRaceResultEdge>;
};


/** The output of our delete `SprintRaceResult` mutation. */
export type DeleteSprintRaceResultPayloadSprintRaceResultEdgeArgs = {
  orderBy?: Array<SprintRaceResultOrderBy>;
};

/** All input for the `deleteSprintStartingGridPositionById` mutation. */
export type DeleteSprintStartingGridPositionByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SprintStartingGridPosition` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteSprintStartingGridPosition` mutation. */
export type DeleteSprintStartingGridPositionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};

/** The output of our delete `SprintStartingGridPosition` mutation. */
export type DeleteSprintStartingGridPositionPayload = {
  __typename?: 'DeleteSprintStartingGridPositionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedSprintStartingGridPositionId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SprintStartingGridPosition` that was deleted by this mutation. */
  sprintStartingGridPosition?: Maybe<SprintStartingGridPosition>;
  /** An edge for our `SprintStartingGridPosition`. May be used by Relay 1. */
  sprintStartingGridPositionEdge?: Maybe<SprintStartingGridPositionEdge>;
};


/** The output of our delete `SprintStartingGridPosition` mutation. */
export type DeleteSprintStartingGridPositionPayloadSprintStartingGridPositionEdgeArgs = {
  orderBy?: Array<SprintStartingGridPositionOrderBy>;
};

/** All input for the `deleteStartingGridPositionById` mutation. */
export type DeleteStartingGridPositionByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `StartingGridPosition` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteStartingGridPosition` mutation. */
export type DeleteStartingGridPositionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};

/** The output of our delete `StartingGridPosition` mutation. */
export type DeleteStartingGridPositionPayload = {
  __typename?: 'DeleteStartingGridPositionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedStartingGridPositionId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `StartingGridPosition` that was deleted by this mutation. */
  startingGridPosition?: Maybe<StartingGridPosition>;
  /** An edge for our `StartingGridPosition`. May be used by Relay 1. */
  startingGridPositionEdge?: Maybe<StartingGridPositionEdge>;
};


/** The output of our delete `StartingGridPosition` mutation. */
export type DeleteStartingGridPositionPayloadStartingGridPositionEdgeArgs = {
  orderBy?: Array<StartingGridPositionOrderBy>;
};

/** All input for the `deleteTeamById` mutation. */
export type DeleteTeamByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Team` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteTeamChronologyById` mutation. */
export type DeleteTeamChronologyByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `TeamChronology` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteTeamChronologyByTeamIdAndOtherTeamIdAndYearFromAndYearTo` mutation. */
export type DeleteTeamChronologyByTeamIdAndOtherTeamIdAndYearFromAndYearToInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  otherTeamId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
  yearFrom: Scalars['Int']['input'];
  yearTo: Scalars['Int']['input'];
};

/** All input for the `deleteTeamChronology` mutation. */
export type DeleteTeamChronologyInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  positionDisplayOrder: Scalars['Int']['input'];
  teamId: Scalars['String']['input'];
};

/** The output of our delete `TeamChronology` mutation. */
export type DeleteTeamChronologyPayload = {
  __typename?: 'DeleteTeamChronologyPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedTeamChronologyId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `TeamChronology` that was deleted by this mutation. */
  teamChronology?: Maybe<TeamChronology>;
  /** An edge for our `TeamChronology`. May be used by Relay 1. */
  teamChronologyEdge?: Maybe<TeamChronologyEdge>;
};


/** The output of our delete `TeamChronology` mutation. */
export type DeleteTeamChronologyPayloadTeamChronologyEdgeArgs = {
  orderBy?: Array<TeamChronologyOrderBy>;
};

/** All input for the `deleteTeam` mutation. */
export type DeleteTeamInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['String']['input'];
};

/** The output of our delete `Team` mutation. */
export type DeleteTeamPayload = {
  __typename?: 'DeleteTeamPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedTeamId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Team` that was deleted by this mutation. */
  team?: Maybe<Team>;
  /** An edge for our `Team`. May be used by Relay 1. */
  teamEdge?: Maybe<TeamEdge>;
};


/** The output of our delete `Team` mutation. */
export type DeleteTeamPayloadTeamEdgeArgs = {
  orderBy?: Array<TeamOrderBy>;
};

/** All input for the `deleteTyreManufacturerById` mutation. */
export type DeleteTyreManufacturerByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `TyreManufacturer` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteTyreManufacturer` mutation. */
export type DeleteTyreManufacturerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['String']['input'];
};

/** The output of our delete `TyreManufacturer` mutation. */
export type DeleteTyreManufacturerPayload = {
  __typename?: 'DeleteTyreManufacturerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedTyreManufacturerId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `TyreManufacturer` that was deleted by this mutation. */
  tyreManufacturer?: Maybe<TyreManufacturer>;
  /** An edge for our `TyreManufacturer`. May be used by Relay 1. */
  tyreManufacturerEdge?: Maybe<TyreManufacturerEdge>;
};


/** The output of our delete `TyreManufacturer` mutation. */
export type DeleteTyreManufacturerPayloadTyreManufacturerEdgeArgs = {
  orderBy?: Array<TyreManufacturerOrderBy>;
};

export type Driver = Node & {
  __typename?: 'Driver';
  abbreviation: Scalars['String']['output'];
  bestChampionshipPosition?: Maybe<Scalars['Int']['output']>;
  bestRaceResult?: Maybe<Scalars['Int']['output']>;
  bestSprintRaceResult?: Maybe<Scalars['Int']['output']>;
  bestStartingGridPosition?: Maybe<Scalars['Int']['output']>;
  bio?: Maybe<WikipediaBio>;
  /** Reads a single `Country` that is related to this `Driver`. */
  countryOfBirthCountry?: Maybe<Country>;
  countryOfBirthCountryId: Scalars['String']['output'];
  dateOfBirth: Scalars['Date']['output'];
  dateOfDeath?: Maybe<Scalars['Date']['output']>;
  /** Reads and enables pagination through a set of `DriverFamilyRelationship`. */
  driverFamilyRelationships: DriverFamilyRelationshipConnection;
  /** Reads and enables pagination through a set of `DriverFamilyRelationship`. */
  driverFamilyRelationshipsByOtherDriverId: DriverFamilyRelationshipConnection;
  /** Reads and enables pagination through a set of `DriverOfTheDayResult`. */
  driverOfTheDayResults: DriverOfTheDayResultConnection;
  /** Reads and enables pagination through a set of `FastestLap`. */
  fastestLaps: FastestLapConnection;
  firstName: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  gender: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `AppLapTime`. */
  lapTimes: AppLapTimeConnection;
  lastName: Scalars['String']['output'];
  name: Scalars['String']['output'];
  /** Reads a single `Country` that is related to this `Driver`. */
  nationalityCountry?: Maybe<Country>;
  nationalityCountryId: Scalars['String']['output'];
  permanentNumber?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `PitStop`. */
  pitStops: PitStopConnection;
  placeOfBirth: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `QualifyingResult`. */
  qualifyingResults: QualifyingResultConnection;
  /** Reads and enables pagination through a set of `RaceDatum`. */
  raceData: RaceDatumConnection;
  /** Reads and enables pagination through a set of `RaceDriverStanding`. */
  raceDriverStandings: RaceDriverStandingConnection;
  /** Reads and enables pagination through a set of `RaceResult`. */
  raceResults: RaceResultConnection;
  rowId: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `SeasonDriverStanding`. */
  seasonDriverStandings: SeasonDriverStandingConnection;
  /** Reads and enables pagination through a set of `SeasonDriver`. */
  seasonDrivers: SeasonDriverConnection;
  /** Reads and enables pagination through a set of `SeasonEntrantDriver`. */
  seasonEntrantDrivers: SeasonEntrantDriverConnection;
  /** Reads a single `Country` that is related to this `Driver`. */
  secondNationalityCountry?: Maybe<Country>;
  secondNationalityCountryId?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `SprintQualifyingResult`. */
  sprintQualifyingResults: SprintQualifyingResultConnection;
  /** Reads and enables pagination through a set of `SprintRaceResult`. */
  sprintRaceResults: SprintRaceResultConnection;
  /** Reads and enables pagination through a set of `SprintStartingGridPosition`. */
  sprintStartingGridPositions: SprintStartingGridPositionConnection;
  /** Reads and enables pagination through a set of `StartingGridPosition`. */
  startingGridPositions: StartingGridPositionConnection;
  totalChampionshipPoints: Scalars['BigFloat']['output'];
  totalChampionshipWins: Scalars['Int']['output'];
  totalDriverOfTheDay: Scalars['Int']['output'];
  totalFastestLaps: Scalars['Int']['output'];
  totalGrandSlams: Scalars['Int']['output'];
  totalPodiums: Scalars['Int']['output'];
  totalPoints: Scalars['BigFloat']['output'];
  totalPolePositions: Scalars['Int']['output'];
  totalRaceEntries: Scalars['Int']['output'];
  totalRaceLaps: Scalars['Int']['output'];
  totalRaceStarts: Scalars['Int']['output'];
  totalRaceWins: Scalars['Int']['output'];
  totalSprintRaceStarts: Scalars['Int']['output'];
  totalSprintRaceWins: Scalars['Int']['output'];
};


export type DriverDriverFamilyRelationshipsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DriverFamilyRelationshipCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverFamilyRelationshipOrderBy>>;
};


export type DriverDriverFamilyRelationshipsByOtherDriverIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DriverFamilyRelationshipCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverFamilyRelationshipOrderBy>>;
};


export type DriverDriverOfTheDayResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DriverOfTheDayResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverOfTheDayResultOrderBy>>;
};


export type DriverFastestLapsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<FastestLapCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FastestLapOrderBy>>;
};


export type DriverLapTimesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AppLapTimeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AppLapTimeOrderBy>>;
};


export type DriverPitStopsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PitStopCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PitStopOrderBy>>;
};


export type DriverQualifyingResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<QualifyingResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<QualifyingResultOrderBy>>;
};


export type DriverRaceDataArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RaceDatumCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceDatumOrderBy>>;
};


export type DriverRaceDriverStandingsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RaceDriverStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceDriverStandingOrderBy>>;
};


export type DriverRaceResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RaceResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceResultOrderBy>>;
};


export type DriverSeasonDriverStandingsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonDriverStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonDriverStandingOrderBy>>;
};


export type DriverSeasonDriversArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonDriverCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonDriverOrderBy>>;
};


export type DriverSeasonEntrantDriversArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantDriverCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantDriverOrderBy>>;
};


export type DriverSprintQualifyingResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SprintQualifyingResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintQualifyingResultOrderBy>>;
};


export type DriverSprintRaceResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SprintRaceResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintRaceResultOrderBy>>;
};


export type DriverSprintStartingGridPositionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SprintStartingGridPositionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintStartingGridPositionOrderBy>>;
};


export type DriverStartingGridPositionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<StartingGridPositionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StartingGridPositionOrderBy>>;
};

/** A condition to be used against `Driver` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type DriverCondition = {
  /** Checks for equality with the object’s `abbreviation` field. */
  abbreviation?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `countryOfBirthCountryId` field. */
  countryOfBirthCountryId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `dateOfBirth` field. */
  dateOfBirth?: InputMaybe<Scalars['Date']['input']>;
  /** Checks for equality with the object’s `dateOfDeath` field. */
  dateOfDeath?: InputMaybe<Scalars['Date']['input']>;
  /** Checks for equality with the object’s `firstName` field. */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `fullName` field. */
  fullName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gender` field. */
  gender?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `lastName` field. */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `nationalityCountryId` field. */
  nationalityCountryId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `permanentNumber` field. */
  permanentNumber?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `placeOfBirth` field. */
  placeOfBirth?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `secondNationalityCountryId` field. */
  secondNationalityCountryId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `Driver` values. */
export type DriverConnection = {
  __typename?: 'DriverConnection';
  /** A list of edges which contains the `Driver` and cursor to aid in pagination. */
  edges: Array<Maybe<DriverEdge>>;
  /** A list of `Driver` objects. */
  nodes: Array<Maybe<Driver>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Driver` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Driver` edge in the connection. */
export type DriverEdge = {
  __typename?: 'DriverEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Driver` at the end of the edge. */
  node?: Maybe<Driver>;
};

export type DriverFamilyRelationship = Node & {
  __typename?: 'DriverFamilyRelationship';
  /** Reads a single `Driver` that is related to this `DriverFamilyRelationship`. */
  driver?: Maybe<Driver>;
  driverId: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `Driver` that is related to this `DriverFamilyRelationship`. */
  otherDriver?: Maybe<Driver>;
  otherDriverId: Scalars['String']['output'];
  positionDisplayOrder: Scalars['Int']['output'];
  type: Scalars['String']['output'];
};

/**
 * A condition to be used against `DriverFamilyRelationship` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type DriverFamilyRelationshipCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `otherDriverId` field. */
  otherDriverId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `positionDisplayOrder` field. */
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `DriverFamilyRelationship` values. */
export type DriverFamilyRelationshipConnection = {
  __typename?: 'DriverFamilyRelationshipConnection';
  /** A list of edges which contains the `DriverFamilyRelationship` and cursor to aid in pagination. */
  edges: Array<Maybe<DriverFamilyRelationshipEdge>>;
  /** A list of `DriverFamilyRelationship` objects. */
  nodes: Array<Maybe<DriverFamilyRelationship>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `DriverFamilyRelationship` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `DriverFamilyRelationship` edge in the connection. */
export type DriverFamilyRelationshipEdge = {
  __typename?: 'DriverFamilyRelationshipEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `DriverFamilyRelationship` at the end of the edge. */
  node?: Maybe<DriverFamilyRelationship>;
};

/** An input for mutations affecting `DriverFamilyRelationship` */
export type DriverFamilyRelationshipInput = {
  driverId: Scalars['String']['input'];
  otherDriverId: Scalars['String']['input'];
  positionDisplayOrder: Scalars['Int']['input'];
  type: Scalars['String']['input'];
};

/** Methods to use when ordering `DriverFamilyRelationship`. */
export enum DriverFamilyRelationshipOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  Natural = 'NATURAL',
  OtherDriverIdAsc = 'OTHER_DRIVER_ID_ASC',
  OtherDriverIdDesc = 'OTHER_DRIVER_ID_DESC',
  PositionDisplayOrderAsc = 'POSITION_DISPLAY_ORDER_ASC',
  PositionDisplayOrderDesc = 'POSITION_DISPLAY_ORDER_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC'
}

/** Represents an update to a `DriverFamilyRelationship`. Fields that are set will be updated. */
export type DriverFamilyRelationshipPatch = {
  driverId?: InputMaybe<Scalars['String']['input']>;
  otherDriverId?: InputMaybe<Scalars['String']['input']>;
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** An input for mutations affecting `Driver` */
export type DriverInput = {
  abbreviation: Scalars['String']['input'];
  bestChampionshipPosition?: InputMaybe<Scalars['Int']['input']>;
  bestRaceResult?: InputMaybe<Scalars['Int']['input']>;
  bestSprintRaceResult?: InputMaybe<Scalars['Int']['input']>;
  bestStartingGridPosition?: InputMaybe<Scalars['Int']['input']>;
  countryOfBirthCountryId: Scalars['String']['input'];
  dateOfBirth: Scalars['Date']['input'];
  dateOfDeath?: InputMaybe<Scalars['Date']['input']>;
  firstName: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  name: Scalars['String']['input'];
  nationalityCountryId: Scalars['String']['input'];
  permanentNumber?: InputMaybe<Scalars['String']['input']>;
  placeOfBirth: Scalars['String']['input'];
  rowId: Scalars['String']['input'];
  secondNationalityCountryId?: InputMaybe<Scalars['String']['input']>;
  totalChampionshipPoints: Scalars['BigFloat']['input'];
  totalChampionshipWins: Scalars['Int']['input'];
  totalDriverOfTheDay: Scalars['Int']['input'];
  totalFastestLaps: Scalars['Int']['input'];
  totalGrandSlams: Scalars['Int']['input'];
  totalPodiums: Scalars['Int']['input'];
  totalPoints: Scalars['BigFloat']['input'];
  totalPolePositions: Scalars['Int']['input'];
  totalRaceEntries: Scalars['Int']['input'];
  totalRaceLaps: Scalars['Int']['input'];
  totalRaceStarts: Scalars['Int']['input'];
  totalRaceWins: Scalars['Int']['input'];
  totalSprintRaceStarts: Scalars['Int']['input'];
  totalSprintRaceWins: Scalars['Int']['input'];
};

export type DriverOfTheDayResult = Node & {
  __typename?: 'DriverOfTheDayResult';
  /** Reads a single `Driver` that is related to this `DriverOfTheDayResult`. */
  driver?: Maybe<Driver>;
  driverId?: Maybe<Scalars['String']['output']>;
  driverNumber?: Maybe<Scalars['String']['output']>;
  engineManufacturerId?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  percentage?: Maybe<Scalars['BigFloat']['output']>;
  positionDisplayOrder: Scalars['Int']['output'];
  positionNumber?: Maybe<Scalars['Int']['output']>;
  positionText?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Race` that is related to this `DriverOfTheDayResult`. */
  race?: Maybe<Race>;
  raceId: Scalars['Int']['output'];
  /** Reads a single `Team` that is related to this `DriverOfTheDayResult`. */
  team?: Maybe<Team>;
  teamId?: Maybe<Scalars['String']['output']>;
  tyreManufacturerId?: Maybe<Scalars['String']['output']>;
};

/**
 * A condition to be used against `DriverOfTheDayResult` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type DriverOfTheDayResultCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `driverNumber` field. */
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `engineManufacturerId` field. */
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `percentage` field. */
  percentage?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Checks for equality with the object’s `positionDisplayOrder` field. */
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionNumber` field. */
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionText` field. */
  positionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `tyreManufacturerId` field. */
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `DriverOfTheDayResult` values. */
export type DriverOfTheDayResultConnection = {
  __typename?: 'DriverOfTheDayResultConnection';
  /** A list of edges which contains the `DriverOfTheDayResult` and cursor to aid in pagination. */
  edges: Array<Maybe<DriverOfTheDayResultEdge>>;
  /** A list of `DriverOfTheDayResult` objects. */
  nodes: Array<Maybe<DriverOfTheDayResult>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `DriverOfTheDayResult` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `DriverOfTheDayResult` edge in the connection. */
export type DriverOfTheDayResultEdge = {
  __typename?: 'DriverOfTheDayResultEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `DriverOfTheDayResult` at the end of the edge. */
  node?: Maybe<DriverOfTheDayResult>;
};

/** An input for mutations affecting `DriverOfTheDayResult` */
export type DriverOfTheDayResultInput = {
  driverId?: InputMaybe<Scalars['String']['input']>;
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  percentage?: InputMaybe<Scalars['BigFloat']['input']>;
  positionDisplayOrder: Scalars['Int']['input'];
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  raceId: Scalars['Int']['input'];
  teamId?: InputMaybe<Scalars['String']['input']>;
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `DriverOfTheDayResult`. */
export enum DriverOfTheDayResultOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  DriverNumberAsc = 'DRIVER_NUMBER_ASC',
  DriverNumberDesc = 'DRIVER_NUMBER_DESC',
  EngineManufacturerIdAsc = 'ENGINE_MANUFACTURER_ID_ASC',
  EngineManufacturerIdDesc = 'ENGINE_MANUFACTURER_ID_DESC',
  Natural = 'NATURAL',
  PercentageAsc = 'PERCENTAGE_ASC',
  PercentageDesc = 'PERCENTAGE_DESC',
  PositionDisplayOrderAsc = 'POSITION_DISPLAY_ORDER_ASC',
  PositionDisplayOrderDesc = 'POSITION_DISPLAY_ORDER_DESC',
  PositionNumberAsc = 'POSITION_NUMBER_ASC',
  PositionNumberDesc = 'POSITION_NUMBER_DESC',
  PositionTextAsc = 'POSITION_TEXT_ASC',
  PositionTextDesc = 'POSITION_TEXT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  TyreManufacturerIdAsc = 'TYRE_MANUFACTURER_ID_ASC',
  TyreManufacturerIdDesc = 'TYRE_MANUFACTURER_ID_DESC'
}

/** Represents an update to a `DriverOfTheDayResult`. Fields that are set will be updated. */
export type DriverOfTheDayResultPatch = {
  driverId?: InputMaybe<Scalars['String']['input']>;
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  percentage?: InputMaybe<Scalars['BigFloat']['input']>;
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `Driver`. */
export enum DriverOrderBy {
  AbbreviationAsc = 'ABBREVIATION_ASC',
  AbbreviationDesc = 'ABBREVIATION_DESC',
  CountryOfBirthCountryIdAsc = 'COUNTRY_OF_BIRTH_COUNTRY_ID_ASC',
  CountryOfBirthCountryIdDesc = 'COUNTRY_OF_BIRTH_COUNTRY_ID_DESC',
  DateOfBirthAsc = 'DATE_OF_BIRTH_ASC',
  DateOfBirthDesc = 'DATE_OF_BIRTH_DESC',
  DateOfDeathAsc = 'DATE_OF_DEATH_ASC',
  DateOfDeathDesc = 'DATE_OF_DEATH_DESC',
  FirstNameAsc = 'FIRST_NAME_ASC',
  FirstNameDesc = 'FIRST_NAME_DESC',
  FullNameAsc = 'FULL_NAME_ASC',
  FullNameDesc = 'FULL_NAME_DESC',
  GenderAsc = 'GENDER_ASC',
  GenderDesc = 'GENDER_DESC',
  LastNameAsc = 'LAST_NAME_ASC',
  LastNameDesc = 'LAST_NAME_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  NationalityCountryIdAsc = 'NATIONALITY_COUNTRY_ID_ASC',
  NationalityCountryIdDesc = 'NATIONALITY_COUNTRY_ID_DESC',
  Natural = 'NATURAL',
  PermanentNumberAsc = 'PERMANENT_NUMBER_ASC',
  PermanentNumberDesc = 'PERMANENT_NUMBER_DESC',
  PlaceOfBirthAsc = 'PLACE_OF_BIRTH_ASC',
  PlaceOfBirthDesc = 'PLACE_OF_BIRTH_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  SecondNationalityCountryIdAsc = 'SECOND_NATIONALITY_COUNTRY_ID_ASC',
  SecondNationalityCountryIdDesc = 'SECOND_NATIONALITY_COUNTRY_ID_DESC'
}

/** Represents an update to a `Driver`. Fields that are set will be updated. */
export type DriverPatch = {
  abbreviation?: InputMaybe<Scalars['String']['input']>;
  bestChampionshipPosition?: InputMaybe<Scalars['Int']['input']>;
  bestRaceResult?: InputMaybe<Scalars['Int']['input']>;
  bestSprintRaceResult?: InputMaybe<Scalars['Int']['input']>;
  bestStartingGridPosition?: InputMaybe<Scalars['Int']['input']>;
  countryOfBirthCountryId?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth?: InputMaybe<Scalars['Date']['input']>;
  dateOfDeath?: InputMaybe<Scalars['Date']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nationalityCountryId?: InputMaybe<Scalars['String']['input']>;
  permanentNumber?: InputMaybe<Scalars['String']['input']>;
  placeOfBirth?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['String']['input']>;
  secondNationalityCountryId?: InputMaybe<Scalars['String']['input']>;
  totalChampionshipPoints?: InputMaybe<Scalars['BigFloat']['input']>;
  totalChampionshipWins?: InputMaybe<Scalars['Int']['input']>;
  totalDriverOfTheDay?: InputMaybe<Scalars['Int']['input']>;
  totalFastestLaps?: InputMaybe<Scalars['Int']['input']>;
  totalGrandSlams?: InputMaybe<Scalars['Int']['input']>;
  totalPodiums?: InputMaybe<Scalars['Int']['input']>;
  totalPoints?: InputMaybe<Scalars['BigFloat']['input']>;
  totalPolePositions?: InputMaybe<Scalars['Int']['input']>;
  totalRaceEntries?: InputMaybe<Scalars['Int']['input']>;
  totalRaceLaps?: InputMaybe<Scalars['Int']['input']>;
  totalRaceStarts?: InputMaybe<Scalars['Int']['input']>;
  totalRaceWins?: InputMaybe<Scalars['Int']['input']>;
  totalSprintRaceStarts?: InputMaybe<Scalars['Int']['input']>;
  totalSprintRaceWins?: InputMaybe<Scalars['Int']['input']>;
};

export type Engine = Node & {
  __typename?: 'Engine';
  aspiration?: Maybe<Scalars['String']['output']>;
  capacity?: Maybe<Scalars['BigFloat']['output']>;
  configuration?: Maybe<Scalars['String']['output']>;
  /** Reads a single `EngineManufacturer` that is related to this `Engine`. */
  engineManufacturer?: Maybe<EngineManufacturer>;
  engineManufacturerId: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  rowId: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `SeasonEntrantEngine`. */
  seasonEntrantEngines: SeasonEntrantEngineConnection;
};


export type EngineSeasonEntrantEnginesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantEngineCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantEngineOrderBy>>;
};

/** A condition to be used against `Engine` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type EngineCondition = {
  /** Checks for equality with the object’s `aspiration` field. */
  aspiration?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `capacity` field. */
  capacity?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Checks for equality with the object’s `configuration` field. */
  configuration?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `engineManufacturerId` field. */
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `fullName` field. */
  fullName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `Engine` values. */
export type EngineConnection = {
  __typename?: 'EngineConnection';
  /** A list of edges which contains the `Engine` and cursor to aid in pagination. */
  edges: Array<Maybe<EngineEdge>>;
  /** A list of `Engine` objects. */
  nodes: Array<Maybe<Engine>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Engine` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Engine` edge in the connection. */
export type EngineEdge = {
  __typename?: 'EngineEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Engine` at the end of the edge. */
  node?: Maybe<Engine>;
};

/** An input for mutations affecting `Engine` */
export type EngineInput = {
  aspiration?: InputMaybe<Scalars['String']['input']>;
  capacity?: InputMaybe<Scalars['BigFloat']['input']>;
  configuration?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  name: Scalars['String']['input'];
  rowId: Scalars['String']['input'];
};

export type EngineManufacturer = Node & {
  __typename?: 'EngineManufacturer';
  bestChampionshipPosition?: Maybe<Scalars['Int']['output']>;
  bestRaceResult?: Maybe<Scalars['Int']['output']>;
  bestSprintRaceResult?: Maybe<Scalars['Int']['output']>;
  bestStartingGridPosition?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `Country` that is related to this `EngineManufacturer`. */
  country?: Maybe<Country>;
  countryId: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `Engine`. */
  engines: EngineConnection;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `RaceDatum`. */
  raceData: RaceDatumConnection;
  /** Reads and enables pagination through a set of `RaceTeamStanding`. */
  raceTeamStandings: RaceTeamStandingConnection;
  rowId: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `SeasonEngineManufacturer`. */
  seasonEngineManufacturers: SeasonEngineManufacturerConnection;
  /** Reads and enables pagination through a set of `SeasonEntrantChassis`. */
  seasonEntrantChassises: SeasonEntrantChassisConnection;
  /** Reads and enables pagination through a set of `SeasonEntrantDriver`. */
  seasonEntrantDrivers: SeasonEntrantDriverConnection;
  /** Reads and enables pagination through a set of `SeasonEntrantEngine`. */
  seasonEntrantEngines: SeasonEntrantEngineConnection;
  /** Reads and enables pagination through a set of `SeasonEntrantTeam`. */
  seasonEntrantTeams: SeasonEntrantTeamConnection;
  /** Reads and enables pagination through a set of `SeasonEntrantTyreManufacturer`. */
  seasonEntrantTyreManufacturers: SeasonEntrantTyreManufacturerConnection;
  /** Reads and enables pagination through a set of `SeasonTeamStanding`. */
  seasonTeamStandings: SeasonTeamStandingConnection;
  totalChampionshipPoints: Scalars['BigFloat']['output'];
  totalChampionshipWins: Scalars['Int']['output'];
  totalFastestLaps: Scalars['Int']['output'];
  totalPodiumRaces: Scalars['Int']['output'];
  totalPodiums: Scalars['Int']['output'];
  totalPoints: Scalars['BigFloat']['output'];
  totalPolePositions: Scalars['Int']['output'];
  totalRaceEntries: Scalars['Int']['output'];
  totalRaceLaps: Scalars['Int']['output'];
  totalRaceStarts: Scalars['Int']['output'];
  totalRaceWins: Scalars['Int']['output'];
  totalSprintRaceStarts: Scalars['Int']['output'];
  totalSprintRaceWins: Scalars['Int']['output'];
};


export type EngineManufacturerEnginesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<EngineCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EngineOrderBy>>;
};


export type EngineManufacturerRaceDataArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RaceDatumCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceDatumOrderBy>>;
};


export type EngineManufacturerRaceTeamStandingsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RaceTeamStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceTeamStandingOrderBy>>;
};


export type EngineManufacturerSeasonEngineManufacturersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEngineManufacturerCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEngineManufacturerOrderBy>>;
};


export type EngineManufacturerSeasonEntrantChassisesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantChassisCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantChassisOrderBy>>;
};


export type EngineManufacturerSeasonEntrantDriversArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantDriverCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantDriverOrderBy>>;
};


export type EngineManufacturerSeasonEntrantEnginesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantEngineCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantEngineOrderBy>>;
};


export type EngineManufacturerSeasonEntrantTeamsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantTeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantTeamOrderBy>>;
};


export type EngineManufacturerSeasonEntrantTyreManufacturersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantTyreManufacturerCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantTyreManufacturerOrderBy>>;
};


export type EngineManufacturerSeasonTeamStandingsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonTeamStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonTeamStandingOrderBy>>;
};

/**
 * A condition to be used against `EngineManufacturer` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type EngineManufacturerCondition = {
  /** Checks for equality with the object’s `countryId` field. */
  countryId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `EngineManufacturer` values. */
export type EngineManufacturerConnection = {
  __typename?: 'EngineManufacturerConnection';
  /** A list of edges which contains the `EngineManufacturer` and cursor to aid in pagination. */
  edges: Array<Maybe<EngineManufacturerEdge>>;
  /** A list of `EngineManufacturer` objects. */
  nodes: Array<Maybe<EngineManufacturer>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `EngineManufacturer` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `EngineManufacturer` edge in the connection. */
export type EngineManufacturerEdge = {
  __typename?: 'EngineManufacturerEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `EngineManufacturer` at the end of the edge. */
  node?: Maybe<EngineManufacturer>;
};

/** An input for mutations affecting `EngineManufacturer` */
export type EngineManufacturerInput = {
  bestChampionshipPosition?: InputMaybe<Scalars['Int']['input']>;
  bestRaceResult?: InputMaybe<Scalars['Int']['input']>;
  bestSprintRaceResult?: InputMaybe<Scalars['Int']['input']>;
  bestStartingGridPosition?: InputMaybe<Scalars['Int']['input']>;
  countryId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  rowId: Scalars['String']['input'];
  totalChampionshipPoints: Scalars['BigFloat']['input'];
  totalChampionshipWins: Scalars['Int']['input'];
  totalFastestLaps: Scalars['Int']['input'];
  totalPodiumRaces: Scalars['Int']['input'];
  totalPodiums: Scalars['Int']['input'];
  totalPoints: Scalars['BigFloat']['input'];
  totalPolePositions: Scalars['Int']['input'];
  totalRaceEntries: Scalars['Int']['input'];
  totalRaceLaps: Scalars['Int']['input'];
  totalRaceStarts: Scalars['Int']['input'];
  totalRaceWins: Scalars['Int']['input'];
  totalSprintRaceStarts: Scalars['Int']['input'];
  totalSprintRaceWins: Scalars['Int']['input'];
};

/** Methods to use when ordering `EngineManufacturer`. */
export enum EngineManufacturerOrderBy {
  CountryIdAsc = 'COUNTRY_ID_ASC',
  CountryIdDesc = 'COUNTRY_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** Represents an update to a `EngineManufacturer`. Fields that are set will be updated. */
export type EngineManufacturerPatch = {
  bestChampionshipPosition?: InputMaybe<Scalars['Int']['input']>;
  bestRaceResult?: InputMaybe<Scalars['Int']['input']>;
  bestSprintRaceResult?: InputMaybe<Scalars['Int']['input']>;
  bestStartingGridPosition?: InputMaybe<Scalars['Int']['input']>;
  countryId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['String']['input']>;
  totalChampionshipPoints?: InputMaybe<Scalars['BigFloat']['input']>;
  totalChampionshipWins?: InputMaybe<Scalars['Int']['input']>;
  totalFastestLaps?: InputMaybe<Scalars['Int']['input']>;
  totalPodiumRaces?: InputMaybe<Scalars['Int']['input']>;
  totalPodiums?: InputMaybe<Scalars['Int']['input']>;
  totalPoints?: InputMaybe<Scalars['BigFloat']['input']>;
  totalPolePositions?: InputMaybe<Scalars['Int']['input']>;
  totalRaceEntries?: InputMaybe<Scalars['Int']['input']>;
  totalRaceLaps?: InputMaybe<Scalars['Int']['input']>;
  totalRaceStarts?: InputMaybe<Scalars['Int']['input']>;
  totalRaceWins?: InputMaybe<Scalars['Int']['input']>;
  totalSprintRaceStarts?: InputMaybe<Scalars['Int']['input']>;
  totalSprintRaceWins?: InputMaybe<Scalars['Int']['input']>;
};

/** Methods to use when ordering `Engine`. */
export enum EngineOrderBy {
  AspirationAsc = 'ASPIRATION_ASC',
  AspirationDesc = 'ASPIRATION_DESC',
  CapacityAsc = 'CAPACITY_ASC',
  CapacityDesc = 'CAPACITY_DESC',
  ConfigurationAsc = 'CONFIGURATION_ASC',
  ConfigurationDesc = 'CONFIGURATION_DESC',
  EngineManufacturerIdAsc = 'ENGINE_MANUFACTURER_ID_ASC',
  EngineManufacturerIdDesc = 'ENGINE_MANUFACTURER_ID_DESC',
  FullNameAsc = 'FULL_NAME_ASC',
  FullNameDesc = 'FULL_NAME_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** Represents an update to a `Engine`. Fields that are set will be updated. */
export type EnginePatch = {
  aspiration?: InputMaybe<Scalars['String']['input']>;
  capacity?: InputMaybe<Scalars['BigFloat']['input']>;
  configuration?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['String']['input']>;
};

export type Entrant = Node & {
  __typename?: 'Entrant';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  rowId: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `SeasonEntrantChassis`. */
  seasonEntrantChassises: SeasonEntrantChassisConnection;
  /** Reads and enables pagination through a set of `SeasonEntrantDriver`. */
  seasonEntrantDrivers: SeasonEntrantDriverConnection;
  /** Reads and enables pagination through a set of `SeasonEntrantEngine`. */
  seasonEntrantEngines: SeasonEntrantEngineConnection;
  /** Reads and enables pagination through a set of `SeasonEntrantTeam`. */
  seasonEntrantTeams: SeasonEntrantTeamConnection;
  /** Reads and enables pagination through a set of `SeasonEntrantTyreManufacturer`. */
  seasonEntrantTyreManufacturers: SeasonEntrantTyreManufacturerConnection;
  /** Reads and enables pagination through a set of `SeasonEntrant`. */
  seasonEntrants: SeasonEntrantConnection;
};


export type EntrantSeasonEntrantChassisesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantChassisCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantChassisOrderBy>>;
};


export type EntrantSeasonEntrantDriversArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantDriverCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantDriverOrderBy>>;
};


export type EntrantSeasonEntrantEnginesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantEngineCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantEngineOrderBy>>;
};


export type EntrantSeasonEntrantTeamsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantTeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantTeamOrderBy>>;
};


export type EntrantSeasonEntrantTyreManufacturersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantTyreManufacturerCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantTyreManufacturerOrderBy>>;
};


export type EntrantSeasonEntrantsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantOrderBy>>;
};

/** A condition to be used against `Entrant` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type EntrantCondition = {
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `Entrant` values. */
export type EntrantConnection = {
  __typename?: 'EntrantConnection';
  /** A list of edges which contains the `Entrant` and cursor to aid in pagination. */
  edges: Array<Maybe<EntrantEdge>>;
  /** A list of `Entrant` objects. */
  nodes: Array<Maybe<Entrant>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Entrant` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Entrant` edge in the connection. */
export type EntrantEdge = {
  __typename?: 'EntrantEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Entrant` at the end of the edge. */
  node?: Maybe<Entrant>;
};

/** An input for mutations affecting `Entrant` */
export type EntrantInput = {
  name: Scalars['String']['input'];
  rowId: Scalars['String']['input'];
};

/** Methods to use when ordering `Entrant`. */
export enum EntrantOrderBy {
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** Represents an update to a `Entrant`. Fields that are set will be updated. */
export type EntrantPatch = {
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['String']['input']>;
};

export type FastestLap = Node & {
  __typename?: 'FastestLap';
  /** Reads a single `Driver` that is related to this `FastestLap`. */
  driver?: Maybe<Driver>;
  driverId?: Maybe<Scalars['String']['output']>;
  driverNumber?: Maybe<Scalars['String']['output']>;
  engineManufacturerId?: Maybe<Scalars['String']['output']>;
  gap?: Maybe<Scalars['String']['output']>;
  gapMillis?: Maybe<Scalars['Int']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  interval?: Maybe<Scalars['String']['output']>;
  intervalMillis?: Maybe<Scalars['Int']['output']>;
  lap?: Maybe<Scalars['Int']['output']>;
  positionDisplayOrder: Scalars['Int']['output'];
  positionNumber?: Maybe<Scalars['Int']['output']>;
  positionText?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Race` that is related to this `FastestLap`. */
  race?: Maybe<Race>;
  raceId: Scalars['Int']['output'];
  /** Reads a single `Team` that is related to this `FastestLap`. */
  team?: Maybe<Team>;
  teamId?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
  timeMillis?: Maybe<Scalars['Int']['output']>;
  tyreManufacturerId?: Maybe<Scalars['String']['output']>;
};

/**
 * A condition to be used against `FastestLap` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type FastestLapCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `driverNumber` field. */
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `engineManufacturerId` field. */
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gap` field. */
  gap?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gapMillis` field. */
  gapMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `interval` field. */
  interval?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `intervalMillis` field. */
  intervalMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `lap` field. */
  lap?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionDisplayOrder` field. */
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionNumber` field. */
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionText` field. */
  positionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `time` field. */
  time?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `timeMillis` field. */
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `tyreManufacturerId` field. */
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `FastestLap` values. */
export type FastestLapConnection = {
  __typename?: 'FastestLapConnection';
  /** A list of edges which contains the `FastestLap` and cursor to aid in pagination. */
  edges: Array<Maybe<FastestLapEdge>>;
  /** A list of `FastestLap` objects. */
  nodes: Array<Maybe<FastestLap>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `FastestLap` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `FastestLap` edge in the connection. */
export type FastestLapEdge = {
  __typename?: 'FastestLapEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `FastestLap` at the end of the edge. */
  node?: Maybe<FastestLap>;
};

/** An input for mutations affecting `FastestLap` */
export type FastestLapInput = {
  driverId?: InputMaybe<Scalars['String']['input']>;
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  gap?: InputMaybe<Scalars['String']['input']>;
  gapMillis?: InputMaybe<Scalars['Int']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  intervalMillis?: InputMaybe<Scalars['Int']['input']>;
  lap?: InputMaybe<Scalars['Int']['input']>;
  positionDisplayOrder: Scalars['Int']['input'];
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  raceId: Scalars['Int']['input'];
  teamId?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `FastestLap`. */
export enum FastestLapOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  DriverNumberAsc = 'DRIVER_NUMBER_ASC',
  DriverNumberDesc = 'DRIVER_NUMBER_DESC',
  EngineManufacturerIdAsc = 'ENGINE_MANUFACTURER_ID_ASC',
  EngineManufacturerIdDesc = 'ENGINE_MANUFACTURER_ID_DESC',
  GapAsc = 'GAP_ASC',
  GapDesc = 'GAP_DESC',
  GapMillisAsc = 'GAP_MILLIS_ASC',
  GapMillisDesc = 'GAP_MILLIS_DESC',
  IntervalAsc = 'INTERVAL_ASC',
  IntervalDesc = 'INTERVAL_DESC',
  IntervalMillisAsc = 'INTERVAL_MILLIS_ASC',
  IntervalMillisDesc = 'INTERVAL_MILLIS_DESC',
  LapAsc = 'LAP_ASC',
  LapDesc = 'LAP_DESC',
  Natural = 'NATURAL',
  PositionDisplayOrderAsc = 'POSITION_DISPLAY_ORDER_ASC',
  PositionDisplayOrderDesc = 'POSITION_DISPLAY_ORDER_DESC',
  PositionNumberAsc = 'POSITION_NUMBER_ASC',
  PositionNumberDesc = 'POSITION_NUMBER_DESC',
  PositionTextAsc = 'POSITION_TEXT_ASC',
  PositionTextDesc = 'POSITION_TEXT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  TimeAsc = 'TIME_ASC',
  TimeDesc = 'TIME_DESC',
  TimeMillisAsc = 'TIME_MILLIS_ASC',
  TimeMillisDesc = 'TIME_MILLIS_DESC',
  TyreManufacturerIdAsc = 'TYRE_MANUFACTURER_ID_ASC',
  TyreManufacturerIdDesc = 'TYRE_MANUFACTURER_ID_DESC'
}

/** Represents an update to a `FastestLap`. Fields that are set will be updated. */
export type FastestLapPatch = {
  driverId?: InputMaybe<Scalars['String']['input']>;
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  gap?: InputMaybe<Scalars['String']['input']>;
  gapMillis?: InputMaybe<Scalars['Int']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  intervalMillis?: InputMaybe<Scalars['Int']['input']>;
  lap?: InputMaybe<Scalars['Int']['input']>;
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

export type FreePractice1Result = {
  __typename?: 'FreePractice1Result';
  driverId?: Maybe<Scalars['String']['output']>;
  driverNumber?: Maybe<Scalars['String']['output']>;
  engineManufacturerId?: Maybe<Scalars['String']['output']>;
  gap?: Maybe<Scalars['String']['output']>;
  gapMillis?: Maybe<Scalars['Int']['output']>;
  interval?: Maybe<Scalars['String']['output']>;
  intervalMillis?: Maybe<Scalars['Int']['output']>;
  laps?: Maybe<Scalars['Int']['output']>;
  positionDisplayOrder?: Maybe<Scalars['Int']['output']>;
  positionNumber?: Maybe<Scalars['Int']['output']>;
  positionText?: Maybe<Scalars['String']['output']>;
  raceId?: Maybe<Scalars['Int']['output']>;
  teamId?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
  timeMillis?: Maybe<Scalars['Int']['output']>;
  tyreManufacturerId?: Maybe<Scalars['String']['output']>;
};

/**
 * A condition to be used against `FreePractice1Result` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type FreePractice1ResultCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `driverNumber` field. */
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `engineManufacturerId` field. */
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gap` field. */
  gap?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gapMillis` field. */
  gapMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `interval` field. */
  interval?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `intervalMillis` field. */
  intervalMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `laps` field. */
  laps?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionDisplayOrder` field. */
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionNumber` field. */
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionText` field. */
  positionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `time` field. */
  time?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `timeMillis` field. */
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `tyreManufacturerId` field. */
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `FreePractice1Result` values. */
export type FreePractice1ResultConnection = {
  __typename?: 'FreePractice1ResultConnection';
  /** A list of edges which contains the `FreePractice1Result` and cursor to aid in pagination. */
  edges: Array<Maybe<FreePractice1ResultEdge>>;
  /** A list of `FreePractice1Result` objects. */
  nodes: Array<Maybe<FreePractice1Result>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `FreePractice1Result` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `FreePractice1Result` edge in the connection. */
export type FreePractice1ResultEdge = {
  __typename?: 'FreePractice1ResultEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `FreePractice1Result` at the end of the edge. */
  node?: Maybe<FreePractice1Result>;
};

/** An input for mutations affecting `FreePractice1Result` */
export type FreePractice1ResultInput = {
  driverId?: InputMaybe<Scalars['String']['input']>;
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  gap?: InputMaybe<Scalars['String']['input']>;
  gapMillis?: InputMaybe<Scalars['Int']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  intervalMillis?: InputMaybe<Scalars['Int']['input']>;
  laps?: InputMaybe<Scalars['Int']['input']>;
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `FreePractice1Result`. */
export enum FreePractice1ResultOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  DriverNumberAsc = 'DRIVER_NUMBER_ASC',
  DriverNumberDesc = 'DRIVER_NUMBER_DESC',
  EngineManufacturerIdAsc = 'ENGINE_MANUFACTURER_ID_ASC',
  EngineManufacturerIdDesc = 'ENGINE_MANUFACTURER_ID_DESC',
  GapAsc = 'GAP_ASC',
  GapDesc = 'GAP_DESC',
  GapMillisAsc = 'GAP_MILLIS_ASC',
  GapMillisDesc = 'GAP_MILLIS_DESC',
  IntervalAsc = 'INTERVAL_ASC',
  IntervalDesc = 'INTERVAL_DESC',
  IntervalMillisAsc = 'INTERVAL_MILLIS_ASC',
  IntervalMillisDesc = 'INTERVAL_MILLIS_DESC',
  LapsAsc = 'LAPS_ASC',
  LapsDesc = 'LAPS_DESC',
  Natural = 'NATURAL',
  PositionDisplayOrderAsc = 'POSITION_DISPLAY_ORDER_ASC',
  PositionDisplayOrderDesc = 'POSITION_DISPLAY_ORDER_DESC',
  PositionNumberAsc = 'POSITION_NUMBER_ASC',
  PositionNumberDesc = 'POSITION_NUMBER_DESC',
  PositionTextAsc = 'POSITION_TEXT_ASC',
  PositionTextDesc = 'POSITION_TEXT_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  TimeAsc = 'TIME_ASC',
  TimeDesc = 'TIME_DESC',
  TimeMillisAsc = 'TIME_MILLIS_ASC',
  TimeMillisDesc = 'TIME_MILLIS_DESC',
  TyreManufacturerIdAsc = 'TYRE_MANUFACTURER_ID_ASC',
  TyreManufacturerIdDesc = 'TYRE_MANUFACTURER_ID_DESC'
}

export type FreePractice2Result = {
  __typename?: 'FreePractice2Result';
  driverId?: Maybe<Scalars['String']['output']>;
  driverNumber?: Maybe<Scalars['String']['output']>;
  engineManufacturerId?: Maybe<Scalars['String']['output']>;
  gap?: Maybe<Scalars['String']['output']>;
  gapMillis?: Maybe<Scalars['Int']['output']>;
  interval?: Maybe<Scalars['String']['output']>;
  intervalMillis?: Maybe<Scalars['Int']['output']>;
  laps?: Maybe<Scalars['Int']['output']>;
  positionDisplayOrder?: Maybe<Scalars['Int']['output']>;
  positionNumber?: Maybe<Scalars['Int']['output']>;
  positionText?: Maybe<Scalars['String']['output']>;
  raceId?: Maybe<Scalars['Int']['output']>;
  teamId?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
  timeMillis?: Maybe<Scalars['Int']['output']>;
  tyreManufacturerId?: Maybe<Scalars['String']['output']>;
};

/**
 * A condition to be used against `FreePractice2Result` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type FreePractice2ResultCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `driverNumber` field. */
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `engineManufacturerId` field. */
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gap` field. */
  gap?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gapMillis` field. */
  gapMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `interval` field. */
  interval?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `intervalMillis` field. */
  intervalMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `laps` field. */
  laps?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionDisplayOrder` field. */
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionNumber` field. */
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionText` field. */
  positionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `time` field. */
  time?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `timeMillis` field. */
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `tyreManufacturerId` field. */
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `FreePractice2Result` values. */
export type FreePractice2ResultConnection = {
  __typename?: 'FreePractice2ResultConnection';
  /** A list of edges which contains the `FreePractice2Result` and cursor to aid in pagination. */
  edges: Array<Maybe<FreePractice2ResultEdge>>;
  /** A list of `FreePractice2Result` objects. */
  nodes: Array<Maybe<FreePractice2Result>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `FreePractice2Result` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `FreePractice2Result` edge in the connection. */
export type FreePractice2ResultEdge = {
  __typename?: 'FreePractice2ResultEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `FreePractice2Result` at the end of the edge. */
  node?: Maybe<FreePractice2Result>;
};

/** An input for mutations affecting `FreePractice2Result` */
export type FreePractice2ResultInput = {
  driverId?: InputMaybe<Scalars['String']['input']>;
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  gap?: InputMaybe<Scalars['String']['input']>;
  gapMillis?: InputMaybe<Scalars['Int']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  intervalMillis?: InputMaybe<Scalars['Int']['input']>;
  laps?: InputMaybe<Scalars['Int']['input']>;
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `FreePractice2Result`. */
export enum FreePractice2ResultOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  DriverNumberAsc = 'DRIVER_NUMBER_ASC',
  DriverNumberDesc = 'DRIVER_NUMBER_DESC',
  EngineManufacturerIdAsc = 'ENGINE_MANUFACTURER_ID_ASC',
  EngineManufacturerIdDesc = 'ENGINE_MANUFACTURER_ID_DESC',
  GapAsc = 'GAP_ASC',
  GapDesc = 'GAP_DESC',
  GapMillisAsc = 'GAP_MILLIS_ASC',
  GapMillisDesc = 'GAP_MILLIS_DESC',
  IntervalAsc = 'INTERVAL_ASC',
  IntervalDesc = 'INTERVAL_DESC',
  IntervalMillisAsc = 'INTERVAL_MILLIS_ASC',
  IntervalMillisDesc = 'INTERVAL_MILLIS_DESC',
  LapsAsc = 'LAPS_ASC',
  LapsDesc = 'LAPS_DESC',
  Natural = 'NATURAL',
  PositionDisplayOrderAsc = 'POSITION_DISPLAY_ORDER_ASC',
  PositionDisplayOrderDesc = 'POSITION_DISPLAY_ORDER_DESC',
  PositionNumberAsc = 'POSITION_NUMBER_ASC',
  PositionNumberDesc = 'POSITION_NUMBER_DESC',
  PositionTextAsc = 'POSITION_TEXT_ASC',
  PositionTextDesc = 'POSITION_TEXT_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  TimeAsc = 'TIME_ASC',
  TimeDesc = 'TIME_DESC',
  TimeMillisAsc = 'TIME_MILLIS_ASC',
  TimeMillisDesc = 'TIME_MILLIS_DESC',
  TyreManufacturerIdAsc = 'TYRE_MANUFACTURER_ID_ASC',
  TyreManufacturerIdDesc = 'TYRE_MANUFACTURER_ID_DESC'
}

export type FreePractice3Result = {
  __typename?: 'FreePractice3Result';
  driverId?: Maybe<Scalars['String']['output']>;
  driverNumber?: Maybe<Scalars['String']['output']>;
  engineManufacturerId?: Maybe<Scalars['String']['output']>;
  gap?: Maybe<Scalars['String']['output']>;
  gapMillis?: Maybe<Scalars['Int']['output']>;
  interval?: Maybe<Scalars['String']['output']>;
  intervalMillis?: Maybe<Scalars['Int']['output']>;
  laps?: Maybe<Scalars['Int']['output']>;
  positionDisplayOrder?: Maybe<Scalars['Int']['output']>;
  positionNumber?: Maybe<Scalars['Int']['output']>;
  positionText?: Maybe<Scalars['String']['output']>;
  raceId?: Maybe<Scalars['Int']['output']>;
  teamId?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
  timeMillis?: Maybe<Scalars['Int']['output']>;
  tyreManufacturerId?: Maybe<Scalars['String']['output']>;
};

/**
 * A condition to be used against `FreePractice3Result` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type FreePractice3ResultCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `driverNumber` field. */
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `engineManufacturerId` field. */
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gap` field. */
  gap?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gapMillis` field. */
  gapMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `interval` field. */
  interval?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `intervalMillis` field. */
  intervalMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `laps` field. */
  laps?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionDisplayOrder` field. */
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionNumber` field. */
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionText` field. */
  positionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `time` field. */
  time?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `timeMillis` field. */
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `tyreManufacturerId` field. */
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `FreePractice3Result` values. */
export type FreePractice3ResultConnection = {
  __typename?: 'FreePractice3ResultConnection';
  /** A list of edges which contains the `FreePractice3Result` and cursor to aid in pagination. */
  edges: Array<Maybe<FreePractice3ResultEdge>>;
  /** A list of `FreePractice3Result` objects. */
  nodes: Array<Maybe<FreePractice3Result>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `FreePractice3Result` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `FreePractice3Result` edge in the connection. */
export type FreePractice3ResultEdge = {
  __typename?: 'FreePractice3ResultEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `FreePractice3Result` at the end of the edge. */
  node?: Maybe<FreePractice3Result>;
};

/** An input for mutations affecting `FreePractice3Result` */
export type FreePractice3ResultInput = {
  driverId?: InputMaybe<Scalars['String']['input']>;
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  gap?: InputMaybe<Scalars['String']['input']>;
  gapMillis?: InputMaybe<Scalars['Int']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  intervalMillis?: InputMaybe<Scalars['Int']['input']>;
  laps?: InputMaybe<Scalars['Int']['input']>;
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `FreePractice3Result`. */
export enum FreePractice3ResultOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  DriverNumberAsc = 'DRIVER_NUMBER_ASC',
  DriverNumberDesc = 'DRIVER_NUMBER_DESC',
  EngineManufacturerIdAsc = 'ENGINE_MANUFACTURER_ID_ASC',
  EngineManufacturerIdDesc = 'ENGINE_MANUFACTURER_ID_DESC',
  GapAsc = 'GAP_ASC',
  GapDesc = 'GAP_DESC',
  GapMillisAsc = 'GAP_MILLIS_ASC',
  GapMillisDesc = 'GAP_MILLIS_DESC',
  IntervalAsc = 'INTERVAL_ASC',
  IntervalDesc = 'INTERVAL_DESC',
  IntervalMillisAsc = 'INTERVAL_MILLIS_ASC',
  IntervalMillisDesc = 'INTERVAL_MILLIS_DESC',
  LapsAsc = 'LAPS_ASC',
  LapsDesc = 'LAPS_DESC',
  Natural = 'NATURAL',
  PositionDisplayOrderAsc = 'POSITION_DISPLAY_ORDER_ASC',
  PositionDisplayOrderDesc = 'POSITION_DISPLAY_ORDER_DESC',
  PositionNumberAsc = 'POSITION_NUMBER_ASC',
  PositionNumberDesc = 'POSITION_NUMBER_DESC',
  PositionTextAsc = 'POSITION_TEXT_ASC',
  PositionTextDesc = 'POSITION_TEXT_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  TimeAsc = 'TIME_ASC',
  TimeDesc = 'TIME_DESC',
  TimeMillisAsc = 'TIME_MILLIS_ASC',
  TimeMillisDesc = 'TIME_MILLIS_DESC',
  TyreManufacturerIdAsc = 'TYRE_MANUFACTURER_ID_ASC',
  TyreManufacturerIdDesc = 'TYRE_MANUFACTURER_ID_DESC'
}

export type FreePractice4Result = {
  __typename?: 'FreePractice4Result';
  driverId?: Maybe<Scalars['String']['output']>;
  driverNumber?: Maybe<Scalars['String']['output']>;
  engineManufacturerId?: Maybe<Scalars['String']['output']>;
  gap?: Maybe<Scalars['String']['output']>;
  gapMillis?: Maybe<Scalars['Int']['output']>;
  interval?: Maybe<Scalars['String']['output']>;
  intervalMillis?: Maybe<Scalars['Int']['output']>;
  laps?: Maybe<Scalars['Int']['output']>;
  positionDisplayOrder?: Maybe<Scalars['Int']['output']>;
  positionNumber?: Maybe<Scalars['Int']['output']>;
  positionText?: Maybe<Scalars['String']['output']>;
  raceId?: Maybe<Scalars['Int']['output']>;
  teamId?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
  timeMillis?: Maybe<Scalars['Int']['output']>;
  tyreManufacturerId?: Maybe<Scalars['String']['output']>;
};

/**
 * A condition to be used against `FreePractice4Result` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type FreePractice4ResultCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `driverNumber` field. */
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `engineManufacturerId` field. */
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gap` field. */
  gap?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gapMillis` field. */
  gapMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `interval` field. */
  interval?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `intervalMillis` field. */
  intervalMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `laps` field. */
  laps?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionDisplayOrder` field. */
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionNumber` field. */
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionText` field. */
  positionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `time` field. */
  time?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `timeMillis` field. */
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `tyreManufacturerId` field. */
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `FreePractice4Result` values. */
export type FreePractice4ResultConnection = {
  __typename?: 'FreePractice4ResultConnection';
  /** A list of edges which contains the `FreePractice4Result` and cursor to aid in pagination. */
  edges: Array<Maybe<FreePractice4ResultEdge>>;
  /** A list of `FreePractice4Result` objects. */
  nodes: Array<Maybe<FreePractice4Result>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `FreePractice4Result` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `FreePractice4Result` edge in the connection. */
export type FreePractice4ResultEdge = {
  __typename?: 'FreePractice4ResultEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `FreePractice4Result` at the end of the edge. */
  node?: Maybe<FreePractice4Result>;
};

/** An input for mutations affecting `FreePractice4Result` */
export type FreePractice4ResultInput = {
  driverId?: InputMaybe<Scalars['String']['input']>;
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  gap?: InputMaybe<Scalars['String']['input']>;
  gapMillis?: InputMaybe<Scalars['Int']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  intervalMillis?: InputMaybe<Scalars['Int']['input']>;
  laps?: InputMaybe<Scalars['Int']['input']>;
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `FreePractice4Result`. */
export enum FreePractice4ResultOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  DriverNumberAsc = 'DRIVER_NUMBER_ASC',
  DriverNumberDesc = 'DRIVER_NUMBER_DESC',
  EngineManufacturerIdAsc = 'ENGINE_MANUFACTURER_ID_ASC',
  EngineManufacturerIdDesc = 'ENGINE_MANUFACTURER_ID_DESC',
  GapAsc = 'GAP_ASC',
  GapDesc = 'GAP_DESC',
  GapMillisAsc = 'GAP_MILLIS_ASC',
  GapMillisDesc = 'GAP_MILLIS_DESC',
  IntervalAsc = 'INTERVAL_ASC',
  IntervalDesc = 'INTERVAL_DESC',
  IntervalMillisAsc = 'INTERVAL_MILLIS_ASC',
  IntervalMillisDesc = 'INTERVAL_MILLIS_DESC',
  LapsAsc = 'LAPS_ASC',
  LapsDesc = 'LAPS_DESC',
  Natural = 'NATURAL',
  PositionDisplayOrderAsc = 'POSITION_DISPLAY_ORDER_ASC',
  PositionDisplayOrderDesc = 'POSITION_DISPLAY_ORDER_DESC',
  PositionNumberAsc = 'POSITION_NUMBER_ASC',
  PositionNumberDesc = 'POSITION_NUMBER_DESC',
  PositionTextAsc = 'POSITION_TEXT_ASC',
  PositionTextDesc = 'POSITION_TEXT_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  TimeAsc = 'TIME_ASC',
  TimeDesc = 'TIME_DESC',
  TimeMillisAsc = 'TIME_MILLIS_ASC',
  TimeMillisDesc = 'TIME_MILLIS_DESC',
  TyreManufacturerIdAsc = 'TYRE_MANUFACTURER_ID_ASC',
  TyreManufacturerIdDesc = 'TYRE_MANUFACTURER_ID_DESC'
}

export type GrandPrix = Node & {
  __typename?: 'GrandPrix';
  abbreviation: Scalars['String']['output'];
  /** Reads a single `Country` that is related to this `GrandPrix`. */
  country?: Maybe<Country>;
  countryId?: Maybe<Scalars['String']['output']>;
  fullName: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `Race`. */
  races: RaceConnection;
  rowId: Scalars['String']['output'];
  shortName: Scalars['String']['output'];
  totalRacesHeld: Scalars['Int']['output'];
};


export type GrandPrixRacesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RaceCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceOrderBy>>;
};

/**
 * A condition to be used against `GrandPrix` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type GrandPrixCondition = {
  /** Checks for equality with the object’s `abbreviation` field. */
  abbreviation?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `countryId` field. */
  countryId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `fullName` field. */
  fullName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `shortName` field. */
  shortName?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `GrandPrix` values. */
export type GrandPrixConnection = {
  __typename?: 'GrandPrixConnection';
  /** A list of edges which contains the `GrandPrix` and cursor to aid in pagination. */
  edges: Array<Maybe<GrandPrixEdge>>;
  /** A list of `GrandPrix` objects. */
  nodes: Array<Maybe<GrandPrix>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `GrandPrix` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `GrandPrix` edge in the connection. */
export type GrandPrixEdge = {
  __typename?: 'GrandPrixEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `GrandPrix` at the end of the edge. */
  node?: Maybe<GrandPrix>;
};

/** An input for mutations affecting `GrandPrix` */
export type GrandPrixInput = {
  abbreviation: Scalars['String']['input'];
  countryId?: InputMaybe<Scalars['String']['input']>;
  fullName: Scalars['String']['input'];
  name: Scalars['String']['input'];
  rowId: Scalars['String']['input'];
  shortName: Scalars['String']['input'];
  totalRacesHeld: Scalars['Int']['input'];
};

/** Methods to use when ordering `GrandPrix`. */
export enum GrandPrixOrderBy {
  AbbreviationAsc = 'ABBREVIATION_ASC',
  AbbreviationDesc = 'ABBREVIATION_DESC',
  CountryIdAsc = 'COUNTRY_ID_ASC',
  CountryIdDesc = 'COUNTRY_ID_DESC',
  FullNameAsc = 'FULL_NAME_ASC',
  FullNameDesc = 'FULL_NAME_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  ShortNameAsc = 'SHORT_NAME_ASC',
  ShortNameDesc = 'SHORT_NAME_DESC'
}

/** Represents an update to a `GrandPrix`. Fields that are set will be updated. */
export type GrandPrixPatch = {
  abbreviation?: InputMaybe<Scalars['String']['input']>;
  countryId?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['String']['input']>;
  shortName?: InputMaybe<Scalars['String']['input']>;
  totalRacesHeld?: InputMaybe<Scalars['Int']['input']>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `AppCircuitDescription`. */
  createAppCircuitDescription?: Maybe<CreateAppCircuitDescriptionPayload>;
  /** Creates a single `AppConstructorBio`. */
  createAppConstructorBio?: Maybe<CreateAppConstructorBioPayload>;
  /** Creates a single `AppDriverBio`. */
  createAppDriverBio?: Maybe<CreateAppDriverBioPayload>;
  /** Creates a single `AppIngestState`. */
  createAppIngestState?: Maybe<CreateAppIngestStatePayload>;
  /** Creates a single `AppLapTime`. */
  createAppLapTime?: Maybe<CreateAppLapTimePayload>;
  /** Creates a single `AppTeamColor`. */
  createAppTeamColor?: Maybe<CreateAppTeamColorPayload>;
  /** Creates a single `AppTeamHistory`. */
  createAppTeamHistory?: Maybe<CreateAppTeamHistoryPayload>;
  /** Creates a single `Chassis`. */
  createChassis?: Maybe<CreateChassisPayload>;
  /** Creates a single `Circuit`. */
  createCircuit?: Maybe<CreateCircuitPayload>;
  /** Creates a single `CircuitLayout`. */
  createCircuitLayout?: Maybe<CreateCircuitLayoutPayload>;
  /** Creates a single `Continent`. */
  createContinent?: Maybe<CreateContinentPayload>;
  /** Creates a single `Country`. */
  createCountry?: Maybe<CreateCountryPayload>;
  /** Creates a single `Driver`. */
  createDriver?: Maybe<CreateDriverPayload>;
  /** Creates a single `DriverFamilyRelationship`. */
  createDriverFamilyRelationship?: Maybe<CreateDriverFamilyRelationshipPayload>;
  /** Creates a single `DriverOfTheDayResult`. */
  createDriverOfTheDayResult?: Maybe<CreateDriverOfTheDayResultPayload>;
  /** Creates a single `Engine`. */
  createEngine?: Maybe<CreateEnginePayload>;
  /** Creates a single `EngineManufacturer`. */
  createEngineManufacturer?: Maybe<CreateEngineManufacturerPayload>;
  /** Creates a single `Entrant`. */
  createEntrant?: Maybe<CreateEntrantPayload>;
  /** Creates a single `FastestLap`. */
  createFastestLap?: Maybe<CreateFastestLapPayload>;
  /** Creates a single `FreePractice1Result`. */
  createFreePractice1Result?: Maybe<CreateFreePractice1ResultPayload>;
  /** Creates a single `FreePractice2Result`. */
  createFreePractice2Result?: Maybe<CreateFreePractice2ResultPayload>;
  /** Creates a single `FreePractice3Result`. */
  createFreePractice3Result?: Maybe<CreateFreePractice3ResultPayload>;
  /** Creates a single `FreePractice4Result`. */
  createFreePractice4Result?: Maybe<CreateFreePractice4ResultPayload>;
  /** Creates a single `GrandPrix`. */
  createGrandPrix?: Maybe<CreateGrandPrixPayload>;
  /** Creates a single `PitStop`. */
  createPitStop?: Maybe<CreatePitStopPayload>;
  /** Creates a single `PreQualifyingResult`. */
  createPreQualifyingResult?: Maybe<CreatePreQualifyingResultPayload>;
  /** Creates a single `Qualifying1Result`. */
  createQualifying1Result?: Maybe<CreateQualifying1ResultPayload>;
  /** Creates a single `Qualifying2Result`. */
  createQualifying2Result?: Maybe<CreateQualifying2ResultPayload>;
  /** Creates a single `QualifyingResult`. */
  createQualifyingResult?: Maybe<CreateQualifyingResultPayload>;
  /** Creates a single `Race`. */
  createRace?: Maybe<CreateRacePayload>;
  /** Creates a single `RaceDatum`. */
  createRaceDatum?: Maybe<CreateRaceDatumPayload>;
  /** Creates a single `RaceDriverStanding`. */
  createRaceDriverStanding?: Maybe<CreateRaceDriverStandingPayload>;
  /** Creates a single `RaceResult`. */
  createRaceResult?: Maybe<CreateRaceResultPayload>;
  /** Creates a single `RaceTeamStanding`. */
  createRaceTeamStanding?: Maybe<CreateRaceTeamStandingPayload>;
  /** Creates a single `Season`. */
  createSeason?: Maybe<CreateSeasonPayload>;
  /** Creates a single `SeasonDriver`. */
  createSeasonDriver?: Maybe<CreateSeasonDriverPayload>;
  /** Creates a single `SeasonDriverStanding`. */
  createSeasonDriverStanding?: Maybe<CreateSeasonDriverStandingPayload>;
  /** Creates a single `SeasonEngineManufacturer`. */
  createSeasonEngineManufacturer?: Maybe<CreateSeasonEngineManufacturerPayload>;
  /** Creates a single `SeasonEntrant`. */
  createSeasonEntrant?: Maybe<CreateSeasonEntrantPayload>;
  /** Creates a single `SeasonEntrantChassis`. */
  createSeasonEntrantChassis?: Maybe<CreateSeasonEntrantChassisPayload>;
  /** Creates a single `SeasonEntrantDriver`. */
  createSeasonEntrantDriver?: Maybe<CreateSeasonEntrantDriverPayload>;
  /** Creates a single `SeasonEntrantEngine`. */
  createSeasonEntrantEngine?: Maybe<CreateSeasonEntrantEnginePayload>;
  /** Creates a single `SeasonEntrantTeam`. */
  createSeasonEntrantTeam?: Maybe<CreateSeasonEntrantTeamPayload>;
  /** Creates a single `SeasonEntrantTyreManufacturer`. */
  createSeasonEntrantTyreManufacturer?: Maybe<CreateSeasonEntrantTyreManufacturerPayload>;
  /** Creates a single `SeasonTeam`. */
  createSeasonTeam?: Maybe<CreateSeasonTeamPayload>;
  /** Creates a single `SeasonTeamStanding`. */
  createSeasonTeamStanding?: Maybe<CreateSeasonTeamStandingPayload>;
  /** Creates a single `SeasonTyreManufacturer`. */
  createSeasonTyreManufacturer?: Maybe<CreateSeasonTyreManufacturerPayload>;
  /** Creates a single `SprintQualifyingResult`. */
  createSprintQualifyingResult?: Maybe<CreateSprintQualifyingResultPayload>;
  /** Creates a single `SprintRaceResult`. */
  createSprintRaceResult?: Maybe<CreateSprintRaceResultPayload>;
  /** Creates a single `SprintStartingGridPosition`. */
  createSprintStartingGridPosition?: Maybe<CreateSprintStartingGridPositionPayload>;
  /** Creates a single `StartingGridPosition`. */
  createStartingGridPosition?: Maybe<CreateStartingGridPositionPayload>;
  /** Creates a single `Team`. */
  createTeam?: Maybe<CreateTeamPayload>;
  /** Creates a single `TeamChronology`. */
  createTeamChronology?: Maybe<CreateTeamChronologyPayload>;
  /** Creates a single `TyreManufacturer`. */
  createTyreManufacturer?: Maybe<CreateTyreManufacturerPayload>;
  /** Creates a single `WarmingUpResult`. */
  createWarmingUpResult?: Maybe<CreateWarmingUpResultPayload>;
  /** Deletes a single `AppCircuitDescription` using a unique key. */
  deleteAppCircuitDescription?: Maybe<DeleteAppCircuitDescriptionPayload>;
  /** Deletes a single `AppCircuitDescription` using its globally unique id. */
  deleteAppCircuitDescriptionById?: Maybe<DeleteAppCircuitDescriptionPayload>;
  /** Deletes a single `AppConstructorBio` using a unique key. */
  deleteAppConstructorBio?: Maybe<DeleteAppConstructorBioPayload>;
  /** Deletes a single `AppConstructorBio` using its globally unique id. */
  deleteAppConstructorBioById?: Maybe<DeleteAppConstructorBioPayload>;
  /** Deletes a single `AppDriverBio` using a unique key. */
  deleteAppDriverBio?: Maybe<DeleteAppDriverBioPayload>;
  /** Deletes a single `AppDriverBio` using its globally unique id. */
  deleteAppDriverBioById?: Maybe<DeleteAppDriverBioPayload>;
  /** Deletes a single `AppIngestState` using a unique key. */
  deleteAppIngestState?: Maybe<DeleteAppIngestStatePayload>;
  /** Deletes a single `AppIngestState` using its globally unique id. */
  deleteAppIngestStateById?: Maybe<DeleteAppIngestStatePayload>;
  /** Deletes a single `AppLapTime` using a unique key. */
  deleteAppLapTime?: Maybe<DeleteAppLapTimePayload>;
  /** Deletes a single `AppLapTime` using its globally unique id. */
  deleteAppLapTimeById?: Maybe<DeleteAppLapTimePayload>;
  /** Deletes a single `AppTeamColor` using a unique key. */
  deleteAppTeamColor?: Maybe<DeleteAppTeamColorPayload>;
  /** Deletes a single `AppTeamColor` using its globally unique id. */
  deleteAppTeamColorById?: Maybe<DeleteAppTeamColorPayload>;
  /** Deletes a single `AppTeamHistory` using a unique key. */
  deleteAppTeamHistory?: Maybe<DeleteAppTeamHistoryPayload>;
  /** Deletes a single `AppTeamHistory` using its globally unique id. */
  deleteAppTeamHistoryById?: Maybe<DeleteAppTeamHistoryPayload>;
  /** Deletes a single `Chassis` using a unique key. */
  deleteChassis?: Maybe<DeleteChassisPayload>;
  /** Deletes a single `Chassis` using its globally unique id. */
  deleteChassisById?: Maybe<DeleteChassisPayload>;
  /** Deletes a single `Circuit` using a unique key. */
  deleteCircuit?: Maybe<DeleteCircuitPayload>;
  /** Deletes a single `Circuit` using its globally unique id. */
  deleteCircuitById?: Maybe<DeleteCircuitPayload>;
  /** Deletes a single `CircuitLayout` using a unique key. */
  deleteCircuitLayout?: Maybe<DeleteCircuitLayoutPayload>;
  /** Deletes a single `CircuitLayout` using its globally unique id. */
  deleteCircuitLayoutById?: Maybe<DeleteCircuitLayoutPayload>;
  /** Deletes a single `Continent` using a unique key. */
  deleteContinent?: Maybe<DeleteContinentPayload>;
  /** Deletes a single `Continent` using a unique key. */
  deleteContinentByCode?: Maybe<DeleteContinentPayload>;
  /** Deletes a single `Continent` using its globally unique id. */
  deleteContinentById?: Maybe<DeleteContinentPayload>;
  /** Deletes a single `Continent` using a unique key. */
  deleteContinentByName?: Maybe<DeleteContinentPayload>;
  /** Deletes a single `Country` using a unique key. */
  deleteCountry?: Maybe<DeleteCountryPayload>;
  /** Deletes a single `Country` using a unique key. */
  deleteCountryByAlpha2Code?: Maybe<DeleteCountryPayload>;
  /** Deletes a single `Country` using a unique key. */
  deleteCountryByAlpha3Code?: Maybe<DeleteCountryPayload>;
  /** Deletes a single `Country` using its globally unique id. */
  deleteCountryById?: Maybe<DeleteCountryPayload>;
  /** Deletes a single `Country` using a unique key. */
  deleteCountryByName?: Maybe<DeleteCountryPayload>;
  /** Deletes a single `Driver` using a unique key. */
  deleteDriver?: Maybe<DeleteDriverPayload>;
  /** Deletes a single `Driver` using its globally unique id. */
  deleteDriverById?: Maybe<DeleteDriverPayload>;
  /** Deletes a single `DriverFamilyRelationship` using a unique key. */
  deleteDriverFamilyRelationship?: Maybe<DeleteDriverFamilyRelationshipPayload>;
  /** Deletes a single `DriverFamilyRelationship` using a unique key. */
  deleteDriverFamilyRelationshipByDriverIdAndOtherDriverIdAndType?: Maybe<DeleteDriverFamilyRelationshipPayload>;
  /** Deletes a single `DriverFamilyRelationship` using its globally unique id. */
  deleteDriverFamilyRelationshipById?: Maybe<DeleteDriverFamilyRelationshipPayload>;
  /** Deletes a single `DriverOfTheDayResult` using a unique key. */
  deleteDriverOfTheDayResult?: Maybe<DeleteDriverOfTheDayResultPayload>;
  /** Deletes a single `DriverOfTheDayResult` using its globally unique id. */
  deleteDriverOfTheDayResultById?: Maybe<DeleteDriverOfTheDayResultPayload>;
  /** Deletes a single `Engine` using a unique key. */
  deleteEngine?: Maybe<DeleteEnginePayload>;
  /** Deletes a single `Engine` using its globally unique id. */
  deleteEngineById?: Maybe<DeleteEnginePayload>;
  /** Deletes a single `EngineManufacturer` using a unique key. */
  deleteEngineManufacturer?: Maybe<DeleteEngineManufacturerPayload>;
  /** Deletes a single `EngineManufacturer` using its globally unique id. */
  deleteEngineManufacturerById?: Maybe<DeleteEngineManufacturerPayload>;
  /** Deletes a single `Entrant` using a unique key. */
  deleteEntrant?: Maybe<DeleteEntrantPayload>;
  /** Deletes a single `Entrant` using its globally unique id. */
  deleteEntrantById?: Maybe<DeleteEntrantPayload>;
  /** Deletes a single `FastestLap` using a unique key. */
  deleteFastestLap?: Maybe<DeleteFastestLapPayload>;
  /** Deletes a single `FastestLap` using its globally unique id. */
  deleteFastestLapById?: Maybe<DeleteFastestLapPayload>;
  /** Deletes a single `GrandPrix` using a unique key. */
  deleteGrandPrix?: Maybe<DeleteGrandPrixPayload>;
  /** Deletes a single `GrandPrix` using its globally unique id. */
  deleteGrandPrixById?: Maybe<DeleteGrandPrixPayload>;
  /** Deletes a single `PitStop` using a unique key. */
  deletePitStop?: Maybe<DeletePitStopPayload>;
  /** Deletes a single `PitStop` using its globally unique id. */
  deletePitStopById?: Maybe<DeletePitStopPayload>;
  /** Deletes a single `QualifyingResult` using a unique key. */
  deleteQualifyingResult?: Maybe<DeleteQualifyingResultPayload>;
  /** Deletes a single `QualifyingResult` using its globally unique id. */
  deleteQualifyingResultById?: Maybe<DeleteQualifyingResultPayload>;
  /** Deletes a single `Race` using a unique key. */
  deleteRace?: Maybe<DeleteRacePayload>;
  /** Deletes a single `Race` using its globally unique id. */
  deleteRaceById?: Maybe<DeleteRacePayload>;
  /** Deletes a single `Race` using a unique key. */
  deleteRaceByYearAndRound?: Maybe<DeleteRacePayload>;
  /** Deletes a single `RaceDatum` using a unique key. */
  deleteRaceDatum?: Maybe<DeleteRaceDatumPayload>;
  /** Deletes a single `RaceDatum` using its globally unique id. */
  deleteRaceDatumById?: Maybe<DeleteRaceDatumPayload>;
  /** Deletes a single `RaceDriverStanding` using a unique key. */
  deleteRaceDriverStanding?: Maybe<DeleteRaceDriverStandingPayload>;
  /** Deletes a single `RaceDriverStanding` using its globally unique id. */
  deleteRaceDriverStandingById?: Maybe<DeleteRaceDriverStandingPayload>;
  /** Deletes a single `RaceResult` using a unique key. */
  deleteRaceResult?: Maybe<DeleteRaceResultPayload>;
  /** Deletes a single `RaceResult` using its globally unique id. */
  deleteRaceResultById?: Maybe<DeleteRaceResultPayload>;
  /** Deletes a single `RaceTeamStanding` using a unique key. */
  deleteRaceTeamStanding?: Maybe<DeleteRaceTeamStandingPayload>;
  /** Deletes a single `RaceTeamStanding` using its globally unique id. */
  deleteRaceTeamStandingById?: Maybe<DeleteRaceTeamStandingPayload>;
  /** Deletes a single `Season` using a unique key. */
  deleteSeason?: Maybe<DeleteSeasonPayload>;
  /** Deletes a single `Season` using its globally unique id. */
  deleteSeasonById?: Maybe<DeleteSeasonPayload>;
  /** Deletes a single `SeasonDriver` using a unique key. */
  deleteSeasonDriver?: Maybe<DeleteSeasonDriverPayload>;
  /** Deletes a single `SeasonDriver` using its globally unique id. */
  deleteSeasonDriverById?: Maybe<DeleteSeasonDriverPayload>;
  /** Deletes a single `SeasonDriverStanding` using a unique key. */
  deleteSeasonDriverStanding?: Maybe<DeleteSeasonDriverStandingPayload>;
  /** Deletes a single `SeasonDriverStanding` using its globally unique id. */
  deleteSeasonDriverStandingById?: Maybe<DeleteSeasonDriverStandingPayload>;
  /** Deletes a single `SeasonEngineManufacturer` using a unique key. */
  deleteSeasonEngineManufacturer?: Maybe<DeleteSeasonEngineManufacturerPayload>;
  /** Deletes a single `SeasonEngineManufacturer` using its globally unique id. */
  deleteSeasonEngineManufacturerById?: Maybe<DeleteSeasonEngineManufacturerPayload>;
  /** Deletes a single `SeasonEntrant` using a unique key. */
  deleteSeasonEntrant?: Maybe<DeleteSeasonEntrantPayload>;
  /** Deletes a single `SeasonEntrant` using its globally unique id. */
  deleteSeasonEntrantById?: Maybe<DeleteSeasonEntrantPayload>;
  /** Deletes a single `SeasonEntrantChassis` using a unique key. */
  deleteSeasonEntrantChassis?: Maybe<DeleteSeasonEntrantChassisPayload>;
  /** Deletes a single `SeasonEntrantChassis` using its globally unique id. */
  deleteSeasonEntrantChassisById?: Maybe<DeleteSeasonEntrantChassisPayload>;
  /** Deletes a single `SeasonEntrantDriver` using a unique key. */
  deleteSeasonEntrantDriver?: Maybe<DeleteSeasonEntrantDriverPayload>;
  /** Deletes a single `SeasonEntrantDriver` using its globally unique id. */
  deleteSeasonEntrantDriverById?: Maybe<DeleteSeasonEntrantDriverPayload>;
  /** Deletes a single `SeasonEntrantEngine` using a unique key. */
  deleteSeasonEntrantEngine?: Maybe<DeleteSeasonEntrantEnginePayload>;
  /** Deletes a single `SeasonEntrantEngine` using its globally unique id. */
  deleteSeasonEntrantEngineById?: Maybe<DeleteSeasonEntrantEnginePayload>;
  /** Deletes a single `SeasonEntrantTeam` using a unique key. */
  deleteSeasonEntrantTeam?: Maybe<DeleteSeasonEntrantTeamPayload>;
  /** Deletes a single `SeasonEntrantTeam` using its globally unique id. */
  deleteSeasonEntrantTeamById?: Maybe<DeleteSeasonEntrantTeamPayload>;
  /** Deletes a single `SeasonEntrantTyreManufacturer` using a unique key. */
  deleteSeasonEntrantTyreManufacturer?: Maybe<DeleteSeasonEntrantTyreManufacturerPayload>;
  /** Deletes a single `SeasonEntrantTyreManufacturer` using its globally unique id. */
  deleteSeasonEntrantTyreManufacturerById?: Maybe<DeleteSeasonEntrantTyreManufacturerPayload>;
  /** Deletes a single `SeasonTeam` using a unique key. */
  deleteSeasonTeam?: Maybe<DeleteSeasonTeamPayload>;
  /** Deletes a single `SeasonTeam` using its globally unique id. */
  deleteSeasonTeamById?: Maybe<DeleteSeasonTeamPayload>;
  /** Deletes a single `SeasonTeamStanding` using a unique key. */
  deleteSeasonTeamStanding?: Maybe<DeleteSeasonTeamStandingPayload>;
  /** Deletes a single `SeasonTeamStanding` using its globally unique id. */
  deleteSeasonTeamStandingById?: Maybe<DeleteSeasonTeamStandingPayload>;
  /** Deletes a single `SeasonTyreManufacturer` using a unique key. */
  deleteSeasonTyreManufacturer?: Maybe<DeleteSeasonTyreManufacturerPayload>;
  /** Deletes a single `SeasonTyreManufacturer` using its globally unique id. */
  deleteSeasonTyreManufacturerById?: Maybe<DeleteSeasonTyreManufacturerPayload>;
  /** Deletes a single `SprintQualifyingResult` using a unique key. */
  deleteSprintQualifyingResult?: Maybe<DeleteSprintQualifyingResultPayload>;
  /** Deletes a single `SprintQualifyingResult` using its globally unique id. */
  deleteSprintQualifyingResultById?: Maybe<DeleteSprintQualifyingResultPayload>;
  /** Deletes a single `SprintRaceResult` using a unique key. */
  deleteSprintRaceResult?: Maybe<DeleteSprintRaceResultPayload>;
  /** Deletes a single `SprintRaceResult` using its globally unique id. */
  deleteSprintRaceResultById?: Maybe<DeleteSprintRaceResultPayload>;
  /** Deletes a single `SprintStartingGridPosition` using a unique key. */
  deleteSprintStartingGridPosition?: Maybe<DeleteSprintStartingGridPositionPayload>;
  /** Deletes a single `SprintStartingGridPosition` using its globally unique id. */
  deleteSprintStartingGridPositionById?: Maybe<DeleteSprintStartingGridPositionPayload>;
  /** Deletes a single `StartingGridPosition` using a unique key. */
  deleteStartingGridPosition?: Maybe<DeleteStartingGridPositionPayload>;
  /** Deletes a single `StartingGridPosition` using its globally unique id. */
  deleteStartingGridPositionById?: Maybe<DeleteStartingGridPositionPayload>;
  /** Deletes a single `Team` using a unique key. */
  deleteTeam?: Maybe<DeleteTeamPayload>;
  /** Deletes a single `Team` using its globally unique id. */
  deleteTeamById?: Maybe<DeleteTeamPayload>;
  /** Deletes a single `TeamChronology` using a unique key. */
  deleteTeamChronology?: Maybe<DeleteTeamChronologyPayload>;
  /** Deletes a single `TeamChronology` using its globally unique id. */
  deleteTeamChronologyById?: Maybe<DeleteTeamChronologyPayload>;
  /** Deletes a single `TeamChronology` using a unique key. */
  deleteTeamChronologyByTeamIdAndOtherTeamIdAndYearFromAndYearTo?: Maybe<DeleteTeamChronologyPayload>;
  /** Deletes a single `TyreManufacturer` using a unique key. */
  deleteTyreManufacturer?: Maybe<DeleteTyreManufacturerPayload>;
  /** Deletes a single `TyreManufacturer` using its globally unique id. */
  deleteTyreManufacturerById?: Maybe<DeleteTyreManufacturerPayload>;
  /** Updates a single `AppCircuitDescription` using a unique key and a patch. */
  updateAppCircuitDescription?: Maybe<UpdateAppCircuitDescriptionPayload>;
  /** Updates a single `AppCircuitDescription` using its globally unique id and a patch. */
  updateAppCircuitDescriptionById?: Maybe<UpdateAppCircuitDescriptionPayload>;
  /** Updates a single `AppConstructorBio` using a unique key and a patch. */
  updateAppConstructorBio?: Maybe<UpdateAppConstructorBioPayload>;
  /** Updates a single `AppConstructorBio` using its globally unique id and a patch. */
  updateAppConstructorBioById?: Maybe<UpdateAppConstructorBioPayload>;
  /** Updates a single `AppDriverBio` using a unique key and a patch. */
  updateAppDriverBio?: Maybe<UpdateAppDriverBioPayload>;
  /** Updates a single `AppDriverBio` using its globally unique id and a patch. */
  updateAppDriverBioById?: Maybe<UpdateAppDriverBioPayload>;
  /** Updates a single `AppIngestState` using a unique key and a patch. */
  updateAppIngestState?: Maybe<UpdateAppIngestStatePayload>;
  /** Updates a single `AppIngestState` using its globally unique id and a patch. */
  updateAppIngestStateById?: Maybe<UpdateAppIngestStatePayload>;
  /** Updates a single `AppLapTime` using a unique key and a patch. */
  updateAppLapTime?: Maybe<UpdateAppLapTimePayload>;
  /** Updates a single `AppLapTime` using its globally unique id and a patch. */
  updateAppLapTimeById?: Maybe<UpdateAppLapTimePayload>;
  /** Updates a single `AppTeamColor` using a unique key and a patch. */
  updateAppTeamColor?: Maybe<UpdateAppTeamColorPayload>;
  /** Updates a single `AppTeamColor` using its globally unique id and a patch. */
  updateAppTeamColorById?: Maybe<UpdateAppTeamColorPayload>;
  /** Updates a single `AppTeamHistory` using a unique key and a patch. */
  updateAppTeamHistory?: Maybe<UpdateAppTeamHistoryPayload>;
  /** Updates a single `AppTeamHistory` using its globally unique id and a patch. */
  updateAppTeamHistoryById?: Maybe<UpdateAppTeamHistoryPayload>;
  /** Updates a single `Chassis` using a unique key and a patch. */
  updateChassis?: Maybe<UpdateChassisPayload>;
  /** Updates a single `Chassis` using its globally unique id and a patch. */
  updateChassisById?: Maybe<UpdateChassisPayload>;
  /** Updates a single `Circuit` using a unique key and a patch. */
  updateCircuit?: Maybe<UpdateCircuitPayload>;
  /** Updates a single `Circuit` using its globally unique id and a patch. */
  updateCircuitById?: Maybe<UpdateCircuitPayload>;
  /** Updates a single `CircuitLayout` using a unique key and a patch. */
  updateCircuitLayout?: Maybe<UpdateCircuitLayoutPayload>;
  /** Updates a single `CircuitLayout` using its globally unique id and a patch. */
  updateCircuitLayoutById?: Maybe<UpdateCircuitLayoutPayload>;
  /** Updates a single `Continent` using a unique key and a patch. */
  updateContinent?: Maybe<UpdateContinentPayload>;
  /** Updates a single `Continent` using a unique key and a patch. */
  updateContinentByCode?: Maybe<UpdateContinentPayload>;
  /** Updates a single `Continent` using its globally unique id and a patch. */
  updateContinentById?: Maybe<UpdateContinentPayload>;
  /** Updates a single `Continent` using a unique key and a patch. */
  updateContinentByName?: Maybe<UpdateContinentPayload>;
  /** Updates a single `Country` using a unique key and a patch. */
  updateCountry?: Maybe<UpdateCountryPayload>;
  /** Updates a single `Country` using a unique key and a patch. */
  updateCountryByAlpha2Code?: Maybe<UpdateCountryPayload>;
  /** Updates a single `Country` using a unique key and a patch. */
  updateCountryByAlpha3Code?: Maybe<UpdateCountryPayload>;
  /** Updates a single `Country` using its globally unique id and a patch. */
  updateCountryById?: Maybe<UpdateCountryPayload>;
  /** Updates a single `Country` using a unique key and a patch. */
  updateCountryByName?: Maybe<UpdateCountryPayload>;
  /** Updates a single `Driver` using a unique key and a patch. */
  updateDriver?: Maybe<UpdateDriverPayload>;
  /** Updates a single `Driver` using its globally unique id and a patch. */
  updateDriverById?: Maybe<UpdateDriverPayload>;
  /** Updates a single `DriverFamilyRelationship` using a unique key and a patch. */
  updateDriverFamilyRelationship?: Maybe<UpdateDriverFamilyRelationshipPayload>;
  /** Updates a single `DriverFamilyRelationship` using a unique key and a patch. */
  updateDriverFamilyRelationshipByDriverIdAndOtherDriverIdAndType?: Maybe<UpdateDriverFamilyRelationshipPayload>;
  /** Updates a single `DriverFamilyRelationship` using its globally unique id and a patch. */
  updateDriverFamilyRelationshipById?: Maybe<UpdateDriverFamilyRelationshipPayload>;
  /** Updates a single `DriverOfTheDayResult` using a unique key and a patch. */
  updateDriverOfTheDayResult?: Maybe<UpdateDriverOfTheDayResultPayload>;
  /** Updates a single `DriverOfTheDayResult` using its globally unique id and a patch. */
  updateDriverOfTheDayResultById?: Maybe<UpdateDriverOfTheDayResultPayload>;
  /** Updates a single `Engine` using a unique key and a patch. */
  updateEngine?: Maybe<UpdateEnginePayload>;
  /** Updates a single `Engine` using its globally unique id and a patch. */
  updateEngineById?: Maybe<UpdateEnginePayload>;
  /** Updates a single `EngineManufacturer` using a unique key and a patch. */
  updateEngineManufacturer?: Maybe<UpdateEngineManufacturerPayload>;
  /** Updates a single `EngineManufacturer` using its globally unique id and a patch. */
  updateEngineManufacturerById?: Maybe<UpdateEngineManufacturerPayload>;
  /** Updates a single `Entrant` using a unique key and a patch. */
  updateEntrant?: Maybe<UpdateEntrantPayload>;
  /** Updates a single `Entrant` using its globally unique id and a patch. */
  updateEntrantById?: Maybe<UpdateEntrantPayload>;
  /** Updates a single `FastestLap` using a unique key and a patch. */
  updateFastestLap?: Maybe<UpdateFastestLapPayload>;
  /** Updates a single `FastestLap` using its globally unique id and a patch. */
  updateFastestLapById?: Maybe<UpdateFastestLapPayload>;
  /** Updates a single `GrandPrix` using a unique key and a patch. */
  updateGrandPrix?: Maybe<UpdateGrandPrixPayload>;
  /** Updates a single `GrandPrix` using its globally unique id and a patch. */
  updateGrandPrixById?: Maybe<UpdateGrandPrixPayload>;
  /** Updates a single `PitStop` using a unique key and a patch. */
  updatePitStop?: Maybe<UpdatePitStopPayload>;
  /** Updates a single `PitStop` using its globally unique id and a patch. */
  updatePitStopById?: Maybe<UpdatePitStopPayload>;
  /** Updates a single `QualifyingResult` using a unique key and a patch. */
  updateQualifyingResult?: Maybe<UpdateQualifyingResultPayload>;
  /** Updates a single `QualifyingResult` using its globally unique id and a patch. */
  updateQualifyingResultById?: Maybe<UpdateQualifyingResultPayload>;
  /** Updates a single `Race` using a unique key and a patch. */
  updateRace?: Maybe<UpdateRacePayload>;
  /** Updates a single `Race` using its globally unique id and a patch. */
  updateRaceById?: Maybe<UpdateRacePayload>;
  /** Updates a single `Race` using a unique key and a patch. */
  updateRaceByYearAndRound?: Maybe<UpdateRacePayload>;
  /** Updates a single `RaceDatum` using a unique key and a patch. */
  updateRaceDatum?: Maybe<UpdateRaceDatumPayload>;
  /** Updates a single `RaceDatum` using its globally unique id and a patch. */
  updateRaceDatumById?: Maybe<UpdateRaceDatumPayload>;
  /** Updates a single `RaceDriverStanding` using a unique key and a patch. */
  updateRaceDriverStanding?: Maybe<UpdateRaceDriverStandingPayload>;
  /** Updates a single `RaceDriverStanding` using its globally unique id and a patch. */
  updateRaceDriverStandingById?: Maybe<UpdateRaceDriverStandingPayload>;
  /** Updates a single `RaceResult` using a unique key and a patch. */
  updateRaceResult?: Maybe<UpdateRaceResultPayload>;
  /** Updates a single `RaceResult` using its globally unique id and a patch. */
  updateRaceResultById?: Maybe<UpdateRaceResultPayload>;
  /** Updates a single `RaceTeamStanding` using a unique key and a patch. */
  updateRaceTeamStanding?: Maybe<UpdateRaceTeamStandingPayload>;
  /** Updates a single `RaceTeamStanding` using its globally unique id and a patch. */
  updateRaceTeamStandingById?: Maybe<UpdateRaceTeamStandingPayload>;
  /** Updates a single `Season` using a unique key and a patch. */
  updateSeason?: Maybe<UpdateSeasonPayload>;
  /** Updates a single `Season` using its globally unique id and a patch. */
  updateSeasonById?: Maybe<UpdateSeasonPayload>;
  /** Updates a single `SeasonDriver` using a unique key and a patch. */
  updateSeasonDriver?: Maybe<UpdateSeasonDriverPayload>;
  /** Updates a single `SeasonDriver` using its globally unique id and a patch. */
  updateSeasonDriverById?: Maybe<UpdateSeasonDriverPayload>;
  /** Updates a single `SeasonDriverStanding` using a unique key and a patch. */
  updateSeasonDriverStanding?: Maybe<UpdateSeasonDriverStandingPayload>;
  /** Updates a single `SeasonDriverStanding` using its globally unique id and a patch. */
  updateSeasonDriverStandingById?: Maybe<UpdateSeasonDriverStandingPayload>;
  /** Updates a single `SeasonEngineManufacturer` using a unique key and a patch. */
  updateSeasonEngineManufacturer?: Maybe<UpdateSeasonEngineManufacturerPayload>;
  /** Updates a single `SeasonEngineManufacturer` using its globally unique id and a patch. */
  updateSeasonEngineManufacturerById?: Maybe<UpdateSeasonEngineManufacturerPayload>;
  /** Updates a single `SeasonEntrant` using a unique key and a patch. */
  updateSeasonEntrant?: Maybe<UpdateSeasonEntrantPayload>;
  /** Updates a single `SeasonEntrant` using its globally unique id and a patch. */
  updateSeasonEntrantById?: Maybe<UpdateSeasonEntrantPayload>;
  /** Updates a single `SeasonEntrantChassis` using a unique key and a patch. */
  updateSeasonEntrantChassis?: Maybe<UpdateSeasonEntrantChassisPayload>;
  /** Updates a single `SeasonEntrantChassis` using its globally unique id and a patch. */
  updateSeasonEntrantChassisById?: Maybe<UpdateSeasonEntrantChassisPayload>;
  /** Updates a single `SeasonEntrantDriver` using a unique key and a patch. */
  updateSeasonEntrantDriver?: Maybe<UpdateSeasonEntrantDriverPayload>;
  /** Updates a single `SeasonEntrantDriver` using its globally unique id and a patch. */
  updateSeasonEntrantDriverById?: Maybe<UpdateSeasonEntrantDriverPayload>;
  /** Updates a single `SeasonEntrantEngine` using a unique key and a patch. */
  updateSeasonEntrantEngine?: Maybe<UpdateSeasonEntrantEnginePayload>;
  /** Updates a single `SeasonEntrantEngine` using its globally unique id and a patch. */
  updateSeasonEntrantEngineById?: Maybe<UpdateSeasonEntrantEnginePayload>;
  /** Updates a single `SeasonEntrantTeam` using a unique key and a patch. */
  updateSeasonEntrantTeam?: Maybe<UpdateSeasonEntrantTeamPayload>;
  /** Updates a single `SeasonEntrantTeam` using its globally unique id and a patch. */
  updateSeasonEntrantTeamById?: Maybe<UpdateSeasonEntrantTeamPayload>;
  /** Updates a single `SeasonEntrantTyreManufacturer` using a unique key and a patch. */
  updateSeasonEntrantTyreManufacturer?: Maybe<UpdateSeasonEntrantTyreManufacturerPayload>;
  /** Updates a single `SeasonEntrantTyreManufacturer` using its globally unique id and a patch. */
  updateSeasonEntrantTyreManufacturerById?: Maybe<UpdateSeasonEntrantTyreManufacturerPayload>;
  /** Updates a single `SeasonTeam` using a unique key and a patch. */
  updateSeasonTeam?: Maybe<UpdateSeasonTeamPayload>;
  /** Updates a single `SeasonTeam` using its globally unique id and a patch. */
  updateSeasonTeamById?: Maybe<UpdateSeasonTeamPayload>;
  /** Updates a single `SeasonTeamStanding` using a unique key and a patch. */
  updateSeasonTeamStanding?: Maybe<UpdateSeasonTeamStandingPayload>;
  /** Updates a single `SeasonTeamStanding` using its globally unique id and a patch. */
  updateSeasonTeamStandingById?: Maybe<UpdateSeasonTeamStandingPayload>;
  /** Updates a single `SeasonTyreManufacturer` using a unique key and a patch. */
  updateSeasonTyreManufacturer?: Maybe<UpdateSeasonTyreManufacturerPayload>;
  /** Updates a single `SeasonTyreManufacturer` using its globally unique id and a patch. */
  updateSeasonTyreManufacturerById?: Maybe<UpdateSeasonTyreManufacturerPayload>;
  /** Updates a single `SprintQualifyingResult` using a unique key and a patch. */
  updateSprintQualifyingResult?: Maybe<UpdateSprintQualifyingResultPayload>;
  /** Updates a single `SprintQualifyingResult` using its globally unique id and a patch. */
  updateSprintQualifyingResultById?: Maybe<UpdateSprintQualifyingResultPayload>;
  /** Updates a single `SprintRaceResult` using a unique key and a patch. */
  updateSprintRaceResult?: Maybe<UpdateSprintRaceResultPayload>;
  /** Updates a single `SprintRaceResult` using its globally unique id and a patch. */
  updateSprintRaceResultById?: Maybe<UpdateSprintRaceResultPayload>;
  /** Updates a single `SprintStartingGridPosition` using a unique key and a patch. */
  updateSprintStartingGridPosition?: Maybe<UpdateSprintStartingGridPositionPayload>;
  /** Updates a single `SprintStartingGridPosition` using its globally unique id and a patch. */
  updateSprintStartingGridPositionById?: Maybe<UpdateSprintStartingGridPositionPayload>;
  /** Updates a single `StartingGridPosition` using a unique key and a patch. */
  updateStartingGridPosition?: Maybe<UpdateStartingGridPositionPayload>;
  /** Updates a single `StartingGridPosition` using its globally unique id and a patch. */
  updateStartingGridPositionById?: Maybe<UpdateStartingGridPositionPayload>;
  /** Updates a single `Team` using a unique key and a patch. */
  updateTeam?: Maybe<UpdateTeamPayload>;
  /** Updates a single `Team` using its globally unique id and a patch. */
  updateTeamById?: Maybe<UpdateTeamPayload>;
  /** Updates a single `TeamChronology` using a unique key and a patch. */
  updateTeamChronology?: Maybe<UpdateTeamChronologyPayload>;
  /** Updates a single `TeamChronology` using its globally unique id and a patch. */
  updateTeamChronologyById?: Maybe<UpdateTeamChronologyPayload>;
  /** Updates a single `TeamChronology` using a unique key and a patch. */
  updateTeamChronologyByTeamIdAndOtherTeamIdAndYearFromAndYearTo?: Maybe<UpdateTeamChronologyPayload>;
  /** Updates a single `TyreManufacturer` using a unique key and a patch. */
  updateTyreManufacturer?: Maybe<UpdateTyreManufacturerPayload>;
  /** Updates a single `TyreManufacturer` using its globally unique id and a patch. */
  updateTyreManufacturerById?: Maybe<UpdateTyreManufacturerPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAppCircuitDescriptionArgs = {
  input: CreateAppCircuitDescriptionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAppConstructorBioArgs = {
  input: CreateAppConstructorBioInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAppDriverBioArgs = {
  input: CreateAppDriverBioInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAppIngestStateArgs = {
  input: CreateAppIngestStateInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAppLapTimeArgs = {
  input: CreateAppLapTimeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAppTeamColorArgs = {
  input: CreateAppTeamColorInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAppTeamHistoryArgs = {
  input: CreateAppTeamHistoryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateChassisArgs = {
  input: CreateChassisInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCircuitArgs = {
  input: CreateCircuitInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCircuitLayoutArgs = {
  input: CreateCircuitLayoutInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateContinentArgs = {
  input: CreateContinentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCountryArgs = {
  input: CreateCountryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateDriverArgs = {
  input: CreateDriverInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateDriverFamilyRelationshipArgs = {
  input: CreateDriverFamilyRelationshipInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateDriverOfTheDayResultArgs = {
  input: CreateDriverOfTheDayResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateEngineArgs = {
  input: CreateEngineInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateEngineManufacturerArgs = {
  input: CreateEngineManufacturerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateEntrantArgs = {
  input: CreateEntrantInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateFastestLapArgs = {
  input: CreateFastestLapInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateFreePractice1ResultArgs = {
  input: CreateFreePractice1ResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateFreePractice2ResultArgs = {
  input: CreateFreePractice2ResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateFreePractice3ResultArgs = {
  input: CreateFreePractice3ResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateFreePractice4ResultArgs = {
  input: CreateFreePractice4ResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateGrandPrixArgs = {
  input: CreateGrandPrixInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePitStopArgs = {
  input: CreatePitStopInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePreQualifyingResultArgs = {
  input: CreatePreQualifyingResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateQualifying1ResultArgs = {
  input: CreateQualifying1ResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateQualifying2ResultArgs = {
  input: CreateQualifying2ResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateQualifyingResultArgs = {
  input: CreateQualifyingResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateRaceArgs = {
  input: CreateRaceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateRaceDatumArgs = {
  input: CreateRaceDatumInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateRaceDriverStandingArgs = {
  input: CreateRaceDriverStandingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateRaceResultArgs = {
  input: CreateRaceResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateRaceTeamStandingArgs = {
  input: CreateRaceTeamStandingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSeasonArgs = {
  input: CreateSeasonInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSeasonDriverArgs = {
  input: CreateSeasonDriverInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSeasonDriverStandingArgs = {
  input: CreateSeasonDriverStandingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSeasonEngineManufacturerArgs = {
  input: CreateSeasonEngineManufacturerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSeasonEntrantArgs = {
  input: CreateSeasonEntrantInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSeasonEntrantChassisArgs = {
  input: CreateSeasonEntrantChassisInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSeasonEntrantDriverArgs = {
  input: CreateSeasonEntrantDriverInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSeasonEntrantEngineArgs = {
  input: CreateSeasonEntrantEngineInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSeasonEntrantTeamArgs = {
  input: CreateSeasonEntrantTeamInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSeasonEntrantTyreManufacturerArgs = {
  input: CreateSeasonEntrantTyreManufacturerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSeasonTeamArgs = {
  input: CreateSeasonTeamInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSeasonTeamStandingArgs = {
  input: CreateSeasonTeamStandingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSeasonTyreManufacturerArgs = {
  input: CreateSeasonTyreManufacturerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSprintQualifyingResultArgs = {
  input: CreateSprintQualifyingResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSprintRaceResultArgs = {
  input: CreateSprintRaceResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSprintStartingGridPositionArgs = {
  input: CreateSprintStartingGridPositionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateStartingGridPositionArgs = {
  input: CreateStartingGridPositionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTeamArgs = {
  input: CreateTeamInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTeamChronologyArgs = {
  input: CreateTeamChronologyInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTyreManufacturerArgs = {
  input: CreateTyreManufacturerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateWarmingUpResultArgs = {
  input: CreateWarmingUpResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAppCircuitDescriptionArgs = {
  input: DeleteAppCircuitDescriptionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAppCircuitDescriptionByIdArgs = {
  input: DeleteAppCircuitDescriptionByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAppConstructorBioArgs = {
  input: DeleteAppConstructorBioInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAppConstructorBioByIdArgs = {
  input: DeleteAppConstructorBioByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAppDriverBioArgs = {
  input: DeleteAppDriverBioInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAppDriverBioByIdArgs = {
  input: DeleteAppDriverBioByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAppIngestStateArgs = {
  input: DeleteAppIngestStateInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAppIngestStateByIdArgs = {
  input: DeleteAppIngestStateByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAppLapTimeArgs = {
  input: DeleteAppLapTimeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAppLapTimeByIdArgs = {
  input: DeleteAppLapTimeByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAppTeamColorArgs = {
  input: DeleteAppTeamColorInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAppTeamColorByIdArgs = {
  input: DeleteAppTeamColorByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAppTeamHistoryArgs = {
  input: DeleteAppTeamHistoryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAppTeamHistoryByIdArgs = {
  input: DeleteAppTeamHistoryByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteChassisArgs = {
  input: DeleteChassisInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteChassisByIdArgs = {
  input: DeleteChassisByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCircuitArgs = {
  input: DeleteCircuitInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCircuitByIdArgs = {
  input: DeleteCircuitByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCircuitLayoutArgs = {
  input: DeleteCircuitLayoutInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCircuitLayoutByIdArgs = {
  input: DeleteCircuitLayoutByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteContinentArgs = {
  input: DeleteContinentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteContinentByCodeArgs = {
  input: DeleteContinentByCodeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteContinentByIdArgs = {
  input: DeleteContinentByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteContinentByNameArgs = {
  input: DeleteContinentByNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCountryArgs = {
  input: DeleteCountryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCountryByAlpha2CodeArgs = {
  input: DeleteCountryByAlpha2CodeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCountryByAlpha3CodeArgs = {
  input: DeleteCountryByAlpha3CodeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCountryByIdArgs = {
  input: DeleteCountryByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCountryByNameArgs = {
  input: DeleteCountryByNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDriverArgs = {
  input: DeleteDriverInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDriverByIdArgs = {
  input: DeleteDriverByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDriverFamilyRelationshipArgs = {
  input: DeleteDriverFamilyRelationshipInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDriverFamilyRelationshipByDriverIdAndOtherDriverIdAndTypeArgs = {
  input: DeleteDriverFamilyRelationshipByDriverIdAndOtherDriverIdAndTypeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDriverFamilyRelationshipByIdArgs = {
  input: DeleteDriverFamilyRelationshipByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDriverOfTheDayResultArgs = {
  input: DeleteDriverOfTheDayResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDriverOfTheDayResultByIdArgs = {
  input: DeleteDriverOfTheDayResultByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEngineArgs = {
  input: DeleteEngineInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEngineByIdArgs = {
  input: DeleteEngineByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEngineManufacturerArgs = {
  input: DeleteEngineManufacturerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEngineManufacturerByIdArgs = {
  input: DeleteEngineManufacturerByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEntrantArgs = {
  input: DeleteEntrantInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEntrantByIdArgs = {
  input: DeleteEntrantByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteFastestLapArgs = {
  input: DeleteFastestLapInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteFastestLapByIdArgs = {
  input: DeleteFastestLapByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteGrandPrixArgs = {
  input: DeleteGrandPrixInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteGrandPrixByIdArgs = {
  input: DeleteGrandPrixByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePitStopArgs = {
  input: DeletePitStopInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePitStopByIdArgs = {
  input: DeletePitStopByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteQualifyingResultArgs = {
  input: DeleteQualifyingResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteQualifyingResultByIdArgs = {
  input: DeleteQualifyingResultByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRaceArgs = {
  input: DeleteRaceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRaceByIdArgs = {
  input: DeleteRaceByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRaceByYearAndRoundArgs = {
  input: DeleteRaceByYearAndRoundInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRaceDatumArgs = {
  input: DeleteRaceDatumInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRaceDatumByIdArgs = {
  input: DeleteRaceDatumByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRaceDriverStandingArgs = {
  input: DeleteRaceDriverStandingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRaceDriverStandingByIdArgs = {
  input: DeleteRaceDriverStandingByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRaceResultArgs = {
  input: DeleteRaceResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRaceResultByIdArgs = {
  input: DeleteRaceResultByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRaceTeamStandingArgs = {
  input: DeleteRaceTeamStandingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRaceTeamStandingByIdArgs = {
  input: DeleteRaceTeamStandingByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonArgs = {
  input: DeleteSeasonInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonByIdArgs = {
  input: DeleteSeasonByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonDriverArgs = {
  input: DeleteSeasonDriverInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonDriverByIdArgs = {
  input: DeleteSeasonDriverByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonDriverStandingArgs = {
  input: DeleteSeasonDriverStandingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonDriverStandingByIdArgs = {
  input: DeleteSeasonDriverStandingByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonEngineManufacturerArgs = {
  input: DeleteSeasonEngineManufacturerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonEngineManufacturerByIdArgs = {
  input: DeleteSeasonEngineManufacturerByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonEntrantArgs = {
  input: DeleteSeasonEntrantInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonEntrantByIdArgs = {
  input: DeleteSeasonEntrantByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonEntrantChassisArgs = {
  input: DeleteSeasonEntrantChassisInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonEntrantChassisByIdArgs = {
  input: DeleteSeasonEntrantChassisByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonEntrantDriverArgs = {
  input: DeleteSeasonEntrantDriverInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonEntrantDriverByIdArgs = {
  input: DeleteSeasonEntrantDriverByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonEntrantEngineArgs = {
  input: DeleteSeasonEntrantEngineInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonEntrantEngineByIdArgs = {
  input: DeleteSeasonEntrantEngineByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonEntrantTeamArgs = {
  input: DeleteSeasonEntrantTeamInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonEntrantTeamByIdArgs = {
  input: DeleteSeasonEntrantTeamByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonEntrantTyreManufacturerArgs = {
  input: DeleteSeasonEntrantTyreManufacturerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonEntrantTyreManufacturerByIdArgs = {
  input: DeleteSeasonEntrantTyreManufacturerByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonTeamArgs = {
  input: DeleteSeasonTeamInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonTeamByIdArgs = {
  input: DeleteSeasonTeamByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonTeamStandingArgs = {
  input: DeleteSeasonTeamStandingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonTeamStandingByIdArgs = {
  input: DeleteSeasonTeamStandingByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonTyreManufacturerArgs = {
  input: DeleteSeasonTyreManufacturerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonTyreManufacturerByIdArgs = {
  input: DeleteSeasonTyreManufacturerByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSprintQualifyingResultArgs = {
  input: DeleteSprintQualifyingResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSprintQualifyingResultByIdArgs = {
  input: DeleteSprintQualifyingResultByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSprintRaceResultArgs = {
  input: DeleteSprintRaceResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSprintRaceResultByIdArgs = {
  input: DeleteSprintRaceResultByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSprintStartingGridPositionArgs = {
  input: DeleteSprintStartingGridPositionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSprintStartingGridPositionByIdArgs = {
  input: DeleteSprintStartingGridPositionByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteStartingGridPositionArgs = {
  input: DeleteStartingGridPositionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteStartingGridPositionByIdArgs = {
  input: DeleteStartingGridPositionByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTeamArgs = {
  input: DeleteTeamInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTeamByIdArgs = {
  input: DeleteTeamByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTeamChronologyArgs = {
  input: DeleteTeamChronologyInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTeamChronologyByIdArgs = {
  input: DeleteTeamChronologyByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTeamChronologyByTeamIdAndOtherTeamIdAndYearFromAndYearToArgs = {
  input: DeleteTeamChronologyByTeamIdAndOtherTeamIdAndYearFromAndYearToInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTyreManufacturerArgs = {
  input: DeleteTyreManufacturerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTyreManufacturerByIdArgs = {
  input: DeleteTyreManufacturerByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAppCircuitDescriptionArgs = {
  input: UpdateAppCircuitDescriptionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAppCircuitDescriptionByIdArgs = {
  input: UpdateAppCircuitDescriptionByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAppConstructorBioArgs = {
  input: UpdateAppConstructorBioInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAppConstructorBioByIdArgs = {
  input: UpdateAppConstructorBioByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAppDriverBioArgs = {
  input: UpdateAppDriverBioInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAppDriverBioByIdArgs = {
  input: UpdateAppDriverBioByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAppIngestStateArgs = {
  input: UpdateAppIngestStateInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAppIngestStateByIdArgs = {
  input: UpdateAppIngestStateByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAppLapTimeArgs = {
  input: UpdateAppLapTimeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAppLapTimeByIdArgs = {
  input: UpdateAppLapTimeByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAppTeamColorArgs = {
  input: UpdateAppTeamColorInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAppTeamColorByIdArgs = {
  input: UpdateAppTeamColorByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAppTeamHistoryArgs = {
  input: UpdateAppTeamHistoryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAppTeamHistoryByIdArgs = {
  input: UpdateAppTeamHistoryByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateChassisArgs = {
  input: UpdateChassisInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateChassisByIdArgs = {
  input: UpdateChassisByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCircuitArgs = {
  input: UpdateCircuitInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCircuitByIdArgs = {
  input: UpdateCircuitByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCircuitLayoutArgs = {
  input: UpdateCircuitLayoutInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCircuitLayoutByIdArgs = {
  input: UpdateCircuitLayoutByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateContinentArgs = {
  input: UpdateContinentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateContinentByCodeArgs = {
  input: UpdateContinentByCodeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateContinentByIdArgs = {
  input: UpdateContinentByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateContinentByNameArgs = {
  input: UpdateContinentByNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCountryArgs = {
  input: UpdateCountryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCountryByAlpha2CodeArgs = {
  input: UpdateCountryByAlpha2CodeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCountryByAlpha3CodeArgs = {
  input: UpdateCountryByAlpha3CodeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCountryByIdArgs = {
  input: UpdateCountryByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCountryByNameArgs = {
  input: UpdateCountryByNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDriverArgs = {
  input: UpdateDriverInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDriverByIdArgs = {
  input: UpdateDriverByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDriverFamilyRelationshipArgs = {
  input: UpdateDriverFamilyRelationshipInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDriverFamilyRelationshipByDriverIdAndOtherDriverIdAndTypeArgs = {
  input: UpdateDriverFamilyRelationshipByDriverIdAndOtherDriverIdAndTypeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDriverFamilyRelationshipByIdArgs = {
  input: UpdateDriverFamilyRelationshipByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDriverOfTheDayResultArgs = {
  input: UpdateDriverOfTheDayResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDriverOfTheDayResultByIdArgs = {
  input: UpdateDriverOfTheDayResultByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEngineArgs = {
  input: UpdateEngineInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEngineByIdArgs = {
  input: UpdateEngineByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEngineManufacturerArgs = {
  input: UpdateEngineManufacturerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEngineManufacturerByIdArgs = {
  input: UpdateEngineManufacturerByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEntrantArgs = {
  input: UpdateEntrantInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEntrantByIdArgs = {
  input: UpdateEntrantByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateFastestLapArgs = {
  input: UpdateFastestLapInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateFastestLapByIdArgs = {
  input: UpdateFastestLapByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateGrandPrixArgs = {
  input: UpdateGrandPrixInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateGrandPrixByIdArgs = {
  input: UpdateGrandPrixByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePitStopArgs = {
  input: UpdatePitStopInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePitStopByIdArgs = {
  input: UpdatePitStopByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateQualifyingResultArgs = {
  input: UpdateQualifyingResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateQualifyingResultByIdArgs = {
  input: UpdateQualifyingResultByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRaceArgs = {
  input: UpdateRaceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRaceByIdArgs = {
  input: UpdateRaceByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRaceByYearAndRoundArgs = {
  input: UpdateRaceByYearAndRoundInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRaceDatumArgs = {
  input: UpdateRaceDatumInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRaceDatumByIdArgs = {
  input: UpdateRaceDatumByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRaceDriverStandingArgs = {
  input: UpdateRaceDriverStandingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRaceDriverStandingByIdArgs = {
  input: UpdateRaceDriverStandingByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRaceResultArgs = {
  input: UpdateRaceResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRaceResultByIdArgs = {
  input: UpdateRaceResultByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRaceTeamStandingArgs = {
  input: UpdateRaceTeamStandingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRaceTeamStandingByIdArgs = {
  input: UpdateRaceTeamStandingByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonArgs = {
  input: UpdateSeasonInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonByIdArgs = {
  input: UpdateSeasonByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonDriverArgs = {
  input: UpdateSeasonDriverInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonDriverByIdArgs = {
  input: UpdateSeasonDriverByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonDriverStandingArgs = {
  input: UpdateSeasonDriverStandingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonDriverStandingByIdArgs = {
  input: UpdateSeasonDriverStandingByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonEngineManufacturerArgs = {
  input: UpdateSeasonEngineManufacturerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonEngineManufacturerByIdArgs = {
  input: UpdateSeasonEngineManufacturerByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonEntrantArgs = {
  input: UpdateSeasonEntrantInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonEntrantByIdArgs = {
  input: UpdateSeasonEntrantByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonEntrantChassisArgs = {
  input: UpdateSeasonEntrantChassisInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonEntrantChassisByIdArgs = {
  input: UpdateSeasonEntrantChassisByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonEntrantDriverArgs = {
  input: UpdateSeasonEntrantDriverInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonEntrantDriverByIdArgs = {
  input: UpdateSeasonEntrantDriverByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonEntrantEngineArgs = {
  input: UpdateSeasonEntrantEngineInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonEntrantEngineByIdArgs = {
  input: UpdateSeasonEntrantEngineByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonEntrantTeamArgs = {
  input: UpdateSeasonEntrantTeamInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonEntrantTeamByIdArgs = {
  input: UpdateSeasonEntrantTeamByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonEntrantTyreManufacturerArgs = {
  input: UpdateSeasonEntrantTyreManufacturerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonEntrantTyreManufacturerByIdArgs = {
  input: UpdateSeasonEntrantTyreManufacturerByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonTeamArgs = {
  input: UpdateSeasonTeamInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonTeamByIdArgs = {
  input: UpdateSeasonTeamByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonTeamStandingArgs = {
  input: UpdateSeasonTeamStandingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonTeamStandingByIdArgs = {
  input: UpdateSeasonTeamStandingByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonTyreManufacturerArgs = {
  input: UpdateSeasonTyreManufacturerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonTyreManufacturerByIdArgs = {
  input: UpdateSeasonTyreManufacturerByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSprintQualifyingResultArgs = {
  input: UpdateSprintQualifyingResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSprintQualifyingResultByIdArgs = {
  input: UpdateSprintQualifyingResultByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSprintRaceResultArgs = {
  input: UpdateSprintRaceResultInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSprintRaceResultByIdArgs = {
  input: UpdateSprintRaceResultByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSprintStartingGridPositionArgs = {
  input: UpdateSprintStartingGridPositionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSprintStartingGridPositionByIdArgs = {
  input: UpdateSprintStartingGridPositionByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateStartingGridPositionArgs = {
  input: UpdateStartingGridPositionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateStartingGridPositionByIdArgs = {
  input: UpdateStartingGridPositionByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTeamArgs = {
  input: UpdateTeamInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTeamByIdArgs = {
  input: UpdateTeamByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTeamChronologyArgs = {
  input: UpdateTeamChronologyInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTeamChronologyByIdArgs = {
  input: UpdateTeamChronologyByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTeamChronologyByTeamIdAndOtherTeamIdAndYearFromAndYearToArgs = {
  input: UpdateTeamChronologyByTeamIdAndOtherTeamIdAndYearFromAndYearToInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTyreManufacturerArgs = {
  input: UpdateTyreManufacturerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTyreManufacturerByIdArgs = {
  input: UpdateTyreManufacturerByIdInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
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
  driverId: Scalars['String']['output'];
  driverNumber?: Maybe<Scalars['String']['output']>;
  engineManufacturerId?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  lap?: Maybe<Scalars['Int']['output']>;
  positionDisplayOrder?: Maybe<Scalars['Int']['output']>;
  positionNumber?: Maybe<Scalars['Int']['output']>;
  positionText?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Race` that is related to this `PitStop`. */
  race?: Maybe<Race>;
  raceId: Scalars['Int']['output'];
  stop: Scalars['Int']['output'];
  /** Reads a single `Team` that is related to this `PitStop`. */
  team?: Maybe<Team>;
  teamId?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
  timeMillis?: Maybe<Scalars['Int']['output']>;
  tyreManufacturerId?: Maybe<Scalars['String']['output']>;
};

/** A condition to be used against `PitStop` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type PitStopCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `driverNumber` field. */
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `engineManufacturerId` field. */
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `lap` field. */
  lap?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionDisplayOrder` field. */
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionNumber` field. */
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionText` field. */
  positionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `stop` field. */
  stop?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `time` field. */
  time?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `timeMillis` field. */
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `tyreManufacturerId` field. */
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `PitStop` values. */
export type PitStopConnection = {
  __typename?: 'PitStopConnection';
  /** A list of edges which contains the `PitStop` and cursor to aid in pagination. */
  edges: Array<Maybe<PitStopEdge>>;
  /** A list of `PitStop` objects. */
  nodes: Array<Maybe<PitStop>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PitStop` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `PitStop` edge in the connection. */
export type PitStopEdge = {
  __typename?: 'PitStopEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `PitStop` at the end of the edge. */
  node?: Maybe<PitStop>;
};

/** An input for mutations affecting `PitStop` */
export type PitStopInput = {
  driverId: Scalars['String']['input'];
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  lap?: InputMaybe<Scalars['Int']['input']>;
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  raceId: Scalars['Int']['input'];
  stop: Scalars['Int']['input'];
  teamId?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `PitStop`. */
export enum PitStopOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  DriverNumberAsc = 'DRIVER_NUMBER_ASC',
  DriverNumberDesc = 'DRIVER_NUMBER_DESC',
  EngineManufacturerIdAsc = 'ENGINE_MANUFACTURER_ID_ASC',
  EngineManufacturerIdDesc = 'ENGINE_MANUFACTURER_ID_DESC',
  LapAsc = 'LAP_ASC',
  LapDesc = 'LAP_DESC',
  Natural = 'NATURAL',
  PositionDisplayOrderAsc = 'POSITION_DISPLAY_ORDER_ASC',
  PositionDisplayOrderDesc = 'POSITION_DISPLAY_ORDER_DESC',
  PositionNumberAsc = 'POSITION_NUMBER_ASC',
  PositionNumberDesc = 'POSITION_NUMBER_DESC',
  PositionTextAsc = 'POSITION_TEXT_ASC',
  PositionTextDesc = 'POSITION_TEXT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC',
  StopAsc = 'STOP_ASC',
  StopDesc = 'STOP_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  TimeAsc = 'TIME_ASC',
  TimeDesc = 'TIME_DESC',
  TimeMillisAsc = 'TIME_MILLIS_ASC',
  TimeMillisDesc = 'TIME_MILLIS_DESC',
  TyreManufacturerIdAsc = 'TYRE_MANUFACTURER_ID_ASC',
  TyreManufacturerIdDesc = 'TYRE_MANUFACTURER_ID_DESC'
}

/** Represents an update to a `PitStop`. Fields that are set will be updated. */
export type PitStopPatch = {
  driverId?: InputMaybe<Scalars['String']['input']>;
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  lap?: InputMaybe<Scalars['Int']['input']>;
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  stop?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

export type PreQualifyingResult = {
  __typename?: 'PreQualifyingResult';
  driverId?: Maybe<Scalars['String']['output']>;
  driverNumber?: Maybe<Scalars['String']['output']>;
  engineManufacturerId?: Maybe<Scalars['String']['output']>;
  gap?: Maybe<Scalars['String']['output']>;
  gapMillis?: Maybe<Scalars['Int']['output']>;
  interval?: Maybe<Scalars['String']['output']>;
  intervalMillis?: Maybe<Scalars['Int']['output']>;
  laps?: Maybe<Scalars['Int']['output']>;
  positionDisplayOrder?: Maybe<Scalars['Int']['output']>;
  positionNumber?: Maybe<Scalars['Int']['output']>;
  positionText?: Maybe<Scalars['String']['output']>;
  raceId?: Maybe<Scalars['Int']['output']>;
  teamId?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
  timeMillis?: Maybe<Scalars['Int']['output']>;
  tyreManufacturerId?: Maybe<Scalars['String']['output']>;
};

/**
 * A condition to be used against `PreQualifyingResult` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type PreQualifyingResultCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `driverNumber` field. */
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `engineManufacturerId` field. */
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gap` field. */
  gap?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gapMillis` field. */
  gapMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `interval` field. */
  interval?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `intervalMillis` field. */
  intervalMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `laps` field. */
  laps?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionDisplayOrder` field. */
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionNumber` field. */
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionText` field. */
  positionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `time` field. */
  time?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `timeMillis` field. */
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `tyreManufacturerId` field. */
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `PreQualifyingResult` values. */
export type PreQualifyingResultConnection = {
  __typename?: 'PreQualifyingResultConnection';
  /** A list of edges which contains the `PreQualifyingResult` and cursor to aid in pagination. */
  edges: Array<Maybe<PreQualifyingResultEdge>>;
  /** A list of `PreQualifyingResult` objects. */
  nodes: Array<Maybe<PreQualifyingResult>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PreQualifyingResult` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `PreQualifyingResult` edge in the connection. */
export type PreQualifyingResultEdge = {
  __typename?: 'PreQualifyingResultEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `PreQualifyingResult` at the end of the edge. */
  node?: Maybe<PreQualifyingResult>;
};

/** An input for mutations affecting `PreQualifyingResult` */
export type PreQualifyingResultInput = {
  driverId?: InputMaybe<Scalars['String']['input']>;
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  gap?: InputMaybe<Scalars['String']['input']>;
  gapMillis?: InputMaybe<Scalars['Int']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  intervalMillis?: InputMaybe<Scalars['Int']['input']>;
  laps?: InputMaybe<Scalars['Int']['input']>;
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `PreQualifyingResult`. */
export enum PreQualifyingResultOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  DriverNumberAsc = 'DRIVER_NUMBER_ASC',
  DriverNumberDesc = 'DRIVER_NUMBER_DESC',
  EngineManufacturerIdAsc = 'ENGINE_MANUFACTURER_ID_ASC',
  EngineManufacturerIdDesc = 'ENGINE_MANUFACTURER_ID_DESC',
  GapAsc = 'GAP_ASC',
  GapDesc = 'GAP_DESC',
  GapMillisAsc = 'GAP_MILLIS_ASC',
  GapMillisDesc = 'GAP_MILLIS_DESC',
  IntervalAsc = 'INTERVAL_ASC',
  IntervalDesc = 'INTERVAL_DESC',
  IntervalMillisAsc = 'INTERVAL_MILLIS_ASC',
  IntervalMillisDesc = 'INTERVAL_MILLIS_DESC',
  LapsAsc = 'LAPS_ASC',
  LapsDesc = 'LAPS_DESC',
  Natural = 'NATURAL',
  PositionDisplayOrderAsc = 'POSITION_DISPLAY_ORDER_ASC',
  PositionDisplayOrderDesc = 'POSITION_DISPLAY_ORDER_DESC',
  PositionNumberAsc = 'POSITION_NUMBER_ASC',
  PositionNumberDesc = 'POSITION_NUMBER_DESC',
  PositionTextAsc = 'POSITION_TEXT_ASC',
  PositionTextDesc = 'POSITION_TEXT_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  TimeAsc = 'TIME_ASC',
  TimeDesc = 'TIME_DESC',
  TimeMillisAsc = 'TIME_MILLIS_ASC',
  TimeMillisDesc = 'TIME_MILLIS_DESC',
  TyreManufacturerIdAsc = 'TYRE_MANUFACTURER_ID_ASC',
  TyreManufacturerIdDesc = 'TYRE_MANUFACTURER_ID_DESC'
}

export type Qualifying1Result = {
  __typename?: 'Qualifying1Result';
  driverId?: Maybe<Scalars['String']['output']>;
  driverNumber?: Maybe<Scalars['String']['output']>;
  engineManufacturerId?: Maybe<Scalars['String']['output']>;
  gap?: Maybe<Scalars['String']['output']>;
  gapMillis?: Maybe<Scalars['Int']['output']>;
  interval?: Maybe<Scalars['String']['output']>;
  intervalMillis?: Maybe<Scalars['Int']['output']>;
  laps?: Maybe<Scalars['Int']['output']>;
  positionDisplayOrder?: Maybe<Scalars['Int']['output']>;
  positionNumber?: Maybe<Scalars['Int']['output']>;
  positionText?: Maybe<Scalars['String']['output']>;
  raceId?: Maybe<Scalars['Int']['output']>;
  teamId?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
  timeMillis?: Maybe<Scalars['Int']['output']>;
  tyreManufacturerId?: Maybe<Scalars['String']['output']>;
};

/**
 * A condition to be used against `Qualifying1Result` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type Qualifying1ResultCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `driverNumber` field. */
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `engineManufacturerId` field. */
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gap` field. */
  gap?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gapMillis` field. */
  gapMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `interval` field. */
  interval?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `intervalMillis` field. */
  intervalMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `laps` field. */
  laps?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionDisplayOrder` field. */
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionNumber` field. */
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionText` field. */
  positionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `time` field. */
  time?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `timeMillis` field. */
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `tyreManufacturerId` field. */
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `Qualifying1Result` values. */
export type Qualifying1ResultConnection = {
  __typename?: 'Qualifying1ResultConnection';
  /** A list of edges which contains the `Qualifying1Result` and cursor to aid in pagination. */
  edges: Array<Maybe<Qualifying1ResultEdge>>;
  /** A list of `Qualifying1Result` objects. */
  nodes: Array<Maybe<Qualifying1Result>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Qualifying1Result` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Qualifying1Result` edge in the connection. */
export type Qualifying1ResultEdge = {
  __typename?: 'Qualifying1ResultEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Qualifying1Result` at the end of the edge. */
  node?: Maybe<Qualifying1Result>;
};

/** An input for mutations affecting `Qualifying1Result` */
export type Qualifying1ResultInput = {
  driverId?: InputMaybe<Scalars['String']['input']>;
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  gap?: InputMaybe<Scalars['String']['input']>;
  gapMillis?: InputMaybe<Scalars['Int']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  intervalMillis?: InputMaybe<Scalars['Int']['input']>;
  laps?: InputMaybe<Scalars['Int']['input']>;
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `Qualifying1Result`. */
export enum Qualifying1ResultOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  DriverNumberAsc = 'DRIVER_NUMBER_ASC',
  DriverNumberDesc = 'DRIVER_NUMBER_DESC',
  EngineManufacturerIdAsc = 'ENGINE_MANUFACTURER_ID_ASC',
  EngineManufacturerIdDesc = 'ENGINE_MANUFACTURER_ID_DESC',
  GapAsc = 'GAP_ASC',
  GapDesc = 'GAP_DESC',
  GapMillisAsc = 'GAP_MILLIS_ASC',
  GapMillisDesc = 'GAP_MILLIS_DESC',
  IntervalAsc = 'INTERVAL_ASC',
  IntervalDesc = 'INTERVAL_DESC',
  IntervalMillisAsc = 'INTERVAL_MILLIS_ASC',
  IntervalMillisDesc = 'INTERVAL_MILLIS_DESC',
  LapsAsc = 'LAPS_ASC',
  LapsDesc = 'LAPS_DESC',
  Natural = 'NATURAL',
  PositionDisplayOrderAsc = 'POSITION_DISPLAY_ORDER_ASC',
  PositionDisplayOrderDesc = 'POSITION_DISPLAY_ORDER_DESC',
  PositionNumberAsc = 'POSITION_NUMBER_ASC',
  PositionNumberDesc = 'POSITION_NUMBER_DESC',
  PositionTextAsc = 'POSITION_TEXT_ASC',
  PositionTextDesc = 'POSITION_TEXT_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  TimeAsc = 'TIME_ASC',
  TimeDesc = 'TIME_DESC',
  TimeMillisAsc = 'TIME_MILLIS_ASC',
  TimeMillisDesc = 'TIME_MILLIS_DESC',
  TyreManufacturerIdAsc = 'TYRE_MANUFACTURER_ID_ASC',
  TyreManufacturerIdDesc = 'TYRE_MANUFACTURER_ID_DESC'
}

export type Qualifying2Result = {
  __typename?: 'Qualifying2Result';
  driverId?: Maybe<Scalars['String']['output']>;
  driverNumber?: Maybe<Scalars['String']['output']>;
  engineManufacturerId?: Maybe<Scalars['String']['output']>;
  gap?: Maybe<Scalars['String']['output']>;
  gapMillis?: Maybe<Scalars['Int']['output']>;
  interval?: Maybe<Scalars['String']['output']>;
  intervalMillis?: Maybe<Scalars['Int']['output']>;
  laps?: Maybe<Scalars['Int']['output']>;
  positionDisplayOrder?: Maybe<Scalars['Int']['output']>;
  positionNumber?: Maybe<Scalars['Int']['output']>;
  positionText?: Maybe<Scalars['String']['output']>;
  raceId?: Maybe<Scalars['Int']['output']>;
  teamId?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
  timeMillis?: Maybe<Scalars['Int']['output']>;
  tyreManufacturerId?: Maybe<Scalars['String']['output']>;
};

/**
 * A condition to be used against `Qualifying2Result` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type Qualifying2ResultCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `driverNumber` field. */
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `engineManufacturerId` field. */
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gap` field. */
  gap?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gapMillis` field. */
  gapMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `interval` field. */
  interval?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `intervalMillis` field. */
  intervalMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `laps` field. */
  laps?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionDisplayOrder` field. */
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionNumber` field. */
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionText` field. */
  positionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `time` field. */
  time?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `timeMillis` field. */
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `tyreManufacturerId` field. */
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `Qualifying2Result` values. */
export type Qualifying2ResultConnection = {
  __typename?: 'Qualifying2ResultConnection';
  /** A list of edges which contains the `Qualifying2Result` and cursor to aid in pagination. */
  edges: Array<Maybe<Qualifying2ResultEdge>>;
  /** A list of `Qualifying2Result` objects. */
  nodes: Array<Maybe<Qualifying2Result>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Qualifying2Result` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Qualifying2Result` edge in the connection. */
export type Qualifying2ResultEdge = {
  __typename?: 'Qualifying2ResultEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Qualifying2Result` at the end of the edge. */
  node?: Maybe<Qualifying2Result>;
};

/** An input for mutations affecting `Qualifying2Result` */
export type Qualifying2ResultInput = {
  driverId?: InputMaybe<Scalars['String']['input']>;
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  gap?: InputMaybe<Scalars['String']['input']>;
  gapMillis?: InputMaybe<Scalars['Int']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  intervalMillis?: InputMaybe<Scalars['Int']['input']>;
  laps?: InputMaybe<Scalars['Int']['input']>;
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `Qualifying2Result`. */
export enum Qualifying2ResultOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  DriverNumberAsc = 'DRIVER_NUMBER_ASC',
  DriverNumberDesc = 'DRIVER_NUMBER_DESC',
  EngineManufacturerIdAsc = 'ENGINE_MANUFACTURER_ID_ASC',
  EngineManufacturerIdDesc = 'ENGINE_MANUFACTURER_ID_DESC',
  GapAsc = 'GAP_ASC',
  GapDesc = 'GAP_DESC',
  GapMillisAsc = 'GAP_MILLIS_ASC',
  GapMillisDesc = 'GAP_MILLIS_DESC',
  IntervalAsc = 'INTERVAL_ASC',
  IntervalDesc = 'INTERVAL_DESC',
  IntervalMillisAsc = 'INTERVAL_MILLIS_ASC',
  IntervalMillisDesc = 'INTERVAL_MILLIS_DESC',
  LapsAsc = 'LAPS_ASC',
  LapsDesc = 'LAPS_DESC',
  Natural = 'NATURAL',
  PositionDisplayOrderAsc = 'POSITION_DISPLAY_ORDER_ASC',
  PositionDisplayOrderDesc = 'POSITION_DISPLAY_ORDER_DESC',
  PositionNumberAsc = 'POSITION_NUMBER_ASC',
  PositionNumberDesc = 'POSITION_NUMBER_DESC',
  PositionTextAsc = 'POSITION_TEXT_ASC',
  PositionTextDesc = 'POSITION_TEXT_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  TimeAsc = 'TIME_ASC',
  TimeDesc = 'TIME_DESC',
  TimeMillisAsc = 'TIME_MILLIS_ASC',
  TimeMillisDesc = 'TIME_MILLIS_DESC',
  TyreManufacturerIdAsc = 'TYRE_MANUFACTURER_ID_ASC',
  TyreManufacturerIdDesc = 'TYRE_MANUFACTURER_ID_DESC'
}

export type QualifyingResult = Node & {
  __typename?: 'QualifyingResult';
  /** Reads a single `Driver` that is related to this `QualifyingResult`. */
  driver?: Maybe<Driver>;
  driverId?: Maybe<Scalars['String']['output']>;
  driverNumber?: Maybe<Scalars['String']['output']>;
  engineManufacturerId?: Maybe<Scalars['String']['output']>;
  gap?: Maybe<Scalars['String']['output']>;
  gapMillis?: Maybe<Scalars['Int']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  interval?: Maybe<Scalars['String']['output']>;
  intervalMillis?: Maybe<Scalars['Int']['output']>;
  laps?: Maybe<Scalars['Int']['output']>;
  positionDisplayOrder: Scalars['Int']['output'];
  positionNumber?: Maybe<Scalars['Int']['output']>;
  positionText?: Maybe<Scalars['String']['output']>;
  q1?: Maybe<Scalars['String']['output']>;
  q1Millis?: Maybe<Scalars['Int']['output']>;
  q2?: Maybe<Scalars['String']['output']>;
  q2Millis?: Maybe<Scalars['Int']['output']>;
  q3?: Maybe<Scalars['String']['output']>;
  q3Millis?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `Race` that is related to this `QualifyingResult`. */
  race?: Maybe<Race>;
  raceId: Scalars['Int']['output'];
  /** Reads a single `Team` that is related to this `QualifyingResult`. */
  team?: Maybe<Team>;
  teamId?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
  timeMillis?: Maybe<Scalars['Int']['output']>;
  tyreManufacturerId?: Maybe<Scalars['String']['output']>;
};

/**
 * A condition to be used against `QualifyingResult` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type QualifyingResultCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `driverNumber` field. */
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `engineManufacturerId` field. */
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gap` field. */
  gap?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gapMillis` field. */
  gapMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `interval` field. */
  interval?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `intervalMillis` field. */
  intervalMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `laps` field. */
  laps?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionDisplayOrder` field. */
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionNumber` field. */
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionText` field. */
  positionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `q1` field. */
  q1?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `q1Millis` field. */
  q1Millis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `q2` field. */
  q2?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `q2Millis` field. */
  q2Millis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `q3` field. */
  q3?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `q3Millis` field. */
  q3Millis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `time` field. */
  time?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `timeMillis` field. */
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `tyreManufacturerId` field. */
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `QualifyingResult` values. */
export type QualifyingResultConnection = {
  __typename?: 'QualifyingResultConnection';
  /** A list of edges which contains the `QualifyingResult` and cursor to aid in pagination. */
  edges: Array<Maybe<QualifyingResultEdge>>;
  /** A list of `QualifyingResult` objects. */
  nodes: Array<Maybe<QualifyingResult>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `QualifyingResult` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `QualifyingResult` edge in the connection. */
export type QualifyingResultEdge = {
  __typename?: 'QualifyingResultEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `QualifyingResult` at the end of the edge. */
  node?: Maybe<QualifyingResult>;
};

/** An input for mutations affecting `QualifyingResult` */
export type QualifyingResultInput = {
  driverId?: InputMaybe<Scalars['String']['input']>;
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  gap?: InputMaybe<Scalars['String']['input']>;
  gapMillis?: InputMaybe<Scalars['Int']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  intervalMillis?: InputMaybe<Scalars['Int']['input']>;
  laps?: InputMaybe<Scalars['Int']['input']>;
  positionDisplayOrder: Scalars['Int']['input'];
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  q1?: InputMaybe<Scalars['String']['input']>;
  q1Millis?: InputMaybe<Scalars['Int']['input']>;
  q2?: InputMaybe<Scalars['String']['input']>;
  q2Millis?: InputMaybe<Scalars['Int']['input']>;
  q3?: InputMaybe<Scalars['String']['input']>;
  q3Millis?: InputMaybe<Scalars['Int']['input']>;
  raceId: Scalars['Int']['input'];
  teamId?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `QualifyingResult`. */
export enum QualifyingResultOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  DriverNumberAsc = 'DRIVER_NUMBER_ASC',
  DriverNumberDesc = 'DRIVER_NUMBER_DESC',
  EngineManufacturerIdAsc = 'ENGINE_MANUFACTURER_ID_ASC',
  EngineManufacturerIdDesc = 'ENGINE_MANUFACTURER_ID_DESC',
  GapAsc = 'GAP_ASC',
  GapDesc = 'GAP_DESC',
  GapMillisAsc = 'GAP_MILLIS_ASC',
  GapMillisDesc = 'GAP_MILLIS_DESC',
  IntervalAsc = 'INTERVAL_ASC',
  IntervalDesc = 'INTERVAL_DESC',
  IntervalMillisAsc = 'INTERVAL_MILLIS_ASC',
  IntervalMillisDesc = 'INTERVAL_MILLIS_DESC',
  LapsAsc = 'LAPS_ASC',
  LapsDesc = 'LAPS_DESC',
  Natural = 'NATURAL',
  PositionDisplayOrderAsc = 'POSITION_DISPLAY_ORDER_ASC',
  PositionDisplayOrderDesc = 'POSITION_DISPLAY_ORDER_DESC',
  PositionNumberAsc = 'POSITION_NUMBER_ASC',
  PositionNumberDesc = 'POSITION_NUMBER_DESC',
  PositionTextAsc = 'POSITION_TEXT_ASC',
  PositionTextDesc = 'POSITION_TEXT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  Q1Asc = 'Q1_ASC',
  Q1Desc = 'Q1_DESC',
  Q1MillisAsc = 'Q1_MILLIS_ASC',
  Q1MillisDesc = 'Q1_MILLIS_DESC',
  Q2Asc = 'Q2_ASC',
  Q2Desc = 'Q2_DESC',
  Q2MillisAsc = 'Q2_MILLIS_ASC',
  Q2MillisDesc = 'Q2_MILLIS_DESC',
  Q3Asc = 'Q3_ASC',
  Q3Desc = 'Q3_DESC',
  Q3MillisAsc = 'Q3_MILLIS_ASC',
  Q3MillisDesc = 'Q3_MILLIS_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  TimeAsc = 'TIME_ASC',
  TimeDesc = 'TIME_DESC',
  TimeMillisAsc = 'TIME_MILLIS_ASC',
  TimeMillisDesc = 'TIME_MILLIS_DESC',
  TyreManufacturerIdAsc = 'TYRE_MANUFACTURER_ID_ASC',
  TyreManufacturerIdDesc = 'TYRE_MANUFACTURER_ID_DESC'
}

/** Represents an update to a `QualifyingResult`. Fields that are set will be updated. */
export type QualifyingResultPatch = {
  driverId?: InputMaybe<Scalars['String']['input']>;
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  gap?: InputMaybe<Scalars['String']['input']>;
  gapMillis?: InputMaybe<Scalars['Int']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  intervalMillis?: InputMaybe<Scalars['Int']['input']>;
  laps?: InputMaybe<Scalars['Int']['input']>;
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  q1?: InputMaybe<Scalars['String']['input']>;
  q1Millis?: InputMaybe<Scalars['Int']['input']>;
  q2?: InputMaybe<Scalars['String']['input']>;
  q2Millis?: InputMaybe<Scalars['Int']['input']>;
  q3?: InputMaybe<Scalars['String']['input']>;
  q3Millis?: InputMaybe<Scalars['Int']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /** Get a single `AppCircuitDescription`. */
  appCircuitDescription?: Maybe<AppCircuitDescription>;
  /** Reads a single `AppCircuitDescription` using its globally unique `ID`. */
  appCircuitDescriptionById?: Maybe<AppCircuitDescription>;
  /** Reads and enables pagination through a set of `AppCircuitDescription`. */
  appCircuitDescriptions?: Maybe<AppCircuitDescriptionConnection>;
  /** Get a single `AppConstructorBio`. */
  appConstructorBio?: Maybe<AppConstructorBio>;
  /** Reads a single `AppConstructorBio` using its globally unique `ID`. */
  appConstructorBioById?: Maybe<AppConstructorBio>;
  /** Reads and enables pagination through a set of `AppConstructorBio`. */
  appConstructorBios?: Maybe<AppConstructorBioConnection>;
  /** Get a single `AppDriverBio`. */
  appDriverBio?: Maybe<AppDriverBio>;
  /** Reads a single `AppDriverBio` using its globally unique `ID`. */
  appDriverBioById?: Maybe<AppDriverBio>;
  /** Reads and enables pagination through a set of `AppDriverBio`. */
  appDriverBios?: Maybe<AppDriverBioConnection>;
  /** Get a single `AppIngestState`. */
  appIngestState?: Maybe<AppIngestState>;
  /** Reads a single `AppIngestState` using its globally unique `ID`. */
  appIngestStateById?: Maybe<AppIngestState>;
  /** Reads and enables pagination through a set of `AppIngestState`. */
  appIngestStates?: Maybe<AppIngestStateConnection>;
  /** Get a single `AppLapTime`. */
  appLapTime?: Maybe<AppLapTime>;
  /** Reads a single `AppLapTime` using its globally unique `ID`. */
  appLapTimeById?: Maybe<AppLapTime>;
  /** Reads and enables pagination through a set of `AppLapTime`. */
  appLapTimes?: Maybe<AppLapTimeConnection>;
  /** Get a single `AppTeamColor`. */
  appTeamColor?: Maybe<AppTeamColor>;
  /** Reads a single `AppTeamColor` using its globally unique `ID`. */
  appTeamColorById?: Maybe<AppTeamColor>;
  /** Reads and enables pagination through a set of `AppTeamColor`. */
  appTeamColors?: Maybe<AppTeamColorConnection>;
  /** Reads and enables pagination through a set of `AppTeamHistory`. */
  appTeamHistories?: Maybe<AppTeamHistoryConnection>;
  /** Get a single `AppTeamHistory`. */
  appTeamHistory?: Maybe<AppTeamHistory>;
  /** Reads a single `AppTeamHistory` using its globally unique `ID`. */
  appTeamHistoryById?: Maybe<AppTeamHistory>;
  /** Get a single `Chassis`. */
  chassis?: Maybe<Chassis>;
  /** Reads a single `Chassis` using its globally unique `ID`. */
  chassisById?: Maybe<Chassis>;
  /** Reads and enables pagination through a set of `Chassis`. */
  chassises?: Maybe<ChassisConnection>;
  /** Get a single `Circuit`. */
  circuit?: Maybe<Circuit>;
  /** Reads a single `Circuit` using its globally unique `ID`. */
  circuitById?: Maybe<Circuit>;
  /** Get a single `CircuitLayout`. */
  circuitLayout?: Maybe<CircuitLayout>;
  /** Reads a single `CircuitLayout` using its globally unique `ID`. */
  circuitLayoutById?: Maybe<CircuitLayout>;
  /** Reads and enables pagination through a set of `CircuitLayout`. */
  circuitLayouts?: Maybe<CircuitLayoutConnection>;
  /** Reads and enables pagination through a set of `Circuit`. */
  circuits?: Maybe<CircuitConnection>;
  /** Get a single `Continent`. */
  continent?: Maybe<Continent>;
  /** Get a single `Continent`. */
  continentByCode?: Maybe<Continent>;
  /** Reads a single `Continent` using its globally unique `ID`. */
  continentById?: Maybe<Continent>;
  /** Get a single `Continent`. */
  continentByName?: Maybe<Continent>;
  /** Reads and enables pagination through a set of `Continent`. */
  continents?: Maybe<ContinentConnection>;
  /** Reads and enables pagination through a set of `Country`. */
  countries?: Maybe<CountryConnection>;
  /** Get a single `Country`. */
  country?: Maybe<Country>;
  /** Get a single `Country`. */
  countryByAlpha2Code?: Maybe<Country>;
  /** Get a single `Country`. */
  countryByAlpha3Code?: Maybe<Country>;
  /** Reads a single `Country` using its globally unique `ID`. */
  countryById?: Maybe<Country>;
  /** Get a single `Country`. */
  countryByName?: Maybe<Country>;
  /** Get a single `Driver`. */
  driver?: Maybe<Driver>;
  /** Reads a single `Driver` using its globally unique `ID`. */
  driverById?: Maybe<Driver>;
  /** Get a single `DriverFamilyRelationship`. */
  driverFamilyRelationship?: Maybe<DriverFamilyRelationship>;
  /** Get a single `DriverFamilyRelationship`. */
  driverFamilyRelationshipByDriverIdAndOtherDriverIdAndType?: Maybe<DriverFamilyRelationship>;
  /** Reads a single `DriverFamilyRelationship` using its globally unique `ID`. */
  driverFamilyRelationshipById?: Maybe<DriverFamilyRelationship>;
  /** Reads and enables pagination through a set of `DriverFamilyRelationship`. */
  driverFamilyRelationships?: Maybe<DriverFamilyRelationshipConnection>;
  /** Get a single `DriverOfTheDayResult`. */
  driverOfTheDayResult?: Maybe<DriverOfTheDayResult>;
  /** Reads a single `DriverOfTheDayResult` using its globally unique `ID`. */
  driverOfTheDayResultById?: Maybe<DriverOfTheDayResult>;
  /** Reads and enables pagination through a set of `DriverOfTheDayResult`. */
  driverOfTheDayResults?: Maybe<DriverOfTheDayResultConnection>;
  /** Reads and enables pagination through a set of `Driver`. */
  drivers?: Maybe<DriverConnection>;
  /** Get a single `Engine`. */
  engine?: Maybe<Engine>;
  /** Reads a single `Engine` using its globally unique `ID`. */
  engineById?: Maybe<Engine>;
  /** Get a single `EngineManufacturer`. */
  engineManufacturer?: Maybe<EngineManufacturer>;
  /** Reads a single `EngineManufacturer` using its globally unique `ID`. */
  engineManufacturerById?: Maybe<EngineManufacturer>;
  /** Reads and enables pagination through a set of `EngineManufacturer`. */
  engineManufacturers?: Maybe<EngineManufacturerConnection>;
  /** Reads and enables pagination through a set of `Engine`. */
  engines?: Maybe<EngineConnection>;
  /** Get a single `Entrant`. */
  entrant?: Maybe<Entrant>;
  /** Reads a single `Entrant` using its globally unique `ID`. */
  entrantById?: Maybe<Entrant>;
  /** Reads and enables pagination through a set of `Entrant`. */
  entrants?: Maybe<EntrantConnection>;
  /** Get a single `FastestLap`. */
  fastestLap?: Maybe<FastestLap>;
  /** Reads a single `FastestLap` using its globally unique `ID`. */
  fastestLapById?: Maybe<FastestLap>;
  /** Reads and enables pagination through a set of `FastestLap`. */
  fastestLaps?: Maybe<FastestLapConnection>;
  /** Reads and enables pagination through a set of `FreePractice1Result`. */
  freePractice1Results?: Maybe<FreePractice1ResultConnection>;
  /** Reads and enables pagination through a set of `FreePractice2Result`. */
  freePractice2Results?: Maybe<FreePractice2ResultConnection>;
  /** Reads and enables pagination through a set of `FreePractice3Result`. */
  freePractice3Results?: Maybe<FreePractice3ResultConnection>;
  /** Reads and enables pagination through a set of `FreePractice4Result`. */
  freePractice4Results?: Maybe<FreePractice4ResultConnection>;
  /** Get a single `GrandPrix`. */
  grandPrix?: Maybe<GrandPrix>;
  /** Reads a single `GrandPrix` using its globally unique `ID`. */
  grandPrixById?: Maybe<GrandPrix>;
  /** Reads and enables pagination through a set of `GrandPrix`. */
  grandPrixes?: Maybe<GrandPrixConnection>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  id: Scalars['ID']['output'];
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** Get a single `PitStop`. */
  pitStop?: Maybe<PitStop>;
  /** Reads a single `PitStop` using its globally unique `ID`. */
  pitStopById?: Maybe<PitStop>;
  /** Reads and enables pagination through a set of `PitStop`. */
  pitStops?: Maybe<PitStopConnection>;
  /** Reads and enables pagination through a set of `PreQualifyingResult`. */
  preQualifyingResults?: Maybe<PreQualifyingResultConnection>;
  /** Reads and enables pagination through a set of `Qualifying1Result`. */
  qualifying1Results?: Maybe<Qualifying1ResultConnection>;
  /** Reads and enables pagination through a set of `Qualifying2Result`. */
  qualifying2Results?: Maybe<Qualifying2ResultConnection>;
  /** Get a single `QualifyingResult`. */
  qualifyingResult?: Maybe<QualifyingResult>;
  /** Reads a single `QualifyingResult` using its globally unique `ID`. */
  qualifyingResultById?: Maybe<QualifyingResult>;
  /** Reads and enables pagination through a set of `QualifyingResult`. */
  qualifyingResults?: Maybe<QualifyingResultConnection>;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** Get a single `Race`. */
  race?: Maybe<Race>;
  /** Reads a single `Race` using its globally unique `ID`. */
  raceById?: Maybe<Race>;
  /** Get a single `Race`. */
  raceByYearAndRound?: Maybe<Race>;
  /** Reads and enables pagination through a set of `RaceDatum`. */
  raceData?: Maybe<RaceDatumConnection>;
  /** Get a single `RaceDatum`. */
  raceDatum?: Maybe<RaceDatum>;
  /** Reads a single `RaceDatum` using its globally unique `ID`. */
  raceDatumById?: Maybe<RaceDatum>;
  /** Get a single `RaceDriverStanding`. */
  raceDriverStanding?: Maybe<RaceDriverStanding>;
  /** Reads a single `RaceDriverStanding` using its globally unique `ID`. */
  raceDriverStandingById?: Maybe<RaceDriverStanding>;
  /** Reads and enables pagination through a set of `RaceDriverStanding`. */
  raceDriverStandings?: Maybe<RaceDriverStandingConnection>;
  /** Get a single `RaceResult`. */
  raceResult?: Maybe<RaceResult>;
  /** Reads a single `RaceResult` using its globally unique `ID`. */
  raceResultById?: Maybe<RaceResult>;
  /** Reads and enables pagination through a set of `RaceResult`. */
  raceResults?: Maybe<RaceResultConnection>;
  /** Get a single `RaceTeamStanding`. */
  raceTeamStanding?: Maybe<RaceTeamStanding>;
  /** Reads a single `RaceTeamStanding` using its globally unique `ID`. */
  raceTeamStandingById?: Maybe<RaceTeamStanding>;
  /** Reads and enables pagination through a set of `RaceTeamStanding`. */
  raceTeamStandings?: Maybe<RaceTeamStandingConnection>;
  /** Reads and enables pagination through a set of `Race`. */
  races?: Maybe<RaceConnection>;
  /** Get a single `Season`. */
  season?: Maybe<Season>;
  /** Reads a single `Season` using its globally unique `ID`. */
  seasonById?: Maybe<Season>;
  /** Get a single `SeasonDriver`. */
  seasonDriver?: Maybe<SeasonDriver>;
  /** Reads a single `SeasonDriver` using its globally unique `ID`. */
  seasonDriverById?: Maybe<SeasonDriver>;
  /** Get a single `SeasonDriverStanding`. */
  seasonDriverStanding?: Maybe<SeasonDriverStanding>;
  /** Reads a single `SeasonDriverStanding` using its globally unique `ID`. */
  seasonDriverStandingById?: Maybe<SeasonDriverStanding>;
  /** Reads and enables pagination through a set of `SeasonDriverStanding`. */
  seasonDriverStandings?: Maybe<SeasonDriverStandingConnection>;
  /** Reads and enables pagination through a set of `SeasonDriver`. */
  seasonDrivers?: Maybe<SeasonDriverConnection>;
  /** Get a single `SeasonEngineManufacturer`. */
  seasonEngineManufacturer?: Maybe<SeasonEngineManufacturer>;
  /** Reads a single `SeasonEngineManufacturer` using its globally unique `ID`. */
  seasonEngineManufacturerById?: Maybe<SeasonEngineManufacturer>;
  /** Reads and enables pagination through a set of `SeasonEngineManufacturer`. */
  seasonEngineManufacturers?: Maybe<SeasonEngineManufacturerConnection>;
  /** Get a single `SeasonEntrant`. */
  seasonEntrant?: Maybe<SeasonEntrant>;
  /** Reads a single `SeasonEntrant` using its globally unique `ID`. */
  seasonEntrantById?: Maybe<SeasonEntrant>;
  /** Get a single `SeasonEntrantChassis`. */
  seasonEntrantChassis?: Maybe<SeasonEntrantChassis>;
  /** Reads a single `SeasonEntrantChassis` using its globally unique `ID`. */
  seasonEntrantChassisById?: Maybe<SeasonEntrantChassis>;
  /** Reads and enables pagination through a set of `SeasonEntrantChassis`. */
  seasonEntrantChassises?: Maybe<SeasonEntrantChassisConnection>;
  /** Get a single `SeasonEntrantDriver`. */
  seasonEntrantDriver?: Maybe<SeasonEntrantDriver>;
  /** Reads a single `SeasonEntrantDriver` using its globally unique `ID`. */
  seasonEntrantDriverById?: Maybe<SeasonEntrantDriver>;
  /** Reads and enables pagination through a set of `SeasonEntrantDriver`. */
  seasonEntrantDrivers?: Maybe<SeasonEntrantDriverConnection>;
  /** Get a single `SeasonEntrantEngine`. */
  seasonEntrantEngine?: Maybe<SeasonEntrantEngine>;
  /** Reads a single `SeasonEntrantEngine` using its globally unique `ID`. */
  seasonEntrantEngineById?: Maybe<SeasonEntrantEngine>;
  /** Reads and enables pagination through a set of `SeasonEntrantEngine`. */
  seasonEntrantEngines?: Maybe<SeasonEntrantEngineConnection>;
  /** Get a single `SeasonEntrantTeam`. */
  seasonEntrantTeam?: Maybe<SeasonEntrantTeam>;
  /** Reads a single `SeasonEntrantTeam` using its globally unique `ID`. */
  seasonEntrantTeamById?: Maybe<SeasonEntrantTeam>;
  /** Reads and enables pagination through a set of `SeasonEntrantTeam`. */
  seasonEntrantTeams?: Maybe<SeasonEntrantTeamConnection>;
  /** Get a single `SeasonEntrantTyreManufacturer`. */
  seasonEntrantTyreManufacturer?: Maybe<SeasonEntrantTyreManufacturer>;
  /** Reads a single `SeasonEntrantTyreManufacturer` using its globally unique `ID`. */
  seasonEntrantTyreManufacturerById?: Maybe<SeasonEntrantTyreManufacturer>;
  /** Reads and enables pagination through a set of `SeasonEntrantTyreManufacturer`. */
  seasonEntrantTyreManufacturers?: Maybe<SeasonEntrantTyreManufacturerConnection>;
  /** Reads and enables pagination through a set of `SeasonEntrant`. */
  seasonEntrants?: Maybe<SeasonEntrantConnection>;
  /** Get a single `SeasonTeam`. */
  seasonTeam?: Maybe<SeasonTeam>;
  /** Reads a single `SeasonTeam` using its globally unique `ID`. */
  seasonTeamById?: Maybe<SeasonTeam>;
  /** Get a single `SeasonTeamStanding`. */
  seasonTeamStanding?: Maybe<SeasonTeamStanding>;
  /** Reads a single `SeasonTeamStanding` using its globally unique `ID`. */
  seasonTeamStandingById?: Maybe<SeasonTeamStanding>;
  /** Reads and enables pagination through a set of `SeasonTeamStanding`. */
  seasonTeamStandings?: Maybe<SeasonTeamStandingConnection>;
  /** Reads and enables pagination through a set of `SeasonTeam`. */
  seasonTeams?: Maybe<SeasonTeamConnection>;
  /** Get a single `SeasonTyreManufacturer`. */
  seasonTyreManufacturer?: Maybe<SeasonTyreManufacturer>;
  /** Reads a single `SeasonTyreManufacturer` using its globally unique `ID`. */
  seasonTyreManufacturerById?: Maybe<SeasonTyreManufacturer>;
  /** Reads and enables pagination through a set of `SeasonTyreManufacturer`. */
  seasonTyreManufacturers?: Maybe<SeasonTyreManufacturerConnection>;
  /** Reads and enables pagination through a set of `Season`. */
  seasons?: Maybe<SeasonConnection>;
  /** Get a single `SprintQualifyingResult`. */
  sprintQualifyingResult?: Maybe<SprintQualifyingResult>;
  /** Reads a single `SprintQualifyingResult` using its globally unique `ID`. */
  sprintQualifyingResultById?: Maybe<SprintQualifyingResult>;
  /** Reads and enables pagination through a set of `SprintQualifyingResult`. */
  sprintQualifyingResults?: Maybe<SprintQualifyingResultConnection>;
  /** Get a single `SprintRaceResult`. */
  sprintRaceResult?: Maybe<SprintRaceResult>;
  /** Reads a single `SprintRaceResult` using its globally unique `ID`. */
  sprintRaceResultById?: Maybe<SprintRaceResult>;
  /** Reads and enables pagination through a set of `SprintRaceResult`. */
  sprintRaceResults?: Maybe<SprintRaceResultConnection>;
  /** Get a single `SprintStartingGridPosition`. */
  sprintStartingGridPosition?: Maybe<SprintStartingGridPosition>;
  /** Reads a single `SprintStartingGridPosition` using its globally unique `ID`. */
  sprintStartingGridPositionById?: Maybe<SprintStartingGridPosition>;
  /** Reads and enables pagination through a set of `SprintStartingGridPosition`. */
  sprintStartingGridPositions?: Maybe<SprintStartingGridPositionConnection>;
  /** Get a single `StartingGridPosition`. */
  startingGridPosition?: Maybe<StartingGridPosition>;
  /** Reads a single `StartingGridPosition` using its globally unique `ID`. */
  startingGridPositionById?: Maybe<StartingGridPosition>;
  /** Reads and enables pagination through a set of `StartingGridPosition`. */
  startingGridPositions?: Maybe<StartingGridPositionConnection>;
  /** Get a single `Team`. */
  team?: Maybe<Team>;
  /** Reads a single `Team` using its globally unique `ID`. */
  teamById?: Maybe<Team>;
  /** Reads and enables pagination through a set of `TeamChronology`. */
  teamChronologies?: Maybe<TeamChronologyConnection>;
  /** Get a single `TeamChronology`. */
  teamChronology?: Maybe<TeamChronology>;
  /** Reads a single `TeamChronology` using its globally unique `ID`. */
  teamChronologyById?: Maybe<TeamChronology>;
  /** Get a single `TeamChronology`. */
  teamChronologyByTeamIdAndOtherTeamIdAndYearFromAndYearTo?: Maybe<TeamChronology>;
  /** Reads and enables pagination through a set of `Team`. */
  teams?: Maybe<TeamConnection>;
  /** Get a single `TyreManufacturer`. */
  tyreManufacturer?: Maybe<TyreManufacturer>;
  /** Reads a single `TyreManufacturer` using its globally unique `ID`. */
  tyreManufacturerById?: Maybe<TyreManufacturer>;
  /** Reads and enables pagination through a set of `TyreManufacturer`. */
  tyreManufacturers?: Maybe<TyreManufacturerConnection>;
  /** Reads and enables pagination through a set of `WarmingUpResult`. */
  warmingUpResults?: Maybe<WarmingUpResultConnection>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAppCircuitDescriptionArgs = {
  circuitId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAppCircuitDescriptionByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAppCircuitDescriptionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AppCircuitDescriptionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AppCircuitDescriptionOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAppConstructorBioArgs = {
  teamId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAppConstructorBioByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAppConstructorBiosArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AppConstructorBioCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AppConstructorBioOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAppDriverBioArgs = {
  driverId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAppDriverBioByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAppDriverBiosArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AppDriverBioCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AppDriverBioOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAppIngestStateArgs = {
  key: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAppIngestStateByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAppIngestStatesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AppIngestStateCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AppIngestStateOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAppLapTimeArgs = {
  driverId: Scalars['String']['input'];
  lap: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAppLapTimeByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAppLapTimesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AppLapTimeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AppLapTimeOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAppTeamColorArgs = {
  teamId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAppTeamColorByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAppTeamColorsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AppTeamColorCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AppTeamColorOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAppTeamHistoriesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AppTeamHistoryCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AppTeamHistoryOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAppTeamHistoryArgs = {
  antecedentTeamId: Scalars['String']['input'];
  startYear: Scalars['Int']['input'];
  teamId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAppTeamHistoryByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryChassisArgs = {
  rowId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryChassisByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryChassisesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ChassisCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ChassisOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCircuitArgs = {
  rowId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCircuitByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCircuitLayoutArgs = {
  rowId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCircuitLayoutByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCircuitLayoutsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CircuitLayoutCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CircuitLayoutOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCircuitsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CircuitCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CircuitOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryContinentArgs = {
  rowId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryContinentByCodeArgs = {
  code: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryContinentByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryContinentByNameArgs = {
  name: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryContinentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ContinentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ContinentOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCountriesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CountryCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CountryOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCountryArgs = {
  rowId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCountryByAlpha2CodeArgs = {
  alpha2Code: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCountryByAlpha3CodeArgs = {
  alpha3Code: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCountryByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCountryByNameArgs = {
  name: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDriverArgs = {
  rowId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDriverByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDriverFamilyRelationshipArgs = {
  driverId: Scalars['String']['input'];
  positionDisplayOrder: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDriverFamilyRelationshipByDriverIdAndOtherDriverIdAndTypeArgs = {
  driverId: Scalars['String']['input'];
  otherDriverId: Scalars['String']['input'];
  type: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDriverFamilyRelationshipByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDriverFamilyRelationshipsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DriverFamilyRelationshipCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverFamilyRelationshipOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryDriverOfTheDayResultArgs = {
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDriverOfTheDayResultByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDriverOfTheDayResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DriverOfTheDayResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverOfTheDayResultOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryDriversArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DriverCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEngineArgs = {
  rowId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEngineByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEngineManufacturerArgs = {
  rowId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEngineManufacturerByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEngineManufacturersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<EngineManufacturerCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EngineManufacturerOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEnginesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<EngineCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EngineOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEntrantArgs = {
  rowId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEntrantByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEntrantsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<EntrantCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EntrantOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryFastestLapArgs = {
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryFastestLapByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryFastestLapsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<FastestLapCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FastestLapOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryFreePractice1ResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<FreePractice1ResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FreePractice1ResultOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryFreePractice2ResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<FreePractice2ResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FreePractice2ResultOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryFreePractice3ResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<FreePractice3ResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FreePractice3ResultOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryFreePractice4ResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<FreePractice4ResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FreePractice4ResultOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGrandPrixArgs = {
  rowId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGrandPrixByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGrandPrixesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<GrandPrixCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GrandPrixOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPitStopArgs = {
  driverId: Scalars['String']['input'];
  raceId: Scalars['Int']['input'];
  stop: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPitStopByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPitStopsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PitStopCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PitStopOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPreQualifyingResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PreQualifyingResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PreQualifyingResultOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryQualifying1ResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<Qualifying1ResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Qualifying1ResultOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryQualifying2ResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<Qualifying2ResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Qualifying2ResultOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryQualifyingResultArgs = {
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryQualifyingResultByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryQualifyingResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<QualifyingResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<QualifyingResultOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryRaceArgs = {
  rowId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRaceByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRaceByYearAndRoundArgs = {
  round: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRaceDataArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RaceDatumCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceDatumOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryRaceDatumArgs = {
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
  type: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRaceDatumByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRaceDriverStandingArgs = {
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRaceDriverStandingByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRaceDriverStandingsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RaceDriverStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceDriverStandingOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryRaceResultArgs = {
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRaceResultByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRaceResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RaceResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceResultOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryRaceTeamStandingArgs = {
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRaceTeamStandingByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRaceTeamStandingsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RaceTeamStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceTeamStandingOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryRacesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RaceCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonArgs = {
  year: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonDriverArgs = {
  driverId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonDriverByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonDriverStandingArgs = {
  positionDisplayOrder: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonDriverStandingByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonDriverStandingsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonDriverStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonDriverStandingOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonDriversArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonDriverCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonDriverOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonEngineManufacturerArgs = {
  engineManufacturerId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonEngineManufacturerByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonEngineManufacturersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEngineManufacturerCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEngineManufacturerOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonEntrantArgs = {
  entrantId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonEntrantByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonEntrantChassisArgs = {
  chassisId: Scalars['String']['input'];
  engineManufacturerId: Scalars['String']['input'];
  entrantId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonEntrantChassisByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonEntrantChassisesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantChassisCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantChassisOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonEntrantDriverArgs = {
  driverId: Scalars['String']['input'];
  engineManufacturerId: Scalars['String']['input'];
  entrantId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonEntrantDriverByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonEntrantDriversArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantDriverCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantDriverOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonEntrantEngineArgs = {
  engineId: Scalars['String']['input'];
  engineManufacturerId: Scalars['String']['input'];
  entrantId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonEntrantEngineByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonEntrantEnginesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantEngineCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantEngineOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonEntrantTeamArgs = {
  engineManufacturerId: Scalars['String']['input'];
  entrantId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonEntrantTeamByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonEntrantTeamsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantTeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantTeamOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonEntrantTyreManufacturerArgs = {
  engineManufacturerId: Scalars['String']['input'];
  entrantId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
  tyreManufacturerId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonEntrantTyreManufacturerByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonEntrantTyreManufacturersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantTyreManufacturerCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantTyreManufacturerOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonEntrantsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonTeamArgs = {
  teamId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonTeamByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonTeamStandingArgs = {
  positionDisplayOrder: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonTeamStandingByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonTeamStandingsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonTeamStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonTeamStandingOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonTeamsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonTeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonTeamOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonTyreManufacturerArgs = {
  tyreManufacturerId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonTyreManufacturerByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonTyreManufacturersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonTyreManufacturerCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonTyreManufacturerOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySprintQualifyingResultArgs = {
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySprintQualifyingResultByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySprintQualifyingResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SprintQualifyingResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintQualifyingResultOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySprintRaceResultArgs = {
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySprintRaceResultByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySprintRaceResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SprintRaceResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintRaceResultOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySprintStartingGridPositionArgs = {
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySprintStartingGridPositionByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySprintStartingGridPositionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SprintStartingGridPositionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintStartingGridPositionOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryStartingGridPositionArgs = {
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryStartingGridPositionByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryStartingGridPositionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<StartingGridPositionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StartingGridPositionOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTeamArgs = {
  rowId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTeamByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTeamChronologiesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TeamChronologyCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamChronologyOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTeamChronologyArgs = {
  positionDisplayOrder: Scalars['Int']['input'];
  teamId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTeamChronologyByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTeamChronologyByTeamIdAndOtherTeamIdAndYearFromAndYearToArgs = {
  otherTeamId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
  yearFrom: Scalars['Int']['input'];
  yearTo: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTeamsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTyreManufacturerArgs = {
  rowId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTyreManufacturerByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTyreManufacturersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TyreManufacturerCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TyreManufacturerOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryWarmingUpResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<WarmingUpResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WarmingUpResultOrderBy>>;
};

export type Race = Node & {
  __typename?: 'Race';
  /** Reads a single `Circuit` that is related to this `Race`. */
  circuit?: Maybe<Circuit>;
  circuitId: Scalars['String']['output'];
  /** Reads a single `CircuitLayout` that is related to this `Race`. */
  circuitLayout?: Maybe<CircuitLayout>;
  circuitLayoutId: Scalars['String']['output'];
  circuitType: Scalars['String']['output'];
  constructorsChampionshipDecider: Scalars['Boolean']['output'];
  courseLength: Scalars['BigFloat']['output'];
  date: Scalars['Date']['output'];
  direction: Scalars['String']['output'];
  distance: Scalars['BigFloat']['output'];
  /** Reads and enables pagination through a set of `DriverOfTheDayResult`. */
  driverOfTheDayResults: DriverOfTheDayResultConnection;
  driversChampionshipDecider: Scalars['Boolean']['output'];
  /** Reads and enables pagination through a set of `FastestLap`. */
  fastestLaps: FastestLapConnection;
  freePractice1Date?: Maybe<Scalars['Date']['output']>;
  freePractice1Time?: Maybe<Scalars['String']['output']>;
  freePractice2Date?: Maybe<Scalars['Date']['output']>;
  freePractice2Time?: Maybe<Scalars['String']['output']>;
  freePractice3Date?: Maybe<Scalars['Date']['output']>;
  freePractice3Time?: Maybe<Scalars['String']['output']>;
  freePractice4Date?: Maybe<Scalars['Date']['output']>;
  freePractice4Time?: Maybe<Scalars['String']['output']>;
  /** Reads a single `GrandPrix` that is related to this `Race`. */
  grandPrix?: Maybe<GrandPrix>;
  grandPrixId: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `AppLapTime`. */
  lapTimes: AppLapTimeConnection;
  laps: Scalars['Int']['output'];
  officialName: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `PitStop`. */
  pitStops: PitStopConnection;
  preQualifyingDate?: Maybe<Scalars['Date']['output']>;
  preQualifyingTime?: Maybe<Scalars['String']['output']>;
  qualifying1Date?: Maybe<Scalars['Date']['output']>;
  qualifying1Time?: Maybe<Scalars['String']['output']>;
  qualifying2Date?: Maybe<Scalars['Date']['output']>;
  qualifying2Time?: Maybe<Scalars['String']['output']>;
  qualifyingDate?: Maybe<Scalars['Date']['output']>;
  qualifyingFormat: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `QualifyingResult`. */
  qualifyingResults: QualifyingResultConnection;
  qualifyingTime?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `RaceDatum`. */
  raceData: RaceDatumConnection;
  /** Reads and enables pagination through a set of `RaceDriverStanding`. */
  raceDriverStandings: RaceDriverStandingConnection;
  /** Reads and enables pagination through a set of `RaceResult`. */
  raceResults: RaceResultConnection;
  /** Reads and enables pagination through a set of `RaceTeamStanding`. */
  raceTeamStandings: RaceTeamStandingConnection;
  round: Scalars['Int']['output'];
  rowId: Scalars['Int']['output'];
  scheduledDistance?: Maybe<Scalars['BigFloat']['output']>;
  scheduledLaps?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `Season` that is related to this `Race`. */
  season?: Maybe<Season>;
  sprintQualifyingDate?: Maybe<Scalars['Date']['output']>;
  sprintQualifyingFormat?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `SprintQualifyingResult`. */
  sprintQualifyingResults: SprintQualifyingResultConnection;
  sprintQualifyingTime?: Maybe<Scalars['String']['output']>;
  sprintRaceDate?: Maybe<Scalars['Date']['output']>;
  /** Reads and enables pagination through a set of `SprintRaceResult`. */
  sprintRaceResults: SprintRaceResultConnection;
  sprintRaceTime?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `SprintStartingGridPosition`. */
  sprintStartingGridPositions: SprintStartingGridPositionConnection;
  /** Reads and enables pagination through a set of `StartingGridPosition`. */
  startingGridPositions: StartingGridPositionConnection;
  time?: Maybe<Scalars['String']['output']>;
  turns: Scalars['Int']['output'];
  warmingUpDate?: Maybe<Scalars['Date']['output']>;
  warmingUpTime?: Maybe<Scalars['String']['output']>;
  year: Scalars['Int']['output'];
};


export type RaceDriverOfTheDayResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DriverOfTheDayResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverOfTheDayResultOrderBy>>;
};


export type RaceFastestLapsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<FastestLapCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FastestLapOrderBy>>;
};


export type RaceLapTimesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AppLapTimeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AppLapTimeOrderBy>>;
};


export type RacePitStopsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PitStopCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PitStopOrderBy>>;
};


export type RaceQualifyingResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<QualifyingResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<QualifyingResultOrderBy>>;
};


export type RaceRaceDataArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RaceDatumCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceDatumOrderBy>>;
};


export type RaceRaceDriverStandingsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RaceDriverStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceDriverStandingOrderBy>>;
};


export type RaceRaceResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RaceResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceResultOrderBy>>;
};


export type RaceRaceTeamStandingsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RaceTeamStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceTeamStandingOrderBy>>;
};


export type RaceSprintQualifyingResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SprintQualifyingResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintQualifyingResultOrderBy>>;
};


export type RaceSprintRaceResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SprintRaceResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintRaceResultOrderBy>>;
};


export type RaceSprintStartingGridPositionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SprintStartingGridPositionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintStartingGridPositionOrderBy>>;
};


export type RaceStartingGridPositionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<StartingGridPositionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StartingGridPositionOrderBy>>;
};

/** A condition to be used against `Race` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type RaceCondition = {
  /** Checks for equality with the object’s `circuitId` field. */
  circuitId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `circuitLayoutId` field. */
  circuitLayoutId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `circuitType` field. */
  circuitType?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `date` field. */
  date?: InputMaybe<Scalars['Date']['input']>;
  /** Checks for equality with the object’s `direction` field. */
  direction?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `grandPrixId` field. */
  grandPrixId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `officialName` field. */
  officialName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `qualifyingFormat` field. */
  qualifyingFormat?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `round` field. */
  round?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `sprintQualifyingFormat` field. */
  sprintQualifyingFormat?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `year` field. */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `Race` values. */
export type RaceConnection = {
  __typename?: 'RaceConnection';
  /** A list of edges which contains the `Race` and cursor to aid in pagination. */
  edges: Array<Maybe<RaceEdge>>;
  /** A list of `Race` objects. */
  nodes: Array<Maybe<Race>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Race` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

export type RaceDatum = Node & {
  __typename?: 'RaceDatum';
  /** Reads a single `Driver` that is related to this `RaceDatum`. */
  driver?: Maybe<Driver>;
  driverId: Scalars['String']['output'];
  driverNumber: Scalars['String']['output'];
  driverOfTheDayPercentage?: Maybe<Scalars['BigFloat']['output']>;
  /** Reads a single `EngineManufacturer` that is related to this `RaceDatum`. */
  engineManufacturer?: Maybe<EngineManufacturer>;
  engineManufacturerId: Scalars['String']['output'];
  fastestLapGap?: Maybe<Scalars['String']['output']>;
  fastestLapGapMillis?: Maybe<Scalars['Int']['output']>;
  fastestLapInterval?: Maybe<Scalars['String']['output']>;
  fastestLapIntervalMillis?: Maybe<Scalars['Int']['output']>;
  fastestLapLap?: Maybe<Scalars['Int']['output']>;
  fastestLapTime?: Maybe<Scalars['String']['output']>;
  fastestLapTimeMillis?: Maybe<Scalars['Int']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  pitStopLap?: Maybe<Scalars['Int']['output']>;
  pitStopStop?: Maybe<Scalars['Int']['output']>;
  pitStopTime?: Maybe<Scalars['String']['output']>;
  pitStopTimeMillis?: Maybe<Scalars['Int']['output']>;
  positionDisplayOrder: Scalars['Int']['output'];
  positionNumber?: Maybe<Scalars['Int']['output']>;
  positionText: Scalars['String']['output'];
  practiceGap?: Maybe<Scalars['String']['output']>;
  practiceGapMillis?: Maybe<Scalars['Int']['output']>;
  practiceInterval?: Maybe<Scalars['String']['output']>;
  practiceIntervalMillis?: Maybe<Scalars['Int']['output']>;
  practiceLaps?: Maybe<Scalars['Int']['output']>;
  practiceTime?: Maybe<Scalars['String']['output']>;
  practiceTimeMillis?: Maybe<Scalars['Int']['output']>;
  qualifyingGap?: Maybe<Scalars['String']['output']>;
  qualifyingGapMillis?: Maybe<Scalars['Int']['output']>;
  qualifyingInterval?: Maybe<Scalars['String']['output']>;
  qualifyingIntervalMillis?: Maybe<Scalars['Int']['output']>;
  qualifyingLaps?: Maybe<Scalars['Int']['output']>;
  qualifyingQ1?: Maybe<Scalars['String']['output']>;
  qualifyingQ1Millis?: Maybe<Scalars['Int']['output']>;
  qualifyingQ2?: Maybe<Scalars['String']['output']>;
  qualifyingQ2Millis?: Maybe<Scalars['Int']['output']>;
  qualifyingQ3?: Maybe<Scalars['String']['output']>;
  qualifyingQ3Millis?: Maybe<Scalars['Int']['output']>;
  qualifyingTime?: Maybe<Scalars['String']['output']>;
  qualifyingTimeMillis?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `Race` that is related to this `RaceDatum`. */
  race?: Maybe<Race>;
  raceDriverOfTheDay?: Maybe<Scalars['Boolean']['output']>;
  raceFastestLap?: Maybe<Scalars['Boolean']['output']>;
  raceGap?: Maybe<Scalars['String']['output']>;
  raceGapLaps?: Maybe<Scalars['Int']['output']>;
  raceGapMillis?: Maybe<Scalars['Int']['output']>;
  raceGrandSlam?: Maybe<Scalars['Boolean']['output']>;
  raceGridPositionNumber?: Maybe<Scalars['Int']['output']>;
  raceGridPositionText?: Maybe<Scalars['String']['output']>;
  raceId: Scalars['Int']['output'];
  raceInterval?: Maybe<Scalars['String']['output']>;
  raceIntervalMillis?: Maybe<Scalars['Int']['output']>;
  raceLaps?: Maybe<Scalars['Int']['output']>;
  racePitStops?: Maybe<Scalars['Int']['output']>;
  racePoints?: Maybe<Scalars['BigFloat']['output']>;
  racePolePosition?: Maybe<Scalars['Boolean']['output']>;
  racePositionsGained?: Maybe<Scalars['Int']['output']>;
  raceQualificationPositionNumber?: Maybe<Scalars['Int']['output']>;
  raceQualificationPositionText?: Maybe<Scalars['String']['output']>;
  raceReasonRetired?: Maybe<Scalars['String']['output']>;
  raceSharedCar?: Maybe<Scalars['Boolean']['output']>;
  raceTime?: Maybe<Scalars['String']['output']>;
  raceTimeMillis?: Maybe<Scalars['Int']['output']>;
  raceTimePenalty?: Maybe<Scalars['String']['output']>;
  raceTimePenaltyMillis?: Maybe<Scalars['Int']['output']>;
  startingGridPositionGridPenalty?: Maybe<Scalars['String']['output']>;
  startingGridPositionGridPenaltyPositions?: Maybe<Scalars['Int']['output']>;
  startingGridPositionQualificationPositionNumber?: Maybe<Scalars['Int']['output']>;
  startingGridPositionQualificationPositionText?: Maybe<Scalars['String']['output']>;
  startingGridPositionTime?: Maybe<Scalars['String']['output']>;
  startingGridPositionTimeMillis?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `Team` that is related to this `RaceDatum`. */
  team?: Maybe<Team>;
  teamId: Scalars['String']['output'];
  type: Scalars['String']['output'];
  /** Reads a single `TyreManufacturer` that is related to this `RaceDatum`. */
  tyreManufacturer?: Maybe<TyreManufacturer>;
  tyreManufacturerId: Scalars['String']['output'];
};

/**
 * A condition to be used against `RaceDatum` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type RaceDatumCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `driverNumber` field. */
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `engineManufacturerId` field. */
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `positionDisplayOrder` field. */
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionNumber` field. */
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionText` field. */
  positionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `tyreManufacturerId` field. */
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `RaceDatum` values. */
export type RaceDatumConnection = {
  __typename?: 'RaceDatumConnection';
  /** A list of edges which contains the `RaceDatum` and cursor to aid in pagination. */
  edges: Array<Maybe<RaceDatumEdge>>;
  /** A list of `RaceDatum` objects. */
  nodes: Array<Maybe<RaceDatum>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `RaceDatum` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `RaceDatum` edge in the connection. */
export type RaceDatumEdge = {
  __typename?: 'RaceDatumEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `RaceDatum` at the end of the edge. */
  node?: Maybe<RaceDatum>;
};

/** An input for mutations affecting `RaceDatum` */
export type RaceDatumInput = {
  driverId: Scalars['String']['input'];
  driverNumber: Scalars['String']['input'];
  driverOfTheDayPercentage?: InputMaybe<Scalars['BigFloat']['input']>;
  engineManufacturerId: Scalars['String']['input'];
  fastestLapGap?: InputMaybe<Scalars['String']['input']>;
  fastestLapGapMillis?: InputMaybe<Scalars['Int']['input']>;
  fastestLapInterval?: InputMaybe<Scalars['String']['input']>;
  fastestLapIntervalMillis?: InputMaybe<Scalars['Int']['input']>;
  fastestLapLap?: InputMaybe<Scalars['Int']['input']>;
  fastestLapTime?: InputMaybe<Scalars['String']['input']>;
  fastestLapTimeMillis?: InputMaybe<Scalars['Int']['input']>;
  pitStopLap?: InputMaybe<Scalars['Int']['input']>;
  pitStopStop?: InputMaybe<Scalars['Int']['input']>;
  pitStopTime?: InputMaybe<Scalars['String']['input']>;
  pitStopTimeMillis?: InputMaybe<Scalars['Int']['input']>;
  positionDisplayOrder: Scalars['Int']['input'];
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText: Scalars['String']['input'];
  practiceGap?: InputMaybe<Scalars['String']['input']>;
  practiceGapMillis?: InputMaybe<Scalars['Int']['input']>;
  practiceInterval?: InputMaybe<Scalars['String']['input']>;
  practiceIntervalMillis?: InputMaybe<Scalars['Int']['input']>;
  practiceLaps?: InputMaybe<Scalars['Int']['input']>;
  practiceTime?: InputMaybe<Scalars['String']['input']>;
  practiceTimeMillis?: InputMaybe<Scalars['Int']['input']>;
  qualifyingGap?: InputMaybe<Scalars['String']['input']>;
  qualifyingGapMillis?: InputMaybe<Scalars['Int']['input']>;
  qualifyingInterval?: InputMaybe<Scalars['String']['input']>;
  qualifyingIntervalMillis?: InputMaybe<Scalars['Int']['input']>;
  qualifyingLaps?: InputMaybe<Scalars['Int']['input']>;
  qualifyingQ1?: InputMaybe<Scalars['String']['input']>;
  qualifyingQ1Millis?: InputMaybe<Scalars['Int']['input']>;
  qualifyingQ2?: InputMaybe<Scalars['String']['input']>;
  qualifyingQ2Millis?: InputMaybe<Scalars['Int']['input']>;
  qualifyingQ3?: InputMaybe<Scalars['String']['input']>;
  qualifyingQ3Millis?: InputMaybe<Scalars['Int']['input']>;
  qualifyingTime?: InputMaybe<Scalars['String']['input']>;
  qualifyingTimeMillis?: InputMaybe<Scalars['Int']['input']>;
  raceDriverOfTheDay?: InputMaybe<Scalars['Boolean']['input']>;
  raceFastestLap?: InputMaybe<Scalars['Boolean']['input']>;
  raceGap?: InputMaybe<Scalars['String']['input']>;
  raceGapLaps?: InputMaybe<Scalars['Int']['input']>;
  raceGapMillis?: InputMaybe<Scalars['Int']['input']>;
  raceGrandSlam?: InputMaybe<Scalars['Boolean']['input']>;
  raceGridPositionNumber?: InputMaybe<Scalars['Int']['input']>;
  raceGridPositionText?: InputMaybe<Scalars['String']['input']>;
  raceId: Scalars['Int']['input'];
  raceInterval?: InputMaybe<Scalars['String']['input']>;
  raceIntervalMillis?: InputMaybe<Scalars['Int']['input']>;
  raceLaps?: InputMaybe<Scalars['Int']['input']>;
  racePitStops?: InputMaybe<Scalars['Int']['input']>;
  racePoints?: InputMaybe<Scalars['BigFloat']['input']>;
  racePolePosition?: InputMaybe<Scalars['Boolean']['input']>;
  racePositionsGained?: InputMaybe<Scalars['Int']['input']>;
  raceQualificationPositionNumber?: InputMaybe<Scalars['Int']['input']>;
  raceQualificationPositionText?: InputMaybe<Scalars['String']['input']>;
  raceReasonRetired?: InputMaybe<Scalars['String']['input']>;
  raceSharedCar?: InputMaybe<Scalars['Boolean']['input']>;
  raceTime?: InputMaybe<Scalars['String']['input']>;
  raceTimeMillis?: InputMaybe<Scalars['Int']['input']>;
  raceTimePenalty?: InputMaybe<Scalars['String']['input']>;
  raceTimePenaltyMillis?: InputMaybe<Scalars['Int']['input']>;
  startingGridPositionGridPenalty?: InputMaybe<Scalars['String']['input']>;
  startingGridPositionGridPenaltyPositions?: InputMaybe<Scalars['Int']['input']>;
  startingGridPositionQualificationPositionNumber?: InputMaybe<Scalars['Int']['input']>;
  startingGridPositionQualificationPositionText?: InputMaybe<Scalars['String']['input']>;
  startingGridPositionTime?: InputMaybe<Scalars['String']['input']>;
  startingGridPositionTimeMillis?: InputMaybe<Scalars['Int']['input']>;
  teamId: Scalars['String']['input'];
  type: Scalars['String']['input'];
  tyreManufacturerId: Scalars['String']['input'];
};

/** Methods to use when ordering `RaceDatum`. */
export enum RaceDatumOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  DriverNumberAsc = 'DRIVER_NUMBER_ASC',
  DriverNumberDesc = 'DRIVER_NUMBER_DESC',
  EngineManufacturerIdAsc = 'ENGINE_MANUFACTURER_ID_ASC',
  EngineManufacturerIdDesc = 'ENGINE_MANUFACTURER_ID_DESC',
  Natural = 'NATURAL',
  PositionDisplayOrderAsc = 'POSITION_DISPLAY_ORDER_ASC',
  PositionDisplayOrderDesc = 'POSITION_DISPLAY_ORDER_DESC',
  PositionNumberAsc = 'POSITION_NUMBER_ASC',
  PositionNumberDesc = 'POSITION_NUMBER_DESC',
  PositionTextAsc = 'POSITION_TEXT_ASC',
  PositionTextDesc = 'POSITION_TEXT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  TyreManufacturerIdAsc = 'TYRE_MANUFACTURER_ID_ASC',
  TyreManufacturerIdDesc = 'TYRE_MANUFACTURER_ID_DESC'
}

/** Represents an update to a `RaceDatum`. Fields that are set will be updated. */
export type RaceDatumPatch = {
  driverId?: InputMaybe<Scalars['String']['input']>;
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  driverOfTheDayPercentage?: InputMaybe<Scalars['BigFloat']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  fastestLapGap?: InputMaybe<Scalars['String']['input']>;
  fastestLapGapMillis?: InputMaybe<Scalars['Int']['input']>;
  fastestLapInterval?: InputMaybe<Scalars['String']['input']>;
  fastestLapIntervalMillis?: InputMaybe<Scalars['Int']['input']>;
  fastestLapLap?: InputMaybe<Scalars['Int']['input']>;
  fastestLapTime?: InputMaybe<Scalars['String']['input']>;
  fastestLapTimeMillis?: InputMaybe<Scalars['Int']['input']>;
  pitStopLap?: InputMaybe<Scalars['Int']['input']>;
  pitStopStop?: InputMaybe<Scalars['Int']['input']>;
  pitStopTime?: InputMaybe<Scalars['String']['input']>;
  pitStopTimeMillis?: InputMaybe<Scalars['Int']['input']>;
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  practiceGap?: InputMaybe<Scalars['String']['input']>;
  practiceGapMillis?: InputMaybe<Scalars['Int']['input']>;
  practiceInterval?: InputMaybe<Scalars['String']['input']>;
  practiceIntervalMillis?: InputMaybe<Scalars['Int']['input']>;
  practiceLaps?: InputMaybe<Scalars['Int']['input']>;
  practiceTime?: InputMaybe<Scalars['String']['input']>;
  practiceTimeMillis?: InputMaybe<Scalars['Int']['input']>;
  qualifyingGap?: InputMaybe<Scalars['String']['input']>;
  qualifyingGapMillis?: InputMaybe<Scalars['Int']['input']>;
  qualifyingInterval?: InputMaybe<Scalars['String']['input']>;
  qualifyingIntervalMillis?: InputMaybe<Scalars['Int']['input']>;
  qualifyingLaps?: InputMaybe<Scalars['Int']['input']>;
  qualifyingQ1?: InputMaybe<Scalars['String']['input']>;
  qualifyingQ1Millis?: InputMaybe<Scalars['Int']['input']>;
  qualifyingQ2?: InputMaybe<Scalars['String']['input']>;
  qualifyingQ2Millis?: InputMaybe<Scalars['Int']['input']>;
  qualifyingQ3?: InputMaybe<Scalars['String']['input']>;
  qualifyingQ3Millis?: InputMaybe<Scalars['Int']['input']>;
  qualifyingTime?: InputMaybe<Scalars['String']['input']>;
  qualifyingTimeMillis?: InputMaybe<Scalars['Int']['input']>;
  raceDriverOfTheDay?: InputMaybe<Scalars['Boolean']['input']>;
  raceFastestLap?: InputMaybe<Scalars['Boolean']['input']>;
  raceGap?: InputMaybe<Scalars['String']['input']>;
  raceGapLaps?: InputMaybe<Scalars['Int']['input']>;
  raceGapMillis?: InputMaybe<Scalars['Int']['input']>;
  raceGrandSlam?: InputMaybe<Scalars['Boolean']['input']>;
  raceGridPositionNumber?: InputMaybe<Scalars['Int']['input']>;
  raceGridPositionText?: InputMaybe<Scalars['String']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  raceInterval?: InputMaybe<Scalars['String']['input']>;
  raceIntervalMillis?: InputMaybe<Scalars['Int']['input']>;
  raceLaps?: InputMaybe<Scalars['Int']['input']>;
  racePitStops?: InputMaybe<Scalars['Int']['input']>;
  racePoints?: InputMaybe<Scalars['BigFloat']['input']>;
  racePolePosition?: InputMaybe<Scalars['Boolean']['input']>;
  racePositionsGained?: InputMaybe<Scalars['Int']['input']>;
  raceQualificationPositionNumber?: InputMaybe<Scalars['Int']['input']>;
  raceQualificationPositionText?: InputMaybe<Scalars['String']['input']>;
  raceReasonRetired?: InputMaybe<Scalars['String']['input']>;
  raceSharedCar?: InputMaybe<Scalars['Boolean']['input']>;
  raceTime?: InputMaybe<Scalars['String']['input']>;
  raceTimeMillis?: InputMaybe<Scalars['Int']['input']>;
  raceTimePenalty?: InputMaybe<Scalars['String']['input']>;
  raceTimePenaltyMillis?: InputMaybe<Scalars['Int']['input']>;
  startingGridPositionGridPenalty?: InputMaybe<Scalars['String']['input']>;
  startingGridPositionGridPenaltyPositions?: InputMaybe<Scalars['Int']['input']>;
  startingGridPositionQualificationPositionNumber?: InputMaybe<Scalars['Int']['input']>;
  startingGridPositionQualificationPositionText?: InputMaybe<Scalars['String']['input']>;
  startingGridPositionTime?: InputMaybe<Scalars['String']['input']>;
  startingGridPositionTimeMillis?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

export type RaceDriverStanding = Node & {
  __typename?: 'RaceDriverStanding';
  championshipWon: Scalars['Boolean']['output'];
  /** Reads a single `Driver` that is related to this `RaceDriverStanding`. */
  driver?: Maybe<Driver>;
  driverId: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  points: Scalars['BigFloat']['output'];
  positionDisplayOrder: Scalars['Int']['output'];
  positionNumber?: Maybe<Scalars['Int']['output']>;
  positionText: Scalars['String']['output'];
  positionsGained?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `Race` that is related to this `RaceDriverStanding`. */
  race?: Maybe<Race>;
  raceId: Scalars['Int']['output'];
};

/**
 * A condition to be used against `RaceDriverStanding` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type RaceDriverStandingCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `positionDisplayOrder` field. */
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionNumber` field. */
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionText` field. */
  positionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `RaceDriverStanding` values. */
export type RaceDriverStandingConnection = {
  __typename?: 'RaceDriverStandingConnection';
  /** A list of edges which contains the `RaceDriverStanding` and cursor to aid in pagination. */
  edges: Array<Maybe<RaceDriverStandingEdge>>;
  /** A list of `RaceDriverStanding` objects. */
  nodes: Array<Maybe<RaceDriverStanding>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `RaceDriverStanding` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `RaceDriverStanding` edge in the connection. */
export type RaceDriverStandingEdge = {
  __typename?: 'RaceDriverStandingEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `RaceDriverStanding` at the end of the edge. */
  node?: Maybe<RaceDriverStanding>;
};

/** An input for mutations affecting `RaceDriverStanding` */
export type RaceDriverStandingInput = {
  championshipWon: Scalars['Boolean']['input'];
  driverId: Scalars['String']['input'];
  points: Scalars['BigFloat']['input'];
  positionDisplayOrder: Scalars['Int']['input'];
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText: Scalars['String']['input'];
  positionsGained?: InputMaybe<Scalars['Int']['input']>;
  raceId: Scalars['Int']['input'];
};

/** Methods to use when ordering `RaceDriverStanding`. */
export enum RaceDriverStandingOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  Natural = 'NATURAL',
  PositionDisplayOrderAsc = 'POSITION_DISPLAY_ORDER_ASC',
  PositionDisplayOrderDesc = 'POSITION_DISPLAY_ORDER_DESC',
  PositionNumberAsc = 'POSITION_NUMBER_ASC',
  PositionNumberDesc = 'POSITION_NUMBER_DESC',
  PositionTextAsc = 'POSITION_TEXT_ASC',
  PositionTextDesc = 'POSITION_TEXT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC'
}

/** Represents an update to a `RaceDriverStanding`. Fields that are set will be updated. */
export type RaceDriverStandingPatch = {
  championshipWon?: InputMaybe<Scalars['Boolean']['input']>;
  driverId?: InputMaybe<Scalars['String']['input']>;
  points?: InputMaybe<Scalars['BigFloat']['input']>;
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  positionsGained?: InputMaybe<Scalars['Int']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
};

/** A `Race` edge in the connection. */
export type RaceEdge = {
  __typename?: 'RaceEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Race` at the end of the edge. */
  node?: Maybe<Race>;
};

/** An input for mutations affecting `Race` */
export type RaceInput = {
  circuitId: Scalars['String']['input'];
  circuitLayoutId: Scalars['String']['input'];
  circuitType: Scalars['String']['input'];
  constructorsChampionshipDecider: Scalars['Boolean']['input'];
  courseLength: Scalars['BigFloat']['input'];
  date: Scalars['Date']['input'];
  direction: Scalars['String']['input'];
  distance: Scalars['BigFloat']['input'];
  driversChampionshipDecider: Scalars['Boolean']['input'];
  freePractice1Date?: InputMaybe<Scalars['Date']['input']>;
  freePractice1Time?: InputMaybe<Scalars['String']['input']>;
  freePractice2Date?: InputMaybe<Scalars['Date']['input']>;
  freePractice2Time?: InputMaybe<Scalars['String']['input']>;
  freePractice3Date?: InputMaybe<Scalars['Date']['input']>;
  freePractice3Time?: InputMaybe<Scalars['String']['input']>;
  freePractice4Date?: InputMaybe<Scalars['Date']['input']>;
  freePractice4Time?: InputMaybe<Scalars['String']['input']>;
  grandPrixId: Scalars['String']['input'];
  laps: Scalars['Int']['input'];
  officialName: Scalars['String']['input'];
  preQualifyingDate?: InputMaybe<Scalars['Date']['input']>;
  preQualifyingTime?: InputMaybe<Scalars['String']['input']>;
  qualifying1Date?: InputMaybe<Scalars['Date']['input']>;
  qualifying1Time?: InputMaybe<Scalars['String']['input']>;
  qualifying2Date?: InputMaybe<Scalars['Date']['input']>;
  qualifying2Time?: InputMaybe<Scalars['String']['input']>;
  qualifyingDate?: InputMaybe<Scalars['Date']['input']>;
  qualifyingFormat: Scalars['String']['input'];
  qualifyingTime?: InputMaybe<Scalars['String']['input']>;
  round: Scalars['Int']['input'];
  rowId: Scalars['Int']['input'];
  scheduledDistance?: InputMaybe<Scalars['BigFloat']['input']>;
  scheduledLaps?: InputMaybe<Scalars['Int']['input']>;
  sprintQualifyingDate?: InputMaybe<Scalars['Date']['input']>;
  sprintQualifyingFormat?: InputMaybe<Scalars['String']['input']>;
  sprintQualifyingTime?: InputMaybe<Scalars['String']['input']>;
  sprintRaceDate?: InputMaybe<Scalars['Date']['input']>;
  sprintRaceTime?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  turns: Scalars['Int']['input'];
  warmingUpDate?: InputMaybe<Scalars['Date']['input']>;
  warmingUpTime?: InputMaybe<Scalars['String']['input']>;
  year: Scalars['Int']['input'];
};

/** Methods to use when ordering `Race`. */
export enum RaceOrderBy {
  CircuitIdAsc = 'CIRCUIT_ID_ASC',
  CircuitIdDesc = 'CIRCUIT_ID_DESC',
  CircuitLayoutIdAsc = 'CIRCUIT_LAYOUT_ID_ASC',
  CircuitLayoutIdDesc = 'CIRCUIT_LAYOUT_ID_DESC',
  CircuitTypeAsc = 'CIRCUIT_TYPE_ASC',
  CircuitTypeDesc = 'CIRCUIT_TYPE_DESC',
  DateAsc = 'DATE_ASC',
  DateDesc = 'DATE_DESC',
  DirectionAsc = 'DIRECTION_ASC',
  DirectionDesc = 'DIRECTION_DESC',
  GrandPrixIdAsc = 'GRAND_PRIX_ID_ASC',
  GrandPrixIdDesc = 'GRAND_PRIX_ID_DESC',
  Natural = 'NATURAL',
  OfficialNameAsc = 'OFFICIAL_NAME_ASC',
  OfficialNameDesc = 'OFFICIAL_NAME_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  QualifyingFormatAsc = 'QUALIFYING_FORMAT_ASC',
  QualifyingFormatDesc = 'QUALIFYING_FORMAT_DESC',
  RoundAsc = 'ROUND_ASC',
  RoundDesc = 'ROUND_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  SprintQualifyingFormatAsc = 'SPRINT_QUALIFYING_FORMAT_ASC',
  SprintQualifyingFormatDesc = 'SPRINT_QUALIFYING_FORMAT_DESC',
  YearAsc = 'YEAR_ASC',
  YearDesc = 'YEAR_DESC'
}

/** Represents an update to a `Race`. Fields that are set will be updated. */
export type RacePatch = {
  circuitId?: InputMaybe<Scalars['String']['input']>;
  circuitLayoutId?: InputMaybe<Scalars['String']['input']>;
  circuitType?: InputMaybe<Scalars['String']['input']>;
  constructorsChampionshipDecider?: InputMaybe<Scalars['Boolean']['input']>;
  courseLength?: InputMaybe<Scalars['BigFloat']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  distance?: InputMaybe<Scalars['BigFloat']['input']>;
  driversChampionshipDecider?: InputMaybe<Scalars['Boolean']['input']>;
  freePractice1Date?: InputMaybe<Scalars['Date']['input']>;
  freePractice1Time?: InputMaybe<Scalars['String']['input']>;
  freePractice2Date?: InputMaybe<Scalars['Date']['input']>;
  freePractice2Time?: InputMaybe<Scalars['String']['input']>;
  freePractice3Date?: InputMaybe<Scalars['Date']['input']>;
  freePractice3Time?: InputMaybe<Scalars['String']['input']>;
  freePractice4Date?: InputMaybe<Scalars['Date']['input']>;
  freePractice4Time?: InputMaybe<Scalars['String']['input']>;
  grandPrixId?: InputMaybe<Scalars['String']['input']>;
  laps?: InputMaybe<Scalars['Int']['input']>;
  officialName?: InputMaybe<Scalars['String']['input']>;
  preQualifyingDate?: InputMaybe<Scalars['Date']['input']>;
  preQualifyingTime?: InputMaybe<Scalars['String']['input']>;
  qualifying1Date?: InputMaybe<Scalars['Date']['input']>;
  qualifying1Time?: InputMaybe<Scalars['String']['input']>;
  qualifying2Date?: InputMaybe<Scalars['Date']['input']>;
  qualifying2Time?: InputMaybe<Scalars['String']['input']>;
  qualifyingDate?: InputMaybe<Scalars['Date']['input']>;
  qualifyingFormat?: InputMaybe<Scalars['String']['input']>;
  qualifyingTime?: InputMaybe<Scalars['String']['input']>;
  round?: InputMaybe<Scalars['Int']['input']>;
  rowId?: InputMaybe<Scalars['Int']['input']>;
  scheduledDistance?: InputMaybe<Scalars['BigFloat']['input']>;
  scheduledLaps?: InputMaybe<Scalars['Int']['input']>;
  sprintQualifyingDate?: InputMaybe<Scalars['Date']['input']>;
  sprintQualifyingFormat?: InputMaybe<Scalars['String']['input']>;
  sprintQualifyingTime?: InputMaybe<Scalars['String']['input']>;
  sprintRaceDate?: InputMaybe<Scalars['Date']['input']>;
  sprintRaceTime?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  turns?: InputMaybe<Scalars['Int']['input']>;
  warmingUpDate?: InputMaybe<Scalars['Date']['input']>;
  warmingUpTime?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type RaceResult = Node & {
  __typename?: 'RaceResult';
  /** Reads a single `Driver` that is related to this `RaceResult`. */
  driver?: Maybe<Driver>;
  driverId?: Maybe<Scalars['String']['output']>;
  driverNumber?: Maybe<Scalars['String']['output']>;
  driverOfTheDay?: Maybe<Scalars['Boolean']['output']>;
  engineManufacturerId?: Maybe<Scalars['String']['output']>;
  fastestLap?: Maybe<Scalars['Boolean']['output']>;
  gap?: Maybe<Scalars['String']['output']>;
  gapLaps?: Maybe<Scalars['Int']['output']>;
  gapMillis?: Maybe<Scalars['Int']['output']>;
  grandSlam?: Maybe<Scalars['Boolean']['output']>;
  gridPositionNumber?: Maybe<Scalars['Int']['output']>;
  gridPositionText?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  interval?: Maybe<Scalars['String']['output']>;
  intervalMillis?: Maybe<Scalars['Int']['output']>;
  laps?: Maybe<Scalars['Int']['output']>;
  pitStops?: Maybe<Scalars['Int']['output']>;
  points?: Maybe<Scalars['BigFloat']['output']>;
  polePosition?: Maybe<Scalars['Boolean']['output']>;
  positionDisplayOrder: Scalars['Int']['output'];
  positionNumber?: Maybe<Scalars['Int']['output']>;
  positionText?: Maybe<Scalars['String']['output']>;
  positionsGained?: Maybe<Scalars['Int']['output']>;
  qualificationPositionNumber?: Maybe<Scalars['Int']['output']>;
  qualificationPositionText?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Race` that is related to this `RaceResult`. */
  race?: Maybe<Race>;
  raceId: Scalars['Int']['output'];
  reasonRetired?: Maybe<Scalars['String']['output']>;
  sharedCar?: Maybe<Scalars['Boolean']['output']>;
  /** Reads a single `Team` that is related to this `RaceResult`. */
  team?: Maybe<Team>;
  teamId?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
  timeMillis?: Maybe<Scalars['Int']['output']>;
  timePenalty?: Maybe<Scalars['String']['output']>;
  timePenaltyMillis?: Maybe<Scalars['Int']['output']>;
  tyreManufacturerId?: Maybe<Scalars['String']['output']>;
};

/**
 * A condition to be used against `RaceResult` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type RaceResultCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `driverNumber` field. */
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `driverOfTheDay` field. */
  driverOfTheDay?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `engineManufacturerId` field. */
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `fastestLap` field. */
  fastestLap?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `gap` field. */
  gap?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gapLaps` field. */
  gapLaps?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `gapMillis` field. */
  gapMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `grandSlam` field. */
  grandSlam?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `gridPositionNumber` field. */
  gridPositionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `gridPositionText` field. */
  gridPositionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `interval` field. */
  interval?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `intervalMillis` field. */
  intervalMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `laps` field. */
  laps?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `pitStops` field. */
  pitStops?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `points` field. */
  points?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Checks for equality with the object’s `polePosition` field. */
  polePosition?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `positionDisplayOrder` field. */
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionNumber` field. */
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionText` field. */
  positionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `positionsGained` field. */
  positionsGained?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `qualificationPositionNumber` field. */
  qualificationPositionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `qualificationPositionText` field. */
  qualificationPositionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `reasonRetired` field. */
  reasonRetired?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `sharedCar` field. */
  sharedCar?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `time` field. */
  time?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `timeMillis` field. */
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `timePenalty` field. */
  timePenalty?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `timePenaltyMillis` field. */
  timePenaltyMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `tyreManufacturerId` field. */
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `RaceResult` values. */
export type RaceResultConnection = {
  __typename?: 'RaceResultConnection';
  /** A list of edges which contains the `RaceResult` and cursor to aid in pagination. */
  edges: Array<Maybe<RaceResultEdge>>;
  /** A list of `RaceResult` objects. */
  nodes: Array<Maybe<RaceResult>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `RaceResult` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `RaceResult` edge in the connection. */
export type RaceResultEdge = {
  __typename?: 'RaceResultEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `RaceResult` at the end of the edge. */
  node?: Maybe<RaceResult>;
};

/** An input for mutations affecting `RaceResult` */
export type RaceResultInput = {
  driverId?: InputMaybe<Scalars['String']['input']>;
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  driverOfTheDay?: InputMaybe<Scalars['Boolean']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  fastestLap?: InputMaybe<Scalars['Boolean']['input']>;
  gap?: InputMaybe<Scalars['String']['input']>;
  gapLaps?: InputMaybe<Scalars['Int']['input']>;
  gapMillis?: InputMaybe<Scalars['Int']['input']>;
  grandSlam?: InputMaybe<Scalars['Boolean']['input']>;
  gridPositionNumber?: InputMaybe<Scalars['Int']['input']>;
  gridPositionText?: InputMaybe<Scalars['String']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  intervalMillis?: InputMaybe<Scalars['Int']['input']>;
  laps?: InputMaybe<Scalars['Int']['input']>;
  pitStops?: InputMaybe<Scalars['Int']['input']>;
  points?: InputMaybe<Scalars['BigFloat']['input']>;
  polePosition?: InputMaybe<Scalars['Boolean']['input']>;
  positionDisplayOrder: Scalars['Int']['input'];
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  positionsGained?: InputMaybe<Scalars['Int']['input']>;
  qualificationPositionNumber?: InputMaybe<Scalars['Int']['input']>;
  qualificationPositionText?: InputMaybe<Scalars['String']['input']>;
  raceId: Scalars['Int']['input'];
  reasonRetired?: InputMaybe<Scalars['String']['input']>;
  sharedCar?: InputMaybe<Scalars['Boolean']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  timePenalty?: InputMaybe<Scalars['String']['input']>;
  timePenaltyMillis?: InputMaybe<Scalars['Int']['input']>;
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `RaceResult`. */
export enum RaceResultOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  DriverNumberAsc = 'DRIVER_NUMBER_ASC',
  DriverNumberDesc = 'DRIVER_NUMBER_DESC',
  DriverOfTheDayAsc = 'DRIVER_OF_THE_DAY_ASC',
  DriverOfTheDayDesc = 'DRIVER_OF_THE_DAY_DESC',
  EngineManufacturerIdAsc = 'ENGINE_MANUFACTURER_ID_ASC',
  EngineManufacturerIdDesc = 'ENGINE_MANUFACTURER_ID_DESC',
  FastestLapAsc = 'FASTEST_LAP_ASC',
  FastestLapDesc = 'FASTEST_LAP_DESC',
  GapAsc = 'GAP_ASC',
  GapDesc = 'GAP_DESC',
  GapLapsAsc = 'GAP_LAPS_ASC',
  GapLapsDesc = 'GAP_LAPS_DESC',
  GapMillisAsc = 'GAP_MILLIS_ASC',
  GapMillisDesc = 'GAP_MILLIS_DESC',
  GrandSlamAsc = 'GRAND_SLAM_ASC',
  GrandSlamDesc = 'GRAND_SLAM_DESC',
  GridPositionNumberAsc = 'GRID_POSITION_NUMBER_ASC',
  GridPositionNumberDesc = 'GRID_POSITION_NUMBER_DESC',
  GridPositionTextAsc = 'GRID_POSITION_TEXT_ASC',
  GridPositionTextDesc = 'GRID_POSITION_TEXT_DESC',
  IntervalAsc = 'INTERVAL_ASC',
  IntervalDesc = 'INTERVAL_DESC',
  IntervalMillisAsc = 'INTERVAL_MILLIS_ASC',
  IntervalMillisDesc = 'INTERVAL_MILLIS_DESC',
  LapsAsc = 'LAPS_ASC',
  LapsDesc = 'LAPS_DESC',
  Natural = 'NATURAL',
  PitStopsAsc = 'PIT_STOPS_ASC',
  PitStopsDesc = 'PIT_STOPS_DESC',
  PointsAsc = 'POINTS_ASC',
  PointsDesc = 'POINTS_DESC',
  PolePositionAsc = 'POLE_POSITION_ASC',
  PolePositionDesc = 'POLE_POSITION_DESC',
  PositionsGainedAsc = 'POSITIONS_GAINED_ASC',
  PositionsGainedDesc = 'POSITIONS_GAINED_DESC',
  PositionDisplayOrderAsc = 'POSITION_DISPLAY_ORDER_ASC',
  PositionDisplayOrderDesc = 'POSITION_DISPLAY_ORDER_DESC',
  PositionNumberAsc = 'POSITION_NUMBER_ASC',
  PositionNumberDesc = 'POSITION_NUMBER_DESC',
  PositionTextAsc = 'POSITION_TEXT_ASC',
  PositionTextDesc = 'POSITION_TEXT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  QualificationPositionNumberAsc = 'QUALIFICATION_POSITION_NUMBER_ASC',
  QualificationPositionNumberDesc = 'QUALIFICATION_POSITION_NUMBER_DESC',
  QualificationPositionTextAsc = 'QUALIFICATION_POSITION_TEXT_ASC',
  QualificationPositionTextDesc = 'QUALIFICATION_POSITION_TEXT_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC',
  ReasonRetiredAsc = 'REASON_RETIRED_ASC',
  ReasonRetiredDesc = 'REASON_RETIRED_DESC',
  SharedCarAsc = 'SHARED_CAR_ASC',
  SharedCarDesc = 'SHARED_CAR_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  TimeAsc = 'TIME_ASC',
  TimeDesc = 'TIME_DESC',
  TimeMillisAsc = 'TIME_MILLIS_ASC',
  TimeMillisDesc = 'TIME_MILLIS_DESC',
  TimePenaltyAsc = 'TIME_PENALTY_ASC',
  TimePenaltyDesc = 'TIME_PENALTY_DESC',
  TimePenaltyMillisAsc = 'TIME_PENALTY_MILLIS_ASC',
  TimePenaltyMillisDesc = 'TIME_PENALTY_MILLIS_DESC',
  TyreManufacturerIdAsc = 'TYRE_MANUFACTURER_ID_ASC',
  TyreManufacturerIdDesc = 'TYRE_MANUFACTURER_ID_DESC'
}

/** Represents an update to a `RaceResult`. Fields that are set will be updated. */
export type RaceResultPatch = {
  driverId?: InputMaybe<Scalars['String']['input']>;
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  driverOfTheDay?: InputMaybe<Scalars['Boolean']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  fastestLap?: InputMaybe<Scalars['Boolean']['input']>;
  gap?: InputMaybe<Scalars['String']['input']>;
  gapLaps?: InputMaybe<Scalars['Int']['input']>;
  gapMillis?: InputMaybe<Scalars['Int']['input']>;
  grandSlam?: InputMaybe<Scalars['Boolean']['input']>;
  gridPositionNumber?: InputMaybe<Scalars['Int']['input']>;
  gridPositionText?: InputMaybe<Scalars['String']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  intervalMillis?: InputMaybe<Scalars['Int']['input']>;
  laps?: InputMaybe<Scalars['Int']['input']>;
  pitStops?: InputMaybe<Scalars['Int']['input']>;
  points?: InputMaybe<Scalars['BigFloat']['input']>;
  polePosition?: InputMaybe<Scalars['Boolean']['input']>;
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  positionsGained?: InputMaybe<Scalars['Int']['input']>;
  qualificationPositionNumber?: InputMaybe<Scalars['Int']['input']>;
  qualificationPositionText?: InputMaybe<Scalars['String']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  reasonRetired?: InputMaybe<Scalars['String']['input']>;
  sharedCar?: InputMaybe<Scalars['Boolean']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  timePenalty?: InputMaybe<Scalars['String']['input']>;
  timePenaltyMillis?: InputMaybe<Scalars['Int']['input']>;
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

export type RaceTeamStanding = Node & {
  __typename?: 'RaceTeamStanding';
  championshipWon: Scalars['Boolean']['output'];
  /** Reads a single `EngineManufacturer` that is related to this `RaceTeamStanding`. */
  engineManufacturer?: Maybe<EngineManufacturer>;
  engineManufacturerId: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  points: Scalars['BigFloat']['output'];
  positionDisplayOrder: Scalars['Int']['output'];
  positionNumber?: Maybe<Scalars['Int']['output']>;
  positionText: Scalars['String']['output'];
  positionsGained?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `Race` that is related to this `RaceTeamStanding`. */
  race?: Maybe<Race>;
  raceId: Scalars['Int']['output'];
  /** Reads a single `Team` that is related to this `RaceTeamStanding`. */
  team?: Maybe<Team>;
  teamId: Scalars['String']['output'];
};

/**
 * A condition to be used against `RaceTeamStanding` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type RaceTeamStandingCondition = {
  /** Checks for equality with the object’s `engineManufacturerId` field. */
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `positionDisplayOrder` field. */
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionNumber` field. */
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionText` field. */
  positionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `RaceTeamStanding` values. */
export type RaceTeamStandingConnection = {
  __typename?: 'RaceTeamStandingConnection';
  /** A list of edges which contains the `RaceTeamStanding` and cursor to aid in pagination. */
  edges: Array<Maybe<RaceTeamStandingEdge>>;
  /** A list of `RaceTeamStanding` objects. */
  nodes: Array<Maybe<RaceTeamStanding>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `RaceTeamStanding` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `RaceTeamStanding` edge in the connection. */
export type RaceTeamStandingEdge = {
  __typename?: 'RaceTeamStandingEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `RaceTeamStanding` at the end of the edge. */
  node?: Maybe<RaceTeamStanding>;
};

/** An input for mutations affecting `RaceTeamStanding` */
export type RaceTeamStandingInput = {
  championshipWon: Scalars['Boolean']['input'];
  engineManufacturerId: Scalars['String']['input'];
  points: Scalars['BigFloat']['input'];
  positionDisplayOrder: Scalars['Int']['input'];
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText: Scalars['String']['input'];
  positionsGained?: InputMaybe<Scalars['Int']['input']>;
  raceId: Scalars['Int']['input'];
  teamId: Scalars['String']['input'];
};

/** Methods to use when ordering `RaceTeamStanding`. */
export enum RaceTeamStandingOrderBy {
  EngineManufacturerIdAsc = 'ENGINE_MANUFACTURER_ID_ASC',
  EngineManufacturerIdDesc = 'ENGINE_MANUFACTURER_ID_DESC',
  Natural = 'NATURAL',
  PositionDisplayOrderAsc = 'POSITION_DISPLAY_ORDER_ASC',
  PositionDisplayOrderDesc = 'POSITION_DISPLAY_ORDER_DESC',
  PositionNumberAsc = 'POSITION_NUMBER_ASC',
  PositionNumberDesc = 'POSITION_NUMBER_DESC',
  PositionTextAsc = 'POSITION_TEXT_ASC',
  PositionTextDesc = 'POSITION_TEXT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC'
}

/** Represents an update to a `RaceTeamStanding`. Fields that are set will be updated. */
export type RaceTeamStandingPatch = {
  championshipWon?: InputMaybe<Scalars['Boolean']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  points?: InputMaybe<Scalars['BigFloat']['input']>;
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  positionsGained?: InputMaybe<Scalars['Int']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
};

export type Season = Node & {
  __typename?: 'Season';
  ended?: Maybe<Scalars['Boolean']['output']>;
  hasResults?: Maybe<Scalars['Boolean']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `Race`. */
  racesByYear: RaceConnection;
  /** Reads and enables pagination through a set of `SeasonDriverStanding`. */
  seasonDriverStandingsByYear: SeasonDriverStandingConnection;
  /** Reads and enables pagination through a set of `SeasonDriver`. */
  seasonDriversByYear: SeasonDriverConnection;
  /** Reads and enables pagination through a set of `SeasonEngineManufacturer`. */
  seasonEngineManufacturersByYear: SeasonEngineManufacturerConnection;
  /** Reads and enables pagination through a set of `SeasonEntrantChassis`. */
  seasonEntrantChassisByYear: SeasonEntrantChassisConnection;
  /** Reads and enables pagination through a set of `SeasonEntrantDriver`. */
  seasonEntrantDriversByYear: SeasonEntrantDriverConnection;
  /** Reads and enables pagination through a set of `SeasonEntrantEngine`. */
  seasonEntrantEnginesByYear: SeasonEntrantEngineConnection;
  /** Reads and enables pagination through a set of `SeasonEntrantTeam`. */
  seasonEntrantTeamsByYear: SeasonEntrantTeamConnection;
  /** Reads and enables pagination through a set of `SeasonEntrantTyreManufacturer`. */
  seasonEntrantTyreManufacturersByYear: SeasonEntrantTyreManufacturerConnection;
  /** Reads and enables pagination through a set of `SeasonEntrant`. */
  seasonEntrantsByYear: SeasonEntrantConnection;
  /** Reads and enables pagination through a set of `SeasonTeamStanding`. */
  seasonTeamStandingsByYear: SeasonTeamStandingConnection;
  /** Reads and enables pagination through a set of `SeasonTeam`. */
  seasonTeamsByYear: SeasonTeamConnection;
  /** Reads and enables pagination through a set of `SeasonTyreManufacturer`. */
  seasonTyreManufacturersByYear: SeasonTyreManufacturerConnection;
  year: Scalars['Int']['output'];
};


export type SeasonRacesByYearArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RaceCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceOrderBy>>;
};


export type SeasonSeasonDriverStandingsByYearArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonDriverStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonDriverStandingOrderBy>>;
};


export type SeasonSeasonDriversByYearArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonDriverCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonDriverOrderBy>>;
};


export type SeasonSeasonEngineManufacturersByYearArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEngineManufacturerCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEngineManufacturerOrderBy>>;
};


export type SeasonSeasonEntrantChassisByYearArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantChassisCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantChassisOrderBy>>;
};


export type SeasonSeasonEntrantDriversByYearArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantDriverCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantDriverOrderBy>>;
};


export type SeasonSeasonEntrantEnginesByYearArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantEngineCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantEngineOrderBy>>;
};


export type SeasonSeasonEntrantTeamsByYearArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantTeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantTeamOrderBy>>;
};


export type SeasonSeasonEntrantTyreManufacturersByYearArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantTyreManufacturerCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantTyreManufacturerOrderBy>>;
};


export type SeasonSeasonEntrantsByYearArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantOrderBy>>;
};


export type SeasonSeasonTeamStandingsByYearArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonTeamStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonTeamStandingOrderBy>>;
};


export type SeasonSeasonTeamsByYearArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonTeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonTeamOrderBy>>;
};


export type SeasonSeasonTyreManufacturersByYearArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonTyreManufacturerCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonTyreManufacturerOrderBy>>;
};

/** A condition to be used against `Season` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type SeasonCondition = {
  /** Checks for equality with the object’s `year` field. */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `Season` values. */
export type SeasonConnection = {
  __typename?: 'SeasonConnection';
  /** A list of edges which contains the `Season` and cursor to aid in pagination. */
  edges: Array<Maybe<SeasonEdge>>;
  /** A list of `Season` objects. */
  nodes: Array<Maybe<Season>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Season` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

export type SeasonDriver = Node & {
  __typename?: 'SeasonDriver';
  bestRaceResult?: Maybe<Scalars['Int']['output']>;
  bestSprintRaceResult?: Maybe<Scalars['Int']['output']>;
  bestStartingGridPosition?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `Driver` that is related to this `SeasonDriver`. */
  driver?: Maybe<Driver>;
  driverId: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  positionNumber?: Maybe<Scalars['Int']['output']>;
  positionText?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Season` that is related to this `SeasonDriver`. */
  season?: Maybe<Season>;
  totalDriverOfTheDay: Scalars['Int']['output'];
  totalFastestLaps: Scalars['Int']['output'];
  totalGrandSlams: Scalars['Int']['output'];
  totalPodiums: Scalars['Int']['output'];
  totalPoints: Scalars['BigFloat']['output'];
  totalPolePositions: Scalars['Int']['output'];
  totalRaceEntries: Scalars['Int']['output'];
  totalRaceLaps: Scalars['Int']['output'];
  totalRaceStarts: Scalars['Int']['output'];
  totalRaceWins: Scalars['Int']['output'];
  totalSprintRaceStarts: Scalars['Int']['output'];
  totalSprintRaceWins: Scalars['Int']['output'];
  year: Scalars['Int']['output'];
};

/**
 * A condition to be used against `SeasonDriver` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type SeasonDriverCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `year` field. */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `SeasonDriver` values. */
export type SeasonDriverConnection = {
  __typename?: 'SeasonDriverConnection';
  /** A list of edges which contains the `SeasonDriver` and cursor to aid in pagination. */
  edges: Array<Maybe<SeasonDriverEdge>>;
  /** A list of `SeasonDriver` objects. */
  nodes: Array<Maybe<SeasonDriver>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SeasonDriver` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `SeasonDriver` edge in the connection. */
export type SeasonDriverEdge = {
  __typename?: 'SeasonDriverEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `SeasonDriver` at the end of the edge. */
  node?: Maybe<SeasonDriver>;
};

/** An input for mutations affecting `SeasonDriver` */
export type SeasonDriverInput = {
  bestRaceResult?: InputMaybe<Scalars['Int']['input']>;
  bestSprintRaceResult?: InputMaybe<Scalars['Int']['input']>;
  bestStartingGridPosition?: InputMaybe<Scalars['Int']['input']>;
  driverId: Scalars['String']['input'];
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  totalDriverOfTheDay: Scalars['Int']['input'];
  totalFastestLaps: Scalars['Int']['input'];
  totalGrandSlams: Scalars['Int']['input'];
  totalPodiums: Scalars['Int']['input'];
  totalPoints: Scalars['BigFloat']['input'];
  totalPolePositions: Scalars['Int']['input'];
  totalRaceEntries: Scalars['Int']['input'];
  totalRaceLaps: Scalars['Int']['input'];
  totalRaceStarts: Scalars['Int']['input'];
  totalRaceWins: Scalars['Int']['input'];
  totalSprintRaceStarts: Scalars['Int']['input'];
  totalSprintRaceWins: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
};

/** Methods to use when ordering `SeasonDriver`. */
export enum SeasonDriverOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  YearAsc = 'YEAR_ASC',
  YearDesc = 'YEAR_DESC'
}

/** Represents an update to a `SeasonDriver`. Fields that are set will be updated. */
export type SeasonDriverPatch = {
  bestRaceResult?: InputMaybe<Scalars['Int']['input']>;
  bestSprintRaceResult?: InputMaybe<Scalars['Int']['input']>;
  bestStartingGridPosition?: InputMaybe<Scalars['Int']['input']>;
  driverId?: InputMaybe<Scalars['String']['input']>;
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  totalDriverOfTheDay?: InputMaybe<Scalars['Int']['input']>;
  totalFastestLaps?: InputMaybe<Scalars['Int']['input']>;
  totalGrandSlams?: InputMaybe<Scalars['Int']['input']>;
  totalPodiums?: InputMaybe<Scalars['Int']['input']>;
  totalPoints?: InputMaybe<Scalars['BigFloat']['input']>;
  totalPolePositions?: InputMaybe<Scalars['Int']['input']>;
  totalRaceEntries?: InputMaybe<Scalars['Int']['input']>;
  totalRaceLaps?: InputMaybe<Scalars['Int']['input']>;
  totalRaceStarts?: InputMaybe<Scalars['Int']['input']>;
  totalRaceWins?: InputMaybe<Scalars['Int']['input']>;
  totalSprintRaceStarts?: InputMaybe<Scalars['Int']['input']>;
  totalSprintRaceWins?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type SeasonDriverStanding = Node & {
  __typename?: 'SeasonDriverStanding';
  championshipWon: Scalars['Boolean']['output'];
  /** Reads a single `Driver` that is related to this `SeasonDriverStanding`. */
  driver?: Maybe<Driver>;
  driverId: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  points: Scalars['BigFloat']['output'];
  positionDisplayOrder: Scalars['Int']['output'];
  positionNumber?: Maybe<Scalars['Int']['output']>;
  positionText: Scalars['String']['output'];
  /** Reads a single `Season` that is related to this `SeasonDriverStanding`. */
  season?: Maybe<Season>;
  year: Scalars['Int']['output'];
};

/**
 * A condition to be used against `SeasonDriverStanding` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type SeasonDriverStandingCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `positionDisplayOrder` field. */
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionNumber` field. */
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionText` field. */
  positionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `year` field. */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `SeasonDriverStanding` values. */
export type SeasonDriverStandingConnection = {
  __typename?: 'SeasonDriverStandingConnection';
  /** A list of edges which contains the `SeasonDriverStanding` and cursor to aid in pagination. */
  edges: Array<Maybe<SeasonDriverStandingEdge>>;
  /** A list of `SeasonDriverStanding` objects. */
  nodes: Array<Maybe<SeasonDriverStanding>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SeasonDriverStanding` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `SeasonDriverStanding` edge in the connection. */
export type SeasonDriverStandingEdge = {
  __typename?: 'SeasonDriverStandingEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `SeasonDriverStanding` at the end of the edge. */
  node?: Maybe<SeasonDriverStanding>;
};

/** An input for mutations affecting `SeasonDriverStanding` */
export type SeasonDriverStandingInput = {
  championshipWon: Scalars['Boolean']['input'];
  driverId: Scalars['String']['input'];
  points: Scalars['BigFloat']['input'];
  positionDisplayOrder: Scalars['Int']['input'];
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

/** Methods to use when ordering `SeasonDriverStanding`. */
export enum SeasonDriverStandingOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  Natural = 'NATURAL',
  PositionDisplayOrderAsc = 'POSITION_DISPLAY_ORDER_ASC',
  PositionDisplayOrderDesc = 'POSITION_DISPLAY_ORDER_DESC',
  PositionNumberAsc = 'POSITION_NUMBER_ASC',
  PositionNumberDesc = 'POSITION_NUMBER_DESC',
  PositionTextAsc = 'POSITION_TEXT_ASC',
  PositionTextDesc = 'POSITION_TEXT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  YearAsc = 'YEAR_ASC',
  YearDesc = 'YEAR_DESC'
}

/** Represents an update to a `SeasonDriverStanding`. Fields that are set will be updated. */
export type SeasonDriverStandingPatch = {
  championshipWon?: InputMaybe<Scalars['Boolean']['input']>;
  driverId?: InputMaybe<Scalars['String']['input']>;
  points?: InputMaybe<Scalars['BigFloat']['input']>;
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** A `Season` edge in the connection. */
export type SeasonEdge = {
  __typename?: 'SeasonEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Season` at the end of the edge. */
  node?: Maybe<Season>;
};

export type SeasonEngineManufacturer = Node & {
  __typename?: 'SeasonEngineManufacturer';
  bestRaceResult?: Maybe<Scalars['Int']['output']>;
  bestSprintRaceResult?: Maybe<Scalars['Int']['output']>;
  bestStartingGridPosition?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `EngineManufacturer` that is related to this `SeasonEngineManufacturer`. */
  engineManufacturer?: Maybe<EngineManufacturer>;
  engineManufacturerId: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  positionNumber?: Maybe<Scalars['Int']['output']>;
  positionText?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Season` that is related to this `SeasonEngineManufacturer`. */
  season?: Maybe<Season>;
  totalFastestLaps: Scalars['Int']['output'];
  totalPodiumRaces: Scalars['Int']['output'];
  totalPodiums: Scalars['Int']['output'];
  totalPoints: Scalars['BigFloat']['output'];
  totalPolePositions: Scalars['Int']['output'];
  totalRaceEntries: Scalars['Int']['output'];
  totalRaceLaps: Scalars['Int']['output'];
  totalRaceStarts: Scalars['Int']['output'];
  totalRaceWins: Scalars['Int']['output'];
  totalSprintRaceStarts: Scalars['Int']['output'];
  totalSprintRaceWins: Scalars['Int']['output'];
  year: Scalars['Int']['output'];
};

/**
 * A condition to be used against `SeasonEngineManufacturer` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type SeasonEngineManufacturerCondition = {
  /** Checks for equality with the object’s `engineManufacturerId` field. */
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `year` field. */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `SeasonEngineManufacturer` values. */
export type SeasonEngineManufacturerConnection = {
  __typename?: 'SeasonEngineManufacturerConnection';
  /** A list of edges which contains the `SeasonEngineManufacturer` and cursor to aid in pagination. */
  edges: Array<Maybe<SeasonEngineManufacturerEdge>>;
  /** A list of `SeasonEngineManufacturer` objects. */
  nodes: Array<Maybe<SeasonEngineManufacturer>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SeasonEngineManufacturer` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `SeasonEngineManufacturer` edge in the connection. */
export type SeasonEngineManufacturerEdge = {
  __typename?: 'SeasonEngineManufacturerEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `SeasonEngineManufacturer` at the end of the edge. */
  node?: Maybe<SeasonEngineManufacturer>;
};

/** An input for mutations affecting `SeasonEngineManufacturer` */
export type SeasonEngineManufacturerInput = {
  bestRaceResult?: InputMaybe<Scalars['Int']['input']>;
  bestSprintRaceResult?: InputMaybe<Scalars['Int']['input']>;
  bestStartingGridPosition?: InputMaybe<Scalars['Int']['input']>;
  engineManufacturerId: Scalars['String']['input'];
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  totalFastestLaps: Scalars['Int']['input'];
  totalPodiumRaces: Scalars['Int']['input'];
  totalPodiums: Scalars['Int']['input'];
  totalPoints: Scalars['BigFloat']['input'];
  totalPolePositions: Scalars['Int']['input'];
  totalRaceEntries: Scalars['Int']['input'];
  totalRaceLaps: Scalars['Int']['input'];
  totalRaceStarts: Scalars['Int']['input'];
  totalRaceWins: Scalars['Int']['input'];
  totalSprintRaceStarts: Scalars['Int']['input'];
  totalSprintRaceWins: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
};

/** Methods to use when ordering `SeasonEngineManufacturer`. */
export enum SeasonEngineManufacturerOrderBy {
  EngineManufacturerIdAsc = 'ENGINE_MANUFACTURER_ID_ASC',
  EngineManufacturerIdDesc = 'ENGINE_MANUFACTURER_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  YearAsc = 'YEAR_ASC',
  YearDesc = 'YEAR_DESC'
}

/** Represents an update to a `SeasonEngineManufacturer`. Fields that are set will be updated. */
export type SeasonEngineManufacturerPatch = {
  bestRaceResult?: InputMaybe<Scalars['Int']['input']>;
  bestSprintRaceResult?: InputMaybe<Scalars['Int']['input']>;
  bestStartingGridPosition?: InputMaybe<Scalars['Int']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  totalFastestLaps?: InputMaybe<Scalars['Int']['input']>;
  totalPodiumRaces?: InputMaybe<Scalars['Int']['input']>;
  totalPodiums?: InputMaybe<Scalars['Int']['input']>;
  totalPoints?: InputMaybe<Scalars['BigFloat']['input']>;
  totalPolePositions?: InputMaybe<Scalars['Int']['input']>;
  totalRaceEntries?: InputMaybe<Scalars['Int']['input']>;
  totalRaceLaps?: InputMaybe<Scalars['Int']['input']>;
  totalRaceStarts?: InputMaybe<Scalars['Int']['input']>;
  totalRaceWins?: InputMaybe<Scalars['Int']['input']>;
  totalSprintRaceStarts?: InputMaybe<Scalars['Int']['input']>;
  totalSprintRaceWins?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type SeasonEntrant = Node & {
  __typename?: 'SeasonEntrant';
  /** Reads a single `Country` that is related to this `SeasonEntrant`. */
  country?: Maybe<Country>;
  countryId: Scalars['String']['output'];
  /** Reads a single `Entrant` that is related to this `SeasonEntrant`. */
  entrant?: Maybe<Entrant>;
  entrantId: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `Season` that is related to this `SeasonEntrant`. */
  season?: Maybe<Season>;
  year: Scalars['Int']['output'];
};

export type SeasonEntrantChassis = Node & {
  __typename?: 'SeasonEntrantChassis';
  /** Reads a single `Chassis` that is related to this `SeasonEntrantChassis`. */
  chassis?: Maybe<Chassis>;
  chassisId: Scalars['String']['output'];
  /** Reads a single `EngineManufacturer` that is related to this `SeasonEntrantChassis`. */
  engineManufacturer?: Maybe<EngineManufacturer>;
  engineManufacturerId: Scalars['String']['output'];
  /** Reads a single `Entrant` that is related to this `SeasonEntrantChassis`. */
  entrant?: Maybe<Entrant>;
  entrantId: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `Season` that is related to this `SeasonEntrantChassis`. */
  season?: Maybe<Season>;
  /** Reads a single `Team` that is related to this `SeasonEntrantChassis`. */
  team?: Maybe<Team>;
  teamId: Scalars['String']['output'];
  year: Scalars['Int']['output'];
};

/**
 * A condition to be used against `SeasonEntrantChassis` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type SeasonEntrantChassisCondition = {
  /** Checks for equality with the object’s `chassisId` field. */
  chassisId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `engineManufacturerId` field. */
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `entrantId` field. */
  entrantId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `year` field. */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `SeasonEntrantChassis` values. */
export type SeasonEntrantChassisConnection = {
  __typename?: 'SeasonEntrantChassisConnection';
  /** A list of edges which contains the `SeasonEntrantChassis` and cursor to aid in pagination. */
  edges: Array<Maybe<SeasonEntrantChassisEdge>>;
  /** A list of `SeasonEntrantChassis` objects. */
  nodes: Array<Maybe<SeasonEntrantChassis>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SeasonEntrantChassis` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `SeasonEntrantChassis` edge in the connection. */
export type SeasonEntrantChassisEdge = {
  __typename?: 'SeasonEntrantChassisEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `SeasonEntrantChassis` at the end of the edge. */
  node?: Maybe<SeasonEntrantChassis>;
};

/** An input for mutations affecting `SeasonEntrantChassis` */
export type SeasonEntrantChassisInput = {
  chassisId: Scalars['String']['input'];
  engineManufacturerId: Scalars['String']['input'];
  entrantId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

/** Methods to use when ordering `SeasonEntrantChassis`. */
export enum SeasonEntrantChassisOrderBy {
  ChassisIdAsc = 'CHASSIS_ID_ASC',
  ChassisIdDesc = 'CHASSIS_ID_DESC',
  EngineManufacturerIdAsc = 'ENGINE_MANUFACTURER_ID_ASC',
  EngineManufacturerIdDesc = 'ENGINE_MANUFACTURER_ID_DESC',
  EntrantIdAsc = 'ENTRANT_ID_ASC',
  EntrantIdDesc = 'ENTRANT_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  YearAsc = 'YEAR_ASC',
  YearDesc = 'YEAR_DESC'
}

/** Represents an update to a `SeasonEntrantChassis`. Fields that are set will be updated. */
export type SeasonEntrantChassisPatch = {
  chassisId?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  entrantId?: InputMaybe<Scalars['String']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/**
 * A condition to be used against `SeasonEntrant` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type SeasonEntrantCondition = {
  /** Checks for equality with the object’s `countryId` field. */
  countryId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `entrantId` field. */
  entrantId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `year` field. */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `SeasonEntrant` values. */
export type SeasonEntrantConnection = {
  __typename?: 'SeasonEntrantConnection';
  /** A list of edges which contains the `SeasonEntrant` and cursor to aid in pagination. */
  edges: Array<Maybe<SeasonEntrantEdge>>;
  /** A list of `SeasonEntrant` objects. */
  nodes: Array<Maybe<SeasonEntrant>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SeasonEntrant` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

export type SeasonEntrantDriver = Node & {
  __typename?: 'SeasonEntrantDriver';
  /** Reads a single `Driver` that is related to this `SeasonEntrantDriver`. */
  driver?: Maybe<Driver>;
  driverId: Scalars['String']['output'];
  /** Reads a single `EngineManufacturer` that is related to this `SeasonEntrantDriver`. */
  engineManufacturer?: Maybe<EngineManufacturer>;
  engineManufacturerId: Scalars['String']['output'];
  /** Reads a single `Entrant` that is related to this `SeasonEntrantDriver`. */
  entrant?: Maybe<Entrant>;
  entrantId: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  rounds?: Maybe<Scalars['String']['output']>;
  roundsText?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Season` that is related to this `SeasonEntrantDriver`. */
  season?: Maybe<Season>;
  /** Reads a single `Team` that is related to this `SeasonEntrantDriver`. */
  team?: Maybe<Team>;
  teamId: Scalars['String']['output'];
  testDriver: Scalars['Boolean']['output'];
  year: Scalars['Int']['output'];
};

/**
 * A condition to be used against `SeasonEntrantDriver` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type SeasonEntrantDriverCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `engineManufacturerId` field. */
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `entrantId` field. */
  entrantId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `year` field. */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `SeasonEntrantDriver` values. */
export type SeasonEntrantDriverConnection = {
  __typename?: 'SeasonEntrantDriverConnection';
  /** A list of edges which contains the `SeasonEntrantDriver` and cursor to aid in pagination. */
  edges: Array<Maybe<SeasonEntrantDriverEdge>>;
  /** A list of `SeasonEntrantDriver` objects. */
  nodes: Array<Maybe<SeasonEntrantDriver>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SeasonEntrantDriver` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `SeasonEntrantDriver` edge in the connection. */
export type SeasonEntrantDriverEdge = {
  __typename?: 'SeasonEntrantDriverEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `SeasonEntrantDriver` at the end of the edge. */
  node?: Maybe<SeasonEntrantDriver>;
};

/** An input for mutations affecting `SeasonEntrantDriver` */
export type SeasonEntrantDriverInput = {
  driverId: Scalars['String']['input'];
  engineManufacturerId: Scalars['String']['input'];
  entrantId: Scalars['String']['input'];
  rounds?: InputMaybe<Scalars['String']['input']>;
  roundsText?: InputMaybe<Scalars['String']['input']>;
  teamId: Scalars['String']['input'];
  testDriver: Scalars['Boolean']['input'];
  year: Scalars['Int']['input'];
};

/** Methods to use when ordering `SeasonEntrantDriver`. */
export enum SeasonEntrantDriverOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  EngineManufacturerIdAsc = 'ENGINE_MANUFACTURER_ID_ASC',
  EngineManufacturerIdDesc = 'ENGINE_MANUFACTURER_ID_DESC',
  EntrantIdAsc = 'ENTRANT_ID_ASC',
  EntrantIdDesc = 'ENTRANT_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  YearAsc = 'YEAR_ASC',
  YearDesc = 'YEAR_DESC'
}

/** Represents an update to a `SeasonEntrantDriver`. Fields that are set will be updated. */
export type SeasonEntrantDriverPatch = {
  driverId?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  entrantId?: InputMaybe<Scalars['String']['input']>;
  rounds?: InputMaybe<Scalars['String']['input']>;
  roundsText?: InputMaybe<Scalars['String']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
  testDriver?: InputMaybe<Scalars['Boolean']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** A `SeasonEntrant` edge in the connection. */
export type SeasonEntrantEdge = {
  __typename?: 'SeasonEntrantEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `SeasonEntrant` at the end of the edge. */
  node?: Maybe<SeasonEntrant>;
};

export type SeasonEntrantEngine = Node & {
  __typename?: 'SeasonEntrantEngine';
  /** Reads a single `Engine` that is related to this `SeasonEntrantEngine`. */
  engine?: Maybe<Engine>;
  engineId: Scalars['String']['output'];
  /** Reads a single `EngineManufacturer` that is related to this `SeasonEntrantEngine`. */
  engineManufacturer?: Maybe<EngineManufacturer>;
  engineManufacturerId: Scalars['String']['output'];
  /** Reads a single `Entrant` that is related to this `SeasonEntrantEngine`. */
  entrant?: Maybe<Entrant>;
  entrantId: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `Season` that is related to this `SeasonEntrantEngine`. */
  season?: Maybe<Season>;
  /** Reads a single `Team` that is related to this `SeasonEntrantEngine`. */
  team?: Maybe<Team>;
  teamId: Scalars['String']['output'];
  year: Scalars['Int']['output'];
};

/**
 * A condition to be used against `SeasonEntrantEngine` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type SeasonEntrantEngineCondition = {
  /** Checks for equality with the object’s `engineId` field. */
  engineId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `engineManufacturerId` field. */
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `entrantId` field. */
  entrantId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `year` field. */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `SeasonEntrantEngine` values. */
export type SeasonEntrantEngineConnection = {
  __typename?: 'SeasonEntrantEngineConnection';
  /** A list of edges which contains the `SeasonEntrantEngine` and cursor to aid in pagination. */
  edges: Array<Maybe<SeasonEntrantEngineEdge>>;
  /** A list of `SeasonEntrantEngine` objects. */
  nodes: Array<Maybe<SeasonEntrantEngine>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SeasonEntrantEngine` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `SeasonEntrantEngine` edge in the connection. */
export type SeasonEntrantEngineEdge = {
  __typename?: 'SeasonEntrantEngineEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `SeasonEntrantEngine` at the end of the edge. */
  node?: Maybe<SeasonEntrantEngine>;
};

/** An input for mutations affecting `SeasonEntrantEngine` */
export type SeasonEntrantEngineInput = {
  engineId: Scalars['String']['input'];
  engineManufacturerId: Scalars['String']['input'];
  entrantId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

/** Methods to use when ordering `SeasonEntrantEngine`. */
export enum SeasonEntrantEngineOrderBy {
  EngineIdAsc = 'ENGINE_ID_ASC',
  EngineIdDesc = 'ENGINE_ID_DESC',
  EngineManufacturerIdAsc = 'ENGINE_MANUFACTURER_ID_ASC',
  EngineManufacturerIdDesc = 'ENGINE_MANUFACTURER_ID_DESC',
  EntrantIdAsc = 'ENTRANT_ID_ASC',
  EntrantIdDesc = 'ENTRANT_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  YearAsc = 'YEAR_ASC',
  YearDesc = 'YEAR_DESC'
}

/** Represents an update to a `SeasonEntrantEngine`. Fields that are set will be updated. */
export type SeasonEntrantEnginePatch = {
  engineId?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  entrantId?: InputMaybe<Scalars['String']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** An input for mutations affecting `SeasonEntrant` */
export type SeasonEntrantInput = {
  countryId: Scalars['String']['input'];
  entrantId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

/** Methods to use when ordering `SeasonEntrant`. */
export enum SeasonEntrantOrderBy {
  CountryIdAsc = 'COUNTRY_ID_ASC',
  CountryIdDesc = 'COUNTRY_ID_DESC',
  EntrantIdAsc = 'ENTRANT_ID_ASC',
  EntrantIdDesc = 'ENTRANT_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  YearAsc = 'YEAR_ASC',
  YearDesc = 'YEAR_DESC'
}

/** Represents an update to a `SeasonEntrant`. Fields that are set will be updated. */
export type SeasonEntrantPatch = {
  countryId?: InputMaybe<Scalars['String']['input']>;
  entrantId?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type SeasonEntrantTeam = Node & {
  __typename?: 'SeasonEntrantTeam';
  /** Reads a single `EngineManufacturer` that is related to this `SeasonEntrantTeam`. */
  engineManufacturer?: Maybe<EngineManufacturer>;
  engineManufacturerId: Scalars['String']['output'];
  /** Reads a single `Entrant` that is related to this `SeasonEntrantTeam`. */
  entrant?: Maybe<Entrant>;
  entrantId: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `Season` that is related to this `SeasonEntrantTeam`. */
  season?: Maybe<Season>;
  /** Reads a single `Team` that is related to this `SeasonEntrantTeam`. */
  team?: Maybe<Team>;
  teamId: Scalars['String']['output'];
  year: Scalars['Int']['output'];
};

/**
 * A condition to be used against `SeasonEntrantTeam` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type SeasonEntrantTeamCondition = {
  /** Checks for equality with the object’s `engineManufacturerId` field. */
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `entrantId` field. */
  entrantId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `year` field. */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `SeasonEntrantTeam` values. */
export type SeasonEntrantTeamConnection = {
  __typename?: 'SeasonEntrantTeamConnection';
  /** A list of edges which contains the `SeasonEntrantTeam` and cursor to aid in pagination. */
  edges: Array<Maybe<SeasonEntrantTeamEdge>>;
  /** A list of `SeasonEntrantTeam` objects. */
  nodes: Array<Maybe<SeasonEntrantTeam>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SeasonEntrantTeam` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `SeasonEntrantTeam` edge in the connection. */
export type SeasonEntrantTeamEdge = {
  __typename?: 'SeasonEntrantTeamEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `SeasonEntrantTeam` at the end of the edge. */
  node?: Maybe<SeasonEntrantTeam>;
};

/** An input for mutations affecting `SeasonEntrantTeam` */
export type SeasonEntrantTeamInput = {
  engineManufacturerId: Scalars['String']['input'];
  entrantId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

/** Methods to use when ordering `SeasonEntrantTeam`. */
export enum SeasonEntrantTeamOrderBy {
  EngineManufacturerIdAsc = 'ENGINE_MANUFACTURER_ID_ASC',
  EngineManufacturerIdDesc = 'ENGINE_MANUFACTURER_ID_DESC',
  EntrantIdAsc = 'ENTRANT_ID_ASC',
  EntrantIdDesc = 'ENTRANT_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  YearAsc = 'YEAR_ASC',
  YearDesc = 'YEAR_DESC'
}

/** Represents an update to a `SeasonEntrantTeam`. Fields that are set will be updated. */
export type SeasonEntrantTeamPatch = {
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  entrantId?: InputMaybe<Scalars['String']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type SeasonEntrantTyreManufacturer = Node & {
  __typename?: 'SeasonEntrantTyreManufacturer';
  /** Reads a single `EngineManufacturer` that is related to this `SeasonEntrantTyreManufacturer`. */
  engineManufacturer?: Maybe<EngineManufacturer>;
  engineManufacturerId: Scalars['String']['output'];
  /** Reads a single `Entrant` that is related to this `SeasonEntrantTyreManufacturer`. */
  entrant?: Maybe<Entrant>;
  entrantId: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `Season` that is related to this `SeasonEntrantTyreManufacturer`. */
  season?: Maybe<Season>;
  /** Reads a single `Team` that is related to this `SeasonEntrantTyreManufacturer`. */
  team?: Maybe<Team>;
  teamId: Scalars['String']['output'];
  /** Reads a single `TyreManufacturer` that is related to this `SeasonEntrantTyreManufacturer`. */
  tyreManufacturer?: Maybe<TyreManufacturer>;
  tyreManufacturerId: Scalars['String']['output'];
  year: Scalars['Int']['output'];
};

/**
 * A condition to be used against `SeasonEntrantTyreManufacturer` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type SeasonEntrantTyreManufacturerCondition = {
  /** Checks for equality with the object’s `engineManufacturerId` field. */
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `entrantId` field. */
  entrantId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `tyreManufacturerId` field. */
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `year` field. */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `SeasonEntrantTyreManufacturer` values. */
export type SeasonEntrantTyreManufacturerConnection = {
  __typename?: 'SeasonEntrantTyreManufacturerConnection';
  /** A list of edges which contains the `SeasonEntrantTyreManufacturer` and cursor to aid in pagination. */
  edges: Array<Maybe<SeasonEntrantTyreManufacturerEdge>>;
  /** A list of `SeasonEntrantTyreManufacturer` objects. */
  nodes: Array<Maybe<SeasonEntrantTyreManufacturer>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SeasonEntrantTyreManufacturer` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `SeasonEntrantTyreManufacturer` edge in the connection. */
export type SeasonEntrantTyreManufacturerEdge = {
  __typename?: 'SeasonEntrantTyreManufacturerEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `SeasonEntrantTyreManufacturer` at the end of the edge. */
  node?: Maybe<SeasonEntrantTyreManufacturer>;
};

/** An input for mutations affecting `SeasonEntrantTyreManufacturer` */
export type SeasonEntrantTyreManufacturerInput = {
  engineManufacturerId: Scalars['String']['input'];
  entrantId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
  tyreManufacturerId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

/** Methods to use when ordering `SeasonEntrantTyreManufacturer`. */
export enum SeasonEntrantTyreManufacturerOrderBy {
  EngineManufacturerIdAsc = 'ENGINE_MANUFACTURER_ID_ASC',
  EngineManufacturerIdDesc = 'ENGINE_MANUFACTURER_ID_DESC',
  EntrantIdAsc = 'ENTRANT_ID_ASC',
  EntrantIdDesc = 'ENTRANT_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  TyreManufacturerIdAsc = 'TYRE_MANUFACTURER_ID_ASC',
  TyreManufacturerIdDesc = 'TYRE_MANUFACTURER_ID_DESC',
  YearAsc = 'YEAR_ASC',
  YearDesc = 'YEAR_DESC'
}

/** Represents an update to a `SeasonEntrantTyreManufacturer`. Fields that are set will be updated. */
export type SeasonEntrantTyreManufacturerPatch = {
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  entrantId?: InputMaybe<Scalars['String']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** An input for mutations affecting `Season` */
export type SeasonInput = {
  year: Scalars['Int']['input'];
};

/** Methods to use when ordering `Season`. */
export enum SeasonOrderBy {
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  YearAsc = 'YEAR_ASC',
  YearDesc = 'YEAR_DESC'
}

/** Represents an update to a `Season`. Fields that are set will be updated. */
export type SeasonPatch = {
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type SeasonTeam = Node & {
  __typename?: 'SeasonTeam';
  bestRaceResult?: Maybe<Scalars['Int']['output']>;
  bestSprintRaceResult?: Maybe<Scalars['Int']['output']>;
  bestStartingGridPosition?: Maybe<Scalars['Int']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  positionNumber?: Maybe<Scalars['Int']['output']>;
  positionText?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Season` that is related to this `SeasonTeam`. */
  season?: Maybe<Season>;
  /** Reads a single `Team` that is related to this `SeasonTeam`. */
  team?: Maybe<Team>;
  teamId: Scalars['String']['output'];
  total1And2Finishes: Scalars['Int']['output'];
  totalFastestLaps: Scalars['Int']['output'];
  totalPodiumRaces: Scalars['Int']['output'];
  totalPodiums: Scalars['Int']['output'];
  totalPoints: Scalars['BigFloat']['output'];
  totalPolePositions: Scalars['Int']['output'];
  totalRaceEntries: Scalars['Int']['output'];
  totalRaceLaps: Scalars['Int']['output'];
  totalRaceStarts: Scalars['Int']['output'];
  totalRaceWins: Scalars['Int']['output'];
  totalSprintRaceStarts: Scalars['Int']['output'];
  totalSprintRaceWins: Scalars['Int']['output'];
  year: Scalars['Int']['output'];
};

/**
 * A condition to be used against `SeasonTeam` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type SeasonTeamCondition = {
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `year` field. */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `SeasonTeam` values. */
export type SeasonTeamConnection = {
  __typename?: 'SeasonTeamConnection';
  /** A list of edges which contains the `SeasonTeam` and cursor to aid in pagination. */
  edges: Array<Maybe<SeasonTeamEdge>>;
  /** A list of `SeasonTeam` objects. */
  nodes: Array<Maybe<SeasonTeam>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SeasonTeam` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `SeasonTeam` edge in the connection. */
export type SeasonTeamEdge = {
  __typename?: 'SeasonTeamEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `SeasonTeam` at the end of the edge. */
  node?: Maybe<SeasonTeam>;
};

/** An input for mutations affecting `SeasonTeam` */
export type SeasonTeamInput = {
  bestRaceResult?: InputMaybe<Scalars['Int']['input']>;
  bestSprintRaceResult?: InputMaybe<Scalars['Int']['input']>;
  bestStartingGridPosition?: InputMaybe<Scalars['Int']['input']>;
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  teamId: Scalars['String']['input'];
  total1And2Finishes: Scalars['Int']['input'];
  totalFastestLaps: Scalars['Int']['input'];
  totalPodiumRaces: Scalars['Int']['input'];
  totalPodiums: Scalars['Int']['input'];
  totalPoints: Scalars['BigFloat']['input'];
  totalPolePositions: Scalars['Int']['input'];
  totalRaceEntries: Scalars['Int']['input'];
  totalRaceLaps: Scalars['Int']['input'];
  totalRaceStarts: Scalars['Int']['input'];
  totalRaceWins: Scalars['Int']['input'];
  totalSprintRaceStarts: Scalars['Int']['input'];
  totalSprintRaceWins: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
};

/** Methods to use when ordering `SeasonTeam`. */
export enum SeasonTeamOrderBy {
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  YearAsc = 'YEAR_ASC',
  YearDesc = 'YEAR_DESC'
}

/** Represents an update to a `SeasonTeam`. Fields that are set will be updated. */
export type SeasonTeamPatch = {
  bestRaceResult?: InputMaybe<Scalars['Int']['input']>;
  bestSprintRaceResult?: InputMaybe<Scalars['Int']['input']>;
  bestStartingGridPosition?: InputMaybe<Scalars['Int']['input']>;
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
  total1And2Finishes?: InputMaybe<Scalars['Int']['input']>;
  totalFastestLaps?: InputMaybe<Scalars['Int']['input']>;
  totalPodiumRaces?: InputMaybe<Scalars['Int']['input']>;
  totalPodiums?: InputMaybe<Scalars['Int']['input']>;
  totalPoints?: InputMaybe<Scalars['BigFloat']['input']>;
  totalPolePositions?: InputMaybe<Scalars['Int']['input']>;
  totalRaceEntries?: InputMaybe<Scalars['Int']['input']>;
  totalRaceLaps?: InputMaybe<Scalars['Int']['input']>;
  totalRaceStarts?: InputMaybe<Scalars['Int']['input']>;
  totalRaceWins?: InputMaybe<Scalars['Int']['input']>;
  totalSprintRaceStarts?: InputMaybe<Scalars['Int']['input']>;
  totalSprintRaceWins?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type SeasonTeamStanding = Node & {
  __typename?: 'SeasonTeamStanding';
  championshipWon: Scalars['Boolean']['output'];
  /** Reads a single `EngineManufacturer` that is related to this `SeasonTeamStanding`. */
  engineManufacturer?: Maybe<EngineManufacturer>;
  engineManufacturerId: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  points: Scalars['BigFloat']['output'];
  positionDisplayOrder: Scalars['Int']['output'];
  positionNumber?: Maybe<Scalars['Int']['output']>;
  positionText: Scalars['String']['output'];
  /** Reads a single `Season` that is related to this `SeasonTeamStanding`. */
  season?: Maybe<Season>;
  /** Reads a single `Team` that is related to this `SeasonTeamStanding`. */
  team?: Maybe<Team>;
  teamId: Scalars['String']['output'];
  year: Scalars['Int']['output'];
};

/**
 * A condition to be used against `SeasonTeamStanding` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type SeasonTeamStandingCondition = {
  /** Checks for equality with the object’s `engineManufacturerId` field. */
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `positionDisplayOrder` field. */
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionNumber` field. */
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionText` field. */
  positionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `year` field. */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `SeasonTeamStanding` values. */
export type SeasonTeamStandingConnection = {
  __typename?: 'SeasonTeamStandingConnection';
  /** A list of edges which contains the `SeasonTeamStanding` and cursor to aid in pagination. */
  edges: Array<Maybe<SeasonTeamStandingEdge>>;
  /** A list of `SeasonTeamStanding` objects. */
  nodes: Array<Maybe<SeasonTeamStanding>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SeasonTeamStanding` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `SeasonTeamStanding` edge in the connection. */
export type SeasonTeamStandingEdge = {
  __typename?: 'SeasonTeamStandingEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `SeasonTeamStanding` at the end of the edge. */
  node?: Maybe<SeasonTeamStanding>;
};

/** An input for mutations affecting `SeasonTeamStanding` */
export type SeasonTeamStandingInput = {
  championshipWon: Scalars['Boolean']['input'];
  engineManufacturerId: Scalars['String']['input'];
  points: Scalars['BigFloat']['input'];
  positionDisplayOrder: Scalars['Int']['input'];
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

/** Methods to use when ordering `SeasonTeamStanding`. */
export enum SeasonTeamStandingOrderBy {
  EngineManufacturerIdAsc = 'ENGINE_MANUFACTURER_ID_ASC',
  EngineManufacturerIdDesc = 'ENGINE_MANUFACTURER_ID_DESC',
  Natural = 'NATURAL',
  PositionDisplayOrderAsc = 'POSITION_DISPLAY_ORDER_ASC',
  PositionDisplayOrderDesc = 'POSITION_DISPLAY_ORDER_DESC',
  PositionNumberAsc = 'POSITION_NUMBER_ASC',
  PositionNumberDesc = 'POSITION_NUMBER_DESC',
  PositionTextAsc = 'POSITION_TEXT_ASC',
  PositionTextDesc = 'POSITION_TEXT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  YearAsc = 'YEAR_ASC',
  YearDesc = 'YEAR_DESC'
}

/** Represents an update to a `SeasonTeamStanding`. Fields that are set will be updated. */
export type SeasonTeamStandingPatch = {
  championshipWon?: InputMaybe<Scalars['Boolean']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  points?: InputMaybe<Scalars['BigFloat']['input']>;
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type SeasonTyreManufacturer = Node & {
  __typename?: 'SeasonTyreManufacturer';
  bestRaceResult?: Maybe<Scalars['Int']['output']>;
  bestSprintRaceResult?: Maybe<Scalars['Int']['output']>;
  bestStartingGridPosition?: Maybe<Scalars['Int']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `Season` that is related to this `SeasonTyreManufacturer`. */
  season?: Maybe<Season>;
  totalFastestLaps: Scalars['Int']['output'];
  totalPodiumRaces: Scalars['Int']['output'];
  totalPodiums: Scalars['Int']['output'];
  totalPolePositions: Scalars['Int']['output'];
  totalRaceEntries: Scalars['Int']['output'];
  totalRaceLaps: Scalars['Int']['output'];
  totalRaceStarts: Scalars['Int']['output'];
  totalRaceWins: Scalars['Int']['output'];
  totalSprintRaceStarts: Scalars['Int']['output'];
  totalSprintRaceWins: Scalars['Int']['output'];
  /** Reads a single `TyreManufacturer` that is related to this `SeasonTyreManufacturer`. */
  tyreManufacturer?: Maybe<TyreManufacturer>;
  tyreManufacturerId: Scalars['String']['output'];
  year: Scalars['Int']['output'];
};

/**
 * A condition to be used against `SeasonTyreManufacturer` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type SeasonTyreManufacturerCondition = {
  /** Checks for equality with the object’s `tyreManufacturerId` field. */
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `year` field. */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `SeasonTyreManufacturer` values. */
export type SeasonTyreManufacturerConnection = {
  __typename?: 'SeasonTyreManufacturerConnection';
  /** A list of edges which contains the `SeasonTyreManufacturer` and cursor to aid in pagination. */
  edges: Array<Maybe<SeasonTyreManufacturerEdge>>;
  /** A list of `SeasonTyreManufacturer` objects. */
  nodes: Array<Maybe<SeasonTyreManufacturer>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SeasonTyreManufacturer` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `SeasonTyreManufacturer` edge in the connection. */
export type SeasonTyreManufacturerEdge = {
  __typename?: 'SeasonTyreManufacturerEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `SeasonTyreManufacturer` at the end of the edge. */
  node?: Maybe<SeasonTyreManufacturer>;
};

/** An input for mutations affecting `SeasonTyreManufacturer` */
export type SeasonTyreManufacturerInput = {
  bestRaceResult?: InputMaybe<Scalars['Int']['input']>;
  bestSprintRaceResult?: InputMaybe<Scalars['Int']['input']>;
  bestStartingGridPosition?: InputMaybe<Scalars['Int']['input']>;
  totalFastestLaps: Scalars['Int']['input'];
  totalPodiumRaces: Scalars['Int']['input'];
  totalPodiums: Scalars['Int']['input'];
  totalPolePositions: Scalars['Int']['input'];
  totalRaceEntries: Scalars['Int']['input'];
  totalRaceLaps: Scalars['Int']['input'];
  totalRaceStarts: Scalars['Int']['input'];
  totalRaceWins: Scalars['Int']['input'];
  totalSprintRaceStarts: Scalars['Int']['input'];
  totalSprintRaceWins: Scalars['Int']['input'];
  tyreManufacturerId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

/** Methods to use when ordering `SeasonTyreManufacturer`. */
export enum SeasonTyreManufacturerOrderBy {
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TyreManufacturerIdAsc = 'TYRE_MANUFACTURER_ID_ASC',
  TyreManufacturerIdDesc = 'TYRE_MANUFACTURER_ID_DESC',
  YearAsc = 'YEAR_ASC',
  YearDesc = 'YEAR_DESC'
}

/** Represents an update to a `SeasonTyreManufacturer`. Fields that are set will be updated. */
export type SeasonTyreManufacturerPatch = {
  bestRaceResult?: InputMaybe<Scalars['Int']['input']>;
  bestSprintRaceResult?: InputMaybe<Scalars['Int']['input']>;
  bestStartingGridPosition?: InputMaybe<Scalars['Int']['input']>;
  totalFastestLaps?: InputMaybe<Scalars['Int']['input']>;
  totalPodiumRaces?: InputMaybe<Scalars['Int']['input']>;
  totalPodiums?: InputMaybe<Scalars['Int']['input']>;
  totalPolePositions?: InputMaybe<Scalars['Int']['input']>;
  totalRaceEntries?: InputMaybe<Scalars['Int']['input']>;
  totalRaceLaps?: InputMaybe<Scalars['Int']['input']>;
  totalRaceStarts?: InputMaybe<Scalars['Int']['input']>;
  totalRaceWins?: InputMaybe<Scalars['Int']['input']>;
  totalSprintRaceStarts?: InputMaybe<Scalars['Int']['input']>;
  totalSprintRaceWins?: InputMaybe<Scalars['Int']['input']>;
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type SprintQualifyingResult = Node & {
  __typename?: 'SprintQualifyingResult';
  /** Reads a single `Driver` that is related to this `SprintQualifyingResult`. */
  driver?: Maybe<Driver>;
  driverId?: Maybe<Scalars['String']['output']>;
  driverNumber?: Maybe<Scalars['String']['output']>;
  engineManufacturerId?: Maybe<Scalars['String']['output']>;
  gap?: Maybe<Scalars['String']['output']>;
  gapMillis?: Maybe<Scalars['Int']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  interval?: Maybe<Scalars['String']['output']>;
  intervalMillis?: Maybe<Scalars['Int']['output']>;
  laps?: Maybe<Scalars['Int']['output']>;
  positionDisplayOrder: Scalars['Int']['output'];
  positionNumber?: Maybe<Scalars['Int']['output']>;
  positionText?: Maybe<Scalars['String']['output']>;
  q1?: Maybe<Scalars['String']['output']>;
  q1Millis?: Maybe<Scalars['Int']['output']>;
  q2?: Maybe<Scalars['String']['output']>;
  q2Millis?: Maybe<Scalars['Int']['output']>;
  q3?: Maybe<Scalars['String']['output']>;
  q3Millis?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `Race` that is related to this `SprintQualifyingResult`. */
  race?: Maybe<Race>;
  raceId: Scalars['Int']['output'];
  /** Reads a single `Team` that is related to this `SprintQualifyingResult`. */
  team?: Maybe<Team>;
  teamId?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
  timeMillis?: Maybe<Scalars['Int']['output']>;
  tyreManufacturerId?: Maybe<Scalars['String']['output']>;
};

/**
 * A condition to be used against `SprintQualifyingResult` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type SprintQualifyingResultCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `driverNumber` field. */
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `engineManufacturerId` field. */
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gap` field. */
  gap?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gapMillis` field. */
  gapMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `interval` field. */
  interval?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `intervalMillis` field. */
  intervalMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `laps` field. */
  laps?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionDisplayOrder` field. */
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionNumber` field. */
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionText` field. */
  positionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `q1` field. */
  q1?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `q1Millis` field. */
  q1Millis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `q2` field. */
  q2?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `q2Millis` field. */
  q2Millis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `q3` field. */
  q3?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `q3Millis` field. */
  q3Millis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `time` field. */
  time?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `timeMillis` field. */
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `tyreManufacturerId` field. */
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `SprintQualifyingResult` values. */
export type SprintQualifyingResultConnection = {
  __typename?: 'SprintQualifyingResultConnection';
  /** A list of edges which contains the `SprintQualifyingResult` and cursor to aid in pagination. */
  edges: Array<Maybe<SprintQualifyingResultEdge>>;
  /** A list of `SprintQualifyingResult` objects. */
  nodes: Array<Maybe<SprintQualifyingResult>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SprintQualifyingResult` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `SprintQualifyingResult` edge in the connection. */
export type SprintQualifyingResultEdge = {
  __typename?: 'SprintQualifyingResultEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `SprintQualifyingResult` at the end of the edge. */
  node?: Maybe<SprintQualifyingResult>;
};

/** An input for mutations affecting `SprintQualifyingResult` */
export type SprintQualifyingResultInput = {
  driverId?: InputMaybe<Scalars['String']['input']>;
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  gap?: InputMaybe<Scalars['String']['input']>;
  gapMillis?: InputMaybe<Scalars['Int']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  intervalMillis?: InputMaybe<Scalars['Int']['input']>;
  laps?: InputMaybe<Scalars['Int']['input']>;
  positionDisplayOrder: Scalars['Int']['input'];
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  q1?: InputMaybe<Scalars['String']['input']>;
  q1Millis?: InputMaybe<Scalars['Int']['input']>;
  q2?: InputMaybe<Scalars['String']['input']>;
  q2Millis?: InputMaybe<Scalars['Int']['input']>;
  q3?: InputMaybe<Scalars['String']['input']>;
  q3Millis?: InputMaybe<Scalars['Int']['input']>;
  raceId: Scalars['Int']['input'];
  teamId?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `SprintQualifyingResult`. */
export enum SprintQualifyingResultOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  DriverNumberAsc = 'DRIVER_NUMBER_ASC',
  DriverNumberDesc = 'DRIVER_NUMBER_DESC',
  EngineManufacturerIdAsc = 'ENGINE_MANUFACTURER_ID_ASC',
  EngineManufacturerIdDesc = 'ENGINE_MANUFACTURER_ID_DESC',
  GapAsc = 'GAP_ASC',
  GapDesc = 'GAP_DESC',
  GapMillisAsc = 'GAP_MILLIS_ASC',
  GapMillisDesc = 'GAP_MILLIS_DESC',
  IntervalAsc = 'INTERVAL_ASC',
  IntervalDesc = 'INTERVAL_DESC',
  IntervalMillisAsc = 'INTERVAL_MILLIS_ASC',
  IntervalMillisDesc = 'INTERVAL_MILLIS_DESC',
  LapsAsc = 'LAPS_ASC',
  LapsDesc = 'LAPS_DESC',
  Natural = 'NATURAL',
  PositionDisplayOrderAsc = 'POSITION_DISPLAY_ORDER_ASC',
  PositionDisplayOrderDesc = 'POSITION_DISPLAY_ORDER_DESC',
  PositionNumberAsc = 'POSITION_NUMBER_ASC',
  PositionNumberDesc = 'POSITION_NUMBER_DESC',
  PositionTextAsc = 'POSITION_TEXT_ASC',
  PositionTextDesc = 'POSITION_TEXT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  Q1Asc = 'Q1_ASC',
  Q1Desc = 'Q1_DESC',
  Q1MillisAsc = 'Q1_MILLIS_ASC',
  Q1MillisDesc = 'Q1_MILLIS_DESC',
  Q2Asc = 'Q2_ASC',
  Q2Desc = 'Q2_DESC',
  Q2MillisAsc = 'Q2_MILLIS_ASC',
  Q2MillisDesc = 'Q2_MILLIS_DESC',
  Q3Asc = 'Q3_ASC',
  Q3Desc = 'Q3_DESC',
  Q3MillisAsc = 'Q3_MILLIS_ASC',
  Q3MillisDesc = 'Q3_MILLIS_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  TimeAsc = 'TIME_ASC',
  TimeDesc = 'TIME_DESC',
  TimeMillisAsc = 'TIME_MILLIS_ASC',
  TimeMillisDesc = 'TIME_MILLIS_DESC',
  TyreManufacturerIdAsc = 'TYRE_MANUFACTURER_ID_ASC',
  TyreManufacturerIdDesc = 'TYRE_MANUFACTURER_ID_DESC'
}

/** Represents an update to a `SprintQualifyingResult`. Fields that are set will be updated. */
export type SprintQualifyingResultPatch = {
  driverId?: InputMaybe<Scalars['String']['input']>;
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  gap?: InputMaybe<Scalars['String']['input']>;
  gapMillis?: InputMaybe<Scalars['Int']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  intervalMillis?: InputMaybe<Scalars['Int']['input']>;
  laps?: InputMaybe<Scalars['Int']['input']>;
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  q1?: InputMaybe<Scalars['String']['input']>;
  q1Millis?: InputMaybe<Scalars['Int']['input']>;
  q2?: InputMaybe<Scalars['String']['input']>;
  q2Millis?: InputMaybe<Scalars['Int']['input']>;
  q3?: InputMaybe<Scalars['String']['input']>;
  q3Millis?: InputMaybe<Scalars['Int']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

export type SprintRaceResult = Node & {
  __typename?: 'SprintRaceResult';
  /** Reads a single `Driver` that is related to this `SprintRaceResult`. */
  driver?: Maybe<Driver>;
  driverId?: Maybe<Scalars['String']['output']>;
  driverNumber?: Maybe<Scalars['String']['output']>;
  engineManufacturerId?: Maybe<Scalars['String']['output']>;
  gap?: Maybe<Scalars['String']['output']>;
  gapLaps?: Maybe<Scalars['Int']['output']>;
  gapMillis?: Maybe<Scalars['Int']['output']>;
  gridPositionNumber?: Maybe<Scalars['Int']['output']>;
  gridPositionText?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  interval?: Maybe<Scalars['String']['output']>;
  intervalMillis?: Maybe<Scalars['Int']['output']>;
  laps?: Maybe<Scalars['Int']['output']>;
  points?: Maybe<Scalars['BigFloat']['output']>;
  positionDisplayOrder: Scalars['Int']['output'];
  positionNumber?: Maybe<Scalars['Int']['output']>;
  positionText?: Maybe<Scalars['String']['output']>;
  positionsGained?: Maybe<Scalars['Int']['output']>;
  qualificationPositionNumber?: Maybe<Scalars['Int']['output']>;
  qualificationPositionText?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Race` that is related to this `SprintRaceResult`. */
  race?: Maybe<Race>;
  raceId: Scalars['Int']['output'];
  reasonRetired?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Team` that is related to this `SprintRaceResult`. */
  team?: Maybe<Team>;
  teamId?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
  timeMillis?: Maybe<Scalars['Int']['output']>;
  timePenalty?: Maybe<Scalars['String']['output']>;
  timePenaltyMillis?: Maybe<Scalars['Int']['output']>;
  tyreManufacturerId?: Maybe<Scalars['String']['output']>;
};

/**
 * A condition to be used against `SprintRaceResult` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type SprintRaceResultCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `driverNumber` field. */
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `engineManufacturerId` field. */
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gap` field. */
  gap?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gapLaps` field. */
  gapLaps?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `gapMillis` field. */
  gapMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `gridPositionNumber` field. */
  gridPositionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `gridPositionText` field. */
  gridPositionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `interval` field. */
  interval?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `intervalMillis` field. */
  intervalMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `laps` field. */
  laps?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `points` field. */
  points?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Checks for equality with the object’s `positionDisplayOrder` field. */
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionNumber` field. */
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionText` field. */
  positionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `positionsGained` field. */
  positionsGained?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `qualificationPositionNumber` field. */
  qualificationPositionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `qualificationPositionText` field. */
  qualificationPositionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `reasonRetired` field. */
  reasonRetired?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `time` field. */
  time?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `timeMillis` field. */
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `timePenalty` field. */
  timePenalty?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `timePenaltyMillis` field. */
  timePenaltyMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `tyreManufacturerId` field. */
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `SprintRaceResult` values. */
export type SprintRaceResultConnection = {
  __typename?: 'SprintRaceResultConnection';
  /** A list of edges which contains the `SprintRaceResult` and cursor to aid in pagination. */
  edges: Array<Maybe<SprintRaceResultEdge>>;
  /** A list of `SprintRaceResult` objects. */
  nodes: Array<Maybe<SprintRaceResult>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SprintRaceResult` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `SprintRaceResult` edge in the connection. */
export type SprintRaceResultEdge = {
  __typename?: 'SprintRaceResultEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `SprintRaceResult` at the end of the edge. */
  node?: Maybe<SprintRaceResult>;
};

/** An input for mutations affecting `SprintRaceResult` */
export type SprintRaceResultInput = {
  driverId?: InputMaybe<Scalars['String']['input']>;
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  gap?: InputMaybe<Scalars['String']['input']>;
  gapLaps?: InputMaybe<Scalars['Int']['input']>;
  gapMillis?: InputMaybe<Scalars['Int']['input']>;
  gridPositionNumber?: InputMaybe<Scalars['Int']['input']>;
  gridPositionText?: InputMaybe<Scalars['String']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  intervalMillis?: InputMaybe<Scalars['Int']['input']>;
  laps?: InputMaybe<Scalars['Int']['input']>;
  points?: InputMaybe<Scalars['BigFloat']['input']>;
  positionDisplayOrder: Scalars['Int']['input'];
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  positionsGained?: InputMaybe<Scalars['Int']['input']>;
  qualificationPositionNumber?: InputMaybe<Scalars['Int']['input']>;
  qualificationPositionText?: InputMaybe<Scalars['String']['input']>;
  raceId: Scalars['Int']['input'];
  reasonRetired?: InputMaybe<Scalars['String']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  timePenalty?: InputMaybe<Scalars['String']['input']>;
  timePenaltyMillis?: InputMaybe<Scalars['Int']['input']>;
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `SprintRaceResult`. */
export enum SprintRaceResultOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  DriverNumberAsc = 'DRIVER_NUMBER_ASC',
  DriverNumberDesc = 'DRIVER_NUMBER_DESC',
  EngineManufacturerIdAsc = 'ENGINE_MANUFACTURER_ID_ASC',
  EngineManufacturerIdDesc = 'ENGINE_MANUFACTURER_ID_DESC',
  GapAsc = 'GAP_ASC',
  GapDesc = 'GAP_DESC',
  GapLapsAsc = 'GAP_LAPS_ASC',
  GapLapsDesc = 'GAP_LAPS_DESC',
  GapMillisAsc = 'GAP_MILLIS_ASC',
  GapMillisDesc = 'GAP_MILLIS_DESC',
  GridPositionNumberAsc = 'GRID_POSITION_NUMBER_ASC',
  GridPositionNumberDesc = 'GRID_POSITION_NUMBER_DESC',
  GridPositionTextAsc = 'GRID_POSITION_TEXT_ASC',
  GridPositionTextDesc = 'GRID_POSITION_TEXT_DESC',
  IntervalAsc = 'INTERVAL_ASC',
  IntervalDesc = 'INTERVAL_DESC',
  IntervalMillisAsc = 'INTERVAL_MILLIS_ASC',
  IntervalMillisDesc = 'INTERVAL_MILLIS_DESC',
  LapsAsc = 'LAPS_ASC',
  LapsDesc = 'LAPS_DESC',
  Natural = 'NATURAL',
  PointsAsc = 'POINTS_ASC',
  PointsDesc = 'POINTS_DESC',
  PositionsGainedAsc = 'POSITIONS_GAINED_ASC',
  PositionsGainedDesc = 'POSITIONS_GAINED_DESC',
  PositionDisplayOrderAsc = 'POSITION_DISPLAY_ORDER_ASC',
  PositionDisplayOrderDesc = 'POSITION_DISPLAY_ORDER_DESC',
  PositionNumberAsc = 'POSITION_NUMBER_ASC',
  PositionNumberDesc = 'POSITION_NUMBER_DESC',
  PositionTextAsc = 'POSITION_TEXT_ASC',
  PositionTextDesc = 'POSITION_TEXT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  QualificationPositionNumberAsc = 'QUALIFICATION_POSITION_NUMBER_ASC',
  QualificationPositionNumberDesc = 'QUALIFICATION_POSITION_NUMBER_DESC',
  QualificationPositionTextAsc = 'QUALIFICATION_POSITION_TEXT_ASC',
  QualificationPositionTextDesc = 'QUALIFICATION_POSITION_TEXT_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC',
  ReasonRetiredAsc = 'REASON_RETIRED_ASC',
  ReasonRetiredDesc = 'REASON_RETIRED_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  TimeAsc = 'TIME_ASC',
  TimeDesc = 'TIME_DESC',
  TimeMillisAsc = 'TIME_MILLIS_ASC',
  TimeMillisDesc = 'TIME_MILLIS_DESC',
  TimePenaltyAsc = 'TIME_PENALTY_ASC',
  TimePenaltyDesc = 'TIME_PENALTY_DESC',
  TimePenaltyMillisAsc = 'TIME_PENALTY_MILLIS_ASC',
  TimePenaltyMillisDesc = 'TIME_PENALTY_MILLIS_DESC',
  TyreManufacturerIdAsc = 'TYRE_MANUFACTURER_ID_ASC',
  TyreManufacturerIdDesc = 'TYRE_MANUFACTURER_ID_DESC'
}

/** Represents an update to a `SprintRaceResult`. Fields that are set will be updated. */
export type SprintRaceResultPatch = {
  driverId?: InputMaybe<Scalars['String']['input']>;
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  gap?: InputMaybe<Scalars['String']['input']>;
  gapLaps?: InputMaybe<Scalars['Int']['input']>;
  gapMillis?: InputMaybe<Scalars['Int']['input']>;
  gridPositionNumber?: InputMaybe<Scalars['Int']['input']>;
  gridPositionText?: InputMaybe<Scalars['String']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  intervalMillis?: InputMaybe<Scalars['Int']['input']>;
  laps?: InputMaybe<Scalars['Int']['input']>;
  points?: InputMaybe<Scalars['BigFloat']['input']>;
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  positionsGained?: InputMaybe<Scalars['Int']['input']>;
  qualificationPositionNumber?: InputMaybe<Scalars['Int']['input']>;
  qualificationPositionText?: InputMaybe<Scalars['String']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  reasonRetired?: InputMaybe<Scalars['String']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  timePenalty?: InputMaybe<Scalars['String']['input']>;
  timePenaltyMillis?: InputMaybe<Scalars['Int']['input']>;
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

export type SprintStartingGridPosition = Node & {
  __typename?: 'SprintStartingGridPosition';
  /** Reads a single `Driver` that is related to this `SprintStartingGridPosition`. */
  driver?: Maybe<Driver>;
  driverId?: Maybe<Scalars['String']['output']>;
  driverNumber?: Maybe<Scalars['String']['output']>;
  engineManufacturerId?: Maybe<Scalars['String']['output']>;
  gridPenalty?: Maybe<Scalars['String']['output']>;
  gridPenaltyPositions?: Maybe<Scalars['Int']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  positionDisplayOrder: Scalars['Int']['output'];
  positionNumber?: Maybe<Scalars['Int']['output']>;
  positionText?: Maybe<Scalars['String']['output']>;
  qualificationPositionNumber?: Maybe<Scalars['Int']['output']>;
  qualificationPositionText?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Race` that is related to this `SprintStartingGridPosition`. */
  race?: Maybe<Race>;
  raceId: Scalars['Int']['output'];
  /** Reads a single `Team` that is related to this `SprintStartingGridPosition`. */
  team?: Maybe<Team>;
  teamId?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
  timeMillis?: Maybe<Scalars['Int']['output']>;
  tyreManufacturerId?: Maybe<Scalars['String']['output']>;
};

/**
 * A condition to be used against `SprintStartingGridPosition` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type SprintStartingGridPositionCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `driverNumber` field. */
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `engineManufacturerId` field. */
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gridPenalty` field. */
  gridPenalty?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gridPenaltyPositions` field. */
  gridPenaltyPositions?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionDisplayOrder` field. */
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionNumber` field. */
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionText` field. */
  positionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `qualificationPositionNumber` field. */
  qualificationPositionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `qualificationPositionText` field. */
  qualificationPositionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `time` field. */
  time?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `timeMillis` field. */
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `tyreManufacturerId` field. */
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `SprintStartingGridPosition` values. */
export type SprintStartingGridPositionConnection = {
  __typename?: 'SprintStartingGridPositionConnection';
  /** A list of edges which contains the `SprintStartingGridPosition` and cursor to aid in pagination. */
  edges: Array<Maybe<SprintStartingGridPositionEdge>>;
  /** A list of `SprintStartingGridPosition` objects. */
  nodes: Array<Maybe<SprintStartingGridPosition>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SprintStartingGridPosition` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `SprintStartingGridPosition` edge in the connection. */
export type SprintStartingGridPositionEdge = {
  __typename?: 'SprintStartingGridPositionEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `SprintStartingGridPosition` at the end of the edge. */
  node?: Maybe<SprintStartingGridPosition>;
};

/** An input for mutations affecting `SprintStartingGridPosition` */
export type SprintStartingGridPositionInput = {
  driverId?: InputMaybe<Scalars['String']['input']>;
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  gridPenalty?: InputMaybe<Scalars['String']['input']>;
  gridPenaltyPositions?: InputMaybe<Scalars['Int']['input']>;
  positionDisplayOrder: Scalars['Int']['input'];
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  qualificationPositionNumber?: InputMaybe<Scalars['Int']['input']>;
  qualificationPositionText?: InputMaybe<Scalars['String']['input']>;
  raceId: Scalars['Int']['input'];
  teamId?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `SprintStartingGridPosition`. */
export enum SprintStartingGridPositionOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  DriverNumberAsc = 'DRIVER_NUMBER_ASC',
  DriverNumberDesc = 'DRIVER_NUMBER_DESC',
  EngineManufacturerIdAsc = 'ENGINE_MANUFACTURER_ID_ASC',
  EngineManufacturerIdDesc = 'ENGINE_MANUFACTURER_ID_DESC',
  GridPenaltyAsc = 'GRID_PENALTY_ASC',
  GridPenaltyDesc = 'GRID_PENALTY_DESC',
  GridPenaltyPositionsAsc = 'GRID_PENALTY_POSITIONS_ASC',
  GridPenaltyPositionsDesc = 'GRID_PENALTY_POSITIONS_DESC',
  Natural = 'NATURAL',
  PositionDisplayOrderAsc = 'POSITION_DISPLAY_ORDER_ASC',
  PositionDisplayOrderDesc = 'POSITION_DISPLAY_ORDER_DESC',
  PositionNumberAsc = 'POSITION_NUMBER_ASC',
  PositionNumberDesc = 'POSITION_NUMBER_DESC',
  PositionTextAsc = 'POSITION_TEXT_ASC',
  PositionTextDesc = 'POSITION_TEXT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  QualificationPositionNumberAsc = 'QUALIFICATION_POSITION_NUMBER_ASC',
  QualificationPositionNumberDesc = 'QUALIFICATION_POSITION_NUMBER_DESC',
  QualificationPositionTextAsc = 'QUALIFICATION_POSITION_TEXT_ASC',
  QualificationPositionTextDesc = 'QUALIFICATION_POSITION_TEXT_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  TimeAsc = 'TIME_ASC',
  TimeDesc = 'TIME_DESC',
  TimeMillisAsc = 'TIME_MILLIS_ASC',
  TimeMillisDesc = 'TIME_MILLIS_DESC',
  TyreManufacturerIdAsc = 'TYRE_MANUFACTURER_ID_ASC',
  TyreManufacturerIdDesc = 'TYRE_MANUFACTURER_ID_DESC'
}

/** Represents an update to a `SprintStartingGridPosition`. Fields that are set will be updated. */
export type SprintStartingGridPositionPatch = {
  driverId?: InputMaybe<Scalars['String']['input']>;
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  gridPenalty?: InputMaybe<Scalars['String']['input']>;
  gridPenaltyPositions?: InputMaybe<Scalars['Int']['input']>;
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  qualificationPositionNumber?: InputMaybe<Scalars['Int']['input']>;
  qualificationPositionText?: InputMaybe<Scalars['String']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

export type StartingGridPosition = Node & {
  __typename?: 'StartingGridPosition';
  /** Reads a single `Driver` that is related to this `StartingGridPosition`. */
  driver?: Maybe<Driver>;
  driverId?: Maybe<Scalars['String']['output']>;
  driverNumber?: Maybe<Scalars['String']['output']>;
  engineManufacturerId?: Maybe<Scalars['String']['output']>;
  gridPenalty?: Maybe<Scalars['String']['output']>;
  gridPenaltyPositions?: Maybe<Scalars['Int']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  positionDisplayOrder: Scalars['Int']['output'];
  positionNumber?: Maybe<Scalars['Int']['output']>;
  positionText?: Maybe<Scalars['String']['output']>;
  qualificationPositionNumber?: Maybe<Scalars['Int']['output']>;
  qualificationPositionText?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Race` that is related to this `StartingGridPosition`. */
  race?: Maybe<Race>;
  raceId: Scalars['Int']['output'];
  /** Reads a single `Team` that is related to this `StartingGridPosition`. */
  team?: Maybe<Team>;
  teamId?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
  timeMillis?: Maybe<Scalars['Int']['output']>;
  tyreManufacturerId?: Maybe<Scalars['String']['output']>;
};

/**
 * A condition to be used against `StartingGridPosition` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type StartingGridPositionCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `driverNumber` field. */
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `engineManufacturerId` field. */
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gridPenalty` field. */
  gridPenalty?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gridPenaltyPositions` field. */
  gridPenaltyPositions?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionDisplayOrder` field. */
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionNumber` field. */
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionText` field. */
  positionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `qualificationPositionNumber` field. */
  qualificationPositionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `qualificationPositionText` field. */
  qualificationPositionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `time` field. */
  time?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `timeMillis` field. */
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `tyreManufacturerId` field. */
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `StartingGridPosition` values. */
export type StartingGridPositionConnection = {
  __typename?: 'StartingGridPositionConnection';
  /** A list of edges which contains the `StartingGridPosition` and cursor to aid in pagination. */
  edges: Array<Maybe<StartingGridPositionEdge>>;
  /** A list of `StartingGridPosition` objects. */
  nodes: Array<Maybe<StartingGridPosition>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `StartingGridPosition` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `StartingGridPosition` edge in the connection. */
export type StartingGridPositionEdge = {
  __typename?: 'StartingGridPositionEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `StartingGridPosition` at the end of the edge. */
  node?: Maybe<StartingGridPosition>;
};

/** An input for mutations affecting `StartingGridPosition` */
export type StartingGridPositionInput = {
  driverId?: InputMaybe<Scalars['String']['input']>;
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  gridPenalty?: InputMaybe<Scalars['String']['input']>;
  gridPenaltyPositions?: InputMaybe<Scalars['Int']['input']>;
  positionDisplayOrder: Scalars['Int']['input'];
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  qualificationPositionNumber?: InputMaybe<Scalars['Int']['input']>;
  qualificationPositionText?: InputMaybe<Scalars['String']['input']>;
  raceId: Scalars['Int']['input'];
  teamId?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `StartingGridPosition`. */
export enum StartingGridPositionOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  DriverNumberAsc = 'DRIVER_NUMBER_ASC',
  DriverNumberDesc = 'DRIVER_NUMBER_DESC',
  EngineManufacturerIdAsc = 'ENGINE_MANUFACTURER_ID_ASC',
  EngineManufacturerIdDesc = 'ENGINE_MANUFACTURER_ID_DESC',
  GridPenaltyAsc = 'GRID_PENALTY_ASC',
  GridPenaltyDesc = 'GRID_PENALTY_DESC',
  GridPenaltyPositionsAsc = 'GRID_PENALTY_POSITIONS_ASC',
  GridPenaltyPositionsDesc = 'GRID_PENALTY_POSITIONS_DESC',
  Natural = 'NATURAL',
  PositionDisplayOrderAsc = 'POSITION_DISPLAY_ORDER_ASC',
  PositionDisplayOrderDesc = 'POSITION_DISPLAY_ORDER_DESC',
  PositionNumberAsc = 'POSITION_NUMBER_ASC',
  PositionNumberDesc = 'POSITION_NUMBER_DESC',
  PositionTextAsc = 'POSITION_TEXT_ASC',
  PositionTextDesc = 'POSITION_TEXT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  QualificationPositionNumberAsc = 'QUALIFICATION_POSITION_NUMBER_ASC',
  QualificationPositionNumberDesc = 'QUALIFICATION_POSITION_NUMBER_DESC',
  QualificationPositionTextAsc = 'QUALIFICATION_POSITION_TEXT_ASC',
  QualificationPositionTextDesc = 'QUALIFICATION_POSITION_TEXT_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  TimeAsc = 'TIME_ASC',
  TimeDesc = 'TIME_DESC',
  TimeMillisAsc = 'TIME_MILLIS_ASC',
  TimeMillisDesc = 'TIME_MILLIS_DESC',
  TyreManufacturerIdAsc = 'TYRE_MANUFACTURER_ID_ASC',
  TyreManufacturerIdDesc = 'TYRE_MANUFACTURER_ID_DESC'
}

/** Represents an update to a `StartingGridPosition`. Fields that are set will be updated. */
export type StartingGridPositionPatch = {
  driverId?: InputMaybe<Scalars['String']['input']>;
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  gridPenalty?: InputMaybe<Scalars['String']['input']>;
  gridPenaltyPositions?: InputMaybe<Scalars['Int']['input']>;
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  qualificationPositionNumber?: InputMaybe<Scalars['Int']['input']>;
  qualificationPositionText?: InputMaybe<Scalars['String']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

export type Team = Node & {
  __typename?: 'Team';
  /** Reads and enables pagination through a set of `AppTeamHistory`. */
  antecedents: AppTeamHistoryConnection;
  bestChampionshipPosition?: Maybe<Scalars['Int']['output']>;
  bestRaceResult?: Maybe<Scalars['Int']['output']>;
  bestSprintRaceResult?: Maybe<Scalars['Int']['output']>;
  bestStartingGridPosition?: Maybe<Scalars['Int']['output']>;
  bio?: Maybe<WikipediaBio>;
  /** Reads and enables pagination through a set of `Chassis`. */
  chassises: ChassisConnection;
  /** Reads a single `AppTeamColor` that is related to this `Team`. */
  colors?: Maybe<AppTeamColor>;
  /** Reads a single `Country` that is related to this `Team`. */
  country?: Maybe<Country>;
  countryId: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `DriverOfTheDayResult`. */
  driverOfTheDayResults: DriverOfTheDayResultConnection;
  /** Reads and enables pagination through a set of `FastestLap`. */
  fastestLaps: FastestLapConnection;
  fullName: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `PitStop`. */
  pitStops: PitStopConnection;
  /** Reads and enables pagination through a set of `QualifyingResult`. */
  qualifyingResults: QualifyingResultConnection;
  /** Reads and enables pagination through a set of `RaceDatum`. */
  raceData: RaceDatumConnection;
  /** Reads and enables pagination through a set of `RaceResult`. */
  raceResults: RaceResultConnection;
  /** Reads and enables pagination through a set of `RaceTeamStanding`. */
  raceTeamStandings: RaceTeamStandingConnection;
  rowId: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `SeasonEntrantChassis`. */
  seasonEntrantChassises: SeasonEntrantChassisConnection;
  /** Reads and enables pagination through a set of `SeasonEntrantDriver`. */
  seasonEntrantDrivers: SeasonEntrantDriverConnection;
  /** Reads and enables pagination through a set of `SeasonEntrantEngine`. */
  seasonEntrantEngines: SeasonEntrantEngineConnection;
  /** Reads and enables pagination through a set of `SeasonEntrantTeam`. */
  seasonEntrantTeams: SeasonEntrantTeamConnection;
  /** Reads and enables pagination through a set of `SeasonEntrantTyreManufacturer`. */
  seasonEntrantTyreManufacturers: SeasonEntrantTyreManufacturerConnection;
  /** Reads and enables pagination through a set of `SeasonTeamStanding`. */
  seasonTeamStandings: SeasonTeamStandingConnection;
  /** Reads and enables pagination through a set of `SeasonTeam`. */
  seasonTeams: SeasonTeamConnection;
  /** Reads and enables pagination through a set of `SprintQualifyingResult`. */
  sprintQualifyingResults: SprintQualifyingResultConnection;
  /** Reads and enables pagination through a set of `SprintRaceResult`. */
  sprintRaceResults: SprintRaceResultConnection;
  /** Reads and enables pagination through a set of `SprintStartingGridPosition`. */
  sprintStartingGridPositions: SprintStartingGridPositionConnection;
  /** Reads and enables pagination through a set of `StartingGridPosition`. */
  startingGridPositions: StartingGridPositionConnection;
  /** Reads and enables pagination through a set of `AppTeamHistory`. */
  successors: AppTeamHistoryConnection;
  /** Reads and enables pagination through a set of `TeamChronology`. */
  teamChronologies: TeamChronologyConnection;
  /** Reads and enables pagination through a set of `TeamChronology`. */
  teamChronologiesByOtherTeamId: TeamChronologyConnection;
  total1And2Finishes: Scalars['Int']['output'];
  totalChampionshipPoints: Scalars['BigFloat']['output'];
  totalChampionshipWins: Scalars['Int']['output'];
  totalFastestLaps: Scalars['Int']['output'];
  totalPodiumRaces: Scalars['Int']['output'];
  totalPodiums: Scalars['Int']['output'];
  totalPoints: Scalars['BigFloat']['output'];
  totalPolePositions: Scalars['Int']['output'];
  totalRaceEntries: Scalars['Int']['output'];
  totalRaceLaps: Scalars['Int']['output'];
  totalRaceStarts: Scalars['Int']['output'];
  totalRaceWins: Scalars['Int']['output'];
  totalSprintRaceStarts: Scalars['Int']['output'];
  totalSprintRaceWins: Scalars['Int']['output'];
};


export type TeamAntecedentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AppTeamHistoryCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AppTeamHistoryOrderBy>>;
};


export type TeamChassisesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ChassisCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ChassisOrderBy>>;
};


export type TeamDriverOfTheDayResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DriverOfTheDayResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverOfTheDayResultOrderBy>>;
};


export type TeamFastestLapsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<FastestLapCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FastestLapOrderBy>>;
};


export type TeamPitStopsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PitStopCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PitStopOrderBy>>;
};


export type TeamQualifyingResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<QualifyingResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<QualifyingResultOrderBy>>;
};


export type TeamRaceDataArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RaceDatumCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceDatumOrderBy>>;
};


export type TeamRaceResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RaceResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceResultOrderBy>>;
};


export type TeamRaceTeamStandingsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RaceTeamStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceTeamStandingOrderBy>>;
};


export type TeamSeasonEntrantChassisesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantChassisCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantChassisOrderBy>>;
};


export type TeamSeasonEntrantDriversArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantDriverCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantDriverOrderBy>>;
};


export type TeamSeasonEntrantEnginesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantEngineCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantEngineOrderBy>>;
};


export type TeamSeasonEntrantTeamsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantTeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantTeamOrderBy>>;
};


export type TeamSeasonEntrantTyreManufacturersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantTyreManufacturerCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantTyreManufacturerOrderBy>>;
};


export type TeamSeasonTeamStandingsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonTeamStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonTeamStandingOrderBy>>;
};


export type TeamSeasonTeamsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonTeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonTeamOrderBy>>;
};


export type TeamSprintQualifyingResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SprintQualifyingResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintQualifyingResultOrderBy>>;
};


export type TeamSprintRaceResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SprintRaceResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintRaceResultOrderBy>>;
};


export type TeamSprintStartingGridPositionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SprintStartingGridPositionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintStartingGridPositionOrderBy>>;
};


export type TeamStartingGridPositionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<StartingGridPositionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StartingGridPositionOrderBy>>;
};


export type TeamSuccessorsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AppTeamHistoryCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AppTeamHistoryOrderBy>>;
};


export type TeamTeamChronologiesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TeamChronologyCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamChronologyOrderBy>>;
};


export type TeamTeamChronologiesByOtherTeamIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TeamChronologyCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamChronologyOrderBy>>;
};

export type TeamChronology = Node & {
  __typename?: 'TeamChronology';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `Team` that is related to this `TeamChronology`. */
  otherTeam?: Maybe<Team>;
  otherTeamId: Scalars['String']['output'];
  positionDisplayOrder: Scalars['Int']['output'];
  /** Reads a single `Team` that is related to this `TeamChronology`. */
  team?: Maybe<Team>;
  teamId: Scalars['String']['output'];
  yearFrom: Scalars['Int']['output'];
  yearTo?: Maybe<Scalars['Int']['output']>;
};

/**
 * A condition to be used against `TeamChronology` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type TeamChronologyCondition = {
  /** Checks for equality with the object’s `otherTeamId` field. */
  otherTeamId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `positionDisplayOrder` field. */
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `yearFrom` field. */
  yearFrom?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `yearTo` field. */
  yearTo?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `TeamChronology` values. */
export type TeamChronologyConnection = {
  __typename?: 'TeamChronologyConnection';
  /** A list of edges which contains the `TeamChronology` and cursor to aid in pagination. */
  edges: Array<Maybe<TeamChronologyEdge>>;
  /** A list of `TeamChronology` objects. */
  nodes: Array<Maybe<TeamChronology>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TeamChronology` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `TeamChronology` edge in the connection. */
export type TeamChronologyEdge = {
  __typename?: 'TeamChronologyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `TeamChronology` at the end of the edge. */
  node?: Maybe<TeamChronology>;
};

/** An input for mutations affecting `TeamChronology` */
export type TeamChronologyInput = {
  otherTeamId: Scalars['String']['input'];
  positionDisplayOrder: Scalars['Int']['input'];
  teamId: Scalars['String']['input'];
  yearFrom: Scalars['Int']['input'];
  yearTo?: InputMaybe<Scalars['Int']['input']>;
};

/** Methods to use when ordering `TeamChronology`. */
export enum TeamChronologyOrderBy {
  Natural = 'NATURAL',
  OtherTeamIdAsc = 'OTHER_TEAM_ID_ASC',
  OtherTeamIdDesc = 'OTHER_TEAM_ID_DESC',
  PositionDisplayOrderAsc = 'POSITION_DISPLAY_ORDER_ASC',
  PositionDisplayOrderDesc = 'POSITION_DISPLAY_ORDER_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  YearFromAsc = 'YEAR_FROM_ASC',
  YearFromDesc = 'YEAR_FROM_DESC',
  YearToAsc = 'YEAR_TO_ASC',
  YearToDesc = 'YEAR_TO_DESC'
}

/** Represents an update to a `TeamChronology`. Fields that are set will be updated. */
export type TeamChronologyPatch = {
  otherTeamId?: InputMaybe<Scalars['String']['input']>;
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
  yearFrom?: InputMaybe<Scalars['Int']['input']>;
  yearTo?: InputMaybe<Scalars['Int']['input']>;
};

/** A condition to be used against `Team` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type TeamCondition = {
  /** Checks for equality with the object’s `countryId` field. */
  countryId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `fullName` field. */
  fullName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `Team` values. */
export type TeamConnection = {
  __typename?: 'TeamConnection';
  /** A list of edges which contains the `Team` and cursor to aid in pagination. */
  edges: Array<Maybe<TeamEdge>>;
  /** A list of `Team` objects. */
  nodes: Array<Maybe<Team>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Team` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Team` edge in the connection. */
export type TeamEdge = {
  __typename?: 'TeamEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Team` at the end of the edge. */
  node?: Maybe<Team>;
};

/** An input for mutations affecting `Team` */
export type TeamInput = {
  bestChampionshipPosition?: InputMaybe<Scalars['Int']['input']>;
  bestRaceResult?: InputMaybe<Scalars['Int']['input']>;
  bestSprintRaceResult?: InputMaybe<Scalars['Int']['input']>;
  bestStartingGridPosition?: InputMaybe<Scalars['Int']['input']>;
  countryId: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  name: Scalars['String']['input'];
  rowId: Scalars['String']['input'];
  total1And2Finishes: Scalars['Int']['input'];
  totalChampionshipPoints: Scalars['BigFloat']['input'];
  totalChampionshipWins: Scalars['Int']['input'];
  totalFastestLaps: Scalars['Int']['input'];
  totalPodiumRaces: Scalars['Int']['input'];
  totalPodiums: Scalars['Int']['input'];
  totalPoints: Scalars['BigFloat']['input'];
  totalPolePositions: Scalars['Int']['input'];
  totalRaceEntries: Scalars['Int']['input'];
  totalRaceLaps: Scalars['Int']['input'];
  totalRaceStarts: Scalars['Int']['input'];
  totalRaceWins: Scalars['Int']['input'];
  totalSprintRaceStarts: Scalars['Int']['input'];
  totalSprintRaceWins: Scalars['Int']['input'];
};

/** Methods to use when ordering `Team`. */
export enum TeamOrderBy {
  CountryIdAsc = 'COUNTRY_ID_ASC',
  CountryIdDesc = 'COUNTRY_ID_DESC',
  FullNameAsc = 'FULL_NAME_ASC',
  FullNameDesc = 'FULL_NAME_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** Represents an update to a `Team`. Fields that are set will be updated. */
export type TeamPatch = {
  bestChampionshipPosition?: InputMaybe<Scalars['Int']['input']>;
  bestRaceResult?: InputMaybe<Scalars['Int']['input']>;
  bestSprintRaceResult?: InputMaybe<Scalars['Int']['input']>;
  bestStartingGridPosition?: InputMaybe<Scalars['Int']['input']>;
  countryId?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['String']['input']>;
  total1And2Finishes?: InputMaybe<Scalars['Int']['input']>;
  totalChampionshipPoints?: InputMaybe<Scalars['BigFloat']['input']>;
  totalChampionshipWins?: InputMaybe<Scalars['Int']['input']>;
  totalFastestLaps?: InputMaybe<Scalars['Int']['input']>;
  totalPodiumRaces?: InputMaybe<Scalars['Int']['input']>;
  totalPodiums?: InputMaybe<Scalars['Int']['input']>;
  totalPoints?: InputMaybe<Scalars['BigFloat']['input']>;
  totalPolePositions?: InputMaybe<Scalars['Int']['input']>;
  totalRaceEntries?: InputMaybe<Scalars['Int']['input']>;
  totalRaceLaps?: InputMaybe<Scalars['Int']['input']>;
  totalRaceStarts?: InputMaybe<Scalars['Int']['input']>;
  totalRaceWins?: InputMaybe<Scalars['Int']['input']>;
  totalSprintRaceStarts?: InputMaybe<Scalars['Int']['input']>;
  totalSprintRaceWins?: InputMaybe<Scalars['Int']['input']>;
};

export type TyreManufacturer = Node & {
  __typename?: 'TyreManufacturer';
  bestRaceResult?: Maybe<Scalars['Int']['output']>;
  bestSprintRaceResult?: Maybe<Scalars['Int']['output']>;
  bestStartingGridPosition?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `Country` that is related to this `TyreManufacturer`. */
  country?: Maybe<Country>;
  countryId: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `RaceDatum`. */
  raceData: RaceDatumConnection;
  rowId: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `SeasonEntrantTyreManufacturer`. */
  seasonEntrantTyreManufacturers: SeasonEntrantTyreManufacturerConnection;
  /** Reads and enables pagination through a set of `SeasonTyreManufacturer`. */
  seasonTyreManufacturers: SeasonTyreManufacturerConnection;
  totalFastestLaps: Scalars['Int']['output'];
  totalPodiumRaces: Scalars['Int']['output'];
  totalPodiums: Scalars['Int']['output'];
  totalPolePositions: Scalars['Int']['output'];
  totalRaceEntries: Scalars['Int']['output'];
  totalRaceLaps: Scalars['Int']['output'];
  totalRaceStarts: Scalars['Int']['output'];
  totalRaceWins: Scalars['Int']['output'];
  totalSprintRaceStarts: Scalars['Int']['output'];
  totalSprintRaceWins: Scalars['Int']['output'];
};


export type TyreManufacturerRaceDataArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RaceDatumCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceDatumOrderBy>>;
};


export type TyreManufacturerSeasonEntrantTyreManufacturersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonEntrantTyreManufacturerCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantTyreManufacturerOrderBy>>;
};


export type TyreManufacturerSeasonTyreManufacturersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SeasonTyreManufacturerCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonTyreManufacturerOrderBy>>;
};

/**
 * A condition to be used against `TyreManufacturer` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type TyreManufacturerCondition = {
  /** Checks for equality with the object’s `countryId` field. */
  countryId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `TyreManufacturer` values. */
export type TyreManufacturerConnection = {
  __typename?: 'TyreManufacturerConnection';
  /** A list of edges which contains the `TyreManufacturer` and cursor to aid in pagination. */
  edges: Array<Maybe<TyreManufacturerEdge>>;
  /** A list of `TyreManufacturer` objects. */
  nodes: Array<Maybe<TyreManufacturer>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TyreManufacturer` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `TyreManufacturer` edge in the connection. */
export type TyreManufacturerEdge = {
  __typename?: 'TyreManufacturerEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `TyreManufacturer` at the end of the edge. */
  node?: Maybe<TyreManufacturer>;
};

/** An input for mutations affecting `TyreManufacturer` */
export type TyreManufacturerInput = {
  bestRaceResult?: InputMaybe<Scalars['Int']['input']>;
  bestSprintRaceResult?: InputMaybe<Scalars['Int']['input']>;
  bestStartingGridPosition?: InputMaybe<Scalars['Int']['input']>;
  countryId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  rowId: Scalars['String']['input'];
  totalFastestLaps: Scalars['Int']['input'];
  totalPodiumRaces: Scalars['Int']['input'];
  totalPodiums: Scalars['Int']['input'];
  totalPolePositions: Scalars['Int']['input'];
  totalRaceEntries: Scalars['Int']['input'];
  totalRaceLaps: Scalars['Int']['input'];
  totalRaceStarts: Scalars['Int']['input'];
  totalRaceWins: Scalars['Int']['input'];
  totalSprintRaceStarts: Scalars['Int']['input'];
  totalSprintRaceWins: Scalars['Int']['input'];
};

/** Methods to use when ordering `TyreManufacturer`. */
export enum TyreManufacturerOrderBy {
  CountryIdAsc = 'COUNTRY_ID_ASC',
  CountryIdDesc = 'COUNTRY_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** Represents an update to a `TyreManufacturer`. Fields that are set will be updated. */
export type TyreManufacturerPatch = {
  bestRaceResult?: InputMaybe<Scalars['Int']['input']>;
  bestSprintRaceResult?: InputMaybe<Scalars['Int']['input']>;
  bestStartingGridPosition?: InputMaybe<Scalars['Int']['input']>;
  countryId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['String']['input']>;
  totalFastestLaps?: InputMaybe<Scalars['Int']['input']>;
  totalPodiumRaces?: InputMaybe<Scalars['Int']['input']>;
  totalPodiums?: InputMaybe<Scalars['Int']['input']>;
  totalPolePositions?: InputMaybe<Scalars['Int']['input']>;
  totalRaceEntries?: InputMaybe<Scalars['Int']['input']>;
  totalRaceLaps?: InputMaybe<Scalars['Int']['input']>;
  totalRaceStarts?: InputMaybe<Scalars['Int']['input']>;
  totalRaceWins?: InputMaybe<Scalars['Int']['input']>;
  totalSprintRaceStarts?: InputMaybe<Scalars['Int']['input']>;
  totalSprintRaceWins?: InputMaybe<Scalars['Int']['input']>;
};

/** All input for the `updateAppCircuitDescriptionById` mutation. */
export type UpdateAppCircuitDescriptionByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `AppCircuitDescription` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `AppCircuitDescription` being updated. */
  patch: AppCircuitDescriptionPatch;
};

/** All input for the `updateAppCircuitDescription` mutation. */
export type UpdateAppCircuitDescriptionInput = {
  circuitId: Scalars['String']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `AppCircuitDescription` being updated. */
  patch: AppCircuitDescriptionPatch;
};

/** The output of our update `AppCircuitDescription` mutation. */
export type UpdateAppCircuitDescriptionPayload = {
  __typename?: 'UpdateAppCircuitDescriptionPayload';
  /** The `AppCircuitDescription` that was updated by this mutation. */
  appCircuitDescription?: Maybe<AppCircuitDescription>;
  /** An edge for our `AppCircuitDescription`. May be used by Relay 1. */
  appCircuitDescriptionEdge?: Maybe<AppCircuitDescriptionEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `AppCircuitDescription` mutation. */
export type UpdateAppCircuitDescriptionPayloadAppCircuitDescriptionEdgeArgs = {
  orderBy?: Array<AppCircuitDescriptionOrderBy>;
};

/** All input for the `updateAppConstructorBioById` mutation. */
export type UpdateAppConstructorBioByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `AppConstructorBio` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `AppConstructorBio` being updated. */
  patch: AppConstructorBioPatch;
};

/** All input for the `updateAppConstructorBio` mutation. */
export type UpdateAppConstructorBioInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `AppConstructorBio` being updated. */
  patch: AppConstructorBioPatch;
  teamId: Scalars['String']['input'];
};

/** The output of our update `AppConstructorBio` mutation. */
export type UpdateAppConstructorBioPayload = {
  __typename?: 'UpdateAppConstructorBioPayload';
  /** The `AppConstructorBio` that was updated by this mutation. */
  appConstructorBio?: Maybe<AppConstructorBio>;
  /** An edge for our `AppConstructorBio`. May be used by Relay 1. */
  appConstructorBioEdge?: Maybe<AppConstructorBioEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `AppConstructorBio` mutation. */
export type UpdateAppConstructorBioPayloadAppConstructorBioEdgeArgs = {
  orderBy?: Array<AppConstructorBioOrderBy>;
};

/** All input for the `updateAppDriverBioById` mutation. */
export type UpdateAppDriverBioByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `AppDriverBio` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `AppDriverBio` being updated. */
  patch: AppDriverBioPatch;
};

/** All input for the `updateAppDriverBio` mutation. */
export type UpdateAppDriverBioInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  driverId: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `AppDriverBio` being updated. */
  patch: AppDriverBioPatch;
};

/** The output of our update `AppDriverBio` mutation. */
export type UpdateAppDriverBioPayload = {
  __typename?: 'UpdateAppDriverBioPayload';
  /** The `AppDriverBio` that was updated by this mutation. */
  appDriverBio?: Maybe<AppDriverBio>;
  /** An edge for our `AppDriverBio`. May be used by Relay 1. */
  appDriverBioEdge?: Maybe<AppDriverBioEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `AppDriverBio` mutation. */
export type UpdateAppDriverBioPayloadAppDriverBioEdgeArgs = {
  orderBy?: Array<AppDriverBioOrderBy>;
};

/** All input for the `updateAppIngestStateById` mutation. */
export type UpdateAppIngestStateByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `AppIngestState` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `AppIngestState` being updated. */
  patch: AppIngestStatePatch;
};

/** All input for the `updateAppIngestState` mutation. */
export type UpdateAppIngestStateInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  key: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `AppIngestState` being updated. */
  patch: AppIngestStatePatch;
};

/** The output of our update `AppIngestState` mutation. */
export type UpdateAppIngestStatePayload = {
  __typename?: 'UpdateAppIngestStatePayload';
  /** The `AppIngestState` that was updated by this mutation. */
  appIngestState?: Maybe<AppIngestState>;
  /** An edge for our `AppIngestState`. May be used by Relay 1. */
  appIngestStateEdge?: Maybe<AppIngestStateEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `AppIngestState` mutation. */
export type UpdateAppIngestStatePayloadAppIngestStateEdgeArgs = {
  orderBy?: Array<AppIngestStateOrderBy>;
};

/** All input for the `updateAppLapTimeById` mutation. */
export type UpdateAppLapTimeByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `AppLapTime` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `AppLapTime` being updated. */
  patch: AppLapTimePatch;
};

/** All input for the `updateAppLapTime` mutation. */
export type UpdateAppLapTimeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  driverId: Scalars['String']['input'];
  lap: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `AppLapTime` being updated. */
  patch: AppLapTimePatch;
  raceId: Scalars['Int']['input'];
};

/** The output of our update `AppLapTime` mutation. */
export type UpdateAppLapTimePayload = {
  __typename?: 'UpdateAppLapTimePayload';
  /** The `AppLapTime` that was updated by this mutation. */
  appLapTime?: Maybe<AppLapTime>;
  /** An edge for our `AppLapTime`. May be used by Relay 1. */
  appLapTimeEdge?: Maybe<AppLapTimeEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `AppLapTime` mutation. */
export type UpdateAppLapTimePayloadAppLapTimeEdgeArgs = {
  orderBy?: Array<AppLapTimeOrderBy>;
};

/** All input for the `updateAppTeamColorById` mutation. */
export type UpdateAppTeamColorByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `AppTeamColor` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `AppTeamColor` being updated. */
  patch: AppTeamColorPatch;
};

/** All input for the `updateAppTeamColor` mutation. */
export type UpdateAppTeamColorInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `AppTeamColor` being updated. */
  patch: AppTeamColorPatch;
  teamId: Scalars['String']['input'];
};

/** The output of our update `AppTeamColor` mutation. */
export type UpdateAppTeamColorPayload = {
  __typename?: 'UpdateAppTeamColorPayload';
  /** The `AppTeamColor` that was updated by this mutation. */
  appTeamColor?: Maybe<AppTeamColor>;
  /** An edge for our `AppTeamColor`. May be used by Relay 1. */
  appTeamColorEdge?: Maybe<AppTeamColorEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `AppTeamColor` mutation. */
export type UpdateAppTeamColorPayloadAppTeamColorEdgeArgs = {
  orderBy?: Array<AppTeamColorOrderBy>;
};

/** All input for the `updateAppTeamHistoryById` mutation. */
export type UpdateAppTeamHistoryByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `AppTeamHistory` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `AppTeamHistory` being updated. */
  patch: AppTeamHistoryPatch;
};

/** All input for the `updateAppTeamHistory` mutation. */
export type UpdateAppTeamHistoryInput = {
  antecedentTeamId: Scalars['String']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `AppTeamHistory` being updated. */
  patch: AppTeamHistoryPatch;
  startYear: Scalars['Int']['input'];
  teamId: Scalars['String']['input'];
};

/** The output of our update `AppTeamHistory` mutation. */
export type UpdateAppTeamHistoryPayload = {
  __typename?: 'UpdateAppTeamHistoryPayload';
  /** The `AppTeamHistory` that was updated by this mutation. */
  appTeamHistory?: Maybe<AppTeamHistory>;
  /** An edge for our `AppTeamHistory`. May be used by Relay 1. */
  appTeamHistoryEdge?: Maybe<AppTeamHistoryEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `AppTeamHistory` mutation. */
export type UpdateAppTeamHistoryPayloadAppTeamHistoryEdgeArgs = {
  orderBy?: Array<AppTeamHistoryOrderBy>;
};

/** All input for the `updateChassisById` mutation. */
export type UpdateChassisByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Chassis` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Chassis` being updated. */
  patch: ChassisPatch;
};

/** All input for the `updateChassis` mutation. */
export type UpdateChassisInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Chassis` being updated. */
  patch: ChassisPatch;
  rowId: Scalars['String']['input'];
};

/** The output of our update `Chassis` mutation. */
export type UpdateChassisPayload = {
  __typename?: 'UpdateChassisPayload';
  /** The `Chassis` that was updated by this mutation. */
  chassis?: Maybe<Chassis>;
  /** An edge for our `Chassis`. May be used by Relay 1. */
  chassisEdge?: Maybe<ChassisEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Chassis` mutation. */
export type UpdateChassisPayloadChassisEdgeArgs = {
  orderBy?: Array<ChassisOrderBy>;
};

/** All input for the `updateCircuitById` mutation. */
export type UpdateCircuitByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Circuit` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Circuit` being updated. */
  patch: CircuitPatch;
};

/** All input for the `updateCircuit` mutation. */
export type UpdateCircuitInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Circuit` being updated. */
  patch: CircuitPatch;
  rowId: Scalars['String']['input'];
};

/** All input for the `updateCircuitLayoutById` mutation. */
export type UpdateCircuitLayoutByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `CircuitLayout` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `CircuitLayout` being updated. */
  patch: CircuitLayoutPatch;
};

/** All input for the `updateCircuitLayout` mutation. */
export type UpdateCircuitLayoutInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `CircuitLayout` being updated. */
  patch: CircuitLayoutPatch;
  rowId: Scalars['String']['input'];
};

/** The output of our update `CircuitLayout` mutation. */
export type UpdateCircuitLayoutPayload = {
  __typename?: 'UpdateCircuitLayoutPayload';
  /** The `CircuitLayout` that was updated by this mutation. */
  circuitLayout?: Maybe<CircuitLayout>;
  /** An edge for our `CircuitLayout`. May be used by Relay 1. */
  circuitLayoutEdge?: Maybe<CircuitLayoutEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `CircuitLayout` mutation. */
export type UpdateCircuitLayoutPayloadCircuitLayoutEdgeArgs = {
  orderBy?: Array<CircuitLayoutOrderBy>;
};

/** The output of our update `Circuit` mutation. */
export type UpdateCircuitPayload = {
  __typename?: 'UpdateCircuitPayload';
  /** The `Circuit` that was updated by this mutation. */
  circuit?: Maybe<Circuit>;
  /** An edge for our `Circuit`. May be used by Relay 1. */
  circuitEdge?: Maybe<CircuitEdge>;
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
  orderBy?: Array<CircuitOrderBy>;
};

/** All input for the `updateContinentByCode` mutation. */
export type UpdateContinentByCodeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  code: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `Continent` being updated. */
  patch: ContinentPatch;
};

/** All input for the `updateContinentById` mutation. */
export type UpdateContinentByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Continent` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Continent` being updated. */
  patch: ContinentPatch;
};

/** All input for the `updateContinentByName` mutation. */
export type UpdateContinentByNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `Continent` being updated. */
  patch: ContinentPatch;
};

/** All input for the `updateContinent` mutation. */
export type UpdateContinentInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Continent` being updated. */
  patch: ContinentPatch;
  rowId: Scalars['String']['input'];
};

/** The output of our update `Continent` mutation. */
export type UpdateContinentPayload = {
  __typename?: 'UpdateContinentPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Continent` that was updated by this mutation. */
  continent?: Maybe<Continent>;
  /** An edge for our `Continent`. May be used by Relay 1. */
  continentEdge?: Maybe<ContinentEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Continent` mutation. */
export type UpdateContinentPayloadContinentEdgeArgs = {
  orderBy?: Array<ContinentOrderBy>;
};

/** All input for the `updateCountryByAlpha2Code` mutation. */
export type UpdateCountryByAlpha2CodeInput = {
  alpha2Code: Scalars['String']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Country` being updated. */
  patch: CountryPatch;
};

/** All input for the `updateCountryByAlpha3Code` mutation. */
export type UpdateCountryByAlpha3CodeInput = {
  alpha3Code: Scalars['String']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Country` being updated. */
  patch: CountryPatch;
};

/** All input for the `updateCountryById` mutation. */
export type UpdateCountryByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Country` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Country` being updated. */
  patch: CountryPatch;
};

/** All input for the `updateCountryByName` mutation. */
export type UpdateCountryByNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `Country` being updated. */
  patch: CountryPatch;
};

/** All input for the `updateCountry` mutation. */
export type UpdateCountryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Country` being updated. */
  patch: CountryPatch;
  rowId: Scalars['String']['input'];
};

/** The output of our update `Country` mutation. */
export type UpdateCountryPayload = {
  __typename?: 'UpdateCountryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Country` that was updated by this mutation. */
  country?: Maybe<Country>;
  /** An edge for our `Country`. May be used by Relay 1. */
  countryEdge?: Maybe<CountryEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Country` mutation. */
export type UpdateCountryPayloadCountryEdgeArgs = {
  orderBy?: Array<CountryOrderBy>;
};

/** All input for the `updateDriverById` mutation. */
export type UpdateDriverByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Driver` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Driver` being updated. */
  patch: DriverPatch;
};

/** All input for the `updateDriverFamilyRelationshipByDriverIdAndOtherDriverIdAndType` mutation. */
export type UpdateDriverFamilyRelationshipByDriverIdAndOtherDriverIdAndTypeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  driverId: Scalars['String']['input'];
  otherDriverId: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `DriverFamilyRelationship` being updated. */
  patch: DriverFamilyRelationshipPatch;
  type: Scalars['String']['input'];
};

/** All input for the `updateDriverFamilyRelationshipById` mutation. */
export type UpdateDriverFamilyRelationshipByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `DriverFamilyRelationship` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `DriverFamilyRelationship` being updated. */
  patch: DriverFamilyRelationshipPatch;
};

/** All input for the `updateDriverFamilyRelationship` mutation. */
export type UpdateDriverFamilyRelationshipInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  driverId: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `DriverFamilyRelationship` being updated. */
  patch: DriverFamilyRelationshipPatch;
  positionDisplayOrder: Scalars['Int']['input'];
};

/** The output of our update `DriverFamilyRelationship` mutation. */
export type UpdateDriverFamilyRelationshipPayload = {
  __typename?: 'UpdateDriverFamilyRelationshipPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `DriverFamilyRelationship` that was updated by this mutation. */
  driverFamilyRelationship?: Maybe<DriverFamilyRelationship>;
  /** An edge for our `DriverFamilyRelationship`. May be used by Relay 1. */
  driverFamilyRelationshipEdge?: Maybe<DriverFamilyRelationshipEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `DriverFamilyRelationship` mutation. */
export type UpdateDriverFamilyRelationshipPayloadDriverFamilyRelationshipEdgeArgs = {
  orderBy?: Array<DriverFamilyRelationshipOrderBy>;
};

/** All input for the `updateDriver` mutation. */
export type UpdateDriverInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Driver` being updated. */
  patch: DriverPatch;
  rowId: Scalars['String']['input'];
};

/** All input for the `updateDriverOfTheDayResultById` mutation. */
export type UpdateDriverOfTheDayResultByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `DriverOfTheDayResult` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `DriverOfTheDayResult` being updated. */
  patch: DriverOfTheDayResultPatch;
};

/** All input for the `updateDriverOfTheDayResult` mutation. */
export type UpdateDriverOfTheDayResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `DriverOfTheDayResult` being updated. */
  patch: DriverOfTheDayResultPatch;
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};

/** The output of our update `DriverOfTheDayResult` mutation. */
export type UpdateDriverOfTheDayResultPayload = {
  __typename?: 'UpdateDriverOfTheDayResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `DriverOfTheDayResult` that was updated by this mutation. */
  driverOfTheDayResult?: Maybe<DriverOfTheDayResult>;
  /** An edge for our `DriverOfTheDayResult`. May be used by Relay 1. */
  driverOfTheDayResultEdge?: Maybe<DriverOfTheDayResultEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `DriverOfTheDayResult` mutation. */
export type UpdateDriverOfTheDayResultPayloadDriverOfTheDayResultEdgeArgs = {
  orderBy?: Array<DriverOfTheDayResultOrderBy>;
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
  driverEdge?: Maybe<DriverEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Driver` mutation. */
export type UpdateDriverPayloadDriverEdgeArgs = {
  orderBy?: Array<DriverOrderBy>;
};

/** All input for the `updateEngineById` mutation. */
export type UpdateEngineByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Engine` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Engine` being updated. */
  patch: EnginePatch;
};

/** All input for the `updateEngine` mutation. */
export type UpdateEngineInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Engine` being updated. */
  patch: EnginePatch;
  rowId: Scalars['String']['input'];
};

/** All input for the `updateEngineManufacturerById` mutation. */
export type UpdateEngineManufacturerByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `EngineManufacturer` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `EngineManufacturer` being updated. */
  patch: EngineManufacturerPatch;
};

/** All input for the `updateEngineManufacturer` mutation. */
export type UpdateEngineManufacturerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `EngineManufacturer` being updated. */
  patch: EngineManufacturerPatch;
  rowId: Scalars['String']['input'];
};

/** The output of our update `EngineManufacturer` mutation. */
export type UpdateEngineManufacturerPayload = {
  __typename?: 'UpdateEngineManufacturerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `EngineManufacturer` that was updated by this mutation. */
  engineManufacturer?: Maybe<EngineManufacturer>;
  /** An edge for our `EngineManufacturer`. May be used by Relay 1. */
  engineManufacturerEdge?: Maybe<EngineManufacturerEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `EngineManufacturer` mutation. */
export type UpdateEngineManufacturerPayloadEngineManufacturerEdgeArgs = {
  orderBy?: Array<EngineManufacturerOrderBy>;
};

/** The output of our update `Engine` mutation. */
export type UpdateEnginePayload = {
  __typename?: 'UpdateEnginePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Engine` that was updated by this mutation. */
  engine?: Maybe<Engine>;
  /** An edge for our `Engine`. May be used by Relay 1. */
  engineEdge?: Maybe<EngineEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Engine` mutation. */
export type UpdateEnginePayloadEngineEdgeArgs = {
  orderBy?: Array<EngineOrderBy>;
};

/** All input for the `updateEntrantById` mutation. */
export type UpdateEntrantByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Entrant` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Entrant` being updated. */
  patch: EntrantPatch;
};

/** All input for the `updateEntrant` mutation. */
export type UpdateEntrantInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Entrant` being updated. */
  patch: EntrantPatch;
  rowId: Scalars['String']['input'];
};

/** The output of our update `Entrant` mutation. */
export type UpdateEntrantPayload = {
  __typename?: 'UpdateEntrantPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Entrant` that was updated by this mutation. */
  entrant?: Maybe<Entrant>;
  /** An edge for our `Entrant`. May be used by Relay 1. */
  entrantEdge?: Maybe<EntrantEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Entrant` mutation. */
export type UpdateEntrantPayloadEntrantEdgeArgs = {
  orderBy?: Array<EntrantOrderBy>;
};

/** All input for the `updateFastestLapById` mutation. */
export type UpdateFastestLapByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `FastestLap` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `FastestLap` being updated. */
  patch: FastestLapPatch;
};

/** All input for the `updateFastestLap` mutation. */
export type UpdateFastestLapInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `FastestLap` being updated. */
  patch: FastestLapPatch;
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};

/** The output of our update `FastestLap` mutation. */
export type UpdateFastestLapPayload = {
  __typename?: 'UpdateFastestLapPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `FastestLap` that was updated by this mutation. */
  fastestLap?: Maybe<FastestLap>;
  /** An edge for our `FastestLap`. May be used by Relay 1. */
  fastestLapEdge?: Maybe<FastestLapEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `FastestLap` mutation. */
export type UpdateFastestLapPayloadFastestLapEdgeArgs = {
  orderBy?: Array<FastestLapOrderBy>;
};

/** All input for the `updateGrandPrixById` mutation. */
export type UpdateGrandPrixByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `GrandPrix` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `GrandPrix` being updated. */
  patch: GrandPrixPatch;
};

/** All input for the `updateGrandPrix` mutation. */
export type UpdateGrandPrixInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `GrandPrix` being updated. */
  patch: GrandPrixPatch;
  rowId: Scalars['String']['input'];
};

/** The output of our update `GrandPrix` mutation. */
export type UpdateGrandPrixPayload = {
  __typename?: 'UpdateGrandPrixPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `GrandPrix` that was updated by this mutation. */
  grandPrix?: Maybe<GrandPrix>;
  /** An edge for our `GrandPrix`. May be used by Relay 1. */
  grandPrixEdge?: Maybe<GrandPrixEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `GrandPrix` mutation. */
export type UpdateGrandPrixPayloadGrandPrixEdgeArgs = {
  orderBy?: Array<GrandPrixOrderBy>;
};

/** All input for the `updatePitStopById` mutation. */
export type UpdatePitStopByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `PitStop` to be updated. */
  id: Scalars['ID']['input'];
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
  driverId: Scalars['String']['input'];
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
  /** The `PitStop` that was updated by this mutation. */
  pitStop?: Maybe<PitStop>;
  /** An edge for our `PitStop`. May be used by Relay 1. */
  pitStopEdge?: Maybe<PitStopEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `PitStop` mutation. */
export type UpdatePitStopPayloadPitStopEdgeArgs = {
  orderBy?: Array<PitStopOrderBy>;
};

/** All input for the `updateQualifyingResultById` mutation. */
export type UpdateQualifyingResultByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `QualifyingResult` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `QualifyingResult` being updated. */
  patch: QualifyingResultPatch;
};

/** All input for the `updateQualifyingResult` mutation. */
export type UpdateQualifyingResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `QualifyingResult` being updated. */
  patch: QualifyingResultPatch;
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};

/** The output of our update `QualifyingResult` mutation. */
export type UpdateQualifyingResultPayload = {
  __typename?: 'UpdateQualifyingResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `QualifyingResult` that was updated by this mutation. */
  qualifyingResult?: Maybe<QualifyingResult>;
  /** An edge for our `QualifyingResult`. May be used by Relay 1. */
  qualifyingResultEdge?: Maybe<QualifyingResultEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `QualifyingResult` mutation. */
export type UpdateQualifyingResultPayloadQualifyingResultEdgeArgs = {
  orderBy?: Array<QualifyingResultOrderBy>;
};

/** All input for the `updateRaceById` mutation. */
export type UpdateRaceByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Race` to be updated. */
  id: Scalars['ID']['input'];
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

/** All input for the `updateRaceDatumById` mutation. */
export type UpdateRaceDatumByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `RaceDatum` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `RaceDatum` being updated. */
  patch: RaceDatumPatch;
};

/** All input for the `updateRaceDatum` mutation. */
export type UpdateRaceDatumInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `RaceDatum` being updated. */
  patch: RaceDatumPatch;
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
  type: Scalars['String']['input'];
};

/** The output of our update `RaceDatum` mutation. */
export type UpdateRaceDatumPayload = {
  __typename?: 'UpdateRaceDatumPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `RaceDatum` that was updated by this mutation. */
  raceDatum?: Maybe<RaceDatum>;
  /** An edge for our `RaceDatum`. May be used by Relay 1. */
  raceDatumEdge?: Maybe<RaceDatumEdge>;
};


/** The output of our update `RaceDatum` mutation. */
export type UpdateRaceDatumPayloadRaceDatumEdgeArgs = {
  orderBy?: Array<RaceDatumOrderBy>;
};

/** All input for the `updateRaceDriverStandingById` mutation. */
export type UpdateRaceDriverStandingByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `RaceDriverStanding` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `RaceDriverStanding` being updated. */
  patch: RaceDriverStandingPatch;
};

/** All input for the `updateRaceDriverStanding` mutation. */
export type UpdateRaceDriverStandingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `RaceDriverStanding` being updated. */
  patch: RaceDriverStandingPatch;
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};

/** The output of our update `RaceDriverStanding` mutation. */
export type UpdateRaceDriverStandingPayload = {
  __typename?: 'UpdateRaceDriverStandingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `RaceDriverStanding` that was updated by this mutation. */
  raceDriverStanding?: Maybe<RaceDriverStanding>;
  /** An edge for our `RaceDriverStanding`. May be used by Relay 1. */
  raceDriverStandingEdge?: Maybe<RaceDriverStandingEdge>;
};


/** The output of our update `RaceDriverStanding` mutation. */
export type UpdateRaceDriverStandingPayloadRaceDriverStandingEdgeArgs = {
  orderBy?: Array<RaceDriverStandingOrderBy>;
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
  rowId: Scalars['Int']['input'];
};

/** The output of our update `Race` mutation. */
export type UpdateRacePayload = {
  __typename?: 'UpdateRacePayload';
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
  raceEdge?: Maybe<RaceEdge>;
};


/** The output of our update `Race` mutation. */
export type UpdateRacePayloadRaceEdgeArgs = {
  orderBy?: Array<RaceOrderBy>;
};

/** All input for the `updateRaceResultById` mutation. */
export type UpdateRaceResultByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `RaceResult` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `RaceResult` being updated. */
  patch: RaceResultPatch;
};

/** All input for the `updateRaceResult` mutation. */
export type UpdateRaceResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `RaceResult` being updated. */
  patch: RaceResultPatch;
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};

/** The output of our update `RaceResult` mutation. */
export type UpdateRaceResultPayload = {
  __typename?: 'UpdateRaceResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `RaceResult` that was updated by this mutation. */
  raceResult?: Maybe<RaceResult>;
  /** An edge for our `RaceResult`. May be used by Relay 1. */
  raceResultEdge?: Maybe<RaceResultEdge>;
};


/** The output of our update `RaceResult` mutation. */
export type UpdateRaceResultPayloadRaceResultEdgeArgs = {
  orderBy?: Array<RaceResultOrderBy>;
};

/** All input for the `updateRaceTeamStandingById` mutation. */
export type UpdateRaceTeamStandingByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `RaceTeamStanding` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `RaceTeamStanding` being updated. */
  patch: RaceTeamStandingPatch;
};

/** All input for the `updateRaceTeamStanding` mutation. */
export type UpdateRaceTeamStandingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `RaceTeamStanding` being updated. */
  patch: RaceTeamStandingPatch;
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};

/** The output of our update `RaceTeamStanding` mutation. */
export type UpdateRaceTeamStandingPayload = {
  __typename?: 'UpdateRaceTeamStandingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `RaceTeamStanding` that was updated by this mutation. */
  raceTeamStanding?: Maybe<RaceTeamStanding>;
  /** An edge for our `RaceTeamStanding`. May be used by Relay 1. */
  raceTeamStandingEdge?: Maybe<RaceTeamStandingEdge>;
};


/** The output of our update `RaceTeamStanding` mutation. */
export type UpdateRaceTeamStandingPayloadRaceTeamStandingEdgeArgs = {
  orderBy?: Array<RaceTeamStandingOrderBy>;
};

/** All input for the `updateSeasonById` mutation. */
export type UpdateSeasonByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Season` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Season` being updated. */
  patch: SeasonPatch;
};

/** All input for the `updateSeasonDriverById` mutation. */
export type UpdateSeasonDriverByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SeasonDriver` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `SeasonDriver` being updated. */
  patch: SeasonDriverPatch;
};

/** All input for the `updateSeasonDriver` mutation. */
export type UpdateSeasonDriverInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  driverId: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `SeasonDriver` being updated. */
  patch: SeasonDriverPatch;
  year: Scalars['Int']['input'];
};

/** The output of our update `SeasonDriver` mutation. */
export type UpdateSeasonDriverPayload = {
  __typename?: 'UpdateSeasonDriverPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonDriver` that was updated by this mutation. */
  seasonDriver?: Maybe<SeasonDriver>;
  /** An edge for our `SeasonDriver`. May be used by Relay 1. */
  seasonDriverEdge?: Maybe<SeasonDriverEdge>;
};


/** The output of our update `SeasonDriver` mutation. */
export type UpdateSeasonDriverPayloadSeasonDriverEdgeArgs = {
  orderBy?: Array<SeasonDriverOrderBy>;
};

/** All input for the `updateSeasonDriverStandingById` mutation. */
export type UpdateSeasonDriverStandingByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SeasonDriverStanding` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `SeasonDriverStanding` being updated. */
  patch: SeasonDriverStandingPatch;
};

/** All input for the `updateSeasonDriverStanding` mutation. */
export type UpdateSeasonDriverStandingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `SeasonDriverStanding` being updated. */
  patch: SeasonDriverStandingPatch;
  positionDisplayOrder: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
};

/** The output of our update `SeasonDriverStanding` mutation. */
export type UpdateSeasonDriverStandingPayload = {
  __typename?: 'UpdateSeasonDriverStandingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonDriverStanding` that was updated by this mutation. */
  seasonDriverStanding?: Maybe<SeasonDriverStanding>;
  /** An edge for our `SeasonDriverStanding`. May be used by Relay 1. */
  seasonDriverStandingEdge?: Maybe<SeasonDriverStandingEdge>;
};


/** The output of our update `SeasonDriverStanding` mutation. */
export type UpdateSeasonDriverStandingPayloadSeasonDriverStandingEdgeArgs = {
  orderBy?: Array<SeasonDriverStandingOrderBy>;
};

/** All input for the `updateSeasonEngineManufacturerById` mutation. */
export type UpdateSeasonEngineManufacturerByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SeasonEngineManufacturer` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `SeasonEngineManufacturer` being updated. */
  patch: SeasonEngineManufacturerPatch;
};

/** All input for the `updateSeasonEngineManufacturer` mutation. */
export type UpdateSeasonEngineManufacturerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `SeasonEngineManufacturer` being updated. */
  patch: SeasonEngineManufacturerPatch;
  year: Scalars['Int']['input'];
};

/** The output of our update `SeasonEngineManufacturer` mutation. */
export type UpdateSeasonEngineManufacturerPayload = {
  __typename?: 'UpdateSeasonEngineManufacturerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonEngineManufacturer` that was updated by this mutation. */
  seasonEngineManufacturer?: Maybe<SeasonEngineManufacturer>;
  /** An edge for our `SeasonEngineManufacturer`. May be used by Relay 1. */
  seasonEngineManufacturerEdge?: Maybe<SeasonEngineManufacturerEdge>;
};


/** The output of our update `SeasonEngineManufacturer` mutation. */
export type UpdateSeasonEngineManufacturerPayloadSeasonEngineManufacturerEdgeArgs = {
  orderBy?: Array<SeasonEngineManufacturerOrderBy>;
};

/** All input for the `updateSeasonEntrantById` mutation. */
export type UpdateSeasonEntrantByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SeasonEntrant` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `SeasonEntrant` being updated. */
  patch: SeasonEntrantPatch;
};

/** All input for the `updateSeasonEntrantChassisById` mutation. */
export type UpdateSeasonEntrantChassisByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SeasonEntrantChassis` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `SeasonEntrantChassis` being updated. */
  patch: SeasonEntrantChassisPatch;
};

/** All input for the `updateSeasonEntrantChassis` mutation. */
export type UpdateSeasonEntrantChassisInput = {
  chassisId: Scalars['String']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId: Scalars['String']['input'];
  entrantId: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `SeasonEntrantChassis` being updated. */
  patch: SeasonEntrantChassisPatch;
  teamId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

/** The output of our update `SeasonEntrantChassis` mutation. */
export type UpdateSeasonEntrantChassisPayload = {
  __typename?: 'UpdateSeasonEntrantChassisPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonEntrantChassis` that was updated by this mutation. */
  seasonEntrantChassis?: Maybe<SeasonEntrantChassis>;
  /** An edge for our `SeasonEntrantChassis`. May be used by Relay 1. */
  seasonEntrantChassisEdge?: Maybe<SeasonEntrantChassisEdge>;
};


/** The output of our update `SeasonEntrantChassis` mutation. */
export type UpdateSeasonEntrantChassisPayloadSeasonEntrantChassisEdgeArgs = {
  orderBy?: Array<SeasonEntrantChassisOrderBy>;
};

/** All input for the `updateSeasonEntrantDriverById` mutation. */
export type UpdateSeasonEntrantDriverByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SeasonEntrantDriver` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `SeasonEntrantDriver` being updated. */
  patch: SeasonEntrantDriverPatch;
};

/** All input for the `updateSeasonEntrantDriver` mutation. */
export type UpdateSeasonEntrantDriverInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  driverId: Scalars['String']['input'];
  engineManufacturerId: Scalars['String']['input'];
  entrantId: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `SeasonEntrantDriver` being updated. */
  patch: SeasonEntrantDriverPatch;
  teamId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

/** The output of our update `SeasonEntrantDriver` mutation. */
export type UpdateSeasonEntrantDriverPayload = {
  __typename?: 'UpdateSeasonEntrantDriverPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonEntrantDriver` that was updated by this mutation. */
  seasonEntrantDriver?: Maybe<SeasonEntrantDriver>;
  /** An edge for our `SeasonEntrantDriver`. May be used by Relay 1. */
  seasonEntrantDriverEdge?: Maybe<SeasonEntrantDriverEdge>;
};


/** The output of our update `SeasonEntrantDriver` mutation. */
export type UpdateSeasonEntrantDriverPayloadSeasonEntrantDriverEdgeArgs = {
  orderBy?: Array<SeasonEntrantDriverOrderBy>;
};

/** All input for the `updateSeasonEntrantEngineById` mutation. */
export type UpdateSeasonEntrantEngineByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SeasonEntrantEngine` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `SeasonEntrantEngine` being updated. */
  patch: SeasonEntrantEnginePatch;
};

/** All input for the `updateSeasonEntrantEngine` mutation. */
export type UpdateSeasonEntrantEngineInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  engineId: Scalars['String']['input'];
  engineManufacturerId: Scalars['String']['input'];
  entrantId: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `SeasonEntrantEngine` being updated. */
  patch: SeasonEntrantEnginePatch;
  teamId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

/** The output of our update `SeasonEntrantEngine` mutation. */
export type UpdateSeasonEntrantEnginePayload = {
  __typename?: 'UpdateSeasonEntrantEnginePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonEntrantEngine` that was updated by this mutation. */
  seasonEntrantEngine?: Maybe<SeasonEntrantEngine>;
  /** An edge for our `SeasonEntrantEngine`. May be used by Relay 1. */
  seasonEntrantEngineEdge?: Maybe<SeasonEntrantEngineEdge>;
};


/** The output of our update `SeasonEntrantEngine` mutation. */
export type UpdateSeasonEntrantEnginePayloadSeasonEntrantEngineEdgeArgs = {
  orderBy?: Array<SeasonEntrantEngineOrderBy>;
};

/** All input for the `updateSeasonEntrant` mutation. */
export type UpdateSeasonEntrantInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  entrantId: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `SeasonEntrant` being updated. */
  patch: SeasonEntrantPatch;
  year: Scalars['Int']['input'];
};

/** The output of our update `SeasonEntrant` mutation. */
export type UpdateSeasonEntrantPayload = {
  __typename?: 'UpdateSeasonEntrantPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonEntrant` that was updated by this mutation. */
  seasonEntrant?: Maybe<SeasonEntrant>;
  /** An edge for our `SeasonEntrant`. May be used by Relay 1. */
  seasonEntrantEdge?: Maybe<SeasonEntrantEdge>;
};


/** The output of our update `SeasonEntrant` mutation. */
export type UpdateSeasonEntrantPayloadSeasonEntrantEdgeArgs = {
  orderBy?: Array<SeasonEntrantOrderBy>;
};

/** All input for the `updateSeasonEntrantTeamById` mutation. */
export type UpdateSeasonEntrantTeamByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SeasonEntrantTeam` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `SeasonEntrantTeam` being updated. */
  patch: SeasonEntrantTeamPatch;
};

/** All input for the `updateSeasonEntrantTeam` mutation. */
export type UpdateSeasonEntrantTeamInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId: Scalars['String']['input'];
  entrantId: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `SeasonEntrantTeam` being updated. */
  patch: SeasonEntrantTeamPatch;
  teamId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

/** The output of our update `SeasonEntrantTeam` mutation. */
export type UpdateSeasonEntrantTeamPayload = {
  __typename?: 'UpdateSeasonEntrantTeamPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonEntrantTeam` that was updated by this mutation. */
  seasonEntrantTeam?: Maybe<SeasonEntrantTeam>;
  /** An edge for our `SeasonEntrantTeam`. May be used by Relay 1. */
  seasonEntrantTeamEdge?: Maybe<SeasonEntrantTeamEdge>;
};


/** The output of our update `SeasonEntrantTeam` mutation. */
export type UpdateSeasonEntrantTeamPayloadSeasonEntrantTeamEdgeArgs = {
  orderBy?: Array<SeasonEntrantTeamOrderBy>;
};

/** All input for the `updateSeasonEntrantTyreManufacturerById` mutation. */
export type UpdateSeasonEntrantTyreManufacturerByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SeasonEntrantTyreManufacturer` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `SeasonEntrantTyreManufacturer` being updated. */
  patch: SeasonEntrantTyreManufacturerPatch;
};

/** All input for the `updateSeasonEntrantTyreManufacturer` mutation. */
export type UpdateSeasonEntrantTyreManufacturerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId: Scalars['String']['input'];
  entrantId: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `SeasonEntrantTyreManufacturer` being updated. */
  patch: SeasonEntrantTyreManufacturerPatch;
  teamId: Scalars['String']['input'];
  tyreManufacturerId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

/** The output of our update `SeasonEntrantTyreManufacturer` mutation. */
export type UpdateSeasonEntrantTyreManufacturerPayload = {
  __typename?: 'UpdateSeasonEntrantTyreManufacturerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonEntrantTyreManufacturer` that was updated by this mutation. */
  seasonEntrantTyreManufacturer?: Maybe<SeasonEntrantTyreManufacturer>;
  /** An edge for our `SeasonEntrantTyreManufacturer`. May be used by Relay 1. */
  seasonEntrantTyreManufacturerEdge?: Maybe<SeasonEntrantTyreManufacturerEdge>;
};


/** The output of our update `SeasonEntrantTyreManufacturer` mutation. */
export type UpdateSeasonEntrantTyreManufacturerPayloadSeasonEntrantTyreManufacturerEdgeArgs = {
  orderBy?: Array<SeasonEntrantTyreManufacturerOrderBy>;
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
  seasonEdge?: Maybe<SeasonEdge>;
};


/** The output of our update `Season` mutation. */
export type UpdateSeasonPayloadSeasonEdgeArgs = {
  orderBy?: Array<SeasonOrderBy>;
};

/** All input for the `updateSeasonTeamById` mutation. */
export type UpdateSeasonTeamByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SeasonTeam` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `SeasonTeam` being updated. */
  patch: SeasonTeamPatch;
};

/** All input for the `updateSeasonTeam` mutation. */
export type UpdateSeasonTeamInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `SeasonTeam` being updated. */
  patch: SeasonTeamPatch;
  teamId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

/** The output of our update `SeasonTeam` mutation. */
export type UpdateSeasonTeamPayload = {
  __typename?: 'UpdateSeasonTeamPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonTeam` that was updated by this mutation. */
  seasonTeam?: Maybe<SeasonTeam>;
  /** An edge for our `SeasonTeam`. May be used by Relay 1. */
  seasonTeamEdge?: Maybe<SeasonTeamEdge>;
};


/** The output of our update `SeasonTeam` mutation. */
export type UpdateSeasonTeamPayloadSeasonTeamEdgeArgs = {
  orderBy?: Array<SeasonTeamOrderBy>;
};

/** All input for the `updateSeasonTeamStandingById` mutation. */
export type UpdateSeasonTeamStandingByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SeasonTeamStanding` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `SeasonTeamStanding` being updated. */
  patch: SeasonTeamStandingPatch;
};

/** All input for the `updateSeasonTeamStanding` mutation. */
export type UpdateSeasonTeamStandingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `SeasonTeamStanding` being updated. */
  patch: SeasonTeamStandingPatch;
  positionDisplayOrder: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
};

/** The output of our update `SeasonTeamStanding` mutation. */
export type UpdateSeasonTeamStandingPayload = {
  __typename?: 'UpdateSeasonTeamStandingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonTeamStanding` that was updated by this mutation. */
  seasonTeamStanding?: Maybe<SeasonTeamStanding>;
  /** An edge for our `SeasonTeamStanding`. May be used by Relay 1. */
  seasonTeamStandingEdge?: Maybe<SeasonTeamStandingEdge>;
};


/** The output of our update `SeasonTeamStanding` mutation. */
export type UpdateSeasonTeamStandingPayloadSeasonTeamStandingEdgeArgs = {
  orderBy?: Array<SeasonTeamStandingOrderBy>;
};

/** All input for the `updateSeasonTyreManufacturerById` mutation. */
export type UpdateSeasonTyreManufacturerByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SeasonTyreManufacturer` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `SeasonTyreManufacturer` being updated. */
  patch: SeasonTyreManufacturerPatch;
};

/** All input for the `updateSeasonTyreManufacturer` mutation. */
export type UpdateSeasonTyreManufacturerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `SeasonTyreManufacturer` being updated. */
  patch: SeasonTyreManufacturerPatch;
  tyreManufacturerId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

/** The output of our update `SeasonTyreManufacturer` mutation. */
export type UpdateSeasonTyreManufacturerPayload = {
  __typename?: 'UpdateSeasonTyreManufacturerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SeasonTyreManufacturer` that was updated by this mutation. */
  seasonTyreManufacturer?: Maybe<SeasonTyreManufacturer>;
  /** An edge for our `SeasonTyreManufacturer`. May be used by Relay 1. */
  seasonTyreManufacturerEdge?: Maybe<SeasonTyreManufacturerEdge>;
};


/** The output of our update `SeasonTyreManufacturer` mutation. */
export type UpdateSeasonTyreManufacturerPayloadSeasonTyreManufacturerEdgeArgs = {
  orderBy?: Array<SeasonTyreManufacturerOrderBy>;
};

/** All input for the `updateSprintQualifyingResultById` mutation. */
export type UpdateSprintQualifyingResultByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SprintQualifyingResult` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `SprintQualifyingResult` being updated. */
  patch: SprintQualifyingResultPatch;
};

/** All input for the `updateSprintQualifyingResult` mutation. */
export type UpdateSprintQualifyingResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `SprintQualifyingResult` being updated. */
  patch: SprintQualifyingResultPatch;
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};

/** The output of our update `SprintQualifyingResult` mutation. */
export type UpdateSprintQualifyingResultPayload = {
  __typename?: 'UpdateSprintQualifyingResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SprintQualifyingResult` that was updated by this mutation. */
  sprintQualifyingResult?: Maybe<SprintQualifyingResult>;
  /** An edge for our `SprintQualifyingResult`. May be used by Relay 1. */
  sprintQualifyingResultEdge?: Maybe<SprintQualifyingResultEdge>;
};


/** The output of our update `SprintQualifyingResult` mutation. */
export type UpdateSprintQualifyingResultPayloadSprintQualifyingResultEdgeArgs = {
  orderBy?: Array<SprintQualifyingResultOrderBy>;
};

/** All input for the `updateSprintRaceResultById` mutation. */
export type UpdateSprintRaceResultByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SprintRaceResult` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `SprintRaceResult` being updated. */
  patch: SprintRaceResultPatch;
};

/** All input for the `updateSprintRaceResult` mutation. */
export type UpdateSprintRaceResultInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `SprintRaceResult` being updated. */
  patch: SprintRaceResultPatch;
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};

/** The output of our update `SprintRaceResult` mutation. */
export type UpdateSprintRaceResultPayload = {
  __typename?: 'UpdateSprintRaceResultPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SprintRaceResult` that was updated by this mutation. */
  sprintRaceResult?: Maybe<SprintRaceResult>;
  /** An edge for our `SprintRaceResult`. May be used by Relay 1. */
  sprintRaceResultEdge?: Maybe<SprintRaceResultEdge>;
};


/** The output of our update `SprintRaceResult` mutation. */
export type UpdateSprintRaceResultPayloadSprintRaceResultEdgeArgs = {
  orderBy?: Array<SprintRaceResultOrderBy>;
};

/** All input for the `updateSprintStartingGridPositionById` mutation. */
export type UpdateSprintStartingGridPositionByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SprintStartingGridPosition` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `SprintStartingGridPosition` being updated. */
  patch: SprintStartingGridPositionPatch;
};

/** All input for the `updateSprintStartingGridPosition` mutation. */
export type UpdateSprintStartingGridPositionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `SprintStartingGridPosition` being updated. */
  patch: SprintStartingGridPositionPatch;
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};

/** The output of our update `SprintStartingGridPosition` mutation. */
export type UpdateSprintStartingGridPositionPayload = {
  __typename?: 'UpdateSprintStartingGridPositionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SprintStartingGridPosition` that was updated by this mutation. */
  sprintStartingGridPosition?: Maybe<SprintStartingGridPosition>;
  /** An edge for our `SprintStartingGridPosition`. May be used by Relay 1. */
  sprintStartingGridPositionEdge?: Maybe<SprintStartingGridPositionEdge>;
};


/** The output of our update `SprintStartingGridPosition` mutation. */
export type UpdateSprintStartingGridPositionPayloadSprintStartingGridPositionEdgeArgs = {
  orderBy?: Array<SprintStartingGridPositionOrderBy>;
};

/** All input for the `updateStartingGridPositionById` mutation. */
export type UpdateStartingGridPositionByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `StartingGridPosition` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `StartingGridPosition` being updated. */
  patch: StartingGridPositionPatch;
};

/** All input for the `updateStartingGridPosition` mutation. */
export type UpdateStartingGridPositionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `StartingGridPosition` being updated. */
  patch: StartingGridPositionPatch;
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};

/** The output of our update `StartingGridPosition` mutation. */
export type UpdateStartingGridPositionPayload = {
  __typename?: 'UpdateStartingGridPositionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `StartingGridPosition` that was updated by this mutation. */
  startingGridPosition?: Maybe<StartingGridPosition>;
  /** An edge for our `StartingGridPosition`. May be used by Relay 1. */
  startingGridPositionEdge?: Maybe<StartingGridPositionEdge>;
};


/** The output of our update `StartingGridPosition` mutation. */
export type UpdateStartingGridPositionPayloadStartingGridPositionEdgeArgs = {
  orderBy?: Array<StartingGridPositionOrderBy>;
};

/** All input for the `updateTeamById` mutation. */
export type UpdateTeamByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Team` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Team` being updated. */
  patch: TeamPatch;
};

/** All input for the `updateTeamChronologyById` mutation. */
export type UpdateTeamChronologyByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `TeamChronology` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `TeamChronology` being updated. */
  patch: TeamChronologyPatch;
};

/** All input for the `updateTeamChronologyByTeamIdAndOtherTeamIdAndYearFromAndYearTo` mutation. */
export type UpdateTeamChronologyByTeamIdAndOtherTeamIdAndYearFromAndYearToInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  otherTeamId: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `TeamChronology` being updated. */
  patch: TeamChronologyPatch;
  teamId: Scalars['String']['input'];
  yearFrom: Scalars['Int']['input'];
  yearTo: Scalars['Int']['input'];
};

/** All input for the `updateTeamChronology` mutation. */
export type UpdateTeamChronologyInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `TeamChronology` being updated. */
  patch: TeamChronologyPatch;
  positionDisplayOrder: Scalars['Int']['input'];
  teamId: Scalars['String']['input'];
};

/** The output of our update `TeamChronology` mutation. */
export type UpdateTeamChronologyPayload = {
  __typename?: 'UpdateTeamChronologyPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `TeamChronology` that was updated by this mutation. */
  teamChronology?: Maybe<TeamChronology>;
  /** An edge for our `TeamChronology`. May be used by Relay 1. */
  teamChronologyEdge?: Maybe<TeamChronologyEdge>;
};


/** The output of our update `TeamChronology` mutation. */
export type UpdateTeamChronologyPayloadTeamChronologyEdgeArgs = {
  orderBy?: Array<TeamChronologyOrderBy>;
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
  rowId: Scalars['String']['input'];
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
  teamEdge?: Maybe<TeamEdge>;
};


/** The output of our update `Team` mutation. */
export type UpdateTeamPayloadTeamEdgeArgs = {
  orderBy?: Array<TeamOrderBy>;
};

/** All input for the `updateTyreManufacturerById` mutation. */
export type UpdateTyreManufacturerByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `TyreManufacturer` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `TyreManufacturer` being updated. */
  patch: TyreManufacturerPatch;
};

/** All input for the `updateTyreManufacturer` mutation. */
export type UpdateTyreManufacturerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `TyreManufacturer` being updated. */
  patch: TyreManufacturerPatch;
  rowId: Scalars['String']['input'];
};

/** The output of our update `TyreManufacturer` mutation. */
export type UpdateTyreManufacturerPayload = {
  __typename?: 'UpdateTyreManufacturerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `TyreManufacturer` that was updated by this mutation. */
  tyreManufacturer?: Maybe<TyreManufacturer>;
  /** An edge for our `TyreManufacturer`. May be used by Relay 1. */
  tyreManufacturerEdge?: Maybe<TyreManufacturerEdge>;
};


/** The output of our update `TyreManufacturer` mutation. */
export type UpdateTyreManufacturerPayloadTyreManufacturerEdgeArgs = {
  orderBy?: Array<TyreManufacturerOrderBy>;
};

export type WarmingUpResult = {
  __typename?: 'WarmingUpResult';
  driverId?: Maybe<Scalars['String']['output']>;
  driverNumber?: Maybe<Scalars['String']['output']>;
  engineManufacturerId?: Maybe<Scalars['String']['output']>;
  gap?: Maybe<Scalars['String']['output']>;
  gapMillis?: Maybe<Scalars['Int']['output']>;
  interval?: Maybe<Scalars['String']['output']>;
  intervalMillis?: Maybe<Scalars['Int']['output']>;
  laps?: Maybe<Scalars['Int']['output']>;
  positionDisplayOrder?: Maybe<Scalars['Int']['output']>;
  positionNumber?: Maybe<Scalars['Int']['output']>;
  positionText?: Maybe<Scalars['String']['output']>;
  raceId?: Maybe<Scalars['Int']['output']>;
  teamId?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
  timeMillis?: Maybe<Scalars['Int']['output']>;
  tyreManufacturerId?: Maybe<Scalars['String']['output']>;
};

/**
 * A condition to be used against `WarmingUpResult` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type WarmingUpResultCondition = {
  /** Checks for equality with the object’s `driverId` field. */
  driverId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `driverNumber` field. */
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `engineManufacturerId` field. */
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gap` field. */
  gap?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gapMillis` field. */
  gapMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `interval` field. */
  interval?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `intervalMillis` field. */
  intervalMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `laps` field. */
  laps?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionDisplayOrder` field. */
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionNumber` field. */
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `positionText` field. */
  positionText?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `raceId` field. */
  raceId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `time` field. */
  time?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `timeMillis` field. */
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `tyreManufacturerId` field. */
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `WarmingUpResult` values. */
export type WarmingUpResultConnection = {
  __typename?: 'WarmingUpResultConnection';
  /** A list of edges which contains the `WarmingUpResult` and cursor to aid in pagination. */
  edges: Array<Maybe<WarmingUpResultEdge>>;
  /** A list of `WarmingUpResult` objects. */
  nodes: Array<Maybe<WarmingUpResult>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `WarmingUpResult` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `WarmingUpResult` edge in the connection. */
export type WarmingUpResultEdge = {
  __typename?: 'WarmingUpResultEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `WarmingUpResult` at the end of the edge. */
  node?: Maybe<WarmingUpResult>;
};

/** An input for mutations affecting `WarmingUpResult` */
export type WarmingUpResultInput = {
  driverId?: InputMaybe<Scalars['String']['input']>;
  driverNumber?: InputMaybe<Scalars['String']['input']>;
  engineManufacturerId?: InputMaybe<Scalars['String']['input']>;
  gap?: InputMaybe<Scalars['String']['input']>;
  gapMillis?: InputMaybe<Scalars['Int']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  intervalMillis?: InputMaybe<Scalars['Int']['input']>;
  laps?: InputMaybe<Scalars['Int']['input']>;
  positionDisplayOrder?: InputMaybe<Scalars['Int']['input']>;
  positionNumber?: InputMaybe<Scalars['Int']['input']>;
  positionText?: InputMaybe<Scalars['String']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  timeMillis?: InputMaybe<Scalars['Int']['input']>;
  tyreManufacturerId?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `WarmingUpResult`. */
export enum WarmingUpResultOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  DriverNumberAsc = 'DRIVER_NUMBER_ASC',
  DriverNumberDesc = 'DRIVER_NUMBER_DESC',
  EngineManufacturerIdAsc = 'ENGINE_MANUFACTURER_ID_ASC',
  EngineManufacturerIdDesc = 'ENGINE_MANUFACTURER_ID_DESC',
  GapAsc = 'GAP_ASC',
  GapDesc = 'GAP_DESC',
  GapMillisAsc = 'GAP_MILLIS_ASC',
  GapMillisDesc = 'GAP_MILLIS_DESC',
  IntervalAsc = 'INTERVAL_ASC',
  IntervalDesc = 'INTERVAL_DESC',
  IntervalMillisAsc = 'INTERVAL_MILLIS_ASC',
  IntervalMillisDesc = 'INTERVAL_MILLIS_DESC',
  LapsAsc = 'LAPS_ASC',
  LapsDesc = 'LAPS_DESC',
  Natural = 'NATURAL',
  PositionDisplayOrderAsc = 'POSITION_DISPLAY_ORDER_ASC',
  PositionDisplayOrderDesc = 'POSITION_DISPLAY_ORDER_DESC',
  PositionNumberAsc = 'POSITION_NUMBER_ASC',
  PositionNumberDesc = 'POSITION_NUMBER_DESC',
  PositionTextAsc = 'POSITION_TEXT_ASC',
  PositionTextDesc = 'POSITION_TEXT_DESC',
  RaceIdAsc = 'RACE_ID_ASC',
  RaceIdDesc = 'RACE_ID_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC',
  TimeAsc = 'TIME_ASC',
  TimeDesc = 'TIME_DESC',
  TimeMillisAsc = 'TIME_MILLIS_ASC',
  TimeMillisDesc = 'TIME_MILLIS_DESC',
  TyreManufacturerIdAsc = 'TYRE_MANUFACTURER_ID_ASC',
  TyreManufacturerIdDesc = 'TYRE_MANUFACTURER_ID_DESC'
}

export type WikipediaBio = {
  __typename?: 'WikipediaBio';
  extract?: Maybe<Scalars['String']['output']>;
  sourceUrl: Scalars['String']['output'];
  thumbnailUrl?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type CurrentSeasonQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentSeasonQueryQuery = { __typename?: 'Query', seasons?: { __typename?: 'SeasonConnection', nodes: Array<{ __typename?: 'Season', id: string, year: number } | null> } | null };

export type AllCircuitsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCircuitsQueryQuery = { __typename?: 'Query', circuits?: { __typename?: 'CircuitConnection', nodes: Array<{ __typename?: 'Circuit', rowId: string } | null> } | null };

export type RaceLookupQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  round: Scalars['Int']['input'];
}>;


export type RaceLookupQueryQuery = { __typename?: 'Query', races?: { __typename?: 'RaceConnection', nodes: Array<{ __typename?: 'Race', rowId: number, year: number, round: number, officialName: string, date: any, circuit?: { __typename?: 'Circuit', id: string, rowId: string, fullName: string, placeName: string, countryId: string, latitude: any, longitude: any, description?: { __typename?: 'AppCircuitDescription', description: string } | null } | null } | null> } | null };

export type AllRacesQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type AllRacesQueryQuery = { __typename?: 'Query', races?: { __typename?: 'RaceConnection', nodes: Array<{ __typename?: 'Race', rowId: number, year: number, round: number } | null> } | null };

export type ConstructorPageStaticQueryQueryVariables = Exact<{
  constructorRef: Scalars['String']['input'];
}>;


export type ConstructorPageStaticQueryQuery = { __typename?: 'Query', teams?: { __typename?: 'TeamConnection', nodes: Array<{ __typename?: 'Team', id: string, rowId: string, name: string, countryId: string, colors?: { __typename?: 'AppTeamColor', id: string, primaryHex?: string | null } | null } | null> } | null };

export type SeasonMenuQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type SeasonMenuQueryQuery = { __typename?: 'Query', seasons?: { __typename?: 'SeasonConnection', nodes: Array<{ __typename?: 'Season', id: string, year: number } | null> } | null };

export type CircuitsListQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type CircuitsListQueryQuery = { __typename?: 'Query', circuits?: { __typename?: 'CircuitConnection', nodes: Array<{ __typename?: 'Circuit', id: string, rowId: string, fullName: string, placeName: string, countryId: string, latitude: any, longitude: any, type: string, direction: string, races: { __typename?: 'RaceConnection', nodes: Array<{ __typename?: 'Race', year: number, round: number } | null> } } | null> } | null };

export type ConstructorsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type ConstructorsQueryQuery = { __typename?: 'Query', teams?: { __typename?: 'TeamConnection', nodes: Array<{ __typename?: 'Team', id: string, rowId: string, name: string, countryId: string, colors?: { __typename?: 'AppTeamColor', id: string, primaryHex?: string | null, secondaryHex?: string | null } | null, seasons: { __typename?: 'SeasonTeamConnection', nodes: Array<{ __typename?: 'SeasonTeam', id: string, year: number } | null> }, raceResults: { __typename?: 'RaceResultConnection', nodes: Array<{ __typename?: 'RaceResult', id: string, raceId: number, driverId?: string | null, positionNumber?: number | null } | null> } } | null> } | null };

export type ConstructorDriverPodiumsQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  constructorId: Scalars['String']['input'];
}>;


export type ConstructorDriverPodiumsQueryQuery = { __typename?: 'Query', season?: { __typename?: 'Season', racesByYear: { __typename?: 'RaceConnection', nodes: Array<{ __typename?: 'Race', id: string, rowId: number, raceResults: { __typename?: 'RaceResultConnection', nodes: Array<{ __typename?: 'RaceResult', id: string, driverId?: string | null, positionNumber?: number | null } | null> } } | null> } } | null };

export type ConstructorDriverPointsQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  constructorId: Scalars['String']['input'];
}>;


export type ConstructorDriverPointsQueryQuery = { __typename?: 'Query', season?: { __typename?: 'Season', racesByYear: { __typename?: 'RaceConnection', nodes: Array<{ __typename?: 'Race', id: string, raceResults: { __typename?: 'RaceResultConnection', nodes: Array<{ __typename?: 'RaceResult', id: string, driverId?: string | null, points?: any | null } | null> }, sprintRaceResults: { __typename?: 'SprintRaceResultConnection', nodes: Array<{ __typename?: 'SprintRaceResult', id: string, driverId?: string | null, points?: any | null } | null> } } | null> } } | null };

export type ConstructorDriverQualifyingQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  constructorId: Scalars['String']['input'];
}>;


export type ConstructorDriverQualifyingQueryQuery = { __typename?: 'Query', season?: { __typename?: 'Season', racesByYear: { __typename?: 'RaceConnection', nodes: Array<{ __typename?: 'Race', id: string, rowId: number, round: number, qualifyingResults: { __typename?: 'QualifyingResultConnection', nodes: Array<{ __typename?: 'QualifyingResult', id: string, driverId?: string | null, positionNumber?: number | null, driver?: { __typename?: 'Driver', id: string, fullName: string } | null } | null> } } | null> } } | null };

export type DriversQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type DriversQueryQuery = { __typename?: 'Query', drivers?: { __typename?: 'DriverConnection', nodes: Array<{ __typename?: 'Driver', id: string, rowId: string, firstName: string, lastName: string, nationalityCountryId: string } | null> } | null };

export type DriverCareerQueryQueryVariables = Exact<{
  driverId: Scalars['String']['input'];
}>;


export type DriverCareerQueryQuery = { __typename?: 'Query', driver?: { __typename?: 'Driver', standings: { __typename?: 'SeasonDriverStandingConnection', nodes: Array<{ __typename?: 'SeasonDriverStanding', id: string, year: number, positionNumber?: number | null, positionText: string, points: any } | null> }, raceResults: { __typename?: 'RaceResultConnection', nodes: Array<{ __typename?: 'RaceResult', id: string, gridPositionNumber?: number | null, positionNumber?: number | null, positionDisplayOrder: number, points?: any | null, positionText?: string | null, teamId?: string | null, timeMillis?: number | null, reasonRetired?: string | null, race?: { __typename?: 'Race', id: string, rowId: number, year: number, round: number, circuit?: { __typename?: 'Circuit', id: string, rowId: string, fullName: string, longitude: any, latitude: any } | null } | null } | null> } } | null };

export type CircuitDataQueryQueryVariables = Exact<{
  circuitId: Scalars['String']['input'];
  driverId: Scalars['String']['input'];
}>;


export type CircuitDataQueryQuery = { __typename?: 'Query', circuit?: { __typename?: 'Circuit', id: string, rowId: string, fullName: string, longitude: any, latitude: any, races: { __typename?: 'RaceConnection', nodes: Array<{ __typename?: 'Race', id: string, rowId: number, year: number, date: any, raceResults: { __typename?: 'RaceResultConnection', nodes: Array<{ __typename?: 'RaceResult', id: string, gridPositionNumber?: number | null, positionDisplayOrder: number, positionText?: string | null, points?: any | null, timeMillis?: number | null, reasonRetired?: string | null, team?: { __typename?: 'Team', id: string, rowId: string, colors?: { __typename?: 'AppTeamColor', id: string, primaryHex?: string | null } | null } | null } | null> }, lapTimes: { __typename?: 'AppLapTimeConnection', nodes: Array<{ __typename?: 'AppLapTime', id: string, lap: number, milliseconds?: number | null } | null> } } | null> } } | null, driver?: { __typename?: 'Driver', id: string, seasonEntrantDrivers: { __typename?: 'SeasonEntrantDriverConnection', nodes: Array<{ __typename?: 'SeasonEntrantDriver', id: string, year: number, team?: { __typename?: 'Team', id: string, colors?: { __typename?: 'AppTeamColor', id: string, primaryHex?: string | null } | null } | null } | null> } } | null };

export type DriverCircuitQueryQueryVariables = Exact<{
  driverId: Scalars['String']['input'];
}>;


export type DriverCircuitQueryQuery = { __typename?: 'Query', driver?: { __typename?: 'Driver', raceResults: { __typename?: 'RaceResultConnection', nodes: Array<{ __typename?: 'RaceResult', id: string, gridPositionNumber?: number | null, positionDisplayOrder: number, points?: any | null, positionText?: string | null, teamId?: string | null, timeMillis?: number | null, reasonRetired?: string | null, race?: { __typename?: 'Race', id: string, rowId: number, year: number, round: number, circuit?: { __typename?: 'Circuit', id: string, rowId: string, fullName: string, longitude: any, latitude: any } | null } | null } | null> } } | null };

export type DriverSeasonQueryQueryVariables = Exact<{
  driverId: Scalars['String']['input'];
  season: Scalars['Int']['input'];
}>;


export type DriverSeasonQueryQuery = { __typename?: 'Query', races?: { __typename?: 'RaceConnection', nodes: Array<{ __typename?: 'Race', id: string, rowId: number, round: number, officialName: string, date: any, time?: string | null, raceResults: { __typename?: 'RaceResultConnection', nodes: Array<{ __typename?: 'RaceResult', gridPositionNumber?: number | null, positionDisplayOrder: number, points?: any | null, positionText?: string | null, teamId?: string | null, timeMillis?: number | null, reasonRetired?: string | null } | null> } } | null> } | null };

export type DriverStatsQueryVariables = Exact<{
  driverId: Scalars['String']['input'];
}>;


export type DriverStatsQuery = { __typename?: 'Query', driver?: { __typename?: 'Driver', raceResults: { __typename?: 'RaceResultConnection', nodes: Array<{ __typename?: 'RaceResult', positionNumber?: number | null, positionDisplayOrder: number, points?: any | null } | null> } } | null };

export type QualifyingQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  round: Scalars['Int']['input'];
}>;


export type QualifyingQueryQuery = { __typename?: 'Query', race?: { __typename?: 'Race', qualifyingResults: { __typename?: 'QualifyingResultConnection', nodes: Array<{ __typename?: 'QualifyingResult', id: string, driverId?: string | null, teamId?: string | null, positionNumber?: number | null, q1?: string | null, q2?: string | null, q3?: string | null } | null> } } | null };

export type LapsSeasonRoundQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  round: Scalars['Int']['input'];
}>;


export type LapsSeasonRoundQuery = { __typename?: 'Query', race?: { __typename?: 'Race', lapTimes: { __typename?: 'AppLapTimeConnection', nodes: Array<{ __typename?: 'AppLapTime', id: string, lap: number, position?: number | null, timeText?: string | null, milliseconds?: number | null, driverId: string } | null> }, raceResults: { __typename?: 'RaceResultConnection', nodes: Array<{ __typename?: 'RaceResult', id: string, positionDisplayOrder: number, positionNumber?: number | null, driverId?: string | null, driver?: { __typename?: 'Driver', id: string, lastName: string } | null, team?: { __typename?: 'Team', id: string, colors?: { __typename?: 'AppTeamColor', id: string, primaryHex?: string | null } | null } | null } | null> } } | null };

export type PitStopsBySeasonRoundQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  round: Scalars['Int']['input'];
}>;


export type PitStopsBySeasonRoundQuery = { __typename?: 'Query', race?: { __typename?: 'Race', pitStops: { __typename?: 'PitStopConnection', nodes: Array<{ __typename?: 'PitStop', id: string, lap?: number | null, stop: number, time?: string | null, timeMillis?: number | null, driverId: string, driver?: { __typename?: 'Driver', id: string, abbreviation: string } | null, team?: { __typename?: 'Team', id: string, colors?: { __typename?: 'AppTeamColor', id: string, primaryHex?: string | null } | null } | null } | null> } } | null };

export type RaceFastestLapQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  round: Scalars['Int']['input'];
}>;


export type RaceFastestLapQueryQuery = { __typename?: 'Query', race?: { __typename?: 'Race', fastestLaps: { __typename?: 'FastestLapConnection', nodes: Array<{ __typename?: 'FastestLap', id: string, driverId?: string | null, lap?: number | null, time?: string | null, timeMillis?: number | null } | null> } } | null };

export type RaceLapLeaderQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  round: Scalars['Int']['input'];
}>;


export type RaceLapLeaderQueryQuery = { __typename?: 'Query', race?: { __typename?: 'Race', lapTimes: { __typename?: 'AppLapTimeConnection', nodes: Array<{ __typename?: 'AppLapTime', id: string, driverId: string, position?: number | null } | null> } } | null };

export type RacePolesLeaderQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  round: Scalars['Int']['input'];
}>;


export type RacePolesLeaderQueryQuery = { __typename?: 'Query', races?: { __typename?: 'RaceConnection', nodes: Array<{ __typename?: 'Race', id: string, qualifyingResults: { __typename?: 'QualifyingResultConnection', nodes: Array<{ __typename?: 'QualifyingResult', id: string, driverId?: string | null } | null> } } | null> } | null };

export type RacePositionsGainedLeaderQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  round: Scalars['Int']['input'];
}>;


export type RacePositionsGainedLeaderQueryQuery = { __typename?: 'Query', race?: { __typename?: 'Race', raceResults: { __typename?: 'RaceResultConnection', nodes: Array<{ __typename?: 'RaceResult', id: string, driverId?: string | null, gridPositionNumber?: number | null, positionNumber?: number | null } | null> } } | null };

export type NextRaceBySeasonQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type NextRaceBySeasonQuery = { __typename?: 'Query', races?: { __typename?: 'RaceConnection', nodes: Array<{ __typename?: 'Race', id: string, rowId: number, year: number, round: number, date: any, time?: string | null, officialName: string, grandPrixId: string, preQualifyingDate?: any | null, preQualifyingTime?: string | null, freePractice1Date?: any | null, freePractice1Time?: string | null, freePractice2Date?: any | null, freePractice2Time?: string | null, freePractice3Date?: any | null, freePractice3Time?: string | null, freePractice4Date?: any | null, freePractice4Time?: string | null, qualifyingDate?: any | null, qualifyingTime?: string | null, sprintQualifyingDate?: any | null, sprintQualifyingTime?: string | null, sprintRaceDate?: any | null, sprintRaceTime?: string | null, circuit?: { __typename?: 'Circuit', id: string, rowId: string, fullName: string, placeName: string, countryId: string, latitude: any, longitude: any } | null } | null> } | null };

export type SeasonsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type SeasonsQueryQuery = { __typename?: 'Query', seasons?: { __typename?: 'SeasonConnection', nodes: Array<{ __typename?: 'Season', id: string, year: number, seasonTeamStandingsByYear: { __typename?: 'SeasonTeamStandingConnection', nodes: Array<{ __typename?: 'SeasonTeamStanding', id: string, teamId: string, points: any, positionNumber?: number | null } | null> }, seasonDriverStandingsByYear: { __typename?: 'SeasonDriverStandingConnection', nodes: Array<{ __typename?: 'SeasonDriverStanding', id: string, driverId: string, points: any, positionNumber?: number | null } | null> } } | null> } | null };

export type ConstructorStandingsQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type ConstructorStandingsQueryQuery = { __typename?: 'Query', season?: { __typename?: 'Season', racesByYear: { __typename?: 'RaceConnection', nodes: Array<{ __typename?: 'Race', id: string, round: number, raceTeamStandings: { __typename?: 'RaceTeamStandingConnection', nodes: Array<{ __typename?: 'RaceTeamStanding', id: string, teamId: string, positionNumber?: number | null, points: any, team?: { __typename?: 'Team', id: string, rowId: string, name: string, colors?: { __typename?: 'AppTeamColor', id: string, primaryHex?: string | null } | null } | null } | null> } } | null> } } | null };

export type DriverStandingsQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type DriverStandingsQueryQuery = { __typename?: 'Query', season?: { __typename?: 'Season', seasonDriverStandingsByYear: { __typename?: 'SeasonDriverStandingConnection', nodes: Array<{ __typename?: 'SeasonDriverStanding', id: string, driverId: string, positionNumber?: number | null, points: any } | null> }, racesByYear: { __typename?: 'RaceConnection', nodes: Array<{ __typename?: 'Race', id: string, round: number, raceDriverStandings: { __typename?: 'RaceDriverStandingConnection', nodes: Array<{ __typename?: 'RaceDriverStanding', id: string, driverId: string, positionNumber?: number | null, points: any, driver?: { __typename?: 'Driver', id: string, rowId: string, lastName: string, seasonEntrantDrivers: { __typename?: 'SeasonEntrantDriverConnection', nodes: Array<{ __typename?: 'SeasonEntrantDriver', id: string, team?: { __typename?: 'Team', id: string, colors?: { __typename?: 'AppTeamColor', id: string, primaryHex?: string | null } | null } | null } | null> } } | null } | null> } } | null> } } | null };

export type SeasonConstructorChampionQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type SeasonConstructorChampionQueryQuery = { __typename?: 'Query', season?: { __typename?: 'Season', seasonTeamStandingsByYear: { __typename?: 'SeasonTeamStandingConnection', nodes: Array<{ __typename?: 'SeasonTeamStanding', id: string, teamId: string } | null> } } | null };

export type SeasonDnFsQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type SeasonDnFsQueryQuery = { __typename?: 'Query', season?: { __typename?: 'Season', racesByYear: { __typename?: 'RaceConnection', nodes: Array<{ __typename?: 'Race', id: string, rowId: number, raceResults: { __typename?: 'RaceResultConnection', nodes: Array<{ __typename?: 'RaceResult', id: string, driverId?: string | null, reasonRetired?: string | null } | null> } } | null> } } | null };

export type SeasonDriverChampionQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type SeasonDriverChampionQueryQuery = { __typename?: 'Query', seasonDriverStandings?: { __typename?: 'SeasonDriverStandingConnection', nodes: Array<{ __typename?: 'SeasonDriverStanding', id: string, driverId: string } | null> } | null };

export type SeasonFastestLapQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type SeasonFastestLapQueryQuery = { __typename?: 'Query', season?: { __typename?: 'Season', year: number, racesByYear: { __typename?: 'RaceConnection', nodes: Array<{ __typename?: 'Race', id: string, rowId: number, round: number, officialName: string, fastestLaps: { __typename?: 'FastestLapConnection', nodes: Array<{ __typename?: 'FastestLap', id: string, driverId?: string | null, lap?: number | null, time?: string | null, timeMillis?: number | null } | null> } } | null> } } | null };

export type SeasonLapLeaderQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type SeasonLapLeaderQueryQuery = { __typename?: 'Query', season?: { __typename?: 'Season', racesByYear: { __typename?: 'RaceConnection', nodes: Array<{ __typename?: 'Race', id: string, rowId: number, round: number, lapTimes: { __typename?: 'AppLapTimeConnection', nodes: Array<{ __typename?: 'AppLapTime', id: string, driverId: string, position?: number | null } | null> } } | null> } } | null };

export type SeasonPolesQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type SeasonPolesQueryQuery = { __typename?: 'Query', season?: { __typename?: 'Season', racesByYear: { __typename?: 'RaceConnection', nodes: Array<{ __typename?: 'Race', id: string, rowId: number, qualifyingResults: { __typename?: 'QualifyingResultConnection', nodes: Array<{ __typename?: 'QualifyingResult', id: string, driverId?: string | null } | null> } } | null> } } | null };

export type SeasonPositionsGainedQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type SeasonPositionsGainedQueryQuery = { __typename?: 'Query', season?: { __typename?: 'Season', racesByYear: { __typename?: 'RaceConnection', nodes: Array<{ __typename?: 'Race', id: string, rowId: number, raceResults: { __typename?: 'RaceResultConnection', nodes: Array<{ __typename?: 'RaceResult', id: string, driverId?: string | null, gridPositionNumber?: number | null, positionNumber?: number | null } | null> } } | null> } } | null };

export type SeasonSprintWinsQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type SeasonSprintWinsQueryQuery = { __typename?: 'Query', season?: { __typename?: 'Season', racesByYear: { __typename?: 'RaceConnection', nodes: Array<{ __typename?: 'Race', id: string, rowId: number, sprintRaceResults: { __typename?: 'SprintRaceResultConnection', nodes: Array<{ __typename?: 'SprintRaceResult', id: string, driverId?: string | null } | null> } } | null> } } | null };

export type SeasonWinsQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type SeasonWinsQueryQuery = { __typename?: 'Query', season?: { __typename?: 'Season', racesByYear: { __typename?: 'RaceConnection', nodes: Array<{ __typename?: 'Race', id: string, rowId: number, raceResults: { __typename?: 'RaceResultConnection', nodes: Array<{ __typename?: 'RaceResult', id: string, driverId?: string | null } | null> } } | null> } } | null };

export type ScheduleQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type ScheduleQueryQuery = { __typename?: 'Query', season?: { __typename?: 'Season', racesByYear: { __typename?: 'RaceConnection', nodes: Array<{ __typename?: 'Race', id: string, rowId: number, round: number, date: any, officialName: string, circuit?: { __typename?: 'Circuit', id: string, latitude: any, longitude: any } | null, raceResults: { __typename?: 'RaceResultConnection', nodes: Array<{ __typename?: 'RaceResult', driverId?: string | null } | null> }, sprintRaceResults: { __typename?: 'SprintRaceResultConnection', nodes: Array<{ __typename?: 'SprintRaceResult', driverId?: string | null } | null> } } | null> } } | null };

export type PastSeasonsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type PastSeasonsQueryQuery = { __typename?: 'Query', seasons?: { __typename?: 'SeasonConnection', nodes: Array<{ __typename?: 'Season', id: string, year: number } | null> } | null };

export type SingleSeasonQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type SingleSeasonQueryQuery = { __typename?: 'Query', season?: { __typename?: 'Season', id: string, year: number } | null };

export type CircuitQueryQueryVariables = Exact<{
  circuitRef: Scalars['String']['input'];
  showCurrentSeason: Scalars['Boolean']['input'];
  season?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CircuitQueryQuery = { __typename?: 'Query', circuit?: { __typename?: 'Circuit', id: string, rowId: string, fullName: string, placeName: string, countryId: string, latitude: any, longitude: any, description?: { __typename?: 'AppCircuitDescription', description: string } | null, history: { __typename?: 'RaceConnection', nodes: Array<{ __typename?: 'Race', id: string, year: number, round: number, date: any, officialName: string, raceResults: { __typename?: 'RaceResultConnection', nodes: Array<{ __typename?: 'RaceResult', id: string, teamId?: string | null, driverId?: string | null, time?: string | null, driver?: { __typename?: 'Driver', id: string, firstName: string, lastName: string } | null } | null> }, lapTimes: { __typename?: 'AppLapTimeConnection', nodes: Array<{ __typename?: 'AppLapTime', id: string, driverId: string } | null> }, fastestLaps: { __typename?: 'AppLapTimeConnection', nodes: Array<{ __typename?: 'AppLapTime', id: string, driverId: string, milliseconds?: number | null } | null> } } | null> }, season?: { __typename?: 'RaceConnection', nodes: Array<{ __typename?: 'Race', id: string, year: number, round: number, officialName: string, freePractice1Date?: any | null, freePractice1Time?: string | null, freePractice2Date?: any | null, freePractice2Time?: string | null, freePractice3Date?: any | null, freePractice3Time?: string | null, qualifyingDate?: any | null, qualifyingTime?: string | null, date: any, time?: string | null, raceResults: { __typename?: 'RaceResultConnection', nodes: Array<{ __typename?: 'RaceResult', id: string, driverId?: string | null, gridPositionNumber?: number | null, positionDisplayOrder: number, points?: any | null, reasonRetired?: string | null, team?: { __typename?: 'Team', id: string, rowId: string } | null } | null> } } | null> } } | null };

export type ConstructorDataQueryQueryVariables = Exact<{
  constructorRef: Scalars['String']['input'];
  season: Scalars['Int']['input'];
}>;


export type ConstructorDataQueryQuery = { __typename?: 'Query', team?: { __typename?: 'Team', id: string, name: string, countryId: string, colors?: { __typename?: 'AppTeamColor', id: string, primaryHex?: string | null } | null, drivers: { __typename?: 'SeasonEntrantDriverConnection', nodes: Array<{ __typename?: 'SeasonEntrantDriver', id: string, year: number, driver?: { __typename?: 'Driver', id: string, firstName: string, lastName: string, driverStandings: { __typename?: 'SeasonDriverStandingConnection', nodes: Array<{ __typename?: 'SeasonDriverStanding', id: string, year: number, points: any, positionNumber?: number | null } | null> } } | null } | null> }, standings: { __typename?: 'SeasonTeamStandingConnection', nodes: Array<{ __typename?: 'SeasonTeamStanding', id: string, points: any, positionNumber?: number | null, positionText: string, year: number } | null> }, antecedents: { __typename?: 'AppTeamHistoryConnection', nodes: Array<{ __typename?: 'AppTeamHistory', id: string, antecedentTeamId: string, startYear: number, endYear?: number | null, antecedentTeam?: { __typename?: 'Team', id: string, name: string, colors?: { __typename?: 'AppTeamColor', id: string, primaryHex?: string | null } | null, standings: { __typename?: 'SeasonTeamStandingConnection', nodes: Array<{ __typename?: 'SeasonTeamStanding', id: string, points: any, positionNumber?: number | null, positionText: string, year: number } | null> } } | null } | null> }, raceResults: { __typename?: 'RaceResultConnection', nodes: Array<{ __typename?: 'RaceResult', id: string, raceId: number, driverId?: string | null, gridPositionNumber?: number | null, positionDisplayOrder: number, points?: any | null, race?: { __typename?: 'Race', id: string, round: number } | null, driver?: { __typename?: 'Driver', id: string, abbreviation: string } | null } | null> } } | null, races?: { __typename?: 'RaceConnection', nodes: Array<{ __typename?: 'Race', id: string, rowId: number, round: number, officialName: string, date: any } | null> } | null };

export type DriverFieldsFragment = { __typename?: 'Driver', id: string, rowId: string, dateOfBirth: any, firstName: string, lastName: string, abbreviation: string, permanentNumber?: string | null, nationalityCountryId: string, bio?: { __typename?: 'WikipediaBio', title: string, extract?: string | null, thumbnailUrl?: string | null, sourceUrl: string } | null, seasonEntrantDrivers: { __typename?: 'SeasonEntrantDriverConnection', nodes: Array<{ __typename?: 'SeasonEntrantDriver', id: string, year: number, team?: { __typename?: 'Team', id: string, colors?: { __typename?: 'AppTeamColor', id: string, primaryHex?: string | null } | null } | null } | null> }, teamsByYear: { __typename?: 'SeasonEntrantDriverConnection', nodes: Array<{ __typename?: 'SeasonEntrantDriver', id: string, year: number, team?: { __typename?: 'Team', id: string, colors?: { __typename?: 'AppTeamColor', id: string, primaryHex?: string | null } | null } | null } | null> } } & { ' $fragmentName'?: 'DriverFieldsFragment' };

export type DriverQueryQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DriverQueryQuery = { __typename?: 'Query', driver?: (
    { __typename?: 'Driver' }
    & { ' $fragmentRefs'?: { 'DriverFieldsFragment': DriverFieldsFragment } }
  ) | null };

export type RaceBySeasonRoundQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  round: Scalars['Int']['input'];
}>;


export type RaceBySeasonRoundQuery = { __typename?: 'Query', races?: { __typename?: 'RaceConnection', nodes: Array<{ __typename?: 'Race', id: string, raceResults: { __typename?: 'RaceResultConnection', nodes: Array<{ __typename?: 'RaceResult', id: string, driverId?: string | null, teamId?: string | null, gridPositionNumber?: number | null, positionNumber?: number | null, positionText?: string | null, positionDisplayOrder: number, points?: any | null, laps?: number | null, time?: string | null, timeMillis?: number | null, reasonRetired?: string | null, driver?: { __typename?: 'Driver', id: string, rowId: string } | null } | null> }, sprintRaceResults: { __typename?: 'SprintRaceResultConnection', nodes: Array<{ __typename?: 'SprintRaceResult', id: string, driverId?: string | null, teamId?: string | null, gridPositionNumber?: number | null, positionNumber?: number | null, positionText?: string | null, positionDisplayOrder: number, points?: any | null, laps?: number | null, time?: string | null, timeMillis?: number | null, reasonRetired?: string | null, driver?: { __typename?: 'Driver', id: string, rowId: string } | null } | null> } } | null> } | null };

export type TeamFieldsFragment = { __typename?: 'Team', id: string, name: string, countryId: string, colors?: { __typename?: 'AppTeamColor', id: string, primaryHex?: string | null, secondaryHex?: string | null } | null, bio?: { __typename?: 'WikipediaBio', title: string, extract?: string | null, thumbnailUrl?: string | null, sourceUrl: string } | null } & { ' $fragmentName'?: 'TeamFieldsFragment' };

export type TeamByIdQueryVariables = Exact<{
  rowId: Scalars['String']['input'];
}>;


export type TeamByIdQuery = { __typename?: 'Query', team?: (
    { __typename?: 'Team' }
    & { ' $fragmentRefs'?: { 'TeamFieldsFragment': TeamFieldsFragment } }
  ) | null };

export type SeasonsListQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type SeasonsListQueryQuery = { __typename?: 'Query', seasons?: { __typename?: 'SeasonConnection', nodes: Array<{ __typename?: 'Season', id: string, year: number, seasonDriverStandingsByYear: { __typename?: 'SeasonDriverStandingConnection', totalCount: number } } | null> } | null };

export const DriverFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DriverFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Driver"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"permanentNumber"}},{"kind":"Field","name":{"kind":"Name","value":"nationalityCountryId"}},{"kind":"Field","name":{"kind":"Name","value":"bio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"extract"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"seasonEntrantDrivers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}}]}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"teamsByYear"},"name":{"kind":"Name","value":"seasonEntrantDrivers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<DriverFieldsFragment, unknown>;
export const TeamFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeamFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Team"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"countryId"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryHex"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"extract"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}}]}}]}}]} as unknown as DocumentNode<TeamFieldsFragment, unknown>;
export const CurrentSeasonQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentSeasonQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seasons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]}}]} as unknown as DocumentNode<CurrentSeasonQueryQuery, CurrentSeasonQueryQueryVariables>;
export const AllCircuitsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllCircuitsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"circuits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rowId"}}]}}]}}]}}]} as unknown as DocumentNode<AllCircuitsQueryQuery, AllCircuitsQueryQueryVariables>;
export const RaceLookupQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RaceLookupQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"round"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"round"},"value":{"kind":"Variable","name":{"kind":"Name","value":"round"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"officialName"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"circuit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"placeName"}},{"kind":"Field","name":{"kind":"Name","value":"countryId"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"description"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<RaceLookupQueryQuery, RaceLookupQueryQueryVariables>;
export const AllRacesQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllRacesQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}}]}}]}}]}}]} as unknown as DocumentNode<AllRacesQueryQuery, AllRacesQueryQueryVariables>;
export const ConstructorPageStaticQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ConstructorPageStaticQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"constructorRef"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teams"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"rowId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"constructorRef"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"countryId"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ConstructorPageStaticQueryQuery, ConstructorPageStaticQueryQueryVariables>;
export const SeasonMenuQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SeasonMenuQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seasons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]}}]} as unknown as DocumentNode<SeasonMenuQueryQuery, SeasonMenuQueryQueryVariables>;
export const CircuitsListQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CircuitsListQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"circuits"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"FULL_NAME_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"placeName"}},{"kind":"Field","name":{"kind":"Name","value":"countryId"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"direction"}},{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CircuitsListQueryQuery, CircuitsListQueryQueryVariables>;
export const ConstructorsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ConstructorsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teams"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"NAME_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"countryId"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryHex"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"seasons"},"name":{"kind":"Name","value":"seasonTeams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ConstructorsQueryQuery, ConstructorsQueryQueryVariables>;
export const ConstructorDriverPodiumsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"constructorDriverPodiumsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"constructorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"racesByYear"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"ROUND_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"constructorId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ConstructorDriverPodiumsQueryQuery, ConstructorDriverPodiumsQueryQueryVariables>;
export const ConstructorDriverPointsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ConstructorDriverPointsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"constructorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"racesByYear"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"constructorId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"points"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"sprintRaceResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"constructorId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"points"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ConstructorDriverPointsQueryQuery, ConstructorDriverPointsQueryQueryVariables>;
export const ConstructorDriverQualifyingQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ConstructorDriverQualifyingQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"constructorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"racesByYear"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"qualifyingResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"constructorId"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"POSITION_NUMBER_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"driver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ConstructorDriverQualifyingQueryQuery, ConstructorDriverQualifyingQueryQueryVariables>;
export const DriversQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DriversQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"drivers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"LAST_NAME_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"nationalityCountryId"}}]}}]}}]}}]} as unknown as DocumentNode<DriversQueryQuery, DriversQueryQueryVariables>;
export const DriverCareerQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DriverCareerQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"driverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driver"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"rowId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"driverId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"standings"},"name":{"kind":"Name","value":"seasonDriverStandings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionText"}},{"kind":"Field","name":{"kind":"Name","value":"points"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"circuit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"gridPositionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionDisplayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"positionText"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"timeMillis"}},{"kind":"Field","name":{"kind":"Name","value":"reasonRetired"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DriverCareerQueryQuery, DriverCareerQueryQueryVariables>;
export const CircuitDataQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CircuitDataQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"circuitId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"driverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"circuit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"rowId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"circuitId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"races"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"driverId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"driverId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"gridPositionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionDisplayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"positionText"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"timeMillis"}},{"kind":"Field","name":{"kind":"Name","value":"reasonRetired"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"lapTimes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"driverId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"driverId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lap"}},{"kind":"Field","name":{"kind":"Name","value":"milliseconds"}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"driver"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"rowId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"driverId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"seasonEntrantDrivers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CircuitDataQueryQuery, CircuitDataQueryQueryVariables>;
export const DriverCircuitQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DriverCircuitQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"driverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driver"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"rowId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"driverId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"circuit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"gridPositionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionDisplayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"positionText"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"timeMillis"}},{"kind":"Field","name":{"kind":"Name","value":"reasonRetired"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DriverCircuitQueryQuery, DriverCircuitQueryQueryVariables>;
export const DriverSeasonQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DriverSeasonQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"driverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"ROUND_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"officialName"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"driverId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"driverId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gridPositionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionDisplayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"positionText"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"timeMillis"}},{"kind":"Field","name":{"kind":"Name","value":"reasonRetired"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<DriverSeasonQueryQuery, DriverSeasonQueryQueryVariables>;
export const DriverStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"driverStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"driverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driver"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"rowId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"driverId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionDisplayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"points"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DriverStatsQuery, DriverStatsQueryVariables>;
export const QualifyingQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"qualifyingQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"round"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"race"},"name":{"kind":"Name","value":"raceByYearAndRound"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}},{"kind":"Argument","name":{"kind":"Name","value":"round"},"value":{"kind":"Variable","name":{"kind":"Name","value":"round"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"qualifyingResults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"q1"}},{"kind":"Field","name":{"kind":"Name","value":"q2"}},{"kind":"Field","name":{"kind":"Name","value":"q3"}}]}}]}}]}}]}}]} as unknown as DocumentNode<QualifyingQueryQuery, QualifyingQueryQueryVariables>;
export const LapsSeasonRoundDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"lapsSeasonRound"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"round"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"race"},"name":{"kind":"Name","value":"raceByYearAndRound"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}},{"kind":"Argument","name":{"kind":"Name","value":"round"},"value":{"kind":"Variable","name":{"kind":"Name","value":"round"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lapTimes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"LAP_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lap"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"timeText"}},{"kind":"Field","name":{"kind":"Name","value":"milliseconds"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"POSITION_DISPLAY_ORDER_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"positionDisplayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"driver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<LapsSeasonRoundQuery, LapsSeasonRoundQueryVariables>;
export const PitStopsBySeasonRoundDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"pitStopsBySeasonRound"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"round"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"race"},"name":{"kind":"Name","value":"raceByYearAndRound"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}},{"kind":"Argument","name":{"kind":"Name","value":"round"},"value":{"kind":"Variable","name":{"kind":"Name","value":"round"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pitStops"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lap"}},{"kind":"Field","name":{"kind":"Name","value":"stop"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"timeMillis"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"driver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}}]}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<PitStopsBySeasonRoundQuery, PitStopsBySeasonRoundQueryVariables>;
export const RaceFastestLapQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"raceFastestLapQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"round"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"race"},"name":{"kind":"Name","value":"raceByYearAndRound"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}},{"kind":"Argument","name":{"kind":"Name","value":"round"},"value":{"kind":"Variable","name":{"kind":"Name","value":"round"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fastestLaps"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"lap"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"timeMillis"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RaceFastestLapQueryQuery, RaceFastestLapQueryQueryVariables>;
export const RaceLapLeaderQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"raceLapLeaderQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"round"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"race"},"name":{"kind":"Name","value":"raceByYearAndRound"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}},{"kind":"Argument","name":{"kind":"Name","value":"round"},"value":{"kind":"Variable","name":{"kind":"Name","value":"round"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lapTimes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RaceLapLeaderQueryQuery, RaceLapLeaderQueryQueryVariables>;
export const RacePolesLeaderQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"racePolesLeaderQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"round"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"round"},"value":{"kind":"Variable","name":{"kind":"Name","value":"round"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"qualifyingResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"positionNumber"},"value":{"kind":"IntValue","value":"1"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<RacePolesLeaderQueryQuery, RacePolesLeaderQueryQueryVariables>;
export const RacePositionsGainedLeaderQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"racePositionsGainedLeaderQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"round"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"race"},"name":{"kind":"Name","value":"raceByYearAndRound"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}},{"kind":"Argument","name":{"kind":"Name","value":"round"},"value":{"kind":"Variable","name":{"kind":"Name","value":"round"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"gridPositionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RacePositionsGainedLeaderQueryQuery, RacePositionsGainedLeaderQueryQueryVariables>;
export const NextRaceBySeasonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NextRaceBySeason"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"ROUND_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"officialName"}},{"kind":"Field","name":{"kind":"Name","value":"grandPrixId"}},{"kind":"Field","name":{"kind":"Name","value":"preQualifyingDate"}},{"kind":"Field","name":{"kind":"Name","value":"preQualifyingTime"}},{"kind":"Field","name":{"kind":"Name","value":"freePractice1Date"}},{"kind":"Field","name":{"kind":"Name","value":"freePractice1Time"}},{"kind":"Field","name":{"kind":"Name","value":"freePractice2Date"}},{"kind":"Field","name":{"kind":"Name","value":"freePractice2Time"}},{"kind":"Field","name":{"kind":"Name","value":"freePractice3Date"}},{"kind":"Field","name":{"kind":"Name","value":"freePractice3Time"}},{"kind":"Field","name":{"kind":"Name","value":"freePractice4Date"}},{"kind":"Field","name":{"kind":"Name","value":"freePractice4Time"}},{"kind":"Field","name":{"kind":"Name","value":"qualifyingDate"}},{"kind":"Field","name":{"kind":"Name","value":"qualifyingTime"}},{"kind":"Field","name":{"kind":"Name","value":"sprintQualifyingDate"}},{"kind":"Field","name":{"kind":"Name","value":"sprintQualifyingTime"}},{"kind":"Field","name":{"kind":"Name","value":"sprintRaceDate"}},{"kind":"Field","name":{"kind":"Name","value":"sprintRaceTime"}},{"kind":"Field","name":{"kind":"Name","value":"circuit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"placeName"}},{"kind":"Field","name":{"kind":"Name","value":"countryId"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}}]}}]}}]}}]} as unknown as DocumentNode<NextRaceBySeasonQuery, NextRaceBySeasonQueryVariables>;
export const SeasonsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SeasonsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seasons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"seasonTeamStandingsByYear"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"POSITION_NUMBER_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"seasonDriverStandingsByYear"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"POSITION_NUMBER_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"3"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<SeasonsQueryQuery, SeasonsQueryQueryVariables>;
export const ConstructorStandingsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"constructorStandingsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"racesByYear"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"ROUND_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"raceTeamStandings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"POSITION_NUMBER_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ConstructorStandingsQueryQuery, ConstructorStandingsQueryQueryVariables>;
export const DriverStandingsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"driverStandingsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seasonDriverStandingsByYear"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"POSITION_NUMBER_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"points"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"racesByYear"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"ROUND_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"raceDriverStandings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"POSITION_NUMBER_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"driver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"seasonEntrantDrivers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<DriverStandingsQueryQuery, DriverStandingsQueryQueryVariables>;
export const SeasonConstructorChampionQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"seasonConstructorChampionQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seasonTeamStandingsByYear"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"POSITION_NUMBER_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SeasonConstructorChampionQueryQuery, SeasonConstructorChampionQueryQueryVariables>;
export const SeasonDnFsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SeasonDNFsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"racesByYear"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"reasonRetired"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<SeasonDnFsQueryQuery, SeasonDnFsQueryQueryVariables>;
export const SeasonDriverChampionQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SeasonDriverChampionQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seasonDriverStandings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"POSITION_NUMBER_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}}]}}]}}]}}]} as unknown as DocumentNode<SeasonDriverChampionQueryQuery, SeasonDriverChampionQueryQueryVariables>;
export const SeasonFastestLapQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"seasonFastestLapQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"racesByYear"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"officialName"}},{"kind":"Field","name":{"kind":"Name","value":"fastestLaps"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"TIME_MILLIS_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"lap"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"timeMillis"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<SeasonFastestLapQueryQuery, SeasonFastestLapQueryQueryVariables>;
export const SeasonLapLeaderQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SeasonLapLeaderQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"racesByYear"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"lapTimes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<SeasonLapLeaderQueryQuery, SeasonLapLeaderQueryQueryVariables>;
export const SeasonPolesQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SeasonPolesQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"racesByYear"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"qualifyingResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"positionNumber"},"value":{"kind":"IntValue","value":"1"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<SeasonPolesQueryQuery, SeasonPolesQueryQueryVariables>;
export const SeasonPositionsGainedQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SeasonPositionsGainedQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"racesByYear"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"gridPositionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<SeasonPositionsGainedQueryQuery, SeasonPositionsGainedQueryQueryVariables>;
export const SeasonSprintWinsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SeasonSprintWinsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"racesByYear"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"sprintRaceResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"positionNumber"},"value":{"kind":"IntValue","value":"1"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<SeasonSprintWinsQueryQuery, SeasonSprintWinsQueryQueryVariables>;
export const SeasonWinsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SeasonWinsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"racesByYear"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"positionNumber"},"value":{"kind":"IntValue","value":"1"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<SeasonWinsQueryQuery, SeasonWinsQueryQueryVariables>;
export const ScheduleQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"scheduleQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"racesByYear"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"ROUND_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"officialName"}},{"kind":"Field","name":{"kind":"Name","value":"circuit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"positionNumber"},"value":{"kind":"IntValue","value":"1"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driverId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"sprintRaceResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"positionNumber"},"value":{"kind":"IntValue","value":"1"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driverId"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ScheduleQueryQuery, ScheduleQueryQueryVariables>;
export const PastSeasonsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PastSeasonsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seasons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]}}]} as unknown as DocumentNode<PastSeasonsQueryQuery, PastSeasonsQueryQueryVariables>;
export const SingleSeasonQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SingleSeasonQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]} as unknown as DocumentNode<SingleSeasonQueryQuery, SingleSeasonQueryQueryVariables>;
export const CircuitQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CircuitQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"circuitRef"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"showCurrentSeason"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"circuit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"rowId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"circuitRef"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"placeName"}},{"kind":"Field","name":{"kind":"Name","value":"countryId"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"description"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"history"},"name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"officialName"}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"positionNumber"},"value":{"kind":"IntValue","value":"1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"driver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"lapTimes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"lap"},"value":{"kind":"IntValue","value":"1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"fastestLaps"},"name":{"kind":"Name","value":"lapTimes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"milliseconds"}}]}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"season"},"name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}]}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"showCurrentSeason"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"officialName"}},{"kind":"Field","name":{"kind":"Name","value":"freePractice1Date"}},{"kind":"Field","name":{"kind":"Name","value":"freePractice1Time"}},{"kind":"Field","name":{"kind":"Name","value":"freePractice2Date"}},{"kind":"Field","name":{"kind":"Name","value":"freePractice2Time"}},{"kind":"Field","name":{"kind":"Name","value":"freePractice3Date"}},{"kind":"Field","name":{"kind":"Name","value":"freePractice3Time"}},{"kind":"Field","name":{"kind":"Name","value":"qualifyingDate"}},{"kind":"Field","name":{"kind":"Name","value":"qualifyingTime"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"gridPositionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionDisplayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"reasonRetired"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CircuitQueryQuery, CircuitQueryQueryVariables>;
export const ConstructorDataQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ConstructorDataQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"constructorRef"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"team"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"rowId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"constructorRef"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"countryId"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"drivers"},"name":{"kind":"Name","value":"seasonEntrantDrivers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"driver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","alias":{"kind":"Name","value":"driverStandings"},"name":{"kind":"Name","value":"seasonDriverStandings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}}]}}]}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"standings"},"name":{"kind":"Name","value":"seasonTeamStandings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionText"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"antecedents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"antecedentTeamId"}},{"kind":"Field","name":{"kind":"Name","value":"startYear"}},{"kind":"Field","name":{"kind":"Name","value":"endYear"}},{"kind":"Field","name":{"kind":"Name","value":"antecedentTeam"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"standings"},"name":{"kind":"Name","value":"seasonTeamStandings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionText"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"round"}}]}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"driver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}}]}},{"kind":"Field","name":{"kind":"Name","value":"gridPositionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionDisplayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"points"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"ROUND_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"officialName"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]}}]} as unknown as DocumentNode<ConstructorDataQueryQuery, ConstructorDataQueryQueryVariables>;
export const DriverQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DriverQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driver"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"rowId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DriverFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DriverFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Driver"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"permanentNumber"}},{"kind":"Field","name":{"kind":"Name","value":"nationalityCountryId"}},{"kind":"Field","name":{"kind":"Name","value":"bio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"extract"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"seasonEntrantDrivers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}}]}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"teamsByYear"},"name":{"kind":"Name","value":"seasonEntrantDrivers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<DriverQueryQuery, DriverQueryQueryVariables>;
export const RaceBySeasonRoundDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"raceBySeasonRound"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"round"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"round"},"value":{"kind":"Variable","name":{"kind":"Name","value":"round"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"driver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"gridPositionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionText"}},{"kind":"Field","name":{"kind":"Name","value":"positionDisplayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"laps"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"timeMillis"}},{"kind":"Field","name":{"kind":"Name","value":"reasonRetired"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"sprintRaceResults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"driver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rowId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"gridPositionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionText"}},{"kind":"Field","name":{"kind":"Name","value":"positionDisplayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"laps"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"timeMillis"}},{"kind":"Field","name":{"kind":"Name","value":"reasonRetired"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<RaceBySeasonRoundQuery, RaceBySeasonRoundQueryVariables>;
export const TeamByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"teamById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rowId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"team"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"rowId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rowId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TeamFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeamFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Team"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"countryId"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryHex"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"extract"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}}]}}]}}]} as unknown as DocumentNode<TeamByIdQuery, TeamByIdQueryVariables>;
export const SeasonsListQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SeasonsListQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seasons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"seasonDriverStandingsByYear"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SeasonsListQueryQuery, SeasonsListQueryQueryVariables>;