export default function TrustIntro() {
  return (
    <section className="w-full">

      {/* ================= ACT 1 — IMMERSIVE SCENE ================= */}
      <div className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
        
        {/* Background image */}
        <img
          src="/trust/lifestyle-scene.png"
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

{/* ================= ACT 2 — TIGHT PRODUCT GALLERY ================= */}
<div className="bg-[#F7F6F3] py-20 md:py-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">

    {/* Product Card */}
    {[
      {
        img: "/trust/product-pen.png",
        title: "Premium pens, finished with intent",
        desc: "Subtle colours, balanced weight, and clean branding that feels considered.",
      },
      {
        img: "/trust/product-notebook.png",
        title: "Everyday notebooks, confirming quality",
        desc: "Designed to be used daily — not stored, not discarded.",
      },
      {
        img: "/trust/product-tote.png",
        title: "Totes built for real use",
        desc: "Practical, durable, and naturally aligned with modern brands.",
      },
    ].map((item, i) => (
      <div
        key={i}
        className="relative overflow-hidden rounded-2xl bg-white shadow-sm group"
      >
        {/* Image */}
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-[420px] md:h-[360px] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {/* Overlay (desktop only) */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        {/* Text */}
        <div className="
          md:absolute md:bottom-0 md:left-0 md:right-0
          p-6 md:p-8
          text-dark md:text-[#F5F5F3]
        ">
          <p className="text-xl md:text-2xl font-medium leading-snug">
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

