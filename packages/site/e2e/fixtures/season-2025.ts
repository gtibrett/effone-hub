/**
 * Verified 2025 roster, harvested from the GraphQL API `season(year: 2025)`
 * (seasonDriverStandingsByYear.driverId / seasonTeamStandingsByYear.teamId /
 * racesByYear.circuitId) — the same source the app's generateStaticParams use.
 * Refs == URL slugs. Counts: 21 drivers, 10 constructors, 24 circuits/rounds.
 */
export const SEASON_2025 = 2025;
export const ROUNDS_2025 = 24;

export const DRIVERS_2025 = [
	'lando-norris',
	'max-verstappen',
	'oscar-piastri',
	'george-russell',
	'charles-leclerc',
	'lewis-hamilton',
	'kimi-antonelli',
	'alexander-albon',
	'carlos-sainz-jr',
	'fernando-alonso',
	'nico-hulkenberg',
	'isack-hadjar',
	'oliver-bearman',
	'liam-lawson',
	'esteban-ocon',
	'lance-stroll',
	'yuki-tsunoda',
	'pierre-gasly',
	'gabriel-bortoleto',
	'franco-colapinto',
	'jack-doohan'
] as const;

export const CONSTRUCTORS_2025 = [
	'mclaren',
	'mercedes',
	'red-bull',
	'ferrari',
	'williams',
	'racing-bulls',
	'aston-martin',
	'haas',
	'kick-sauber',
	'alpine'
] as const;

export const CIRCUITS_2025 = [
	'melbourne',
	'shanghai',
	'suzuka',
	'bahrain',
	'jeddah',
	'miami',
	'imola',
	'monaco',
	'catalunya',
	'montreal',
	'spielberg',
	'silverstone',
	'spa-francorchamps',
	'hungaroring',
	'zandvoort',
	'monza',
	'baku',
	'marina-bay',
	'austin',
	'mexico-city',
	'interlagos',
	'las-vegas',
	'lusail',
	'yas-marina'
] as const;

/**
 * Representative refs for per-entity detail UI tests. Every entity's detail page
 * is the same component, so one is enough — the full roster is covered by the
 * harvest/consistency specs. Drivers use two: a multi-season veteran and a
 * single-season rookie, to exercise both CareerBreakdownChart branches
 * (multi-season vs the isSingleSeason horizontal-bar path).
 */
export const REPRESENTATIVE_DRIVERS = ['george-russell', 'gabriel-bortoleto'] as const;
export const REPRESENTATIVE_CONSTRUCTORS = ['mclaren'] as const;
export const REPRESENTATIVE_CIRCUITS = ['monaco'] as const;
