import {makeJSONPgSmartTagsPlugin} from 'postgraphile';

const {DB_SCHEMA} = process.env;

const SmartTagsPlugin = makeJSONPgSmartTagsPlugin(
	{
		version: 1,
		config:  {
			class: {
				[`${DB_SCHEMA}.seasonsStatus`]:            {
					tags: {
						omit: 'all'
					}
				},
				[`${DB_SCHEMA}.driverCurrentTeam`]:        {
					tags: {
						unique:     [
							'"driverId"'
						],
						foreignKey: [
							`("driverId") references ${DB_SCHEMA}.drivers ("driverId")|@foreignFieldName currentTeam`,
							`("teamId") references ${DB_SCHEMA}.teams ("teamId")|@foreignFieldName currentDrivers`
						]
					}
				},
				[`${DB_SCHEMA}.driverTeams`]:              {
					tags: {
						foreignKey: [
							`("driverId") references ${DB_SCHEMA}.drivers ("driverId")|@foreignFieldName teamsByYear`,
							`("teamId") references ${DB_SCHEMA}.teams ("teamId")|@foreignFieldName driversByYear`,
							`("year") references ${DB_SCHEMA}.seasons ("year")|@foreignFieldName driverTeams`
						]
					}
				},
				[`${DB_SCHEMA}.driverStandingsBySeason`]:  {
					tags: {
						foreignKey: [
							`("driverId") references ${DB_SCHEMA}.drivers ("driverId")`,
							`("raceId") references ${DB_SCHEMA}.races ("raceId")`,
							`("driverId", "year") references ${DB_SCHEMA}."driverTeams" ("driverId", "year")`
						]
					}
				},
				[`${DB_SCHEMA}.finalTeamStandingsByYear`]: {
					tags: {
						foreignKey: [
							`("teamId") references ${DB_SCHEMA}.teams ("teamId")`,
							`("raceId") references ${DB_SCHEMA}.races ("raceId")`
						]
					}
				},
				[`${DB_SCHEMA}.lapTimesWithStart`]:        {
					tags: {
						foreignKey: [
							`("raceId") references ${DB_SCHEMA}.races ("raceId")|@fieldName race`,
							`("driverId") references ${DB_SCHEMA}.drivers ("driverId")|@foreignFieldName lapTimesWithStart|@omit`
						]
					}
				},
				[`${DB_SCHEMA}.nextRaceBySeason`]:         {
					tags: {
						unique:     [
							'year',
							'"raceId"'
						],
						foreignKey: [
							`("year") references ${DB_SCHEMA}.seasons ("year")|@fieldName season|@foreignFieldName nextRace`,
							`("raceId") references ${DB_SCHEMA}.races ("raceId")|@fieldName race`,
							`("raceId") references ${DB_SCHEMA}.races ("raceId")|@foreignFieldName season|@omit`
						]
					}
				}
			}
		}
	}
);

export default SmartTagsPlugin;