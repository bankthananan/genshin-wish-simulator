/* ============================================================
   GENSHIN WISH SIMULATOR — UI
   ============================================================ */

const $ = sel => document.querySelector(sel);

let currentVer = ALL_VERSIONS[ALL_VERSIONS.length - 1];
let currentBannerKey = null;
let targetId = null;          // chosen featured 5★ on double banners
let historyFilter = "all";

const STAR = "★";
const stars = n => STAR.repeat(n);

function eraSort() { return parseFloat(currentVer); }
function currentBanner() { return BANNER_BY_KEY[currentBannerKey]; }

function elemGrad(c) {
  const e = ELEMENTS[c.element];
  return `linear-gradient(135deg, ${e.c2}, ${e.c1})`;
}

/* ---------- version select ---------- */
function renderVersionSelect() {
  const sel = $("#version-select");
  sel.innerHTML = "";
  let lastRegion = null;
  let group = null;
  for (const ver of ALL_VERSIONS) {
    const region = regionOf(parseFloat(ver));
    if (region !== lastRegion) {
      group = document.createElement("optgroup");
      group.label = region;
      sel.appendChild(group);
      lastRegion = region;
    }
    const opt = document.createElement("option");
    opt.value = ver;
    opt.textContent = versionLabel(ver);
    group.appendChild(opt);
  }
  sel.value = currentVer;
  sel.onchange = () => {
    currentVer = sel.value;
    const banners = EVENT_BANNERS.filter(b => b.ver === currentVer);
    selectBanner(banners[0].key);
    renderBannerList();
  };
}

/* ---------- banner list ---------- */
function renderBannerList() {
  $("#banner-list-title").textContent = versionLabel(currentVer);
  const list = $("#banner-list");
  list.innerHTML = "";

  const banners = EVENT_BANNERS.filter(b => b.ver === currentVer);
  for (const b of banners) {
    const card = document.createElement("div");
    card.className = "banner-card" + (b.key === currentBannerKey ? " selected" : "");
    const lead = CHAR_BY_ID[b.five[0]];
    card.style.background = elemGrad(lead);
    card.innerHTML = `
      <div class="banner-card-phase">Phase ${b.phase}</div>
      <div class="banner-card-name">${b.name}</div>
      <div class="banner-card-icons">${b.five.map(id => {
        const c = CHAR_BY_ID[id];
        return `<span title="${c.name}">${ELEMENTS[c.element].icon}${WEAPON_ICONS[c.weapon]}</span>`;
      }).join(" ")}</div>`;
    card.onclick = () => { selectBanner(b.key); renderBannerList(); };
    list.appendChild(card);

    const wb = BANNER_BY_KEY["w" + b.key];
    if (wb) {
      const wcard = document.createElement("div");
      wcard.className = "banner-card banner-card-weapon" + (wb.key === currentBannerKey ? " selected" : "");
      wcard.innerHTML = `
        <div class="banner-card-phase">Phase ${wb.phase} · Weapons</div>
        <div class="banner-card-name">Epitome Invocation</div>
        <div class="banner-card-icons">${wb.five.map(w =>
          `<span title="${w.name}">${WEAPON_ICONS[w.weapon]}</span>`).join(" ")}
          <small>${wb.five.map(w => w.name).join(" · ")}</small></div>`;
      wcard.onclick = () => { selectBanner(wb.key); renderBannerList(); };
      list.appendChild(wcard);
    }
  }

  const std = document.createElement("div");
  std.className = "banner-card banner-card-standard" + (currentBannerKey === "standard" ? " selected" : "");
  std.innerHTML = `
    <div class="banner-card-phase">Permanent</div>
    <div class="banner-card-name">Wanderlust Invocation</div>
    <div class="banner-card-icons">⭐ Standard pool as of ${currentVer}</div>`;
  std.onclick = () => { selectBanner("standard"); renderBannerList(); };
  list.appendChild(std);
}

function selectBanner(key) {
  currentBannerKey = key;
  const b = BANNER_BY_KEY[key];
  targetId = b.type === "event" ? b.five[0] : null;
  renderBannerDetail();
  renderPity();
}

