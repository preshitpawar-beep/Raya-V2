import ProductsGrid from "../../components/ProductsGrid";

export default function Products({ searchParams }) {
  const search = searchParams?.search || "";

  return (
    <main className="bg-[#F7F8FA]">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10">
          Products
        </h1>

        <ProductsGrid initialSearch={search} />
      </div>
    </main>
  );
}
