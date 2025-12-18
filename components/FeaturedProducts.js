"use client";

import { useRef } from "react";

const products = [
  { id: 1, name: "Branded Pen", price: "£0.60" },
  { id: 2, name: "Custom Notebook", price: "£2.40" },
  { id: 3, name: "Eco Travel Mug", price: "£3.10" },
  { id: 4, name: "Canvas Tote Bag", price: "£1.95" },
  { id: 5, name: "Metal Key Ring", price: "£0.85" },
  { id: 6, name: "Desk Notepad", price: "£1.20" },
];

export default function FeaturedProducts() {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    const amount = direction === "left" ? -300 : 300;
    sliderRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold">
            Featured Products
          </h2>

          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="border rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100"
            >
              ←
            </button>
            <button
              onClick={() => scroll("right")}
              className="border rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100"
            >
              →
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[80%] sm:min-w-[260px] border rounded-xl p-5 flex-shrink-0 hover:shadow-md transition"
            >
              {/* Image placeholder */}
              <div className="h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-sm text-gray-500">
                Product Image
              </div>

              <h3 className="font-semibold mb-1">
                {product.name}
              </h3>

              <p className="text-sm text-gray-500 mb-3">
                ★★★★★ 5/5
              </p>

              <p className="text-sm font-medium mb-4">
                as low as {product.price}
              </p>

              <a
                href="/products"
                className="block text-center bg-dark text-white py-3 rounded-lg font-semibold hover:opacity-90"
              >
                View Product
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
