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

-- Driver bios — OpenAI-generated description + Wikipedia title/extract.
-- 1:1 with f1db.driver. PK matches f1db.driver.id (varchar slug).
CREATE TABLE IF NOT EXISTS app.driver_bios (
  driver_id     varchar(100) PRIMARY KEY,
  description   text,
  title         text,
  extract       text,
  thumbnail_url text,
  source        text,
  updated_at    timestamptz NOT NULL DEFAULT now()
);

-- Constructor bios — same shape, 1:1 with f1db.constructor.
CREATE TABLE IF NOT EXISTS app.constructor_bios (
  team_id       varchar(100) PRIMARY KEY,
  description   text,
  title         text,
  extract       text,
  thumbnail_url text,
  source        text,
  updated_at    timestamptz NOT NULL DEFAULT now()
);

-- Manually-curated team lineage edges. F1DB has constructor_chronology; this stays
-- as an editorial layer for the timeline UI to express things F1DB does not model.
CREATE TABLE IF NOT EXISTS app.team_history (
  team_id            varchar(100) NOT NULL,
  antecedent_team_id varchar(100) NOT NULL,
  start_year         int,
  end_year           int,
  PRIMARY KEY (team_id, antecedent_team_id)
);

INSERT INTO app.ingest_state (key, value)
VALUES ('last_release_tag', 'v2026.3.0')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();