/* weapon banner detail */
function renderWeaponBanner(b, box) {
  const maxFate = maxFatePoints(b.sort);
  box.innerHTML = `
    <h2 class="banner-title">Epitome Invocation</h2>
    <p class="banner-sub">${versionLabel(b.ver)} · Phase ${b.phase} · 75/25 · hard pity 80</p>
    <div class="featured-row">
      ${b.five.map(w => weaponCardHTML(w, maxFate > 0, G.weapon.chosen === w.name)).join("")}
    </div>
    ${maxFate
      ? `<p class="banner-note">Epitomized Path — click a weapon to chart your course. Every other 5★
         adds a fate point; at <b>${maxFate}</b> the next 5★ is your chosen weapon.
         Fate points: <b>${G.weapon.fatePoints}/${maxFate}</b>${G.weapon.chosen ? ` → ${G.weapon.chosen}` : " (no course charted)"}</p>`
      : `<p class="banner-note">No Epitomized Path in ${versionLabel(b.ver)} — it was added in 2.0. Pure 75/25, good luck.</p>`}
    <div class="four-row">
      ${b.four.map(w => `<span class="four-chip four-chip-weapon">${WEAPON_ICONS[w.weapon]} ${w.name}</span>`).join("")}
    </div>`;
  if (maxFate > 0) {
    box.querySelectorAll(".featured-card").forEach(el => {
      el.onclick = () => { setChosenWeapon(el.dataset.name); renderBannerDetail(); renderPity(); };
    });
  }
}

function weaponCardHTML(w, clickable, isChosen) {
  const copies = G.ownedWeapons[w.name] || 0;
  return `
    <div class="featured-card featured-card-weapon ${clickable ? "clickable" : ""} ${isChosen ? "target" : ""}"
         data-name="${w.name}">
      <div class="featured-icon">${WEAPON_ICONS[w.weapon]}</div>
      <div class="featured-name">${w.name}</div>
      <div class="featured-meta">${w.weapon}${copies ? ` · R${Math.min(5, copies)}` : ""}</div>
      ${isChosen ? `<div class="target-tag">CHARTED</div>` : ""}
    </div>`;
}

/* ---------- banner detail ---------- */
function renderBannerDetail() {
  const b = currentBanner();
  const box = $("#banner-detail");

  if (b.type === "weapon") { renderWeaponBanner(b, box); return; }

  if (b.type === "standard") {
    const fives = standardFiveStarChars(eraSort());
    box.innerHTML = `
      <h2 class="banner-title">Wanderlust Invocation</h2>
      <p class="banner-sub">Standard banner — pool as of ${versionLabel(currentVer)}. Own 5★ pity, no 50/50.</p>
      <div class="featured-row">${fives.map(c => featuredCardHTML(c, false)).join("")}</div>
      <p class="banner-note">5★ weapons: ${FIVE_STAR_WEAPONS.map(w => w.name).join(" · ")}</p>`;
    return;
  }

  box.innerHTML = `
    <h2 class="banner-title">${b.name}</h2>
    <p class="banner-sub">${versionLabel(b.ver)} · Phase ${b.phase}
      ${b.sort >= 5.0 ? " · ✨ Capturing Radiance active" : ""}</p>
    <div class="featured-row" id="featured-row">
      ${b.five.map(id => featuredCardHTML(CHAR_BY_ID[id], b.five.length > 1, id === targetId)).join("")}
    </div>
    ${b.five.length > 1 ? `<p class="banner-note">Double banner — click a character to wish on their banner (pity is shared).</p>` : ""}
    <div class="four-row">
      ${b.four.map(id => {
        const c = CHAR_BY_ID[id];
        return `<span class="four-chip" style="background:${elemGrad(c)}">${ELEMENTS[c.element].icon} ${c.name}</span>`;
      }).join("")}
    </div>`;

  if (b.five.length > 1) {
    box.querySelectorAll(".featured-card").forEach(el => {
      el.onclick = () => { targetId = el.dataset.id; renderBannerDetail(); };
    });
  }
}

function featuredCardHTML(c, clickable, isTarget) {
  const copies = G.ownedChars[c.id] || 0;
  return `
    <div class="featured-card ${clickable ? "clickable" : ""} ${isTarget ? "target" : ""}"
         data-id="${c.id}" style="background:${elemGrad(c)}">
      <div class="featured-icon">${ELEMENTS[c.element].icon}</div>
      <div class="featured-name">${c.name}</div>
      <div class="featured-meta">${WEAPON_ICONS[c.weapon]} ${c.weapon}${copies ? ` · C${copies - 1}` : ""}</div>
      ${isTarget ? `<div class="target-tag">WISHING</div>` : ""}
    </div>`;
}

