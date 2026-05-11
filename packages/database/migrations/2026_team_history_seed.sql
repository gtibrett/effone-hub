-- Team history (lineage) seed — translated from effonehub Ergast-era integer IDs
-- to F1DB slug-form team_ids.
--
-- Source: packages/database/seeds-archived/teamsHistory.legacy.sql
-- Int->slug crosswalk derived from:
--   • comments in the legacy file (-- alfa, -- aston_martin, etc.)
--   • known F1 constructor lineage per each year range
--   • manual override list in 2026_app_seed_from_effonehub.sql (_constructor_xwalk)
--   • F1DB team IDs as loaded in f1db.team
--
-- Integer ID reference (effonehub teamId → constructorRef → f1db slug):
--   2   bmw_sauber    → bmw-sauber
--   4   renault       → renault
--   5   red_bull      → red-bull  (used as toro_rosso antecedent context, but this is toro-rosso range)
--       NOTE: effonehub teamId 5 in (213,5,2006-2019) context = toro_rosso → toro-rosso
--   9   mclaren       → mclaren
--   10  force_india   → force-india
--   11  honda         → honda
--   12  spyker        → spyker
--   13  mf1           → midland   (per override: mf1→midland)
--   14  spyker_mf1    → spyker    (per override: spyker_mf1→spyker; collapses to same slug as 12)
--   15  sauber        → sauber
--   16  bar           → bar
--   17  jordan        → jordan
--   18  minardi       → minardi
--   19  UNKNOWN — effonehub internal id with no recoverable constructorRef (mclaren context 2000-2004)
--   22  benetton      → benetton
--   23  brawn         → brawn
--   24  UNKNOWN — effonehub internal id with no recoverable constructorRef (mclaren context 1997-1999)
--   25  tyrrell       → tyrrell
--   51  alfa          → alfa-romeo (per comment)
--   53  toleman       → toleman
--   117 aston_martin  → aston-martin (per comment)
--   131 mercedes      → mercedes (per comment)
--   205 lotus_f1      → lotus-f1
--   211 racing_point  → racing-point
--   213 alphatauri    → alphatauri (per comment)
--   214 alpine        → alpine (per comment)
--
-- Idempotent: ON CONFLICT (team_id, antecedent_team_id, start_year) DO NOTHING.
-- start_year is part of the PK (see app_schema.sql), so two rows that share
-- (team_id, antecedent_team_id) but differ in year-range now both insert.
-- This restores alfa-romeo/sauber 2011-2018 and alpine/renault 2016-2020 which
-- were previously dropped by the old PK collision.

INSERT INTO app.team_history (team_id, antecedent_team_id, start_year, end_year) VALUES

-- mclaren (9) lineage
-- skipped: int 19 and int 24 (unknown effonehub-internal constructorRef; no recoverable F1DB slug)
-- (9, 24, 1997, 1999) → skipped: int 24 (unknown constructorRef, mclaren era 1997-1999)
-- (9, 19, 2000, 2004) → skipped: int 19 (unknown constructorRef, mclaren era 2000-2004)

-- alfa romeo (51) lineage: sauber 1993-2005, bmw_sauber 2006-2010, sauber 2011-2018
('alfa-romeo', 'sauber',    1993, 2005),
('alfa-romeo', 'bmw-sauber', 2006, 2010),
('alfa-romeo', 'sauber',    2011, 2018),
-- Both alfa-romeo/sauber rows now coexist (PK includes start_year).

-- aston martin (117) lineage
('aston-martin', 'jordan',     1991, 2005),
('aston-martin', 'midland',    2006, 2006),
('aston-martin', 'spyker',     2006, 2006),
-- (117, 12, 2007, 2007): int 12 = spyker → same PK as above; ON CONFLICT DO NOTHING
-- skipped duplicate: int 12 (spyker 2007-2007) collapses to (aston-martin, spyker) already inserted
('aston-martin', 'force-india', 2008, 2018),
('aston-martin', 'racing-point', 2019, 2020),

-- mercedes (131) lineage: tyrrell 1970-1998, BAR 1999-2005, Honda 2006-2008, Brawn 2009
('mercedes', 'tyrrell', 1970, 1998),
('mercedes', 'bar',     1999, 2005),
('mercedes', 'honda',   2006, 2008),
('mercedes', 'brawn',   2009, 2009),

-- alphatauri (213) lineage: minardi 1985-2005, toro-rosso 2006-2019
('alphatauri', 'minardi',   1985, 2005),
('alphatauri', 'toro-rosso', 2006, 2019),

-- alpine (214) lineage: toleman 1981-1985, benetton 1986-2001, renault 2002-2011,
-- lotus-f1 2012-2015, renault 2016-2020
('alpine', 'toleman',  1981, 1985),
('alpine', 'benetton', 1986, 2001),
('alpine', 'renault',  2002, 2011),
('alpine', 'lotus-f1', 2012, 2015),
('alpine', 'renault',  2016, 2020)
-- Both alpine/renault rows now coexist (PK includes start_year).

ON CONFLICT (team_id, antecedent_team_id, start_year) DO NOTHING;
