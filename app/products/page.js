import ProductsGrid from "../../components/ProductsGrid";

export default function Products({ searchParams }) {
  return (
    <main className="bg-[#F7F8FA]">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">

        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10">
          Products
        </h1>

        {/* 🔗 PASS SEARCH PARAM INTO GRID */}
        <ProductsGrid initialSearch={searchParams?.search || ""} />

      </div>
    </main>
  );
}