/* ---------- pity / guarantees ---------- */
function renderPity() {
  const b = currentBanner();
  const isWeapon = b.type === "weapon";
  const P = b.type === "standard" ? G.standard : isWeapon ? G.weapon : G.event;
  const r5 = isWeapon ? RATES.wfive : RATES.five;

  $("#pity5-fill").style.width = Math.min(100, P.pity5 / r5.hard * 100) + "%";
  $("#pity5-text").textContent = `${P.pity5} / ${r5.hard}`;
  $("#pity5-fill").classList.toggle("soft", P.pity5 + 1 >= r5.softStart);
  $("#pity4-fill").style.width = Math.min(100, P.pity4 / 10 * 100) + "%";
  $("#pity4-text").textContent = `${P.pity4} / 10`;

  const tags = [];
  if (b.type === "event") {
    tags.push(G.event.guaranteed5
      ? `<span class="tag tag-gold">Next 5★: guaranteed featured</span>`
      : `<span class="tag">Next 5★: 50/50</span>`);
    if (G.event.guaranteed4) tags.push(`<span class="tag tag-purple">Next 4★: guaranteed featured</span>`);
    if (b.sort >= 5.0 && G.event.radianceLosses > 0)
      tags.push(`<span class="tag tag-gold">✨ Radiance: ${G.event.radianceLosses} consecutive loss${G.event.radianceLosses > 1 ? "es" : ""}</span>`);
  } else if (isWeapon) {
    tags.push(G.weapon.guaranteed5
      ? `<span class="tag tag-gold">Next 5★: guaranteed featured</span>`
      : `<span class="tag">Next 5★: 75/25</span>`);
    if (G.weapon.guaranteed4) tags.push(`<span class="tag tag-purple">Next 4★: guaranteed featured</span>`);
    const maxFate = maxFatePoints(b.sort);
    if (maxFate && G.weapon.chosen)
      tags.push(`<span class="tag tag-gold">⚒ Fate: ${G.weapon.fatePoints}/${maxFate} → ${G.weapon.chosen}</span>`);
  }
  $("#guarantee-tags").innerHTML = tags.join("");
}

/* ---------- stats ---------- */
function renderStats() {
  const s = G.stats;
  const avg = s.fiveStars ? (s.pitySum5 / s.fiveStars).toFixed(1) : "—";
  const total5050 = s.fiftyWins + s.fiftyLosses + s.radiances;
  const winPct = total5050 ? Math.round((s.fiftyWins + s.radiances) / total5050 * 100) + "%" : "—";
  const rows = [
    ["Total wishes", G.totalWishes],
    ["Primogems spent", (G.totalWishes * PRIMOS_PER_WISH).toLocaleString()],
    ["5★ pulled", s.fiveStars],
    ["4★ pulled", s.fourStars],
    ["Avg 5★ pity", avg],
    ["50/50 record", total5050 ? `${s.fiftyWins + s.radiances}W – ${s.fiftyLosses}L (${winPct})` : "—"],
    ["✨ Radiances", s.radiances],
    ["⚒ Epitomized", s.epitomized || 0],
  ];
  $("#stats-list").innerHTML = rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");
  $("#primo-count").textContent = (G.totalWishes * PRIMOS_PER_WISH).toLocaleString();

  const fives = G.history.filter(h => h.rarity === 5);
  $("#five-star-log").innerHTML = fives.slice(-30).reverse().map(h => `
    <li><span class="gold-text">${h.name}</span>
        <span class="log-meta">${h.pityUsed} pity${fiftyLabel(h.fifty)}</span></li>`).join("")
    || `<li class="log-meta">No 5★ yet — keep wishing!</li>`;
}

function fiftyLabel(f) {
  return { win: " · won 50/50", lose: " · lost 50/50", guaranteed: " · guaranteed",
           radiance: " · ✨ radiance", epitomized: " · ⚒ epitomized" }[f] || "";
}

