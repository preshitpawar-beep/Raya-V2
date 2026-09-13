// Collection / landing pages targeting real buyer searches (e.g. "blue promotional pens").
// Used by the /collections/[slug] route, the sitemap, and the homepage shop strip.
export const COLLECTIONS = [
  {
    slug: "promotional-pens",
    title: "Promotional Pens",
    h1: "Branded Promotional Pens",
    intro:
      "Custom promotional pens printed with your logo. Plastic, metal and eco options, with one branding method included, no setup fees and free digital proofs. A cost-effective giveaway for events, offices and corporate gifts across the UK.",
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
    h1: "Eco & Recycled Promotional Pens",
    intro:
      "Sustainable branded pens made from bamboo, recycled and natural materials. A greener promotional pen for businesses that care about their footprint.",
    match: (p) => p.category === "Pen" && /eco|bamboo|cork|jute|cotton|paper|recycled|wheat/i.test(p.name),
  },
  {
    slug: "blue-promotional-pens",
    title: "Blue Promotional Pens",
    h1: "Blue Branded Promotional Pens",
    intro:
      "Blue promotional pens printed with your logo. Browse our blue branded pens, with branding included and low minimums.",
    match: (p) => p.category === "Pen" && /\bblue\b|navy|sky/i.test(p.name),
  },
  {
    slug: "black-promotional-pens",
    title: "Black Promotional Pens",
    h1: "Black Branded Promotional Pens",
    intro:
      "Classic black promotional pens branded with your logo. A smart, professional giveaway that suits any brand.",
    match: (p) => p.category === "Pen" && /\bblack\b|gunmetal/i.test(p.name),
  },
  {
    slug: "red-promotional-pens",
    title: "Red Promotional Pens",
    h1: "Red Branded Promotional Pens",
    intro:
      "Red promotional pens printed with your logo. Bright, eye-catching branded pens with branding included.",
    match: (p) => p.category === "Pen" && /\bred\b|maroon/i.test(p.name),
  },
  {
    slug: "branded-notebooks",
    title: "Branded Notebooks",
    h1: "Branded & Custom Notebooks",
    intro:
      "Custom notebooks printed or debossed with your logo. A5 and pocket sizes, PU and eco paper options, ideal for events, onboarding packs and corporate gifts.",
    match: (p) => p.category === "Notebook",
  },
  {
    slug: "branded-tote-bags",
    title: "Branded Tote Bags",
    h1: "Branded Tote & Jute Bags",
    intro:
      "Custom tote and jute bags printed with your logo. Reusable, eco-friendly branded bags for events, retail and giveaways, with low minimums and free proofs.",
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
      "Custom metal keyrings engraved or printed with your logo. A durable, everyday-carry promotional item that keeps your brand in hand.",
    match: (p) => p.category === "Key Ring",
  },
  {
    slug: "pen-gift-boxes",
    title: "Pen Gift Boxes",
    h1: "Pen Gift Boxes & Presentation Pouches",
    intro:
      "Premium gift boxes and velvet pouches for presenting a branded pen. Paper, slim, metal and velvet options that turn a pen into a proper corporate gift. The pen shown is for presentation only and is not included.",
    match: (p) => p.category === "Gift Boxes",
  },
];

export const getCollection = (slug) => COLLECTIONS.find((c) => c.slug === slug);
