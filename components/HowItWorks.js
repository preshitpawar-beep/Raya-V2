export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Browse or skip straight to a quote",
      desc:
        "Explore our catalogue and select products, or head directly to the quote page if you already know what you need.",
    },
    {
      step: "02",
      title: "Tell us the product & quantity",
      desc:
        "Choose your quantity on the product page, or simply share the product code and quantity on the quote form.",
    },
    {
      step: "03",
      title: "We review & come back to you",
      desc:
        "We’ll check availability, pricing, and branding options, and respond with a clear quote within one working day.",
    },
  ];

  return (
    <section className="py-20 bg-[#F5F3EE]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="max-w-2xl mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4">
            How it works
          </h2>
          <p className="text-gray-700">
            A simple, no-pressure process designed to save you time and avoid unnecessary back and forth.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {steps.map((step) => (
            <div
              key={step.step}
              className="bg-white rounded-2xl p-8 border border-black/5 shadow-sm"
            >
              {/* Step number */}
              <div className="mb-6">
                <span className="text-3xl font-semibold tracking-tight text-[#8C8A82]">
                  {step.step}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-dark mb-3">
                {step.title}
              </h3>

              <p className="text-sm text-gray-700 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Reassurance strip */}
        <div className="mt-12 rounded-2xl bg-white border border-black/5 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-gray-700">
            No obligation, no hidden costs — just clear pricing and honest guidance.
          </p>
          <p className="text-sm font-medium text-dark">
            Typical response time:{" "}
            <span className="font-semibold">within 1 working day</span>
          </p>
        </div>

      </div>
    </section>
  );
}
