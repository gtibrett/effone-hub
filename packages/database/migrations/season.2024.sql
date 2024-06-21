alter table "teamColors" add logo text;

drop materialized view "driverYears";

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

create function seasons_has_results(s seasons) returns boolean
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

create function seasons_ended(s seasons) returns boolean
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