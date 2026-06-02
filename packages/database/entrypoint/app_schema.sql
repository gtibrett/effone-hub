-- app schema: supplementary tables we own across F1DB ingests.
-- The f1db schema gets atomically swapped each ingest; everything in here persists.

SET search_path TO app, public;

CREATE TABLE IF NOT EXISTS app.ingest_state (
  key        text PRIMARY KEY,
  value      text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Lap times sourced from Jolpica (F1DB does not ship lap times).
-- race_id matches f1db.race.id (int); driver_id matches f1db.driver.id (varchar slug).
CREATE TABLE IF NOT EXISTS app.lap_times (
  race_id      int     NOT NULL,
  driver_id    varchar(100) NOT NULL,
  lap          int     NOT NULL,
  position     int,
  time_text    varchar(20),
  milliseconds int,
  PRIMARY KEY (race_id, driver_id, lap)
);
CREATE INDEX IF NOT EXISTS lap_times_race_idx   ON app.lap_times (race_id);
CREATE INDEX IF NOT EXISTS lap_times_driver_idx ON app.lap_times (driver_id);

-- Circuit prose (existing OpenAI-generated content; migrated from legacy table on cutover).
CREATE TABLE IF NOT EXISTS app.circuit_descriptions (
  circuit_id  varchar(100) PRIMARY KEY,
  description text NOT NULL,
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- Team brand colors — F1DB ships colors per season_entrant_constructor; this is a
-- per-constructor fallback for places we want a single canonical look.
CREATE TABLE IF NOT EXISTS app.team_colors (
  team_id       varchar(100) PRIMARY KEY,
  primary_hex   varchar(7),
  secondary_hex varchar(7),
  logo          text
);

-- Driver/constructor bios are NOT stored in our DB — they resolve at GraphQL
-- execution time via WikipediaBioPlugin (postgraphile/utils makeExtendSchemaPlugin)
-- with a per-process LRU cache. See packages/api/src/postgraphile/wikipedia/WikipediaBioPlugin.ts.

-- Manually-curated team lineage edges. F1DB has constructor_chronology; this stays
-- as an editorial layer for the timeline UI to express things F1DB does not model.
-- start_year is part of the PK so multiple year-range entries for the same
-- (team, antecedent) pair can coexist. Example: alfa-romeo/sauber has both a
-- 1993-2005 (original Sauber → Sauber-Petronas) and a 2011-2018 (BMW Sauber
-- rebrand → Sauber → Alfa Romeo) lineage segment. start_year is NOT NULL
-- (default 0 sentinel for "unknown start") because it now anchors the PK.
CREATE TABLE IF NOT EXISTS app.team_history (
  team_id            varchar(100) NOT NULL,
  antecedent_team_id varchar(100) NOT NULL,
  start_year         int          NOT NULL DEFAULT 0,
  end_year           int,
  PRIMARY KEY (team_id, antecedent_team_id, start_year)
);

INSERT INTO app.ingest_state (key, value)
VALUES ('last_release_tag', 'v2026.3.0')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();
