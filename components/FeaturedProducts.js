"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { products } from "./productsData";
import ProductImageModal from "./ProductImageModal";

/* ─────────────────────────────────────────────
   MULTI VARIANT HELPER
───────────────────────────────────────────── */
const MULTI_VARIANT_RANGES = [
  { from: 119, to: 126 }, { from: 127, to: 132 },
  { from: 133, to: 139 }, { from: 140, to: 146 },
];
const isMultiVariantProduct = (p) => {
  if (!p?.id?.startsWith("MP")) return false;
  const n = parseInt(p.id.replace("MP", ""), 10);
  if (Number.isNaN(n)) return false;
  return MULTI_VARIANT_RANGES.some((r) => n >= r.from && n <= r.to);
};

const ECO_KEYWORDS = ["eco", "bamboo", "cork", "jute", "cotton", "paper"];
const isEco = (p) => ECO_KEYWORDS.some((k) => p.name.toLowerCase().includes(k));
const POPULAR_IDS = ["P77", "MP10", "MP03", "D184", "D200", "KC01"];

/* ─────────────────────────────────────────────
   FAMILY KEY — strips colour/size variants so
   "Gripper Red" and "Gripper Black" → "gripper"
───────────────────────────────────────────── */
const VARIANT_WORDS = [
  "black","white","red","blue","grey","gray","gold","silver",
  "rosegold","rose","chrome","gunmetal","brown","green","tan",
  "small","medium","large","big","1","2","3","4","5","i","ii","iii",
];

function getFamilyKey(name) {
  return name
    .toLowerCase()
    .replace(/^[\w\s]+-\s*/, "")
    .replace(/\(.*?\)/g, "")
    .replace(/\|.*$/, "")
    .replace(/[–—\-\/]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !VARIANT_WORDS.includes(w))
    .join(" ")
    .trim();
}

/* Pick one per family — cheapest representative */
function pickOnePerFamily(list) {
  const map = new Map();
  for (const p of list) {
    const key = getFamilyKey(p.name);
    if (!map.has(key) || p.price < map.get(key).price) map.set(key, p);
  }
  return Array.from(map.values());
}

