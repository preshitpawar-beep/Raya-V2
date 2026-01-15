export default function TrustIntro() {
  return (
    <section className="w-full">

      {/* ================= ACT 1 — IMMERSIVE TRUST SCENE ================= */}
      <div className="relative h-[55vh] min-h-[420px] w-full overflow-hidden">
        <img
          src="/trust/lifestyle-scene.png"
          alt="Promotional products lifestyle scene"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 flex h-full items-center">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-medium leading-tight text-[#F5F5F3]">
                Merchandise that holds up —
                <br />
                in quality and perception.
              </h2>

              <p className="mt-5 text-lg text-[#D6D6D3]">
                Designed for businesses that care how they show up.
              </p>

              <div className="mt-7 flex items-center gap-4 text-xs uppercase tracking-wide text-[#CFCFCA]">
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

      {/* ================= ACT 2 — TRUST CATALOGUE ================= */}
      <div className="bg-[#F7F6F3] py-16">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* LARGE PEN TILE */}
            <div className="relative col-span-1 md:col-span-2 rounded-2xl overflow-hidden bg-white">
              <img
                src="/trust/product-pen.png"
                alt="Premium branded pen"
                className="w-full h-[320px] md:h-[380px] object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 max-w-md">
                <p className="text-xl font-medium text-white">
                  Premium pens, finished with intent
                </p>
                <p className="mt-2 text-sm text-white/85">
                  Balanced weight, refined finish, and subtle branding.
                </p>
              </div>
            </div>

            {/* TEXT STATEMENT TILE */}
            <div className="rounded-2xl bg-[#EFEDE8] p-8 flex items-center">
              <p className="text-2xl font-medium text-dark leading-snug">
                Everyday products designed to represent your brand properly —
                not disposable impressions.
              </p>
            </div>

            {/* NOTEBOOK */}
            <div className="relative rounded-2xl overflow-hidden bg-white">
              <img
                src="/trust/product-notebook.png"
                alt="Branded notebook"
                className="w-full h-[300px] object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <p className="text-lg font-medium text-white">
                  Everyday notebooks
                </p>
                <p className="mt-1 text-sm text-white/85">
                  Designed for daily use.
                </p>
              </div>
            </div>

            {/* TOTE (TALL TILE) */}
            <div className="relative col-span-1 md:col-span-2 rounded-2xl overflow-hidden bg-white">
              <img
                src="/trust/product-tote.png"
                alt="Branded tote bag"
                className="w-full h-[320px] md:h-[360px] object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
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
