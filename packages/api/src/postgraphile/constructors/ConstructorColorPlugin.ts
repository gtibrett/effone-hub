import {gql, makeExtendSchemaPlugin} from 'postgraphile';

type TeamWithColor = {
	teamRef: string;
	color: string;
}

const teams: TeamWithColor[] = require('./colors.json');

const ConstructorColorPlugin = makeExtendSchemaPlugin(() => {
	return {
		typeDefs:  gql`
			extend type Team {
				color: String @requires(columns: ["constructorRef"])
			}
		`,
		resolvers: {
			Team: {
				color: (constructor) => (teams.find(c => c.teamRef === constructor.constructorRef) || {}).color
			}
		}
	};
});

export default ConstructorColorPlugin;