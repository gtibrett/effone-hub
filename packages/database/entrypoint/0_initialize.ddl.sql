create table circuits
(
    "circuitId"  integer not null
        constraint circuits_pk
            primary key,
    "circuitRef" varchar(255)
        constraint circuits_ref
            unique,
    name         varchar(255),
    location     varchar(255),
    country      varchar(255),
    lat          real,
    lng          real,
    alt          integer,
    url          varchar(255)
        constraint circuits_url
            unique
);

create table "circuitDescriptions"
(
    "circuitId" integer not null
        constraint circuitdescriptions_pk
            primary key
        constraint circuitdescriptions_circuits_circuitid_fk
            references circuits
            on delete cascade
            deferrable initially deferred,
    description text
);

create table teams
(
    "teamId"         integer not null
        constraint constructors_pk
            primary key,
    "constructorRef" varchar(255)
        constraint constructors_ref
            unique,
    name             varchar(255),
    nationality      varchar(255),
    url              varchar(255)
);

create table seasons
(
    year integer not null
        constraint seasons_pk
            primary key,
    url  varchar(255)
        constraint seasons_url
            unique
);

create table races
(
    "raceId"    integer not null
        constraint races_pk
            primary key,
    year        integer
        constraint races_seasons_year_fk
            references seasons,
    round       integer,
    "circuitId" integer
        constraint "races_circuits_circuitId_fk"
            references circuits,
    name        varchar(255),
    date        date,
    time        varchar(8),
    url         varchar(255),
    fp1_date    date,
    fp1_time    varchar(8),
    fp2_date    date,
    fp2_time    varchar(8),
    fp3_date    date,
    fp3_time    varchar(8),
    quali_date  date,
    quali_time  varchar(8),
    sprint_date date,
    sprint_time varchar(8),
    constraint races_year_round
        unique (year, round)
);

create unique index races_year_round_idx
    on races (year, round);

create index "races_circuitId_index"
    on races ("circuitId");

create table status
(
    "statusId" integer not null
        constraint status_pk
            primary key,
    status     varchar(255)
);

create table "teamResults"
(
    "constructorResultsId" integer not null
        constraint constructorresults_pk
            primary key,
    "raceId"               integer
        constraint constructorresults_races_raceid_fk
            references races,
    "teamId"               integer
        constraint constructorresults_constructors_constructorid_fk
            references teams,
    points                 real,
    status                 varchar(255)
);

create table "teamStandings"
(
    "constructorStandingsId" integer not null
        constraint constructorstandings_pk
            primary key,
    "raceId"                 integer
        constraint constructorstandings_races_raceid_fk
            references races,
    "teamId"                 integer
        constraint constructorstandings_constructors_constructorid_fk
            references teams,
    points                   real,
    position                 integer,
    "positionText"           varchar(255),
    wins                     integer
);

create table drivers
(
    "driverId"  integer      not null
        constraint drivers_pk
            primary key,
    "driverRef" varchar(255) not null
        constraint drivers_ref
            unique,
    number      integer,
    code        varchar(3),
    forename    varchar(255),
    surname     varchar(255),
    dob         date,
    nationality varchar(255),
    url         varchar(255)
        constraint drivers_url
            unique
);

create table "driverStandings"
(
    "driverStandingsId" integer not null
        constraint driverstandings_pk
            primary key,
    "raceId"            integer
        constraint driverstandings_races_raceid_fk
            references races
            on delete cascade,
    "driverId"          integer
        constraint driverstandings_drivers_driverid_fk
            references drivers
            on delete cascade,
    points              real,
    position            integer,
    "positionText"      varchar(255),
    wins                integer
);

create table "lapTimes"
(
    "raceId"     integer not null
        constraint laptimes_races_raceid_fk
            references races,
    "driverId"   integer not null
        constraint laptimes_drivers_driverid_fk
            references drivers,
    lap          integer not null,
    position     integer,
    time         varchar(255),
    milliseconds integer,
    constraint laptimes_pk
        primary key ("raceId", "driverId", lap)
);

create index laptimes_raceid_driverid_index
    on "lapTimes" ("raceId", "driverId");

