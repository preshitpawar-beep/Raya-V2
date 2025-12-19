export default function CTA() {
  return (
    <section className="py-20 bg-white text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to brand your products?
        </h2>
        <p className="text-gray-700 mb-8">
          Get a personalised quote for your business today.
        </p>
        <a
          href="/quote"
          className="inline-block bg-dark text-white px-8 py-4 rounded-xl font-semibold text-base hover:opacity-90"
        >
          Get a quote
        </a>
      </div>
    </section>
  );
}
