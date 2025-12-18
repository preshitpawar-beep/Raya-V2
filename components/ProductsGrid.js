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
      <div className="mb-8">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium border transition
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="border rounded-2xl p-5 md:p-6 shadow-sm bg-white"
          >
            {/* IMAGE */}
            <div className="h-44 md:h-40 bg-gray-100 rounded-lg mb-5 flex items-center justify-center text-sm text-gray-500">
              Product Image
            </div>

            {/* TITLE */}
            <h3 className="text-base font-semibold mb-3">
              Sample Product {i + 1}
            </h3>

            {/* QUANTITY */}
            <div className="flex items-center gap-3 mb-5">
              <input
                type="number"
                min="1"
                defaultValue="1"
                className="w-24 border rounded-lg px-3 py-2 text-base"
              />
              <span className="text-sm">Qty</span>
            </div>

            {/* CTA */}
            <a
              href="/quote"
              className="block text-center bg-dark text-white py-3.5 rounded-xl font-semibold text-base hover:opacity-90"
            >
              Get Quote
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
