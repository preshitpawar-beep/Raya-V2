import Reveal from "./Reveal";

const QUOTES = [
  {
    quote:
      "We wanted something that felt as considered as the cars we build, and Legacy Imprint delivered. The engraved keyrings look superb, the logo is razor sharp, and they handled everything from proof to delivery.",
    name: "Elliot",
    company: "Renovo Classic Engineering",
    initial: "E",
  },
  {
    quote:
      "Smart branded pens at a fair price, and the proof process meant our logo landed exactly right first time. Quick, easy, and we'll be reordering.",
    name: "Luke",
    company: "Lemur Electrical Limited",
    initial: "L",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">
            What our customers say
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-dark mb-10">
            Kind words from businesses we've worked with
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {QUOTES.map((q, i) => (
            <Reveal key={q.company} delay={i * 0.08}>
              <blockquote className="h-full bg-[#F7F8FA] rounded-2xl border border-black/5 p-7 md:p-8 flex flex-col">
                <div className="text-4xl leading-none text-primary mb-3">"</div>
                <p className="text-dark/90 leading-relaxed flex-1">{q.quote}</p>
                <footer className="mt-6 flex items-center gap-3">
                  <span className="h-10 w-10 rounded-full bg-dark text-white flex items-center justify-center font-semibold">
                    {q.initial}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-dark">{q.name}</span>
                    <span className="block text-xs text-gray-500">{q.company}</span>
                  </span>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
