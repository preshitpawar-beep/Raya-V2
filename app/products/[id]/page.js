import Image from "next/image";
import Link from "next/link";
import QuoteButton from "./QuoteButton";
import { notFound } from "next/navigation";
import { products } from "../../../components/productsData";

/* ── helpers ── */
const MOQ = { Pen: 50, Notebook: 10, "Key Ring": 30, "Combo Sets": 10, Bags: 10 };

const ECO_KEYWORDS = ["eco", "bamboo", "cork", "jute", "cotton", "paper"];
const isEco = (p) => ECO_KEYWORDS.some((k) => p.name.toLowerCase().includes(k));

function getRelated(product) {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);
}

/* ── metadata ── */
export async function generateMetadata({ params }) {
  const product = products.find(
    (p) => encodeURIComponent(p.id) === params.id || p.id === decodeURIComponent(params.id)
  );
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} – Custom Branded ${product.category}`,
    description: `${product.name} from £${product.price.toFixed(2)} excl. VAT. Custom branded ${product.category.toLowerCase()} for UK businesses. Branding included, no setup fees.`,
    alternates: {
      canonical: `https://www.legacyimprint.co.uk/products/${encodeURIComponent(product.id)}`,
    },
    openGraph: {
      title: `${product.name} | Legacy Imprint SW`,
      description: `Custom branded ${product.category.toLowerCase()} from £${product.price.toFixed(2)}. Branding included.`,
      images: [`/products/${product.id}.jpg`],
    },
  };
}

/* ── static params ── */
export async function generateStaticParams() {
  return products.map((p) => ({ id: encodeURIComponent(p.id) }));
}

/* ── page ── */
export default function ProductPage({ params }) {
  const product = products.find(
    (p) => encodeURIComponent(p.id) === params.id || p.id === decodeURIComponent(params.id)
  );

  if (!product) notFound();

  const minQty = MOQ[product.category] || 10;
  const related = getRelated(product);
  const eco = isEco(product);

  return (
    <main className="bg-[#F7F8FA] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-10 md:py-16">

        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-dark transition">Home</Link>
          <span>›</span>
          <Link href="/products" className="hover:text-dark transition">Products</Link>
          <span>›</span>
          <span className="text-dark font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Main product section */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">

          {/* Image */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center p-8 min-h-[340px] relative">
            {eco && (
              <span className="absolute top-4 left-4 bg-green-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                Eco-Friendly
              </span>
            )}
            <div className="relative w-full h-72">
              <Image
                src={`/products/${product.id}.jpg`}
                alt={`${product.name} – custom branded ${product.category.toLowerCase()}`}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 90vw, 45vw"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">

            {/* Category pill */}
            <span className="inline-flex self-start text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full mb-3">
              {product.category}
            </span>

            <h1 className="text-2xl md:text-3xl font-bold text-dark leading-tight mb-3">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-dark">
                From £{product.price.toFixed(2)}
              </span>
              <span className="text-sm text-gray-400">per unit (excl. VAT)</span>
            </div>
            <p className="text-xs text-gray-400 mb-6">
              Price includes one standard branding method. No setup fees.
            </p>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 mb-7">
              {[
                { icon: "✓", label: "Branding included" },
                { icon: "🚚", label: "UK delivery" },
                { icon: "🖼", label: "Free visual proof" },
                { icon: "💬", label: "1-day response" },
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

            {/* Minimum order */}
            <p className="text-xs text-gray-500 mb-5">
              Minimum order quantity: <span className="font-semibold text-dark">{minQty} units</span>
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <Link
                href={`/quote?product=${encodeURIComponent(product.name)}&qty=${minQty}`}
                onClick={() => {
                  if (typeof window !== "undefined") {
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
                  }
                }}
                className="flex-1 bg-dark text-white text-center py-3.5 rounded-xl font-semibold hover:opacity-90 transition active:scale-95"
              >
                Get a Quote
              </Link>
              <Link
                href="/products"
                className="flex-1 border border-gray-200 text-dark text-center py-3.5 rounded-xl font-semibold hover:bg-white transition"
              >
                ← Back to Products
              </Link>
            </div>
          </div>
        </div>

        {/* Info tabs – static, clean layout */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 mb-16">
          <h2 className="text-base font-bold text-dark mb-6">Product Details</h2>
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
                  { label: "Min. Order", value: `${minQty} units` },
                  { label: "Material", value: product.id.startsWith("MP") ? "Metal" : product.category === "Bags" ? "Jute / Cotton" : "Plastic / Mixed" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm border-b border-gray-50 pb-2">
                    <dt className="text-gray-500">{label}</dt>
                    <dd className="font-medium text-dark">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Branding */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
                Branding Options
              </h3>
              <dl className="space-y-3">
                {[
                  { label: "Screen Print", value: "Included ✓" },
                  { label: "Pad Print", value: "Included ✓" },
                  { label: "Laser Engrave", value: "On request" },
                  { label: "Setup Fee", value: "None ✓" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm border-b border-gray-50 pb-2">
                    <dt className="text-gray-500">{label}</dt>
                    <dd className="font-medium text-dark">{value}</dd>
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
                  { label: "Standard", value: "10–14 working days" },
                  { label: "Express", value: "5–7 working days" },
                  { label: "Area", value: "UK Mainland" },
                  { label: "Courier", value: "DPD / Royal Mail" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm border-b border-gray-50 pb-2">
                    <dt className="text-gray-500">{label}</dt>
                    <dd className="font-medium text-dark">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-dark mb-2">
              Similar {product.category}s You Might Like
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Other popular {product.category.toLowerCase()}s with branding included
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${encodeURIComponent(p.id)}`}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition group"
                >
                  <div className="relative h-36 bg-gray-50">
                    <Image
                      src={`/products/${p.id}.jpg`}
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
                    <p className="text-xs text-gray-400 mt-1">From £{p.price.toFixed(2)}</p>
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
