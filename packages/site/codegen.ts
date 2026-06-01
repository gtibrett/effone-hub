
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.CODEGEN_SCHEMA_URL ?? "../api/schema.graphql",
  documents: "src/**/*.{ts,tsx,graphql}",
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
