"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const router = useRouter();
  const searchRef = useRef(null);

  /* CLOSE ON OUTSIDE CLICK */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (value) => {
    if (!value) return;
    setShowSuggestions(false);
    setQuery(value);
    router.push(`/products?search=${encodeURIComponent(value)}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6 py-4">

        {/* ROW 1 — LOGO + SEARCH + NAV (DESKTOP) */}
        <div className="flex items-center justify-between gap-6">

          {/* LOGO */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/raya-logo.png"
              alt="Raya logo"
              width={240}
              height={120}
              priority
            />
          </Link>

          {/* SEARCH — DESKTOP ONLY */}
          <div
            ref={searchRef}
            className="relative hidden md:block flex-1 max-w-xl"
          >
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch(query);
              }}
              placeholder="Search pens, notebooks, bags..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />

            {showSuggestions && (
              <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border overflow-hidden">
                {SUGGESTIONS.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSearch(item)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
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
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {/* SEARCH — MOBILE ONLY */}
        <div
          ref={searchRef}
          className="relative mt-4 md:hidden"
        >
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch(query);
            }}
            placeholder="Search pens, notebooks, bags..."
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {showSuggestions && (
            <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border overflow-hidden">
              {SUGGESTIONS.map((item) => (
                <button
                  key={item}
                  onClick={() => handleSearch(item)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <nav className="flex flex-col px-6 py-4 gap-4 font-medium">
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link href="/products" onClick={() => setOpen(false)}>
              Products
            </Link>
            <Link
              href="/quote"
              onClick={() => setOpen(false)}
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
