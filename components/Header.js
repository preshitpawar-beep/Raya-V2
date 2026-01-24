"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "./productsData"; // adjust path if needed

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

  /* 🔎 AUTOCOMPLETE SOURCE */
  const suggestionPool = useMemo(() => {
    const base = new Set();

    products.forEach((p) => {
      base.add(p.name);
      base.add(p.category);

      if (p.id.startsWith("MP")) base.add("Metal pen");
      if (p.category === "Pen") base.add("Plastic pen");
      if (p.category === "Notebook") base.add("Notebook");
      if (p.category === "Key Ring") base.add("Key ring");
      if (p.category === "Bags") base.add("Bags");

      if (/eco|bamboo|cork|jute/i.test(p.name)) {
        base.add("Eco products");
        base.add("Eco notebook");
      }
    });

    return Array.from(base);
  }, []);

  /* 🔥 FILTERED AUTOCOMPLETE */
  const filteredSuggestions = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();

    return suggestionPool
      .filter((item) => item.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query, suggestionPool]);

  const handleSearch = (value) => {
    if (!value) return;
    setShowSuggestions(false);
    router.push(`/products?search=${encodeURIComponent(value)}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6 py-4">

        {/* LOGO + SEARCH + NAV */}
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

          {/* SEARCH */}
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

            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border overflow-hidden">
                {filteredSuggestions.map((item) => (
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

          {/* NAV */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <Link href="/products">Products</Link>
            <Link
              href="/quote"
              className="bg-primary px-5 py-2 rounded-lg"
            >
              Get a Quote
            </Link>
          </nav>

          {/* MOBILE MENU */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
