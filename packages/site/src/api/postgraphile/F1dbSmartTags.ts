import {makeJSONPgSmartTagsPlugin} from 'postgraphile/utils';

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
	config:  {
		class: {
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
					foreignKey: '(circuit_id) references f1db.circuit (id)|@fieldName circuit|@foreignFieldName description'
				}
			},
			'app.driver_bios': {
				tags: {
					foreignKey: '(driver_id) references f1db.driver (id)|@fieldName driver|@foreignFieldName bio'
				}
			},
			'app.constructor_bios': {
				tags: {
					foreignKey: '(constructor_id) references f1db.constructor (id)|@fieldName constructor|@foreignFieldName bio'
				}
			},
			'app.team_colors': {
				tags: {
					foreignKey: '(constructor_id) references f1db.constructor (id)|@fieldName constructor|@foreignFieldName colors'
				}
			},
			'app.team_history': {
				tags: {
					foreignKey: [
						'(constructor_id) references f1db.constructor (id)|@fieldName constructor|@foreignFieldName antecedents',
						'(antecedent_constructor_id) references f1db.constructor (id)|@fieldName antecedent|@foreignFieldName successors'
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
						'(constructor_id) references f1db.constructor (id)|@foreignFieldName raceResults'
					]
				}
			},
			'f1db.qualifying_result': {
				tags: {
					primaryKey: 'race_id,position_display_order',
					foreignKey: [
						'(race_id) references f1db.race (id)|@foreignFieldName qualifyingResults',
						'(driver_id) references f1db.driver (id)|@foreignFieldName qualifyingResults',
						'(constructor_id) references f1db.constructor (id)|@foreignFieldName qualifyingResults'
					]
				}
			},
			'f1db.sprint_race_result': {
				tags: {
					primaryKey: 'race_id,position_display_order',
					foreignKey: [
						'(race_id) references f1db.race (id)|@foreignFieldName sprintRaceResults',
						'(driver_id) references f1db.driver (id)|@foreignFieldName sprintRaceResults',
						'(constructor_id) references f1db.constructor (id)|@foreignFieldName sprintRaceResults'
					]
				}
			},
			'f1db.sprint_qualifying_result': {
				tags: {
					primaryKey: 'race_id,position_display_order',
					foreignKey: [
						'(race_id) references f1db.race (id)|@foreignFieldName sprintQualifyingResults',
						'(driver_id) references f1db.driver (id)|@foreignFieldName sprintQualifyingResults',
						'(constructor_id) references f1db.constructor (id)|@foreignFieldName sprintQualifyingResults'
					]
				}
			},
			'f1db.starting_grid_position': {
				tags: {
					primaryKey: 'race_id,position_display_order',
					foreignKey: [
						'(race_id) references f1db.race (id)|@foreignFieldName startingGridPositions',
						'(driver_id) references f1db.driver (id)|@foreignFieldName startingGridPositions',
						'(constructor_id) references f1db.constructor (id)|@foreignFieldName startingGridPositions'
					]
				}
			},
			'f1db.sprint_starting_grid_position': {
				tags: {
					primaryKey: 'race_id,position_display_order',
					foreignKey: [
						'(race_id) references f1db.race (id)|@foreignFieldName sprintStartingGridPositions',
						'(driver_id) references f1db.driver (id)|@foreignFieldName sprintStartingGridPositions',
						'(constructor_id) references f1db.constructor (id)|@foreignFieldName sprintStartingGridPositions'
					]
				}
			},
			'f1db.pit_stop': {
				tags: {
					primaryKey: 'race_id,driver_id,stop',
					foreignKey: [
						'(race_id) references f1db.race (id)|@foreignFieldName pitStops',
						'(driver_id) references f1db.driver (id)|@foreignFieldName pitStops',
						'(constructor_id) references f1db.constructor (id)|@foreignFieldName pitStops'
					]
				}
			},
			'f1db.fastest_lap': {
				tags: {
					primaryKey: 'race_id,position_display_order',
					foreignKey: [
						'(race_id) references f1db.race (id)|@foreignFieldName fastestLaps',
						'(driver_id) references f1db.driver (id)|@foreignFieldName fastestLaps',
						'(constructor_id) references f1db.constructor (id)|@foreignFieldName fastestLaps'
					]
				}
			},
			'f1db.driver_of_the_day_result': {
				tags: {
					primaryKey: 'race_id,position_display_order',
					foreignKey: [
						'(race_id) references f1db.race (id)|@foreignFieldName driverOfTheDayResults',
						'(driver_id) references f1db.driver (id)|@foreignFieldName driverOfTheDayResults',
						'(constructor_id) references f1db.constructor (id)|@foreignFieldName driverOfTheDayResults'
					]
				}
			}
		}
	}
});

export default F1dbSmartTags;
