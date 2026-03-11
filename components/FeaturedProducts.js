"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { products } from "./productsData";
import ProductImageModal from "./ProductImageModal";

/* ---------- MULTI VARIANT HELPER ---------- */
const MULTI_VARIANT_RANGES = [
  { from: 119, to: 126 },
  { from: 127, to: 132 },
  { from: 133, to: 139 },
  { from: 140, to: 146 },
];

const isMultiVariantProduct = (product) => {
  if (!product?.id?.startsWith("MP")) return false;
  const number = parseInt(product.id.replace("MP", ""), 10);
  if (Number.isNaN(number)) return false;
  return MULTI_VARIANT_RANGES.some((r) => number >= r.from && number <= r.to);
};

const ECO_KEYWORDS = ["eco", "bamboo", "cork", "jute", "cotton", "paper"];
const isEco = (p) => ECO_KEYWORDS.some((k) => p.name.toLowerCase().includes(k));

/* ---------- FAMILY KEY LOGIC ----------
   Strips colour/variant words so that:
   "Gripper Red", "Gripper Black", "Gripper Blue" → all map to family "gripper"
   "Elastic Diary 2-in-1", "Elastic Diary Red 2-in-1" → family "gift set elastic diary 2-in-1"
---------------------------------------------- */
const VARIANT_WORDS = [
  "black", "white", "red", "blue", "grey", "gray", "gold", "silver",
  "rosegold", "rose", "chrome", "gunmetal", "brown", "green", "tan",
  "small", "medium", "large", "big",
  "1", "2", "3", "4", "5", "i", "ii", "iii",
];

function getFamilyKey(name) {
  return name
    .toLowerCase()
    .replace(/^[\w\s]+-\s*/, "")   // strip code prefix e.g. "P8 - "
    .replace(/\(.*?\)/g, "")       // strip bracketed content
    .replace(/\|.*$/, "")          // strip size info after pipe
    .replace(/[–—\-\/]/g, " ")     // normalise dashes
    .split(/\s+/)
    .filter((w) => w.length > 1 && !VARIANT_WORDS.includes(w))
    .join(" ")
    .trim();
}

/* Pick ONE representative per family — cheapest member so "From £x" is accurate */
function pickOnePerFamily(list) {
  const families = new Map();
  for (const p of list) {
    const key = getFamilyKey(p.name);
    if (!families.has(key) || p.price < families.get(key).price) {
      families.set(key, p);
    }
  }
  return Array.from(families.values());
}

/* ---------- BUILD FEATURED LIST AUTOMATICALLY ---------- */
function buildFeatured() {
  // 2 plastic pen families — mid/upper range so they look good
  const plasticPens = pickOnePerFamily(
    products.filter((p) => p.category === "Pen" && !p.id.startsWith("MP"))
  )
    .sort((a, b) => b.price - a.price)
    .slice(0, 2);

  // 2 metal pen families
  const metalPens = pickOnePerFamily(
    products.filter((p) => p.category === "Pen" && p.id.startsWith("MP"))
  )
    .sort((a, b) => b.price - a.price)
    .slice(0, 2);

  // 2 notebook families — one cheap, one premium
  const notebooks = pickOnePerFamily(
    products.filter((p) => p.category === "Notebook")
  )
    .sort((a, b) => a.price - b.price)
    .slice(0, 2);

  // 1 key ring family
  const keyrings = pickOnePerFamily(
    products.filter((p) => p.category === "Key Ring")
  ).slice(0, 1);

  // Combo sets — exactly one 2-in-1, one 3-in-1, one 4-in-1
  const combo2 = pickOnePerFamily(
    products.filter((p) => p.category === "Combo Sets" && p.name.includes("2-in-1"))
  ).slice(0, 1);

  const combo3 = pickOnePerFamily(
    products.filter((p) => p.category === "Combo Sets" && p.name.includes("3-in-1"))
  ).slice(0, 1);

  const combo4 = pickOnePerFamily(
    products.filter((p) => p.category === "Combo Sets" && p.name.includes("4-in-1"))
  ).slice(0, 1);

  // 1 bag family
  const bags = pickOnePerFamily(
    products.filter((p) => p.category === "Bags")
  ).slice(0, 1);

  return [
    ...plasticPens,
    ...metalPens,
    ...notebooks,
    ...keyrings,
    ...combo2,
    ...combo3,
    ...combo4,
    ...bags,
  ].filter(Boolean);
}

const featuredProducts = buildFeatured();

/* ---------- COMPONENT ---------- */
export default function FeaturedProducts() {
  const sliderRef = useRef(null);
  const [zoomProduct, setZoomProduct] = useState(null);

  const scroll = (dir) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-14">

        {/* Header */}
        <div className="mb-8 max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">
            Featured products
          </p>
          <h2 className="text-3xl md:text-4xl font-medium leading-tight text-dark">
            A curated mix of popular, practical branded products.
          </h2>
        </div>

        {/* Slider */}
        <div className="relative">

          {/* Right-edge fade only — left fade removed */}
          <div className="md:hidden pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Left arrow */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 shadow hover:shadow-md transition"
          >
            ←
          </button>

          {/* Track */}
          <div
            ref={sliderRef}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar scroll-smooth"
          >
            {featuredProducts.map((product) => (
              <FeaturedCard
                key={product.id}
                product={product}
                onImageClick={() => setZoomProduct(product)}
              />
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 shadow hover:shadow-md transition"
          >
            →
          </button>
        </div>

        {/* View all */}
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

/* ---------- CARD ---------- */
function FeaturedCard({ product, onImageClick }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const isMultiVariant = isMultiVariantProduct(product);
  const eco = isEco(product);
  const popular = ["P77", "MP10", "MP03", "D184", "D200", "KC01"].includes(product.id);

  return (
    <div className="product-card snap-start min-w-[200px] max-w-[200px] md:min-w-[260px] md:max-w-[260px] rounded-xl bg-white border border-gray-100 shadow-sm flex-shrink-0 flex flex-col overflow-hidden group">

      {/* Image */}
      <div
        className="relative h-[150px] md:h-[180px] bg-gray-50 overflow-hidden cursor-pointer"
        onClick={onImageClick}
      >
        {/* Badges */}
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

        {/* Zoom button */}
        <button
          className="absolute top-2 right-2 z-10 bg-white/90 rounded-full w-9 h-9 flex items-center justify-center text-base shadow-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity border border-gray-100"
          onClick={(e) => { e.stopPropagation(); onImageClick(); }}
          aria-label="Zoom product image"
        >
          ⤢
        </button>

        {/* Shimmer */}
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
          <span className="text-xs font-normal text-gray-400">(excl. VAT)</span>
        </p>

        {isMultiVariant && (
          <p className="text-[11px] text-gray-500 leading-snug mt-1">
            Specify part number / colour when ordering.
          </p>
        )}

        <p className="text-[11px] text-gray-400 mt-1">Branding included</p>

        <div className="mt-auto pt-3">
          <Link
            href="/quote"
            className="w-full block bg-dark text-white py-2.5 rounded-lg text-sm font-medium text-center hover:opacity-90 active:scale-95 transition"
          >
            Get a quote
          </Link>
        </div>
      </div>
    </div>
  );
}
