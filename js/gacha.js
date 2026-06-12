/* ============================================================
   GENSHIN WISH SIMULATOR — GACHA ENGINE
   Pity, soft pity, 50/50, guarantee, Capturing Radiance (5.0+)
   ============================================================ */

const RATES = {
  five:  { base: 0.006, softStart: 74, softStep: 0.06,  hard: 90 },
  four:  { base: 0.051, softStart: 9,  softStep: 0.511, hard: 10 },
  wfive: { base: 0.007, softStart: 63, softStep: 0.07,  hard: 80 },
  wfour: { base: 0.06,  softStart: 9,  softStep: 0.6,   hard: 10 },
};

/* Epitomized Path: absent in 1.x, 2 fate points 2.0–4.8, 1 from 5.0 */
function maxFatePoints(sort) {
  return sort >= 5.0 ? 1 : sort >= 2.0 ? 2 : 0;
}

const PRIMOS_PER_WISH = 160;
const SAVE_KEY = "genshin-wish-sim-v1";

function freshState() {
  return {
    /* pity is shared across every character event banner;
       the standard banner tracks its own */
    event:    { pity5: 0, pity4: 0, guaranteed5: false, guaranteed4: false, radianceLosses: 0 },
    weapon:   { pity5: 0, pity4: 0, guaranteed5: false, guaranteed4: false, fatePoints: 0, chosen: null },
    standard: { pity5: 0, pity4: 0 },
    totalWishes: 0,
    ownedChars: {},    // id   -> copies (1 = C0, 2 = C1, ...)
    ownedWeapons: {},  // name -> copies (1 = R1, ...)
    history: [],       // pull records, oldest first
    stats: { fiftyWins: 0, fiftyLosses: 0, radiances: 0, epitomized: 0, fiveStars: 0, fourStars: 0, pitySum5: 0 },
  };
}

let G = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) {
      const s = JSON.parse(raw);
      if (s && s.event && s.standard) {
        // migrate saves from before weapon banners existed
        if (!s.weapon) s.weapon = freshState().weapon;
        if (s.stats.epitomized === undefined) s.stats.epitomized = 0;
        return s;
      }
    }
  } catch (e) { /* corrupted save → start fresh */ }
  return freshState();
}

function saveState() {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(G)); } catch (e) {}
}

function resetState() {
  G = freshState();
  saveState();
}

/* probability of hitting on the (pity+1)-th pull */
function chanceAt(pity, r) {
  const n = pity + 1;
  if (n >= r.hard) return 1;
  if (n >= r.softStart) return Math.min(1, r.base + r.softStep * (n - r.softStart + 1));
  return r.base;
}

const pick = arr => arr[Math.floor(Math.random() * arr.length)];

function grantChar(c)   { G.ownedChars[c.id] = (G.ownedChars[c.id] || 0) + 1;       return G.ownedChars[c.id]; }
function grantWeapon(w) { G.ownedWeapons[w.name] = (G.ownedWeapons[w.name] || 0) + 1; return G.ownedWeapons[w.name]; }

function charResult(c, extra) {
  return Object.assign({
    rarity: c.rarity, kind: "char", id: c.id, name: c.name,
    element: c.element, weapon: c.weapon, copies: grantChar(c),
  }, extra);
}
function weaponResult(w, rarity, extra) {
  return Object.assign({
    rarity, kind: "weapon", name: w.name, weapon: w.weapon, copies: grantWeapon(w),
  }, extra);
}

/* ---------- 5★ resolution ---------- */
function rollFiveStar(banner, eraSort, targetId) {
  const pityUsed = G[banner.type === "standard" ? "standard" : "event"].pity5 + 1;

  if (banner.type === "standard") {
    G.standard.pity5 = 0;
    const item = Math.random() < 0.5
      ? charResult(pick(standardFiveStarChars(eraSort)), { fifty: null })
      : weaponResult(pick(FIVE_STAR_WEAPONS), 5, { fifty: null });
    return Object.assign(item, { pityUsed });
  }

  const ev = G.event;
  ev.pity5 = 0;
  const featured = CHAR_BY_ID[targetId && banner.five.includes(targetId) ? targetId : pick(banner.five)];

  if (ev.guaranteed5) {
    ev.guaranteed5 = false;
    return charResult(featured, { fifty: "guaranteed", pityUsed });
  }

  if (Math.random() < 0.5) {                      // won the 50/50
    ev.radianceLosses = 0;
    G.stats.fiftyWins++;
    return charResult(featured, { fifty: "win", pityUsed });
  }

  /* lost the 50/50 — Capturing Radiance can rescue it on 5.0+ banners */
  if (banner.sort >= 5.0) {
    ev.radianceLosses++;
    if (ev.radianceLosses >= 3) {
      ev.radianceLosses = 0;
      G.stats.radiances++;
      return charResult(featured, { fifty: "radiance", pityUsed });
    }
  }
  G.stats.fiftyLosses++;
  ev.guaranteed5 = true;
  return charResult(pick(standardFiveStarChars(banner.sort)), { fifty: "lose", pityUsed });
}

