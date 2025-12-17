export default function Hero() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 bg-white">
      <div className="max-w-4xl w-full text-center bg-primary/30 rounded-3xl p-12 md:p-16">
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-dark">
          Custom Branded Promotional Products
        </h1>

        <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-700">
          Pens, notebooks, bags & corporate giveaways for UK businesses
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/products"
            className="bg-white px-8 py-3 rounded-lg font-semibold border hover:bg-gray-50 transition"
          >
            View Products
          </a>

          <a
            href="/quote"
            className="bg-dark text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Get a Quote
          </a>
        </div>

      </div>
    </section>
  );
}
