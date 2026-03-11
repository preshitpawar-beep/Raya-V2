"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { products } from "./productsData";
import ProductImageModal from "./ProductImageModal";

/* ---------------- CONFIG ---------------- */
const ITEMS_PER_PAGE = 50;
const CATEGORIES = ["All", "Pen", "Notebook", "Key Ring", "Combo Sets", "Bags"];
const COLORS = ["black", "blue", "red", "white", "grey", "gold", "brown", "green"];
const MATERIALS = ["plastic", "metal", "jute", "cotton", "paper", "leather"];
const ECO_KEYWORDS = ["eco", "bamboo", "cork", "jute", "cotton", "paper"];
const POPULAR_IDS = ["P77","MP10","MP03","D184","D200","KC01","Sr 159","Sr 231","JB 02"];

const MOQ = { Pen: 50, Notebook: 10, "Key Ring": 30, "Combo Sets": 10, Bags: 10 };

const DEFAULT_FILTERS = {
  category: "All", colors: [], materials: [],
  ecoOnly: false, popularOnly: false, setTypes: [],
  search: "", sort: "featured",
};

/* ---------------- HELPERS ---------------- */
const MULTI_VARIANT_RANGES = [
  { from: 119, to: 126 }, { from: 127, to: 132 },
  { from: 133, to: 139 }, { from: 140, to: 146 },
];

const isMultiVariantProduct = (product) => {
  if (!product?.id?.startsWith("MP")) return false;
  const number = parseInt(product.id.replace("MP", ""), 10);
  if (Number.isNaN(number)) return false;
  return MULTI_VARIANT_RANGES.some((r) => number >= r.from && number <= r.to);
};

const isEco = (p) => ECO_KEYWORDS.some((k) => p.name.toLowerCase().includes(k));
const getColor = (p) => COLORS.find((c) => p.name.toLowerCase().includes(c));

const getMaterial = (p) => {
  if (p.category === "Pen") return p.id.startsWith("MP") ? "metal" : "plastic";
  if (p.category === "Bags") {
    if (/jute/i.test(p.name)) return "jute";
    if (/cotton/i.test(p.name)) return "cotton";
    if (/paper/i.test(p.name)) return "paper";
  }
  if (p.category === "Key Ring") {
    if (/leather/i.test(p.name)) return "leather";
    return "metal";
  }
  return null;
};

const getSetType = (p) => {
  if (p.category !== "Combo Sets") return null;
  if (p.name.includes("2-in-1")) return "2-in-1";
  if (p.name.includes("3-in-1")) return "3-in-1";
  if (p.name.includes("4-in-1")) return "4-in-1";
  return null;
};

/* ---------------- SHIMMER SKELETON ---------------- */
function ShimmerCard() {
  return (
    <div className="rounded-xl bg-white border border-gray-100 overflow-hidden shadow-sm">
      <div className="img-skeleton h-44 w-full" />
      <div className="p-4 space-y-2">
        <div className="img-skeleton h-3 w-3/4 rounded" />
        <div className="img-skeleton h-3 w-1/2 rounded" />
        <div className="img-skeleton h-9 w-full rounded-lg mt-3" />
      </div>
    </div>
  );
}

