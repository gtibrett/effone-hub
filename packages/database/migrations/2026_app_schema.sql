-- App schema: data we own and persist across F1DB ingest cycles.
-- The f1db schema is replaced atomically by the ingest function; nothing here
-- is touched by that swap.
--
-- All identifiers in this schema are snake_case to match the F1DB convention
-- so PostGraphile produces consistent GraphQL field naming.

create schema if not exists app;

create table if not exists app.ingest_state
(
    key        text        not null primary key,
    value      text,
    updated_at timestamptz not null default now()
);

-- Per-driver per-lap timing data sourced from Jolpica's /laps endpoint.
-- F1DB does not include lap-by-lap timing.
create table if not exists app.lap_times
(
    race_id      int          not null,
    driver_id    varchar(100) not null,
    lap          int          not null,
    position     int,
    time         varchar(20),
    time_millis  int,
    primary key (race_id, driver_id, lap)
);

create index if not exists lap_times_race_id_idx   on app.lap_times (race_id);
create index if not exists lap_times_driver_id_idx on app.lap_times (driver_id);

-- AI-generated long-form circuit descriptions. Migrated from effonehub.circuitDescriptions.
create table if not exists app.circuit_descriptions
(
    circuit_id  varchar(100) not null primary key,
    description text         not null
);

-- Team livery / branding. Migrated from effonehub.teamColors.
create table if not exists app.team_colors
(
    constructor_id varchar(100) not null primary key,
    primary_hex    varchar(7),
    secondary_hex  varchar(7),
    logo           text
);

-- Manual constructor lineage (mergers, name changes) on top of F1DB's
-- constructor_chronology. Migrated from effonehub.teamHistory.
create table if not exists app.team_history
(
    constructor_id            varchar(100) not null,
    antecedent_constructor_id varchar(100) not null,
    start_year                int,
    end_year                  int,
    primary key (constructor_id, antecedent_constructor_id)
);
