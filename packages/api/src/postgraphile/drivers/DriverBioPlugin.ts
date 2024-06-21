import {gql, makeExtendSchemaPlugin} from 'postgraphile';
import {getCanonicalId, getSummary} from '../wikipedia';

const DriverBioPlugin = makeExtendSchemaPlugin(() => {
	return {
		typeDefs:  gql`
			type BioImage {
				source: String
				width: Int
				height: Int
			}

			type DriverBio {
				title: String
				thumbnail: BioImage
				description: String
				extract: String
			}

			extend type Driver {
				bio: DriverBio @requires(columns: ["url"])
				fullName: String @requires(columns: ["forename", "surname"])
			}
		`,
		resolvers: {
			Driver: {
				bio: async (driver) => await getSummary(getCanonicalId(driver.url)).catch((err) => {
					console.error(err);
					return undefined;
				}),
				fullName: (driver) => `${driver.forename} ${driver.surname}`.trim()
			}
		}
	};
});

export default DriverBioPlugin;