create table "pitStops"
(
    "raceId"     integer not null
        constraint pitstops_races_raceid_fk
            references races,
    "driverId"   integer not null
        constraint pitstops_drivers_driverid_fk
            references drivers,
    stop         integer not null,
    lap          integer,
    time         varchar(8),
    duration     varchar(255),
    milliseconds integer,
    constraint pitstops_pk
        primary key ("raceId", "driverId", stop)
);

create index pitstops_raceid_driverid_index
    on "pitStops" ("raceId", "driverId");

create table qualifying
(
    "qualifyId" integer not null
        constraint qualifying_pk
            primary key,
    "raceId"    integer
        constraint qualifying_races_raceid_fk
            references races,
    "driverId"  integer
        constraint qualifying_drivers_driverid_fk
            references drivers,
    "teamId"    integer
        constraint qualifying_constructors_constructorid_fk
            references teams,
    number      integer,
    position    integer,
    q1          varchar(255),
    q2          varchar(255),
    q3          varchar(255)
);

create index qualifying_raceid_driverid_index
    on qualifying ("raceId", "driverId");

create table results
(
    "resultId"        integer not null
        constraint results_pk
            primary key,
    "raceId"          integer
        constraint results_races_raceid_fk
            references races,
    "driverId"        integer
        constraint results_drivers_driverid_fk
            references drivers,
    "teamId"          integer
        constraint results_constructors_constructorid_fk
            references teams,
    number            integer,
    grid              integer,
    position          integer,
    "positionText"    varchar(255),
    "positionOrder"   integer,
    points            real,
    laps              integer,
    time              varchar(255),
    milliseconds      integer,
    "fastestLap"      integer,
    rank              integer,
    "fastestLapTime"  varchar(255),
    "fastestLapSpeed" varchar(255),
    "statusId"        integer
        constraint results_status_statusid_fk
            references status
);

create index results_raceid_driverid_index
    on results ("raceId", "driverId");

create table "sprintResults"
(
    "sprintResultId" integer not null
        constraint sprintresults_pk
            primary key,
    "raceId"         integer
        constraint sprintresults_races_raceid_fk
            references races,
    "driverId"       integer
        constraint sprintresults_drivers_driverid_fk
            references drivers,
    "teamId"         integer
        constraint sprintresults_constructors_constructorid_fk
            references teams,
    number           integer,
    grid             integer,
    position         integer,
    "positionText"   varchar(255),
    "positionOrder"  integer,
    points           real,
    laps             integer,
    time             varchar(255),
    milliseconds     integer,
    "fastestLap"     integer,
    "fastestLapTime" varchar(255),
    "statusId"       integer
        constraint sprintresults_status_statusid_fk
            references status
);

create index sprintresults_raceid_driverid_index
    on "sprintResults" ("raceId", "driverId");

create table "teamColors"
(
    "teamId"  integer not null
        constraint "teamColors_pk"
            primary key
        constraint "teamColors_teams_teamId_fk"
            references teams,
    "primary" varchar(7),
    secondary varchar(7),
    logo      text
);

comment on constraint "teamColors_teams_teamId_fk" on "teamColors" is '@foreignFieldName colors';

create table "teamHistory"
(
    "teamId"           integer not null
        constraint "teamHistory_teams_teamId_fk"
            references teams,
    "antecedentTeamId" integer not null
        constraint "teamHistory_teams_teamId_fk2"
            references teams,
    "startYear"        integer not null,
    "endYear"          integer,
    constraint "teamHistory_pk"
        primary key ("teamId", "antecedentTeamId", "startYear")
);

DROP MATERIALIZED VIEW IF EXISTS "finalTeamStandingsByYear";
create materialized view "finalTeamStandingsByYear" as
WITH "finalStandingsByYear" AS (SELECT ds."constructorStandingsId",
                                       ds."raceId",
                                       ds."teamId",
                                       ds.points,
                                       ds."position",
                                       ds."positionText",
                                       ds.wins,
                                       r.year
                                FROM "teamStandings" ds
                                         LEFT JOIN races r ON r."raceId" = ds."raceId"
                                WHERE (ds."raceId" IN (SELECT max(ir."raceId") AS max
                                                       FROM "teamStandings" ts
                                                                LEFT JOIN races ir ON ts."raceId" = ir."raceId"
                                                       GROUP BY ir.year)))
