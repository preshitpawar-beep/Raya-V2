import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "../../../components/productsData";
import ProductZoomButton from "./ProductZoomButton";
import PricingSection from "./PricingSection";
import { colourList, isNaturalMaterial, isNewProduct, CATEGORY_COLLECTION, categoryLabel } from "../../../components/productAttributes";
import { COLLECTIONS } from "../../../components/collections";

/* ── helpers ── */
const isEco = isNaturalMaterial;
const BASE_URL = "https://www.legacyimprint.co.uk";
// Image paths contain spaces (e.g. "Sr 340.jpg"), so encode them for absolute URLs.
const imageUrl = (p) => `${BASE_URL}${encodeURI(p.image)}`;
const lowestOf = (p) => (p.pricing ? Math.min(...Object.values(p.pricing)) : p.price);
const highestOf = (p) => (p.pricing ? Math.max(...Object.values(p.pricing)) : p.price);

// Search-result length description (about 155 characters). Uses the first sentence of
// the description when it fits; otherwise the first clause, then the product name.
function metaDescription(p) {
  const MAX = 158;
  const tail = ` From £${lowestOf(p).toFixed(2)} per unit ex VAT, logo branding included. MOQ ${p.moq || 50}.`;
  const first = (p.description || "").split(/(?<=\.)\s/)[0];
  if ((first + tail).length <= MAX) return first + tail;
  const room = MAX - tail.length;
  const clause = first.slice(0, room).split(",").slice(0, -1).join(",");
  if (clause.length >= 40) return `${clause}.${tail}`;
  const named = `Custom branded ${p.name}.`;
  return (named + tail).length <= MAX ? named + tail : `${named.slice(0, MAX - 1)}…`;
}

function pageTitle(p) {
  const label = categoryLabel(p);
  return p.name.toLowerCase().includes(label.toLowerCase())
    ? `${p.name} | Custom Branded`
    : `${p.name} | Custom Branded ${label}`;
}

const collectionFor = (p) => COLLECTIONS.find((c) => c.slug === CATEGORY_COLLECTION[p.category]);

function getNameKeywords(name) {
  const stripped = name.replace(/^[\w\s]+ - /, "").toLowerCase();
  return stripped.split(/[\s\-–|()×,/]+/).filter(
    (w) => w.length > 2 && !["and", "the", "with", "size", "gsm", "cm", "in"].includes(w)
  );
}

function getRelated(product) {
  const keywords = getNameKeywords(product.name);
  const sameCat = products.filter((p) => p.id !== product.id && p.category === product.category);
  const scored = sameCat.map((p) => {
    const pKeywords = getNameKeywords(p.name);
    const sharedKeywords = keywords.filter((k) => pKeywords.includes(k)).length;
    const priceSimilar = Math.abs(p.price - product.price) / (product.price || 1) < 0.5 ? 1 : 0;
    return { p, score: sharedKeywords * 2 + priceSimilar };
  });
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return Math.random() - 0.5;
  });
  return scored.slice(0, 4).map((s) => s.p);
}

/* ── slug helpers ── */
const toSlug = (id) => id.replace(/\s+/g, "-");

/* ── metadata ── */
export async function generateMetadata({ params }) {
  const slug = params.id;
  const product = products.find(
    (p) => toSlug(p.id) === slug || p.id === slug
  );
  if (!product) return { title: "Product Not Found" };

  const canonical = `${BASE_URL}/products/${toSlug(product.id)}`;
  const title = pageTitle(product);
  const description = metaDescription(product);
  const image = { url: imageUrl(product), alt: `${product.name} (${product.sku || product.id})` };

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${product.name} | Legacy Imprint SW`,
      description,
      url: canonical,
      siteName: "Legacy Imprint SW",
      locale: "en_GB",
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Legacy Imprint SW`,
      description,
      images: [image.url],
    },
  };
}

/* ── static params ── */
export async function generateStaticParams() {
  return products.map((p) => ({ id: toSlug(p.id) }));
}

