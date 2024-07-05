import {makeJSONPgSmartTagsPlugin} from 'postgraphile';

const {POSTGRES_SCHEMA} = process.env;

const SmartTagsPlugin = makeJSONPgSmartTagsPlugin(
	{
		version: 1,
		config:  {
			class: {
				[`${POSTGRES_SCHEMA}.seasonsStatus`]:            {
					tags: {
						omit: 'all'
					}
				},
				[`${POSTGRES_SCHEMA}.driverCurrentTeam`]:        {
					tags: {
						unique:     [
							'"driverId"'
						],
						foreignKey: [
							`("driverId") references ${POSTGRES_SCHEMA}.drivers ("driverId")|@foreignFieldName currentTeam`,
							`("teamId") references ${POSTGRES_SCHEMA}.teams ("teamId")|@foreignFieldName currentDrivers`
						]
					}
				},
				[`${POSTGRES_SCHEMA}.driverTeams`]:              {
					tags: {
						foreignKey: [
							`("driverId") references ${POSTGRES_SCHEMA}.drivers ("driverId")|@foreignFieldName teamsByYear`,
							`("teamId") references ${POSTGRES_SCHEMA}.teams ("teamId")|@foreignFieldName driversByYear`,
							`("year") references ${POSTGRES_SCHEMA}.seasons ("year")|@foreignFieldName driverTeams`
						]
					}
				},
				[`${POSTGRES_SCHEMA}.driverStandingsBySeason`]:  {
					tags: {
						foreignKey: [
							`("driverId") references ${POSTGRES_SCHEMA}.drivers ("driverId")`,
							`("raceId") references ${POSTGRES_SCHEMA}.races ("raceId")`,
							`("driverId", "year") references ${POSTGRES_SCHEMA}."driverTeams" ("driverId", "year")`
						]
					}
				},
				[`${POSTGRES_SCHEMA}.finalTeamStandingsByYear`]: {
					tags: {
						foreignKey: [
							`("teamId") references ${POSTGRES_SCHEMA}.teams ("teamId")`,
							`("raceId") references ${POSTGRES_SCHEMA}.races ("raceId")`
						]
					}
				},
				[`${POSTGRES_SCHEMA}.lapTimesWithStart`]:        {
					tags: {
						foreignKey: [
							`("raceId") references ${POSTGRES_SCHEMA}.races ("raceId")|@fieldName race`,
							`("driverId") references ${POSTGRES_SCHEMA}.drivers ("driverId")|@foreignFieldName lapTimesWithStart|@omit`
						]
					}
				},
				[`${POSTGRES_SCHEMA}.nextRaceBySeason`]:         {
					tags: {
						unique:     [
							'year',
							'"raceId"'
						],
						foreignKey: [
							`("year") references ${POSTGRES_SCHEMA}.seasons ("year")|@fieldName season|@foreignFieldName nextRace`,
							`("raceId") references ${POSTGRES_SCHEMA}.races ("raceId")|@fieldName race`,
							`("raceId") references ${POSTGRES_SCHEMA}.races ("raceId")|@foreignFieldName season|@omit`
						]
					}
				}
			}
		}
	}
);

export default SmartTagsPlugin;