"use client";

import { useRef } from "react";
import Link from "next/link";
import { products } from "./productsData";

/* ---------- CURATED FEATURED SELECTION ---------- */

const byPriceDesc = (a, b) => b.price - a.price;

// Premium metal pens
const premiumPens = products
  .filter((p) => p.category === "Pen" && p.price >= 2.5)
  .sort(byPriceDesc)
  .slice(0, 2);

// Good plastic pen
const plasticPen = products
  .filter((p) => p.category === "Pen" && p.price >= 1 && p.price < 2.5)
  .sort(byPriceDesc)
  .slice(0, 1);

// Notebooks
const notebooks = products
  .filter(
    (p) =>
      p.category === "Notebook" ||
      (p.category === "Combo Sets" &&
        p.name.toLowerCase().includes("notebook"))
  )
  .sort(byPriceDesc)
  .slice(0, 2);

// Keyrings
const keyrings = products
  .filter((p) => p.category === "Key Ring")
  .sort(byPriceDesc)
  .slice(0, 2);

// Combo gift sets
const comboSets = products
  .filter((p) => p.category === "Combo Sets")
  .sort(byPriceDesc)
  .slice(0, 3);

// Bags
const bags = products
  .filter((p) => p.category === "Bags")
  .sort(byPriceDesc)
  .slice(0, 2);

const featuredProducts = [
  ...premiumPens,
  ...plasticPen,
  ...notebooks,
  ...keyrings,
  ...comboSets,
  ...bags,
];

export default function FeaturedProducts() {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
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

        {/* ===== SLIDER ===== */}
        <div className="relative">

          {/* MOBILE EDGE FADES */}
          <div className="md:hidden pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="md:hidden pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent z-10" />

          {/* LEFT ARROW (DESKTOP) */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-white border shadow hover:shadow-md transition"
          >
            ←
          </button>

          {/* SLIDER */}
          <div
            ref={sliderRef}
            className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
          >
            {featuredProducts.map((product) => (
              <FeaturedCard key={product.id} product={product} />
            ))}
          </div>

          {/* RIGHT ARROW (DESKTOP) */}
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-white border shadow hover:shadow-md transition"
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
      className="
        snap-start
        min-w-[200px] max-w-[200px]
        md:min-w-[260px] md:max-w-[260px]
        rounded-xl
        bg-white
        border
        shadow-sm
        hover:shadow-lg
        transition
        flex-shrink-0
        flex
        flex-col
      "
    >
      {/* IMAGE SLOT — FIXED HEIGHT */}
      <div className="h-[150px] md:h-[180px] flex items-center justify-center">
        <img
          src={`/products/${product.id}.jpg`}
          alt={product.name}
          className="max-h-full object-contain"
          onError={(e) => (e.currentTarget.src = product.image)}
        />
      </div>

      {/* CONTENT */}
      <div className="px-4 pb-4 flex flex-col flex-1">
        <h3 className="text-sm font-semibold leading-snug mb-1">
          {product.name}
        </h3>

        <p className="text-xs text-gray-600 mb-4">
          From £{product.price.toFixed(2)} per unit
        </p>

        {/* BUTTON LOCKED TO BOTTOM */}
        <span className="mt-auto inline-block bg-dark text-white py-2 px-4 rounded-lg text-sm font-semibold text-center">
          View product
        </span>
      </div>
    </Link>
  );
}
