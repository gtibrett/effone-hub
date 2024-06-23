import {makeAddPgTableConditionPlugin} from 'postgraphile';

const {DB_SCHEMA = ''} = process.env;

export default function SeasonFiltersPlugin() {
	return [
		makeAddPgTableConditionPlugin(
			DB_SCHEMA,
			'seasons',
			'hasResults',
			build => ({
				description: `Filters seasons by 'hasResults'`,
				type:        build.graphql.GraphQLBoolean
			}),
			(value, helpers) => {
				const {sql, sqlTableAlias} = helpers;
				const schema               = sql.identifier(DB_SCHEMA);
				
				return sql.fragment`${sqlTableAlias}.year IN (
					SELECT ss.year
					FROM ${schema}."seasonsStatus" ss
					WHERE ss.has_results = ${sql.value(value)}
				)`;
			}
		),
		makeAddPgTableConditionPlugin(
			DB_SCHEMA,
			'seasons',
			'ended',
			build => ({
				description: `Filters seasons by 'ended'`,
				type:        build.graphql.GraphQLBoolean
			}),
			(value, helpers) => {
				const {sql, sqlTableAlias} = helpers;
				const schema               = sql.identifier(DB_SCHEMA);
				
				return sql.fragment`${sqlTableAlias}.year IN (
					SELECT ss.year
					FROM ${schema}."seasonsStatus" ss
					WHERE ss."ended" = ${sql.value(value)}
				)`;
			}
		)
	];
}