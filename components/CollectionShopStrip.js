import Link from "next/link";
import Reveal from "./Reveal";
import { COLLECTIONS } from "./collections";
import { products } from "./productsData";

// Surface the highest-intent collections for browsing + internal linking (SEO).
const SHOW = [
  "new-products",
  "promotional-pens",
  "metal-promotional-pens",
  "eco-promotional-pens",
  "blue-promotional-pens",
  "branded-tote-bags",
  "branded-notebooks",
  "corporate-gift-sets",
  "branded-keyrings",
  "pen-gift-boxes",
  "branded-card-holders-organisers",
];

export default function CollectionShopStrip() {
  const items = SHOW.map((s) => COLLECTIONS.find((c) => c.slug === s))
    .filter(Boolean)
    .filter((c) => products.some(c.match)); // hide a collection with nothing in it (e.g. New In between batches)
  return (
    <section className="bg-white py-14">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold text-dark mb-2">Shop by collection</h2>
          <p className="text-gray-700 mb-8">Jump straight to what you're looking for.</p>
        </Reveal>
        <div className="flex flex-wrap gap-3">
          {items.map((c, i) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-dark hover:border-dark hover:bg-gray-50 transition"
            >
              {c.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
