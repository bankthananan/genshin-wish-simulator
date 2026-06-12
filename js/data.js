/* ============================================================
   GENSHIN WISH SIMULATOR — DATA
   Every character event banner from 1.0 through Luna VII (6.6)
   ============================================================ */

const ELEMENTS = {
  Pyro:    { icon: "🔥", c1: "#ff9a5a", c2: "#8f2d1c" },
  Hydro:   { icon: "💧", c1: "#5ec1ff", c2: "#1b3f8f" },
  Electro: { icon: "⚡", c1: "#c79bff", c2: "#4a2a8f" },
  Cryo:    { icon: "❄️", c1: "#bdf0ff", c2: "#2c6f8f" },
  Anemo:   { icon: "🍃", c1: "#7fe8c9", c2: "#1d6f5c" },
  Geo:     { icon: "🪨", c1: "#ffd470", c2: "#8f6a1c" },
  Dendro:  { icon: "🌿", c1: "#a4e85f", c2: "#3a6f1d" },
};

const WEAPON_ICONS = {
  Sword: "🗡️", Claymore: "⚔️", Polearm: "🔱", Bow: "🏹", Catalyst: "📖",
};

/* ---------- 5★ characters ----------
   release: version they first appeared (as a float sort key).
   standard: true = part of Wanderlust Invocation pool.
   standardFrom: version they joined the standard pool (if later). */
