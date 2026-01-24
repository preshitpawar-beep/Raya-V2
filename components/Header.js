"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "./productsData"; // adjust path if needed

export default function Header() {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const desktopRef = useRef(null);
  const mobileRef = useRef(null);

  /* ---------- CLICK OUTSIDE HANDLING ---------- */
  useEffect(() => {
    const handleClick = (e) => {
      if (
        desktopRef.current &&
        !desktopRef.current.contains(e.target) &&
        mobileRef.current &&
        !mobileRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /* ---------- AUTOCOMPLETE SOURCE ---------- */
  const suggestionPool = useMemo(() => {
    const set = new Set();

    products.forEach((p) => {
      set.add(p.name);

      if (p.id.startsWith("MP")) set.add("Metal pen");
      if (p.category === "Pen") set.add("Plastic pen");
      if (p.category === "Notebook") set.add("Notebook");
      if (p.category === "Key Ring") set.add("Key ring");
      if (p.category === "Bags") set.add("Bags");

      if (/eco|bamboo|cork|jute/i.test(p.name)) {
        set.add("Eco notebook");
      }
    });

    return Array.from(set);
  }, []);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    return suggestionPool
      .filter((s) => s.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query, suggestionPool]);

  /* ---------- SEARCH ACTION ---------- */
  const doSearch = (value) => {
    if (!value.trim()) return;

    router.push(`/products?search=${encodeURIComponent(value)}`);

    setQuery("");
    setShowSuggestions(false);
    setMenuOpen(false);
  };

  /* ---------- SUGGESTION LIST ---------- */
  const Suggestions = () =>
    showSuggestions &&
    suggestions.length > 0 && (
      <div className="absolute left-0 right-0 mt-2 bg-white border rounded-xl shadow-lg z-50">
        {suggestions.map((item) => (
          <button
            key={item}
            onClick={() => doSearch(item)}
            className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100"
          >
            {item}
          </button>
        ))}
      </div>
    );

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6 py-4">

        {/* ---------- TOP ROW ---------- */}
        <div className="flex items-center justify-between gap-4">

          {/* LOGO */}
          <Link href="/" className="shrink-0">
            <Image
              src="/raya-logo.png"
              alt="Raya logo"
              width={220}
              height={110}
              priority
            />
          </Link>

          {/* DESKTOP SEARCH */}
          <div
            ref={desktopRef}
            className="relative hidden md:block flex-1 max-w-xl"
          >
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={(e) => e.key === "Enter" && doSearch(query)}
              placeholder="Search pens, notebooks, bags..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
            />
            <Suggestions />
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <Link href="/products">Products</Link>
            <Link
              href="/quote"
              className="bg-primary px-5 py-2 rounded-lg"
            >
              Get a Quote
            </Link>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl z-50"
            aria-label="Menu"
          >
            ☰
          </button>
        </div>

        {/* ---------- MOBILE SEARCH ---------- */}
        <div ref={mobileRef} className="relative mt-4 md:hidden">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={(e) => e.key === "Enter" && doSearch(query)}
            placeholder="Search pens, notebooks, bags..."
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
          />
          <Suggestions />
        </div>
      </div>

      {/* ---------- MOBILE MENU ---------- */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="flex flex-col px-6 py-4 gap-4 font-medium">
            <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/products" onClick={() => setMenuOpen(false)}>Products</Link>
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
