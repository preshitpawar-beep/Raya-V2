"use client";

import { useState, useMemo, useEffect } from "react";
import { products } from "./productsData";

/* ---------------- CONFIG ---------------- */

const CATEGORIES = ["All", "Pen", "Notebook", "Key Ring", "Combo Sets", "Bags"];

const CATEGORY_ALIASES = {
  pen: "Pen",
  pens: "Pen",
  notebook: "Notebook",
  notebooks: "Notebook",
  "key ring": "Key Ring",
  "key rings": "Key Ring",
  keyring: "Key Ring",
  keyrings: "Key Ring",
  bag: "Bags",
  bags: "Bags",
  combo: "Combo Sets",
  combos: "Combo Sets",
  "combo set": "Combo Sets",
  "combo sets": "Combo Sets",
};

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

/* ---------------- HELPERS ---------------- */

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

/* ---------------- MAIN ---------------- */

export default function ProductsGrid({ initialSearch = "" }) {
  const [filters, setFilters] = useState({
    category: "All",
    colors: [],
    materials: [],
    ecoOnly: false,
    popularOnly: false,
    search: "",
  });

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  /* 🔗 SMART SEARCH PARSER */
  useEffect(() => {
    if (!initialSearch) return;

    const text = initialSearch.toLowerCase();

    let category = "All";
    let materials = [];
    let colors = [];
    let remainingText = text;

    // Category detection (handles plurals + phrases)
    Object.entries(CATEGORY_ALIASES).forEach(([key, value]) => {
      if (text.includes(key)) {
        category = value;
        remainingText = remainingText.replace(key, "");
      }
    });

    // Material detection
    MATERIALS.forEach((m) => {
      if (text.includes(m)) {
        materials.push(m);
        remainingText = remainingText.replace(m, "");
      }
    });

    // Colour detection
    COLORS.forEach((c) => {
      if (text.includes(c)) {
        colors.push(c);
        remainingText = remainingText.replace(c, "");
      }
    });

    setFilters((f) => ({
      ...f,
      category,
      materials,
      colors,
      search: remainingText.trim(),
    }));
  }, [initialSearch]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (filters.category !== "All" && p.category !== filters.category)
        return false;

      if (filters.search) {
        const term = filters.search.toLowerCase();
        if (!p.name.toLowerCase().includes(term)) return false;
      }

      if (filters.colors.length) {
        const c = getColor(p);
        if (!filters.colors.includes(c)) return false;
      }

      if (filters.materials.length) {
        const m = getMaterial(p);
        if (!filters.materials.includes(m)) return false;
      }

      return true;
    });
  }, [filters]);

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

  return (
    <>
      {/* MOBILE FILTER BUTTON */}
      <div className="md:hidden mb-6">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="w-full border rounded-lg px-4 py-3 text-sm font-medium"
        >
          Filters
        </button>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* DESKTOP SIDEBAR */}
        <div className="hidden md:block md:col-span-3">
          <div className="sticky top-24 bg-white p-5 rounded-xl border shadow-sm">
            {FiltersUI}
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="col-span-12 md:col-span-9">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={`${product.id}-${index}`}
                product={product}
              />
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg">Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)}>Close</button>
            </div>

            {FiltersUI}
          </div>
        </div>
      )}
    </>
  );
}

/* ---------------- CARD ---------------- */

function ProductCard({ product }) {
  const minQty = MOQ[product.category] || 10;

  return (
    <div className="rounded-xl p-4 bg-white border shadow-sm flex flex-col">
      <img
        src={`/products/${product.id}.jpg`}
        className="h-48 object-contain my-4"
        onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
      />

      <h3 className="text-sm font-semibold">{product.name}</h3>

      <p className="text-xs text-gray-600">
        From £{product.price.toFixed(2)} per unit
      </p>

      <p className="text-[11px] text-gray-500 mb-4">
        Includes 1-colour logo imprint
      </p>

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
