export default function TrustIntro() {
  return (
    <section className="w-full">

      {/* ================= ACT 1 — IMMERSIVE TRUST SCENE ================= */}
      <div className="relative h-[70vh] min-h-[520px] w-full overflow-hidden">
        {/* Background image */}
        <img
          src="/trust/lifestyle-scene.jpg"
          alt="Promotional products lifestyle scene"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark overlay */}
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

      {/* ================= ACT 2 — 3 COLUMN PRODUCT GRID ================= */}
      <div className="bg-[#F7F6F3] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* PEN */}
            <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm">
              <img
                src="/trust/product-pen.png"
                alt="Premium branded pen"
                className="
                  w-full
                  h-[300px] sm:h-[340px]
                  object-contain
                  transition-transform duration-700 ease-out
                  group-hover:scale-[1.04]
                "
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-lg font-medium text-white">
                  Premium pens
                </p>
                <p className="mt-1 text-sm text-white/85 leading-snug">
                  Balanced weight, refined finish, and subtle branding.
                </p>
              </div>
            </div>

            {/* NOTEBOOK */}
            <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm">
              <img
                src="/trust/product-notebook.png"
                alt="Branded notebook"
                className="
                  w-full
                  h-[300px] sm:h-[340px]
                  object-contain
                  transition-transform duration-700 ease-out
                  group-hover:scale-[1.04]
                "
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-lg font-medium text-white">
                  Everyday notebooks
                </p>
                <p className="mt-1 text-sm text-white/85 leading-snug">
                  Designed to be used daily, not stored or discarded.
                </p>
              </div>
            </div>

            {/* TOTE */}
            <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm">
              <img
                src="/trust/product-tote.png"
                alt="Branded tote bag"
                className="
                  w-full
                  h-[300px] sm:h-[340px]
                  object-contain
                  transition-transform duration-700 ease-out
                  group-hover:scale-[1.04]
                "
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-lg font-medium text-white">
                  Practical tote bags
                </p>
                <p className="mt-1 text-sm text-white/85 leading-snug">
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
