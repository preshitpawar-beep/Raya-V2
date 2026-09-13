// Shared product-search logic used by the products page and the header autocomplete.
// Goals: word-order independent, synonym aware, typo tolerant, and relevance ranked,
// so it behaves like a normal ecommerce search.

// Phrases normalised before tokenising (two-word variants -> canonical single term).
const PHRASES = [
  ["key chain", "keyring"],
  ["key ring", "keyring"],
  ["note book", "notebook"],
  ["gift boxes", "gift box"],
  ["touch pen", "stylus"],
  ["water bottle", "bottle"],
];

// Single-token synonyms -> extra words to also look for in the product data.
const SYNONYMS = {
  keychain: ["keyring"],
  keychains: ["keyring"],
  keyrings: ["keyring"],
  fob: ["keyring"],
  biro: ["pen"],
  biros: ["pen"],
  ballpoint: ["pen"],
  ballpen: ["pen"],
  journal: ["notebook", "diary"],
  jotter: ["notebook"],
  notepad: ["notebook"],
  notepads: ["notebook"],
  diary: ["notebook"],
  diaries: ["diary", "notebook"],
  tote: ["bag"],
  totes: ["bag"],
  shopper: ["bag"],
  rucksack: ["bag", "backpack"],
  giftbox: ["gift", "box"],
  presentation: ["gift", "box"],
  recycled: ["eco"],
  sustainable: ["eco"],
  bamboo: ["bamboo", "eco"],
  cork: ["cork", "eco"],
  combo: ["set", "combo"],
  bundle: ["set"],
};

export function normaliseQuery(q) {
  let s = (q || "").toLowerCase().trim();
  for (const [from, to] of PHRASES) s = s.split(from).join(to);
  return s;
}

export function tokenise(q) {
  return normaliseQuery(q).split(/\s+/).filter(Boolean);
}

// Candidate strings a single typed token should match against.
function expandToken(t) {
  const out = new Set([t]);
  (SYNONYMS[t] || []).forEach((x) => out.add(x));
  // simple depluralisation fallback
  if (t.length > 3 && t.endsWith("s")) out.add(t.slice(0, -1));
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
  if (/\d/.test(token)) return 0; // product codes and sizes: match exactly, no guessing
  const len = token.length;
  if (len >= 7) return 2;
  if (len >= 4) return 1;
  return 0; // too short to guess typos safely
}

// Does one typed token match a haystack (by substring, synonym, or typo)?
function tokenMatches(haystack, words, token) {
  const cands = expandToken(token);
  for (const c of cands) {
    if (haystack.includes(c)) return true;
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
  const terms = tokenise(query);
  if (!terms.length) return true;
  return terms.every((t) => tokenMatches(hs, words, t));
}

const POPULAR = new Set([
  "P77", "MP10", "MP03", "D184", "D200", "KC01", "Sr 159", "Sr 231", "JB 02",
]);

// Relevance score so the best matches sort to the top when searching.
export function scoreProduct(p, query) {
  const q = normaliseQuery(query);
  const name = (p.name || "").toLowerCase();
  const cat = (p.category || "").toLowerCase();
  const sku = (p.sku || "").toLowerCase();
  const words = name.split(/[^a-z0-9]+/).filter(Boolean);
  const terms = tokenise(query);
  let score = 0;
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
    if (!hit && sku.includes(t)) { score += 6; hit = true; }
    if (!hit) {
      const max = fuzzyThreshold(t);
      if (max > 0 && words.some((w) => withinEditDistance(w, t, max))) score += 2;
    }
  }
  if (POPULAR.has(p.id)) score += 5;
  return score;
}
