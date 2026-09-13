export default function Categories() {
  const categories = [
    { label: "Pens", value: "Pen" },
    { label: "Notebooks", value: "Notebook" },
    { label: "Key Rings", value: "Key Ring" },
    { label: "Bags", value: "Bags" },
    { label: "Gift Sets", value: "Combo Sets" },
    { label: "Pen Gift Boxes", value: "Gift Boxes" },
  ];

  return (
    <section className="bg-secondary/40">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">

        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-10">
          Product Categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category) => (
            <a
              key={category.value}
              href={`/products?category=${encodeURIComponent(category.value)}`}
              className="bg-white rounded-xl px-4 py-6 md:p-6 text-center font-semibold shadow-sm hover:shadow-md transition"
            >
              {category.label}
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
