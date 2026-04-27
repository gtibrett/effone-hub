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

-- Computed columns for f1db.season: PostGraphile auto-exposes functions named
-- `app.<table>_<column>(t <schema>.<table>)` as fields on the corresponding
-- GraphQL type. These two are dropped by the f1db schema swap (DROP SCHEMA
-- CASCADE), so the ingest function recreates them via this same script after
-- each swap.
create or replace function app.season_ended(s f1db.season) returns boolean
    stable language sql as $$
    with c as (
        select count(*) as total,
               count(*) filter (where exists (
                   select 1 from f1db.race_result rr where rr.race_id = r.id
               )) as with_results
        from f1db.race r
        where r.year = s.year
    )
    select total > 0 and total = with_results from c;
$$;

create or replace function app.season_has_results(s f1db.season) returns boolean
    stable language sql as $$
    select exists (
        select 1
        from f1db.race r
        join f1db.race_result rr on rr.race_id = r.id
        where r.year = s.year
    );
$$;
