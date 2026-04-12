export default function TrustIntro() {
  return (
    <section className="w-full bg-[#F5F0EB]">
      <div className="max-w-7xl mx-auto">

        {/* ── DESKTOP: side by side ── */}
        <div className="hidden md:grid grid-cols-2" style={{ minHeight: "620px" }}>

          {/* LEFT — text panel */}
          <div className="flex flex-col justify-between px-14 py-16">

            {/* Top — label */}
            <p className="text-xs uppercase tracking-widest text-dark/30">
              Our products
            </p>

            {/* Middle — statement */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-medium leading-tight text-dark mb-6">
                Merchandise
                <br />
                that holds up —
                <br />
                <span className="text-dark/50">in quality and</span>
                <br />
                <span className="text-dark/50">perception.</span>
              </h2>
              <p className="text-base text-dark/50 leading-relaxed max-w-sm">
                Designed for businesses that care how they show up. Personal service, clear pricing, real products.
              </p>
            </div>

            {/* Bottom — trust tags + CTA */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                {["Thoughtful", "Reliable", "Consistent"].map((tag, i) => (
                  <div key={tag} className="flex items-center gap-4">
                    {i > 0 && <span className="h-px w-5 bg-dark/15" />}
                    <span className="text-xs uppercase tracking-widest text-dark/30">{tag}</span>
                  </div>
                ))}
              </div>
              <a
                href="/products"
                className="inline-flex items-center gap-2 border border-dark/20 text-dark/80 text-sm font-medium px-6 py-3 rounded-lg hover:bg-dark/5 transition"
              >
                Browse products →
              </a>
            </div>

          </div>

          {/* RIGHT — full image, no cropping */}
          <div className="relative flex items-center justify-center py-10 pr-10">
            {/* Subtle background glow behind image */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: "radial-gradient(ellipse at 70% 50%, #b5845a 0%, transparent 70%)"
              }}
            />
            <img
              src="/trust/Bag 1.png"
              alt="Legacy Imprint SW branded cotton tote bag"
              className="relative z-10 h-full w-auto object-contain drop-shadow-2xl"
              style={{ maxHeight: "560px" }}
            />
          </div>

        </div>

        {/* ── MOBILE: stacked ── */}
        <div className="md:hidden">

          {/* Image first on mobile */}
          <div className="relative flex items-center justify-center px-8 pt-12 pb-4"
            style={{
              background: "radial-gradient(ellipse at 50% 60%, rgba(181,132,90,0.12) 0%, transparent 70%)"
            }}
          >
            <img
              src="/trust/Bag 1.png"
              alt="Legacy Imprint SW branded cotton tote bag"
              className="w-full max-w-xs object-contain drop-shadow-2xl"
            />
          </div>

          {/* Text below */}
          <div className="px-6 pb-12 pt-6">
            <p className="text-xs uppercase tracking-widest text-dark/30 mb-4">
              Our products
            </p>
            <h2 className="text-3xl font-medium leading-tight text-dark mb-4">
              Merchandise that holds up — in quality and perception.
            </h2>
            <p className="text-sm text-dark/50 leading-relaxed mb-8">
              Designed for businesses that care how they show up.
            </p>
            <div className="flex items-center gap-3 mb-8">
              {["Thoughtful", "Reliable", "Consistent"].map((tag, i) => (
                <div key={tag} className="flex items-center gap-3">
                  {i > 0 && <span className="h-px w-4 bg-dark/15" />}
                  <span className="text-[10px] uppercase tracking-widest text-dark/30">{tag}</span>
                </div>
              ))}
            </div>
            <a
              href="/products"
              className="inline-flex items-center gap-2 border border-dark/20 text-dark/80 text-sm font-medium px-6 py-3 rounded-lg"
            >
              Browse products →
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
