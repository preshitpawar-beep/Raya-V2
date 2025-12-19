export default function Benefits() {
  return (
    <section className="bg-[#F7F8FA]">
      <div className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Why work with Raya
          </h2>
          <p className="text-gray-700">
            A simple, reliable approach to branded promotional products
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="font-semibold mb-2">
              Sensible pricing
            </h3>
            <p className="text-gray-700 text-sm">
              Premium-quality products offered at competitive, transparent
              prices.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="font-semibold mb-2">
              Personalised branding
            </h3>
            <p className="text-gray-700 text-sm">
              Custom branding options designed to reflect your business.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="font-semibold mb-2">
              Low-risk ordering
            </h3>
            <p className="text-gray-700 text-sm">
              No obligation quotes and flexible quantities to suit your needs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="font-semibold mb-2">
              UK-based service
            </h3>
            <p className="text-gray-700 text-sm">
              Based in the UK, supporting businesses across the country.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
