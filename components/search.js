// Shared product-search logic used by the products page and the header autocomplete.
// Goals: word-order independent, synonym aware, typo tolerant, relevance ranked,
// and tolerant of how people actually type product codes (spaces or not).

// Phrases normalised before tokenising (two-word variants -> canonical single term).
const PHRASES = [
  ["key chain", "keyring"],
  ["key ring", "keyring"],
  ["note book", "notebook"],
  ["gift boxes", "giftbox"],
  ["gift box", "giftbox"],
  ["gift sets", "giftset"],
  ["gift set", "giftset"],
  ["touch pen", "stylus"],
  ["water bottle", "bottle"],
];

// Single-token synonyms -> extra words to also look for in the product data.
const SYNONYMS = {
  keychain: ["keyring"],
  keychains: ["keyring"],
  keyrings: ["keyring"],
  keyring: ["keyring"],
  fob: ["keyring"],
  biro: ["pen"],
  biros: ["pen"],
  ballpoint: ["pen"],
  ballpen: ["pen"],
  pens: ["pen"],
  journal: ["notebook", "diary"],
  jotter: ["notebook"],
  notepad: ["notebook"],
  notepads: ["notebook"],
  notebooks: ["notebook"],
  diary: ["diary", "notebook"],
  diaries: ["diary", "notebook"],
  tote: ["bag"],
  totes: ["bag"],
  bags: ["bag"],
  shopper: ["bag"],
  rucksack: ["bag", "backpack"],
  giftbox: ["giftbox", "box"],
  giftset: ["giftset", "set", "combo"],
  presentation: ["giftbox", "box"],
  recycled: ["eco"],
  sustainable: ["eco"],
  bamboo: ["bamboo", "eco"],
  cork: ["cork", "eco"],
  combo: ["set", "combo", "giftset"],
  bundle: ["set", "giftset"],
  metallic: ["metal"],
};

// Friendly keywords appended to each product's searchable text, by category,
// so the terms people actually type ("keyring", "tote", "diary", "gift set")
// match even when they are not in the product name.
const CATEGORY_KEYWORDS = {
  Pen: "pen pens biro ballpoint",
  Notebook: "notebook notepad journal diary",
  "Key Ring": "keyring keyrings keychain fob",
  Bags: "bag bags",
  "Combo Sets": "giftset gift set combo bundle",
  "Gift Boxes": "giftbox gift box presentation pouch",
};

const COLOURS = [
  "black", "blue", "red", "white", "grey", "gold", "rose gold", "brown",
  "green", "silver", "navy", "maroon", "purple", "orange", "yellow", "pink",
];

const COLLAPSE = /[^a-z0-9]+/g;

// Derive the product's real attributes (material, finish, size, set contents,
// pen/bag type) as search keywords, so a shopper finds "metal pen" even when
// the product name never says "metal", or "a5 diary set", "leather keyring",
// "jute bag", "stylus" and so on.
function deriveKeywords(p) {
  const n = (p.name || "").toLowerCase();
  const cat = p.category;
  const out = [];
  COLOURS.forEach((c) => { if (n.includes(c)) out.push(c); });
  const eco = /eco|bamboo|cork|jute|cotton|canvas|paper|recycl|wheat|kraft/.test(n);
  if (eco) out.push("eco", "sustainable", "recycled");

  if (cat === "Pen") {
    if (p.id && p.id.startsWith("MP")) out.push("metal");
    else if (/\bmetal\b|bullet|aluminium|brass|stainless/.test(n)) out.push("metal");
    else if (/bamboo|wheat|cork|recycl|eco/.test(n)) out.push("eco", "bamboo", "wooden");
    else out.push("plastic");
    if (/stylus/.test(n)) out.push("stylus", "touchscreen", "touch");
  } else if (cat === "Bags") {
    if (/jute/.test(n)) out.push("jute", "hessian");
    if (/cotton|canvas/.test(n)) out.push("cotton", "canvas", "tote");
    if (/nylon/.test(n)) out.push("nylon", "foldable");
    if (/paper/.test(n)) out.push("paper");
    if (/non.?woven/.test(n)) out.push("nonwoven", "non woven");
    if (/drawstring/.test(n)) out.push("drawstring");
  } else if (cat === "Key Ring") {
    if (/leather/.test(n)) out.push("leather"); else out.push("metal");
  } else if (cat === "Notebook") {
    if (/\ba5\b/.test(n)) out.push("a5");
    if (/\ba6\b/.test(n)) out.push("a6");
    if (/pocket/.test(n)) out.push("pocket");
    if (/spiral/.test(n)) out.push("spiral");
    if (/elastic/.test(n)) out.push("elastic");
    if (/bamboo|cork|recycl|kraft|eco/.test(n)) out.push("eco"); else out.push("pu", "leatherette");
  } else if (cat === "Combo Sets") {
    if (n.includes("2-in-1")) out.push("2-in-1", "2 in 1");
    if (n.includes("3-in-1")) out.push("3-in-1", "3 in 1");
    if (n.includes("4-in-1")) out.push("4-in-1", "4 in 1");
    out.push("diary", "pen", "corporate", "executive");
    if (/keyring/.test(n)) out.push("keyring");
    if (/card/.test(n)) out.push("card holder", "cardholder");
  }
  return out.join(" ");
}

