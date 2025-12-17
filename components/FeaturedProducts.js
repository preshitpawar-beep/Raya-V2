"use client";

import { useState } from "react";

export default function FeaturedProducts() {
  const products = Array.from({ length: 6 });

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Products
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((_, i) => (
            <div
              key={i}
              className="border rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="h-40 bg-gray-100 rounded mb-4 flex items-center justify-center">
                Product Image
              </div>

              <h3 className="font-semibold mb-2">
                Sample Product {i + 1}
              </h3>

              <p className="text-sm mb-4">From £X</p>

              <div className="flex items-center gap-3 mb-4">
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  className="w-20 border rounded px-2 py-1"
                />
                <span className="text-sm">Quantity</span>
              </div>

              <a
                href="/quote"
                className="block text-center bg-primary py-2 rounded font-semibold"
              >
                Get a Quote
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