const FIVE_STARS = [
  // Standard pool originals
  { id: "diluc",       name: "Diluc",            element: "Pyro",    weapon: "Claymore", release: 1.0, standard: true },
  { id: "jean",        name: "Jean",             element: "Anemo",   weapon: "Sword",    release: 1.0, standard: true },
  { id: "mona",        name: "Mona",             element: "Hydro",   weapon: "Catalyst", release: 1.0, standard: true },
  { id: "qiqi",        name: "Qiqi",             element: "Cryo",    weapon: "Sword",    release: 1.0, standard: true },
  { id: "keqing",      name: "Keqing",           element: "Electro", weapon: "Sword",    release: 1.0, standard: true },
  { id: "tighnari",    name: "Tighnari",         element: "Dendro",  weapon: "Bow",      release: 3.0, standard: true, standardFrom: 3.1 },
  { id: "dehya",       name: "Dehya",            element: "Pyro",    weapon: "Claymore", release: 3.5, standard: true, standardFrom: 3.6 },
  // Limited
  { id: "venti",       name: "Venti",            element: "Anemo",   weapon: "Bow",      release: 1.0 },
  { id: "klee",        name: "Klee",             element: "Pyro",    weapon: "Catalyst", release: 1.0 },
  { id: "tartaglia",   name: "Tartaglia",        element: "Hydro",   weapon: "Bow",      release: 1.1 },
  { id: "zhongli",     name: "Zhongli",          element: "Geo",     weapon: "Polearm",  release: 1.1 },
  { id: "albedo",      name: "Albedo",           element: "Geo",     weapon: "Sword",    release: 1.2 },
  { id: "ganyu",       name: "Ganyu",            element: "Cryo",    weapon: "Bow",      release: 1.2 },
  { id: "xiao",        name: "Xiao",             element: "Anemo",   weapon: "Polearm",  release: 1.3 },
  { id: "hutao",       name: "Hu Tao",           element: "Pyro",    weapon: "Polearm",  release: 1.3 },
  { id: "eula",        name: "Eula",             element: "Cryo",    weapon: "Claymore", release: 1.5 },
  { id: "kazuha",      name: "Kaedehara Kazuha", element: "Anemo",   weapon: "Sword",    release: 1.6 },
  { id: "ayaka",       name: "Kamisato Ayaka",   element: "Cryo",    weapon: "Sword",    release: 2.0 },
  { id: "yoimiya",     name: "Yoimiya",          element: "Pyro",    weapon: "Bow",      release: 2.0 },
  { id: "raiden",      name: "Raiden Shogun",    element: "Electro", weapon: "Polearm",  release: 2.1 },
  { id: "kokomi",      name: "Sangonomiya Kokomi", element: "Hydro", weapon: "Catalyst", release: 2.1 },
  { id: "itto",        name: "Arataki Itto",     element: "Geo",     weapon: "Claymore", release: 2.3 },
  { id: "shenhe",      name: "Shenhe",           element: "Cryo",    weapon: "Polearm",  release: 2.4 },
  { id: "yae",         name: "Yae Miko",         element: "Electro", weapon: "Catalyst", release: 2.5 },
  { id: "ayato",       name: "Kamisato Ayato",   element: "Hydro",   weapon: "Sword",    release: 2.6 },
  { id: "yelan",       name: "Yelan",            element: "Hydro",   weapon: "Bow",      release: 2.7 },
  { id: "cyno",        name: "Cyno",             element: "Electro", weapon: "Polearm",  release: 3.1 },
  { id: "nilou",       name: "Nilou",            element: "Hydro",   weapon: "Sword",    release: 3.1 },
  { id: "nahida",      name: "Nahida",           element: "Dendro",  weapon: "Catalyst", release: 3.2 },
  { id: "wanderer",    name: "Wanderer",         element: "Anemo",   weapon: "Catalyst", release: 3.3 },
  { id: "alhaitham",   name: "Alhaitham",        element: "Dendro",  weapon: "Sword",    release: 3.4 },
  { id: "baizhu",      name: "Baizhu",           element: "Dendro",  weapon: "Catalyst", release: 3.6 },
  { id: "lyney",       name: "Lyney",            element: "Pyro",    weapon: "Bow",      release: 4.0 },
  { id: "neuvillette", name: "Neuvillette",      element: "Hydro",   weapon: "Catalyst", release: 4.1 },
  { id: "wriothesley", name: "Wriothesley",      element: "Cryo",    weapon: "Catalyst", release: 4.1 },
  { id: "furina",      name: "Furina",           element: "Hydro",   weapon: "Sword",    release: 4.2 },
  { id: "navia",       name: "Navia",            element: "Geo",     weapon: "Claymore", release: 4.3 },
  { id: "xianyun",     name: "Xianyun",          element: "Anemo",   weapon: "Catalyst", release: 4.4 },
  { id: "chiori",      name: "Chiori",           element: "Geo",     weapon: "Sword",    release: 4.5 },
  { id: "arlecchino",  name: "Arlecchino",       element: "Pyro",    weapon: "Polearm",  release: 4.6 },
  { id: "clorinde",    name: "Clorinde",         element: "Electro", weapon: "Sword",    release: 4.7 },
  { id: "sigewinne",   name: "Sigewinne",        element: "Hydro",   weapon: "Bow",      release: 4.7 },
  { id: "emilie",      name: "Emilie",           element: "Dendro",  weapon: "Polearm",  release: 4.8 },
  { id: "mualani",     name: "Mualani",          element: "Hydro",   weapon: "Catalyst", release: 5.0 },
  { id: "kinich",      name: "Kinich",           element: "Dendro",  weapon: "Claymore", release: 5.0 },
  { id: "xilonen",     name: "Xilonen",          element: "Geo",     weapon: "Sword",    release: 5.1 },
  { id: "chasca",      name: "Chasca",           element: "Anemo",   weapon: "Bow",      release: 5.2 },
  { id: "mavuika",     name: "Mavuika",          element: "Pyro",    weapon: "Claymore", release: 5.3 },
  { id: "citlali",     name: "Citlali",          element: "Cryo",    weapon: "Catalyst", release: 5.3 },
  { id: "mizuki",      name: "Yumemizuki Mizuki", element: "Anemo",  weapon: "Catalyst", release: 5.4 },
  { id: "varesa",      name: "Varesa",           element: "Electro", weapon: "Catalyst", release: 5.5 },
  { id: "escoffier",   name: "Escoffier",        element: "Cryo",    weapon: "Polearm",  release: 5.6 },
  { id: "skirk",       name: "Skirk",            element: "Cryo",    weapon: "Sword",    release: 5.7 },
  { id: "ineffa",      name: "Ineffa",           element: "Electro", weapon: "Polearm",  release: 5.8 },
  { id: "lauma",       name: "Lauma",            element: "Dendro",  weapon: "Catalyst", release: 6.0 },
  { id: "flins",       name: "Flins",            element: "Electro", weapon: "Polearm",  release: 6.0 },
  { id: "nefer",       name: "Nefer",            element: "Dendro",  weapon: "Catalyst", release: 6.1 },
  { id: "durin",       name: "Durin",            element: "Pyro",    weapon: "Sword",    release: 6.2 },
  { id: "columbina",   name: "Columbina",        element: "Hydro",   weapon: "Catalyst", release: 6.3 },
  { id: "zibai",       name: "Zibai",            element: "Geo",     weapon: "Sword",    release: 6.3 },
  { id: "varka",       name: "Varka",            element: "Anemo",   weapon: "Claymore", release: 6.4 },
  { id: "linnea",      name: "Linnea",           element: "Geo",     weapon: "Bow",      release: 6.5 },
  { id: "nicole",      name: "Nicole",           element: "Pyro",    weapon: "Catalyst", release: 6.6 },
  { id: "lohen",       name: "Lohen",            element: "Cryo",    weapon: "Polearm",  release: 6.6 },
];

