-- Seed: 2025 F1 grid team brand colors
-- Source: Official team liveries / brand guidelines for the 2024-2025 seasons.
-- team_id slugs match f1db.team.id as verified against season_entrant_team for year=2025.
-- logo column left NULL; can be populated separately with CDN URLs.

INSERT INTO app.team_colors (team_id, primary_hex, secondary_hex, logo) VALUES
  -- Red Bull Racing: navy blue + red (RB20 livery)
  ('red-bull',      '#1E41FF', '#CC1E4A', NULL),
  -- Scuderia Ferrari: rosso corsa red + yellow (SF-25)
  ('ferrari',       '#E8002D', '#FFCC00', NULL),
  -- McLaren: papaya orange + black (MCL39)
  ('mclaren',       '#FF8000', '#000000', NULL),
  -- Mercedes-AMG Petronas: silver + teal (W16)
  ('mercedes',      '#27F4D2', '#C0C0C0', NULL),
  -- Aston Martin Aramco: British racing green + lime (AMR25)
  ('aston-martin',  '#006F62', '#A8CF45', NULL),
  -- Alpine: electric blue + pink (A525)
  ('alpine',        '#0093CC', '#FF87BC', NULL),
  -- Williams Racing: azure blue + navy (FW47)
  ('williams',      '#00A3E0', '#041E42', NULL),
  -- Visa Cash App RB (Racing Bulls): white + dark navy (VCARB 02)
  ('racing-bulls',  '#1B3A6B', '#FFFFFF', NULL),
  -- Kick Sauber (Audi entry from 2026; 2025 as Kick Sauber): dark green + black
  ('kick-sauber',   '#00E701', '#000000', NULL),
  -- MoneyGram Haas: white + red (VF-25)
  ('haas',          '#FFFFFF', '#E8002D', NULL)
ON CONFLICT (team_id) DO UPDATE
  SET primary_hex   = EXCLUDED.primary_hex,
      secondary_hex = EXCLUDED.secondary_hex,
      logo          = COALESCE(EXCLUDED.logo, app.team_colors.logo);
