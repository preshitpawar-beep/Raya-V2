import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a18] text-white">

      {/* Top strip — tagline */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-14 py-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-2xl md:text-3xl font-medium text-white/90 leading-snug max-w-xl">
            Branded products that leave a lasting impression.
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 bg-white text-[#1a1a18] px-6 py-3 rounded-lg text-sm font-semibold hover:bg-gray-100 transition flex-shrink-0 self-start md:self-auto"
          >
            Get a quote →
          </Link>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-14 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-white font-semibold text-base mb-3">Legacy Imprint SW</p>
            <p className="text-sm text-white/50 leading-relaxed mb-4">
              Custom branded promotional merchandise for UK businesses. Personal service, clear pricing, no setup fees.
            </p>
            <p className="text-xs text-white/30 uppercase tracking-widest">
              Tiverton, Devon · UK
            </p>
          </div>

          {/* Products */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Products</p>
            <ul className="space-y-2.5">
              {[
                { label: "Pens", href: "/products?category=Pen" },
                { label: "Notebooks", href: "/products?category=Notebook" },
                { label: "Key Rings", href: "/products?category=Key+Ring" },
                { label: "Combo Sets", href: "/products?category=Combo+Sets" },
                { label: "Bags", href: "/products?category=Bags" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-white/60 hover:text-white transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Company</p>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "All Products", href: "/products" },
                { label: "Get a Quote", href: "/quote" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms & Conditions", href: "/terms" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-white/60 hover:text-white transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Get in touch</p>
            <ul className="space-y-3">
              <li>
                <p className="text-xs text-white/40 mb-0.5">Email</p>
                <a
                  href="mailto:info@legacyimprint.co.uk"
                  className="text-sm text-white/70 hover:text-white transition break-all"
                >
                  info@legacyimprint.co.uk
                </a>
              </li>
              <li className="pt-2">
                <p className="text-xs text-white/40 mb-0.5">Response time</p>
                <p className="text-sm text-white/70">Within 1 working day</p>
              </li>
              <li className="pt-2">
                <p className="text-xs text-white/40 mb-0.5">Delivery</p>
                <p className="text-sm text-white/70">UK Mainland · 10–14 days</p>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-14 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Legacy Imprint SW. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-white/30">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5" />
            Branding included · No setup fees · Free visual proof
          </div>
        </div>
      </div>

    </footer>
  );
}
