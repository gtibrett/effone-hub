-- apply_team_rename.sql
--
-- Renames f1db.constructor* tables and columns to f1db.team* so that
-- PostGraphile inflection does not collide with Object.prototype.constructor.
--
-- Called by both packages/database/entrypoint/init.sh (Docker bootstrap) and
-- the Vercel ingest function after every schema swap.
-- Idempotent: the existence check on the old table name makes re-running safe.

DO $$
DECLARE
  r record;
BEGIN
  -- Only run if the original constructor table still exists.
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'f1db' AND tablename = 'constructor') THEN

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

    -- view columns (views inherit column NAMES from definition time, not by
    -- OID, so a base-table rename does NOT propagate automatically)
    FOR r IN
      SELECT t.table_name
      FROM information_schema.columns c
      JOIN information_schema.tables t
        ON c.table_schema = t.table_schema AND c.table_name = t.table_name
      WHERE c.table_schema = 'f1db'
        AND c.column_name = 'constructor_id'
        AND t.table_type = 'VIEW'
    LOOP
      EXECUTE format('ALTER VIEW f1db.%I RENAME COLUMN constructor_id TO team_id', r.table_name);
    END LOOP;

  END IF;
END$$;
