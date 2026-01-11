"use client";

import { useState, useMemo } from "react";
import { products } from "./productsData";

const CATEGORIES = ["All", "Pen", "Notebook", "Key Ring", "Combo Sets", "Bags"];

export default function ProductsGrid() {
  const [active, setActive] = useState("All");

  const filteredProducts = useMemo(() => {
    if (active === "All") return products;
    return products.filter((p) => p.category === active);
  }, [active]);

  return (
    <div>
      {/* FILTERS */}
      <div className="mb-6">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition ${
                active === cat
                  ? "bg-dark text-white border-dark"
                  : "bg-white text-gray-700 border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={`${product.category}-${product.id || "X"}-${index}`}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------- PRODUCT CARD ---------------- */

function ProductCard({ product }) {
  const [qty, setQty] = useState(50);

  const increase = () => setQty((q) => q + 10);
  const decrease = () => setQty((q) => (q > 50 ? q - 10 : q));

  return (
    <div className="rounded-xl p-4 md:p-6 bg-white shadow-sm border border-gray-100 flex flex-col">
      
      {/* IMAGE (PORTRAIT FRIENDLY) */}
      <div className="w-full bg-gray-50 rounded-lg mb-4 flex items-center justify-center p-4">
  <img
    src={`/products/${product.id}.jpg`}
    alt={product.name}
    className="max-h-[260px] w-auto object-contain"
    onError={(e) => {
      e.currentTarget.src = "/placeholder.jpg";
    }}
  />
</div>

      {/* TITLE */}
      <h3 className="text-sm md:text-base font-semibold mb-1 leading-snug">
        {product.name}
      </h3>

      {/* PRICE */}
      <p className="text-xs text-gray-600">
        From £{product.price.toFixed(2)} per unit
      </p>

      <p className="text-[11px] text-gray-400 mb-3">
        Products are subject to availability
      </p>

      {/* QTY */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-600">Qty</span>
        <div className="flex items-center border rounded-lg overflow-hidden">
          <button onClick={decrease} className="px-3 py-1 text-sm">–</button>
          <span className="px-3 text-sm font-medium">{qty}</span>
          <button onClick={increase} className="px-3 py-1 text-sm">+</button>
        </div>
      </div>

      {/* CTA */}
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
