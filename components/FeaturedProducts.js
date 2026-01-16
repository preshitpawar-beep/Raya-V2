"use client";

import Link from "next/link";
import { products } from "./productsData";

/* --- SIMPLE PREMIUM FILTER --- */
const featuredProducts = products
  .filter(
    (p) =>
      ["Pen", "Notebook", "Combo Sets", "Bags"].includes(p.category) &&
      p.price >= 2
  )
  .slice(0, 6);

export default function FeaturedProducts() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-14">

        {/* ===== Section Header (Aligned with Hero) ===== */}
        <div className="mb-10 max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">
            Featured products
          </p>
          <h2 className="text-3xl md:text-4xl font-medium leading-tight text-dark">
            A curated selection of products businesses choose with confidence.
          </h2>
        </div>

        {/* ===== Products Grid ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <FeaturedCard key={product.id} product={product} />
          ))}
        </div>

        {/* ===== View All ===== */}
        <div className="mt-10">
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
      href={`/products`}
      className="group rounded-2xl bg-white border shadow-sm hover:shadow-lg transition flex flex-col"
    >
      <img
        src={product.image.replace(".png", ".jpg")}
        alt={product.name}
        className="h-48 object-contain my-4"
        onError={(e) => (e.currentTarget.src = product.image)}
      />

      <div className="px-4 pb-5">
        <h3 className="text-sm font-semibold leading-snug mb-1">
          {product.name}
        </h3>

        <p className="text-xs text-gray-600 mb-3">
          From £{product.price.toFixed(2)} per unit
        </p>

        <span className="inline-block mt-auto bg-dark text-white py-2 px-4 rounded-lg text-sm font-semibold">
          View product
        </span>
      </div>
    </Link>
  );
}
