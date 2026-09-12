"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function PromoBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(localStorage.getItem("promoDismissed") !== "1");
  }, []);
  if (!show) return null;
  return (
    <div className="relative bg-dark text-white text-center text-sm px-10 py-2.5">
      <Link href="/quote" className="font-medium hover:underline">
        <span className="text-accent font-bold">10% off your first order</span>
        <span className="hidden sm:inline"> — new customer offer.</span> Mention{" "}
        <span className="font-bold tracking-wide">WELCOME10</span> when you enquire.
      </Link>
      <button
        aria-label="Dismiss offer"
        onClick={() => {
          localStorage.setItem("promoDismissed", "1");
          setShow(false);
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
}
