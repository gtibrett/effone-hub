import { makeJSONPgSmartTagsPlugin } from 'postgraphile/utils';

/**
 * Cross-schema relations between `app.*` and `f1db.*`.
 *
 * Why: the f1db schema is dropped + recreated atomically every ingest cycle,
 * so we deliberately do NOT declare real foreign keys at the database level
 * (they would block the DROP CASCADE or get torn down with the swap). These
 * smart-tag entries give PostGraphile the same relation graph it would build
 * from real FKs, so the GraphQL types expose `appLapTimes` on Race/Driver,
 * `colors` on Constructor (=Team), `description` on Circuit, etc.
 */
const F1dbSmartTags = makeJSONPgSmartTagsPlugin({
	version: 1,
	config: {
		class: {
			// NOTE: f1db.constructor* tables are renamed to f1db.team* by init.sh
			// (see entrypoint/init.sh). This is required because PostGraphile
			// inflection iterates relation maps via plain JS property access,
			// which collides with `Object.prototype.constructor` and produces
			// garbage field names like `functionObjectNativeCodeSeasonEntrantDrivers`.
			// The rename also matches UI domain language (useTeam, TeamId, etc.).

			// app -> f1db cross-schema relations. We deliberately omit real
			// FKs at the DB level since the f1db schema is dropped+recreated
			// each ingest.
			'app.lap_times': {
				tags: {
					foreignKey: [
						'(race_id) references f1db.race (id)|@fieldName race|@foreignFieldName lapTimes',
						'(driver_id) references f1db.driver (id)|@fieldName driver|@foreignFieldName lapTimes'
					]
				}
			},
			'app.circuit_descriptions': {
				tags: {
					foreignKey:
						'(circuit_id) references f1db.circuit (id)|@fieldName circuit|@foreignFieldName description'
				}
			},
			'app.team_colors': {
				tags: {
					foreignKey:
						'(team_id) references f1db.team (id)|@fieldName team|@foreignFieldName colors'
				}
			},
			'app.team_history': {
				tags: {
					// PK is (team_id, antecedent_team_id, start_year) — start_year
					// is part of the key so multiple year-range rows can exist for
					// the same (team, antecedent) pair (e.g. alfa-romeo/sauber
					// 1993-2005 and 2011-2018).
					primaryKey: 'team_id,antecedent_team_id,start_year',
					foreignKey: [
						'(team_id) references f1db.team (id)|@fieldName team|@foreignFieldName antecedents',
						'(antecedent_team_id) references f1db.team (id)|@fieldName antecedentTeam|@foreignFieldName successors'
					]
				}
			},

			// F1DB exposes per-session result types as VIEWS over a polymorphic
			// race_data table, so PostGraphile can't infer their relations from
			// FK introspection. These tags re-attach those relations.
			'f1db.race_result': {
				tags: {
					primaryKey: 'race_id,position_display_order',
					foreignKey: [
						'(race_id) references f1db.race (id)|@foreignFieldName raceResults',
						'(driver_id) references f1db.driver (id)|@foreignFieldName raceResults',
						'(team_id) references f1db.team (id)|@foreignFieldName raceResults'
					]
				}
			},
			'f1db.qualifying_result': {
				tags: {
					primaryKey: 'race_id,position_display_order',
					foreignKey: [
						'(race_id) references f1db.race (id)|@foreignFieldName qualifyingResults',
						'(driver_id) references f1db.driver (id)|@foreignFieldName qualifyingResults',
						'(team_id) references f1db.team (id)|@foreignFieldName qualifyingResults'
					]
				}
			},
			'f1db.sprint_race_result': {
				tags: {
					primaryKey: 'race_id,position_display_order',
					foreignKey: [
						'(race_id) references f1db.race (id)|@foreignFieldName sprintRaceResults',
						'(driver_id) references f1db.driver (id)|@foreignFieldName sprintRaceResults',
						'(team_id) references f1db.team (id)|@foreignFieldName sprintRaceResults'
					]
				}
			},
			'f1db.sprint_qualifying_result': {
				tags: {
					primaryKey: 'race_id,position_display_order',
					foreignKey: [
						'(race_id) references f1db.race (id)|@foreignFieldName sprintQualifyingResults',
						'(driver_id) references f1db.driver (id)|@foreignFieldName sprintQualifyingResults',
						'(team_id) references f1db.team (id)|@foreignFieldName sprintQualifyingResults'
					]
				}
			},
			'f1db.starting_grid_position': {
				tags: {
					primaryKey: 'race_id,position_display_order',
					foreignKey: [
						'(race_id) references f1db.race (id)|@foreignFieldName startingGridPositions',
						'(driver_id) references f1db.driver (id)|@foreignFieldName startingGridPositions',
						'(team_id) references f1db.team (id)|@foreignFieldName startingGridPositions'
					]
				}
			},
			'f1db.sprint_starting_grid_position': {
				tags: {
					primaryKey: 'race_id,position_display_order',
					foreignKey: [
						'(race_id) references f1db.race (id)|@foreignFieldName sprintStartingGridPositions',
						'(driver_id) references f1db.driver (id)|@foreignFieldName sprintStartingGridPositions',
						'(team_id) references f1db.team (id)|@foreignFieldName sprintStartingGridPositions'
					]
				}
			},
			'f1db.pit_stop': {
				tags: {
					primaryKey: 'race_id,driver_id,stop',
					foreignKey: [
						'(race_id) references f1db.race (id)|@foreignFieldName pitStops',
						'(driver_id) references f1db.driver (id)|@foreignFieldName pitStops',
						'(team_id) references f1db.team (id)|@foreignFieldName pitStops'
					]
				}
			},
			'f1db.fastest_lap': {
				tags: {
					primaryKey: 'race_id,position_display_order',
					foreignKey: [
						'(race_id) references f1db.race (id)|@foreignFieldName fastestLaps',
						'(driver_id) references f1db.driver (id)|@foreignFieldName fastestLaps',
						'(team_id) references f1db.team (id)|@foreignFieldName fastestLaps'
					]
				}
			},
			'f1db.driver_of_the_day_result': {
				tags: {
					primaryKey: 'race_id,position_display_order',
					foreignKey: [
						'(race_id) references f1db.race (id)|@foreignFieldName driverOfTheDayResults',
						'(driver_id) references f1db.driver (id)|@foreignFieldName driverOfTheDayResults',
						'(team_id) references f1db.team (id)|@foreignFieldName driverOfTheDayResults'
					]
				}
			}
		}
	}
});

export default F1dbSmartTags;
