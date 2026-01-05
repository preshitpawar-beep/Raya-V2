export default function WhyChoose() {
  return (
    <section className="bg-secondary">
      <div className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Why choose Legacy Imprint SW
          </h2>
          <p className="text-gray-700">
            A straightforward approach to branded promotional products
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold mb-2">
              Sensible pricing
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Premium-quality products offered at competitive, transparent
              prices, without unnecessary extras.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold mb-2">
              Personalised branding
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Custom branding options designed to suit your business and
              represent your brand clearly.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold mb-2">
              Low-risk ordering
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              No obligation quotes and flexible quantities, so you can order
              with confidence.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold mb-2">
              UK-based service
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Based in Tiverton, supporting businesses across the UK with
              reliable service.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