/* Deterministic shuffle using a numeric seed (day of year) */
function seededShuffle(arr, seed) {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ─────────────────────────────────────────────
   DAY-BASED DEMAND ROTATION
───────────────────────────────────────────── */
function buildFeatured() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const seed = Math.floor(now.getTime() / 86400000);

  const penFamilies      = seededShuffle(pickOnePerFamily(products.filter((p) => p.category === "Pen")), seed);
  const notebookFamilies = seededShuffle(pickOnePerFamily(products.filter((p) => p.category === "Notebook")), seed + 1);
  const keyringFamilies  = seededShuffle(pickOnePerFamily(products.filter((p) => p.category === "Key Ring")), seed + 2);
  const bagFamilies      = seededShuffle(pickOnePerFamily(products.filter((p) => p.category === "Bags")), seed + 3);
  const combo2Families   = seededShuffle(pickOnePerFamily(products.filter((p) => p.category === "Combo Sets" && p.name.includes("2-in-1"))), seed + 4);
  const combo3Families   = seededShuffle(pickOnePerFamily(products.filter((p) => p.category === "Combo Sets" && p.name.includes("3-in-1"))), seed + 5);
  const combo4Families   = seededShuffle(pickOnePerFamily(products.filter((p) => p.category === "Combo Sets" && p.name.includes("4-in-1"))), seed + 6);

  const budgetPen      = [...penFamilies].sort((a, b) => a.price - b.price)[0];
  const budgetNotebook = [...notebookFamilies].sort((a, b) => a.price - b.price)[0];
  const budgetBag      = [...bagFamilies].sort((a, b) => a.price - b.price)[0];

  const ecoPickPool = seededShuffle(
    pickOnePerFamily(products.filter(isEco)), seed + 7
  );
  const ecoPick = ecoPickPool[0];

  let featured = [];

  if (dayOfWeek >= 1 && dayOfWeek <= 3) {
    const midPens    = penFamilies.filter((p) => p.price >= 0.3 && p.price < 2.5);
    const metalPens  = penFamilies.filter((p) => p.id.startsWith("MP"));
    featured = [
      budgetPen,
      ...(midPens.slice(0, 2)),
      ...(metalPens.slice(0, 2)),
      ecoPick,
      ...(notebookFamilies.slice(0, 1)),
      ...(combo2Families.slice(0, 1)),
      ...(keyringFamilies.slice(0, 1)),
    ];
  } else if (dayOfWeek === 4 || dayOfWeek === 5) {
    featured = [
      budgetNotebook,
      ...(notebookFamilies.slice(1, 3)),
      ...(combo2Families.slice(0, 1)),
      ...(combo3Families.slice(0, 1)),
      ...(combo4Families.slice(0, 1)),
      ecoPick,
      ...(penFamilies.slice(0, 1)),
      ...(keyringFamilies.slice(0, 1)),
    ];
  } else {
    featured = [
      budgetBag,
      ...(bagFamilies.slice(1, 3)),
      ...(keyringFamilies.slice(0, 2)),
      ecoPick,
      ...(combo2Families.slice(0, 1)),
      ...(penFamilies.slice(0, 1)),
      ...(notebookFamilies.slice(0, 1)),
    ];
  }

  const seen = new Set();
  return featured.filter((p) => {
    if (!p || seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });
}

const featuredProducts = buildFeatured();

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function FeaturedProducts() {
  const sliderRef = useRef(null);
  const [zoomProduct, setZoomProduct] = useState(null);
  const router = useRouter();

  const scroll = (dir) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
  };

  const dayOfWeek = new Date().getDay();
  const theme =
    dayOfWeek >= 1 && dayOfWeek <= 3 ? "Pens & Writing"
    : dayOfWeek >= 4 && dayOfWeek <= 5 ? "Notebooks & Gift Sets"
    : "Bags & Key Rings";

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-14">

        <div className="mb-8 max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">
            Featured products · {theme}
          </p>
          <h2 className="text-3xl md:text-4xl font-medium leading-tight text-dark">
            A curated mix of popular, practical branded products.
          </h2>
        </div>

        <div className="relative">
          <div className="md:hidden pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent z-10" />

          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 shadow hover:shadow-md transition"
          >
            ←
          </button>

          <div
            ref={sliderRef}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar scroll-smooth"
          >
            {featuredProducts.map((product) => (
              <FeaturedCard
                key={product.id}
                product={product}
                onImageClick={() => setZoomProduct(product)}
                onCardClick={() =>
                  router.push(`/products/${product.id.replace(/\s+/g, "-")}`)
                }
              />
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 shadow hover:shadow-md transition"
          >
            →
          </button>
        </div>

        <div className="mt-10">
          <Link
            href="/products"
            className="inline-block border border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            View all products
          </Link>
        </div>
      </div>

      <ProductImageModal product={zoomProduct} onClose={() => setZoomProduct(null)} />
    </section>
  );
}

/* ─────────────────────────────────────────────
   CARD — UPDATED WITH TIERED PRICING
───────────────────────────────────────────── */
function FeaturedCard({ product, onImageClick, onCardClick }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const isMultiVariant = isMultiVariantProduct(product);
  const eco = isEco(product);
  const popular = POPULAR_IDS.includes(product.id);
  const moq = product.moq || 10;

  return (
    <div
      className="product-card snap-start min-w-[200px] max-w-[200px] md:min-w-[260px] md:max-w-[260px] rounded-xl bg-white border border-gray-100 shadow-sm flex-shrink-0 flex flex-col overflow-hidden group cursor-pointer"
      onClick={onCardClick}
    >

      {/* Image */}
      <div
        className="relative h-[150px] md:h-[180px] bg-gray-50 overflow-hidden"
      >
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {popular && (
            <span className="bg-dark text-white text-[10px] font-bold px-2 py-0.5 rounded-full leading-4">
              Popular
            </span>
          )}
          {eco && (
            <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full leading-4">
              Eco
            </span>
          )}
        </div>

        <button
          className="absolute top-2 right-2 z-10 bg-white/90 rounded-full w-9 h-9 flex items-center justify-center text-base shadow-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity border border-gray-100"
          onClick={(e) => { e.stopPropagation(); onImageClick(); }}
          aria-label="Zoom product image"
        >
          ⤢
        </button>

        {!imgLoaded && <div className="img-skeleton absolute inset-0" />}

        <Image
          src={product.image}
          alt={`${product.name} – custom branded ${product.category.toLowerCase()}`}
          fill
          sizes="260px"
          className={`card-image object-contain p-3 transition-opacity duration-300 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImgLoaded(true)}
          onError={(e) => { e.currentTarget.src = "/placeholder.jpg"; setImgLoaded(true); }}
        />
      </div>

      {/* Content */}
      <div className="px-4 py-4 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-dark leading-snug mb-1 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-sm font-semibold text-dark mt-0.5">
          From £{product.price.toFixed(2)}{" "}
          <span className="text-xs font-normal text-gray-400">per unit</span>
        </p>

        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-1 rounded-full mt-1.5 self-start border border-emerald-100">
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="shrink-0">
            <path d="M13.3 4.7L6.3 11.7L2.7 8.1L3.8 7L6.3 9.5L12.2 3.6L13.3 4.7Z" fill="currentColor"/>
          </svg>
          Branding included
        </span>

        {isMultiVariant && (
          <p className="text-[11px] text-gray-500 leading-snug mt-1">
            Specify part number / colour when ordering.
          </p>
        )}

        <p className="text-[11px] text-gray-400 mt-1">
          Min {moq} units
        </p>

        <div className="mt-auto pt-3">
          <Link
            href="/quote"
            onClick={(e) => e.stopPropagation()}
            className="w-full block bg-dark text-white py-2.5 rounded-lg text-sm font-medium text-center hover:opacity-90 active:scale-95 transition"
          >
            Get a quote
          </Link>
        </div>
      </div>
    </div>
  );
}