/* ---------- 4★ characters ----------
   debut: [version, phase] of the banner they premiered on (pinned rate-up).
   standardOnly: never appears on event banners. */
const FOUR_STARS = [
  { id: "amber",     name: "Amber",            element: "Pyro",    weapon: "Bow",      release: 1.0, standardOnly: true },
  { id: "kaeya",     name: "Kaeya",            element: "Cryo",    weapon: "Sword",    release: 1.0, standardOnly: true },
  { id: "lisa",      name: "Lisa",             element: "Electro", weapon: "Catalyst", release: 1.0, standardOnly: true },
  { id: "barbara",   name: "Barbara",          element: "Hydro",   weapon: "Catalyst", release: 1.0 },
  { id: "razor",     name: "Razor",            element: "Electro", weapon: "Claymore", release: 1.0 },
  { id: "xiangling", name: "Xiangling",        element: "Pyro",    weapon: "Polearm",  release: 1.0 },
  { id: "beidou",    name: "Beidou",           element: "Electro", weapon: "Claymore", release: 1.0 },
  { id: "xingqiu",   name: "Xingqiu",          element: "Hydro",   weapon: "Sword",    release: 1.0 },
  { id: "ningguang", name: "Ningguang",        element: "Geo",     weapon: "Catalyst", release: 1.0 },
  { id: "fischl",    name: "Fischl",           element: "Electro", weapon: "Bow",      release: 1.0 },
  { id: "bennett",   name: "Bennett",          element: "Pyro",    weapon: "Sword",    release: 1.0 },
  { id: "noelle",    name: "Noelle",           element: "Geo",     weapon: "Claymore", release: 1.0 },
  { id: "chongyun",  name: "Chongyun",         element: "Cryo",    weapon: "Claymore", release: 1.0 },
  { id: "sucrose",   name: "Sucrose",          element: "Anemo",   weapon: "Catalyst", release: 1.0 },
  { id: "diona",     name: "Diona",            element: "Cryo",    weapon: "Bow",      release: 1.1, debut: [1.1, 1] },
  { id: "xinyan",    name: "Xinyan",           element: "Pyro",    weapon: "Claymore", release: 1.1, debut: [1.1, 2] },
  { id: "rosaria",   name: "Rosaria",          element: "Cryo",    weapon: "Polearm",  release: 1.4, debut: [1.4, 1] },
  { id: "yanfei",    name: "Yanfei",           element: "Pyro",    weapon: "Catalyst", release: 1.5, debut: [1.5, 1] },
  { id: "sayu",      name: "Sayu",             element: "Anemo",   weapon: "Claymore", release: 2.0, debut: [2.0, 1] },
  { id: "sara",      name: "Kujou Sara",       element: "Electro", weapon: "Bow",      release: 2.1, debut: [2.1, 1] },
  { id: "thoma",     name: "Thoma",            element: "Pyro",    weapon: "Polearm",  release: 2.2, debut: [2.2, 2] },
  { id: "gorou",     name: "Gorou",            element: "Geo",     weapon: "Bow",      release: 2.3, debut: [2.3, 2] },
  { id: "yunjin",    name: "Yun Jin",          element: "Geo",     weapon: "Polearm",  release: 2.4, debut: [2.4, 1] },
  { id: "shinobu",   name: "Kuki Shinobu",     element: "Electro", weapon: "Sword",    release: 2.7, debut: [2.7, 2] },
  { id: "heizou",    name: "Shikanoin Heizou", element: "Anemo",   weapon: "Catalyst", release: 2.8, debut: [2.8, 1] },
  { id: "collei",    name: "Collei",           element: "Dendro",  weapon: "Bow",      release: 3.0, debut: [3.0, 1] },
  { id: "dori",      name: "Dori",             element: "Electro", weapon: "Claymore", release: 3.0, debut: [3.0, 2] },
  { id: "candace",   name: "Candace",          element: "Hydro",   weapon: "Polearm",  release: 3.1, debut: [3.1, 1] },
  { id: "layla",     name: "Layla",            element: "Cryo",    weapon: "Sword",    release: 3.2, debut: [3.2, 1] },
  { id: "faruzan",   name: "Faruzan",          element: "Anemo",   weapon: "Bow",      release: 3.3, debut: [3.3, 1] },
  { id: "yaoyao",    name: "Yaoyao",           element: "Dendro",  weapon: "Polearm",  release: 3.4, debut: [3.4, 1] },
  { id: "mika",      name: "Mika",             element: "Cryo",    weapon: "Polearm",  release: 3.5, debut: [3.5, 1] },
  { id: "kaveh",     name: "Kaveh",            element: "Dendro",  weapon: "Claymore", release: 3.6, debut: [3.6, 2] },
  { id: "kirara",    name: "Kirara",           element: "Dendro",  weapon: "Sword",    release: 3.7, debut: [3.7, 1] },
  { id: "lynette",   name: "Lynette",          element: "Anemo",   weapon: "Sword",    release: 4.0, debut: [4.0, 1] },
  { id: "freminet",  name: "Freminet",         element: "Cryo",    weapon: "Claymore", release: 4.0, debut: [4.0, 1] },
  { id: "charlotte", name: "Charlotte",        element: "Cryo",    weapon: "Catalyst", release: 4.2, debut: [4.2, 1] },
  { id: "chevreuse", name: "Chevreuse",        element: "Pyro",    weapon: "Polearm",  release: 4.3, debut: [4.3, 1] },
  { id: "gaming",    name: "Gaming",           element: "Pyro",    weapon: "Claymore", release: 4.4, debut: [4.4, 1] },
  { id: "sethos",    name: "Sethos",           element: "Electro", weapon: "Bow",      release: 4.6, debut: [4.6, 2] },
  { id: "kachina",   name: "Kachina",          element: "Geo",     weapon: "Polearm",  release: 5.0, debut: [5.0, 1] },
  { id: "ororon",    name: "Ororon",           element: "Electro", weapon: "Bow",      release: 5.1, debut: [5.1, 1] },
  { id: "lanyan",    name: "Lan Yan",          element: "Anemo",   weapon: "Catalyst", release: 5.3, debut: [5.3, 1] },
  { id: "iansan",    name: "Iansan",           element: "Electro", weapon: "Polearm",  release: 5.5, debut: [5.5, 1] },
  { id: "ifa",       name: "Ifa",              element: "Anemo",   weapon: "Catalyst", release: 5.6, debut: [5.6, 1] },
  { id: "dahlia",    name: "Dahlia",           element: "Hydro",   weapon: "Sword",    release: 5.6, debut: [5.6, 2] },
  { id: "aino",      name: "Aino",             element: "Hydro",   weapon: "Claymore", release: 6.0, debut: [6.0, 1] },
  { id: "jahoda",    name: "Jahoda",           element: "Anemo",   weapon: "Bow",      release: 6.2, debut: [6.2, 1] },
  { id: "illuga",    name: "Illuga",           element: "Cryo",    weapon: "Claymore", release: 6.3, debut: [6.3, 1] },
  { id: "prune",     name: "Prune",            element: "Anemo",   weapon: "Catalyst", release: 6.6, debut: [6.6, 1] },
];

