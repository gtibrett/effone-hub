#!/bin/bash
set -euo pipefail

echo "[init] creating schemas f1db + app"
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE SCHEMA IF NOT EXISTS f1db;
  CREATE SCHEMA IF NOT EXISTS app;
  ALTER ROLE "$POSTGRES_USER" SET search_path TO f1db, app, public;
EOSQL

echo "[init] loading F1DB dump into schema f1db"
PGOPTIONS="--search_path=f1db,public" \
  psql -v ON_ERROR_STOP=1 \
       --username "$POSTGRES_USER" \
       --dbname "$POSTGRES_DB" \
       -f /dump/f1db.sql

echo "[init] applying app schema"
psql -v ON_ERROR_STOP=1 \
     --username "$POSTGRES_USER" \
     --dbname "$POSTGRES_DB" \
     -f /dump/app_schema.sql

echo "[init] done"
