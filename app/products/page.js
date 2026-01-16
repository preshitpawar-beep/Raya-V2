"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import ProductsGrid from "../../components/ProductsGrid";
import { products } from "../../components/productsData";

export default function Products() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;

    const terms = searchQuery
      .toLowerCase()
      .split(" ")
      .filter(Boolean);

    return products.filter((product) => {
      const searchableText = `
        ${product.name}
        ${product.category}
        ${product.material || ""}
        ${(product.colours || []).join(" ")}
      `.toLowerCase();

      return terms.every((term) => searchableText.includes(term));
    });
  }, [searchQuery]);

  return (
    <main className="bg-[#F7F8FA]">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">

        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          Products
        </h1>

        {/* SEARCH FEEDBACK */}
        {searchQuery && (
          <p className="mb-8 text-sm text-gray-600">
            Showing results for{" "}
            <span className="font-medium text-dark">
              “{searchQuery}”
            </span>
          </p>
        )}

        {/* EMPTY STATE */}
        {filteredProducts.length === 0 ? (
          <p className="text-gray-600">
            No products found. Try searching for pens, notebooks, bags or key rings.
          </p>
        ) : (
          <ProductsGrid products={filteredProducts} />
        )}

      </div>
    </main>
  );
}
