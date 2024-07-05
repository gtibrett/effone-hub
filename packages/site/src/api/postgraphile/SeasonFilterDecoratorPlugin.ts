import {makeAddPgTableConditionPlugin} from 'postgraphile';

const {POSTGRES_SCHEMA = ''} = process.env;

export default function SeasonFilterPluginDecorator(tableName: string) {
	return makeAddPgTableConditionPlugin(
		POSTGRES_SCHEMA,
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
		      from ${sql.identifier(POSTGRES_SCHEMA)}."races" as ${racesAlias}
		      where ${racesAlias}.year = ${sql.value(value)}
	        )`;
		}
	);
}