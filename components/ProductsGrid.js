"use client";

import { useState, useMemo, useEffect } from "react";
import { products } from "./productsData";
import ProductImageModal from "./ProductImageModal";

/* ---------------- CONFIG ---------------- */

const ITEMS_PER_PAGE = 50;

const CATEGORIES = ["All", "Pen", "Notebook", "Key Ring", "Combo Sets", "Bags"];
const COLORS = ["black", "blue", "red", "white", "grey", "gold", "brown", "green"];
const MATERIALS = ["plastic", "metal", "jute", "cotton", "paper", "leather"];

const ECO_KEYWORDS = ["eco", "bamboo", "cork", "jute", "cotton", "paper"];
const POPULAR_IDS = [
  "P77",
  "MP10",
  "MP03",
  "D184",
  "D200",
  "KC01",
  "Sr 159",
  "Sr 231",
  "JB 02",
];

const MOQ = {
  Pen: 50,
  Notebook: 10,
  "Key Ring": 30,
  "Combo Sets": 10,
  Bags: 10,
};

const DEFAULT_FILTERS = {
  category: "All",
  colors: [],
  materials: [],
  ecoOnly: false,
  popularOnly: false,
  setTypes: [],
  search: "",
  sort: "featured",
};

/* ---------------- HELPERS ---------------- */
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

  return MULTI_VARIANT_RANGES.some(
    (range) => number >= range.from && number <= range.to
  );
};


const isEco = (p) =>
  ECO_KEYWORDS.some((k) => p.name.toLowerCase().includes(k));

const getColor = (p) =>
  COLORS.find((c) => p.name.toLowerCase().includes(c));

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

/* ---------------- MAIN ---------------- */

