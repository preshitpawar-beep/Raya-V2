// Colour and material options used by the product filters, product pages and search.
// Each product in productsData.js lists its own colours, materials (filter keys) and a
// material line for the product page. Keep keys here in step with that data.

export const COLOUR_OPTIONS = [
  { key: "black", label: "Black", swatch: "#111111" },
  { key: "white", label: "White", swatch: "#FFFFFF" },
  { key: "grey", label: "Grey", swatch: "#8E8E8E" },
  { key: "silver", label: "Silver", swatch: "#C9CDD2" },
  { key: "gold", label: "Gold", swatch: "#C9A23F" },
  { key: "rosegold", label: "Rose gold", swatch: "#C98F7A" },
  { key: "navy", label: "Navy", swatch: "#1F2A5A" },
  { key: "blue", label: "Blue", swatch: "#2F6FD6" },
  { key: "green", label: "Green", swatch: "#2E7D4F" },
  { key: "red", label: "Red", swatch: "#D7263D" },
  { key: "maroon", label: "Maroon", swatch: "#7A1F2B" },
  { key: "pink", label: "Pink", swatch: "#F2A7B8" },
  { key: "purple", label: "Purple", swatch: "#8E6CC0" },
  { key: "orange", label: "Orange", swatch: "#E8772E" },
  { key: "tan", label: "Tan", swatch: "#C68B59" },
  { key: "brown", label: "Brown", swatch: "#6B4226" },
  { key: "beige", label: "Beige & natural", swatch: "#E6D8BD" },
  { key: "multi", label: "Multicolour", swatch: "" },
];

export const MATERIAL_OPTIONS = [
  { key: "plastic", label: "Plastic" },
  { key: "metal", label: "Metal" },
  { key: "leather", label: "Leather" },
  { key: "pu", label: "PU leather (faux)" },
  { key: "cotton", label: "Cotton & canvas" },
  { key: "jute", label: "Jute" },
  { key: "nylon", label: "Nylon" },
  { key: "paper", label: "Paper & card" },
  { key: "bamboo", label: "Bamboo & wood" },
  { key: "cork", label: "Cork" },
  { key: "velvet", label: "Velvet" },
];

const COLOUR_MAP = Object.fromEntries(COLOUR_OPTIONS.map((c) => [c.key, c]));
const MATERIAL_MAP = Object.fromEntries(MATERIAL_OPTIONS.map((m) => [m.key, m]));

export const colourLabel = (key) => (COLOUR_MAP[key] ? COLOUR_MAP[key].label : key);
export const materialLabel = (key) => (MATERIAL_MAP[key] ? MATERIAL_MAP[key].label : key);

// Readable list of a product's colours, e.g. "Black, Gold".
export const colourList = (p) => (p.colours || []).filter((c) => c !== "multi").map(colourLabel).join(", ");

// Search words for a product's colours and materials (labels plus a few common synonyms).
const COLOUR_WORDS = { navy: "navy blue", grey: "grey gray charcoal", silver: "silver chrome", rosegold: "rose gold rosegold copper", beige: "beige natural cream", multi: "multicolour multicolor mixed assorted", tan: "tan", maroon: "maroon burgundy" };
const MATERIAL_WORDS = { leather: "leather genuine", pu: "pu faux leatherette vegan", cotton: "cotton canvas", paper: "paper card kraft", bamboo: "bamboo wood wooden" };
export const attributeKeywords = (p) => [
  ...(p.colours || []).map((c) => COLOUR_WORDS[c] || c),
  ...(p.materials || []).map((m) => MATERIAL_WORDS[m] || m),
].join(" ");

// Factual badge (replaces the old "Eco" badge, which was a broad green claim):
// shown only when the product is made with a natural material.
const NATURAL = ["jute", "cotton", "bamboo", "cork"];
export const isNaturalMaterial = (p) =>
  (p.materials || []).some((m) => NATURAL.includes(m)) || /kraft/i.test(p.material || "");

// Category landing page for breadcrumbs and internal links.
export const CATEGORY_COLLECTION = {
  Pen: "promotional-pens",
  Notebook: "branded-notebooks",
  "Key Ring": "branded-keyrings",
  "Combo Sets": "corporate-gift-sets",
  Bags: "branded-tote-bags",
  "Gift Boxes": "pen-gift-boxes",
  "Card Holders & Organisers": "branded-card-holders-organisers",
};

// Singular, human label for one product of a category (used in page titles).
export const categoryLabel = (p) => {
  if (p.category === "Card Holders & Organisers") return p.id.startsWith("OR") ? "Organiser" : "Business Card Holder";
  return {
    Pen: "Pen", Notebook: "Notebook", "Key Ring": "Keyring", "Combo Sets": "Gift Set",
    Bags: "Bag", "Gift Boxes": "Pen Gift Box",
  }[p.category] || p.category;
};

// ---------------- New products ----------------
// Products carry an "addedOn" date (YYYY-MM-DD) when they join the range. They count as
// "New" for NEW_WINDOW_DAYS days, then drop out of the New in section on their own.
export const NEW_WINDOW_DAYS = 90;
const DAY = 24 * 60 * 60 * 1000;
export const isNewProduct = (p, now = Date.now()) =>
  Boolean(p.addedOn) && now - new Date(p.addedOn).getTime() < NEW_WINDOW_DAYS * DAY;

// Plural, shopper-facing name for a category (for "New card holders" style copy).
export const categoryPlural = (cat) =>
  ({
    Pen: "pens", Notebook: "notebooks", "Key Ring": "keyrings", "Combo Sets": "gift sets",
    Bags: "bags", "Gift Boxes": "pen gift boxes", "Card Holders & Organisers": "card holders & organisers",
  }[cat] || cat.toLowerCase());
