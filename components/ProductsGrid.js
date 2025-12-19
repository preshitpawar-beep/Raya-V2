"use client";

import { useState } from "react";

export default function ProductsGrid() {
  const categories = [
    "All",
    "Pen",
    "Notebook",
    "Notepad",
    "Coaster",
    "Key Ring",
    "Bags",
  ];

  const [active, setActive] = useState("All");

  return (
    <div>
      {/* FILTERS */}
      <div className="mb-6">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition
                ${
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
        {Array.from({ length: 9 }).map((_, i) => (
          <ProductCard key={i} />
        ))}
      </div>
    </div>
  );
}

/* ---------------- PRODUCT CARD ---------------- */

function ProductCard() {
  const [qty, setQty] = useState(50);

  const increase = () => setQty((prev) => prev + 50);
  const decrease = () => setQty((prev) => (prev > 50 ? prev - 50 : prev));

  return (
    <div className="border rounded-xl p-4 md:p-6 bg-white shadow-sm">
      
      {/* IMAGE */}
      <div className="h-32 md:h-40 bg-gray-100 rounded-lg mb-3 flex items-center justify-center text-xs text-gray-500">
        Product Image
      </div>

      {/* TITLE */}
      <h3 className="text-sm md:text-base font-semibold mb-1 leading-snug">
        Sample Product
      </h3>

      {/* PRICE (placeholder for now) */}
      <p className="text-xs text-gray-600 mb-3">
        From £X per unit
      </p>

      {/* QUANTITY STEPPER */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-600">Qty</span>

        <div className="flex items-center border rounded-lg overflow-hidden">
          <button
            onClick={decrease}
            className="px-3 py-1 text-sm"
          >
            –
          </button>
          <span className="px-3 text-sm font-medium">
            {qty}
          </span>
          <button
            onClick={increase}
            className="px-3 py-1 text-sm"
          >
            +
          </button>
        </div>
      </div>

      {/* CTA */}
      <a
        href="/quote"
        className="block text-center bg-dark text-white py-2.5 rounded-lg text-sm font-medium hover:opacity-90"
      >
        Get quote
      </a>
    </div>
  );
}
