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