/* ---------------- MAIN GRID ---------------- */
export default function ProductsGrid({ initialSearch = "" }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [zoomProduct, setZoomProduct] = useState(null);
  const [page, setPage] = useState(1);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 400);
    return () => clearTimeout(t);
  }, []);

  const hasActiveFilters = useMemo(
    () => JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS),
    [filters]
  );

  useEffect(() => { setPage(1); }, [filters]);

  /* Smart search → filters */
  useEffect(() => {
    if (!initialSearch) return;
    const words = initialSearch.toLowerCase().split(" ").filter(Boolean);
    let category = "All", materials = [], colors = [], remainingWords = [];
    words.forEach((word) => {
      const normalized = word.endsWith("s") ? word.slice(0, -1) : word;
      if (normalized === "pen") return (category = "Pen");
      if (normalized === "notebook") return (category = "Notebook");
      if (normalized === "bag") return (category = "Bags");
      if (normalized === "key") return (category = "Key Ring");
      if (MATERIALS.includes(normalized)) return materials.push(normalized);
      if (COLORS.includes(normalized)) return colors.push(normalized);
      remainingWords.push(word);
    });
    setFilters((f) => ({ ...f, category, materials, colors, search: remainingWords.join(" ") }));
  }, [initialSearch]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (filters.category !== "All" && p.category !== filters.category) return false;
      if (filters.search) {
        const term = filters.search.toLowerCase();
        if (!`${p.name} ${p.category}`.toLowerCase().includes(term)) return false;
      }
      if (filters.colors.length && !filters.colors.includes(getColor(p))) return false;
      if (filters.materials.length && !filters.materials.includes(getMaterial(p))) return false;
      if (filters.ecoOnly && !isEco(p)) return false;
      if (filters.popularOnly && !POPULAR_IDS.includes(p.id)) return false;
      if (filters.setTypes.length && !filters.setTypes.includes(getSetType(p))) return false;
      return true;
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, page]);

  const toggle = (key, value) => {
    setFilters((f) => ({
      ...f,
      [key]: f[key].includes(value) ? f[key].filter((x) => x !== value) : [...f[key], value],
    }));
  };

  /* Active filter count for mobile badge */
  const activeFilterCount =
    filters.colors.length +
    filters.materials.length +
    (filters.category !== "All" ? 1 : 0) +
    (filters.search ? 1 : 0);

  /* ---------------- FILTER PANEL UI ---------------- */
  const FiltersUI = (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
          🔍
        </span>
        <input
          placeholder="Search products…"
          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
      </div>

      {/* Category */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
          Category
        </h4>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilters({ ...filters, category: c })}
              className={`filter-chip px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                filters.category === c
                  ? "bg-dark text-white border-dark"
                  : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Colour */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
          Colour
        </h4>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => toggle("colors", c)}
              className={`filter-chip px-3 py-1.5 rounded-full text-xs font-medium border capitalize transition ${
                filters.colors.includes(c)
                  ? "bg-dark text-white border-dark"
                  : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Material */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
          Material
        </h4>
        <div className="flex flex-wrap gap-2">
          {MATERIALS.map((m) => (
            <button
              key={m}
              onClick={() => toggle("materials", m)}
              className={`filter-chip px-3 py-1.5 rounded-full text-xs font-medium border capitalize transition ${
                filters.materials.includes(m)
                  ? "bg-dark text-white border-dark"
                  : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  /* ---------------- RENDER ---------------- */
  return (
    <>
      {/* MOBILE FILTER BUTTON */}
      <div className="md:hidden mb-6 flex gap-3">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="flex-1 border border-gray-200 bg-white rounded-lg px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 shadow-sm"
        >
          <span>⚙</span> Filters
          {activeFilterCount > 0 && (
            <span className="bg-dark text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
        {hasActiveFilters && (
          <button
            onClick={() => setFilters(DEFAULT_FILTERS)}
            className="border border-gray-200 bg-white rounded-lg px-4 py-3 text-sm font-medium text-red-500 shadow-sm"
          >
            Clear
          </button>
        )}
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* DESKTOP FILTER SIDEBAR */}
        <div className="hidden md:block md:col-span-3">
          <div className="sticky top-24 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-semibold text-sm text-dark">Filters</h3>
              {hasActiveFilters && (
                <button
                  onClick={() => setFilters(DEFAULT_FILTERS)}
                  className="text-xs text-red-500 hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>
            {FiltersUI}
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="col-span-12 md:col-span-9">
          {/* Results count */}
          <p className="text-xs text-gray-400 mb-4 font-medium">
            {mounted
              ? `${filteredProducts.length} product${filteredProducts.length !== 1 ? "s" : ""} found`
              : "Loading products…"}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {!mounted
              ? Array.from({ length: 9 }).map((_, i) => <ShimmerCard key={i} />)
              : paginatedProducts.map((product, index) => (
                  <ProductCard
                    key={`${product.category}-${product.id}-${index}`}
                    product={product}
                    index={index}
                    onImageClick={() => setZoomProduct(product)}
                    onPageClick={() =>
                      router.push(`/products/${encodeURIComponent(product.id)}`)
                    }
                  />
                ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => { setPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                disabled={page === 1}
                className="px-3 py-2 rounded-lg border text-sm disabled:opacity-30 hover:bg-gray-50 transition"
              >
                ← Prev
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setPage(i + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
                    page === i + 1
                      ? "bg-dark text-white border-dark"
                      : "bg-white hover:bg-gray-50 border-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                disabled={page === totalPages}
                className="px-3 py-2 rounded-lg border text-sm disabled:opacity-30 hover:bg-gray-50 transition"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 modal-overlay">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[85vh] overflow-y-auto modal-content">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg">Filters</h3>
              {hasActiveFilters && (
                <button
                  onClick={() => setFilters(DEFAULT_FILTERS)}
                  className="text-sm text-red-500"
                >
                  Clear all
                </button>
              )}
            </div>
            {FiltersUI}
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-6 w-full bg-dark text-white py-3 rounded-xl font-medium"
            >
              Show {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
            </button>
          </div>
        </div>
      )}

      <ProductImageModal product={zoomProduct} onClose={() => setZoomProduct(null)} />
    </>
  );
}

/* ---------------- PRODUCT CARD ---------------- */
function ProductCard({ product, index, onImageClick, onPageClick }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const isMultiVariant = isMultiVariantProduct(product);
  const eco = isEco(product);
  const popular = ["P77","MP10","MP03","D184","D200","KC01"].includes(product.id);

  return (
    <div
      className="product-card card-enter rounded-xl bg-white border border-gray-100 shadow-sm overflow-hidden flex flex-col cursor-pointer group"
      style={{ animationDelay: `${Math.min(index * 40, 320)}ms` }}
      onClick={onPageClick}
    >
      {/* Image area */}
      <div className="relative overflow-hidden bg-gray-50 h-44">

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

        {/* Zoom button — visible on hover */}
        <button
          className="absolute top-2 right-2 z-10 bg-white/90 rounded-full w-7 h-7 flex items-center justify-center text-xs shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => { e.stopPropagation(); onImageClick(); }}
          aria-label="Zoom product image"
        >
          ⤢
        </button>

        {/* Shimmer placeholder */}
        {!imgLoaded && <div className="img-skeleton absolute inset-0" />}

        <Image
          src={`/products/${product.id}.jpg`}
          alt={`${product.name} – custom branded ${product.category.toLowerCase()} for UK businesses`}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className={`card-image object-contain p-3 transition-opacity duration-300 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            e.currentTarget.src = "/placeholder.jpg";
            setImgLoaded(true);
          }}
        />
      </div>

      {/* Product info */}
      <div className="p-4 flex flex-col flex-1">
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
          <button
            onClick={(e) => {
              e.stopPropagation();
              localStorage.setItem(
                "quoteItem",
                JSON.stringify({
                  id: product.id,
                  product: product.name,
                  quantity: MOQ[product.category] || 10,
                  price: product.price,
                  category: product.category,
                })
              );
              window.location.href = "/quote";
            }}
            className="w-full bg-dark text-white py-2.5 rounded-lg text-sm font-medium hover:opacity-90 active:scale-95 transition"
          >
            Get quote
          </button>
        </div>
      </div>
    </div>
  );
}
