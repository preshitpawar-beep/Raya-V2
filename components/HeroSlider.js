"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    title: "Custom Branded Promotional Products",
    subtitle: "Pens, notebooks, bags & corporate giveaways for UK businesses",
    image: "/hero/hero-slide-products.png",
  },
  {
    title: "Based in the South West, Delivering Across the UK",
    subtitle: "Proudly serving Tiverton and businesses nationwide",
    image: "/hero/hero-slide-uk.png",
  },
  {
    title: "Corporate Gifts That Represent Your Brand",
    subtitle: "Thoughtfully designed merchandise for teams & clients",
    image: "/hero/hero-slide-gifting.png",
  },
  {
    title: "Eco-Friendly Branded Merchandise",
    subtitle: "Sustainable products made with quality materials",
    image: "/hero/hero-slide-eco.png",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index]);

  return (
    <section className="relative w-full overflow-hidden">

      {/* ================= MOBILE HERO ================= */}
      <div className="md:hidden relative h-[70vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[index].image}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image
              src={slides[index].image}
              alt={slides[index].title}
              fill
              priority
              className="object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 h-full flex items-end">
          <div className="p-6 w-full">
            <h1 className="text-3xl font-bold text-white mb-3 leading-tight">
              {slides[index].title}
            </h1>
            <p className="text-base text-white/90 mb-5">
              {slides[index].subtitle}
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/products"
                className="bg-white text-dark px-6 py-3 rounded-lg font-semibold text-center"
              >
                View Products
              </Link>
              <Link
                href="/quote"
                className="border border-white/60 text-white px-6 py-3 rounded-lg font-semibold text-center"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ================= DESKTOP HERO ================= */}
      <div className="hidden md:block">
        <div className="grid grid-cols-2 min-h-[62vh]">

          {/* LEFT – COLOURED PANEL (TEXT CENTRED PROPERLY) */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#F7F6F3] to-[#EFEDE8]" />

            <div className="relative z-10 w-full max-w-lg px-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  <h1 className="text-5xl font-bold leading-tight text-dark mb-5">
                    {slides[index].title}
                  </h1>

                  <p className="text-lg text-gray-600 mb-7">
                    {slides[index].subtitle}
                  </p>

                  <div className="flex gap-4">
                    <Link
                      href="/products"
                      className="bg-dark text-white px-8 py-3 rounded-lg font-semibold"
                    >
                      View Products
                    </Link>
                    <Link
                      href="/quote"
                      className="border border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-white"
                    >
                      Get a Quote
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT – IMAGE (REDUCED VISUAL WEIGHT) */}
          <div className="relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={slides[index].image}
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <div className="relative w-[85%] h-[85%]">
                  <Image
                    src={slides[index].image}
                    alt={slides[index].title}
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* ================= DOTS (NO GAP BELOW) ================= */}
      <div className="flex justify-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
              setIndex(i);
            }}
            className={`w-3 h-3 rounded-full transition ${
              i === index ? "bg-dark" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

    </section>
  );
}
