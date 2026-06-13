import type { TypePolicies } from '@apollo/client';

/**
 * Cache-normalization keys for types whose identity is NOT a single `id`.
 *
 * The 12 single-PK entity types (Driver, Team, Circuit, …) now expose their
 * human PK as `id`, so Apollo normalizes them automatically — they need no
 * entry here. Everything below is keyed by its natural compound key (Race +
 * the PostGraphile views/junctions, which have no single `id` since the Node
 * interface was dropped). Without these, InMemoryCache can't merge them and
 * logs "Cache data may be lost" warnings.
 *
 * Keys mirror PLAN.id-remap.md. `raceId+driverId` is unique per race row;
 * multi-row-per-driver types add a discriminator (PitStop.stop, AppLapTime.lap).
 */
export const typePolicies: TypePolicies = {
	Race: { keyFields: ['year', 'round'] },
	Season: { keyFields: ['year'] },

	RaceResult: { keyFields: ['raceId', 'driverId'] },
	QualifyingResult: { keyFields: ['raceId', 'driverId'] },
	SprintRaceResult: { keyFields: ['raceId', 'driverId'] },
	SprintQualifyingResult: { keyFields: ['raceId', 'driverId'] },
	StartingGridPosition: { keyFields: ['raceId', 'driverId'] },
	SprintStartingGridPosition: { keyFields: ['raceId', 'driverId'] },
	FastestLap: { keyFields: ['raceId', 'driverId'] },
	DriverOfTheDayResult: { keyFields: ['raceId', 'driverId'] },
	RaceDriverStanding: { keyFields: ['raceId', 'driverId'] },
	// Team standings split per engine manufacturer (e.g. 1966 McLaren-Ford vs
	// McLaren-Serenissima = two distinct rows). engineManufacturerId is required
	// to keep them from collapsing into one normalized object.
	RaceTeamStanding: { keyFields: ['raceId', 'teamId', 'engineManufacturerId'] },

	PitStop: { keyFields: ['raceId', 'driverId', 'stop'] },
	AppLapTime: { keyFields: ['raceId', 'driverId', 'lap'] },

	SeasonDriverStanding: { keyFields: ['year', 'driverId'] },
	SeasonTeamStanding: { keyFields: ['year', 'teamId', 'engineManufacturerId'] },
	SeasonEntrantDriver: { keyFields: ['year', 'driverId', 'teamId'] },

	AppTeamHistory: { keyFields: ['teamId', 'antecedentTeamId', 'startYear'] },
	AppTeamColor: { keyFields: ['teamId'] },
	AppDriverBio: { keyFields: ['driverId'] },
	AppConstructorBio: { keyFields: ['teamId'] }
};
