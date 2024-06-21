import {makeAddPgTableConditionPlugin} from 'postgraphile';

const {DB_SCHEMA = ''} = process.env;

export default function SeasonFilterPluginDecorator(tableName: string) {
	return makeAddPgTableConditionPlugin(
		DB_SCHEMA,
		tableName,
		'year',
		build => ({
			description: `Filters ${tableName} by year`,
			type:        build.graphql.GraphQLInt
		}),
		(value, helpers, build) => {
			const {sql, sqlTableAlias} = helpers;
			const racesAlias           = sql.identifier(Symbol('racesByYear"'));
			
			return sql.fragment`"raceId" IN (
		      select ${racesAlias}."raceId"
		      from ${sql.identifier(DB_SCHEMA)}."races" as ${racesAlias}
		      where ${racesAlias}.year = ${sql.value(value)}
	        )`;
		}
	);
}