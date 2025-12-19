import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#F7F8FA] border-t">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand */}
          <div>
            <h3 className="font-semibold mb-2">Raya</h3>
            <p className="text-sm text-gray-700">
              Branded promotional products for UK businesses.
            </p>
            <p className="text-sm text-gray-700 mt-2">
              Based in Tiverton, United Kingdom.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-3">Quick links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:underline">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/quote" className="hover:underline">
                  Get a Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <p className="text-sm text-gray-700">
              Email:{" "}
              <a
                href="mailto:preshit555@gmail.com"
                className="underline"
              >
                preshit555@gmail.com
              </a>
            </p>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t text-sm text-gray-600 text-center">
          © {new Date().getFullYear()} Raya. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
