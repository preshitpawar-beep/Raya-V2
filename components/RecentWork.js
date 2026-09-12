import Image from "next/image";
import Reveal from "./Reveal";

const WORK = [
  {
    src: "/work/keyring-rce.jpg",
    alt: "Engraved metal keyring branded for Renovo Classic Engineering",
    title: "Engraved keyrings",
    client: "Renovo Classic Engineering",
  },
  {
    src: "/work/lemur-pen.jpg",
    alt: "Branded stylus pen printed for Lemur Electrical Limited",
    title: "Branded stylus pens",
    client: "Lemur Electrical Limited",
  },
];

export default function RecentWork() {
  return (
    <section className="bg-[#F5F3EE] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">
            Our recent work
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-dark mb-3">
            Real orders for real UK businesses
          </h2>
          <p className="text-gray-700 max-w-2xl mb-10">
            A few pieces we have produced recently. Every order is printed or engraved with the
            customer's own branding, from a free digital proof through to delivery.
          </p>
        </Reveal>

        <Reveal>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs uppercase tracking-widest text-gray-500 whitespace-nowrap">
              Trusted by UK businesses
            </span>
            <span className="h-px flex-1 bg-black/10" />
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
          {WORK.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08}>
              <figure className="group bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={w.src}
                    alt={w.alt}
                    fill
                    sizes="(max-width: 640px) 90vw, 45vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <figcaption className="p-5">
                  <p className="font-semibold text-dark">{w.title}</p>
                  <p className="text-sm text-gray-500">for {w.client}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
