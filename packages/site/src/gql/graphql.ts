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

export type AppCircuitDescription = {
  __typename?: 'AppCircuitDescription';
  /** Reads a single `Circuit` that is related to this `AppCircuitDescription`. */
  circuit?: Maybe<Circuit>;
  circuitId: Scalars['String']['output'];
  description: Scalars['String']['output'];
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

/** Methods to use when ordering `AppCircuitDescription`. */
export enum AppCircuitDescriptionOrderBy {
  CircuitIdAsc = 'CIRCUIT_ID_ASC',
  CircuitIdDesc = 'CIRCUIT_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type AppConstructorBio = {
  __typename?: 'AppConstructorBio';
  description?: Maybe<Scalars['String']['output']>;
  extract?: Maybe<Scalars['String']['output']>;
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

/** Methods to use when ordering `AppConstructorBio`. */
export enum AppConstructorBioOrderBy {
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC'
}

export type AppDriverBio = {
  __typename?: 'AppDriverBio';
  description?: Maybe<Scalars['String']['output']>;
  driverId: Scalars['String']['output'];
  extract?: Maybe<Scalars['String']['output']>;
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

/** Methods to use when ordering `AppDriverBio`. */
export enum AppDriverBioOrderBy {
  DriverIdAsc = 'DRIVER_ID_ASC',
  DriverIdDesc = 'DRIVER_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type AppIngestState = {
  __typename?: 'AppIngestState';
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

/** Methods to use when ordering `AppIngestState`. */
export enum AppIngestStateOrderBy {
  KeyAsc = 'KEY_ASC',
  KeyDesc = 'KEY_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type AppLapTime = {
  __typename?: 'AppLapTime';
  /** Reads a single `Driver` that is related to this `AppLapTime`. */
  driver?: Maybe<Driver>;
  driverId: Scalars['String']['output'];
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

export type AppTeamColor = {
  __typename?: 'AppTeamColor';
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

/** Methods to use when ordering `AppTeamColor`. */
export enum AppTeamColorOrderBy {
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC'
}

export type AppTeamHistory = {
  __typename?: 'AppTeamHistory';
  /** Reads a single `Team` that is related to this `AppTeamHistory`. */
  antecedentTeam?: Maybe<Team>;
  antecedentTeamId: Scalars['String']['output'];
  endYear?: Maybe<Scalars['Int']['output']>;
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

export type Chassis = {
  __typename?: 'Chassis';
  fullName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `SeasonEntrantChassis`. */
  seasonEntrantChassises: Array<SeasonEntrantChassis>;
  /** Reads a single `Team` that is related to this `Chassis`. */
  team?: Maybe<Team>;
  teamId: Scalars['String']['output'];
};


export type ChassisSeasonEntrantChassisesArgs = {
  condition?: InputMaybe<SeasonEntrantChassisCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantChassisOrderBy>>;
};

/** A condition to be used against `Chassis` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ChassisCondition = {
  /** Checks for equality with the object’s `fullName` field. */
  fullName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `teamId` field. */
  teamId?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `Chassis`. */
export enum ChassisOrderBy {
  FullNameAsc = 'FULL_NAME_ASC',
  FullNameDesc = 'FULL_NAME_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TeamIdAsc = 'TEAM_ID_ASC',
  TeamIdDesc = 'TEAM_ID_DESC'
}

export type Circuit = {
  __typename?: 'Circuit';
  /** Reads and enables pagination through a set of `CircuitLayout`. */
  circuitLayouts: Array<CircuitLayout>;
  /** Reads a single `Country` that is related to this `Circuit`. */
  country?: Maybe<Country>;
  countryId: Scalars['String']['output'];
  /** Reads a single `AppCircuitDescription` that is related to this `Circuit`. */
  description?: Maybe<AppCircuitDescription>;
  direction: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  latitude: Scalars['BigFloat']['output'];
  length: Scalars['BigFloat']['output'];
  longitude: Scalars['BigFloat']['output'];
  name: Scalars['String']['output'];
  placeName: Scalars['String']['output'];
  previousNames?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `Race`. */
  races: Array<Race>;
  totalRacesHeld: Scalars['Int']['output'];
  turns: Scalars['Int']['output'];
  type: Scalars['String']['output'];
};


export type CircuitCircuitLayoutsArgs = {
  condition?: InputMaybe<CircuitLayoutCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CircuitLayoutOrderBy>>;
};


export type CircuitRacesArgs = {
  condition?: InputMaybe<RaceCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
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
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `placeName` field. */
  placeName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<Scalars['String']['input']>;
};

export type CircuitLayout = {
  __typename?: 'CircuitLayout';
  /** Reads a single `Circuit` that is related to this `CircuitLayout`. */
  circuit?: Maybe<Circuit>;
  circuitId: Scalars['String']['output'];
  effective: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  length: Scalars['BigFloat']['output'];
  /** Reads and enables pagination through a set of `Race`. */
  races: Array<Race>;
  turns: Scalars['Int']['output'];
};


export type CircuitLayoutRacesArgs = {
  condition?: InputMaybe<RaceCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
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
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `CircuitLayout`. */
export enum CircuitLayoutOrderBy {
  CircuitIdAsc = 'CIRCUIT_ID_ASC',
  CircuitIdDesc = 'CIRCUIT_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** Methods to use when ordering `Circuit`. */
export enum CircuitOrderBy {
  CountryIdAsc = 'COUNTRY_ID_ASC',
  CountryIdDesc = 'COUNTRY_ID_DESC',
  DirectionAsc = 'DIRECTION_ASC',
  DirectionDesc = 'DIRECTION_DESC',
  FullNameAsc = 'FULL_NAME_ASC',
  FullNameDesc = 'FULL_NAME_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PlaceNameAsc = 'PLACE_NAME_ASC',
  PlaceNameDesc = 'PLACE_NAME_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC'
}

export type Continent = {
  __typename?: 'Continent';
  code: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `Country`. */
  countries: Array<Country>;
  demonym: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};


export type ContinentCountriesArgs = {
  condition?: InputMaybe<CountryCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
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
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `Continent`. */
export enum ContinentOrderBy {
  CodeAsc = 'CODE_ASC',
  CodeDesc = 'CODE_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type Country = {
  __typename?: 'Country';
  alpha2Code: Scalars['String']['output'];
  alpha3Code: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `Circuit`. */
  circuits: Array<Circuit>;
  /** Reads a single `Continent` that is related to this `Country`. */
  continent?: Maybe<Continent>;
  continentId: Scalars['String']['output'];
  demonym?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `Driver`. */
  driversByCountryOfBirthCountryId: Array<Driver>;
  /** Reads and enables pagination through a set of `Driver`. */
  driversByNationalityCountryId: Array<Driver>;
  /** Reads and enables pagination through a set of `Driver`. */
  driversBySecondNationalityCountryId: Array<Driver>;
  /** Reads and enables pagination through a set of `EngineManufacturer`. */
  engineManufacturers: Array<EngineManufacturer>;
  /** Reads and enables pagination through a set of `GrandPrix`. */
  grandPrixes: Array<GrandPrix>;
  id: Scalars['String']['output'];
  iocCode?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `SeasonEntrant`. */
  seasonEntrants: Array<SeasonEntrant>;
  /** Reads and enables pagination through a set of `Team`. */
  teams: Array<Team>;
  /** Reads and enables pagination through a set of `TyreManufacturer`. */
  tyreManufacturers: Array<TyreManufacturer>;
};


export type CountryCircuitsArgs = {
  condition?: InputMaybe<CircuitCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CircuitOrderBy>>;
};


export type CountryDriversByCountryOfBirthCountryIdArgs = {
  condition?: InputMaybe<DriverCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverOrderBy>>;
};


export type CountryDriversByNationalityCountryIdArgs = {
  condition?: InputMaybe<DriverCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverOrderBy>>;
};


export type CountryDriversBySecondNationalityCountryIdArgs = {
  condition?: InputMaybe<DriverCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverOrderBy>>;
};


export type CountryEngineManufacturersArgs = {
  condition?: InputMaybe<EngineManufacturerCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EngineManufacturerOrderBy>>;
};


export type CountryGrandPrixesArgs = {
  condition?: InputMaybe<GrandPrixCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GrandPrixOrderBy>>;
};


export type CountrySeasonEntrantsArgs = {
  condition?: InputMaybe<SeasonEntrantCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantOrderBy>>;
};


export type CountryTeamsArgs = {
  condition?: InputMaybe<TeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamOrderBy>>;
};


export type CountryTyreManufacturersArgs = {
  condition?: InputMaybe<TyreManufacturerCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
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
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `Country`. */
export enum CountryOrderBy {
  Alpha2CodeAsc = 'ALPHA2_CODE_ASC',
  Alpha2CodeDesc = 'ALPHA2_CODE_DESC',
  Alpha3CodeAsc = 'ALPHA3_CODE_ASC',
  Alpha3CodeDesc = 'ALPHA3_CODE_DESC',
  ContinentIdAsc = 'CONTINENT_ID_ASC',
  ContinentIdDesc = 'CONTINENT_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type Driver = {
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
  driverFamilyRelationships: Array<DriverFamilyRelationship>;
  /** Reads and enables pagination through a set of `DriverFamilyRelationship`. */
  driverFamilyRelationshipsByOtherDriverId: Array<DriverFamilyRelationship>;
  /** Reads and enables pagination through a set of `DriverOfTheDayResult`. */
  driverOfTheDayResults: Array<DriverOfTheDayResult>;
  /** Reads and enables pagination through a set of `FastestLap`. */
  fastestLaps: Array<FastestLap>;
  firstName: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  gender: Scalars['String']['output'];
  id: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `AppLapTime`. */
  lapTimes: Array<AppLapTime>;
  lastName: Scalars['String']['output'];
  name: Scalars['String']['output'];
  /** Reads a single `Country` that is related to this `Driver`. */
  nationalityCountry?: Maybe<Country>;
  nationalityCountryId: Scalars['String']['output'];
  permanentNumber?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `PitStop`. */
  pitStops: Array<PitStop>;
  placeOfBirth: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `QualifyingResult`. */
  qualifyingResults: Array<QualifyingResult>;
  /** Reads and enables pagination through a set of `RaceDatum`. */
  raceData: Array<RaceDatum>;
  /** Reads and enables pagination through a set of `RaceDriverStanding`. */
  raceDriverStandings: Array<RaceDriverStanding>;
  /** Reads and enables pagination through a set of `RaceResult`. */
  raceResults: Array<RaceResult>;
  /** Reads and enables pagination through a set of `SeasonDriverStanding`. */
  seasonDriverStandings: Array<SeasonDriverStanding>;
  /** Reads and enables pagination through a set of `SeasonDriver`. */
  seasonDrivers: Array<SeasonDriver>;
  /** Reads and enables pagination through a set of `SeasonEntrantDriver`. */
  seasonEntrantDrivers: Array<SeasonEntrantDriver>;
  /** Reads a single `Country` that is related to this `Driver`. */
  secondNationalityCountry?: Maybe<Country>;
  secondNationalityCountryId?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `SprintQualifyingResult`. */
  sprintQualifyingResults: Array<SprintQualifyingResult>;
  /** Reads and enables pagination through a set of `SprintRaceResult`. */
  sprintRaceResults: Array<SprintRaceResult>;
  /** Reads and enables pagination through a set of `SprintStartingGridPosition`. */
  sprintStartingGridPositions: Array<SprintStartingGridPosition>;
  /** Reads and enables pagination through a set of `StartingGridPosition`. */
  startingGridPositions: Array<StartingGridPosition>;
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
  condition?: InputMaybe<DriverFamilyRelationshipCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverFamilyRelationshipOrderBy>>;
};


export type DriverDriverFamilyRelationshipsByOtherDriverIdArgs = {
  condition?: InputMaybe<DriverFamilyRelationshipCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverFamilyRelationshipOrderBy>>;
};


export type DriverDriverOfTheDayResultsArgs = {
  condition?: InputMaybe<DriverOfTheDayResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverOfTheDayResultOrderBy>>;
};


export type DriverFastestLapsArgs = {
  condition?: InputMaybe<FastestLapCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FastestLapOrderBy>>;
};


export type DriverLapTimesArgs = {
  condition?: InputMaybe<AppLapTimeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AppLapTimeOrderBy>>;
};


export type DriverPitStopsArgs = {
  condition?: InputMaybe<PitStopCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PitStopOrderBy>>;
};


export type DriverQualifyingResultsArgs = {
  condition?: InputMaybe<QualifyingResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<QualifyingResultOrderBy>>;
};


export type DriverRaceDataArgs = {
  condition?: InputMaybe<RaceDatumCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceDatumOrderBy>>;
};


export type DriverRaceDriverStandingsArgs = {
  condition?: InputMaybe<RaceDriverStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceDriverStandingOrderBy>>;
};


export type DriverRaceResultsArgs = {
  condition?: InputMaybe<RaceResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceResultOrderBy>>;
};


export type DriverSeasonDriverStandingsArgs = {
  condition?: InputMaybe<SeasonDriverStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonDriverStandingOrderBy>>;
};


export type DriverSeasonDriversArgs = {
  condition?: InputMaybe<SeasonDriverCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonDriverOrderBy>>;
};


export type DriverSeasonEntrantDriversArgs = {
  condition?: InputMaybe<SeasonEntrantDriverCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantDriverOrderBy>>;
};


export type DriverSprintQualifyingResultsArgs = {
  condition?: InputMaybe<SprintQualifyingResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintQualifyingResultOrderBy>>;
};


export type DriverSprintRaceResultsArgs = {
  condition?: InputMaybe<SprintRaceResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintRaceResultOrderBy>>;
};


export type DriverSprintStartingGridPositionsArgs = {
  condition?: InputMaybe<SprintStartingGridPositionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintStartingGridPositionOrderBy>>;
};


export type DriverStartingGridPositionsArgs = {
  condition?: InputMaybe<StartingGridPositionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
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
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']['input']>;
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
  /** Checks for equality with the object’s `secondNationalityCountryId` field. */
  secondNationalityCountryId?: InputMaybe<Scalars['String']['input']>;
};

export type DriverFamilyRelationship = {
  __typename?: 'DriverFamilyRelationship';
  /** Reads a single `Driver` that is related to this `DriverFamilyRelationship`. */
  driver?: Maybe<Driver>;
  driverId: Scalars['String']['output'];
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

export type DriverOfTheDayResult = {
  __typename?: 'DriverOfTheDayResult';
  /** Reads a single `Driver` that is related to this `DriverOfTheDayResult`. */
  driver?: Maybe<Driver>;
  driverId?: Maybe<Scalars['String']['output']>;
  driverNumber?: Maybe<Scalars['String']['output']>;
  engineManufacturerId?: Maybe<Scalars['String']['output']>;
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
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
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
  SecondNationalityCountryIdAsc = 'SECOND_NATIONALITY_COUNTRY_ID_ASC',
  SecondNationalityCountryIdDesc = 'SECOND_NATIONALITY_COUNTRY_ID_DESC'
}

export type Engine = {
  __typename?: 'Engine';
  aspiration?: Maybe<Scalars['String']['output']>;
  capacity?: Maybe<Scalars['BigFloat']['output']>;
  configuration?: Maybe<Scalars['String']['output']>;
  /** Reads a single `EngineManufacturer` that is related to this `Engine`. */
  engineManufacturer?: Maybe<EngineManufacturer>;
  engineManufacturerId: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `SeasonEntrantEngine`. */
  seasonEntrantEngines: Array<SeasonEntrantEngine>;
};


export type EngineSeasonEntrantEnginesArgs = {
  condition?: InputMaybe<SeasonEntrantEngineCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
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
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type EngineManufacturer = {
  __typename?: 'EngineManufacturer';
  bestChampionshipPosition?: Maybe<Scalars['Int']['output']>;
  bestRaceResult?: Maybe<Scalars['Int']['output']>;
  bestSprintRaceResult?: Maybe<Scalars['Int']['output']>;
  bestStartingGridPosition?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `Country` that is related to this `EngineManufacturer`. */
  country?: Maybe<Country>;
  countryId: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `Engine`. */
  engines: Array<Engine>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `RaceDatum`. */
  raceData: Array<RaceDatum>;
  /** Reads and enables pagination through a set of `RaceTeamStanding`. */
  raceTeamStandings: Array<RaceTeamStanding>;
  /** Reads and enables pagination through a set of `SeasonEngineManufacturer`. */
  seasonEngineManufacturers: Array<SeasonEngineManufacturer>;
  /** Reads and enables pagination through a set of `SeasonEntrantChassis`. */
  seasonEntrantChassises: Array<SeasonEntrantChassis>;
  /** Reads and enables pagination through a set of `SeasonEntrantDriver`. */
  seasonEntrantDrivers: Array<SeasonEntrantDriver>;
  /** Reads and enables pagination through a set of `SeasonEntrantEngine`. */
  seasonEntrantEngines: Array<SeasonEntrantEngine>;
  /** Reads and enables pagination through a set of `SeasonEntrantTeam`. */
  seasonEntrantTeams: Array<SeasonEntrantTeam>;
  /** Reads and enables pagination through a set of `SeasonEntrantTyreManufacturer`. */
  seasonEntrantTyreManufacturers: Array<SeasonEntrantTyreManufacturer>;
  /** Reads and enables pagination through a set of `SeasonTeamStanding`. */
  seasonTeamStandings: Array<SeasonTeamStanding>;
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
  condition?: InputMaybe<EngineCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EngineOrderBy>>;
};


export type EngineManufacturerRaceDataArgs = {
  condition?: InputMaybe<RaceDatumCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceDatumOrderBy>>;
};


export type EngineManufacturerRaceTeamStandingsArgs = {
  condition?: InputMaybe<RaceTeamStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceTeamStandingOrderBy>>;
};


export type EngineManufacturerSeasonEngineManufacturersArgs = {
  condition?: InputMaybe<SeasonEngineManufacturerCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEngineManufacturerOrderBy>>;
};


export type EngineManufacturerSeasonEntrantChassisesArgs = {
  condition?: InputMaybe<SeasonEntrantChassisCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantChassisOrderBy>>;
};


export type EngineManufacturerSeasonEntrantDriversArgs = {
  condition?: InputMaybe<SeasonEntrantDriverCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantDriverOrderBy>>;
};


export type EngineManufacturerSeasonEntrantEnginesArgs = {
  condition?: InputMaybe<SeasonEntrantEngineCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantEngineOrderBy>>;
};


export type EngineManufacturerSeasonEntrantTeamsArgs = {
  condition?: InputMaybe<SeasonEntrantTeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantTeamOrderBy>>;
};


export type EngineManufacturerSeasonEntrantTyreManufacturersArgs = {
  condition?: InputMaybe<SeasonEntrantTyreManufacturerCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantTyreManufacturerOrderBy>>;
};


export type EngineManufacturerSeasonTeamStandingsArgs = {
  condition?: InputMaybe<SeasonTeamStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
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
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `EngineManufacturer`. */
export enum EngineManufacturerOrderBy {
  CountryIdAsc = 'COUNTRY_ID_ASC',
  CountryIdDesc = 'COUNTRY_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

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
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type Entrant = {
  __typename?: 'Entrant';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `SeasonEntrantChassis`. */
  seasonEntrantChassises: Array<SeasonEntrantChassis>;
  /** Reads and enables pagination through a set of `SeasonEntrantDriver`. */
  seasonEntrantDrivers: Array<SeasonEntrantDriver>;
  /** Reads and enables pagination through a set of `SeasonEntrantEngine`. */
  seasonEntrantEngines: Array<SeasonEntrantEngine>;
  /** Reads and enables pagination through a set of `SeasonEntrantTeam`. */
  seasonEntrantTeams: Array<SeasonEntrantTeam>;
  /** Reads and enables pagination through a set of `SeasonEntrantTyreManufacturer`. */
  seasonEntrantTyreManufacturers: Array<SeasonEntrantTyreManufacturer>;
  /** Reads and enables pagination through a set of `SeasonEntrant`. */
  seasonEntrants: Array<SeasonEntrant>;
};


export type EntrantSeasonEntrantChassisesArgs = {
  condition?: InputMaybe<SeasonEntrantChassisCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantChassisOrderBy>>;
};


export type EntrantSeasonEntrantDriversArgs = {
  condition?: InputMaybe<SeasonEntrantDriverCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantDriverOrderBy>>;
};


export type EntrantSeasonEntrantEnginesArgs = {
  condition?: InputMaybe<SeasonEntrantEngineCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantEngineOrderBy>>;
};


export type EntrantSeasonEntrantTeamsArgs = {
  condition?: InputMaybe<SeasonEntrantTeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantTeamOrderBy>>;
};


export type EntrantSeasonEntrantTyreManufacturersArgs = {
  condition?: InputMaybe<SeasonEntrantTyreManufacturerCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantTyreManufacturerOrderBy>>;
};


export type EntrantSeasonEntrantsArgs = {
  condition?: InputMaybe<SeasonEntrantCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantOrderBy>>;
};

/** A condition to be used against `Entrant` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type EntrantCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `Entrant`. */
export enum EntrantOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type FastestLap = {
  __typename?: 'FastestLap';
  /** Reads a single `Driver` that is related to this `FastestLap`. */
  driver?: Maybe<Driver>;
  driverId?: Maybe<Scalars['String']['output']>;
  driverNumber?: Maybe<Scalars['String']['output']>;
  engineManufacturerId?: Maybe<Scalars['String']['output']>;
  gap?: Maybe<Scalars['String']['output']>;
  gapMillis?: Maybe<Scalars['Int']['output']>;
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

export type GrandPrix = {
  __typename?: 'GrandPrix';
  abbreviation: Scalars['String']['output'];
  /** Reads a single `Country` that is related to this `GrandPrix`. */
  country?: Maybe<Country>;
  countryId?: Maybe<Scalars['String']['output']>;
  fullName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `Race`. */
  races: Array<Race>;
  shortName: Scalars['String']['output'];
  totalRacesHeld: Scalars['Int']['output'];
};


export type GrandPrixRacesArgs = {
  condition?: InputMaybe<RaceCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
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
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `shortName` field. */
  shortName?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `GrandPrix`. */
export enum GrandPrixOrderBy {
  AbbreviationAsc = 'ABBREVIATION_ASC',
  AbbreviationDesc = 'ABBREVIATION_DESC',
  CountryIdAsc = 'COUNTRY_ID_ASC',
  CountryIdDesc = 'COUNTRY_ID_DESC',
  FullNameAsc = 'FULL_NAME_ASC',
  FullNameDesc = 'FULL_NAME_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ShortNameAsc = 'SHORT_NAME_ASC',
  ShortNameDesc = 'SHORT_NAME_DESC'
}

export type PitStop = {
  __typename?: 'PitStop';
  /** Reads a single `Driver` that is related to this `PitStop`. */
  driver?: Maybe<Driver>;
  driverId: Scalars['String']['output'];
  driverNumber?: Maybe<Scalars['String']['output']>;
  engineManufacturerId?: Maybe<Scalars['String']['output']>;
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

export type QualifyingResult = {
  __typename?: 'QualifyingResult';
  /** Reads a single `Driver` that is related to this `QualifyingResult`. */
  driver?: Maybe<Driver>;
  driverId?: Maybe<Scalars['String']['output']>;
  driverNumber?: Maybe<Scalars['String']['output']>;
  engineManufacturerId?: Maybe<Scalars['String']['output']>;
  gap?: Maybe<Scalars['String']['output']>;
  gapMillis?: Maybe<Scalars['Int']['output']>;
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

/** The root query type which gives access points into the data universe. */
export type Query = {
  __typename?: 'Query';
  /** Get a single `AppCircuitDescription`. */
  appCircuitDescription?: Maybe<AppCircuitDescription>;
  /** Reads a set of `AppCircuitDescription`. */
  appCircuitDescriptions?: Maybe<Array<AppCircuitDescription>>;
  /** Get a single `AppConstructorBio`. */
  appConstructorBio?: Maybe<AppConstructorBio>;
  /** Reads a set of `AppConstructorBio`. */
  appConstructorBios?: Maybe<Array<AppConstructorBio>>;
  /** Get a single `AppDriverBio`. */
  appDriverBio?: Maybe<AppDriverBio>;
  /** Reads a set of `AppDriverBio`. */
  appDriverBios?: Maybe<Array<AppDriverBio>>;
  /** Get a single `AppIngestState`. */
  appIngestState?: Maybe<AppIngestState>;
  /** Reads a set of `AppIngestState`. */
  appIngestStates?: Maybe<Array<AppIngestState>>;
  /** Get a single `AppLapTime`. */
  appLapTime?: Maybe<AppLapTime>;
  /** Reads a set of `AppLapTime`. */
  appLapTimes?: Maybe<Array<AppLapTime>>;
  /** Get a single `AppTeamColor`. */
  appTeamColor?: Maybe<AppTeamColor>;
  /** Reads a set of `AppTeamColor`. */
  appTeamColors?: Maybe<Array<AppTeamColor>>;
  /** Reads a set of `AppTeamHistory`. */
  appTeamHistories?: Maybe<Array<AppTeamHistory>>;
  /** Get a single `AppTeamHistory`. */
  appTeamHistory?: Maybe<AppTeamHistory>;
  /** Get a single `Chassis`. */
  chassis?: Maybe<Chassis>;
  /** Reads a set of `Chassis`. */
  chassises?: Maybe<Array<Chassis>>;
  /** Get a single `Circuit`. */
  circuit?: Maybe<Circuit>;
  /** Get a single `CircuitLayout`. */
  circuitLayout?: Maybe<CircuitLayout>;
  /** Reads a set of `CircuitLayout`. */
  circuitLayouts?: Maybe<Array<CircuitLayout>>;
  /** Reads a set of `Circuit`. */
  circuits?: Maybe<Array<Circuit>>;
  /** Get a single `Continent`. */
  continent?: Maybe<Continent>;
  /** Get a single `Continent`. */
  continentByCode?: Maybe<Continent>;
  /** Get a single `Continent`. */
  continentByName?: Maybe<Continent>;
  /** Reads a set of `Continent`. */
  continents?: Maybe<Array<Continent>>;
  /** Reads a set of `Country`. */
  countries?: Maybe<Array<Country>>;
  /** Get a single `Country`. */
  country?: Maybe<Country>;
  /** Get a single `Country`. */
  countryByAlpha2Code?: Maybe<Country>;
  /** Get a single `Country`. */
  countryByAlpha3Code?: Maybe<Country>;
  /** Get a single `Country`. */
  countryByName?: Maybe<Country>;
  /** Get a single `Driver`. */
  driver?: Maybe<Driver>;
  /** Get a single `DriverFamilyRelationship`. */
  driverFamilyRelationship?: Maybe<DriverFamilyRelationship>;
  /** Get a single `DriverFamilyRelationship`. */
  driverFamilyRelationshipByDriverIdAndOtherDriverIdAndType?: Maybe<DriverFamilyRelationship>;
  /** Reads a set of `DriverFamilyRelationship`. */
  driverFamilyRelationships?: Maybe<Array<DriverFamilyRelationship>>;
  /** Get a single `DriverOfTheDayResult`. */
  driverOfTheDayResult?: Maybe<DriverOfTheDayResult>;
  /** Reads a set of `DriverOfTheDayResult`. */
  driverOfTheDayResults?: Maybe<Array<DriverOfTheDayResult>>;
  /** Reads a set of `Driver`. */
  drivers?: Maybe<Array<Driver>>;
  /** Get a single `Engine`. */
  engine?: Maybe<Engine>;
  /** Get a single `EngineManufacturer`. */
  engineManufacturer?: Maybe<EngineManufacturer>;
  /** Reads a set of `EngineManufacturer`. */
  engineManufacturers?: Maybe<Array<EngineManufacturer>>;
  /** Reads a set of `Engine`. */
  engines?: Maybe<Array<Engine>>;
  /** Get a single `Entrant`. */
  entrant?: Maybe<Entrant>;
  /** Reads a set of `Entrant`. */
  entrants?: Maybe<Array<Entrant>>;
  /** Get a single `FastestLap`. */
  fastestLap?: Maybe<FastestLap>;
  /** Reads a set of `FastestLap`. */
  fastestLaps?: Maybe<Array<FastestLap>>;
  /** Reads a set of `FreePractice1Result`. */
  freePractice1Results?: Maybe<Array<FreePractice1Result>>;
  /** Reads a set of `FreePractice2Result`. */
  freePractice2Results?: Maybe<Array<FreePractice2Result>>;
  /** Reads a set of `FreePractice3Result`. */
  freePractice3Results?: Maybe<Array<FreePractice3Result>>;
  /** Reads a set of `FreePractice4Result`. */
  freePractice4Results?: Maybe<Array<FreePractice4Result>>;
  /** Get a single `GrandPrix`. */
  grandPrix?: Maybe<GrandPrix>;
  /** Reads a set of `GrandPrix`. */
  grandPrixes?: Maybe<Array<GrandPrix>>;
  /** Get a single `PitStop`. */
  pitStop?: Maybe<PitStop>;
  /** Reads a set of `PitStop`. */
  pitStops?: Maybe<Array<PitStop>>;
  /** Reads a set of `PreQualifyingResult`. */
  preQualifyingResults?: Maybe<Array<PreQualifyingResult>>;
  /** Reads a set of `Qualifying1Result`. */
  qualifying1Results?: Maybe<Array<Qualifying1Result>>;
  /** Reads a set of `Qualifying2Result`. */
  qualifying2Results?: Maybe<Array<Qualifying2Result>>;
  /** Get a single `QualifyingResult`. */
  qualifyingResult?: Maybe<QualifyingResult>;
  /** Reads a set of `QualifyingResult`. */
  qualifyingResults?: Maybe<Array<QualifyingResult>>;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** Get a single `Race`. */
  race?: Maybe<Race>;
  /** Get a single `Race`. */
  raceByYearAndRound?: Maybe<Race>;
  /** Reads a set of `RaceDatum`. */
  raceData?: Maybe<Array<RaceDatum>>;
  /** Get a single `RaceDatum`. */
  raceDatum?: Maybe<RaceDatum>;
  /** Get a single `RaceDriverStanding`. */
  raceDriverStanding?: Maybe<RaceDriverStanding>;
  /** Reads a set of `RaceDriverStanding`. */
  raceDriverStandings?: Maybe<Array<RaceDriverStanding>>;
  /** Get a single `RaceResult`. */
  raceResult?: Maybe<RaceResult>;
  /** Reads a set of `RaceResult`. */
  raceResults?: Maybe<Array<RaceResult>>;
  /** Get a single `RaceTeamStanding`. */
  raceTeamStanding?: Maybe<RaceTeamStanding>;
  /** Reads a set of `RaceTeamStanding`. */
  raceTeamStandings?: Maybe<Array<RaceTeamStanding>>;
  /** Reads a set of `Race`. */
  races?: Maybe<Array<Race>>;
  /** Get a single `Season`. */
  season?: Maybe<Season>;
  /** Get a single `SeasonDriver`. */
  seasonDriver?: Maybe<SeasonDriver>;
  /** Get a single `SeasonDriverStanding`. */
  seasonDriverStanding?: Maybe<SeasonDriverStanding>;
  /** Reads a set of `SeasonDriverStanding`. */
  seasonDriverStandings?: Maybe<Array<SeasonDriverStanding>>;
  /** Reads a set of `SeasonDriver`. */
  seasonDrivers?: Maybe<Array<SeasonDriver>>;
  /** Get a single `SeasonEngineManufacturer`. */
  seasonEngineManufacturer?: Maybe<SeasonEngineManufacturer>;
  /** Reads a set of `SeasonEngineManufacturer`. */
  seasonEngineManufacturers?: Maybe<Array<SeasonEngineManufacturer>>;
  /** Get a single `SeasonEntrant`. */
  seasonEntrant?: Maybe<SeasonEntrant>;
  /** Get a single `SeasonEntrantChassis`. */
  seasonEntrantChassis?: Maybe<SeasonEntrantChassis>;
  /** Reads a set of `SeasonEntrantChassis`. */
  seasonEntrantChassises?: Maybe<Array<SeasonEntrantChassis>>;
  /** Get a single `SeasonEntrantDriver`. */
  seasonEntrantDriver?: Maybe<SeasonEntrantDriver>;
  /** Reads a set of `SeasonEntrantDriver`. */
  seasonEntrantDrivers?: Maybe<Array<SeasonEntrantDriver>>;
  /** Get a single `SeasonEntrantEngine`. */
  seasonEntrantEngine?: Maybe<SeasonEntrantEngine>;
  /** Reads a set of `SeasonEntrantEngine`. */
  seasonEntrantEngines?: Maybe<Array<SeasonEntrantEngine>>;
  /** Get a single `SeasonEntrantTeam`. */
  seasonEntrantTeam?: Maybe<SeasonEntrantTeam>;
  /** Reads a set of `SeasonEntrantTeam`. */
  seasonEntrantTeams?: Maybe<Array<SeasonEntrantTeam>>;
  /** Get a single `SeasonEntrantTyreManufacturer`. */
  seasonEntrantTyreManufacturer?: Maybe<SeasonEntrantTyreManufacturer>;
  /** Reads a set of `SeasonEntrantTyreManufacturer`. */
  seasonEntrantTyreManufacturers?: Maybe<Array<SeasonEntrantTyreManufacturer>>;
  /** Reads a set of `SeasonEntrant`. */
  seasonEntrants?: Maybe<Array<SeasonEntrant>>;
  /** Get a single `SeasonTeam`. */
  seasonTeam?: Maybe<SeasonTeam>;
  /** Get a single `SeasonTeamStanding`. */
  seasonTeamStanding?: Maybe<SeasonTeamStanding>;
  /** Reads a set of `SeasonTeamStanding`. */
  seasonTeamStandings?: Maybe<Array<SeasonTeamStanding>>;
  /** Reads a set of `SeasonTeam`. */
  seasonTeams?: Maybe<Array<SeasonTeam>>;
  /** Get a single `SeasonTyreManufacturer`. */
  seasonTyreManufacturer?: Maybe<SeasonTyreManufacturer>;
  /** Reads a set of `SeasonTyreManufacturer`. */
  seasonTyreManufacturers?: Maybe<Array<SeasonTyreManufacturer>>;
  /** Reads a set of `Season`. */
  seasons?: Maybe<Array<Season>>;
  /** Get a single `SprintQualifyingResult`. */
  sprintQualifyingResult?: Maybe<SprintQualifyingResult>;
  /** Reads a set of `SprintQualifyingResult`. */
  sprintQualifyingResults?: Maybe<Array<SprintQualifyingResult>>;
  /** Get a single `SprintRaceResult`. */
  sprintRaceResult?: Maybe<SprintRaceResult>;
  /** Reads a set of `SprintRaceResult`. */
  sprintRaceResults?: Maybe<Array<SprintRaceResult>>;
  /** Get a single `SprintStartingGridPosition`. */
  sprintStartingGridPosition?: Maybe<SprintStartingGridPosition>;
  /** Reads a set of `SprintStartingGridPosition`. */
  sprintStartingGridPositions?: Maybe<Array<SprintStartingGridPosition>>;
  /** Get a single `StartingGridPosition`. */
  startingGridPosition?: Maybe<StartingGridPosition>;
  /** Reads a set of `StartingGridPosition`. */
  startingGridPositions?: Maybe<Array<StartingGridPosition>>;
  /** Get a single `Team`. */
  team?: Maybe<Team>;
  /** Reads a set of `TeamChronology`. */
  teamChronologies?: Maybe<Array<TeamChronology>>;
  /** Get a single `TeamChronology`. */
  teamChronology?: Maybe<TeamChronology>;
  /** Get a single `TeamChronology`. */
  teamChronologyByTeamIdAndOtherTeamIdAndYearFromAndYearTo?: Maybe<TeamChronology>;
  /** Reads a set of `Team`. */
  teams?: Maybe<Array<Team>>;
  /** Get a single `TyreManufacturer`. */
  tyreManufacturer?: Maybe<TyreManufacturer>;
  /** Reads a set of `TyreManufacturer`. */
  tyreManufacturers?: Maybe<Array<TyreManufacturer>>;
  /** Reads a set of `WarmingUpResult`. */
  warmingUpResults?: Maybe<Array<WarmingUpResult>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAppCircuitDescriptionArgs = {
  circuitId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAppCircuitDescriptionsArgs = {
  condition?: InputMaybe<AppCircuitDescriptionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AppCircuitDescriptionOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAppConstructorBioArgs = {
  teamId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAppConstructorBiosArgs = {
  condition?: InputMaybe<AppConstructorBioCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AppConstructorBioOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAppDriverBioArgs = {
  driverId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAppDriverBiosArgs = {
  condition?: InputMaybe<AppDriverBioCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AppDriverBioOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAppIngestStateArgs = {
  key: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAppIngestStatesArgs = {
  condition?: InputMaybe<AppIngestStateCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
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
export type QueryAppLapTimesArgs = {
  condition?: InputMaybe<AppLapTimeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AppLapTimeOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAppTeamColorArgs = {
  teamId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAppTeamColorsArgs = {
  condition?: InputMaybe<AppTeamColorCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AppTeamColorOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAppTeamHistoriesArgs = {
  condition?: InputMaybe<AppTeamHistoryCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
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
export type QueryChassisArgs = {
  id: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryChassisesArgs = {
  condition?: InputMaybe<ChassisCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ChassisOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCircuitArgs = {
  id: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCircuitLayoutArgs = {
  id: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCircuitLayoutsArgs = {
  condition?: InputMaybe<CircuitLayoutCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CircuitLayoutOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCircuitsArgs = {
  condition?: InputMaybe<CircuitCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CircuitOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryContinentArgs = {
  id: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryContinentByCodeArgs = {
  code: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryContinentByNameArgs = {
  name: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryContinentsArgs = {
  condition?: InputMaybe<ContinentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ContinentOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCountriesArgs = {
  condition?: InputMaybe<CountryCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CountryOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCountryArgs = {
  id: Scalars['String']['input'];
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
export type QueryCountryByNameArgs = {
  name: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDriverArgs = {
  id: Scalars['String']['input'];
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
export type QueryDriverFamilyRelationshipsArgs = {
  condition?: InputMaybe<DriverFamilyRelationshipCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverFamilyRelationshipOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryDriverOfTheDayResultArgs = {
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDriverOfTheDayResultsArgs = {
  condition?: InputMaybe<DriverOfTheDayResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverOfTheDayResultOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryDriversArgs = {
  condition?: InputMaybe<DriverCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEngineArgs = {
  id: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEngineManufacturerArgs = {
  id: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEngineManufacturersArgs = {
  condition?: InputMaybe<EngineManufacturerCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EngineManufacturerOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEnginesArgs = {
  condition?: InputMaybe<EngineCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EngineOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEntrantArgs = {
  id: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEntrantsArgs = {
  condition?: InputMaybe<EntrantCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EntrantOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryFastestLapArgs = {
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryFastestLapsArgs = {
  condition?: InputMaybe<FastestLapCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FastestLapOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryFreePractice1ResultsArgs = {
  condition?: InputMaybe<FreePractice1ResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FreePractice1ResultOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryFreePractice2ResultsArgs = {
  condition?: InputMaybe<FreePractice2ResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FreePractice2ResultOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryFreePractice3ResultsArgs = {
  condition?: InputMaybe<FreePractice3ResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FreePractice3ResultOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryFreePractice4ResultsArgs = {
  condition?: InputMaybe<FreePractice4ResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FreePractice4ResultOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGrandPrixArgs = {
  id: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGrandPrixesArgs = {
  condition?: InputMaybe<GrandPrixCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GrandPrixOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPitStopArgs = {
  driverId: Scalars['String']['input'];
  raceId: Scalars['Int']['input'];
  stop: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPitStopsArgs = {
  condition?: InputMaybe<PitStopCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PitStopOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPreQualifyingResultsArgs = {
  condition?: InputMaybe<PreQualifyingResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PreQualifyingResultOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryQualifying1ResultsArgs = {
  condition?: InputMaybe<Qualifying1ResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Qualifying1ResultOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryQualifying2ResultsArgs = {
  condition?: InputMaybe<Qualifying2ResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Qualifying2ResultOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryQualifyingResultArgs = {
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryQualifyingResultsArgs = {
  condition?: InputMaybe<QualifyingResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<QualifyingResultOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryRaceArgs = {
  rowId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRaceByYearAndRoundArgs = {
  round: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRaceDataArgs = {
  condition?: InputMaybe<RaceDatumCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
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
export type QueryRaceDriverStandingArgs = {
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRaceDriverStandingsArgs = {
  condition?: InputMaybe<RaceDriverStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceDriverStandingOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryRaceResultArgs = {
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRaceResultsArgs = {
  condition?: InputMaybe<RaceResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceResultOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryRaceTeamStandingArgs = {
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRaceTeamStandingsArgs = {
  condition?: InputMaybe<RaceTeamStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceTeamStandingOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryRacesArgs = {
  condition?: InputMaybe<RaceCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonArgs = {
  year: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonDriverArgs = {
  driverId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonDriverStandingArgs = {
  positionDisplayOrder: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonDriverStandingsArgs = {
  condition?: InputMaybe<SeasonDriverStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonDriverStandingOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonDriversArgs = {
  condition?: InputMaybe<SeasonDriverCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonDriverOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonEngineManufacturerArgs = {
  engineManufacturerId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonEngineManufacturersArgs = {
  condition?: InputMaybe<SeasonEngineManufacturerCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEngineManufacturerOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonEntrantArgs = {
  entrantId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
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
export type QuerySeasonEntrantChassisesArgs = {
  condition?: InputMaybe<SeasonEntrantChassisCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
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
export type QuerySeasonEntrantDriversArgs = {
  condition?: InputMaybe<SeasonEntrantDriverCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
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
export type QuerySeasonEntrantEnginesArgs = {
  condition?: InputMaybe<SeasonEntrantEngineCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
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
export type QuerySeasonEntrantTeamsArgs = {
  condition?: InputMaybe<SeasonEntrantTeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
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
export type QuerySeasonEntrantTyreManufacturersArgs = {
  condition?: InputMaybe<SeasonEntrantTyreManufacturerCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantTyreManufacturerOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonEntrantsArgs = {
  condition?: InputMaybe<SeasonEntrantCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonTeamArgs = {
  teamId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonTeamStandingArgs = {
  positionDisplayOrder: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonTeamStandingsArgs = {
  condition?: InputMaybe<SeasonTeamStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonTeamStandingOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonTeamsArgs = {
  condition?: InputMaybe<SeasonTeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonTeamOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonTyreManufacturerArgs = {
  tyreManufacturerId: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonTyreManufacturersArgs = {
  condition?: InputMaybe<SeasonTyreManufacturerCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonTyreManufacturerOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonsArgs = {
  condition?: InputMaybe<SeasonCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySprintQualifyingResultArgs = {
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySprintQualifyingResultsArgs = {
  condition?: InputMaybe<SprintQualifyingResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintQualifyingResultOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySprintRaceResultArgs = {
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySprintRaceResultsArgs = {
  condition?: InputMaybe<SprintRaceResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintRaceResultOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySprintStartingGridPositionArgs = {
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySprintStartingGridPositionsArgs = {
  condition?: InputMaybe<SprintStartingGridPositionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintStartingGridPositionOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryStartingGridPositionArgs = {
  positionDisplayOrder: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryStartingGridPositionsArgs = {
  condition?: InputMaybe<StartingGridPositionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StartingGridPositionOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTeamArgs = {
  id: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTeamChronologiesArgs = {
  condition?: InputMaybe<TeamChronologyCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamChronologyOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTeamChronologyArgs = {
  positionDisplayOrder: Scalars['Int']['input'];
  teamId: Scalars['String']['input'];
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
  condition?: InputMaybe<TeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTyreManufacturerArgs = {
  id: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTyreManufacturersArgs = {
  condition?: InputMaybe<TyreManufacturerCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TyreManufacturerOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryWarmingUpResultsArgs = {
  condition?: InputMaybe<WarmingUpResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WarmingUpResultOrderBy>>;
};

export type Race = {
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
  driverOfTheDayResults: Array<DriverOfTheDayResult>;
  driversChampionshipDecider: Scalars['Boolean']['output'];
  /** Reads and enables pagination through a set of `FastestLap`. */
  fastestLaps: Array<FastestLap>;
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
  /** Reads and enables pagination through a set of `AppLapTime`. */
  lapTimes: Array<AppLapTime>;
  laps: Scalars['Int']['output'];
  officialName: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `PitStop`. */
  pitStops: Array<PitStop>;
  preQualifyingDate?: Maybe<Scalars['Date']['output']>;
  preQualifyingTime?: Maybe<Scalars['String']['output']>;
  qualifying1Date?: Maybe<Scalars['Date']['output']>;
  qualifying1Time?: Maybe<Scalars['String']['output']>;
  qualifying2Date?: Maybe<Scalars['Date']['output']>;
  qualifying2Time?: Maybe<Scalars['String']['output']>;
  qualifyingDate?: Maybe<Scalars['Date']['output']>;
  qualifyingFormat: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `QualifyingResult`. */
  qualifyingResults: Array<QualifyingResult>;
  qualifyingTime?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `RaceDatum`. */
  raceData: Array<RaceDatum>;
  /** Reads and enables pagination through a set of `RaceDriverStanding`. */
  raceDriverStandings: Array<RaceDriverStanding>;
  /** Reads and enables pagination through a set of `RaceResult`. */
  raceResults: Array<RaceResult>;
  /** Reads and enables pagination through a set of `RaceTeamStanding`. */
  raceTeamStandings: Array<RaceTeamStanding>;
  round: Scalars['Int']['output'];
  rowId: Scalars['Int']['output'];
  scheduledDistance?: Maybe<Scalars['BigFloat']['output']>;
  scheduledLaps?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `Season` that is related to this `Race`. */
  season?: Maybe<Season>;
  sprintQualifyingDate?: Maybe<Scalars['Date']['output']>;
  sprintQualifyingFormat?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `SprintQualifyingResult`. */
  sprintQualifyingResults: Array<SprintQualifyingResult>;
  sprintQualifyingTime?: Maybe<Scalars['String']['output']>;
  sprintRaceDate?: Maybe<Scalars['Date']['output']>;
  /** Reads and enables pagination through a set of `SprintRaceResult`. */
  sprintRaceResults: Array<SprintRaceResult>;
  sprintRaceTime?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `SprintStartingGridPosition`. */
  sprintStartingGridPositions: Array<SprintStartingGridPosition>;
  /** Reads and enables pagination through a set of `StartingGridPosition`. */
  startingGridPositions: Array<StartingGridPosition>;
  time?: Maybe<Scalars['String']['output']>;
  turns: Scalars['Int']['output'];
  warmingUpDate?: Maybe<Scalars['Date']['output']>;
  warmingUpTime?: Maybe<Scalars['String']['output']>;
  year: Scalars['Int']['output'];
};


export type RaceDriverOfTheDayResultsArgs = {
  condition?: InputMaybe<DriverOfTheDayResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverOfTheDayResultOrderBy>>;
};


export type RaceFastestLapsArgs = {
  condition?: InputMaybe<FastestLapCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FastestLapOrderBy>>;
};


export type RaceLapTimesArgs = {
  condition?: InputMaybe<AppLapTimeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AppLapTimeOrderBy>>;
};


export type RacePitStopsArgs = {
  condition?: InputMaybe<PitStopCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PitStopOrderBy>>;
};


export type RaceQualifyingResultsArgs = {
  condition?: InputMaybe<QualifyingResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<QualifyingResultOrderBy>>;
};


export type RaceRaceDataArgs = {
  condition?: InputMaybe<RaceDatumCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceDatumOrderBy>>;
};


export type RaceRaceDriverStandingsArgs = {
  condition?: InputMaybe<RaceDriverStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceDriverStandingOrderBy>>;
};


export type RaceRaceResultsArgs = {
  condition?: InputMaybe<RaceResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceResultOrderBy>>;
};


export type RaceRaceTeamStandingsArgs = {
  condition?: InputMaybe<RaceTeamStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceTeamStandingOrderBy>>;
};


export type RaceSprintQualifyingResultsArgs = {
  condition?: InputMaybe<SprintQualifyingResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintQualifyingResultOrderBy>>;
};


export type RaceSprintRaceResultsArgs = {
  condition?: InputMaybe<SprintRaceResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintRaceResultOrderBy>>;
};


export type RaceSprintStartingGridPositionsArgs = {
  condition?: InputMaybe<SprintStartingGridPositionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintStartingGridPositionOrderBy>>;
};


export type RaceStartingGridPositionsArgs = {
  condition?: InputMaybe<StartingGridPositionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
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

export type RaceDatum = {
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

export type RaceDriverStanding = {
  __typename?: 'RaceDriverStanding';
  championshipWon: Scalars['Boolean']['output'];
  /** Reads a single `Driver` that is related to this `RaceDriverStanding`. */
  driver?: Maybe<Driver>;
  driverId: Scalars['String']['output'];
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

export type RaceResult = {
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

export type RaceTeamStanding = {
  __typename?: 'RaceTeamStanding';
  championshipWon: Scalars['Boolean']['output'];
  /** Reads a single `EngineManufacturer` that is related to this `RaceTeamStanding`. */
  engineManufacturer?: Maybe<EngineManufacturer>;
  engineManufacturerId: Scalars['String']['output'];
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

export type Season = {
  __typename?: 'Season';
  ended?: Maybe<Scalars['Boolean']['output']>;
  hasResults?: Maybe<Scalars['Boolean']['output']>;
  /** Reads and enables pagination through a set of `Race`. */
  racesByYear: Array<Race>;
  /** Reads and enables pagination through a set of `SeasonDriverStanding`. */
  seasonDriverStandingsByYear: Array<SeasonDriverStanding>;
  /** Reads and enables pagination through a set of `SeasonDriver`. */
  seasonDriversByYear: Array<SeasonDriver>;
  /** Reads and enables pagination through a set of `SeasonEngineManufacturer`. */
  seasonEngineManufacturersByYear: Array<SeasonEngineManufacturer>;
  /** Reads and enables pagination through a set of `SeasonEntrantChassis`. */
  seasonEntrantChassisByYear: Array<SeasonEntrantChassis>;
  /** Reads and enables pagination through a set of `SeasonEntrantDriver`. */
  seasonEntrantDriversByYear: Array<SeasonEntrantDriver>;
  /** Reads and enables pagination through a set of `SeasonEntrantEngine`. */
  seasonEntrantEnginesByYear: Array<SeasonEntrantEngine>;
  /** Reads and enables pagination through a set of `SeasonEntrantTeam`. */
  seasonEntrantTeamsByYear: Array<SeasonEntrantTeam>;
  /** Reads and enables pagination through a set of `SeasonEntrantTyreManufacturer`. */
  seasonEntrantTyreManufacturersByYear: Array<SeasonEntrantTyreManufacturer>;
  /** Reads and enables pagination through a set of `SeasonEntrant`. */
  seasonEntrantsByYear: Array<SeasonEntrant>;
  /** Reads and enables pagination through a set of `SeasonTeamStanding`. */
  seasonTeamStandingsByYear: Array<SeasonTeamStanding>;
  /** Reads and enables pagination through a set of `SeasonTeam`. */
  seasonTeamsByYear: Array<SeasonTeam>;
  /** Reads and enables pagination through a set of `SeasonTyreManufacturer`. */
  seasonTyreManufacturersByYear: Array<SeasonTyreManufacturer>;
  year: Scalars['Int']['output'];
};


export type SeasonRacesByYearArgs = {
  condition?: InputMaybe<RaceCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceOrderBy>>;
};


export type SeasonSeasonDriverStandingsByYearArgs = {
  condition?: InputMaybe<SeasonDriverStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonDriverStandingOrderBy>>;
};


export type SeasonSeasonDriversByYearArgs = {
  condition?: InputMaybe<SeasonDriverCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonDriverOrderBy>>;
};


export type SeasonSeasonEngineManufacturersByYearArgs = {
  condition?: InputMaybe<SeasonEngineManufacturerCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEngineManufacturerOrderBy>>;
};


export type SeasonSeasonEntrantChassisByYearArgs = {
  condition?: InputMaybe<SeasonEntrantChassisCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantChassisOrderBy>>;
};


export type SeasonSeasonEntrantDriversByYearArgs = {
  condition?: InputMaybe<SeasonEntrantDriverCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantDriverOrderBy>>;
};


export type SeasonSeasonEntrantEnginesByYearArgs = {
  condition?: InputMaybe<SeasonEntrantEngineCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantEngineOrderBy>>;
};


export type SeasonSeasonEntrantTeamsByYearArgs = {
  condition?: InputMaybe<SeasonEntrantTeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantTeamOrderBy>>;
};


export type SeasonSeasonEntrantTyreManufacturersByYearArgs = {
  condition?: InputMaybe<SeasonEntrantTyreManufacturerCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantTyreManufacturerOrderBy>>;
};


export type SeasonSeasonEntrantsByYearArgs = {
  condition?: InputMaybe<SeasonEntrantCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantOrderBy>>;
};


export type SeasonSeasonTeamStandingsByYearArgs = {
  condition?: InputMaybe<SeasonTeamStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonTeamStandingOrderBy>>;
};


export type SeasonSeasonTeamsByYearArgs = {
  condition?: InputMaybe<SeasonTeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonTeamOrderBy>>;
};


export type SeasonSeasonTyreManufacturersByYearArgs = {
  condition?: InputMaybe<SeasonTyreManufacturerCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonTyreManufacturerOrderBy>>;
};

/** A condition to be used against `Season` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type SeasonCondition = {
  /** Checks for equality with the object’s `year` field. */
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type SeasonDriver = {
  __typename?: 'SeasonDriver';
  bestRaceResult?: Maybe<Scalars['Int']['output']>;
  bestSprintRaceResult?: Maybe<Scalars['Int']['output']>;
  bestStartingGridPosition?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `Driver` that is related to this `SeasonDriver`. */
  driver?: Maybe<Driver>;
  driverId: Scalars['String']['output'];
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

export type SeasonDriverStanding = {
  __typename?: 'SeasonDriverStanding';
  championshipWon: Scalars['Boolean']['output'];
  /** Reads a single `Driver` that is related to this `SeasonDriverStanding`. */
  driver?: Maybe<Driver>;
  driverId: Scalars['String']['output'];
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

export type SeasonEngineManufacturer = {
  __typename?: 'SeasonEngineManufacturer';
  bestRaceResult?: Maybe<Scalars['Int']['output']>;
  bestSprintRaceResult?: Maybe<Scalars['Int']['output']>;
  bestStartingGridPosition?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `EngineManufacturer` that is related to this `SeasonEngineManufacturer`. */
  engineManufacturer?: Maybe<EngineManufacturer>;
  engineManufacturerId: Scalars['String']['output'];
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

export type SeasonEntrant = {
  __typename?: 'SeasonEntrant';
  /** Reads a single `Country` that is related to this `SeasonEntrant`. */
  country?: Maybe<Country>;
  countryId: Scalars['String']['output'];
  /** Reads a single `Entrant` that is related to this `SeasonEntrant`. */
  entrant?: Maybe<Entrant>;
  entrantId: Scalars['String']['output'];
  /** Reads a single `Season` that is related to this `SeasonEntrant`. */
  season?: Maybe<Season>;
  year: Scalars['Int']['output'];
};

export type SeasonEntrantChassis = {
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

export type SeasonEntrantDriver = {
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

export type SeasonEntrantEngine = {
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

export type SeasonEntrantTeam = {
  __typename?: 'SeasonEntrantTeam';
  /** Reads a single `EngineManufacturer` that is related to this `SeasonEntrantTeam`. */
  engineManufacturer?: Maybe<EngineManufacturer>;
  engineManufacturerId: Scalars['String']['output'];
  /** Reads a single `Entrant` that is related to this `SeasonEntrantTeam`. */
  entrant?: Maybe<Entrant>;
  entrantId: Scalars['String']['output'];
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

export type SeasonEntrantTyreManufacturer = {
  __typename?: 'SeasonEntrantTyreManufacturer';
  /** Reads a single `EngineManufacturer` that is related to this `SeasonEntrantTyreManufacturer`. */
  engineManufacturer?: Maybe<EngineManufacturer>;
  engineManufacturerId: Scalars['String']['output'];
  /** Reads a single `Entrant` that is related to this `SeasonEntrantTyreManufacturer`. */
  entrant?: Maybe<Entrant>;
  entrantId: Scalars['String']['output'];
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

/** Methods to use when ordering `Season`. */
export enum SeasonOrderBy {
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  YearAsc = 'YEAR_ASC',
  YearDesc = 'YEAR_DESC'
}

export type SeasonTeam = {
  __typename?: 'SeasonTeam';
  bestRaceResult?: Maybe<Scalars['Int']['output']>;
  bestSprintRaceResult?: Maybe<Scalars['Int']['output']>;
  bestStartingGridPosition?: Maybe<Scalars['Int']['output']>;
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

export type SeasonTeamStanding = {
  __typename?: 'SeasonTeamStanding';
  championshipWon: Scalars['Boolean']['output'];
  /** Reads a single `EngineManufacturer` that is related to this `SeasonTeamStanding`. */
  engineManufacturer?: Maybe<EngineManufacturer>;
  engineManufacturerId: Scalars['String']['output'];
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

export type SeasonTyreManufacturer = {
  __typename?: 'SeasonTyreManufacturer';
  bestRaceResult?: Maybe<Scalars['Int']['output']>;
  bestSprintRaceResult?: Maybe<Scalars['Int']['output']>;
  bestStartingGridPosition?: Maybe<Scalars['Int']['output']>;
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

export type SprintQualifyingResult = {
  __typename?: 'SprintQualifyingResult';
  /** Reads a single `Driver` that is related to this `SprintQualifyingResult`. */
  driver?: Maybe<Driver>;
  driverId?: Maybe<Scalars['String']['output']>;
  driverNumber?: Maybe<Scalars['String']['output']>;
  engineManufacturerId?: Maybe<Scalars['String']['output']>;
  gap?: Maybe<Scalars['String']['output']>;
  gapMillis?: Maybe<Scalars['Int']['output']>;
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

export type SprintRaceResult = {
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

export type SprintStartingGridPosition = {
  __typename?: 'SprintStartingGridPosition';
  /** Reads a single `Driver` that is related to this `SprintStartingGridPosition`. */
  driver?: Maybe<Driver>;
  driverId?: Maybe<Scalars['String']['output']>;
  driverNumber?: Maybe<Scalars['String']['output']>;
  engineManufacturerId?: Maybe<Scalars['String']['output']>;
  gridPenalty?: Maybe<Scalars['String']['output']>;
  gridPenaltyPositions?: Maybe<Scalars['Int']['output']>;
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

export type StartingGridPosition = {
  __typename?: 'StartingGridPosition';
  /** Reads a single `Driver` that is related to this `StartingGridPosition`. */
  driver?: Maybe<Driver>;
  driverId?: Maybe<Scalars['String']['output']>;
  driverNumber?: Maybe<Scalars['String']['output']>;
  engineManufacturerId?: Maybe<Scalars['String']['output']>;
  gridPenalty?: Maybe<Scalars['String']['output']>;
  gridPenaltyPositions?: Maybe<Scalars['Int']['output']>;
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

export type Team = {
  __typename?: 'Team';
  /** Reads and enables pagination through a set of `AppTeamHistory`. */
  antecedents: Array<AppTeamHistory>;
  bestChampionshipPosition?: Maybe<Scalars['Int']['output']>;
  bestRaceResult?: Maybe<Scalars['Int']['output']>;
  bestSprintRaceResult?: Maybe<Scalars['Int']['output']>;
  bestStartingGridPosition?: Maybe<Scalars['Int']['output']>;
  bio?: Maybe<WikipediaBio>;
  /** Reads and enables pagination through a set of `Chassis`. */
  chassises: Array<Chassis>;
  /** Reads a single `AppTeamColor` that is related to this `Team`. */
  colors?: Maybe<AppTeamColor>;
  /** Reads a single `Country` that is related to this `Team`. */
  country?: Maybe<Country>;
  countryId: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `DriverOfTheDayResult`. */
  driverOfTheDayResults: Array<DriverOfTheDayResult>;
  /** Reads and enables pagination through a set of `FastestLap`. */
  fastestLaps: Array<FastestLap>;
  fullName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `PitStop`. */
  pitStops: Array<PitStop>;
  /** Reads and enables pagination through a set of `QualifyingResult`. */
  qualifyingResults: Array<QualifyingResult>;
  /** Reads and enables pagination through a set of `RaceDatum`. */
  raceData: Array<RaceDatum>;
  /** Reads and enables pagination through a set of `RaceResult`. */
  raceResults: Array<RaceResult>;
  /** Reads and enables pagination through a set of `RaceTeamStanding`. */
  raceTeamStandings: Array<RaceTeamStanding>;
  /** Reads and enables pagination through a set of `SeasonEntrantChassis`. */
  seasonEntrantChassises: Array<SeasonEntrantChassis>;
  /** Reads and enables pagination through a set of `SeasonEntrantDriver`. */
  seasonEntrantDrivers: Array<SeasonEntrantDriver>;
  /** Reads and enables pagination through a set of `SeasonEntrantEngine`. */
  seasonEntrantEngines: Array<SeasonEntrantEngine>;
  /** Reads and enables pagination through a set of `SeasonEntrantTeam`. */
  seasonEntrantTeams: Array<SeasonEntrantTeam>;
  /** Reads and enables pagination through a set of `SeasonEntrantTyreManufacturer`. */
  seasonEntrantTyreManufacturers: Array<SeasonEntrantTyreManufacturer>;
  /** Reads and enables pagination through a set of `SeasonTeamStanding`. */
  seasonTeamStandings: Array<SeasonTeamStanding>;
  /** Reads and enables pagination through a set of `SeasonTeam`. */
  seasonTeams: Array<SeasonTeam>;
  /** Reads and enables pagination through a set of `SprintQualifyingResult`. */
  sprintQualifyingResults: Array<SprintQualifyingResult>;
  /** Reads and enables pagination through a set of `SprintRaceResult`. */
  sprintRaceResults: Array<SprintRaceResult>;
  /** Reads and enables pagination through a set of `SprintStartingGridPosition`. */
  sprintStartingGridPositions: Array<SprintStartingGridPosition>;
  /** Reads and enables pagination through a set of `StartingGridPosition`. */
  startingGridPositions: Array<StartingGridPosition>;
  /** Reads and enables pagination through a set of `AppTeamHistory`. */
  successors: Array<AppTeamHistory>;
  /** Reads and enables pagination through a set of `TeamChronology`. */
  teamChronologies: Array<TeamChronology>;
  /** Reads and enables pagination through a set of `TeamChronology`. */
  teamChronologiesByOtherTeamId: Array<TeamChronology>;
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
  condition?: InputMaybe<AppTeamHistoryCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AppTeamHistoryOrderBy>>;
};


export type TeamChassisesArgs = {
  condition?: InputMaybe<ChassisCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ChassisOrderBy>>;
};


export type TeamDriverOfTheDayResultsArgs = {
  condition?: InputMaybe<DriverOfTheDayResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DriverOfTheDayResultOrderBy>>;
};


export type TeamFastestLapsArgs = {
  condition?: InputMaybe<FastestLapCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FastestLapOrderBy>>;
};


export type TeamPitStopsArgs = {
  condition?: InputMaybe<PitStopCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PitStopOrderBy>>;
};


export type TeamQualifyingResultsArgs = {
  condition?: InputMaybe<QualifyingResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<QualifyingResultOrderBy>>;
};


export type TeamRaceDataArgs = {
  condition?: InputMaybe<RaceDatumCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceDatumOrderBy>>;
};


export type TeamRaceResultsArgs = {
  condition?: InputMaybe<RaceResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceResultOrderBy>>;
};


export type TeamRaceTeamStandingsArgs = {
  condition?: InputMaybe<RaceTeamStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceTeamStandingOrderBy>>;
};


export type TeamSeasonEntrantChassisesArgs = {
  condition?: InputMaybe<SeasonEntrantChassisCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantChassisOrderBy>>;
};


export type TeamSeasonEntrantDriversArgs = {
  condition?: InputMaybe<SeasonEntrantDriverCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantDriverOrderBy>>;
};


export type TeamSeasonEntrantEnginesArgs = {
  condition?: InputMaybe<SeasonEntrantEngineCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantEngineOrderBy>>;
};


export type TeamSeasonEntrantTeamsArgs = {
  condition?: InputMaybe<SeasonEntrantTeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantTeamOrderBy>>;
};


export type TeamSeasonEntrantTyreManufacturersArgs = {
  condition?: InputMaybe<SeasonEntrantTyreManufacturerCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantTyreManufacturerOrderBy>>;
};


export type TeamSeasonTeamStandingsArgs = {
  condition?: InputMaybe<SeasonTeamStandingCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonTeamStandingOrderBy>>;
};


export type TeamSeasonTeamsArgs = {
  condition?: InputMaybe<SeasonTeamCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonTeamOrderBy>>;
};


export type TeamSprintQualifyingResultsArgs = {
  condition?: InputMaybe<SprintQualifyingResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintQualifyingResultOrderBy>>;
};


export type TeamSprintRaceResultsArgs = {
  condition?: InputMaybe<SprintRaceResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintRaceResultOrderBy>>;
};


export type TeamSprintStartingGridPositionsArgs = {
  condition?: InputMaybe<SprintStartingGridPositionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SprintStartingGridPositionOrderBy>>;
};


export type TeamStartingGridPositionsArgs = {
  condition?: InputMaybe<StartingGridPositionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StartingGridPositionOrderBy>>;
};


export type TeamSuccessorsArgs = {
  condition?: InputMaybe<AppTeamHistoryCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AppTeamHistoryOrderBy>>;
};


export type TeamTeamChronologiesArgs = {
  condition?: InputMaybe<TeamChronologyCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamChronologyOrderBy>>;
};


export type TeamTeamChronologiesByOtherTeamIdArgs = {
  condition?: InputMaybe<TeamChronologyCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamChronologyOrderBy>>;
};

export type TeamChronology = {
  __typename?: 'TeamChronology';
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

/** A condition to be used against `Team` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type TeamCondition = {
  /** Checks for equality with the object’s `countryId` field. */
  countryId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `fullName` field. */
  fullName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `Team`. */
export enum TeamOrderBy {
  CountryIdAsc = 'COUNTRY_ID_ASC',
  CountryIdDesc = 'COUNTRY_ID_DESC',
  FullNameAsc = 'FULL_NAME_ASC',
  FullNameDesc = 'FULL_NAME_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type TyreManufacturer = {
  __typename?: 'TyreManufacturer';
  bestRaceResult?: Maybe<Scalars['Int']['output']>;
  bestSprintRaceResult?: Maybe<Scalars['Int']['output']>;
  bestStartingGridPosition?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `Country` that is related to this `TyreManufacturer`. */
  country?: Maybe<Country>;
  countryId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `RaceDatum`. */
  raceData: Array<RaceDatum>;
  /** Reads and enables pagination through a set of `SeasonEntrantTyreManufacturer`. */
  seasonEntrantTyreManufacturers: Array<SeasonEntrantTyreManufacturer>;
  /** Reads and enables pagination through a set of `SeasonTyreManufacturer`. */
  seasonTyreManufacturers: Array<SeasonTyreManufacturer>;
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
  condition?: InputMaybe<RaceDatumCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RaceDatumOrderBy>>;
};


export type TyreManufacturerSeasonEntrantTyreManufacturersArgs = {
  condition?: InputMaybe<SeasonEntrantTyreManufacturerCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SeasonEntrantTyreManufacturerOrderBy>>;
};


export type TyreManufacturerSeasonTyreManufacturersArgs = {
  condition?: InputMaybe<SeasonTyreManufacturerCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
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
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `TyreManufacturer`. */
export enum TyreManufacturerOrderBy {
  CountryIdAsc = 'COUNTRY_ID_ASC',
  CountryIdDesc = 'COUNTRY_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

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


export type CurrentSeasonQueryQuery = { __typename?: 'Query', seasons?: Array<{ __typename?: 'Season', year: number }> | null };

export type CurrentSeasonRaceParamsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentSeasonRaceParamsQueryQuery = { __typename?: 'Query', seasons?: Array<{ __typename?: 'Season', year: number, racesByYear: Array<{ __typename?: 'Race', round: number }> }> | null };

export type CurrentSeasonDriverIdsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentSeasonDriverIdsQueryQuery = { __typename?: 'Query', seasons?: Array<{ __typename?: 'Season', seasonDriverStandingsByYear: Array<{ __typename?: 'SeasonDriverStanding', driverId: string }> }> | null };

export type CurrentSeasonTeamIdsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentSeasonTeamIdsQueryQuery = { __typename?: 'Query', seasons?: Array<{ __typename?: 'Season', seasonTeamStandingsByYear: Array<{ __typename?: 'SeasonTeamStanding', teamId: string }> }> | null };

export type CurrentSeasonCircuitIdsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentSeasonCircuitIdsQueryQuery = { __typename?: 'Query', seasons?: Array<{ __typename?: 'Season', racesByYear: Array<{ __typename?: 'Race', circuitId: string }> }> | null };

export type CircuitLookupQueryQueryVariables = Exact<{
  ref: Scalars['String']['input'];
}>;


export type CircuitLookupQueryQuery = { __typename?: 'Query', circuit?: { __typename?: 'Circuit', id: string, fullName: string } | null };

export type AllCircuitsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCircuitsQueryQuery = { __typename?: 'Query', circuits?: Array<{ __typename?: 'Circuit', id: string }> | null };

export type RaceLookupQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  round: Scalars['Int']['input'];
}>;


export type RaceLookupQueryQuery = { __typename?: 'Query', races?: Array<{ __typename?: 'Race', rowId: number, year: number, round: number, officialName: string, date: any, circuit?: { __typename?: 'Circuit', id: string, fullName: string, placeName: string, countryId: string, latitude: any, longitude: any, description?: { __typename?: 'AppCircuitDescription', description: string } | null } | null }> | null };

export type AllRacesQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type AllRacesQueryQuery = { __typename?: 'Query', races?: Array<{ __typename?: 'Race', rowId: number, year: number, round: number }> | null };

export type ConstructorPageStaticQueryQueryVariables = Exact<{
  constructorRef: Scalars['String']['input'];
}>;


export type ConstructorPageStaticQueryQuery = { __typename?: 'Query', teams?: Array<{ __typename?: 'Team', id: string, name: string, countryId: string, country?: { __typename?: 'Country', id: string, alpha2Code: string, name: string } | null, colors?: { __typename?: 'AppTeamColor', teamId: string, primaryHex?: string | null } | null }> | null };

export type RaceFullDataServerQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  round: Scalars['Int']['input'];
}>;


export type RaceFullDataServerQuery = { __typename?: 'Query', races?: Array<{ __typename?: 'Race', year: number, round: number, raceResults: Array<{ __typename?: 'RaceResult', raceId: number, driverId?: string | null, teamId?: string | null, gridPositionNumber?: number | null, positionNumber?: number | null, positionText?: string | null, positionDisplayOrder: number, points?: any | null, laps?: number | null, time?: string | null, timeMillis?: number | null, reasonRetired?: string | null, driver?: { __typename?: 'Driver', id: string } | null }>, sprintRaceResults: Array<{ __typename?: 'SprintRaceResult', raceId: number, driverId?: string | null, teamId?: string | null, gridPositionNumber?: number | null, positionNumber?: number | null, positionText?: string | null, positionDisplayOrder: number, points?: any | null, laps?: number | null, time?: string | null, timeMillis?: number | null, reasonRetired?: string | null, driver?: { __typename?: 'Driver', id: string } | null }> }> | null };

export type SeasonMenuQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type SeasonMenuQueryQuery = { __typename?: 'Query', seasons?: Array<{ __typename?: 'Season', year: number }> | null };

export type CircuitsListQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type CircuitsListQueryQuery = { __typename?: 'Query', circuits?: Array<{ __typename?: 'Circuit', id: string, fullName: string, name: string, placeName: string, latitude: any, longitude: any, type: string, direction: string, country?: { __typename?: 'Country', id: string, name: string } | null, races: Array<{ __typename?: 'Race', year: number, round: number }> }> | null };

export type ConstructorsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type ConstructorsQueryQuery = { __typename?: 'Query', teams?: Array<{ __typename?: 'Team', id: string, name: string, countryId: string, colors?: { __typename?: 'AppTeamColor', teamId: string, primaryHex?: string | null, secondaryHex?: string | null } | null, seasons: Array<{ __typename?: 'SeasonTeam', year: number, teamId: string }>, raceResults: Array<{ __typename?: 'RaceResult', raceId: number, driverId?: string | null, positionNumber?: number | null }> }> | null };

export type ConstructorSeasonQueryQueryVariables = Exact<{
  teamId: Scalars['String']['input'];
  season: Scalars['Int']['input'];
}>;


export type ConstructorSeasonQueryQuery = { __typename?: 'Query', races?: Array<{ __typename?: 'Race', rowId: number, year: number, round: number, officialName: string, date: any, time?: string | null, raceResults: Array<{ __typename?: 'RaceResult', raceId: number, gridPositionNumber?: number | null, positionDisplayOrder: number, points?: any | null, timeMillis?: number | null, driverId?: string | null, teamId?: string | null, reasonRetired?: string | null }> }> | null };

export type ConstructorDriverPodiumsQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  constructorId: Scalars['String']['input'];
}>;


export type ConstructorDriverPodiumsQueryQuery = { __typename?: 'Query', season?: { __typename?: 'Season', year: number, racesByYear: Array<{ __typename?: 'Race', rowId: number, year: number, round: number, raceResults: Array<{ __typename?: 'RaceResult', raceId: number, driverId?: string | null, positionNumber?: number | null }> }> } | null };

export type ConstructorDriverPointsQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  constructorId: Scalars['String']['input'];
}>;


export type ConstructorDriverPointsQueryQuery = { __typename?: 'Query', season?: { __typename?: 'Season', year: number, racesByYear: Array<{ __typename?: 'Race', year: number, round: number, raceResults: Array<{ __typename?: 'RaceResult', raceId: number, driverId?: string | null, points?: any | null }>, sprintRaceResults: Array<{ __typename?: 'SprintRaceResult', raceId: number, driverId?: string | null, points?: any | null }> }> } | null };

export type ConstructorDriverQualifyingQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  constructorId: Scalars['String']['input'];
}>;


export type ConstructorDriverQualifyingQueryQuery = { __typename?: 'Query', season?: { __typename?: 'Season', year: number, racesByYear: Array<{ __typename?: 'Race', rowId: number, year: number, round: number, qualifyingResults: Array<{ __typename?: 'QualifyingResult', raceId: number, driverId?: string | null, positionNumber?: number | null, driver?: { __typename?: 'Driver', id: string, fullName: string } | null }> }> } | null };

export type DriversQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type DriversQueryQuery = { __typename?: 'Query', drivers?: Array<{ __typename?: 'Driver', id: string, firstName: string, lastName: string, nationalityCountryId: string, totalRaceStarts: number, totalRaceWins: number, totalPodiums: number, nationalityCountry?: { __typename?: 'Country', id: string, name: string, alpha2Code: string } | null, seasonDrivers: Array<{ __typename?: 'SeasonDriver', season?: { __typename?: 'Season', year: number } | null }> }> | null };

export type DriverCareerQueryQueryVariables = Exact<{
  driverId: Scalars['String']['input'];
}>;


export type DriverCareerQueryQuery = { __typename?: 'Query', driver?: { __typename?: 'Driver', id: string, standings: Array<{ __typename?: 'SeasonDriver', year: number, positionNumber?: number | null, points: any, wins: number }>, raceResults: Array<{ __typename?: 'RaceResult', raceId: number, driverId?: string | null, gridPositionNumber?: number | null, positionNumber?: number | null, positionDisplayOrder: number, points?: any | null, positionText?: string | null, teamId?: string | null, timeMillis?: number | null, reasonRetired?: string | null, race?: { __typename?: 'Race', rowId: number, year: number, round: number, circuit?: { __typename?: 'Circuit', id: string, fullName: string, longitude: any, latitude: any } | null } | null, team?: { __typename?: 'Team', id: string, colors?: { __typename?: 'AppTeamColor', teamId: string, primaryHex?: string | null, secondaryHex?: string | null } | null } | null }> } | null };

export type CircuitDataQueryQueryVariables = Exact<{
  circuitId: Scalars['String']['input'];
  driverId: Scalars['String']['input'];
}>;


export type CircuitDataQueryQuery = { __typename?: 'Query', circuit?: { __typename?: 'Circuit', id: string, fullName: string, longitude: any, latitude: any, races: Array<{ __typename?: 'Race', rowId: number, year: number, round: number, date: any, results: Array<{ __typename?: 'RaceResult', raceId: number, driverId?: string | null, gridPositionNumber?: number | null, positionDisplayOrder: number, positionText?: string | null, points?: any | null, timeMillis?: number | null, reasonRetired?: string | null, constructor?: { __typename?: 'Team', id: string, colors?: { __typename?: 'AppTeamColor', teamId: string, primaryHex?: string | null } | null } | null }>, lapTimes: Array<{ __typename?: 'AppLapTime', raceId: number, driverId: string, lap: number, timeMillis?: number | null }> }> } | null, driver?: { __typename?: 'Driver', id: string, seasonEntrantDrivers: Array<{ __typename?: 'SeasonEntrantDriver', year: number, driverId: string, teamId: string, constructor?: { __typename?: 'Team', id: string, colors?: { __typename?: 'AppTeamColor', teamId: string, primaryHex?: string | null } | null } | null }> } | null };

export type DriverCircuitQueryQueryVariables = Exact<{
  driverId: Scalars['String']['input'];
}>;


export type DriverCircuitQueryQuery = { __typename?: 'Query', driver?: { __typename?: 'Driver', id: string, raceResults: Array<{ __typename?: 'RaceResult', raceId: number, driverId?: string | null, gridPositionNumber?: number | null, positionDisplayOrder: number, points?: any | null, positionText?: string | null, teamId?: string | null, timeMillis?: number | null, reasonRetired?: string | null, race?: { __typename?: 'Race', rowId: number, year: number, round: number, circuit?: { __typename?: 'Circuit', id: string, fullName: string, longitude: any, latitude: any } | null } | null }> } | null };

export type DriverSeasonQueryQueryVariables = Exact<{
  driverId: Scalars['String']['input'];
  season: Scalars['Int']['input'];
}>;


export type DriverSeasonQueryQuery = { __typename?: 'Query', races?: Array<{ __typename?: 'Race', rowId: number, year: number, round: number, officialName: string, date: any, time?: string | null, raceResults: Array<{ __typename?: 'RaceResult', raceId: number, driverId?: string | null, gridPositionNumber?: number | null, positionDisplayOrder: number, points?: any | null, positionText?: string | null, teamId?: string | null, timeMillis?: number | null, reasonRetired?: string | null }> }> | null };

export type DriverStatsQueryVariables = Exact<{
  driverId: Scalars['String']['input'];
}>;


export type DriverStatsQuery = { __typename?: 'Query', driver?: { __typename?: 'Driver', id: string, raceResults: Array<{ __typename?: 'RaceResult', raceId: number, driverId?: string | null, positionNumber?: number | null, positionDisplayOrder: number, points?: any | null }> } | null };

export type QualifyingQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  round: Scalars['Int']['input'];
}>;


export type QualifyingQueryQuery = { __typename?: 'Query', race?: { __typename?: 'Race', year: number, round: number, qualifyingResults: Array<{ __typename?: 'QualifyingResult', raceId: number, driverId?: string | null, teamId?: string | null, positionNumber?: number | null, q1?: string | null, q2?: string | null, q3?: string | null }> } | null };

export type LapsSeasonRoundQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  round: Scalars['Int']['input'];
}>;


export type LapsSeasonRoundQuery = { __typename?: 'Query', race?: { __typename?: 'Race', year: number, round: number, lapTimes: Array<{ __typename?: 'AppLapTime', raceId: number, lap: number, position?: number | null, timeText?: string | null, milliseconds?: number | null, driverId: string }>, raceResults: Array<{ __typename?: 'RaceResult', raceId: number, positionDisplayOrder: number, positionNumber?: number | null, driverId?: string | null, driver?: { __typename?: 'Driver', id: string, lastName: string } | null, team?: { __typename?: 'Team', id: string, colors?: { __typename?: 'AppTeamColor', teamId: string, primaryHex?: string | null } | null } | null }> } | null };

export type PitStopsBySeasonRoundQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  round: Scalars['Int']['input'];
}>;


export type PitStopsBySeasonRoundQuery = { __typename?: 'Query', race?: { __typename?: 'Race', year: number, round: number, pitStops: Array<{ __typename?: 'PitStop', raceId: number, lap?: number | null, stop: number, time?: string | null, timeMillis?: number | null, driverId: string, driver?: { __typename?: 'Driver', id: string, abbreviation: string } | null, team?: { __typename?: 'Team', id: string, colors?: { __typename?: 'AppTeamColor', teamId: string, primaryHex?: string | null } | null } | null }> } | null };

export type RaceFastestLapQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  round: Scalars['Int']['input'];
}>;


export type RaceFastestLapQueryQuery = { __typename?: 'Query', race?: { __typename?: 'Race', year: number, round: number, fastestLaps: Array<{ __typename?: 'FastestLap', raceId: number, driverId?: string | null, lap?: number | null, time?: string | null, timeMillis?: number | null }> } | null };

export type RaceLapLeaderQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  round: Scalars['Int']['input'];
}>;


export type RaceLapLeaderQueryQuery = { __typename?: 'Query', race?: { __typename?: 'Race', year: number, round: number, lapTimes: Array<{ __typename?: 'AppLapTime', raceId: number, driverId: string, lap: number, position?: number | null }> } | null };

export type RacePolesLeaderQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  round: Scalars['Int']['input'];
}>;


export type RacePolesLeaderQueryQuery = { __typename?: 'Query', races?: Array<{ __typename?: 'Race', year: number, round: number, qualifyingResults: Array<{ __typename?: 'QualifyingResult', raceId: number, driverId?: string | null }> }> | null };

export type RacePositionsGainedLeaderQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
  round: Scalars['Int']['input'];
}>;


export type RacePositionsGainedLeaderQueryQuery = { __typename?: 'Query', race?: { __typename?: 'Race', year: number, round: number, raceResults: Array<{ __typename?: 'RaceResult', raceId: number, driverId?: string | null, gridPositionNumber?: number | null, positionNumber?: number | null }> } | null };

export type NextRaceBySeasonQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type NextRaceBySeasonQuery = { __typename?: 'Query', races?: Array<{ __typename?: 'Race', rowId: number, year: number, round: number, date: any, time?: string | null, officialName: string, grandPrixId: string, preQualifyingDate?: any | null, preQualifyingTime?: string | null, freePractice1Date?: any | null, freePractice1Time?: string | null, freePractice2Date?: any | null, freePractice2Time?: string | null, freePractice3Date?: any | null, freePractice3Time?: string | null, freePractice4Date?: any | null, freePractice4Time?: string | null, qualifyingDate?: any | null, qualifyingTime?: string | null, sprintQualifyingDate?: any | null, sprintQualifyingTime?: string | null, sprintRaceDate?: any | null, sprintRaceTime?: string | null, circuit?: { __typename?: 'Circuit', id: string, fullName: string, placeName: string, countryId: string, latitude: any, longitude: any } | null }> | null };

export type SeasonsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type SeasonsQueryQuery = { __typename?: 'Query', seasons?: Array<{ __typename?: 'Season', year: number, seasonTeamStandingsByYear: Array<{ __typename?: 'SeasonTeamStanding', year: number, teamId: string, engineManufacturerId: string, points: any, positionNumber?: number | null }>, seasonDriverStandingsByYear: Array<{ __typename?: 'SeasonDriverStanding', year: number, driverId: string, points: any, positionNumber?: number | null }> }> | null };

export type ConstructorStandingsQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type ConstructorStandingsQueryQuery = { __typename?: 'Query', season?: { __typename?: 'Season', year: number, racesByYear: Array<{ __typename?: 'Race', year: number, round: number, raceTeamStandings: Array<{ __typename?: 'RaceTeamStanding', raceId: number, teamId: string, engineManufacturerId: string, positionNumber?: number | null, points: any, team?: { __typename?: 'Team', id: string, name: string, colors?: { __typename?: 'AppTeamColor', teamId: string, primaryHex?: string | null } | null } | null }> }> } | null };

export type DriverStandingsQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type DriverStandingsQueryQuery = { __typename?: 'Query', season?: { __typename?: 'Season', year: number, seasonDriverStandingsByYear: Array<{ __typename?: 'SeasonDriverStanding', year: number, driverId: string, positionNumber?: number | null, points: any }>, racesByYear: Array<{ __typename?: 'Race', year: number, round: number, raceDriverStandings: Array<{ __typename?: 'RaceDriverStanding', raceId: number, driverId: string, positionNumber?: number | null, points: any, driver?: { __typename?: 'Driver', id: string, lastName: string, seasonEntrantDrivers: Array<{ __typename?: 'SeasonEntrantDriver', year: number, driverId: string, teamId: string, team?: { __typename?: 'Team', id: string, colors?: { __typename?: 'AppTeamColor', teamId: string, primaryHex?: string | null } | null } | null }> } | null }> }> } | null };

export type SeasonConstructorChampionQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type SeasonConstructorChampionQueryQuery = { __typename?: 'Query', season?: { __typename?: 'Season', year: number, seasonTeamStandingsByYear: Array<{ __typename?: 'SeasonTeamStanding', year: number, teamId: string, engineManufacturerId: string }> } | null };

export type SeasonDnFsQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type SeasonDnFsQueryQuery = { __typename?: 'Query', season?: { __typename?: 'Season', year: number, racesByYear: Array<{ __typename?: 'Race', rowId: number, year: number, round: number, raceResults: Array<{ __typename?: 'RaceResult', raceId: number, driverId?: string | null, reasonRetired?: string | null }> }> } | null };

export type SeasonDriverChampionQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type SeasonDriverChampionQueryQuery = { __typename?: 'Query', seasonDriverStandings?: Array<{ __typename?: 'SeasonDriverStanding', year: number, driverId: string }> | null };

export type SeasonFastestLapQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type SeasonFastestLapQueryQuery = { __typename?: 'Query', season?: { __typename?: 'Season', year: number, racesByYear: Array<{ __typename?: 'Race', rowId: number, year: number, round: number, officialName: string, fastestLaps: Array<{ __typename?: 'FastestLap', raceId: number, driverId?: string | null, lap?: number | null, time?: string | null, timeMillis?: number | null }> }> } | null };

export type SeasonLapLeaderQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type SeasonLapLeaderQueryQuery = { __typename?: 'Query', season?: { __typename?: 'Season', year: number, racesByYear: Array<{ __typename?: 'Race', rowId: number, year: number, round: number, lapTimes: Array<{ __typename?: 'AppLapTime', raceId: number, driverId: string, lap: number, position?: number | null }> }> } | null };

export type SeasonPolesQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type SeasonPolesQueryQuery = { __typename?: 'Query', season?: { __typename?: 'Season', year: number, racesByYear: Array<{ __typename?: 'Race', rowId: number, year: number, round: number, qualifyingResults: Array<{ __typename?: 'QualifyingResult', raceId: number, driverId?: string | null }> }> } | null };

export type SeasonPositionsGainedQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type SeasonPositionsGainedQueryQuery = { __typename?: 'Query', season?: { __typename?: 'Season', year: number, racesByYear: Array<{ __typename?: 'Race', rowId: number, year: number, round: number, raceResults: Array<{ __typename?: 'RaceResult', raceId: number, driverId?: string | null, gridPositionNumber?: number | null, positionNumber?: number | null }> }> } | null };

export type SeasonSprintWinsQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type SeasonSprintWinsQueryQuery = { __typename?: 'Query', season?: { __typename?: 'Season', year: number, racesByYear: Array<{ __typename?: 'Race', rowId: number, year: number, round: number, sprintRaceResults: Array<{ __typename?: 'SprintRaceResult', raceId: number, driverId?: string | null }> }> } | null };

export type SeasonWinsQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type SeasonWinsQueryQuery = { __typename?: 'Query', season?: { __typename?: 'Season', year: number, racesByYear: Array<{ __typename?: 'Race', rowId: number, year: number, round: number, raceResults: Array<{ __typename?: 'RaceResult', raceId: number, driverId?: string | null }> }> } | null };

export type ScheduleQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type ScheduleQueryQuery = { __typename?: 'Query', season?: { __typename?: 'Season', year: number, racesByYear: Array<{ __typename?: 'Race', rowId: number, year: number, round: number, date: any, officialName: string, circuit?: { __typename?: 'Circuit', id: string, latitude: any, longitude: any } | null, raceResults: Array<{ __typename?: 'RaceResult', raceId: number, driverId?: string | null }>, sprintRaceResults: Array<{ __typename?: 'SprintRaceResult', raceId: number, driverId?: string | null }> }> } | null };

export type PastSeasonsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type PastSeasonsQueryQuery = { __typename?: 'Query', seasons?: Array<{ __typename?: 'Season', year: number }> | null };

export type SingleSeasonQueryQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;


export type SingleSeasonQueryQuery = { __typename?: 'Query', season?: { __typename?: 'Season', year: number } | null };

export type CircuitQueryQueryVariables = Exact<{
  circuitRef: Scalars['String']['input'];
  showCurrentSeason: Scalars['Boolean']['input'];
  season?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CircuitQueryQuery = { __typename?: 'Query', circuit?: { __typename?: 'Circuit', id: string, fullName: string, placeName: string, countryId: string, latitude: any, longitude: any, description?: { __typename?: 'AppCircuitDescription', description: string } | null, history: Array<{ __typename?: 'Race', year: number, round: number, date: any, officialName: string, raceResults: Array<{ __typename?: 'RaceResult', raceId: number, teamId?: string | null, driverId?: string | null, time?: string | null, driver?: { __typename?: 'Driver', id: string, firstName: string, lastName: string } | null }>, lapTimes: Array<{ __typename?: 'AppLapTime', raceId: number, driverId: string, lap: number }>, fastestLaps: Array<{ __typename?: 'AppLapTime', raceId: number, driverId: string, lap: number, milliseconds?: number | null }> }>, season?: Array<{ __typename?: 'Race', year: number, round: number, officialName: string, freePractice1Date?: any | null, freePractice1Time?: string | null, freePractice2Date?: any | null, freePractice2Time?: string | null, freePractice3Date?: any | null, freePractice3Time?: string | null, qualifyingDate?: any | null, qualifyingTime?: string | null, date: any, time?: string | null, raceResults: Array<{ __typename?: 'RaceResult', raceId: number, driverId?: string | null, gridPositionNumber?: number | null, positionDisplayOrder: number, points?: any | null, reasonRetired?: string | null, team?: { __typename?: 'Team', id: string } | null }> }> } | null };

export type ConstructorDataQueryQueryVariables = Exact<{
  constructorRef: Scalars['String']['input'];
  season: Scalars['Int']['input'];
}>;


export type ConstructorDataQueryQuery = { __typename?: 'Query', team?: { __typename?: 'Team', id: string, name: string, countryId: string, colors?: { __typename?: 'AppTeamColor', teamId: string, primaryHex?: string | null } | null, drivers: Array<{ __typename?: 'SeasonEntrantDriver', year: number, driverId: string, teamId: string, driver?: { __typename?: 'Driver', id: string, firstName: string, lastName: string, seasonDriverStandings: Array<{ __typename?: 'SeasonDriverStanding', year: number, driverId: string, points: any, positionNumber?: number | null }> } | null }>, standings: Array<{ __typename?: 'SeasonTeamStanding', teamId: string, engineManufacturerId: string, points: any, positionNumber?: number | null, positionText: string, year: number }>, antecedents: Array<{ __typename?: 'AppTeamHistory', teamId: string, antecedentTeamId: string, startYear: number, endYear?: number | null, antecedentTeam?: { __typename?: 'Team', id: string, name: string, colors?: { __typename?: 'AppTeamColor', teamId: string, primaryHex?: string | null } | null, standings: Array<{ __typename?: 'SeasonTeamStanding', teamId: string, engineManufacturerId: string, points: any, positionNumber?: number | null, positionText: string, year: number }> } | null }>, raceResults: Array<{ __typename?: 'RaceResult', raceId: number, driverId?: string | null, gridPositionNumber?: number | null, positionDisplayOrder: number, points?: any | null, race?: { __typename?: 'Race', year: number, round: number } | null, driver?: { __typename?: 'Driver', id: string, abbreviation: string } | null }> } | null, races?: Array<{ __typename?: 'Race', rowId: number, year: number, round: number, officialName: string, date: any }> | null };

export type DriverFieldsFragment = { __typename?: 'Driver', id: string, dateOfBirth: any, firstName: string, lastName: string, abbreviation: string, permanentNumber?: string | null, nationalityCountryId: string, nationalityCountry?: { __typename?: 'Country', id: string, name: string, alpha2Code: string } | null, bio?: { __typename?: 'WikipediaBio', title: string, extract?: string | null, thumbnailUrl?: string | null, sourceUrl: string } | null, seasonEntrantDrivers: Array<{ __typename?: 'SeasonEntrantDriver', year: number, driverId: string, teamId: string, team?: { __typename?: 'Team', id: string, colors?: { __typename?: 'AppTeamColor', teamId: string, primaryHex?: string | null } | null } | null }>, teamsByYear: Array<{ __typename?: 'SeasonEntrantDriver', year: number, driverId: string, teamId: string, team?: { __typename?: 'Team', id: string, colors?: { __typename?: 'AppTeamColor', teamId: string, primaryHex?: string | null } | null } | null }> } & { ' $fragmentName'?: 'DriverFieldsFragment' };

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


export type RaceBySeasonRoundQuery = { __typename?: 'Query', races?: Array<{ __typename?: 'Race', year: number, round: number, raceResults: Array<{ __typename?: 'RaceResult', raceId: number, driverId?: string | null, teamId?: string | null, gridPositionNumber?: number | null, positionNumber?: number | null, positionText?: string | null, positionDisplayOrder: number, points?: any | null, laps?: number | null, time?: string | null, timeMillis?: number | null, reasonRetired?: string | null, driver?: { __typename?: 'Driver', id: string } | null }>, sprintRaceResults: Array<{ __typename?: 'SprintRaceResult', raceId: number, driverId?: string | null, teamId?: string | null, gridPositionNumber?: number | null, positionNumber?: number | null, positionText?: string | null, positionDisplayOrder: number, points?: any | null, laps?: number | null, time?: string | null, timeMillis?: number | null, reasonRetired?: string | null, driver?: { __typename?: 'Driver', id: string } | null }> }> | null };

export type TeamFieldsFragment = { __typename?: 'Team', id: string, name: string, country?: { __typename?: 'Country', id: string, name: string, alpha2Code: string } | null, colors?: { __typename?: 'AppTeamColor', teamId: string, primaryHex?: string | null, secondaryHex?: string | null } | null, bio?: { __typename?: 'WikipediaBio', title: string, extract?: string | null, thumbnailUrl?: string | null, sourceUrl: string } | null } & { ' $fragmentName'?: 'TeamFieldsFragment' };

export type TeamByIdQueryVariables = Exact<{
  rowId: Scalars['String']['input'];
}>;


export type TeamByIdQuery = { __typename?: 'Query', team?: (
    { __typename?: 'Team' }
    & { ' $fragmentRefs'?: { 'TeamFieldsFragment': TeamFieldsFragment } }
  ) | null };

export type SeasonsListQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type SeasonsListQueryQuery = { __typename?: 'Query', seasons?: Array<{ __typename?: 'Season', year: number, hasResults?: boolean | null }> | null };

export const DriverFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DriverFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Driver"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"permanentNumber"}},{"kind":"Field","name":{"kind":"Name","value":"nationalityCountryId"}},{"kind":"Field","name":{"kind":"Name","value":"nationalityCountry"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"alpha2Code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"extract"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"seasonEntrantDrivers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"teamsByYear"},"name":{"kind":"Name","value":"seasonEntrantDrivers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DriverFieldsFragment, unknown>;
export const TeamFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeamFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Team"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"country"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"alpha2Code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryHex"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"extract"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}}]}}]}}]} as unknown as DocumentNode<TeamFieldsFragment, unknown>;
export const CurrentSeasonQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentSeasonQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seasons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]} as unknown as DocumentNode<CurrentSeasonQueryQuery, CurrentSeasonQueryQueryVariables>;
export const CurrentSeasonRaceParamsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentSeasonRaceParamsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seasons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"racesByYear"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"ROUND_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"round"}}]}}]}}]}}]} as unknown as DocumentNode<CurrentSeasonRaceParamsQueryQuery, CurrentSeasonRaceParamsQueryQueryVariables>;
export const CurrentSeasonDriverIdsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentSeasonDriverIdsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seasons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seasonDriverStandingsByYear"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driverId"}}]}}]}}]}}]} as unknown as DocumentNode<CurrentSeasonDriverIdsQueryQuery, CurrentSeasonDriverIdsQueryQueryVariables>;
export const CurrentSeasonTeamIdsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentSeasonTeamIdsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seasons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seasonTeamStandingsByYear"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamId"}}]}}]}}]}}]} as unknown as DocumentNode<CurrentSeasonTeamIdsQueryQuery, CurrentSeasonTeamIdsQueryQueryVariables>;
export const CurrentSeasonCircuitIdsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentSeasonCircuitIdsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seasons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"racesByYear"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"circuitId"}}]}}]}}]}}]} as unknown as DocumentNode<CurrentSeasonCircuitIdsQueryQuery, CurrentSeasonCircuitIdsQueryQueryVariables>;
export const CircuitLookupQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CircuitLookupQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ref"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"circuit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ref"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}}]}}]} as unknown as DocumentNode<CircuitLookupQueryQuery, CircuitLookupQueryQueryVariables>;
export const AllCircuitsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllCircuitsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"circuits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AllCircuitsQueryQuery, AllCircuitsQueryQueryVariables>;
export const RaceLookupQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RaceLookupQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"round"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"round"},"value":{"kind":"Variable","name":{"kind":"Name","value":"round"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"officialName"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"circuit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"placeName"}},{"kind":"Field","name":{"kind":"Name","value":"countryId"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"description"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RaceLookupQueryQuery, RaceLookupQueryQueryVariables>;
export const AllRacesQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllRacesQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}}]}}]}}]} as unknown as DocumentNode<AllRacesQueryQuery, AllRacesQueryQueryVariables>;
export const ConstructorPageStaticQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ConstructorPageStaticQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"constructorRef"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teams"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"constructorRef"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"countryId"}},{"kind":"Field","name":{"kind":"Name","value":"country"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alpha2Code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}}]}}]}}]}}]} as unknown as DocumentNode<ConstructorPageStaticQueryQuery, ConstructorPageStaticQueryQueryVariables>;
export const RaceFullDataServerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"raceFullDataServer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"round"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"round"},"value":{"kind":"Variable","name":{"kind":"Name","value":"round"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"gridPositionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionText"}},{"kind":"Field","name":{"kind":"Name","value":"positionDisplayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"laps"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"timeMillis"}},{"kind":"Field","name":{"kind":"Name","value":"reasonRetired"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sprintRaceResults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"gridPositionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionText"}},{"kind":"Field","name":{"kind":"Name","value":"positionDisplayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"laps"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"timeMillis"}},{"kind":"Field","name":{"kind":"Name","value":"reasonRetired"}}]}}]}}]}}]} as unknown as DocumentNode<RaceFullDataServerQuery, RaceFullDataServerQueryVariables>;
export const SeasonMenuQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SeasonMenuQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seasons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]} as unknown as DocumentNode<SeasonMenuQueryQuery, SeasonMenuQueryQueryVariables>;
export const CircuitsListQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CircuitsListQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"circuits"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"FULL_NAME_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"placeName"}},{"kind":"Field","name":{"kind":"Name","value":"country"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"direction"}},{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}}]}}]}}]}}]} as unknown as DocumentNode<CircuitsListQueryQuery, CircuitsListQueryQueryVariables>;
export const ConstructorsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ConstructorsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teams"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"NAME_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"countryId"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryHex"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"seasons"},"name":{"kind":"Name","value":"seasonTeams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}}]}}]}}]}}]} as unknown as DocumentNode<ConstructorsQueryQuery, ConstructorsQueryQueryVariables>;
export const ConstructorSeasonQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ConstructorSeasonQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"ROUND_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"officialName"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"gridPositionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionDisplayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"timeMillis"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"reasonRetired"}}]}}]}}]}}]} as unknown as DocumentNode<ConstructorSeasonQueryQuery, ConstructorSeasonQueryQueryVariables>;
export const ConstructorDriverPodiumsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"constructorDriverPodiumsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"constructorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"racesByYear"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"ROUND_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"constructorId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ConstructorDriverPodiumsQueryQuery, ConstructorDriverPodiumsQueryQueryVariables>;
export const ConstructorDriverPointsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ConstructorDriverPointsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"constructorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"racesByYear"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"constructorId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"points"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sprintRaceResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"constructorId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"points"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ConstructorDriverPointsQueryQuery, ConstructorDriverPointsQueryQueryVariables>;
export const ConstructorDriverQualifyingQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ConstructorDriverQualifyingQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"constructorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"racesByYear"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"qualifyingResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"constructorId"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"POSITION_NUMBER_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"driver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ConstructorDriverQualifyingQueryQuery, ConstructorDriverQualifyingQueryQueryVariables>;
export const DriversQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DriversQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"drivers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"LAST_NAME_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"nationalityCountryId"}},{"kind":"Field","name":{"kind":"Name","value":"totalRaceStarts"}},{"kind":"Field","name":{"kind":"Name","value":"totalRaceWins"}},{"kind":"Field","name":{"kind":"Name","value":"totalPodiums"}},{"kind":"Field","name":{"kind":"Name","value":"nationalityCountry"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"alpha2Code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"seasonDrivers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DriversQueryQuery, DriversQueryQueryVariables>;
export const DriverCareerQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DriverCareerQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"driverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driver"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"driverId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"standings"},"name":{"kind":"Name","value":"seasonDrivers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}},{"kind":"Field","alias":{"kind":"Name","value":"points"},"name":{"kind":"Name","value":"totalPoints"}},{"kind":"Field","alias":{"kind":"Name","value":"wins"},"name":{"kind":"Name","value":"totalRaceWins"}}]}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"circuit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"gridPositionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionDisplayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"positionText"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryHex"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeMillis"}},{"kind":"Field","name":{"kind":"Name","value":"reasonRetired"}}]}}]}}]}}]} as unknown as DocumentNode<DriverCareerQueryQuery, DriverCareerQueryQueryVariables>;
export const CircuitDataQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CircuitDataQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"circuitId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"driverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"circuit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"circuitId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"races"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","alias":{"kind":"Name","value":"results"},"name":{"kind":"Name","value":"raceResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"driverId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"driverId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"gridPositionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionDisplayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"positionText"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"timeMillis"}},{"kind":"Field","name":{"kind":"Name","value":"reasonRetired"}},{"kind":"Field","alias":{"kind":"Name","value":"constructor"},"name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"lapTimes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"driverId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"driverId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"lap"}},{"kind":"Field","alias":{"kind":"Name","value":"timeMillis"},"name":{"kind":"Name","value":"milliseconds"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"driver"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"driverId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"seasonEntrantDrivers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","alias":{"kind":"Name","value":"constructor"},"name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CircuitDataQueryQuery, CircuitDataQueryQueryVariables>;
export const DriverCircuitQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DriverCircuitQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"driverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driver"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"driverId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"circuit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"gridPositionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionDisplayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"positionText"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"timeMillis"}},{"kind":"Field","name":{"kind":"Name","value":"reasonRetired"}}]}}]}}]}}]} as unknown as DocumentNode<DriverCircuitQueryQuery, DriverCircuitQueryQueryVariables>;
export const DriverSeasonQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DriverSeasonQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"driverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"ROUND_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"officialName"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"driverId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"driverId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"gridPositionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionDisplayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"positionText"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"timeMillis"}},{"kind":"Field","name":{"kind":"Name","value":"reasonRetired"}}]}}]}}]}}]} as unknown as DocumentNode<DriverSeasonQueryQuery, DriverSeasonQueryQueryVariables>;
export const DriverStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"driverStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"driverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driver"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"driverId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionDisplayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"points"}}]}}]}}]}}]} as unknown as DocumentNode<DriverStatsQuery, DriverStatsQueryVariables>;
export const QualifyingQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"qualifyingQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"round"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"race"},"name":{"kind":"Name","value":"raceByYearAndRound"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}},{"kind":"Argument","name":{"kind":"Name","value":"round"},"value":{"kind":"Variable","name":{"kind":"Name","value":"round"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"qualifyingResults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"q1"}},{"kind":"Field","name":{"kind":"Name","value":"q2"}},{"kind":"Field","name":{"kind":"Name","value":"q3"}}]}}]}}]}}]} as unknown as DocumentNode<QualifyingQueryQuery, QualifyingQueryQueryVariables>;
export const LapsSeasonRoundDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"lapsSeasonRound"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"round"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"race"},"name":{"kind":"Name","value":"raceByYearAndRound"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}},{"kind":"Argument","name":{"kind":"Name","value":"round"},"value":{"kind":"Variable","name":{"kind":"Name","value":"round"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"lapTimes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"LAP_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"lap"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"timeText"}},{"kind":"Field","name":{"kind":"Name","value":"milliseconds"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"POSITION_DISPLAY_ORDER_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"positionDisplayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"driver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<LapsSeasonRoundQuery, LapsSeasonRoundQueryVariables>;
export const PitStopsBySeasonRoundDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"pitStopsBySeasonRound"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"round"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"race"},"name":{"kind":"Name","value":"raceByYearAndRound"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}},{"kind":"Argument","name":{"kind":"Name","value":"round"},"value":{"kind":"Variable","name":{"kind":"Name","value":"round"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"pitStops"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"lap"}},{"kind":"Field","name":{"kind":"Name","value":"stop"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"timeMillis"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"driver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}}]}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<PitStopsBySeasonRoundQuery, PitStopsBySeasonRoundQueryVariables>;
export const RaceFastestLapQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"raceFastestLapQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"round"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"race"},"name":{"kind":"Name","value":"raceByYearAndRound"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}},{"kind":"Argument","name":{"kind":"Name","value":"round"},"value":{"kind":"Variable","name":{"kind":"Name","value":"round"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"fastestLaps"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"lap"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"timeMillis"}}]}}]}}]}}]} as unknown as DocumentNode<RaceFastestLapQueryQuery, RaceFastestLapQueryQueryVariables>;
export const RaceLapLeaderQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"raceLapLeaderQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"round"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"race"},"name":{"kind":"Name","value":"raceByYearAndRound"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}},{"kind":"Argument","name":{"kind":"Name","value":"round"},"value":{"kind":"Variable","name":{"kind":"Name","value":"round"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"lapTimes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"lap"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]}}]} as unknown as DocumentNode<RaceLapLeaderQueryQuery, RaceLapLeaderQueryQueryVariables>;
export const RacePolesLeaderQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"racePolesLeaderQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"round"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"round"},"value":{"kind":"Variable","name":{"kind":"Name","value":"round"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"qualifyingResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"positionNumber"},"value":{"kind":"IntValue","value":"1"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}}]}}]}}]}}]} as unknown as DocumentNode<RacePolesLeaderQueryQuery, RacePolesLeaderQueryQueryVariables>;
export const RacePositionsGainedLeaderQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"racePositionsGainedLeaderQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"round"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"race"},"name":{"kind":"Name","value":"raceByYearAndRound"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}},{"kind":"Argument","name":{"kind":"Name","value":"round"},"value":{"kind":"Variable","name":{"kind":"Name","value":"round"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"gridPositionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}}]}}]}}]}}]} as unknown as DocumentNode<RacePositionsGainedLeaderQueryQuery, RacePositionsGainedLeaderQueryQueryVariables>;
export const NextRaceBySeasonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NextRaceBySeason"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"ROUND_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"officialName"}},{"kind":"Field","name":{"kind":"Name","value":"grandPrixId"}},{"kind":"Field","name":{"kind":"Name","value":"preQualifyingDate"}},{"kind":"Field","name":{"kind":"Name","value":"preQualifyingTime"}},{"kind":"Field","name":{"kind":"Name","value":"freePractice1Date"}},{"kind":"Field","name":{"kind":"Name","value":"freePractice1Time"}},{"kind":"Field","name":{"kind":"Name","value":"freePractice2Date"}},{"kind":"Field","name":{"kind":"Name","value":"freePractice2Time"}},{"kind":"Field","name":{"kind":"Name","value":"freePractice3Date"}},{"kind":"Field","name":{"kind":"Name","value":"freePractice3Time"}},{"kind":"Field","name":{"kind":"Name","value":"freePractice4Date"}},{"kind":"Field","name":{"kind":"Name","value":"freePractice4Time"}},{"kind":"Field","name":{"kind":"Name","value":"qualifyingDate"}},{"kind":"Field","name":{"kind":"Name","value":"qualifyingTime"}},{"kind":"Field","name":{"kind":"Name","value":"sprintQualifyingDate"}},{"kind":"Field","name":{"kind":"Name","value":"sprintQualifyingTime"}},{"kind":"Field","name":{"kind":"Name","value":"sprintRaceDate"}},{"kind":"Field","name":{"kind":"Name","value":"sprintRaceTime"}},{"kind":"Field","name":{"kind":"Name","value":"circuit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"placeName"}},{"kind":"Field","name":{"kind":"Name","value":"countryId"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}}]}}]}}]} as unknown as DocumentNode<NextRaceBySeasonQuery, NextRaceBySeasonQueryVariables>;
export const SeasonsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SeasonsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seasons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"seasonTeamStandingsByYear"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"POSITION_NUMBER_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"engineManufacturerId"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"seasonDriverStandingsByYear"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"POSITION_NUMBER_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"3"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}}]}}]}}]}}]} as unknown as DocumentNode<SeasonsQueryQuery, SeasonsQueryQueryVariables>;
export const ConstructorStandingsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"constructorStandingsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"racesByYear"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"ROUND_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"raceTeamStandings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"POSITION_NUMBER_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"engineManufacturerId"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ConstructorStandingsQueryQuery, ConstructorStandingsQueryQueryVariables>;
export const DriverStandingsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"driverStandingsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"seasonDriverStandingsByYear"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"POSITION_NUMBER_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"points"}}]}},{"kind":"Field","name":{"kind":"Name","value":"racesByYear"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"ROUND_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"raceDriverStandings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"POSITION_NUMBER_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"driver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"seasonEntrantDrivers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<DriverStandingsQueryQuery, DriverStandingsQueryQueryVariables>;
export const SeasonConstructorChampionQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"seasonConstructorChampionQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"seasonTeamStandingsByYear"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"POSITION_NUMBER_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"engineManufacturerId"}}]}}]}}]}}]} as unknown as DocumentNode<SeasonConstructorChampionQueryQuery, SeasonConstructorChampionQueryQueryVariables>;
export const SeasonDnFsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SeasonDNFsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"racesByYear"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"reasonRetired"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SeasonDnFsQueryQuery, SeasonDnFsQueryQueryVariables>;
export const SeasonDriverChampionQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SeasonDriverChampionQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seasonDriverStandings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"POSITION_NUMBER_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}}]}}]}}]} as unknown as DocumentNode<SeasonDriverChampionQueryQuery, SeasonDriverChampionQueryQueryVariables>;
export const SeasonFastestLapQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"seasonFastestLapQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"racesByYear"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"officialName"}},{"kind":"Field","name":{"kind":"Name","value":"fastestLaps"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"TIME_MILLIS_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"lap"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"timeMillis"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SeasonFastestLapQueryQuery, SeasonFastestLapQueryQueryVariables>;
export const SeasonLapLeaderQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SeasonLapLeaderQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"racesByYear"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"lapTimes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"lap"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SeasonLapLeaderQueryQuery, SeasonLapLeaderQueryQueryVariables>;
export const SeasonPolesQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SeasonPolesQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"racesByYear"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"qualifyingResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"positionNumber"},"value":{"kind":"IntValue","value":"1"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SeasonPolesQueryQuery, SeasonPolesQueryQueryVariables>;
export const SeasonPositionsGainedQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SeasonPositionsGainedQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"racesByYear"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"gridPositionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SeasonPositionsGainedQueryQuery, SeasonPositionsGainedQueryQueryVariables>;
export const SeasonSprintWinsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SeasonSprintWinsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"racesByYear"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"sprintRaceResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"positionNumber"},"value":{"kind":"IntValue","value":"1"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SeasonSprintWinsQueryQuery, SeasonSprintWinsQueryQueryVariables>;
export const SeasonWinsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SeasonWinsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"racesByYear"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"positionNumber"},"value":{"kind":"IntValue","value":"1"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SeasonWinsQueryQuery, SeasonWinsQueryQueryVariables>;
export const ScheduleQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"scheduleQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"racesByYear"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"ROUND_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"officialName"}},{"kind":"Field","name":{"kind":"Name","value":"circuit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"positionNumber"},"value":{"kind":"IntValue","value":"1"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sprintRaceResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"positionNumber"},"value":{"kind":"IntValue","value":"1"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ScheduleQueryQuery, ScheduleQueryQueryVariables>;
export const PastSeasonsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PastSeasonsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seasons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]} as unknown as DocumentNode<PastSeasonsQueryQuery, PastSeasonsQueryQueryVariables>;
export const SingleSeasonQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SingleSeasonQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]} as unknown as DocumentNode<SingleSeasonQueryQuery, SingleSeasonQueryQueryVariables>;
export const CircuitQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CircuitQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"circuitRef"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"showCurrentSeason"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"circuit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"circuitRef"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"placeName"}},{"kind":"Field","name":{"kind":"Name","value":"countryId"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"description"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"history"},"name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"officialName"}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"positionNumber"},"value":{"kind":"IntValue","value":"1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"driver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lapTimes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"lap"},"value":{"kind":"IntValue","value":"1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"lap"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"fastestLaps"},"name":{"kind":"Name","value":"lapTimes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"lap"}},{"kind":"Field","name":{"kind":"Name","value":"milliseconds"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"season"},"name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}]}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"showCurrentSeason"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"officialName"}},{"kind":"Field","name":{"kind":"Name","value":"freePractice1Date"}},{"kind":"Field","name":{"kind":"Name","value":"freePractice1Time"}},{"kind":"Field","name":{"kind":"Name","value":"freePractice2Date"}},{"kind":"Field","name":{"kind":"Name","value":"freePractice2Time"}},{"kind":"Field","name":{"kind":"Name","value":"freePractice3Date"}},{"kind":"Field","name":{"kind":"Name","value":"freePractice3Time"}},{"kind":"Field","name":{"kind":"Name","value":"qualifyingDate"}},{"kind":"Field","name":{"kind":"Name","value":"qualifyingTime"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"gridPositionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionDisplayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"reasonRetired"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CircuitQueryQuery, CircuitQueryQueryVariables>;
export const ConstructorDataQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ConstructorDataQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"constructorRef"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"team"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"constructorRef"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"countryId"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"drivers"},"name":{"kind":"Name","value":"seasonEntrantDrivers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"driver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"seasonDriverStandings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"standings"},"name":{"kind":"Name","value":"seasonTeamStandings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"engineManufacturerId"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionText"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}},{"kind":"Field","name":{"kind":"Name","value":"antecedents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"antecedentTeamId"}},{"kind":"Field","name":{"kind":"Name","value":"startYear"}},{"kind":"Field","name":{"kind":"Name","value":"endYear"}},{"kind":"Field","name":{"kind":"Name","value":"antecedentTeam"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"standings"},"name":{"kind":"Name","value":"seasonTeamStandings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"engineManufacturerId"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionText"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}}]}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"driver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}}]}},{"kind":"Field","name":{"kind":"Name","value":"gridPositionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionDisplayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"points"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"ROUND_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rowId"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"officialName"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]} as unknown as DocumentNode<ConstructorDataQueryQuery, ConstructorDataQueryQueryVariables>;
export const DriverQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DriverQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driver"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DriverFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DriverFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Driver"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"permanentNumber"}},{"kind":"Field","name":{"kind":"Name","value":"nationalityCountryId"}},{"kind":"Field","name":{"kind":"Name","value":"nationalityCountry"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"alpha2Code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"extract"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"seasonEntrantDrivers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"teamsByYear"},"name":{"kind":"Name","value":"seasonEntrantDrivers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DriverQueryQuery, DriverQueryQueryVariables>;
export const RaceBySeasonRoundDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"raceBySeasonRound"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"round"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"round"},"value":{"kind":"Variable","name":{"kind":"Name","value":"round"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"raceResults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"gridPositionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionText"}},{"kind":"Field","name":{"kind":"Name","value":"positionDisplayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"laps"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"timeMillis"}},{"kind":"Field","name":{"kind":"Name","value":"reasonRetired"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sprintRaceResults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceId"}},{"kind":"Field","name":{"kind":"Name","value":"driver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"gridPositionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"positionText"}},{"kind":"Field","name":{"kind":"Name","value":"positionDisplayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"laps"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"timeMillis"}},{"kind":"Field","name":{"kind":"Name","value":"reasonRetired"}}]}}]}}]}}]} as unknown as DocumentNode<RaceBySeasonRoundQuery, RaceBySeasonRoundQueryVariables>;
export const TeamByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"teamById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rowId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"team"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rowId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TeamFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeamFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Team"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"country"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"alpha2Code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"primaryHex"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryHex"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"extract"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}}]}}]}}]} as unknown as DocumentNode<TeamByIdQuery, TeamByIdQueryVariables>;
export const SeasonsListQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SeasonsListQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seasons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"hasResults"}}]}}]}}]} as unknown as DocumentNode<SeasonsListQueryQuery, SeasonsListQueryQueryVariables>;