/* ---------- history ---------- */
function renderHistory() {
  let rows = G.history;
  if (historyFilter !== "all") rows = rows.filter(h => h.rarity === +historyFilter);
  rows = rows.slice(-150).reverse();

  $("#history-body").innerHTML = rows.map(h => {
    const banner = BANNER_BY_KEY[h.bannerKey];
    return `<tr class="r${h.rarity}">
      <td>${h.n}</td>
      <td><span class="star-text r${h.rarity}-text">${stars(h.rarity)}</span> ${h.name}</td>
      <td>${banner ? banner.name : h.bannerKey}</td>
      <td>${h.rarity >= 4 ? h.pityUsed : "—"}</td>
      <td>${fiftyLabel(h.fifty).replace(" · ", "") || "—"}</td>
    </tr>`;
  }).join("") || `<tr><td colspan="5" class="log-meta">No wishes yet.</td></tr>`;
}

/* ---------- inventory ---------- */
function renderInventory() {
  const box = $("#inventory");
  const charSection = rarity => {
    const owned = (rarity === 5 ? FIVE_STARS : FOUR_STARS).filter(c => G.ownedChars[c.id]);
    if (!owned.length) return "";
    return `<h3 class="r${rarity}-text">${stars(rarity)} Characters (${owned.length})</h3>
      <div class="inv-grid">${owned.map(c => `
        <div class="inv-chip" style="background:${elemGrad(c)}">
          ${ELEMENTS[c.element].icon} ${c.name} <b>C${G.ownedChars[c.id] - 1}</b>
        </div>`).join("")}</div>`;
  };
  const weaponNames = Object.keys(G.ownedWeapons);
  const weaponSection = weaponNames.length
    ? `<h3>Weapons (${weaponNames.length})</h3>
       <div class="inv-grid">${weaponNames.map(n =>
         `<div class="inv-chip inv-weapon">${n} <b>R${Math.min(5, G.ownedWeapons[n])}</b></div>`).join("")}</div>`
    : "";
  box.innerHTML = charSection(5) + charSection(4) + weaponSection
    || `<p class="log-meta">Nothing yet — make a wish.</p>`;
}

/* ---------- wishing ---------- */
function wish(count) {
  const b = currentBanner();
  const before = { ...G.ownedChars };
  const results = doWishes(b, eraSort(), targetId, count);
  showResults(results, before);
  renderAll();
}

/* ---------- wish cinematic: meteor → one-by-one reveals → summary ---------- */
let revealQueue = [], revealIdx = 0, revealOwnedBefore = {};
let cinTimer = null, flashTimer = null;

function clearFlowTimers() {
  clearTimeout(cinTimer); clearTimeout(flashTimer);
  $("#flash").classList.add("hidden");
}

function showStage(name) {
  ["cinematic", "reveal-stage", "summary-stage"].forEach(id =>
    document.getElementById(id).classList.toggle("hidden", !id.startsWith(name)));
  $("#skip-btn").classList.toggle("hidden", name === "summary");
}

function showResults(results, ownedBefore) {
  revealQueue = results; revealIdx = 0; revealOwnedBefore = ownedBefore;
  buildSummary(results, ownedBefore);
  $("#results-overlay").classList.remove("hidden");

  const reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) { showSummary(); return; }

  const best = Math.max(...results.map(r => r.rarity));
  const cin = $("#cinematic");
  cin.classList.remove("rarity-r3", "rarity-r4", "rarity-r5");
  cin.classList.add("rarity-r" + best);
  cin.classList.toggle("radiance", results.some(r => r.fifty === "radiance"));
  // restart the meteor animation
  cin.querySelectorAll(".meteor").forEach(m => { m.style.animation = "none"; void m.offsetWidth; m.style.animation = ""; });
  showStage("cinematic");
  cinTimer = setTimeout(() => flashTo(() => showRevealCard(0)), 1900);
}

function flashTo(cb) {
  const f = $("#flash");
  f.classList.remove("hidden");
  void f.offsetWidth;
  flashTimer = setTimeout(() => { f.classList.add("hidden"); cb(); }, 320);
}

