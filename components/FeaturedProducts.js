"use client";

import { useRef } from "react";
import Link from "next/link";
import { products } from "./productsData";

/* ---------- CURATED PREMIUM SELECTION ---------- */
const featuredProducts = products
  .filter((p) => {
    if (p.category === "Pen") return p.price >= 1.5;
    if (["Combo Sets", "Bags", "Key Ring"].includes(p.category)) return true;
    return false;
  })
  .slice(0, 10);

export default function FeaturedProducts() {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-14">

        {/* ===== HEADER ===== */}
        <div className="mb-8 max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">
            Featured products
          </p>
          <h2 className="text-3xl md:text-4xl font-medium leading-tight text-dark">
            A curated selection businesses choose with confidence.
          </h2>
        </div>

        {/* ===== SLIDER WRAPPER ===== */}
        <div className="relative">

          {/* LEFT ARROW — DESKTOP ONLY */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white border shadow hover:shadow-md transition"
          >
            ←
          </button>

          {/* SLIDER */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
          >
            {featuredProducts.map((product) => (
              <FeaturedCard key={product.id} product={product} />
            ))}
          </div>

          {/* RIGHT ARROW — DESKTOP ONLY */}
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white border shadow hover:shadow-md transition"
          >
            →
          </button>
        </div>

        {/* ===== VIEW ALL ===== */}
        <div className="mt-8">
          <Link
            href="/products"
            className="inline-block border border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            View all products
          </Link>
        </div>

      </div>
    </section>
  );
}

/* ================= CARD ================= */

function FeaturedCard({ product }) {
  return (
    <Link
      href="/products"
      className="snap-start min-w-[260px] max-w-[260px] rounded-xl bg-white border shadow-sm hover:shadow-lg transition flex-shrink-0"
    >
      <img
        src={`/products/${product.id}.jpg`}
        alt={product.name}
        className="h-48 object-contain my-4 mx-auto"
        onError={(e) => (e.currentTarget.src = product.image)}
      />

      <div className="px-4 pb-5">
        <h3 className="text-sm font-semibold leading-snug mb-1">
          {product.name}
        </h3>

        <p className="text-xs text-gray-600 mb-4">
          From £{product.price.toFixed(2)} per unit
        </p>

        <span className="inline-block bg-dark text-white py-2 px-4 rounded-lg text-sm font-semibold">
          View product
        </span>
      </div>
    </Link>
  );
}
