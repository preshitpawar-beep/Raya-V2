export default function CTA() {
  return (
    <section className="py-20 bg-primary text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Brand Your Products?
        </h2>
        <p className="text-lg mb-8">
          Get a personalised quote for your business today.
        </p>
        <a
          href="/quote"
          className="inline-block bg-dark text-white px-8 py-4 rounded font-semibold"
        >
          Get a Quote
        </a>
      </div>
    </section>
  );
}
