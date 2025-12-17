import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/raya-logo.png"
            alt="Raya logo"
            width={120}
            height={40}
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <Link href="/products" className="hover:text-primary">
            Products
          </Link>
          <Link
            href="/quote"
            className="bg-primary px-4 py-2 rounded hover:opacity-90"
          >
            Get a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