/* ---------- Weapons ---------- */
const FIVE_STAR_WEAPONS = [
  { name: "Amos' Bow", weapon: "Bow" },
  { name: "Skyward Harp", weapon: "Bow" },
  { name: "Skyward Blade", weapon: "Sword" },
  { name: "Aquila Favonia", weapon: "Sword" },
  { name: "Skyward Pride", weapon: "Claymore" },
  { name: "Wolf's Gravestone", weapon: "Claymore" },
  { name: "Skyward Spine", weapon: "Polearm" },
  { name: "Primordial Jade Winged-Spear", weapon: "Polearm" },
  { name: "Skyward Atlas", weapon: "Catalyst" },
  { name: "Lost Prayer to the Sacred Winds", weapon: "Catalyst" },
];

const FOUR_STAR_WEAPONS = [
  { name: "The Flute", weapon: "Sword" },
  { name: "Sacrificial Sword", weapon: "Sword" },
  { name: "Lion's Roar", weapon: "Sword" },
  { name: "Favonius Sword", weapon: "Sword" },
  { name: "The Bell", weapon: "Claymore" },
  { name: "Sacrificial Greatsword", weapon: "Claymore" },
  { name: "Favonius Greatsword", weapon: "Claymore" },
  { name: "Rainslasher", weapon: "Claymore" },
  { name: "Dragon's Bane", weapon: "Polearm" },
  { name: "Favonius Lance", weapon: "Polearm" },
  { name: "The Widsith", weapon: "Catalyst" },
  { name: "Sacrificial Fragments", weapon: "Catalyst" },
  { name: "Eye of Perception", weapon: "Catalyst" },
  { name: "Favonius Codex", weapon: "Catalyst" },
  { name: "Rust", weapon: "Bow" },
  { name: "Sacrificial Bow", weapon: "Bow" },
  { name: "The Stringless", weapon: "Bow" },
  { name: "Favonius Warbow", weapon: "Bow" },
];