/* ── page ── */
export default function ProductPage({ params }) {
  const slug = params.id;
  const product = products.find(
    (p) => toSlug(p.id) === slug || p.id === slug
  );

  if (!product) notFound();

  const moq = product.moq || 10;
  const related = getRelated(product);
  const eco = isEco(product);
  const BASE = "https://www.legacyimprint.co.uk";
  const lowestPrice = product.pricing ? Math.min(...Object.values(product.pricing)) : product.price;
  const collection = collectionFor(product);
  const pageUrl = `${BASE}/products/${toSlug(product.id)}`;
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.sku || product.id,
    mpn: product.sku || product.id,
    url: pageUrl,
    image: imageUrl(product),
    category: categoryLabel(product),
    ...(colourList(product) ? { color: colourList(product) } : {}),
    ...(product.material ? { material: product.material } : {}),
    brand: { "@type": "Brand", name: "Legacy Imprint SW" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "GBP",
      lowPrice: lowestOf(product).toFixed(2),
      highPrice: highestOf(product).toFixed(2),
      offerCount: product.pricing ? Object.keys(product.pricing).length : 1,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      url: pageUrl,
      seller: { "@type": "Organization", name: "Legacy Imprint SW", url: BASE },
    },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Products", item: `${BASE}/products` },
      ...(collection
        ? [{ "@type": "ListItem", position: 3, name: collection.title, item: `${BASE}/collections/${collection.slug}` }]
        : []),
      { "@type": "ListItem", position: collection ? 4 : 3, name: product.name, item: pageUrl },
    ],
  };

  return (
    <main className="bg-[#F7F8FA] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <div className="max-w-6xl mx-auto px-6 py-10 md:py-16">

        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-dark transition">Home</Link>
          <span>›</span>
          <Link href="/products" className="hover:text-dark transition">Products</Link>
          <span>›</span>
          {collection && (
            <>
              <Link href={`/collections/${collection.slug}`} className="hover:text-dark transition">{collection.title}</Link>
              <span>›</span>
            </>
          )}
          <span className="text-dark font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* ═══ MAIN PRODUCT SECTION ═══ */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">

          {/* ── Image ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center p-8 min-h-[340px] relative group">
            {eco && (
              <span className="absolute top-4 left-4 bg-green-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full z-10">
                Natural material
              </span>
            )}

            <ProductZoomButton product={product} />

            <div className="relative w-full h-72">
              <Image
                src={product.image}
                alt={`${product.name} – custom branded ${product.category.toLowerCase()}`}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 90vw, 45vw"
              />
            </div>
          </div>

          {/* ── Details ── */}
          <div className="flex flex-col">

            {/* Category pill (+ New) */}
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex self-start text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {product.category}
              </span>
              {isNewProduct(product) && (
                <Link href="/collections/new-products" className="inline-flex text-xs font-bold text-white bg-dark px-3 py-1 rounded-full hover:opacity-90">
                  New in
                </Link>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-dark leading-tight mb-4">
              {product.name}
            </h1>

            {/* ═══ INTERACTIVE PRICING (client component) ═══ */}
            <PricingSection product={product} moq={moq} />

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 mt-7 mb-4">
              {[
                { icon: "✓", label: "Branding included" },
                { icon: "🚚", label: "UK delivery" },
                { icon: "🖼", label: "Free visual proof" },
                { icon: "💬", label: "Fast response" },
              ].map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2.5 text-xs font-medium text-dark"
                >
                  <span>{icon}</span>
                  {label}
                </div>
              ))}
            </div>

            {/* Back link */}
            <Link
              href="/products"
              className="inline-flex self-start text-sm text-gray-500 hover:text-dark transition mt-2"
            >
              ← Back to products
            </Link>
          </div>
        </div>

        {/* ═══ PRODUCT DETAILS ═══ */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 mb-16">
          <h2 className="text-base font-bold text-dark mb-6">Product Details</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-8 max-w-3xl">{product.description}</p>
          <div className="grid md:grid-cols-3 gap-8">

            {/* Specifications */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
                Specifications
              </h3>
              <dl className="space-y-3">
                {[
                  { label: "Product Code", value: product.id },
                  { label: "Category", value: product.category },
                  { label: "Min. Order", value: `${moq} units` },
                  { label: "Material", value: product.material || "Ask us for details" },
                  ...(colourList(product) ? [{ label: "Colour", value: colourList(product) }] : []),
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-4 text-sm border-b border-gray-50 pb-2">
                    <dt className="text-gray-500 shrink-0">{label}</dt>
                    <dd className="font-medium text-dark text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Branding */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
                Branding
              </h3>
              <dl className="space-y-3">
                {[
                  { label: "1 Branding Method", value: "Included ✓" },
                  { label: "Options", value: "Pad / Laser · UV extra" },
                  { label: "Setup Fee", value: "None ✓" },
                  { label: "Visual Proof", value: "Free ✓" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-4 text-sm border-b border-gray-50 pb-2">
                    <dt className="text-gray-500 shrink-0">{label}</dt>
                    <dd className="font-medium text-dark text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Delivery */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
                Delivery
              </h3>
              <dl className="space-y-3">
                {[
                  { label: "Standard", value: "8–10 days after proof approval" },
                  { label: "Area", value: "UK Mainland" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-4 text-sm border-b border-gray-50 pb-2">
                    <dt className="text-gray-500 shrink-0">{label}</dt>
                    <dd className="font-medium text-dark text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

          </div>
        </div>

        {/* ═══ RELATED PRODUCTS ═══ */}
        {related.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-dark mb-2">
              Similar {/s$/.test(product.category) ? product.category : `${product.category}s`} You Might Like
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Other popular {product.category.toLowerCase()} with branding included
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${toSlug(p.id)}`}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition group"
                >
                  <div className="relative h-36 bg-gray-50">
                    <Image
                      src={p.image}
                      alt={`${p.name} – branded ${p.category.toLowerCase()}`}
                      fill
                      sizes="25vw"
                      className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-semibold text-dark leading-snug line-clamp-2">
                      {p.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      From £{(p.pricing ? Math.min(...Object.values(p.pricing)) : p.price).toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
