-- One-time seed of app.* tables from the existing effonehub.* tables.
-- Maps Ergast-era integer surrogate keys + camelCase slugs to F1DB string ids.
--
-- Prerequisites:
--   - effonehub schema is intact (the existing Ergast snapshot)
--   - f1db schema has been populated (a fresh F1DB dump is loaded)
--   - app schema exists (run 2026_app_schema.sql first)
--
-- Idempotent: ON CONFLICT DO NOTHING. Run again safely if F1DB ids change.

begin;

-- ---------------------------------------------------------------------------
-- Crosswalk: effonehub.circuits.circuitRef -> f1db.circuit.id
-- ---------------------------------------------------------------------------
-- Resolution priority for each circuitRef:
--   1. exact match against f1db.circuit.id
--   2. underscore -> dash normalization
--   3. manual override below
create temporary table _circuit_xwalk (eff_ref text primary key, f1db_id text) on commit drop;

insert into _circuit_xwalk (eff_ref, f1db_id) values
  ('albert_park',   'melbourne'),
  ('americas',      'austin'),
  ('boavista',      'porto'),
  ('charade',       'clermont-ferrand'),
  ('essarts',       'rouen'),
  ('galvez',        'buenos-aires'),
  ('george',        'east-london'),
  ('losail',        'lusail'),
  ('okayama',       'aida'),
  ('red_bull_ring', 'spielberg'),
  ('ricard',        'paul-ricard'),
  ('rodriguez',     'mexico-city'),
  ('spa',           'spa-francorchamps'),
  ('tremblant',     'mont-tremblant'),
  ('vegas',         'las-vegas'),
  ('villeneuve',    'montreal');
-- 'lemans' has no F1DB equivalent (Le Mans hasn't hosted F1 since 1967 and
-- F1DB does not include it). Its description, if any, is dropped.

insert into _circuit_xwalk (eff_ref, f1db_id)
select c."circuitRef",
       coalesce(
           (select id from f1db.circuit where id = c."circuitRef"),
           (select id from f1db.circuit where id = replace(c."circuitRef", '_', '-'))
       )
from effonehub.circuits c
where c."circuitRef" not in (select eff_ref from _circuit_xwalk)
on conflict (eff_ref) do nothing;

insert into app.circuit_descriptions (circuit_id, description)
select distinct on (x.f1db_id)
       x.f1db_id, cd.description
from effonehub."circuitDescriptions" cd
join effonehub.circuits c on c."circuitId" = cd."circuitId"
join _circuit_xwalk x on x.eff_ref = c."circuitRef"
where x.f1db_id is not null
  and cd.description is not null
order by x.f1db_id, cd."circuitId" desc
on conflict (circuit_id) do nothing;

-- ---------------------------------------------------------------------------
-- Crosswalk: effonehub.teams.constructorRef -> f1db.constructor.id
-- ---------------------------------------------------------------------------
create temporary table _constructor_xwalk (eff_ref text primary key, f1db_id text) on commit drop;

insert into _constructor_xwalk (eff_ref, f1db_id) values
  ('alfa',       'alfa-romeo'),
  ('mf1',        'midland'),
  ('spyker_mf1', 'spyker');

insert into _constructor_xwalk (eff_ref, f1db_id)
select t."constructorRef",
       coalesce(
           (select id from f1db.constructor where id = t."constructorRef"),
           (select id from f1db.constructor where id = replace(t."constructorRef", '_', '-'))
       )
from effonehub.teams t
where t."constructorRef" not in (select eff_ref from _constructor_xwalk)
on conflict (eff_ref) do nothing;

insert into app.team_colors (constructor_id, primary_hex, secondary_hex, logo)
select distinct on (x.f1db_id)
       x.f1db_id,
       nullif(tc."primary",   ''),
       nullif(tc."secondary", ''),
       nullif(tc.logo,         '')
from effonehub."teamColors" tc
join effonehub.teams t on t."teamId" = tc."teamId"
join _constructor_xwalk x on x.eff_ref = t."constructorRef"
where x.f1db_id is not null
order by x.f1db_id, t."teamId" desc  -- prefer most-recent effonehub row when multiple collapse
on conflict (constructor_id) do nothing;

insert into app.team_history (constructor_id, antecedent_constructor_id, start_year, end_year)
select distinct on (x1.f1db_id, x2.f1db_id)
       x1.f1db_id, x2.f1db_id, th."startYear", th."endYear"
from effonehub."teamHistory" th
join effonehub.teams t1 on t1."teamId" = th."teamId"
join effonehub.teams t2 on t2."teamId" = th."antecedentTeamId"
join _constructor_xwalk x1 on x1.eff_ref = t1."constructorRef"
join _constructor_xwalk x2 on x2.eff_ref = t2."constructorRef"
where x1.f1db_id is not null and x2.f1db_id is not null
order by x1.f1db_id, x2.f1db_id, th."startYear"
on conflict (constructor_id, antecedent_constructor_id) do nothing;

commit;
