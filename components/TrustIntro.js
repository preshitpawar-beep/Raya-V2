export default function TrustIntro() {
  return (
    <section className="w-full">

      {/* ================= ACT 1 — IMMERSIVE TRUST SCENE ================= */}
      <div className="relative h-[48vh] min-h-[360px] w-full overflow-hidden">
        <img
          src="/trust/lifestyle-scene.png"
          alt="Promotional products lifestyle scene"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* LIGHTER OVERLAY */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex h-full items-center">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-medium leading-tight text-[#F5F5F3]">
                Merchandise that holds up —
                <br />
                in quality and perception.
              </h2>

              <p className="mt-4 text-lg text-[#E0E0DC]">
                Designed for businesses that care how they show up.
              </p>

              <div className="mt-6 flex items-center gap-4 text-xs uppercase tracking-wide text-[#D0D0CB]">
                <span>Thoughtful</span>
                <span className="h-px w-6 bg-[#D0D0CB]/40" />
                <span>Reliable</span>
                <span className="h-px w-6 bg-[#D0D0CB]/40" />
                <span>Consistent</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= ACT 2 — TRUST CATALOGUE ================= */}
      <div className="bg-[#F7F6F3] py-14">
        <div className="max-w-7xl mx-auto px-6">

          {/* ===== MOBILE: HORIZONTAL TRUST BANNERS ===== */}
          <div className="flex md:hidden gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">

            {[
              {
                img: "/trust/product-pen.png",
                title: "Premium pens",
                text: "Refined finishes and balanced weight.",
              },
              {
                img: "/trust/product-notebook.png",
                title: "Everyday notebooks",
                text: "Designed for daily use.",
              },
              {
                img: "/trust/product-tote.png",
                title: "Practical tote bags",
                text: "Durable and brand-aligned.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="snap-start min-w-[260px] h-[200px] relative rounded-2xl overflow-hidden bg-white"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover p-6"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <p className="text-lg font-medium text-white">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-white/85">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ===== DESKTOP: COLLAGE GRID ===== */}
          <div className="hidden md:grid grid-cols-3 gap-6">

            {/* LARGE PEN TILE */}
            <div className="relative col-span-2 rounded-2xl overflow-hidden bg-white">
              <div className="h-[360px] flex items-center justify-center">
                <img
                  src="/trust/product-pen.png"
                  alt="Premium branded pen"
                  className="max-h-full object-contain"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 max-w-md">
                <p className="text-xl font-medium text-white">
                  Premium pens, finished with intent
                </p>
                <p className="mt-2 text-sm text-white/85">
                  Balanced weight, refined finish, and subtle branding.
                </p>
              </div>
            </div>

            {/* TEXT TILE */}
            <div className="rounded-2xl bg-[#EFEDE8] p-8 flex items-center">
              <p className="text-2xl font-medium text-dark leading-snug">
                Everyday products designed to represent your brand properly —
                not disposable impressions.
              </p>
            </div>

            {/* NOTEBOOK */}
            <div className="relative rounded-2xl overflow-hidden bg-white">
              <div className="h-[300px] flex items-center justify-center">
                <img
                  src="/trust/product-notebook.png"
                  alt="Branded notebook"
                  className="max-h-full object-contain"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <p className="text-lg font-medium text-white">
                  Everyday notebooks
                </p>
                <p className="mt-1 text-sm text-white/85">
                  Designed for daily use.
                </p>
              </div>
            </div>

            {/* TOTE */}
            <div className="relative col-span-2 rounded-2xl overflow-hidden bg-white">
              <div className="h-[340px] flex items-center justify-center">
                <img
                  src="/trust/product-tote.png"
                  alt="Branded tote bag"
                  className="max-h-full object-contain"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 max-w-md">
                <p className="text-xl font-medium text-white">
                  Practical tote bags
                </p>
                <p className="mt-2 text-sm text-white/85">
                  Durable, functional, and naturally brand-aligned.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
