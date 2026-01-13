"use client";

import { useState, useMemo } from "react";
import { products } from "./productsData";

/* ---------------- CONFIG ---------------- */

const CATEGORIES = ["All", "Pen", "Notebook", "Key Ring", "Combo Sets", "Bags"];
const COLORS = ["black", "blue", "red", "white", "grey", "gold", "brown", "green"];
const MATERIALS = ["plastic", "metal", "jute", "cotton", "paper", "leather"];

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
      if (filters.category !== "All" && p.category !== filters.category) return false;
      if (filters.search && !p.name.toLowerCase().includes(filters.search.toLowerCase())) return false;

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

    if (filters.sort === "price") result.sort((a, b) => a.price - b.price);
    if (filters.sort === "premium") result.sort((a, b) => b.price - a.price);
    if (filters.sort === "eco") result.sort((a, b) => isEco(b) - isEco(a));

    return result;
  }, [filters]);

  const toggle = (key, value) => {
    setFilters((f) => ({
      ...f,
      [key]: f[key].includes(value)
        ? f[key].filter((x) => x !== value)
        : [...f[key], value],
    }));
  };

  return (
    <div className="grid grid-cols-12 gap-8">

      {/* LEFT FILTER SIDEBAR */}
      <div className="col-span-12 md:col-span-3">
        <div className="sticky top-24 space-y-6 bg-white p-5 rounded-xl border shadow-sm">

          {/* Search */}
          <input
            placeholder="Search products…"
            className="w-full px-4 py-2 rounded-lg border"
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />

          {/* Category */}
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

          {/* Colors */}
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

          {/* Material */}
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

          {/* Eco & Popular */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilters({ ...filters, ecoOnly: !filters.ecoOnly })}
              className={`px-3 py-1 rounded-full ${
                filters.ecoOnly ? "bg-green-600 text-white" : "border"
              }`}
            >
              🌱 Eco
            </button>

            <button
              onClick={() =>
                setFilters({ ...filters, popularOnly: !filters.popularOnly })
              }
              className={`px-3 py-1 rounded-full ${
                filters.popularOnly ? "bg-yellow-500 text-white" : "border"
              }`}
            >
              ⭐ Popular
            </button>
          </div>

          {/* Set Types */}
          {filters.category === "Combo Sets" && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Set Type</h4>
              <div className="flex gap-2">
                {["2-in-1", "3-in-1", "4-in-1"].map((t) => (
                  <button
                    key={t}
                    onClick={() => toggle("setTypes", t)}
                    className={`px-3 py-1 rounded-full border ${
                      filters.setTypes.includes(t)
                        ? "bg-dark text-white"
                        : ""
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sort */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Sort by</h4>
            <select
              className="w-full px-3 py-2 border rounded-lg"
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
        </div>
      </div>

      {/* RIGHT PRODUCT GRID */}
      <div className="col-span-12 md:col-span-9">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={`${product.category}-${product.id}-${product.name}-${index}`}
              product={product}
            />
          ))}
        </div>
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
    <div className="rounded-xl p-4 bg-white border shadow-sm flex flex-col hover:shadow-xl transition">
      {isEco(product) && (
        <span className="text-green-600 text-xs mb-1">🌱 Eco Friendly</span>
      )}

      <img
        src={`/products/${product.id}.jpg`}
        className="h-48 object-contain my-3"
        onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
      />

      <h3 className="text-sm font-semibold">{product.name}</h3>

      <p className="text-xs text-gray-600">
        From £{product.price.toFixed(2)} per unit
      </p>

      <p className="text-[11px] text-gray-500">
        Includes 1-colour logo imprint
      </p>

      <p className="text-[11px] text-gray-400 mb-3">
        Products are subject to availability
      </p>

      <div className="flex justify-between items-center mb-3">
        <button onClick={decrease}>–</button>
        <span>{qty}</span>
        <button onClick={increase}>+</button>
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
        className="mt-auto bg-dark text-white py-2 rounded-lg"
      >
        Get quote
      </button>
    </div>
  );
}
