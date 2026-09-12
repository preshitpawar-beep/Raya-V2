import Reveal from "./Reveal";

export default function TrustedBy() {
  const clients = ["Lemur Electrical Limited", "Renovo Classic Engineering"];
  return (
    <section className="bg-white py-12 border-y border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <p className="text-center text-xs uppercase tracking-widest text-gray-500 mb-6">
            Trusted by UK businesses
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {clients.map((c) => (
              <span
                key={c}
                className="text-lg md:text-xl font-semibold text-dark/80 tracking-tight"
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
