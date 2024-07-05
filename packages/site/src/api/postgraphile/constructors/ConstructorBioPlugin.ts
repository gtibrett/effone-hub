import {gql, makeExtendSchemaPlugin} from 'postgraphile';
import {getCanonicalId, getSummary} from '../wikipedia';

const ConstructorBioPlugin = makeExtendSchemaPlugin(() => {
	return {
		typeDefs:  gql`
			type TeamBioImage {
				source: String
				width: Int
				height: Int
			}

			type TeamBio {
				title: String
				thumbnail: TeamBioImage
				description: String
				extract: String
			}

			extend type Team {
				bio: TeamBio @requires(columns: ["url"])
			}
		`,
		resolvers: {
			Team: {
				bio: async (constructor) => await getSummary(getCanonicalId(constructor.url)).catch((err) => {
					console.error(err);
					return undefined;
				})
			}
		}
	};
});

export default ConstructorBioPlugin;