/* Signature 5★ weapons — weapon banner lineups are derived from the
   featured characters of the matching phase. Names marked (placeholder)
   are invented for characters whose real signature is unknown. */
const SIGNATURES = {
  venti:       { name: "Elegy for the End",                 weapon: "Bow" },
  klee:        { name: "Lost Prayer to the Sacred Winds",   weapon: "Catalyst" },
  tartaglia:   { name: "Polar Star",                        weapon: "Bow" },
  zhongli:     { name: "Vortex Vanquisher",                 weapon: "Polearm" },
  albedo:      { name: "Summit Shaper",                     weapon: "Sword" },
  ganyu:       { name: "Amos' Bow",                         weapon: "Bow" },
  xiao:        { name: "Primordial Jade Winged-Spear",      weapon: "Polearm" },
  keqing:      { name: "Primordial Jade Cutter",            weapon: "Sword" },
  hutao:       { name: "Staff of Homa",                     weapon: "Polearm" },
  eula:        { name: "Song of Broken Pines",              weapon: "Claymore" },
  kazuha:      { name: "Freedom-Sworn",                     weapon: "Sword" },
  ayaka:       { name: "Mistsplitter Reforged",             weapon: "Sword" },
  yoimiya:     { name: "Thundering Pulse",                  weapon: "Bow" },
  raiden:      { name: "Engulfing Lightning",               weapon: "Polearm" },
  kokomi:      { name: "Everlasting Moonglow",              weapon: "Catalyst" },
  itto:        { name: "Redhorn Stonethresher",             weapon: "Claymore" },
  shenhe:      { name: "Calamity Queller",                  weapon: "Polearm" },
  yae:         { name: "Kagura's Verity",                   weapon: "Catalyst" },
  ayato:       { name: "Haran Geppaku Futsu",               weapon: "Sword" },
  yelan:       { name: "Aqua Simulacra",                    weapon: "Bow" },
  tighnari:    { name: "Hunter's Path",                     weapon: "Bow" },
  cyno:        { name: "Staff of the Scarlet Sands",        weapon: "Polearm" },
  nilou:       { name: "Key of Khaj-Nisut",                 weapon: "Sword" },
  nahida:      { name: "A Thousand Floating Dreams",        weapon: "Catalyst" },
  wanderer:    { name: "Tulaytullah's Remembrance",         weapon: "Catalyst" },
  alhaitham:   { name: "Light of Foliar Incision",          weapon: "Sword" },
  dehya:       { name: "Beacon of the Reed Sea",            weapon: "Claymore" },
  baizhu:      { name: "Jadefall's Splendor",               weapon: "Catalyst" },
  lyney:       { name: "The First Great Magic",             weapon: "Bow" },
  neuvillette: { name: "Tome of the Eternal Flow",          weapon: "Catalyst" },
  wriothesley: { name: "Cashflow Supervision",              weapon: "Catalyst" },
  furina:      { name: "Splendor of Tranquil Waters",       weapon: "Sword" },
  navia:       { name: "Verdict",                           weapon: "Claymore" },
  xianyun:     { name: "Crane's Echoing Call",              weapon: "Catalyst" },
  chiori:      { name: "Uraku Misugiri",                    weapon: "Sword" },
  arlecchino:  { name: "Crimson Moon's Semblance",          weapon: "Polearm" },
  clorinde:    { name: "Absolution",                        weapon: "Sword" },
  sigewinne:   { name: "Silvershower Heartstrings",         weapon: "Bow" },
  emilie:      { name: "Lumidouce Elegy",                   weapon: "Polearm" },
  mualani:     { name: "Surf's Up",                         weapon: "Catalyst" },
  kinich:      { name: "Fang of the Mountain King",         weapon: "Claymore" },
  xilonen:     { name: "Peak Patrol Song",                  weapon: "Sword" },
  chasca:      { name: "Astral Vulture's Crimson Plumage",  weapon: "Bow" },
  mavuika:     { name: "A Thousand Blazing Suns",           weapon: "Claymore" },
  citlali:     { name: "Starcaller's Watch",                weapon: "Catalyst" },
  mizuki:      { name: "Sunny Morning Sleep-In",            weapon: "Catalyst" },
  varesa:      { name: "Vivid Notions",                     weapon: "Catalyst" },
  escoffier:   { name: "Symphonist of Scents",              weapon: "Polearm" },
  skirk:       { name: "Azurelight",                        weapon: "Sword" },
  ineffa:      { name: "Fractured Halo",                    weapon: "Polearm" },
  lauma:       { name: "Nightweaver's Looking Glass",       weapon: "Catalyst" },
  flins:       { name: "Serenity of the Sealed Moon",       weapon: "Polearm" },  // placeholder
  nefer:       { name: "Reliquary of Truth",                weapon: "Catalyst" },
  durin:       { name: "Ashen Dragonheart",                 weapon: "Sword" },    // placeholder
  columbina:   { name: "Lullaby of the Veiled Star",        weapon: "Catalyst" }, // placeholder
  zibai:       { name: "Pillar of Hidden Jade",             weapon: "Sword" },    // placeholder
  varka:       { name: "Howl of the Northern Gale",         weapon: "Claymore" }, // placeholder
  linnea:      { name: "Tidesong of Dawn",                  weapon: "Bow" },      // placeholder
  nicole:      { name: "Aria of Falling Frost",             weapon: "Catalyst" }, // placeholder
  lohen:       { name: "Frostbound Oath",                   weapon: "Polearm" },  // placeholder
};