export default function ProductsGrid({ initialSearch = "" }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [zoomProduct, setZoomProduct] = useState(null);
  const [page, setPage] = useState(1);

  const hasActiveFilters = useMemo(
    () => JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS),
    [filters]
  );

  /* reset page when filters change */
  useEffect(() => {
    setPage(1);
  }, [filters]);

  /* 🔗 SMART SEARCH → FILTERS */
  useEffect(() => {
    if (!initialSearch) return;

    const words = initialSearch.toLowerCase().split(" ").filter(Boolean);

    let category = "All";
    let materials = [];
    let colors = [];
    let remainingWords = [];

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

    setFilters((f) => ({
      ...f,
      category,
      materials,
      colors,
      search: remainingWords.join(" "),
    }));
  }, [initialSearch]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (filters.category !== "All" && p.category !== filters.category)
        return false;

      if (filters.search) {
        const term = filters.search.toLowerCase();
        const haystack = `${p.name} ${p.category}`.toLowerCase();
        if (!haystack.includes(term)) return false;
      }

      if (filters.colors.length) {
        const c = getColor(p);
        if (!filters.colors.includes(c)) return false;
      }

      if (filters.materials.length) {
        const m = getMaterial(p);
        if (!filters.materials.includes(m)) return false;
      }

      if (filters.ecoOnly && !isEco(p)) return false;
      if (filters.popularOnly && !POPULAR_IDS.includes(p.id)) return false;

      if (filters.setTypes.length) {
        const t = getSetType(p);
        if (!filters.setTypes.includes(t)) return false;
      }

      return true;
    });
  }, [filters]);

  /* PAGINATION */
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, page]);

  const toggle = (key, value) => {
    setFilters((f) => ({
      ...f,
      [key]: f[key].includes(value)
        ? f[key].filter((x) => x !== value)
        : [...f[key], value],
    }));
  };

  /* ---------------- FILTER UI ---------------- */

  const FiltersUI = (
    <div className="space-y-6">
      <input
        placeholder="Search products…"
        className="w-full px-4 py-2 rounded-lg border"
        value={filters.search}
        onChange={(e) =>
          setFilters({ ...filters, search: e.target.value })
        }
      />

      <div>
        <h4 className="text-sm font-semibold mb-2">Category</h4>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilters({ ...filters, category: c })}
              className={`px-3 py-1 rounded-full text-sm border ${
                filters.category === c ? "bg-dark text-white" : ""
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-2">Colour</h4>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => toggle("colors", c)}
              className={`px-3 py-1 rounded-full text-sm border ${
                filters.colors.includes(c) ? "bg-dark text-white" : ""
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-2">Material</h4>
        <div className="flex flex-wrap gap-2">
          {MATERIALS.map((m) => (
            <button
              key={m}
              onClick={() => toggle("materials", m)}
              className={`px-3 py-1 rounded-full text-sm border ${
                filters.materials.includes(m) ? "bg-dark text-white" : ""
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  /* ---------------- RETURN (UNCHANGED STRUCTURE) ---------------- */

  return (
    <>
      {/* MOBILE ACTIONS */}
      <div className="md:hidden mb-6 flex gap-3">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="flex-1 border rounded-lg px-4 py-3 text-sm font-medium"
        >
          Filters
        </button>

        {hasActiveFilters && (
          <button
            onClick={() => setFilters(DEFAULT_FILTERS)}
            className="flex-1 border rounded-lg px-4 py-3 text-sm font-medium text-red-600"
          >
            Clear
          </button>
        )}
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* DESKTOP FILTERS */}
        <div className="hidden md:block md:col-span-3">
          <div className="sticky top-24 bg-white p-5 rounded-xl border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Filters</h3>
              {hasActiveFilters && (
                <button
                  onClick={() => setFilters(DEFAULT_FILTERS)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
            {FiltersUI}
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="col-span-12 md:col-span-9">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {paginatedProducts.map((product, index) => (
              <ProductCard
                key={`${product.category}-${product.id}-${index}`}
                product={product}
                onImageClick={() => setZoomProduct(product)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-4 py-2 rounded border text-sm ${
                    page === i + 1
                      ? "bg-dark text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg">Filters</h3>
              {hasActiveFilters && (
                <button
                  onClick={() => setFilters(DEFAULT_FILTERS)}
                  className="text-sm text-red-600"
                >
                  Clear
                </button>
              )}
            </div>

            {FiltersUI}

            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-6 w-full bg-dark text-white py-3 rounded-lg"
            >
              Apply filters
            </button>
          </div>
        </div>
      )}

      <ProductImageModal
        product={zoomProduct}
        onClose={() => setZoomProduct(null)}
      />
    </>
  );
}

/* ---------------- CARD ---------------- */

function ProductCard({ product, onImageClick }) {
  const minQty = MOQ[product.category] || 10;
  const isMultiVariant = isMultiVariantProduct(product);

  return (
    <div className="rounded-xl p-4 bg-white border shadow-sm flex flex-col">
      <img
        src={`/products/${product.id}.jpg`}
        className="h-48 object-contain my-4 cursor-zoom-in"
        onClick={onImageClick}
        onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
      />

      <div className="space-y-1">
        <h3 className="text-sm font-semibold">{product.name}</h3>

        <p className="text-xs text-gray-700">
          From £{product.price.toFixed(2)}{" "}
          <span className="text-gray-500">(excl. VAT)</span>
        </p>

        {isMultiVariant && (
          <p className="text-[11px] text-gray-600 leading-snug">
            Price is <strong>per unit</strong>. Please specify required{" "}
            <strong>part number / colour</strong> (shown left to right).
          </p>
        )}

        <p className="text-[11px] text-gray-500">
          Price includes one standard branding method.
        </p>
      </div>

      <div className="h-4" />

      <button
        onClick={() => {
          localStorage.setItem(
            "quoteItem",
            JSON.stringify({
              id: product.id,
              product: product.name,
              quantity: minQty,
              price: product.price,
              category: product.category,
            })
          );
          window.location.href = "/quote";
        }}
        className="mt-auto bg-dark text-white py-2.5 rounded-lg"
      >
        Get quote
      </button>
    </div>
  );
}
