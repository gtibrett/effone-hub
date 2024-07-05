import {PostGraphileOptions} from 'postgraphile';
import ConstructorBioPlugin from './constructors/ConstructorBioPlugin';
import DriverBioPlugin from './drivers/DriverBioPlugin';
import RaceSummaryPlugin from './races/RaceSummaryPlugin';
import SeasonFilterPluginDecorator from './SeasonFilterDecoratorPlugin';
import SeasonFiltersPlugin from './SeasonFiltersPlugin';
import SmartTagsPlugin from './SmartTagsPlugin';

const {EFFONE_MODE = 'production', ENABLE_GRAPHIQL = 'false'} = process.env;

const options: PostGraphileOptions = {
	
	subscriptions:              false,
	watchPg:                    true,
	dynamicJson:                true,
	setofFunctionsContainNulls: false,
	ignoreRBAC:                 false,
	showErrorStack:             EFFONE_MODE !== 'production',
	extendedErrors:             EFFONE_MODE === 'production'
	                            ? ['hint', 'detail', 'decode']
	                            : ['severity', 'code', 'detail', 'hint', 'position', 'internalPosition', 'internalQuery', 'where', 'schema', 'table', 'column', 'dataType', 'constraint', 'file', 'line', 'routine'],
	allowExplain:               EFFONE_MODE === 'production' ? undefined : (req) => true,
	appendPlugins:              [
		require('@graphile-contrib/pg-simplify-inflector'),
		ConstructorBioPlugin,
		DriverBioPlugin,
		RaceSummaryPlugin,
		SeasonFilterPluginDecorator('driverStandings'),
		SeasonFilterPluginDecorator('results'),
		SeasonFilterPluginDecorator('sprintResults'),
		SeasonFilterPluginDecorator('teamStandings'),
		...SeasonFiltersPlugin(),
		SmartTagsPlugin
	],
	simpleCollections:          'both',
	
	exportGqlSchemaPath: EFFONE_MODE === 'production' ? undefined : './src/schema.graphql',
	
	graphiql:            ENABLE_GRAPHIQL.toLowerCase() === 'true',
	enhanceGraphiql:     ENABLE_GRAPHIQL.toLowerCase() === 'true',
	enableQueryBatching: true,
	legacyRelations:     'omit',
	
	graphileBuildOptions: {
		pgOmitListSuffix: true
	},
	
	graphqlRoute:  "/api/graphql",
	graphiqlRoute: "/api/graphiql"
};

export default options;