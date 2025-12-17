export default function WhyChoose() {
  const points = [
    "Custom Branding for Your Business",
    "Bulk Order Friendly Pricing",
    "Fast UK-wide Delivery",
    "High Quality Materials",
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">
          Why Choose Raya
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {points.map((point) => (
            <div
              key={point}
              className="bg-secondary p-6 rounded-xl font-semibold"
            >
              {point}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
