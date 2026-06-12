# Genshin Wish Simulator

A zero-dependency, vanilla-JS simulator of Genshin Impact's wish system, covering
every character event banner from **1.0 through Luna VII (6.6)** plus the
Wanderlust Invocation standard banner.

## Run it

Open `index.html` in a browser. No build step, no server needed.
(If your browser blocks `file://` localStorage, serve it: `python3 -m http.server`.)

## Features

- **All 130+ event banners** — pick any version, wish on either phase (double
  banners let you choose which featured 5★ you're targeting; pity is shared).
- **Authentic rates** — 0.6% base 5★, soft pity from pull 74 (+6%/pull), hard
  pity at 90; 5.1% base 4★ with pity 10.
- **50/50 & guarantee** — losing the 50/50 gives an era-appropriate standard
  5★ and guarantees the next one.
- **Capturing Radiance** (banners 5.0+) — a simplified model: your third
  consecutive 50/50 loss is converted into the featured character
  (≈57% effective featured rate, close to the observed ~55%).
- **Era-aware pools** — losing the 50/50 in 1.3 can only give launch standard
  characters; the standard banner pool grows with the selected version
  (Tighnari joins at 3.1, Dehya at 3.6).
- **Stats & history** — pity meters, 50/50 record, average 5★ pity, primogem
  spend, full pull history, and an inventory with constellations/refinements.
- **Weapon banners (Epitome Invocation)** — one per phase, featuring the
  signature weapons of that phase's characters. Authentic rates: 0.7% base,
  soft pity from 63, hard pity 80, 75/25 featured split, 4★ at 6% with five
  featured weapons at 75%. **Epitomized Path** is era-accurate: absent
  in 1.x, 2 fate points from 2.0, 1 fate point from 5.0 — click a featured
  weapon to chart your course; switching resets fate points.
- **Persistence** — state is saved to localStorage; Reset wipes it.

## Files

| File | Purpose |
| --- | --- |
| `js/data.js` | Characters, weapons, and every event banner 1.0–6.6 |
| `js/gacha.js` | The wish engine: pity, 50/50, radiance, pools |
| `js/ui.js` | Rendering and interaction |
| `css/style.css` | Styling |

## Approximations

- **Featured 4★ trios** — characters debuting on a banner are pinned to it;
  the remaining slots are filled deterministically (seeded PRNG) from
  era-appropriate 4★s rather than the true historical lineups.
- **Capturing Radiance** — HoYoverse has never published the exact mechanic;
  the consecutive-loss model here is a community-style approximation.
- **Double banners** — modeled as one banner with a selectable target,
  matching the in-game behavior of shared pity.
- 4★ characters/weapons in the off-rate pool are weighted uniformly.
- **Luna-era data** — elements/weapons of all Luna-era characters are
  verified against published guides (Durin Pyro Sword, Columbina Hydro
  Catalyst, Zibai Geo Sword, Varka Anemo Claymore, Linnea Geo Bow, Nicole
  Pyro Catalyst, Lohen Cryo Polearm, Prune Anemo Catalyst, Jahoda Anemo Bow,
  Aino Hydro Claymore). Some rerun partners and Illuga remain best-effort.
  Corrections are one-line edits in `js/data.js` (`FIVE_STARS`,
  `FOUR_STARS`, `EVENT_BANNERS_RAW`).
- **Weapon banner lineups** — derived from featured characters' signature
  weapons (a real pattern, but early 1.x banners actually featured standard
  weapons). Signatures of the newest characters marked `// placeholder` in
  `SIGNATURES` are invented names; Nefer's Reliquary of Truth is real.
