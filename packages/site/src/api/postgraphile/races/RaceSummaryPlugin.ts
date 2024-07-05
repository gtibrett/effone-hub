import {gql, makeExtendSchemaPlugin} from 'postgraphile';
import {getCanonicalId, getSummary} from '../wikipedia';

const RaceSummaryPlugin = makeExtendSchemaPlugin(() => {
	return {
		typeDefs:  gql`
			type RaceSummary {
				title: String
				description: String
				extract: String
			}

			extend type Race {
				summary: RaceSummary @requires(columns: ["url"])
			}
		`,
		resolvers: {
			Race: {
				summary: async (race) => await getSummary(getCanonicalId(race.url)).catch((err) => {
					console.error(err);
					return undefined;
				})
			}
		}
	};
});

export default RaceSummaryPlugin;