const THREE_STAR_WEAPONS = [
  { name: "Cool Steel", weapon: "Sword" },
  { name: "Harbinger of Dawn", weapon: "Sword" },
  { name: "Skyrider Sword", weapon: "Sword" },
  { name: "Bloodtainted Greatsword", weapon: "Claymore" },
  { name: "Debate Club", weapon: "Claymore" },
  { name: "Ferrous Shadow", weapon: "Claymore" },
  { name: "Black Tassel", weapon: "Polearm" },
  { name: "White Tassel", weapon: "Polearm" },
  { name: "Magic Guide", weapon: "Catalyst" },
  { name: "Thrilling Tales of Dragon Slaying", weapon: "Catalyst" },
  { name: "Emerald Orb", weapon: "Catalyst" },
  { name: "Slingshot", weapon: "Bow" },
  { name: "Sharpshooter's Oath", weapon: "Bow" },
  { name: "Raven Bow", weapon: "Bow" },
];

/* ---------- Version display names ---------- */
const VERSION_NAMES = {
  "6.0": "Luna I", "6.1": "Luna II", "6.2": "Luna III", "6.3": "Luna IV",
  "6.4": "Luna V", "6.5": "Luna VI", "6.6": "Luna VII",
};

const VERSION_REGIONS = [
  [1.0, "Mondstadt & Liyue"], [2.0, "Inazuma"], [3.0, "Sumeru"],
  [4.0, "Fontaine"], [5.0, "Natlan"], [6.0, "Nod-Krai"],
];

/* ---------- Character event banners ----------
   [version, phase, [featured 5★ ids]] */
