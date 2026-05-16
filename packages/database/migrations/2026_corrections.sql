-- Corrective patches that run AFTER the base seed migrations.
--
-- Use this file for one-off fixes to legacy seed content (AI hallucinations,
-- known mismatches). Each statement should be idempotent so repeated init.sh
-- runs don't error.

-- east-london (Prince George Circuit) — original OpenAI-generated description
-- placed it in "Northern British Columbia, Canada". The real Prince George
-- Circuit is in East London, South Africa. Replace with factual prose.
UPDATE app.circuit_descriptions
SET description = E'The Prince George Circuit is a 3.92 km road circuit in East London, South Africa, on the Indian Ocean coast. It hosted the South African Grand Prix on three occasions: 1934 (when it was a 24.18 km layout that included public roads), 1962, and 1963. The 1962 race was the first World Championship Formula One round held there and remains famous for Graham Hill''s late retirement that handed Jim Clark and the title to him in the closing laps. After the 1963 race the South African Grand Prix moved to Kyalami and the Prince George Circuit was never used again at the top level.',
    updated_at  = now()
WHERE circuit_id = 'east-london';


-- kick-sauber 2026 livery — green/black was 2024-2025 Stake F1 Team. From
-- 2026 the team becomes the Audi works entry; teaser livery is red + black
-- with a thin white accent.
UPDATE app.team_colors
SET primary_hex   = '#E40521',
    secondary_hex = '#000000'
WHERE team_id = 'kick-sauber';


-- app.team_history PK migration: original PK was (team_id, antecedent_team_id),
-- which collapsed multi-segment lineages (e.g. alfa-romeo/sauber 1993-2005 and
-- 2011-2018). New PK is (team_id, antecedent_team_id, start_year). Because
-- app_schema.sql uses CREATE TABLE IF NOT EXISTS, an existing DB needs this
-- ALTER to pick up the new shape. Idempotent: only runs if the current PK
-- still matches the old 2-column shape.
DO $$
DECLARE
  v_pk_name text;
  v_pk_cols text;
BEGIN
  SELECT con.conname,
         string_agg(att.attname, ',' ORDER BY array_position(con.conkey, att.attnum))
    INTO v_pk_name, v_pk_cols
    FROM pg_constraint con
    JOIN pg_class       cls ON cls.oid = con.conrelid
    JOIN pg_namespace   nsp ON nsp.oid = cls.relnamespace
    JOIN pg_attribute   att ON att.attrelid = cls.oid AND att.attnum = ANY(con.conkey)
   WHERE nsp.nspname = 'app'
     AND cls.relname = 'team_history'
     AND con.contype = 'p'
   GROUP BY con.conname;

  IF v_pk_cols = 'team_id,antecedent_team_id' THEN
    -- Make start_year non-null first (it's about to anchor the PK).
    UPDATE app.team_history SET start_year = 0 WHERE start_year IS NULL;
    ALTER TABLE app.team_history ALTER COLUMN start_year SET NOT NULL;
    ALTER TABLE app.team_history ALTER COLUMN start_year SET DEFAULT 0;
    EXECUTE format('ALTER TABLE app.team_history DROP CONSTRAINT %I', v_pk_name);
    ALTER TABLE app.team_history
      ADD PRIMARY KEY (team_id, antecedent_team_id, start_year);
  END IF;
END $$;

-- Re-seed the rows that the old PK collision dropped. Now that start_year is
-- part of the PK these inserts succeed even if the original 2-col rows exist.
INSERT INTO app.team_history (team_id, antecedent_team_id, start_year, end_year) VALUES
  ('alfa-romeo', 'sauber',  2011, 2018),
  ('alpine',     'renault', 2016, 2020)
ON CONFLICT (team_id, antecedent_team_id, start_year) DO NOTHING;
