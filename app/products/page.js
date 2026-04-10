import ProductsGrid from "../../components/ProductsGrid";

export const metadata = {
  title: "Branded Promotional Products",
  description:
    "Browse our full range of custom branded promotional products for UK businesses. Pens, notebooks, bags, keyrings, gift sets and more — filter by category, colour and material. Prices include one standard branding method.",
  alternates: {
    canonical: "https://www.legacyimprint.co.uk/products",
  },
  openGraph: {
    title: "Branded Promotional Products | Legacy Imprint SW",
    description:
      "Browse pens, notebooks, bags, keyrings and gift sets — all custom branded for UK businesses. Prices include one standard branding method.",
    url: "https://www.legacyimprint.co.uk/products",
  },
};

export default function Products({ searchParams }) {
  return (
    <main className="bg-[#F7F8FA]">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10">
          Products
        </h1>
        <ProductsGrid
          initialSearch={searchParams?.search || ""}
          initialCategory={searchParams?.category || "All"}
        />
      </div>
    </main>
  );
}
