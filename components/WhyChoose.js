export default function WhyChoose() {
  return (
    <section className="bg-secondary/40">
      <div className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-dark">
            Why choose Legacy Imprint SW
          </h2>
          <p className="text-gray-700">
            A straightforward approach to branded promotional products
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {[
            {
              title: "Sensible pricing",
              text:
                "Premium-quality products offered at competitive, transparent prices, without unnecessary extras.",
            },
            {
              title: "Personalised branding",
              text:
                "Custom branding options designed to suit your business and represent your brand clearly.",
            },
            {
              title: "Low-risk ordering",
              text:
                "No obligation quotes and flexible quantities, so you can order with confidence.",
            },
            {
              title: "UK-based service",
              text:
                "Based in Tiverton, supporting businesses across the UK with reliable service.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start gap-3 mb-2">
                {/* Brand cue */}
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                
                <h3 className="font-semibold text-dark">
                  {item.title}
                </h3>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