/* ---------- 4★ resolution ---------- */
function rollFourStar(banner, eraSort) {
  const pityUsed = G[banner.type === "standard" ? "standard" : "event"].pity4 + 1;

  if (banner.type === "standard") {
    G.standard.pity4 = 0;
    const item = Math.random() < 0.5
      ? charResult(pick(standardFourStarChars(eraSort)), { fifty: null })
      : weaponResult(pick(FOUR_STAR_WEAPONS), 4, { fifty: null });
    return Object.assign(item, { pityUsed });
  }

  const ev = G.event;
  ev.pity4 = 0;

  if (ev.guaranteed4 || Math.random() < 0.5) {    // featured trio
    const wasGuaranteed = ev.guaranteed4;
    ev.guaranteed4 = false;
    return charResult(CHAR_BY_ID[pick(banner.four)],
      { fifty: wasGuaranteed ? "guaranteed" : "win", pityUsed });
  }

  ev.guaranteed4 = true;                          // off-banner char or weapon
  const offChars = FOUR_STARS.filter(c =>
    !banner.four.includes(c.id) && fourStarAvailable(c, banner.sort, banner.phase, false));
  const pool = offChars.concat(FOUR_STAR_WEAPONS);
  const got = pick(pool);
  return got.element
    ? charResult(got, { fifty: "lose", pityUsed })
    : weaponResult(got, 4, { fifty: "lose", pityUsed });
}

/* ---------- weapon banner resolution ---------- */
function setChosenWeapon(name) {
  if (G.weapon.chosen !== name) {
    G.weapon.chosen = name;       // switching course resets fate points
    G.weapon.fatePoints = 0;
    saveState();
  }
}

function rollFiveStarWeapon(banner) {
  const W = G.weapon;
  const pityUsed = W.pity5 + 1;
  W.pity5 = 0;
  const maxFate = maxFatePoints(banner.sort);
  const chosen = banner.five.find(w => w.name === W.chosen) || null;

  /* fate points full → forced chosen weapon */
  if (chosen && maxFate && W.fatePoints >= maxFate) {
    W.fatePoints = 0;
    W.guaranteed5 = false;
    G.stats.epitomized++;
    return weaponResult(chosen, 5, { fifty: "epitomized", pityUsed });
  }

  const finish = (w, fifty) => {
    if (chosen && maxFate) {
      if (w.name === chosen.name) W.fatePoints = 0;
      else W.fatePoints++;        // any other 5★ weapon charts a point
    }
    return weaponResult(w, 5, { fifty, pityUsed });
  };

  if (W.guaranteed5) {
    W.guaranteed5 = false;
    return finish(pick(banner.five), "guaranteed");
  }
  if (Math.random() < 0.75) return finish(pick(banner.five), "win");
  W.guaranteed5 = true;
  const off = FIVE_STAR_WEAPONS.filter(w => !banner.five.some(f => f.name === w.name));
  return finish(pick(off), "lose");
}

function rollFourStarWeapon(banner) {
  const W = G.weapon;
  const pityUsed = W.pity4 + 1;
  W.pity4 = 0;

  if (W.guaranteed4 || Math.random() < 0.75) {
    const wasGuaranteed = W.guaranteed4;
    W.guaranteed4 = false;
    return weaponResult(pick(banner.four), 4,
      { fifty: wasGuaranteed ? "guaranteed" : "win", pityUsed });
  }

  W.guaranteed4 = true;           // off-banner: 4★ chars or other 4★ weapons
  const offChars = FOUR_STARS.filter(c => fourStarAvailable(c, banner.sort, banner.phase, false));
  const offWeapons = FOUR_STAR_WEAPONS.filter(w => !banner.four.some(f => f.name === w.name));
  const got = pick(offChars.concat(offWeapons));
  return got.element
    ? charResult(got, { fifty: "lose", pityUsed })
    : weaponResult(got, 4, { fifty: "lose", pityUsed });
}

/* ---------- one wish ---------- */
function doWish(banner, eraSort, targetId) {
  const isWeapon = banner.type === "weapon";
  const P = banner.type === "standard" ? G.standard : isWeapon ? G.weapon : G.event;
  const r5 = isWeapon ? RATES.wfive : RATES.five;
  const r4 = isWeapon ? RATES.wfour : RATES.four;
  G.totalWishes++;

  let item;
  if (Math.random() < chanceAt(P.pity5, r5)) {
    item = isWeapon ? rollFiveStarWeapon(banner) : rollFiveStar(banner, eraSort, targetId);
    P.pity4++;                                    // a 5★ does not reset 4★ pity
    G.stats.fiveStars++;
    G.stats.pitySum5 += item.pityUsed;
  } else if (Math.random() < chanceAt(P.pity4, r4)) {
    item = isWeapon ? rollFourStarWeapon(banner) : rollFourStar(banner, eraSort);
    P.pity5++;
    G.stats.fourStars++;
  } else {
    P.pity5++; P.pity4++;
    item = weaponResult(pick(THREE_STAR_WEAPONS), 3, { fifty: null, pityUsed: 0 });
  }

  item.bannerKey = banner.key;
  item.n = G.totalWishes;
  item.t = Date.now();
  G.history.push(item);
  return item;
}

function doWishes(banner, eraSort, targetId, count) {
  const out = [];
  for (let i = 0; i < count; i++) out.push(doWish(banner, eraSort, targetId));
  saveState();
  return out;
}
