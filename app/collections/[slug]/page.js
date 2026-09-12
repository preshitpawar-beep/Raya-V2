import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "../../../components/productsData";
import { COLLECTIONS, getCollection } from "../../../components/collections";

const toSlug = (id) => id.replace(/\s+/g, "-");
const lowest = (p) => (p.pricing ? Math.min(...Object.values(p.pricing)) : p.price);
const BASE = "https://www.legacyimprint.co.uk";

export async function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const c = getCollection(params.slug);
  if (!c) return { title: "Collection Not Found" };
  const count = products.filter(c.match).length;
  const description = `${c.intro} Browse ${count} options, all with branding included and free digital proofs.`;
  return {
    title: `${c.h1} | UK`,
    description: description.slice(0, 300),
    alternates: { canonical: `${BASE}/collections/${c.slug}` },
    openGraph: {
      title: `${c.h1} | Legacy Imprint SW`,
      description: c.intro,
      url: `${BASE}/collections/${c.slug}`,
    },
  };
}

export default function CollectionPage({ params }) {
  const c = getCollection(params.slug);
  if (!c) notFound();

  const items = products.filter(c.match);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: c.h1,
    description: c.intro,
    url: `${BASE}/collections/${c.slug}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.slice(0, 30).map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${BASE}/products/${toSlug(p.id)}`,
        name: p.name,
      })),
    },
  };

  return (
    <main className="bg-[#F7F8FA] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        <nav className="text-xs text-gray-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-dark transition">Home</Link>
          <span>›</span>
          <Link href="/products" className="hover:text-dark transition">Products</Link>
          <span>›</span>
          <span className="text-dark font-medium">{c.title}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-3">{c.h1}</h1>
        <p className="text-gray-700 max-w-2xl mb-8">{c.intro}</p>

        {items.length === 0 ? (
          <p className="text-gray-500">
            Nothing here just yet.{" "}
            <Link href="/products" className="underline">Browse all products</Link>.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {items.map((p) => (
              <Link
                key={p.id}
                href={`/products/${toSlug(p.id)}`}
                className="product-card bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden group"
              >
                <div className="relative h-40 bg-gray-50 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={`${p.name} – custom branded ${p.category.toLowerCase()}`}
                    fill
                    sizes="25vw"
                    className="card-image object-contain p-3"
                  />
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-dark leading-snug line-clamp-2">{p.name}</p>
                  <p className="text-xs text-gray-400 mt-1">From £{lowest(p).toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-sm font-semibold text-dark mb-4">Other collections</h2>
          <div className="flex flex-wrap gap-2.5">
            {COLLECTIONS.filter((x) => x.slug !== c.slug).map((x) => (
              <Link
                key={x.slug}
                href={`/collections/${x.slug}`}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-dark hover:border-dark transition"
              >
                {x.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
