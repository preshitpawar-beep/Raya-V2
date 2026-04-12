export default function TrustIntro() {
  return (
    <section className="w-full">

      {/* ── HERO BANNER — All Products flat lay ── */}
      <div className="relative w-full overflow-hidden" style={{ height: "52vh", minHeight: "380px" }}>
        <img
          src="/trust/All_Products.png"
          alt="Legacy Imprint SW branded promotional products"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Gradient: dark on left where text sits, lighter on right */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(105deg, rgba(10,10,8,0.78) 0%, rgba(10,10,8,0.45) 55%, rgba(10,10,8,0.15) 100%)"
        }} />

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-14 w-full">
            <div className="max-w-xl">
              <p className="text-xs uppercase tracking-widest text-white/50 mb-4">
                Our products
              </p>
              <h2 className="text-3xl md:text-5xl font-medium leading-tight text-white mb-4">
                Merchandise that holds up —
                <br />
                in quality and perception.
              </h2>
              <p className="text-base md:text-lg text-white/70">
                Designed for businesses that care how they show up.
              </p>
              <div className="mt-6 flex items-center gap-5 text-xs uppercase tracking-widest text-white/40">
                <span>Thoughtful</span>
                <span className="h-px w-6 bg-white/20" />
                <span>Reliable</span>
                <span className="h-px w-6 bg-white/20" />
                <span>Consistent</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── PRODUCT TILES GRID ── */}
      <div className="bg-[#F7F6F3] px-4 md:px-6 py-4 md:py-5">
        <div className="max-w-7xl mx-auto">

          {/* Desktop: [tall notebook | pen over bag] */}
          <div className="hidden md:grid grid-cols-2 gap-4" style={{ height: "520px" }}>

            {/* LEFT — Notebook close-up (tall) */}
            <div className="relative rounded-2xl overflow-hidden group">
              <img
                src="/trust/Slide_1.png"
                alt="Premium branded notebook with gold badge detail"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{
                background: "linear-gradient(to top, rgba(10,10,8,0.75) 0%, rgba(10,10,8,0.1) 50%, transparent 100%)"
              }} />
              <div className="absolute bottom-0 left-0 p-7">
                <p className="text-xs uppercase tracking-widest text-white/50 mb-2">Notebooks & Gift Sets</p>
                <p className="text-xl font-medium text-white leading-snug">
                  Premium finishes that<br />represent your brand
                </p>
                <p className="text-sm text-white/60 mt-2 max-w-xs leading-relaxed">
                  From eco-friendly A5 notebooks to luxury gift sets with gold badge branding.
                </p>
              </div>
            </div>

            {/* RIGHT — two stacked tiles */}
            <div className="flex flex-col gap-4">

              {/* Pen tile */}
              <div className="relative rounded-2xl overflow-hidden group flex-1" style={{ background: "#f0efed" }}>
                <img
                  src="/trust/Slide3.png"
                  alt="Premium metal branded pen"
                  className="absolute inset-0 w-full h-full object-contain object-center p-8 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6" style={{
                  background: "linear-gradient(to top, rgba(240,239,237,0.95) 0%, transparent 100%)"
                }}>
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Pens</p>
                  <p className="text-lg font-medium text-dark">Finished with intent</p>
                  <p className="text-sm text-gray-500 mt-1">Balanced weight, laser-engraved branding.</p>
                </div>
              </div>

              {/* Bag tile */}
              <div className="relative rounded-2xl overflow-hidden group flex-1">
                <img
                  src="/trust/Bag_1.png"
                  alt="Legacy Imprint SW branded cotton tote bag"
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{
                  background: "linear-gradient(to top, rgba(10,10,8,0.7) 0%, rgba(10,10,8,0.1) 60%, transparent 100%)"
                }} />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Bags</p>
                  <p className="text-lg font-medium text-white">Practical &amp; brand-aligned</p>
                  <p className="text-sm text-white/60 mt-1">Jute, cotton and nylon — used well beyond the event.</p>
                </div>
              </div>

            </div>
          </div>

          {/* Mobile: stacked full-width tiles */}
          <div className="flex md:hidden flex-col gap-3">

            {/* Notebook */}
            <div className="relative rounded-2xl overflow-hidden" style={{ height: "280px" }}>
              <img
                src="/trust/Slide_1.png"
                alt="Premium branded notebook"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0" style={{
                background: "linear-gradient(to top, rgba(10,10,8,0.75) 0%, transparent 60%)"
              }} />
              <div className="absolute bottom-0 left-0 p-5">
                <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Notebooks & Gift Sets</p>
                <p className="text-lg font-medium text-white">Premium finishes that represent your brand</p>
              </div>
            </div>

            {/* Pen */}
            <div className="relative rounded-2xl overflow-hidden" style={{ height: "200px", background: "#f0efed" }}>
              <img
                src="/trust/Slide3.png"
                alt="Premium metal branded pen"
                className="absolute inset-0 w-full h-full object-contain p-6"
              />
              <div className="absolute bottom-0 left-0 right-0 p-5" style={{
                background: "linear-gradient(to top, rgba(240,239,237,0.95) 0%, transparent 100%)"
              }}>
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-0.5">Pens</p>
                <p className="text-base font-medium text-dark">Finished with intent</p>
              </div>
            </div>

            {/* Bag */}
            <div className="relative rounded-2xl overflow-hidden" style={{ height: "240px" }}>
              <img
                src="/trust/Bag_1.png"
                alt="Branded cotton tote bag"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0" style={{
                background: "linear-gradient(to top, rgba(10,10,8,0.7) 0%, transparent 60%)"
              }} />
              <div className="absolute bottom-0 left-0 p-5">
                <p className="text-xs uppercase tracking-widest text-white/50 mb-0.5">Bags</p>
                <p className="text-base font-medium text-white">Practical &amp; brand-aligned</p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