SELECT "finalStandingsByYear"."constructorStandingsId",
       "finalStandingsByYear"."raceId",
       "finalStandingsByYear"."teamId",
       "finalStandingsByYear".points,
       "finalStandingsByYear"."position",
       "finalStandingsByYear"."positionText",
       "finalStandingsByYear".wins,
       "finalStandingsByYear".year
FROM "finalStandingsByYear";

DROP MATERIALIZED VIEW IF EXISTS "driverStandingsBySeason";
create materialized view "driverStandingsBySeason" as
SELECT ds."driverStandingsId",
       ds."raceId",
       ds."driverId",
       ds.points,
       ds."position",
       ds."positionText",
       ds.wins,
       r.year
FROM "driverStandings" ds
         LEFT JOIN races r ON r."raceId" = ds."raceId"
WHERE (ds."raceId" IN (SELECT max(ir."raceId") AS max
                       FROM "driverStandings" ids
                                LEFT JOIN races ir ON ir."raceId" = ids."raceId"
                       GROUP BY ir.year))
ORDER BY r.year DESC;

DROP MATERIALIZED VIEW IF EXISTS "nextRaceBySeason";
create materialized view "nextRaceBySeason" as
SELECT fr.year,
       min(fr."raceId") AS "raceId"
FROM (SELECT r.year,
             r."raceId"
      FROM races r
               LEFT JOIN results res ON r."raceId" = res."raceId"
      GROUP BY r.year, r."raceId"
      HAVING max(res."raceId") IS NULL) fr
GROUP BY fr.year;

DROP MATERIALIZED VIEW IF EXISTS "driverTeams";
create materialized view "driverTeams" as
SELECT DISTINCT ON (r.year, rs."driverId") rs."driverId",
                                           rs."teamId",
                                           r.year
FROM results rs
         LEFT JOIN races r ON r."raceId" = rs."raceId"
ORDER BY r.year DESC, rs."driverId", r."raceId" DESC;

DROP MATERIALIZED VIEW IF EXISTS "driverCurrentTeam";
create materialized view "driverCurrentTeam" as
SELECT DISTINCT ON (rs."driverId") rs."driverId",
                                   rs."teamId",
                                   r.year
FROM results rs
         LEFT JOIN races r ON r."raceId" = rs."raceId"
ORDER BY rs."driverId", r.year DESC, r."raceId" DESC;

DROP MATERIALIZED VIEW IF EXISTS "lapTimesWithStart";
create materialized view "lapTimesWithStart" as
SELECT "lapTimes"."raceId",
       "lapTimes"."driverId",
       "lapTimes".lap,
       "lapTimes"."position",
       "lapTimes"."time",
       "lapTimes".milliseconds
FROM "lapTimes"
UNION
SELECT qualifying."raceId",
       qualifying."driverId",
       0                       AS lap,
       qualifying."position",
       NULL::character varying AS "time",
       NULL::integer           AS milliseconds
FROM qualifying;

DROP materialized view "seasonsStatus" IF EXISTS;
create materialized view "seasonsStatus" as
SELECT u.year,
       sum(u.races) = sum(u.races_with_results) AS ended,
       sum(u.races_with_results) > 0::numeric   AS has_results
FROM (SELECT r.year,
             count(r."raceId") AS races,
             0                 AS races_with_results
      FROM races r
      GROUP BY r.year
      UNION
      SELECT rwr.year,
             0                   AS races,
             count(rwr."raceId") AS count
      FROM (SELECT r.year,
                   r."raceId",
                   count(rs."raceId") > 0 AS race_with_results
            FROM races r
                     LEFT JOIN results rs ON r."raceId" = rs."raceId"
            GROUP BY r.year, r."raceId") rwr
      WHERE rwr.race_with_results IS TRUE
      GROUP BY rwr.year) u
GROUP BY u.year;

create or replace function seasons_has_results(s seasons) returns boolean
    stable
    language plpgsql
as
$$
declare
    has_results boolean;
begin
    select ss.has_results
    into has_results
    from "seasonsStatus" ss
    where ss.year= s.year;

    return has_results;
end;
$$;

create or replace function seasons_ended(s seasons) returns boolean
    stable
    language plpgsql
as
$$
declare
    ended boolean;
begin
    select ss.ended
    into ended
    from "seasonsStatus" ss
    where ss.year= s.year;

    return ended;
end;
$$;