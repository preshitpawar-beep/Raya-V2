"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const suggestions = [
  "Plastic pen",
  "Metal pen",
  "Notebooks",
  "Key rings",
  "Bags",
  "Red pen",
  "Blue notebook",
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const searchRef = useRef(null);

  /* CLOSE SUGGESTIONS ON OUTSIDE CLICK */
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (value) => {
    if (!value.trim()) return;
    setShowSuggestions(false);
    setQuery("");
    router.push(`/products?search=${encodeURIComponent(value)}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6 py-4">

        {/* TOP ROW */}
        <div className="flex items-center gap-6">

          {/* LOGO */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/raya-logo.png"
              alt="Raya logo"
              width={210}
              height={110}
              priority
            />
          </Link>

          {/* SEARCH — DESKTOP */}
          <div
            ref={searchRef}
            className="relative hidden md:block flex-1 max-w-xl"
          >
            <input
              type="text"
              value={query}
              placeholder="Search pens, notebooks, bags…"
              className="w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleSearch(query)
              }
            />

            {showSuggestions && (
              <div className="absolute left-0 right-0 mt-2 bg-white border rounded-xl shadow-lg z-50">
                {suggestions.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSearch(item)}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* NAV */}
          <nav className="hidden md:flex items-center gap-8 font-medium ml-auto">
            <Link href="/products" className="hover:text-primary">
              Products
            </Link>
            <Link
              href="/quote"
              className="bg-primary px-5 py-2 rounded-lg hover:opacity-90"
            >
              Get a Quote
            </Link>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl ml-auto"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {/* SEARCH — MOBILE */}
        <div ref={searchRef} className="relative mt-4 md:hidden">
          <input
            type="text"
            value={query}
            placeholder="Search products…"
            className="w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleSearch(query)
            }
          />

          {showSuggestions && (
            <div className="absolute left-0 right-0 mt-2 bg-white border rounded-xl shadow-lg z-50">
              {suggestions.map((item) => (
                <button
                  key={item}
                  onClick={() => handleSearch(item)}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MOBILE NAV */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="flex flex-col px-6 py-4 gap-4 font-medium">
            <Link href="/products" onClick={() => setMenuOpen(false)}>
              Products
            </Link>
            <Link
              href="/quote"
              onClick={() => setMenuOpen(false)}
              className="bg-primary px-4 py-2 rounded-lg text-center"
            >
              Get a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
