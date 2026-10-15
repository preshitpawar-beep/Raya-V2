"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "./productsData"; // adjust path if needed
import { searchMatches } from "./search";

/* Stable dropdown component (defined once, outside Header) so it is not
   remounted on every keystroke — remounting was dropping taps on mobile. */
function SuggestionsDropdown({ show, items, onPick }) {
  if (!show || items.length === 0) return null;
  return (
    <div className="absolute left-0 right-0 mt-2 bg-white border rounded-xl shadow-lg z-50 overflow-hidden">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          /* preventDefault on mousedown stops the input losing focus before
             the tap registers — the classic iOS "first tap just closes the
             keyboard" bug. The click handler still fires normally. */
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onPick(item)}
          className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 active:bg-gray-100"
        >
          {item}
        </button>
      ))}
    </div>
  );
}

const SEARCH_INPUT_PROPS = {
  type: "search",
  name: "search",
  inputMode: "search",
  enterKeyHint: "search",
  autoComplete: "off",
  autoCorrect: "off",
  autoCapitalize: "off",
  spellCheck: false,
  placeholder: "Search pens, notebooks, bags...",
};

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
      const inDesktop = desktopRef.current && desktopRef.current.contains(e.target);
      const inMobile = mobileRef.current && mobileRef.current.contains(e.target);
      if (!inDesktop && !inMobile) setShowSuggestions(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, []);

  /* ---------- AUTOCOMPLETE SOURCE ---------- */
  const suggestionPool = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      set.add(p.name);
      if (p.id.startsWith("MP")) set.add("Metal pen");
      if (p.category === "Pen") set.add("Plastic pen");
      if (p.category === "Notebook") set.add("Notebook");
      if (p.category === "Key Ring") set.add("Keyring");
      if (p.category === "Bags") set.add("Bags");
      if (p.category === "Combo Sets") set.add("Gift set");
      if (p.category === "Gift Boxes") set.add("Pen gift box");
      if (/eco|bamboo|cork|jute/i.test(p.name)) set.add("Eco notebook");
    });
    return Array.from(set);
  }, []);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    return suggestionPool.filter((s) => searchMatches(s, query)).slice(0, 8);
  }, [query, suggestionPool]);

  /* ---------- SEARCH ACTION ---------- */
  const doSearch = (value) => {
    const v = (value || "").trim();
    if (!v) return;
    router.push(`/products?search=${encodeURIComponent(v)}`);
    setQuery("");
    setShowSuggestions(false);
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* ---------- TOP ROW ---------- */}
        <div className="flex items-center justify-between gap-4">
          {/* LOGO */}
          <Link href="/" className="shrink-0">
            <Image
              src="/raya-logo.png"
              alt="Legacy Imprint SW – Branded Promotional Products"
              width={220}
              height={110}
              priority
            />
          </Link>

          {/* DESKTOP SEARCH */}
          <div ref={desktopRef} className="relative hidden md:block flex-1 max-w-xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                doSearch(query);
              }}
              className="relative"
              role="search"
            >
              <input
                {...SEARCH_INPUT_PROPS}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 active:scale-95 transition"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>
            </form>
            <SuggestionsDropdown show={showSuggestions} items={suggestions} onPick={doSearch} />
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <Link href="/products">Products</Link>
            <Link href="/quote" className="bg-primary px-5 py-2 rounded-lg">
              Get a Quote
            </Link>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl z-50"
            aria-label="Toggle navigation menu"
          >
            ☰
          </button>
        </div>

        {/* ---------- MOBILE SEARCH ---------- */}
        <div ref={mobileRef} className="relative mt-4 md:hidden">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              doSearch(query);
            }}
            className="relative"
            role="search"
          >
            <input
              {...SEARCH_INPUT_PROPS}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 active:scale-95 transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </form>
          <SuggestionsDropdown show={showSuggestions} items={suggestions} onPick={doSearch} />
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
