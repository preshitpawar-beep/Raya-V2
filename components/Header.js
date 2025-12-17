import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/raya-logo.png"
            alt="Raya logo"
            width={160}
            height={60}
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8 text-base font-semibold">
          <Link href="/" className="hover:text-primary transition">
            Home
          </Link>
          <Link href="/products" className="hover:text-primary transition">
            Products
          </Link>
          <Link
            href="/quote"
            className="bg-primary px-6 py-3 rounded-lg hover:opacity-90 transition"
          >
            Get a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
