export default function HowItWorks() {
  const steps = [
    {
      title: "Choose products",
      desc: "Browse our range of branded promotional products.",
    },
    {
      title: "Select quantity",
      desc: "Adjust quantities based on your business needs.",
    },
    {
      title: "Get a quote",
      desc: "Submit your request and we’ll get back to you quickly.",
    },
  ];

  return (
    <section className="py-20 bg-[#F7F8FA]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-12">
          How it works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="text-2xl font-bold mb-4">
                {index + 1}
              </div>
              <h3 className="font-semibold mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-700">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
