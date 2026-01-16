export default function WhyChoose() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* LEFT — BRAND STATEMENT */}
          <div>
            <h2 className="text-3xl md:text-4xl font-medium text-dark leading-tight">
              A calmer, more considered way
              <br />
              to create branded merchandise.
            </h2>

            <p className="mt-6 text-lg text-gray-700 leading-relaxed max-w-xl">
              We believe promotional products should feel purposeful — not rushed,
              overcomplicated, or disposable.
            </p>

            <p className="mt-4 text-gray-700 leading-relaxed max-w-xl">
              Our role is to guide you through the process with clarity, helping
              you choose products that represent your business properly and
              stand up to everyday use.
            </p>
          </div>

          {/* RIGHT — PRINCIPLES */}
          <div className="space-y-6">

            <div className="rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-dark mb-2">
                Clarity over complexity
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                We keep things straightforward — clear options, honest guidance,
                and no unnecessary layers.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-dark mb-2">
                Quality you can stand behind
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Products are selected for how they feel, perform, and last —
                not just how they look in a catalogue.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-dark mb-2">
                A personal, considered process
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Every enquiry is handled thoughtfully, with attention to detail
                and an understanding of your brand’s context.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
