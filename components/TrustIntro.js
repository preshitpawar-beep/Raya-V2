export default function TrustIntro() {
  return (
    <section className="w-full">

      {/* ================= ACT 1 — IMMERSIVE TRUST SCENE ================= */}
      <div className="relative h-[70vh] min-h-[520px] w-full overflow-hidden">
        {/* Background */}
        <img
          src="/trust/lifestyle-scene.png"
          alt="Branded promotional products lifestyle"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Content */}
        <div className="relative z-10 flex h-full items-center">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-medium leading-tight text-[#F5F5F3]">
                Merchandise that holds up —
                <br />
                in quality and perception.
              </h2>

              <p className="mt-6 text-lg text-[#D6D6D3]">
                Designed for businesses that care how they show up.
              </p>

              <div className="mt-8 flex items-center gap-5 text-xs md:text-sm uppercase tracking-wide text-[#CFCFCA]">
                <span>Thoughtful</span>
                <span className="h-px w-6 bg-[#CFCFCA]/40" />
                <span>Reliable</span>
                <span className="h-px w-6 bg-[#CFCFCA]/40" />
                <span>Consistent</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= ACT 2 — TIGHT PRODUCT GALLERY ================= */}
      <div className="bg-[#F7F6F3] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">

          {[
            {
              img: "/trust/product-pen.png",
              title: "Premium pens, finished with intent",
              desc: "Subtle colour, balanced weight, and clean branding that feels considered.",
            },
            {
              img: "/trust/product-notebook.png",
              title: "Notebooks designed for everyday use",
              desc: "Made to be used daily — not stored away or thrown out.",
            },
            {
              img: "/trust/product-tote.png",
              title: "Totes built for real work",
              desc: "Durable, practical, and naturally aligned with modern brands.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              {/* Image */}
              <img
                src={item.img}
                alt={item.title}
                className="
                  w-full
                  h-[340px] sm:h-[380px] md:h-[320px]
                  object-contain
                  transition-transform duration-700 ease-out
                  group-hover:scale-[1.03]
                "
              />

              {/* Overlay (desktop only) */}
              <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

              {/* Text */}
              <div
                className="
                  md:absolute md:bottom-0 md:left-0 md:right-0
                  p-5 md:p-7
                  text-dark md:text-[#F5F5F3]
                "
              >
                <p className="text-lg md:text-xl font-medium leading-snug">
                  {item.title}
                </p>
                <p className="mt-2 text-sm md:text-base opacity-80 max-w-md">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>

    </section>
  );
}
