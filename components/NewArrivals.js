import Image from "next/image";
import Link from "next/link";
import { products } from "./productsData";
import { isNewProduct, categoryPlural } from "./productAttributes";

/* ─────────────────────────────────────────────
   NEW IN (homepage)
   Driven by each product's "addedOn" date, so it fills itself when a new batch is
   added to productsData.js and disappears when nothing is new any more.
───────────────────────────────────────────── */

const toSlug = (id) => id.replace(/\s+/g, "-");
const SHOW = 8;

function buildNewIn() {
  const items = products.filter((p) => isNewProduct(p));
  if (!items.length) return null;

  // Group by category, biggest group first.
  const groups = {};
  items.forEach((p) => { (groups[p.category] = groups[p.category] || []).push(p); });
  const cats = Object.keys(groups).sort((a, b) => groups[b].length - groups[a].length);

  // Spread picks through each group (avoids showing four colours of the same design),
  // then take them in turn from each category so the mix is varied.
  const spread = (list) => {
    const n = Math.min(list.length, Math.ceil(SHOW / cats.length) + 1);
    return Array.from({ length: n }, (_, i) => list[Math.floor((i * list.length) / n)]);
  };
  const queues = cats.map((c) => spread(groups[c]));
  const picks = [];
  while (picks.length < SHOW && queues.some((q) => q.length)) {
    queues.forEach((q) => { if (q.length && picks.length < SHOW) picks.push(q.shift()); });
  }

  const latest = items.map((p) => p.addedOn).sort().pop();
  const month = new Date(latest).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  return {
    total: items.length,
    month,
    categories: cats.map((c) => ({ value: c, label: categoryPlural(c), count: groups[c].length })),
    picks,
  };
}

const newIn = buildNewIn();

export default function NewArrivals() {
  if (!newIn) return null;
  const { total, month, categories, picks } = newIn;

  return (
    <section className="bg-[#F7F8FA] py-16" aria-labelledby="new-in-heading">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 mb-3">
              <span className="bg-dark text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider">NEW</span>
              New in · {month}
            </p>
            <h2 id="new-in-heading" className="text-3xl md:text-4xl font-medium leading-tight text-dark">
              Just added to the range
            </h2>
            <p className="text-gray-700 mt-3">
              {total} new products, each ready for your logo with branding and a free digital proof included.
            </p>
          </div>
          <Link
            href="/collections/new-products"
            className="self-start md:self-auto inline-block bg-dark text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition whitespace-nowrap"
          >
            See all {total} new products
          </Link>
        </div>

        {/* Jump straight to a type of new product */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((c) => (
            <Link
              key={c.value}
              href={`/products?new=1&category=${encodeURIComponent(c.value)}`}
              className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-dark hover:border-dark transition"
            >
              New {c.label} <span className="text-gray-400">{c.count}</span>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {picks.map((p) => (
            <Link
              key={p.id}
              href={`/products/${toSlug(p.id)}`}
              className="product-card group rounded-xl bg-white border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition"
            >
              <div className="relative h-36 md:h-44 bg-white">
                <span className="absolute top-2 left-2 z-10 bg-dark text-white text-[10px] font-bold px-2 py-0.5 rounded-full leading-4">
                  New
                </span>
                <Image
                  src={p.image}
                  alt={`${p.name} – new custom branded product`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="px-4 py-4 flex flex-col flex-1">
                <h3 className="text-sm font-semibold text-dark leading-snug line-clamp-2">{p.name}</h3>
                <p className="text-sm font-semibold text-dark mt-1.5">
                  From £{p.price.toFixed(2)} <span className="text-xs font-normal text-gray-400">per unit</span>
                </p>
                <p className="text-[11px] text-gray-400 mt-1">Min {p.moq || 50} units</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
