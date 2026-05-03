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

echo "[init] renaming f1db.constructor* → f1db.team* (PostGraphile inflection workaround)"
# PostGraphile v5 inflection iterates relation maps via plain JS property access.
# Any column or table named `constructor` collides with Object.prototype.constructor
# and produces garbage GraphQL field names like `functionObjectNativeCodeSeasonEntrantDrivers`.
# Rename tables and columns to `team`/`team_id` to bypass. Also matches UI domain language.
psql -v ON_ERROR_STOP=1 \
     --username "$POSTGRES_USER" \
     --dbname "$POSTGRES_DB" <<-EOSQL
  -- tables
  ALTER TABLE f1db.constructor                 RENAME TO team;
  ALTER TABLE f1db.constructor_chronology      RENAME TO team_chronology;
  ALTER TABLE f1db.race_constructor_standing   RENAME TO race_team_standing;
  ALTER TABLE f1db.season_constructor          RENAME TO season_team;
  ALTER TABLE f1db.season_constructor_standing RENAME TO season_team_standing;
  ALTER TABLE f1db.season_entrant_constructor  RENAME TO season_entrant_team;

  -- base-table columns
  ALTER TABLE f1db.chassis                          RENAME COLUMN constructor_id TO team_id;
  ALTER TABLE f1db.race_data                        RENAME COLUMN constructor_id TO team_id;
  ALTER TABLE f1db.race_team_standing               RENAME COLUMN constructor_id TO team_id;
  ALTER TABLE f1db.season_entrant_chassis           RENAME COLUMN constructor_id TO team_id;
  ALTER TABLE f1db.season_entrant_driver            RENAME COLUMN constructor_id TO team_id;
  ALTER TABLE f1db.season_entrant_engine            RENAME COLUMN constructor_id TO team_id;
  ALTER TABLE f1db.season_entrant_team              RENAME COLUMN constructor_id TO team_id;
  ALTER TABLE f1db.season_entrant_tyre_manufacturer RENAME COLUMN constructor_id TO team_id;
  ALTER TABLE f1db.season_team                      RENAME COLUMN constructor_id TO team_id;
  ALTER TABLE f1db.season_team_standing             RENAME COLUMN constructor_id TO team_id;
  ALTER TABLE f1db.team_chronology                  RENAME COLUMN constructor_id TO team_id;
  ALTER TABLE f1db.team_chronology                  RENAME COLUMN other_constructor_id TO other_team_id;

  -- view columns (views inherit base-table column NAMES from definition time,
  -- not by OID, so a base-table rename does NOT propagate; rename here too)
  DO \$\$
  DECLARE r record;
  BEGIN
    FOR r IN
      SELECT t.table_name
      FROM information_schema.columns c
      JOIN information_schema.tables t
        ON c.table_schema=t.table_schema AND c.table_name=t.table_name
      WHERE c.table_schema='f1db'
        AND c.column_name='constructor_id'
        AND t.table_type='VIEW'
    LOOP
      EXECUTE format('ALTER VIEW f1db.%I RENAME COLUMN constructor_id TO team_id', r.table_name);
    END LOOP;
  END\$\$;
EOSQL

echo "[init] applying app schema"
psql -v ON_ERROR_STOP=1 \
     --username "$POSTGRES_USER" \
     --dbname "$POSTGRES_DB" \
     -f /dump/app_schema.sql

echo "[init] done"