export function normaliseQuery(q) {
  let s = (q || "").toLowerCase().trim();
  for (const [from, to] of PHRASES) s = s.split(from).join(to);
  return s;
}

export function tokenise(q) {
  return normaliseQuery(q).split(/\s+/).filter(Boolean);
}

// Collapse to bare alphanumerics, e.g. "JB 02" / "jb-02" -> "jb02".
export function collapseCode(s) {
  return (s || "").toLowerCase().replace(COLLAPSE, "");
}

// Build the full searchable text for a product. Includes the name, category,
// the product code both as-is and collapsed (no spaces), and friendly
// category keywords so common search words resolve to the right items.
export function buildHaystack(p) {
  const code = p.sku || p.id || "";
  const parts = [
    p.name || "",
    p.category || "",
    code,
    code.replace(/\s+/g, ""), // collapsed code, e.g. "jb02"
    CATEGORY_KEYWORDS[p.category] || "",
    deriveKeywords(p),
  ];
  return parts.join(" ");
}

// Candidate strings a single typed token should match against.
function expandToken(t) {
  const out = new Set([t]);
  (SYNONYMS[t] || []).forEach((x) => out.add(x));
  if (t.length > 3 && t.endsWith("s")) out.add(t.slice(0, -1)); // depluralise
  return Array.from(out);
}

// Bounded Levenshtein distance (returns early once it exceeds max).
function withinEditDistance(a, b, max) {
  const al = a.length;
  const bl = b.length;
  if (Math.abs(al - bl) > max) return false;
  let prev = Array.from({ length: bl + 1 }, (_, i) => i);
  for (let i = 1; i <= al; i++) {
    let best = max + 1;
    const cur = [i];
    for (let j = 1; j <= bl; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      cur[j] = v;
      if (v < best) best = v;
    }
    if (best > max) return false;
    prev = cur;
  }
  return prev[bl] <= max;
}

function fuzzyThreshold(token) {
  if (/\d/.test(token)) return 0; // codes and sizes: match exactly, no guessing
  const len = token.length;
  if (len >= 7) return 2;
  if (len >= 4) return 1;
  return 0;
}

// Does one typed token match a haystack (by substring, synonym, collapsed
// code, or typo)?
function tokenMatches(hay, words, collapsed, token) {
  for (const c of expandToken(token)) {
    if (hay.includes(c)) return true;
  }
  // Product codes / sizes: compare ignoring spaces and punctuation, so
  // "jb02", "jb 02", "JB-02" and "sr218" all find the right product.
  if (/\d/.test(token)) {
    const ct = collapseCode(token);
    if (ct && collapsed.includes(ct)) return true;
  }
  const max = fuzzyThreshold(token);
  if (max > 0) {
    for (const w of words) {
      if (Math.abs(w.length - token.length) > max) continue;
      if (withinEditDistance(w, token, max)) return true;
    }
  }
  return false;
}

// True when every typed word matches somewhere in the haystack.
export function searchMatches(haystack, query) {
  const hs = (haystack || "").toLowerCase();
  const words = hs.split(/[^a-z0-9]+/).filter(Boolean);
  const collapsed = hs.replace(COLLAPSE, "");
  const terms = tokenise(query);
  if (!terms.length) return true;
  return terms.every((t) => tokenMatches(hs, words, collapsed, t));
}

const POPULAR = new Set([
  "P77", "MP10", "MP03", "D184", "D200", "KC01", "Sr 159", "Sr 231", "JB 02",
]);

// Relevance score so the best matches sort to the top when searching.
export function scoreProduct(p, query) {
  const q = normaliseQuery(query);
  const name = (p.name || "").toLowerCase();
  const cat = (p.category || "").toLowerCase();
  const code = (p.sku || p.id || "").toLowerCase();
  const codeCollapsed = collapseCode(code);
  const qCollapsed = collapseCode(query);
  const words = name.split(/[^a-z0-9]+/).filter(Boolean);
  const terms = tokenise(query);
  let score = 0;

  // Exact / prefix product-code match ranks to the very top.
  if (codeCollapsed && qCollapsed) {
    if (codeCollapsed === qCollapsed) score += 200;
    else if (/\d/.test(qCollapsed) && codeCollapsed.startsWith(qCollapsed)) score += 90;
  }

  if (q && name.startsWith(q)) score += 100;
  if (q && name.includes(q)) score += 40;
  for (const t of terms) {
    let hit = false;
    for (const c of expandToken(t)) {
      if (name.includes(c)) { score += 10; hit = true; break; }
    }
    if (!hit) {
      for (const c of expandToken(t)) {
        if (cat.includes(c)) { score += 4; hit = true; break; }
      }
    }
    if (!hit && /\d/.test(t) && codeCollapsed.includes(collapseCode(t))) { score += 6; hit = true; }
    if (!hit) {
      const max = fuzzyThreshold(t);
      if (max > 0 && words.some((w) => withinEditDistance(w, t, max))) score += 2;
    }
  }
  if (POPULAR.has(p.id)) score += 5;
  return score;
}
