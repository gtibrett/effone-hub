import {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema:    './src/schema.graphql',
	generates: {
		'./src/types/graph.ts': {
			plugins: [
				'typescript'
			]
		}
	}
};

export default config;