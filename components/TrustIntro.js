export default function TrustIntro() {
  return (
    <section className="w-full">

      {/* ================= ACT 1 — IMMERSIVE SCENE ================= */}
      <div className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
        
        {/* Background image */}
        <img
          src="/trust/lifestyle-scene.jpg"
          alt="Branded merchandise in a professional workspace"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Content */}
        <div className="relative z-10 flex h-full items-center">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl leading-tight text-[#F5F5F3] font-medium">
                Merchandise that holds up —
                <br />
                in quality and perception.
              </h2>

              <p className="mt-6 text-lg text-[#D6D6D3]">
                Designed for businesses that care how they show up.
              </p>

              <div className="mt-10 flex items-center gap-6 text-sm text-[#CFCFCA] uppercase tracking-wide">
                <span>Thoughtful</span>
                <span className="h-px w-8 bg-[#CFCFCA]/40" />
                <span>Reliable</span>
                <span className="h-px w-8 bg-[#CFCFCA]/40" />
                <span>Consistent</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= ACT 2 — PRODUCT AS OBJECT ================= */}
      <div className="bg-[#F7F6F3] py-28">
        <div className="max-w-7xl mx-auto px-6 space-y-40">

          {/* Product 1 */}
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <img
                src="/trust/product-pen.png"
                alt="Branded pen"
                className="w-full max-w-xl mx-auto drop-shadow-[0_30px_40px_rgba(0,0,0,0.15)]"
              />
            </div>
            <div className="max-w-md">
              <p className="text-2xl font-medium text-dark">
                Designed to represent your brand properly.
              </p>
              <p className="mt-4 text-gray-600">
                Practical, considered, and built for daily use — not disposable impressions.
              </p>
            </div>
          </div>

          {/* Product 2 */}
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="order-2 md:order-1 max-w-md">
              <p className="text-2xl font-medium text-dark">
                Made for consistency, not shortcuts.
              </p>
              <p className="mt-4 text-gray-600">
                Clean branding, dependable quality, and products that feel intentional.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="/trust/product-notebook.png"
                alt="Branded notebook"
                className="w-full max-w-xl mx-auto drop-shadow-[0_30px_40px_rgba(0,0,0,0.15)]"
              />
            </div>
          </div>

          {/* Product 3 */}
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <img
                src="/trust/product-tote.png"
                alt="Branded tote bag"
                className="w-full max-w-xl mx-auto drop-shadow-[0_30px_40px_rgba(0,0,0,0.15)]"
              />
            </div>
            <div className="max-w-md">
              <p className="text-2xl font-medium text-dark">
                Practical objects with a clear purpose.
              </p>
              <p className="mt-4 text-gray-600">
                Merchandise that fits naturally into real working environments.
              </p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
