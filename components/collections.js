// Collection / landing pages targeting real buyer searches (e.g. "blue promotional pens").
// Used by the /collections/[slug] route, the sitemap, and the homepage shop strip.
import { products } from "./productsData";
import { isNewProduct, categoryPlural } from "./productAttributes";

// "a, b and c"
const listJoin = (arr) => (arr.length < 2 ? arr.join("") : `${arr.slice(0, -1).join(", ")} and ${arr[arr.length - 1]}`);
// Categories in the current New In batch, biggest first, so the copy never goes stale.
const newCategories = (() => {
  const counts = {};
  products.filter((p) => isNewProduct(p)).forEach((p) => { counts[p.category] = (counts[p.category] || 0) + 1; });
  return Object.keys(counts).sort((a, b) => counts[b] - counts[a]).map(categoryPlural);
})();

export const COLLECTIONS = [
  {
    slug: "new-products",
    title: "New In",
    h1: "New Promotional Products",
    intro:
      `The latest additions to our range${newCategories.length ? `, including new ${listJoin(newCategories)}` : ""}, all ready for your logo. One branding method, a free digital proof and no setup fees are included, with low minimums from 50 units.`,
    match: (p) => isNewProduct(p),
  },
  {
    slug: "promotional-pens",
    title: "Promotional Pens",
    h1: "Branded Promotional Pens",
    intro:
      "Custom promotional pens printed with your logo. Plastic, metal and bamboo options, with one branding method included, no setup fees and free digital proofs. A cost-effective giveaway for events, offices and corporate gifts across the UK.",
    match: (p) => p.category === "Pen",
  },
  {
    slug: "metal-promotional-pens",
    title: "Metal Promotional Pens",
    h1: "Metal Promotional Pens",
    intro:
      "Premium metal promotional pens engraved or printed with your logo. A weightier, higher-perceived-value pen ideal for executive gifts and client giveaways.",
    match: (p) => p.category === "Pen" && p.id.startsWith("MP"),
  },
  {
    slug: "eco-promotional-pens",
    title: "Eco Promotional Pens",
    h1: "Bamboo & Natural Material Promotional Pens",
    intro:
      "Branded pens with a natural bamboo barrel, for businesses that prefer natural materials over plastic. One branding method, a free digital proof and no setup fees are all included.",
    match: (p) => p.category === "Pen" && (p.materials || []).some((m) => ["bamboo", "cork", "paper"].includes(m)),
  },
  {
    slug: "blue-promotional-pens",
    title: "Blue Promotional Pens",
    h1: "Blue Branded Promotional Pens",
    intro:
      "Blue promotional pens printed with your logo. Browse our blue branded pens, with branding and free digital proofs included.",
    match: (p) => p.category === "Pen" && (p.colours || []).some((c) => c === "blue" || c === "navy"),
  },
  {
    slug: "black-promotional-pens",
    title: "Black Promotional Pens",
    h1: "Black Branded Promotional Pens",
    intro:
      "Classic black promotional pens branded with your logo. A smart, professional giveaway that suits any brand.",
    match: (p) => p.category === "Pen" && (p.colours || []).includes("black"),
  },
  {
    slug: "red-promotional-pens",
    title: "Red Promotional Pens",
    h1: "Red Branded Promotional Pens",
    intro:
      "Red promotional pens printed with your logo. Bright, eye-catching branded pens with branding included.",
    match: (p) => p.category === "Pen" && (p.colours || []).some((c) => c === "red" || c === "maroon"),
  },
  {
    slug: "branded-notebooks",
    title: "Branded Notebooks",
    h1: "Branded & Custom Notebooks",
    intro:
      "Custom notebooks printed or debossed with your logo. A5 notebooks with PU (faux leather), cork and bamboo covers, ideal for events, onboarding packs and corporate gifts.",
    match: (p) => p.category === "Notebook",
  },
  {
    slug: "branded-tote-bags",
    title: "Branded Tote Bags",
    h1: "Branded Tote & Jute Bags",
    intro:
      "Custom cotton, jute and nylon bags, plus paper gift bags, printed with your logo. Reusable branded bags for events, retail and giveaways, with low minimums and free proofs.",
    match: (p) => p.category === "Bags",
  },
  {
    slug: "corporate-gift-sets",
    title: "Corporate Gift Sets",
    h1: "Corporate Gift Sets",
    intro:
      "Branded corporate gift sets combining pens, keyrings, diaries and more in a presentation box. A polished, ready-to-give option for clients and staff.",
    match: (p) => p.category === "Combo Sets",
  },
  {
    slug: "branded-keyrings",
    title: "Branded Keyrings",
    h1: "Branded & Engraved Keyrings",
    intro:
      "Custom metal and leather keyrings engraved or printed with your logo. A durable, everyday-carry promotional item that keeps your brand in hand.",
    match: (p) => p.category === "Key Ring",
  },
  {
    slug: "pen-gift-boxes",
    title: "Pen Gift Boxes",
    h1: "Pen Gift Boxes & Presentation Pouches",
    intro:
      "Premium gift boxes and velvet pouches for presenting a branded pen. Card, clear case, metal and velvet options that turn a pen into a proper corporate gift. The pen shown is for presentation only and is not included.",
    match: (p) => p.category === "Gift Boxes",
  },
  {
    slug: "branded-card-holders-organisers",
    title: "Card Holders & Organisers",
    h1: "Branded Business Card Holders & Organisers",
    intro:
      "Custom business card holders and ring binder organisers with your logo engraved or printed. Smart, useful gifts that sit on desks and in pockets every day, ideal for sales teams, networking events and client thank-yous. One branding method, a free digital proof and no setup fees are all included.",
    match: (p) => p.category === "Card Holders & Organisers",
  },
];

export const getCollection = (slug) => COLLECTIONS.find((c) => c.slug === slug);
