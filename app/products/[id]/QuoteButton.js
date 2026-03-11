"use client";

import Link from "next/link";

export default function QuoteButton({ product, minQty }) {
  const handleClick = () => {
    localStorage.setItem(
      "quoteItem",
      JSON.stringify({
        id: product.id,
        product: product.name,
        quantity: minQty,
        price: product.price,
        category: product.category,
      })
    );
  };

  return (
    <Link
      href={`/quote?product=${encodeURIComponent(product.name)}&qty=${minQty}`}
      onClick={handleClick}
      className="flex-1 bg-dark text-white text-center py-3.5 rounded-xl font-semibold hover:opacity-90 transition active:scale-95"
    >
      Get a Quote
    </Link>
  );
}
