export default function TrustIntro() {
  return (
    <section className="w-full relative overflow-hidden" style={{ height: "90vh", minHeight: "560px", maxHeight: "800px" }}>

      {/* Full bleed image */}
      <img
        src="/trust/Bag 1.png"
        alt="Legacy Imprint SW branded cotton tote bag"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Gradient overlay — darker at bottom where text sits */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(10,10,8,0.82) 0%, rgba(10,10,8,0.35) 45%, rgba(10,10,8,0.05) 100%)"
        }}
      />

      {/* Text — anchored to bottom left */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="max-w-7xl mx-auto px-6 md:px-14 pb-12 md:pb-16">
          <div className="max-w-lg">
            <p className="text-xs uppercase tracking-widest text-white/40 mb-4">
              Our products
            </p>
            <h2 className="text-3xl md:text-5xl font-medium leading-tight text-white mb-4">
              Merchandise that holds up — in quality and perception.
            </h2>
            <p className="text-base text-white/60 leading-relaxed mb-6">
              Designed for businesses that care how they show up.
            </p>
            <div className="flex items-center gap-5 text-xs uppercase tracking-widest text-white/35">
              <span>Thoughtful</span>
              <span className="h-px w-6 bg-white/20" />
              <span>Reliable</span>
              <span className="h-px w-6 bg-white/20" />
              <span>Consistent</span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
