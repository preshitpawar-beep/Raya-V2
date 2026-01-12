"use client";

import { useState, useMemo } from "react";
import { products } from "./productsData";

/* ---------------- CONFIG ---------------- */

const CATEGORIES = ["All", "Pen", "Notebook", "Key Ring", "Combo Sets", "Bags"];
const COLORS = ["black", "blue", "red", "white", "grey", "gold", "brown", "green"];

const ECO_KEYWORDS = ["eco", "bamboo", "cork", "jute", "cotton", "paper"];

const POPULAR_IDS = ["P77", "MP10", "MP03", "D184", "D200", "KC01", "Sr 159", "Sr 231", "JB 02"];

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
    if (/nylon/i.test(p.name)) return "nylon";
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

export default function ProductsGrid() {
  const [filters, setFilters] = useState({
    category: "All",
    colors: [],
    materials: [],
    ecoOnly: false,
    popularOnly: false,
    setTypes: [],
    search: "",
    sort: "featured",
  });

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      if (filters.category !== "All" && p.category !== filters.category)
        return false;

      if (
        filters.search &&
        !p.name.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;

      if (filters.colors.length > 0) {
        const c = getColor(p);
        if (!filters.colors.includes(c)) return false;
      }

      if (filters.materials.length > 0) {
        const m = getMaterial(p);
        if (!filters.materials.includes(m)) return false;
      }

      if (filters.ecoOnly && !isEco(p)) return false;
      if (filters.popularOnly && !POPULAR_IDS.includes(p.id)) return false;

      if (filters.setTypes.length > 0) {
        const t = getSetType(p);
        if (!filters.setTypes.includes(t)) return false;
      }

      return true;
    });

    if (filters.sort === "price") result.sort((a, b) => a.price - b.price);
    if (filters.sort === "premium") result.sort((a, b) => b.price - a.price);
    if (filters.sort === "eco")
      result.sort((a, b) => isEco(b) - isEco(a));

    return result;
  }, [filters]);

  return (
    <div>
      {/* SEARCH + SORT */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          placeholder="Search products…"
          className="w-full px-4 py-3 rounded-xl border shadow-sm"
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value })
          }
        />

        <select
          className="px-4 py-3 rounded-xl border"
          onChange={(e) =>
            setFilters({ ...filters, sort: e.target.value })
          }
        >
          <option value="featured">Featured</option>
          <option value="price">Price: Low → High</option>
          <option value="premium">Premium first</option>
          <option value="eco">Eco first</option>
        </select>
      </div>

      {/* CATEGORY */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilters({ ...filters, category: c })}
            className={`px-4 py-2 rounded-full transition ${
              filters.category === c
                ? "bg-dark text-white"
                : "bg-white border"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={`${product.category}-${product.id}-${product.name}-${index}`}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------- CARD ---------------- */

function ProductCard({ product }) {
  const minQty = MOQ[product.category] || 10;
  const [qty, setQty] = useState(minQty);

  const increase = () => setQty((q) => q + 10);
  const decrease = () => setQty((q) => (q > minQty ? q - 10 : q));

  return (
    <div className="rounded-xl p-4 md:p-6 bg-white shadow-sm border border-gray-100 flex flex-col hover:shadow-xl transition">
      {isEco(product) && (
        <span className="text-green-600 text-xs mb-1">🌱 Eco Friendly</span>
      )}

      <div className="w-full rounded-lg mb-4 flex items-center justify-center p-4">
        <img
          src={`/products/${product.id}.jpg`}
          alt={product.name}
          className="max-h-[260px] w-auto object-contain"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.jpg";
          }}
        />
      </div>

      <h3 className="text-sm md:text-base font-semibold mb-1 leading-snug">
        {product.name}
      </h3>

      <p className="text-xs text-gray-600">
        From £{product.price.toFixed(2)} per unit
      </p>

      <p className="text-[11px] text-gray-500">
        Includes 1-colour logo imprint
      </p>

      <p className="text-[11px] text-gray-400 mb-3">
        Products are subject to availability
      </p>

      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-600">Qty</span>
        <div className="flex items-center border rounded-lg overflow-hidden">
          <button onClick={decrease} className="px-3 py-1 text-sm">–</button>
          <span className="px-3 text-sm font-medium">{qty}</span>
          <button onClick={increase} className="px-3 py-1 text-sm">+</button>
        </div>
      </div>

      <button
        onClick={() => {
          localStorage.setItem(
            "quoteItem",
            JSON.stringify({
              id: product.id,
              product: product.name,
              quantity: qty,
              price: product.price,
              category: product.category,
            })
          );
          window.location.href = "/quote";
        }}
        className="mt-auto w-full bg-dark text-white py-2.5 rounded-lg text-sm font-medium hover:opacity-90"
      >
        Get quote
      </button>
    </div>
  );
}
