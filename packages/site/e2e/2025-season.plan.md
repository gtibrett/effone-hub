# effOne Hub — 2025 Season E2E Test Plan

## Application Overview

End-to-end test plan for the "effOne Hub" Formula 1 stats site (Next.js 16 App Router, React 19, fully SSR/prerendered; MUI v9 + MUI X Charts/Data Grid; Apollo only on the server). Base URL http://localhost:3000 (a dev server is already running; do NOT start one). GraphQL API runs on :4000 but is never contacted by the browser.

ENVIRONMENT UPDATE (2026-06-15): The original `@playwright/test` not-installed blocker is FIXED. The 2025 rosters in this plan were harvested live from the GraphQL API (the app's own generateStaticParams source) and spot-checked in a browser — see "Verified 2025 Roster" below. A residual config gap may still block the `playwright-test` MCP specifically (see "Runner setup" at the end); the specs run fine standalone. The original authoring note follows for history.

ENVIRONMENT BLOCKER (historical): The Playwright Test MCP used to author this plan could not start a browser — its bundled runtime ships `playwright` (1.60.0) but NOT `@playwright/test`, and the auto-generated seed (`/seed.spec.ts` at the worktree root) imports from `@playwright/test`, which resolves nowhere in this repo or the MCP sandbox. `planner_setup_page` therefore fails and every `browser_*` tool returns "Must setup test before interacting with the page". As a result the live 2025 ref lists and counts could NOT be harvested at authoring time, and selectors below were confirmed by reading the application source rather than a live DOM snapshot. FIX before execution: add `@playwright/test` to the runner (or change the seed import to `playwright/test`, which the bundled package does export) so setup succeeds. Once setup works, the data-driven groups harvest the full 2025 ref lists live in their first step — nothing is hardcoded.

KEY INVARIANTS asserted throughout:
1. ZERO client GraphQL: after any page load, browser_network_requests (filter '/graphql') returns no requests. Every page is server-rendered/cached.
2. Search/filter on the three LIST pages is CLIENT-SIDE over already-loaded rows (no network). Confirmed in source: useDriversList/useConstructorsList/useCircuitsList + filterByFreeformText (lowercased, space-split tokens, OR-substring match across specific row fields).
3. Driver and Circuit detail Tabs sync the active tab to ?tab= (urlParam='tab'); Constructor and Race Tabs do NOT pass urlParam, so they do NOT change the URL (differs from the brief's blanket statement).
4. The three list pages default their Season filter to the dynamic currentSeason (NOT 'Any'); to get the 2025 set explicitly, set the Season select to 2025.

2025 COVERAGE / counts: The full 2025 roster of drivers, constructors, and circuits is derived live (the same sources the app's generateStaticParams use): 2025 driver refs from the /2025 Driver Standings 'show full standings' dialog (podium Place links + DataGrid DriverByLine links), 2025 constructor refs from the /2025 Constructor Standings 'show full standings' dialog, and 2025 circuit refs from the /2025 Schedule (each race round -> race page -> /circuits/<ref>). Equivalent harvest: the /drivers, /constructors, /circuits list pages with Season=2025. Counts (N drivers / M constructors / C circuits) are intentionally NOT hardcoded — each data-driven group records them at runtime via its harvest step and the suite asserts every harvested ref. Sanity range only (do not assert): the 2025 F1 season has 10 constructors, ~24 circuits/rounds, and ~21-23 drivers who scored/started across the year.

Refs == URL slugs: driver/team/circuit `id` fields equal the `<ref>` path segment (DataGrid getRowId={r=>r.id}; circuit rows link href=`/circuits/${row.id}`; standings label clicks route to `/drivers/${driverId}` and `/constructors/${teamId}`).

## Verified 2025 Roster (harvested live 2026-06-15)

Source of truth: GraphQL API `season(year: 2025)` — the same fields the app's generateStaticParams use (`seasonDriverStandingsByYear.driverId`, `seasonTeamStandingsByYear.teamId`, `racesByYear.circuitId`). Refs == URL slugs; a sample of every entity type plus `/2025/1` and `/2025/24` returned HTTP 200. Use these as the concrete seed for the data-driven groups (§6–§8); keep the runtime-harvest step too so the suites self-update in later seasons.

HARVEST GOTCHA: the /2025 "show full standings" dialog and the three list pages use MUI Data Grid, which VIRTUALIZES rows — a DOM scrape returns only the visible subset (the driver dialog yielded 18 of 21). Harvest from the API/RSC payload, or scroll the grid to force all rows, before asserting the full set.

Drivers (21) — `/drivers/<ref>`:
lando-norris, max-verstappen, oscar-piastri, george-russell, charles-leclerc, lewis-hamilton, kimi-antonelli, alexander-albon, carlos-sainz-jr, fernando-alonso, nico-hulkenberg, isack-hadjar, oliver-bearman, liam-lawson, esteban-ocon, lance-stroll, yuki-tsunoda, pierre-gasly, gabriel-bortoleto, franco-colapinto, jack-doohan

Constructors (10) — `/constructors/<ref>`:
mclaren, mercedes, red-bull, ferrari, williams, racing-bulls, aston-martin, haas, kick-sauber, alpine

Circuits (24, one per round) — `/circuits/<ref>`:
melbourne, shanghai, suzuka, bahrain, jeddah, miami, imola, monaco, catalunya, montreal, spielberg, silverstone, spa-francorchamps, hungaroring, zandvoort, monza, baku, marina-bay, austin, mexico-city, interlagos, las-vegas, lusail, yas-marina

Live-confirmed corrections (browser, 2026-06-15): /2025 standings are ChartSwitchers + a "show full standings" dialog (#2 ✓); nav current-season label = "2026", the dynamic max year (#7 ✓); logo is an `<h1>` "EFFONEHUB" link (#9 ✓); /drivers Season filter defaults to "2026", not "Any" (#3 ✓). Remaining corrections (#1 constructor/race tabs have no urlParam, #4 nationality = country code, #5 circuit search = name+placeName, #6 OR/union tokens, #8 only current-season rounds prerendered) are verified from component source.

## Test Scenarios

### 1. Global SSR + No-GraphQL Invariant

**Seed:** `e2e/seed.spec.ts`

#### 1.1. Every primary route renders server-side with zero browser GraphQL

**File:** `e2e/ssr/no-client-graphql.spec.ts`

**Steps:**
  1. For each route in: '/', '/2025', '/2025/1', '/drivers', '/constructors', '/circuits', '/seasons', '/about' — navigate fresh (new page/context) and wait for the main content to render.
    - expect: Each page reaches load with visible primary content (no error boundary, no infinite skeleton).
    - expect: browser_network_requests filtered by '/graphql' returns an EMPTY list for every route (no client GraphQL).
    - expect: The document <title> matches the route (e.g. 'effOne Hub' for '/', 'Drivers | effOne Hub', 'About | effOne Hub', 'Past Seasons | effOne Hub').
  2. Inspect console messages at error level for each route.
    - expect: No uncaught errors; specifically no 'ChartsContainer has no width', no 'is not iterable'/scaleBand crash, no Apollo 'Cache data may be lost' warning.

### 2. Header Navigation + Skip Nav

**Seed:** `e2e/seed.spec.ts`

#### 2.1. Primary nav links route correctly from every page (desktop viewport)

**File:** `e2e/nav/header-links.spec.ts`

**Steps:**
  1. Set a desktop viewport (>= md, e.g. 1280px wide) so the inline nav links render (below md they collapse into the '#hamburger-button' menu). Navigate to '/'.
    - expect: Header <h1> 'EFFONEHUB' logo is visible and is a link to '/'.
    - expect: Inline nav shows links: the current-season number (dynamic, e.g. '2026'), 'Past Seasons', 'Circuits', 'Constructors', 'Drivers', 'About'.
  2. Read the current-season nav link's label text and remember it as CURRENT_SEASON (the app's dynamic max season; may be 2026 even though exhaustive coverage targets 2025).
    - expect: The first nav link's label is a 4-digit year.
  3. Click the current-season link.
    - expect: URL becomes '/<CURRENT_SEASON>'.
    - expect: Page heading shows '<CURRENT_SEASON> Season'.
  4. Click 'Past Seasons'.
    - expect: URL is '/seasons'; heading 'Past Seasons'.
  5. Click 'Circuits'.
    - expect: URL is '/circuits'; heading 'Circuits'.
  6. Click 'Constructors'.
    - expect: URL is '/constructors'; heading 'Constructors'.
  7. Click 'Drivers'.
    - expect: URL is '/drivers'; heading 'Drivers'.
  8. Click 'About'.
    - expect: URL is '/about'; heading 'About effOne Hub'.
  9. Click the 'EFFONEHUB' logo.
    - expect: URL returns to '/'.

#### 2.2. Skip navigation link moves focus to main content

**File:** `e2e/nav/skip-nav.spec.ts`

**Steps:**
  1. Navigate to '/'. Press Tab once from the top of the document to focus the first focusable element.
    - expect: A 'Skip navigation' link becomes visible when focused (it is sr-only until focused).
  2. Activate the focused 'Skip navigation' link (Enter).
    - expect: Focus moves to the <main> element (the MUI Container[component=main]); the page does not navigate away (href is '#', default prevented).

#### 2.3. Mobile hamburger menu exposes the same nav links

**File:** `e2e/nav/mobile-nav.spec.ts`

**Steps:**
  1. Set a mobile viewport (< md, e.g. 390px). Navigate to '/'. Click '#hamburger-button' (aria-label 'toggle navigation menu').
    - expect: A menu '#hamburger-menu' opens listing the same items: current season, 'Past Seasons', 'Circuits', 'Constructors', 'Drivers', 'About'.
  2. Click the 'Drivers' menu item.
    - expect: URL is '/drivers'; the menu closes.

### 3. Home Page

**Seed:** `e2e/seed.spec.ts`

#### 3.1. Home renders current-season standings + schedule with no client GraphQL

**File:** `e2e/home/home.spec.ts`

**Steps:**
  1. Navigate to '/'.
    - expect: A "Driver's Standings" section renders (ChartSwitcher title), with Position/Points toggle buttons and a 'show full standings' button.
    - expect: A "Constructor's Standings" section renders similarly.
    - expect: A 'Schedule' card renders (header 'Schedule') containing a Data Grid of races (Date / Race / Winner / Sprint Winner columns) and a race map.
    - expect: No '/graphql' network requests occurred.
  2. Toggle the Driver's Standings chart between 'Position' and 'Points'.
    - expect: The chart switches without console errors; only the active chart is mounted (no zero-width chart warning).

### 4. Season 2025 Page

**Seed:** `e2e/seed.spec.ts`

#### 4.1. /2025 renders Driver Standings, Constructor Standings, Schedule and links out

**File:** `e2e/season/season-2025.spec.ts`

**Steps:**
  1. Navigate to '/2025'.
    - expect: Heading '2025 Season'.
    - expect: "Driver's Standings" and "Constructor's Standings" ChartSwitchers render with Position/Points toggles and a champion subheader.
    - expect: A 'Schedule' card with a Data Grid of 2025 races renders.
    - expect: No '/graphql' requests occurred.
  2. Open the Driver Standings 'show full standings' dialog.
    - expect: A dialog titled '2025 Driver Standings' opens showing podium Places (P1-P3) plus a Data Grid of the remaining drivers, each rendered via a DriverByLine link.
    - expect: Every driver entry links to '/drivers/<ref>'.
  3. From the dialog, click one driver link (e.g. the P1 driver).
    - expect: Navigates to that '/drivers/<ref>' detail page (name header visible).
  4. Go back to '/2025'. Open the Constructor Standings 'show full standings' dialog and click one team link.
    - expect: Dialog titled '2025 Constructor Standings' lists teams as links; clicking one navigates to '/constructors/<ref>'.
  5. Back on '/2025', in the Schedule grid click the round-1 race link (Race column).
    - expect: Navigates to '/2025/1#<raceName>' (the race detail page).

### 5. Race Pages

**Seed:** `e2e/seed.spec.ts`

#### 5.1. Race detail renders results (drivers + teams) for several rounds

**File:** `e2e/race/race-rounds.spec.ts`

**Steps:**
  1. For round in [1, 2, 5] navigate to '/2025/<round>'. (Note: only the CURRENT season's rounds are prerendered via generateStaticParams; 2025 rounds still render dynamically. If CURRENT_SEASON != 2025 and a 2025 round 404s, substitute the same rounds under '/<CURRENT_SEASON>/<round>'.)
    - expect: Page title equals the race officialName; subheader reads 'Round <round>, <date>'.
    - expect: When results exist, a Tabs bar shows 'Race', optionally 'Sprint', 'Qualifying', 'Laps', 'Pit Stops', 'Circuit'.
    - expect: The default 'Race' tab shows a results Data Grid listing driver names AND constructor/team names.
    - expect: No '/graphql' requests occurred.
  2. Open the 'Circuit' tab on one round.
    - expect: A card shows a circuit title linking to '/circuits/<circuitRef>' and a race map; clicking the title navigates to that circuit page.
  3. If a 'Sprint' tab is present on a sprint round, open it.
    - expect: Sprint results render; on non-sprint rounds the 'Sprint' tab is absent.

### 6. Drivers — Data-Driven over ALL 2025 drivers

**Seed:** `e2e/seed.spec.ts`

#### 6.1. Harvest the full 2025 driver ref list

**File:** `e2e/drivers/harvest-2025-drivers.spec.ts`

**Steps:**
  1. Navigate to '/2025'. Open the Driver Standings 'show full standings' dialog. Collect every '/drivers/<ref>' href (podium Place links + the DataGrid DriverByLine links). Alternatively navigate to '/drivers', set the Season select (#drivers-season-filter) to 2025, submit, and collect every '/drivers/<ref>' link in the grid. De-duplicate.
    - expect: A non-empty list of unique driver refs is harvested.
    - expect: Record the COUNT (N drivers) — this is the parameter set for the templates below.
    - expect: For 2025 assert N == 21 (verified roster; refs listed in "Verified 2025 Roster").

#### 6.2. TEMPLATE (run per harvested 2025 driver ref): driver detail loads, tabs work, charts render

**File:** `e2e/drivers/driver-detail.template.spec.ts`

**Steps:**
  1. Navigate to '/drivers/<ref>'.
    - expect: Page renders an <h2> header containing the driver's first + last name (and, on >= md, abbreviation + permanent number).
    - expect: A Tabs bar shows 'Career' and 'Circuits', and (because these are 2025 drivers) a '2025 Season' tab.
    - expect: The 'Career' tab is active by default; URL has no ?tab yet or ?tab=career after first interaction.
    - expect: No '/graphql' requests occurred; no console errors.
  2. Assert the Career tab content.
    - expect: A stats summary renders (Appearances/Wins/Podiums/DNFs/In-Points style stats).
    - expect: A 'Career Timeline' chart card renders with a toggle group of 'Breakdown' (default), 'Position', 'Points', 'Wins'.
    - expect: A career results Data Grid renders with Season / Races / Position / Points / Constructor columns; Season cells are links to '/drivers/<ref>/seasons/<year>?tab=career'.
  3. Cycle the Career Timeline toggle through Position, Points, Wins, then back to Breakdown.
    - expect: Each selection swaps the chart with no console errors and no zero-width chart warning (only the active chart mounts).
  4. Click the 'Circuits' tab.
    - expect: URL updates to include '?tab=circuits'.
    - expect: Circuits tab content renders (a list/grid of circuits the driver raced).
  5. Click the '2025 Season' tab.
    - expect: URL updates to '?tab=season'.
    - expect: 2025 season content renders for the driver.
  6. Reload the page at the '?tab=season' URL.
    - expect: The '2025 Season' tab is the active tab after reload (URL param is the source of truth).

#### 6.3. Driver deep-link: season modal route renders (one representative driver)

**File:** `e2e/drivers/driver-season-dialog.spec.ts`

**Steps:**
  1. Pick one harvested 2025 driver ref. Navigate directly (hard load) to '/drivers/<ref>/seasons/2024?tab=career'.
    - expect: A modal/dialog renders titled '2024 Season' with the driver's name as subtitle; it shows that season's races.
    - expect: No '/graphql' requests occurred.
  2. Dismiss the dialog via its close (X) icon.
    - expect: On a hard load (no app history) the dialog closes by navigating to '/drivers/<ref>' (the underlying driver page).
  3. Now exercise interception: on '/drivers/<ref>' Career tab, click a Season cell link in the career grid.
    - expect: The season modal opens as an intercepting overlay ON TOP of the driver page (URL becomes '/drivers/<ref>/seasons/<year>...'), and closing it (X) pops back to the driver page.

#### 6.4. Driver deep-link: circuit modal route renders (one representative pair)

**File:** `e2e/drivers/driver-circuit-dialog.spec.ts`

**Steps:**
  1. Pick one harvested 2025 driver ref and one circuit ref that driver has raced (read a circuit link from that driver's 'Circuits' tab). Navigate directly (hard load) to '/drivers/<driverRef>/circuits/<circuitRef>'.
    - expect: A modal renders titled with the circuit fullName and the driver's name as subtitle; circuit-specific content (e.g. lap times) renders.
    - expect: No '/graphql' requests occurred.
  2. Close the dialog via its X icon.
    - expect: Closes to '/drivers/<driverRef>' on hard load.

### 7. Constructors — Data-Driven over ALL 2025 constructors

**Seed:** `e2e/seed.spec.ts`

#### 7.1. Harvest the full 2025 constructor ref list

**File:** `e2e/constructors/harvest-2025-constructors.spec.ts`

**Steps:**
  1. Navigate to '/2025'. Open the Constructor Standings 'show full standings' dialog and collect every '/constructors/<ref>' link. Alternatively navigate to '/constructors', set #constructors-season-filter to 2025, submit, and collect every '/constructors/<ref>' link in the grid. De-duplicate.
    - expect: A non-empty list of unique constructor refs is harvested.
    - expect: Record the COUNT (M constructors). For 2025 assert M == 10 (verified roster).

#### 7.2. TEMPLATE (run per harvested 2025 constructor ref): constructor detail loads, tabs + charts render

**File:** `e2e/constructors/constructor-detail.template.spec.ts`

**Steps:**
  1. Navigate to '/constructors/<ref>'.
    - expect: An <h2> header shows the team name (with a flag).
    - expect: A Tabs bar shows 'History', 'Drivers', and (for 2025 teams) a '2025 Season' tab; 'History' is active by default.
    - expect: A '2025 Season Stats' side card renders (Points / Podiums / Qualifying head-to-head) for current-season teams.
    - expect: No '/graphql' requests occurred; no console errors (history/season charts render cleanly).
  2. Click the 'Drivers' tab, then the '2025 Season' tab.
    - expect: Each tab's content renders without errors.
    - expect: NOTE: the constructor Tabs do NOT use a URL param, so the URL does NOT change when switching tabs (assert URL stays '/constructors/<ref>').

### 8. Circuits — Data-Driven over ALL 2025 circuits

**Seed:** `e2e/seed.spec.ts`

#### 8.1. Harvest the full 2025 circuit ref list

**File:** `e2e/circuits/harvest-2025-circuits.spec.ts`

**Steps:**
  1. Navigate to '/circuits', set #circuits-season-filter to 2025, submit, and collect every '/circuits/<ref>' link in the grid. Cross-check against the /2025 Schedule (each race round -> open '/2025/<round>' -> read the Circuit tab/title link '/circuits/<ref>'). De-duplicate the union.
    - expect: A non-empty list of unique circuit refs is harvested.
    - expect: Record the COUNT (C circuits). For 2025 assert C == 24 (verified roster).

#### 8.2. TEMPLATE (run per harvested 2025 circuit ref): circuit detail loads, tabs incl. track SVG

**File:** `e2e/circuits/circuit-detail.template.spec.ts`

**Steps:**
  1. Navigate to '/circuits/<ref>'.
    - expect: The page title/header shows the circuit fullName; subheader shows '<placeName>, <countryId>'.
    - expect: A Tabs bar shows 'History', 'Circuit Map', and '2025 Season'; 'History' is active by default.
    - expect: A side card titled '<year> Season' shows Lap Leader / Most Wins / Fastest Lap.
    - expect: No '/graphql' requests occurred; no console errors.
  2. Click the 'Circuit Map' tab.
    - expect: URL updates to '?tab=map' (circuit Tabs use urlParam='tab').
    - expect: The track SVG renders — an element with accessible name '<circuitName> Map' (image/svg role) plus disabled Sector 1/2/3 legend toggles.
  3. Click the '2025 Season' tab.
    - expect: URL updates to '?tab=season'; 2025 season content renders for the circuit.
  4. Reload at the '?tab=map' URL.
    - expect: The 'Circuit Map' tab is active after reload (URL param drives the active tab).

### 9. List Filters (client-side Search) — Drivers

**Seed:** `e2e/seed.spec.ts`

#### 9.1. Drivers list filter: name, nationality, season, no-match, clear (no network)

**File:** `e2e/filters/drivers-filter.spec.ts`

**Steps:**
  1. Navigate to '/drivers'. Record the initial grid row count (the page defaults the Season select #drivers-season-filter to the current season). Also harvest the 2025 driver surnames by setting #drivers-season-filter to 2025 and submitting via the magnifying-glass Search button.
    - expect: The grid shows the current-season drivers initially; after choosing 2025 the grid shows the 2025 set. Record COUNT_2025.
    - expect: No '/graphql' request fires on submit (client-side filter).
  2. With Season=2025, type a known 2025 driver surname (e.g. one harvested above) into #drivers-search-filter and submit (click the Search button or press Enter).
    - expect: The grid narrows to only rows whose first/last name contains the typed text (case-insensitive substring).
    - expect: Row count decreases to the matching subset (>= 1).
    - expect: No '/graphql' request fired.
  3. Clear #drivers-search-filter and submit.
    - expect: The grid restores to the full Season=2025 set (COUNT_2025).
  4. Type a nationality code into #drivers-nationality-filter and submit. IMPORTANT: this field matches the driver's nationalityCountryId (a country CODE like 'GB'/'NL'/'US'), NOT the display name; derive a valid code by reading the Nationality column of a known driver first.
    - expect: The grid narrows to drivers whose nationality code matches the substring.
    - expect: No '/graphql' request fired.
  5. Set #drivers-search-filter to a string that matches no driver (e.g. 'zzzzz') and submit.
    - expect: The grid shows zero rows (empty state / no matches).
  6. Clear the search, then change #drivers-season-filter to a different season (e.g. 2024) and submit.
    - expect: The visible driver set changes to that season's drivers (different membership than 2025).
    - expect: No '/graphql' request fired (season filtering is client-side over already-loaded all-time data).
  7. Set #drivers-season-filter to 'Any' and submit.
    - expect: The grid shows the full all-time driver list (largest set), confirming the 'Any' (value -1) option clears the season constraint.

### 10. List Filters (client-side Search) — Constructors

**Seed:** `e2e/seed.spec.ts`

#### 10.1. Constructors list filter: name, season, no-match, clear (no network)

**File:** `e2e/filters/constructors-filter.spec.ts`

**Steps:**
  1. Navigate to '/constructors'. Set #constructors-season-filter to 2025 and submit via the Search button. Record the 2025 row count and team names.
    - expect: The grid shows the 2025 constructors; no '/graphql' request fired.
  2. Type a known 2025 constructor name fragment into #constructors-search-filter (e.g. part of a harvested team name) and submit.
    - expect: The grid narrows to teams whose name contains the text (case-insensitive substring).
    - expect: Row count decreases to the matching subset (>= 1); no '/graphql' request fired.
  3. Clear #constructors-search-filter and submit.
    - expect: The grid restores to the full Season=2025 set.
  4. Type a no-match string (e.g. 'zzzzz') and submit.
    - expect: Zero rows shown.
  5. Set #constructors-season-filter to 'Any' and submit.
    - expect: The grid shows the full all-time constructor list (largest set).

### 11. List Filters (client-side Search) — Circuits

**Seed:** `e2e/seed.spec.ts`

#### 11.1. Circuits list filter: name/place, season, no-match, clear (no network)

**File:** `e2e/filters/circuits-filter.spec.ts`

**Steps:**
  1. Navigate to '/circuits'. Set #circuits-season-filter to 2025 and submit via the Search button. Record the 2025 row count and circuit names/locations.
    - expect: The grid shows the 2025 circuits; no '/graphql' request fired.
  2. Type a known circuit name or place fragment into #circuits-search-filter (matches across name + placeName; NOTE the 'country' field is an object and does not contribute usable text) and submit.
    - expect: The grid narrows to circuits whose name or placeName contains the text (case-insensitive substring).
    - expect: Row count decreases to the matching subset (>= 1); no '/graphql' request fired.
  3. Type a two-word query whose tokens individually match different circuits (e.g. 'grand monaco') and submit.
    - expect: Because matching is OR across space-split tokens, the grid shows the UNION of rows matching either token (this broadens, not narrows) — assert union semantics, not intersection.
  4. Clear #circuits-search-filter and submit.
    - expect: The grid restores to the full Season=2025 set.
  5. Type a no-match string (e.g. 'zzzzz') and submit, then set #circuits-season-filter to 'Any' and submit.
    - expect: No-match query yields zero rows; switching to 'Any' shows the full all-time circuit list.
    - expect: No '/graphql' request fired in either step.

### 12. Static Pages

**Seed:** `e2e/seed.spec.ts`

#### 12.1. Past Seasons and About render

**File:** `e2e/static/seasons-about.spec.ts`

**Steps:**
  1. Navigate to '/seasons'.
    - expect: Heading 'Past Seasons'; a list/grid of past seasons renders, each linking to '/<year>'.
    - expect: No '/graphql' requests occurred.
  2. Click one season entry (e.g. 2024).
    - expect: Navigates to '/2024' and the '2024 Season' page renders.
  3. Navigate to '/about'.
    - expect: Heading 'About effOne Hub'; Mission, Data, Repositories, and Dependencies sections render.
    - expect: No '/graphql' requests occurred.

## Runner setup (resolve before executing specs)

The `playwright-test` MCP still cannot drive a browser even after `@playwright/test@1.60.0` was installed. Root cause: `.mcp.json` launches `npx playwright run-test-mcp-server` from the worktree root with no `-c`, so it loads a default config (testDir = worktree root), runs the empty root `seed.spec.ts` (which passes instead of pausing → "seed test not found"), and never loads `packages/site/playwright.config.ts` (testDir `./e2e`); `packages/site/e2e/seed.spec.ts` also does not exist.

Run the specs WITHOUT the MCP (recommended — config + webServer are already wired). From `packages/site`, run `pnpm exec playwright test` (it reuses the running :3000 dev server via `reuseExistingServer`).

To make the `playwright-test` MCP itself work (for the generator agent): (1) set the `.mcp.json` playwright-test `args` to `["playwright","run-test-mcp-server","-c","packages/site/playwright.config.ts"]`; (2) create `packages/site/e2e/seed.spec.ts` and delete the stray worktree-root `seed.spec.ts`; (3) restart Claude Code so the MCP reloads with the new args.
