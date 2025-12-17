export default function Categories() {
  const categories = [
    "Pens",
    "Notebooks",
    "Notepads",
    "Coasters",
    "Key Rings",
    "Bags",
  ];

  return (
    <section className="py-16 bg-accent">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Product Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <a
              key={category}
              href="/products"
              className="bg-white rounded-lg p-6 text-center font-semibold shadow-sm hover:shadow-md transition"
            >
              {category}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
