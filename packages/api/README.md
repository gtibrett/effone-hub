# General Notes

Updated API providing a GraphQL endpoint serving Ergast F1 data.

# Environment Variables

## .env file
The provided .env file will connect this API to the Docker based database from the accompanying `database` package.

## Variables
```
PORT:               run on this port
EFFONE_MODE:        'dev' or 'production'. adjusts postgraphile config
EFFONE_ORIGIN:      for CORS, blank to allow all CORS requests
ENABLE_GRAPHIQL:    'true' to enable PostGraphiQL UI at `/graphiql`

# Database connection configs
DB_HOST, DB_PORT, DB_USER, DB_DATABASE, DB_SCHEMA, DB_PASSWORD, DB_USE_SSL

DB_SSL_ROOT_CERT_PATH:  path to root cert in case you are using a self-signed cert, ala AWS
```

# Commands
```
yarn clean      # delete build artifacts
yarn start      # run locally
yarn build      # build for deployment
yarn package    # build and tarball distributable app
yarn data       # pull ergast data down for use with loader functions
```

# Based on ergast-f1-api
Using my fork at [gtibrett/ergast-f1-api](https://github.com/gtibrett/ergast-f1-api/tree/effone-develop)