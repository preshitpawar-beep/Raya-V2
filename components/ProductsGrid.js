"use client";

import { useState } from "react";

export default function ProductsGrid() {
  const categories = [
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
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => setActive("All")}
          className="px-4 py-2 bg-primary rounded"
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className="px-4 py-2 bg-gray-100 rounded"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="grid md:grid-cols-3 gap-8">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="border rounded-xl p-6 shadow-sm"
          >
            <div className="h-40 bg-gray-100 rounded mb-4 flex items-center justify-center">
              Product Image
            </div>

            <h3 className="font-semibold mb-2">
              Sample Product {i + 1}
            </h3>

            <div className="flex items-center gap-3 mb-4">
              <input
                type="number"
                min="1"
                defaultValue="1"
                className="w-20 border rounded px-2 py-1"
              />
              <span className="text-sm">Qty</span>
            </div>

            <a
              href="/quote"
              className="block text-center bg-primary py-2 rounded font-semibold"
            >
              Get Quote
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
