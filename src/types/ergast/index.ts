import {CanonicalId} from '../../api/wikipedia';

export type Circuit = {
	/** @example yas_marina */
	circuitId?: string;
	/** @example 21 */
	round?: string;
	/** @example http://en.wikipedia.org/wiki/Yas_Marina_Circuit */
	url?: string;
	/** @example Yas Marina Circuit */
	circuitName?: string;
	Location?: Location;
};

export type Location = {
	/** @example 24.4672 */
	lat?: string;
	/** @example 54.6031 */
	long?: string;
	/** @example Abu Dhabi */
	locality?: string;
	/** @example UAE */
	country?: string;
};

export type Constructor = {
	/** @example mercedes */
	constructorId?: string;
	/** @example http://en.wikipedia.org/wiki/Mercedes-Benz_in_Formula_One */
	url?: string;
	/** @example Mercedes */
	name?: string;
	/** @example German */
	nationality?: string;
};

export type Driver = {
	/** @example hamilton */
	driverId?: string;
	/** @example 44 */
	permanentNumber?: string;
	/** @example HAM */
	code?: string;
	/** @example http://en.wikipedia.org/wiki/Lewis_Hamilton */
	url?: string;
	/** @example Lewis_Hamilton */
	canonicalId?: CanonicalId
	/** @example Lewis */
	givenName?: string;
	/** @example Hamilton */
	familyName?: string;
	/** @example 1985-01-07 */
	dateOfBirth?: string;
	/** @example British */
	nationality?: string;
};

export type Race = {
	/** @example 2019 */
	season?: string;
	/** @example 21 */
	round?: string;
	/** @example https://en.wikipedia.org/wiki/2019_Abu_Dhabi_Grand_Prix */
	url?: string;
	/** @example Abu Dhabi Grand Prix */
	raceName?: string;
	Circuit?: Circuit;
	/** @example 2019-12-01 */
	date?: string;
	/** @example 13:10:00Z */
	time?: string;
	Results?: Result[];
	QualifyingResults?: QualifyingResult[];
	Laps?: Lap[];
};

export type Lap = {
	number: string;
	Timings: Timing[];
}

export type Timing = {
	driverId: string;
	position: string;
	time: string;
}

export type Result = {
	/** @example 44 */
	number?: string;
	/** @example 1 */
	position?: string;
	/** @example 1 */
	positionText?: string;
	/** @example 26 */
	points?: string;
	Driver?: Driver;
	Constructor?: Constructor;
	/** @example 1 */
	grid?: string;
	/** @example 55 */
	laps?: string;
	/** @example Finished */
	status?: string;
	Time?: Time;
	FastestLap?: FastestLap;
};

export type QualifyingResult = {
	number: number;
	position: number;
	Driver: Driver;
	Constructor: Constructor;
	Q1: string;
	Q2: string;
	Q3: string;
}

export type FastestLap = {
	/** @example 1 */
	rank?: string;
	/** @example 53 */
	lap?: string;
	Time?: Time;
	AverageSpeed?: Speed;
};

export type Speed = {
	/** @example kph */
	units?: string;
	/** @example 201.387 */
	speed?: string;
}

export type Time = {
	/** @example 5645715 */
	millis?: string;
	/** @example 1:39.283 */
	time?: string;
}

export type Standing = {
	id?: string; // extra for MUI
	position?: string;
	positionText?: string;
	points?: string;
	wins?: string;
	Driver?: Driver;
	Constructors?: Constructor[];
}

export type Season = {
	season: string;
	url: string;
}

export type SeasonStanding = {
	season?: string;
	round?: string;
	DriverStandings?: Standing[];
	ConstructorStandings?: Standing[];
}

export type Responses = {
	SeasonsResponse: {
		MRData?: {
			xmlns?: string;
			series?: string;
			url?: string;
			/** @example 30 */
			limit?: string;
			/** @example 0 */
			offset?: string;
			/** @example 20 */
			total?: string;
			SeasonTable?: {
				Seasons?: Season[];
			};
		};
	};
	
	ConstructorsByYearResponse: {
		MRData?: {
			xmlns?: string;
			series?: string;
			url?: string;
			/** @example 30 */
			limit?: string;
			/** @example 0 */
			offset?: string;
			/** @example 20 */
			total?: string;
			ConstructorTable?: {
				season?: string;
				Constructors?: Constructor[];
			};
		};
	};
	
	ConstructorStandingsByYearResponse: {
		MRData?: {
			xmlns?: string;
			series?: string;
			url?: string;
			/** @example 30 */
			limit?: string;
			/** @example 0 */
			offset?: string;
			/** @example 20 */
			total?: string;
			StandingsTable?: {
				season?: string;
				StandingsLists?: ({
					season?: string;
					round?: string;
					ConstructorStandings?: ({
						position?: string;
						positionText?: string;
						points?: string;
						wins?: string;
						Constructor?: Constructor;
					})[];
				})[];
			};
		};
	};
	DriversResponse: {
		MRData?: {
			xmlns?: string;
			series?: string;
			url?: string;
			/** @example 30 */
			limit?: string;
			/** @example 0 */
			offset?: string;
			/** @example 20 */
			total?: string;
			DriverTable?: {
				Drivers?: Driver[];
			};
		};
	};
	DriverStandingsByYearResponse: {
		MRData?: {
			xmlns?: string;
			series?: string;
			url?: string;
			/** @example 30 */
			limit?: string;
			/** @example 0 */
			offset?: string;
			/** @example 20 */
			total?: string;
			StandingsTable?: {
				season?: string;
				StandingsLists?: SeasonStanding[];
			};
		};
	};
	ResultsByYearResponse: {
		MRData?: {
			xmlns?: string;
			series?: string;
			url?: string;
			/** @example 30 */
			limit?: string;
			/** @example 0 */
			offset?: string;
			/** @example 20 */
			total?: string;
			RaceTable?: {
				season?: string;
				/** @description Only returned if round parameter used */
				round?: string;
				Races?: Race[];
			};
		};
	};
	SeasonByYearResponse: {
		MRData?: {
			xmlns?: string;
			series?: string;
			url?: string;
			/** @example 30 */
			limit?: string;
			/** @example 0 */
			offset?: string;
			/** @example 20 */
			total?: string;
			RaceTable?: {
				season?: string;
				Races?: Race[];
			};
		};
	};
};