const EVENT_BANNERS_RAW = [
  ["1.0", 1, ["venti"]],            ["1.0", 2, ["klee"]],
  ["1.1", 1, ["tartaglia"]],        ["1.1", 2, ["zhongli"]],
  ["1.2", 1, ["albedo"]],           ["1.2", 2, ["ganyu"]],
  ["1.3", 1, ["xiao"]],             ["1.3", 2, ["keqing"]],          ["1.3", 3, ["hutao"]],
  ["1.4", 1, ["venti"]],            ["1.4", 2, ["tartaglia"]],
  ["1.5", 1, ["zhongli"]],          ["1.5", 2, ["eula"]],
  ["1.6", 1, ["klee"]],             ["1.6", 2, ["kazuha"]],
  ["2.0", 1, ["ayaka"]],            ["2.0", 2, ["yoimiya"]],
  ["2.1", 1, ["raiden"]],           ["2.1", 2, ["kokomi"]],
  ["2.2", 1, ["tartaglia"]],        ["2.2", 2, ["hutao"]],
  ["2.3", 1, ["albedo", "eula"]],   ["2.3", 2, ["itto"]],
  ["2.4", 1, ["shenhe", "xiao"]],   ["2.4", 2, ["zhongli", "ganyu"]],
  ["2.5", 1, ["yae"]],              ["2.5", 2, ["raiden", "kokomi"]],
  ["2.6", 1, ["ayato", "venti"]],   ["2.6", 2, ["ayaka"]],
  ["2.7", 1, ["yelan", "xiao"]],    ["2.7", 2, ["itto"]],
  ["2.8", 1, ["kazuha", "klee"]],   ["2.8", 2, ["yoimiya"]],
  ["3.0", 1, ["tighnari", "zhongli"]], ["3.0", 2, ["ganyu", "kokomi"]],
  ["3.1", 1, ["cyno", "venti"]],    ["3.1", 2, ["nilou", "albedo"]],
  ["3.2", 1, ["nahida", "yoimiya"]],["3.2", 2, ["yae", "tartaglia"]],
  ["3.3", 1, ["wanderer", "itto"]], ["3.3", 2, ["raiden", "ayato"]],
  ["3.4", 1, ["alhaitham", "xiao"]],["3.4", 2, ["hutao", "yelan"]],
  ["3.5", 1, ["dehya", "cyno"]],    ["3.5", 2, ["shenhe", "ayaka"]],
  ["3.6", 1, ["nahida", "nilou"]],  ["3.6", 2, ["baizhu", "ganyu"]],
  ["3.7", 1, ["yoimiya", "yae"]],   ["3.7", 2, ["alhaitham", "kazuha"]],
  ["3.8", 1, ["eula", "klee"]],     ["3.8", 2, ["kokomi", "wanderer"]],
  ["4.0", 1, ["lyney", "yelan"]],   ["4.0", 2, ["zhongli", "tartaglia"]],
  ["4.1", 1, ["neuvillette", "hutao"]], ["4.1", 2, ["wriothesley", "venti"]],
  ["4.2", 1, ["furina", "baizhu"]], ["4.2", 2, ["cyno", "ayato"]],
  ["4.3", 1, ["navia", "ayaka"]],   ["4.3", 2, ["raiden", "yoimiya"]],
  ["4.4", 1, ["xianyun", "nahida"]],["4.4", 2, ["xiao", "yae"]],
  ["4.5", 1, ["chiori", "itto"]],   ["4.5", 2, ["neuvillette", "kazuha"]],
  ["4.6", 1, ["arlecchino", "lyney"]], ["4.6", 2, ["wanderer", "baizhu"]],
  ["4.7", 1, ["clorinde", "alhaitham"]], ["4.7", 2, ["sigewinne", "furina"]],
  ["4.8", 1, ["navia", "nilou"]],   ["4.8", 2, ["emilie", "yelan"]],
  ["5.0", 1, ["mualani", "kazuha"]],["5.0", 2, ["kinich", "raiden"]],
  ["5.1", 1, ["xilonen", "chiori"]],["5.1", 2, ["nahida", "hutao"]],
  ["5.2", 1, ["chasca", "lyney"]],  ["5.2", 2, ["zhongli", "neuvillette"]],
  ["5.3", 1, ["mavuika", "citlali"]], ["5.3", 2, ["arlecchino", "clorinde"]],
  ["5.4", 1, ["mizuki", "sigewinne"]], ["5.4", 2, ["furina", "wriothesley"]],
  ["5.5", 1, ["varesa", "xianyun"]],["5.5", 2, ["xilonen", "venti"]],
  ["5.6", 1, ["escoffier", "navia"]], ["5.6", 2, ["kinich", "raiden"]],
  ["5.7", 1, ["skirk", "shenhe"]],  ["5.7", 2, ["mavuika", "emilie"]],
  ["5.8", 1, ["ineffa", "citlali"]],["5.8", 2, ["mualani", "chasca"]],
  ["6.0", 1, ["lauma", "nahida"]],  ["6.0", 2, ["flins", "yelan"]],
  ["6.1", 1, ["nefer", "furina"]],  ["6.1", 2, ["arlecchino", "zhongli"]],
  ["6.2", 1, ["durin", "venti"]],   ["6.2", 2, ["varesa", "xilonen"]],
  ["6.3", 1, ["columbina", "ineffa"]], ["6.3", 2, ["zibai", "neuvillette"]],
  ["6.4", 1, ["varka", "flins"]],   ["6.4", 2, ["skirk", "escoffier"]],
  ["6.5", 1, ["linnea", "chasca"]], ["6.5", 2, ["lauma", "nefer"]],
  ["6.6", 1, ["nicole", "durin"]],  ["6.6", 2, ["lohen", "mavuika"]],
];

/* ============================================================
   Derived lookups & helpers
   ============================================================ */

const CHAR_BY_ID = {};
FIVE_STARS.forEach(c => { c.rarity = 5; CHAR_BY_ID[c.id] = c; });
FOUR_STARS.forEach(c => { c.rarity = 4; CHAR_BY_ID[c.id] = c; });

function versionLabel(ver) {
  return VERSION_NAMES[ver] ? `${VERSION_NAMES[ver]} (${ver})` : `Version ${ver}`;
}

function regionOf(sort) {
  let r = VERSION_REGIONS[0][1];
  for (const [v, name] of VERSION_REGIONS) if (sort >= v) r = name;
  return r;
}