function showRevealCard(i) {
  if (i >= revealQueue.length) { showSummary(); return; }
  revealIdx = i;
  const r = revealQueue[i];
  const isChar = r.kind === "char";
  const c = isChar ? CHAR_BY_ID[r.id] : null;
  const icon = isChar ? ELEMENTS[c.element].icon : WEAPON_ICONS[r.weapon];
  const isNew = isChar && !revealOwnedBefore[r.id];
  const isRadiance = r.fifty === "radiance";
  const stage = $("#reveal-stage");
  stage.className = "stage reveal-r" + r.rarity + (isRadiance ? " reveal-radiance" : "");
  stage.innerHTML = `
    <div class="reveal-card r${r.rarity}${isRadiance ? " radiance" : ""}">
      <div class="reveal-rays"></div>
      ${isRadiance ? `<div class="radiance-banner">✨ Capturing Radiance!</div>` : ""}
      <div class="reveal-icon" style="${isChar ? `background:${elemGrad(c)};` : ""}">${icon}</div>
      <div class="reveal-stars">${Array.from({ length: r.rarity }, (_, j) =>
        `<span style="animation-delay:${0.4 + j * 0.12}s">★</span>`).join("")}</div>
      <div class="reveal-name r${r.rarity}-text">${r.name}</div>
      <div class="reveal-sub">
        ${isChar ? `${c.element} · ${c.weapon}` : r.weapon}
        ${isNew ? `<span class="new-tag">NEW</span>` : isChar ? `· C${r.copies - 1}` : `· R${Math.min(5, r.copies)}`}
        ${fiftyLabel(r.fifty)}
      </div>
      <div class="reveal-hint">${i + 1} / ${revealQueue.length} — tap to continue</div>
    </div>`;
  showStage("reveal");
}

function showSummary() {
  clearFlowTimers();
  showStage("summary");
}

function buildSummary(results, ownedBefore) {
  const best = Math.max(...results.map(r => r.rarity));
  $("#results-title").innerHTML =
    best === 5 ? `<span class="gold-text">${stars(5)} A radiant light...</span>` :
    best === 4 ? `<span class="r4-text">${stars(4)} Wish granted</span>` : "Wish Results";

  $("#results-grid").innerHTML = results.map((r, i) => {
    const isNew = r.kind === "char" && !ownedBefore[r.id];
    const bg = r.kind === "char" ? `background:${elemGrad(CHAR_BY_ID[r.id])};` : "";
    return `<div class="result-card r${r.rarity}${r.fifty === "radiance" ? " radiance" : ""}" style="${bg}animation-delay:${i * 0.06}s">
      <div class="result-stars r${r.rarity}-text">${stars(r.rarity)}</div>
      <div class="result-icon">${r.kind === "char" ? ELEMENTS[r.element].icon : WEAPON_ICONS[r.weapon]}</div>
      <div class="result-name">${r.name}</div>
      <div class="result-meta">
        ${isNew ? `<span class="new-tag">NEW</span>` : r.kind === "char" ? `C${r.copies - 1}` : ""}
        ${r.fifty === "radiance" ? "✨" : ""}
      </div>
    </div>`;
  }).join("");
}

/* ---------- boot ---------- */
function renderAll() {
  renderBannerList();
  renderBannerDetail();
  renderPity();
  renderStats();
  renderHistory();
  renderInventory();
}

$("#wish1-btn").onclick = () => wish(1);
$("#wish10-btn").onclick = () => wish(10);
$("#results-close").onclick = () => { clearFlowTimers(); $("#results-overlay").classList.add("hidden"); };
$("#skip-btn").onclick = showSummary;
$("#cinematic").onclick = () => { clearTimeout(cinTimer); flashTo(() => showRevealCard(0)); };
$("#reveal-stage").onclick = () => showRevealCard(revealIdx + 1);
$("#results-overlay").onclick = e => {
  if (e.target.id === "results-overlay") { clearFlowTimers(); e.target.classList.add("hidden"); }
};

$("#reset-btn").onclick = () => {
  if (confirm("Reset all pulls, pity and inventory?")) { resetState(); renderAll(); }
};

$("#history-filter").querySelectorAll("button").forEach(btn => {
  btn.onclick = () => {
    historyFilter = btn.dataset.f;
    $("#history-filter").querySelectorAll("button").forEach(b => b.classList.toggle("active", b === btn));
    renderHistory();
  };
});

renderVersionSelect();
selectBanner(EVENT_BANNERS.filter(b => b.ver === currentVer)[0].key);
renderAll();
