export default function Hero() {
  return (
    <section className="min-h-[70vh] flex flex-col justify-center items-center text-center px-6 bg-primary">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Custom Branded Promotional Products
      </h1>
      <p className="max-w-xl mb-6 text-lg">
        Pens, notebooks, bags & corporate giveaways for UK businesses
      </p>
      <div className="flex gap-4">
        <a href="/products" className="bg-white px-6 py-3 rounded font-semibold">
          View Products
        </a>
        <a href="/quote" className="bg-dark text-white px-6 py-3 rounded font-semibold">
          Get a Quote
        </a>
      </div>
    </section>
  );
}