/* deterministic PRNG for synthetic 4★ lineups */
function strHash(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* a 4★ is in circulation for a banner if it debuted on an earlier
   banner (or this exact one) */
function fourStarAvailable(c, sort, phase, forFeatured) {
  if (c.standardOnly) return false;
  if (!c.debut) return c.release <= sort;
  const [dv, dp] = c.debut;
  if (dv < sort) return true;
  if (dv === sort) return forFeatured ? dp <= phase : dp < phase || dp <= phase;
  return false;
}

/* Featured 4★ trio: pinned debutants + deterministic era-appropriate fill.
   (Historical 4★ lineups are approximated — see README.) */
function featuredFourStars(banner) {
  const pinned = FOUR_STARS.filter(c =>
    c.debut && c.debut[0] === banner.sort && c.debut[1] === banner.phase);
  const picked = pinned.map(c => c.id);
  const pool = FOUR_STARS.filter(c =>
    !picked.includes(c.id) && !c.standardOnly &&
    (c.debut ? (c.debut[0] < banner.sort || (c.debut[0] === banner.sort && c.debut[1] < banner.phase)) : c.release <= banner.sort));
  const rng = mulberry32(strHash(banner.key));
  while (picked.length < 3 && pool.length) {
    const i = Math.floor(rng() * pool.length);
    picked.push(pool.splice(i, 1)[0].id);
  }
  return picked;
}

/* Build the banner list */
const EVENT_BANNERS = EVENT_BANNERS_RAW.map(([ver, phase, five]) => {
  const sort = parseFloat(ver);
  const b = {
    key: `${ver}-${phase}`,
    type: "event",
    ver, phase, sort,
    five,
    name: five.map(id => CHAR_BY_ID[id].name).join(" & "),
  };
  b.four = featuredFourStars(b);
  return b;
});

const BANNER_BY_KEY = {};
EVENT_BANNERS.forEach(b => { BANNER_BY_KEY[b.key] = b; });

/* ---------- Weapon banners (Epitome Invocation) ----------
   One per phase: the featured characters' signature weapons, padded to two
   with a deterministic standard pick; five featured 4★ weapons. */
const WEAPON_BANNERS = EVENT_BANNERS.map(b => {
  const rng = mulberry32(strHash("w" + b.key));
  const five = b.five.map(id => SIGNATURES[id]).filter(Boolean).slice(0, 2);
  const pad5 = FIVE_STAR_WEAPONS.filter(w => !five.some(f => f.name === w.name));
  while (five.length < 2 && pad5.length)
    five.push(pad5.splice(Math.floor(rng() * pad5.length), 1)[0]);
  const pool4 = FOUR_STAR_WEAPONS.slice();
  const four = [];
  while (four.length < 5 && pool4.length)
    four.push(pool4.splice(Math.floor(rng() * pool4.length), 1)[0]);
  return {
    key: "w" + b.key,
    type: "weapon",
    ver: b.ver, phase: b.phase, sort: b.sort,
    five, four,
    name: "Epitome Invocation",
  };
});
WEAPON_BANNERS.forEach(b => { BANNER_BY_KEY[b.key] = b; });

/* name → rarity/type lookup for display */
const WEAPON_INFO = {};
THREE_STAR_WEAPONS.forEach(w => { WEAPON_INFO[w.name] = { rarity: 3, type: w.weapon }; });
FOUR_STAR_WEAPONS.forEach(w => { WEAPON_INFO[w.name] = { rarity: 4, type: w.weapon }; });
FIVE_STAR_WEAPONS.forEach(w => { WEAPON_INFO[w.name] = { rarity: 5, type: w.weapon }; });
Object.values(SIGNATURES).forEach(w => { WEAPON_INFO[w.name] = { rarity: 5, type: w.weapon }; });

/* Standard banner (era-aware pools are computed in gacha.js) */
const STANDARD_BANNER = {
  key: "standard",
  type: "standard",
  name: "Wanderlust Invocation",
  ver: "—", phase: 0, sort: Infinity,
  five: [], four: [],
};
BANNER_BY_KEY.standard = STANDARD_BANNER;

/* Pools for the standard banner / losing the 50-50, era-filtered */
function standardFiveStarChars(sort) {
  return FIVE_STARS.filter(c => c.standard && (c.standardFrom || c.release) <= sort);
}
function standardFourStarChars(sort) {
  return FOUR_STARS.filter(c => c.release < sort || (c.release <= sort && !c.debut));
}

const ALL_VERSIONS = [...new Set(EVENT_BANNERS.map(b => b.ver))];
